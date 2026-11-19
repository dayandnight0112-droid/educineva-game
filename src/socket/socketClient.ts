import { io, Socket } from 'socket.io-client';

/**
 * 统一规范化战队 ID（兼容 'team_blue'/'blue', 'team_red'/'red', 'yellow', 'green'）
 */
export function normalizeTeamId(rawTeamId?: string | null): 'blue' | 'red' | 'yellow' | 'green' {
  if (!rawTeamId) return 'blue';
  const lower = String(rawTeamId).toLowerCase();
  if (lower.includes('red')) return 'red';
  if (lower.includes('yellow') || lower.includes('amber')) return 'yellow';
  if (lower.includes('green') || lower.includes('emerald')) return 'green';
  return 'blue';
}

/**
 * 自动识别母体 Socket 服务器地址：
 * - 若通过本地双击 HTML (file://) 或 Vite 开发端口打开，优先探测 http://localhost:3000
 * - 若通过 Express 母体服务同源访问，则直接连接当前 Origin
 */
export function getSocketServerUrl(): string {
  if (typeof window === 'undefined') return 'http://localhost:3000';
  if (window.location.protocol === 'file:') {
    return 'http://localhost:3000';
  }
  if (window.location.port === '5173' || window.location.port === '4173') {
    return `http://${window.location.hostname || 'localhost'}:3000`;
  }
  return window.location.origin;
}

// ============================================================================
// 内置浏览器跨窗口/跨标签页母体沙箱中枢 (Local Browser Shared Sandbox Engine)
// 作用：当未启动 node server.js (直接双击打开 HTML) 或静态托管在 GitHub Pages 时，
//       通过 BroadcastChannel + localStorage 运行与服务端 100% 同核的 RoomManager 逻辑，
//       彻底消除 ERR_CONNECTION_REFUSED 报错，确保三端在任何环境下 100% 实时同步！
// ============================================================================

const SANDBOX_STORAGE_KEY = 'educineva_shared_sandbox_rooms_v1';
const SANDBOX_BUS_CHANNEL = 'educineva_socket_bus_v1';

interface LocalRoomStore {
  rooms: Record<string, any>;
  pinToRoomId: Record<string, string>;
}

function loadLocalStore(): LocalRoomStore {
  try {
    const raw = localStorage.getItem(SANDBOX_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.rooms && parsed.pinToRoomId) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return { rooms: {}, pinToRoomId: {} };
}

function saveLocalStore(store: LocalRoomStore) {
  try {
    localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

function generatePin(store: LocalRoomStore): string {
  for (let i = 0; i < 1000; i++) {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    if (!store.pinToRoomId[pin]) return pin;
  }
  return '886688';
}

function assignBalancedTeamLocal(room: any): string {
  if (!room.hasTeams || !Array.isArray(room.teams) || room.teams.length === 0) {
    return 'blue';
  }
  const counts: Record<string, number> = {};
  for (const t of room.teams) counts[t.id] = 0;
  for (const s of room.students || []) {
    if (s.teamId && counts[s.teamId] !== undefined) {
      counts[s.teamId] += 1;
    }
  }
  let minTeamId = room.teams[0].id;
  let minCount = Infinity;
  for (const t of room.teams) {
    const c = counts[t.id] ?? 0;
    if (c < minCount) {
      minCount = c;
      minTeamId = t.id;
    }
  }
  return minTeamId;
}

function getRoomRosterLocal(room: any) {
  return {
    roomId: room.roomId,
    roomName: room.roomName,
    hasTeams: room.hasTeams,
    teams: room.teams,
    students: (room.students || []).map((s: any) => ({
      studentId: s.studentId,
      name: s.name,
      avatar: s.avatar || './assets/games/char_b.png',
      teamId: s.teamId,
      score: s.score || 0,
      streak: s.streak || 0,
      joinedAt: s.joinedAt,
    })),
  };
}

function recordTimeoutForQuestionIndexLocal(room: any, qIndex: number) {
  if (!room || !Array.isArray(room.questions) || qIndex < 0 || qIndex >= room.questions.length) {
    return;
  }
  const rawQ = room.questions[qIndex];
  if (!rawQ) return;
  const qId = rawQ.id || rawQ.questionId || `q_${qIndex + 1}`;
  const qText = rawQ.questionText || rawQ.title || rawQ.question || `第 ${qIndex + 1} 题`;
  const correctAnswer = String(rawQ.correctAnswer || rawQ.answer || 'C').trim();
  const maxTimeMs = (rawQ.timeLimit || room.config?.timePerQuestion || 15) * 1000;

  (room.students || []).forEach((student: any) => {
    student.answerLogs = Array.isArray(student.answerLogs) ? student.answerLogs : [];
    student.answeredQuestionIds = Array.isArray(student.answeredQuestionIds)
      ? student.answeredQuestionIds
      : [];
    const hasLog = student.answerLogs.some((l: any) => l.questionId === qId);
    if (!hasLog && !student.answeredQuestionIds.includes(qId)) {
      const timeoutEntry = {
        questionId: qId,
        questionNumber: qIndex + 1,
        questionText: qText,
        options: rawQ.options,
        studentSelected: null,
        isTimeout: true,
        correctAnswer,
        isCorrect: false,
        pointsEarned: 0,
        timeSpentMs: maxTimeMs,
        submittedAt: Date.now(),
      };
      student.answerLogs.push(timeoutEntry);
      student.answeredQuestionIds.push(qId);
      student.wrongCount = (student.wrongCount || 0) + 1;
      student.streak = 0;
      student.totalTimeMs = (student.totalTimeMs || 0) + maxTimeMs;
    }
  });
}

function getDesensitizedQuestionLocal(room: any, questionIndex: number) {
  if (
    room.sandboxState &&
    typeof room.sandboxState.currentQuestionIndex === 'number' &&
    room.sandboxState.currentQuestionIndex >= 0 &&
    room.sandboxState.currentQuestionIndex !== questionIndex
  ) {
    recordTimeoutForQuestionIndexLocal(room, room.sandboxState.currentQuestionIndex);
  }

  const idx = Math.max(0, Math.min(questionIndex, (room.questions || []).length - 1));
  const rawQuestion = room.questions[idx] || {};
  const questionId = rawQuestion.id || rawQuestion.questionId || `q_${idx + 1}`;
  const questionText = rawQuestion.questionText || rawQuestion.title || rawQuestion.question || '';

  room.sandboxState = room.sandboxState || {};
  room.sandboxState.currentQuestionIndex = idx;
  room.sandboxState.activeQuestionId = questionId;
  room.sandboxState.questionStartTime = Date.now();

  return {
    questionId,
    index: idx,
    total: (room.questions || []).length,
    questionText,
    options: rawQuestion.options,
    timeLimit: rawQuestion.timeLimit || room.config?.timePerQuestion || 15,
  };
}

function getScoreboardLocal(room: any) {
  const activeQId = room.sandboxState?.activeQuestionId || null;
  const studentsList = room.students || [];

  const teams = (room.teams || [])
    .map((t: any) => {
      const teamStudents = studentsList.filter((s: any) => normalizeTeamId(s.teamId) === normalizeTeamId(t.id));
      const calcScore = teamStudents.reduce((acc: number, cur: any) => acc + (cur.score || 0), 0);
      t.score = calcScore;
      return {
        teamId: t.id,
        name: t.name,
        color: t.color,
        score: calcScore,
        memberCount: teamStudents.length,
      };
    })
    .sort((a: any, b: any) => b.score - a.score);

  const students = [...studentsList]
    .map((s: any) => {
      const answeredIds: string[] = Array.isArray(s.answeredQuestionIds) ? s.answeredQuestionIds : [];
      const hasAnsweredCurrent = Boolean(
        activeQId && (s.lastQuestionId === activeQId || answeredIds.includes(activeQId))
      );
      return {
        studentId: s.studentId,
        name: s.name,
        avatar: s.avatar || './assets/games/char_b.png',
        teamId: s.teamId,
        score: s.score || 0,
        streak: s.streak || 0,
        wrongCount: s.wrongCount || 0,
        lastQuestionId: s.lastQuestionId,
        lastAnswerIndex: s.lastAnswerIndex,
        lastIsCorrect: s.lastIsCorrect,
        hasAnsweredCurrent,
        answeredCount: answeredIds.length,
      };
    })
    .sort((a: any, b: any) => b.score - a.score);

  return {
    roomId: room.roomId,
    activeQuestionId: activeQId,
    currentQuestionIndex: room.sandboxState?.currentQuestionIndex ?? -1,
    teams,
    students,
    updatedAt: Date.now(),
  };
}

function settleGameLocal(room: any) {
  room.status = 'finished';

  // 将本场题库中所有学生超时未选的题目全部补记入 answerLogs
  for (let i = 0; i < (room.questions || []).length; i++) {
    recordTimeoutForQuestionIndexLocal(room, i);
  }

  const studentsList = [...(room.students || [])];

  // 排序：1. 答对题数/总分最高优先 -> 2. 同分按答题总耗时最短（回答最快）优先 -> 3. 错题少者优先 -> 4. 进房早者优先
  studentsList.sort((a: any, b: any) => {
    if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0);
    const aTime = a.totalTimeMs ?? Infinity;
    const bTime = b.totalTimeMs ?? Infinity;
    if (aTime !== bTime) return aTime - bTime;
    if ((a.wrongCount || 0) !== (b.wrongCount || 0)) return (a.wrongCount || 0) - (b.wrongCount || 0);
    return (a.joinedAt || 0) - (b.joinedAt || 0);
  });

  const leaderboard = studentsList.map((student: any, index: number) => {
    const team = (room.teams || []).find(
      (t: any) => normalizeTeamId(t.id) === normalizeTeamId(student.teamId)
    );
    const logs = Array.isArray(student.answerLogs) ? student.answerLogs : [];
    const sortedLogs = [...logs].sort((a: any, b: any) => (a.questionNumber || 0) - (b.questionNumber || 0));

    const wrongQuestions = sortedLogs
      .filter((log: any) => !log.isCorrect)
      .map((log: any) => {
        const isTimeout = Boolean(log.isTimeout || !log.studentSelected);
        let studentSelectedText = isTimeout ? null : String(log.studentSelected);
        let correctAnswerText = String(log.correctAnswer);
        if (log.options && typeof log.options === 'object' && !Array.isArray(log.options)) {
          if (!isTimeout && log.options[log.studentSelected] !== undefined) {
            studentSelectedText = `${log.studentSelected} (${log.options[log.studentSelected]})`;
          }
          if (log.options[log.correctAnswer] !== undefined) {
            correctAnswerText = `${log.correctAnswer} (${log.options[log.correctAnswer]})`;
          }
        }
        const qIndex = (room.questions || []).findIndex(
          (q: any) => q.id === log.questionId || q.questionId === log.questionId
        );
        const rawQ = qIndex >= 0 ? room.questions[qIndex] : null;
        return {
          questionId: log.questionId,
          questionNumber: log.questionNumber || (qIndex >= 0 ? qIndex + 1 : 1),
          questionText: log.questionText,
          options: log.options,
          isTimeout,
          studentSelected: isTimeout ? null : log.studentSelected,
          studentSelectedText,
          correctAnswer: log.correctAnswer,
          correctAnswerText,
          explanation: rawQ?.explanation || `标准正确答案是 ${correctAnswerText}。`,
        };
      });

    const correctCount = sortedLogs.filter((l: any) => l.isCorrect).length;

    return {
      rank: index + 1,
      studentId: student.studentId,
      name: student.name,
      avatar: student.avatar || './assets/games/char_b.png',
      teamId: student.teamId,
      teamName: team ? team.name : '个人',
      teamColor: team ? team.color : '#6B7280',
      score: student.score || 0,
      streak: student.streak || 0,
      totalTimeMs: student.totalTimeMs || 0,
      wrongCount: wrongQuestions.length,
      correctCount,
      totalAnswered: sortedLogs.length,
      isPerfect: wrongQuestions.length === 0,
      wrongQuestions,
    };
  });

  const podium = leaderboard.slice(0, 3).map((item: any) => ({
    rank: item.rank,
    studentId: item.studentId,
    name: item.name,
    avatar: item.avatar,
    teamId: item.teamId,
    teamName: item.teamName,
    teamColor: item.teamColor,
    score: item.score,
    correctCount: item.correctCount,
    totalAnswered: item.totalAnswered,
    isPerfect: item.isPerfect,
  }));

  const teamSummary = (room.teams || [])
    .map((team: any) => {
      const teamStudents = studentsList.filter(
        (s: any) => normalizeTeamId(s.teamId) === normalizeTeamId(team.id)
      );
      const calculatedScore = teamStudents.reduce((acc: number, curr: any) => acc + (curr.score || 0), 0);
      return {
        teamId: team.id,
        name: team.name,
        color: team.color,
        score: calculatedScore,
        memberCount: teamStudents.length,
      };
    })
    .sort((a: any, b: any) => b.score - a.score);

  const winnerTeam = teamSummary.length > 0 ? teamSummary[0] : null;

  const settlementData = {
    roomId: room.roomId,
    roomName: room.roomName,
    totalQuestions: (room.questions || []).length,
    finishedAt: Date.now(),
    winnerTeam,
    podium,
    teamSummary,
    leaderboard,
  };

  room.settlementData = settlementData;
  return settlementData;
}

/**
 * 创建与 Educineva 母体服务的 Socket 连接（自带双模无缝切换）
 * - 若本地或云端 Node 母体服务在线，直接走真实 WebSocket
 * - 若未启动后台服务（如直接双击 HTML 或 GitHub Pages 静态访问），自动切换为浏览器跨窗口共享沙箱中枢
 */
export function createSocketConnection(): Socket {
  const listeners = new Map<string, Set<(...args: any[]) => void>>();
  let isLocalSandboxMode = false;
  let boundRoomId: string | null = null;
  let boundStudentId: string | null = null;

  const bc =
    typeof window !== 'undefined' && 'BroadcastChannel' in window
      ? new BroadcastChannel(SANDBOX_BUS_CHANNEL)
      : null;

  const triggerLocalEvent = (event: string, payload: any) => {
    const set = listeners.get(event);
    if (set) {
      set.forEach((fn) => {
        try {
          fn(payload);
        } catch (err) {
          console.error('[SandboxSocket] Listener error:', err);
        }
      });
    }
  };

  const broadcastToRoom = (roomId: string, event: string, payload: any, targetStudentId?: string) => {
    const packet = { roomId, event, payload, targetStudentId, ts: Date.now() };
    if (bc) {
      bc.postMessage(packet);
    }
    try {
      localStorage.setItem('educineva_bus_last_evt', JSON.stringify(packet));
    } catch {
      // ignore
    }
    if (!boundRoomId || boundRoomId === roomId) {
      if (!targetStudentId || !boundStudentId || targetStudentId === boundStudentId) {
        triggerLocalEvent(event, payload);
      }
    }
  };

  const onBusPacket = (packet: any) => {
    if (!isLocalSandboxMode || !packet || !packet.event) return;
    if (boundRoomId && packet.roomId && packet.roomId !== boundRoomId) return;
    if (packet.targetStudentId && boundStudentId && packet.targetStudentId !== boundStudentId) return;
    triggerLocalEvent(packet.event, packet.payload);
  };

  if (bc) {
    bc.onmessage = (e) => onBusPacket(e.data);
  }

  const storageListener = (e: StorageEvent) => {
    if (e.key === 'educineva_bus_last_evt' && e.newValue) {
      try {
        onBusPacket(JSON.parse(e.newValue));
      } catch {
        // ignore
      }
    }
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', storageListener);
  }

  // 处理本地跨窗口母体指令
  const handleLocalEmit = (event: string, data: any, callback?: (...args: any[]) => void) => {
    const store = loadLocalStore();

    if (event === 'teacher_create_room') {
      const roomId = `room_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const pin = generatePin(store);
      const hasTeams = data?.config?.hasTeams !== undefined ? Boolean(data.config.hasTeams) : true;
      const initialTeams =
        Array.isArray(data?.config?.teams) && data.config.teams.length > 0
          ? data.config.teams.map((t: any) => ({ score: 0, ...t }))
          : [
              { id: 'blue', name: '🟦 蓝队勇士', color: '#3B82F6', score: 0 },
              { id: 'red', name: '🟥 红队先锋', color: '#EF4444', score: 0 },
            ];

      const room = {
        roomId,
        pin,
        teacherId: data.teacherId || 'teacher_host',
        roomName: data.roomName || '互动课堂',
        gameId: data.gameId || 'speed-racing',
        gameMode: data.gameMode || 'team',
        hasTeams,
        isLocked: false,
        teams: initialTeams,
        students: [],
        config: data.config || {},
        questions: Array.isArray(data.questions) ? data.questions : [],
        createdAt: Date.now(),
        status: 'waiting',
        settlementData: null,
        sandboxState: {
          currentQuestionIndex: -1,
          activeQuestionId: null,
          activeStage: 'lobby',
        },
      };

      store.rooms[roomId] = room;
      store.pinToRoomId[pin] = roomId;
      saveLocalStore(store);

      boundRoomId = roomId;
      const res = { success: true, roomId, pin, roomData: room };
      callback?.(res);
      triggerLocalEvent('room_created', res);
      return;
    }

    if (event === 'teacher_bind_room') {
      let targetRoomId =
        data?.roomId || (data?.pin ? store.pinToRoomId[String(data.pin).trim()] : null);

      if ((!targetRoomId || !store.rooms[targetRoomId]) && data?.autoLatest) {
        const allRooms = Object.values(store.rooms).filter((r: any) => r.status !== 'closed');
        if (allRooms.length > 0) {
          allRooms.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
          targetRoomId = allRooms[0].roomId;
        }
      }

      const room = targetRoomId ? store.rooms[targetRoomId] : null;
      if (!room) {
        callback?.({ success: false, error: '未找到活跃房间' });
        return;
      }

      boundRoomId = room.roomId;
      const roster = getRoomRosterLocal(room);
      callback?.({
        success: true,
        roomId: room.roomId,
        pin: room.pin,
        roomData: room,
        roster,
      });
      return;
    }

    if (event === 'student_join_room') {
      const cleanPin = String(data?.pin || '').trim();
      const studentName = String(data?.studentName || '').trim();
      let targetRoomId = store.pinToRoomId[cleanPin];

      // 若输入最新房间 PIN 或唯一活跃房间
      if (!targetRoomId) {
        const allRooms = Object.values(store.rooms).filter((r: any) => r.status !== 'closed');
        const matched = allRooms.find((r: any) => String(r.pin) === cleanPin);
        if (matched) targetRoomId = matched.roomId;
      }

      const room = targetRoomId ? store.rooms[targetRoomId] : null;
      if (!room || room.status === 'closed') {
        callback?.({
          success: false,
          error: `未找到 PIN 码为 [${cleanPin}] 的活跃房间，请先在教师后台或大屏开启房间`,
        });
        return;
      }
      if (room.isLocked) {
        callback?.({
          success: false,
          error: '该课堂房间已被老师锁定，暂时无法加入',
        });
        return;
      }

      const studentId = `stu_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const token = `tok_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const teamId = assignBalancedTeamLocal(room);

      const student = {
        studentId,
        name: studentName,
        avatar: data?.avatar || './assets/games/char_b.png',
        teamId,
        token,
        joinedAt: Date.now(),
        score: 0,
        streak: 0,
        wrongCount: 0,
        lastQuestionId: null,
        lastAnswerIndex: null,
        lastIsCorrect: null,
        answeredQuestionIds: [],
        answerLogs: [],
      };

      room.students = room.students || [];
      room.students.push(student);
      saveLocalStore(store);

      boundRoomId = room.roomId;
      boundStudentId = studentId;

      const roster = getRoomRosterLocal(room);
      let activeQuestion = null;
      if (room.status === 'in_game' && room.sandboxState?.currentQuestionIndex >= 0) {
        activeQuestion = getDesensitizedQuestionLocal(room, room.sandboxState.currentQuestionIndex);
      }

      const res = {
        success: true,
        roomId: room.roomId,
        studentId,
        studentToken: token,
        avatar: student.avatar,
        teamId,
        roomName: room.roomName,
        teams: room.teams,
        hasTeams: room.hasTeams,
        roster,
        activeQuestion,
        activeStage: room.sandboxState?.activeStage || null,
      };

      callback?.(res);
      broadcastToRoom(room.roomId, 'room_roster_update', roster);
      return;
    }

    if (event === 'teacher_rebalance_teams') {
      const roomId = data?.roomId || boundRoomId;
      const room = roomId ? store.rooms[roomId] : null;
      if (!room) return callback?.({ success: false, error: '房间不存在' });

      const teamMode = data?.teamMode;
      if (teamMode === 2 || teamMode === 3 || teamMode === 4) {
        const presetPool = [
          { id: 'blue', name: '🟦 蓝队勇士', color: '#3B82F6', score: 0 },
          { id: 'red', name: '🟥 红队先锋', color: '#EF4444', score: 0 },
          { id: 'yellow', name: '🟨 黄队闪电', color: '#EAB308', score: 0 },
          { id: 'green', name: '🟩 绿队神鹰', color: '#10B981', score: 0 },
        ];
        room.teams = presetPool.slice(0, teamMode);
        room.config = { ...room.config, teamMode };
      }

      const activeTeams = room.teams || [];
      (room.students || []).forEach((s: any, idx: number) => {
        const target = activeTeams[idx % activeTeams.length];
        if (target && s.teamId !== target.id) {
          s.teamId = target.id;
          broadcastToRoom(
            room.roomId,
            'your_team_changed',
            {
              studentId: s.studentId,
              teamId: target.id,
              teamName: target.name,
              teamColor: target.color,
              reason: 'teacher_rebalanced',
            },
            s.studentId
          );
        }
      });

      saveLocalStore(store);
      const roster = getRoomRosterLocal(room);
      broadcastToRoom(room.roomId, 'room_roster_update', roster);
      callback?.({ success: true, teams: room.teams, roster });
      return;
    }

    if (event === 'teacher_move_student' || event === 'student_switch_team') {
      const roomId = data?.roomId || boundRoomId;
      const room = roomId ? store.rooms[roomId] : null;
      if (!room) return callback?.({ success: false, error: '房间不存在' });

      const studentId = data?.studentId || boundStudentId;
      const student = (room.students || []).find((s: any) => s.studentId === studentId);
      if (!student) return callback?.({ success: false, error: '学生不存在' });

      const activeTeams = room.teams || [];
      let targetTeam = activeTeams.find((t: any) => t.id === data?.targetTeamId);
      if (!targetTeam && activeTeams.length > 0) {
        const currIdx = activeTeams.findIndex(
          (t: any) => normalizeTeamId(t.id) === normalizeTeamId(student.teamId)
        );
        targetTeam = activeTeams[(currIdx + 1) % activeTeams.length];
      }

      if (targetTeam) {
        student.teamId = targetTeam.id;
        saveLocalStore(store);
        const roster = getRoomRosterLocal(room);
        broadcastToRoom(room.roomId, 'room_roster_update', roster);
        broadcastToRoom(
          room.roomId,
          'your_team_changed',
          {
            studentId: student.studentId,
            teamId: targetTeam.id,
            teamName: targetTeam.name,
            teamColor: targetTeam.color,
          },
          student.studentId
        );
        callback?.({ success: true, studentId: student.studentId, teamId: targetTeam.id });
      }
      return;
    }

    if (event === 'teacher_toggle_lock_room') {
      const roomId = data?.roomId || boundRoomId;
      const room = roomId ? store.rooms[roomId] : null;
      if (!room) return callback?.({ success: false });
      room.isLocked = data?.isLocked !== undefined ? Boolean(data.isLocked) : !room.isLocked;
      saveLocalStore(store);
      broadcastToRoom(room.roomId, 'room_lock_changed', {
        roomId: room.roomId,
        isLocked: room.isLocked,
      });
      callback?.({ success: true, isLocked: room.isLocked });
      return;
    }

    if (event === 'teacher_push_question') {
      const roomId = data?.roomId || boundRoomId;
      const room = roomId ? store.rooms[roomId] : null;
      if (!room) return callback?.({ success: false, error: '房间不存在' });

      const questionIndex = Number(data?.questionIndex ?? 0);
      const desensitized = getDesensitizedQuestionLocal(room, questionIndex);
      room.status = 'in_game';
      room.sandboxState.activeStage = 'question-prompt';
      saveLocalStore(store);

      broadcastToRoom(room.roomId, 'new_question', desensitized);
      callback?.({ success: true, question: desensitized });
      return;
    }

    if (event === 'teacher_sync_stage') {
      const roomId = data?.roomId || boundRoomId;
      const room = roomId ? store.rooms[roomId] : null;
      if (!room) return callback?.({ success: false });

      room.sandboxState = room.sandboxState || {};
      room.sandboxState.activeStage = data.state;

      if (data.state === 'question-options') {
        room.sandboxState.questionStartTime = Date.now();
      } else if (
        (data.state === 'result-stats' || data.state === 'scoreboard') &&
        typeof room.sandboxState.currentQuestionIndex === 'number' &&
        room.sandboxState.currentQuestionIndex >= 0
      ) {
        recordTimeoutForQuestionIndexLocal(room, room.sandboxState.currentQuestionIndex);
      }

      if (data.state === 'lobby') {
        room.status = 'waiting';
        room.settlementData = null;
        room.sandboxState.currentQuestionIndex = -1;
        room.sandboxState.activeQuestionId = null;
        (room.teams || []).forEach((t: any) => (t.score = 0));
        (room.students || []).forEach((s: any) => {
          s.score = 0;
          s.streak = 0;
          s.wrongCount = 0;
          s.totalTimeMs = 0;
          s.lastQuestionId = null;
          s.lastAnswerIndex = null;
          s.lastIsCorrect = null;
          s.answeredQuestionIds = [];
          s.answerLogs = [];
        });
        saveLocalStore(store);
        broadcastToRoom(room.roomId, 'room_roster_update', getRoomRosterLocal(room));
        broadcastToRoom(room.roomId, 'scoreboard_update', getScoreboardLocal(room));
      } else {
        saveLocalStore(store);
      }

      const payload = {
        roomId: room.roomId,
        state: data.state,
        questionIndex: data.questionIndex,
        timeLeft: data.timeLeft,
        timestamp: Date.now(),
      };
      broadcastToRoom(room.roomId, 'screen_stage_sync', payload);
      callback?.({ success: true, payload });
      return;
    }

    if (event === 'student_submit_answer') {
      const roomId = data?.roomId || boundRoomId;
      const room = roomId ? store.rooms[roomId] : null;
      if (!room) return callback?.({ success: false, error: '房间不存在' });

      const studentId = data?.studentId || boundStudentId;
      const student = (room.students || []).find((s: any) => s.studentId === studentId);
      if (!student) return callback?.({ success: false, error: '学生不存在' });

      const { questionId, selectedOption } = data || {};
      student.answeredQuestionIds = Array.isArray(student.answeredQuestionIds)
        ? student.answeredQuestionIds
        : [];
      if (student.answeredQuestionIds.includes(questionId)) {
        return callback?.({ success: false, error: '已提交过该题' });
      }

      const qIndex = (room.questions || []).findIndex(
        (q: any) => q.id === questionId || q.questionId === questionId
      );
      const effectiveIdx = qIndex >= 0 ? qIndex : (room.sandboxState?.currentQuestionIndex ?? 0);
      const rawQuestion = (room.questions || [])[effectiveIdx];
      if (!rawQuestion) return callback?.({ success: false, error: '未找到题目' });

      const correctAnswer = String(rawQuestion.correctAnswer || rawQuestion.answer || 'C').trim();
      const formattedSelected = String(selectedOption ?? '').trim();
      const isCorrect = formattedSelected.toUpperCase() === correctAnswer.toUpperCase();
      const pointsEarned = isCorrect ? 100 : 0;
      const now = Date.now();
      const qStart = room.sandboxState?.questionStartTime || now;
      const timeSpentMs = Math.max(50, now - qStart);

      student.score = (student.score || 0) + pointsEarned;
      student.totalTimeMs = (student.totalTimeMs || 0) + timeSpentMs;
      if (isCorrect) {
        student.streak = (student.streak || 0) + 1;
      } else {
        student.streak = 0;
        student.wrongCount = (student.wrongCount || 0) + 1;
      }
      student.lastQuestionId = questionId;
      const optIdx = ['A', 'B', 'C', 'D'].indexOf(formattedSelected.toUpperCase());
      student.lastAnswerIndex = optIdx >= 0 ? optIdx : 0;
      student.lastIsCorrect = isCorrect;
      student.answeredQuestionIds.push(questionId);

      student.answerLogs = Array.isArray(student.answerLogs) ? student.answerLogs : [];
      student.answerLogs.push({
        questionId,
        questionNumber: effectiveIdx + 1,
        questionText: rawQuestion.questionText || rawQuestion.title || rawQuestion.question,
        options: rawQuestion.options,
        studentSelected: formattedSelected,
        isTimeout: false,
        correctAnswer,
        isCorrect,
        pointsEarned,
        timeSpentMs,
        submittedAt: now,
      });

      const scoreboard = getScoreboardLocal(room);
      saveLocalStore(store);

      const feedback = {
        questionId,
        isCorrect,
        pointsEarned,
        currentScore: student.score,
      };
      triggerLocalEvent('answer_feedback', feedback);
      callback?.({ success: true, feedback });
      broadcastToRoom(room.roomId, 'scoreboard_update', scoreboard);
      return;
    }

    if (event === 'teacher_end_game' || event === 'get_settlement_data') {
      const roomId = data?.roomId || boundRoomId;
      const room = roomId ? store.rooms[roomId] : null;
      if (!room) return callback?.({ success: false, error: '房间不存在' });

      const settlementData = settleGameLocal(room);
      saveLocalStore(store);

      if (event === 'teacher_end_game') {
        broadcastToRoom(room.roomId, 'game_settlement_data', settlementData);
      }
      callback?.({ success: true, settlementData });
      return;
    }
  };

  // 构建兼容 Socket.io 客户端接口的代理对象
  let realSocket: Socket | null = null;

  const activateLocalSandbox = () => {
    if (isLocalSandboxMode) return;
    isLocalSandboxMode = true;
    if (realSocket) {
      try {
        realSocket.removeAllListeners();
        realSocket.disconnect();
      } catch {
        // ignore
      }
      realSocket = null;
    }
    setTimeout(() => {
      triggerLocalEvent('connect', {});
    }, 10);
  };

  const proxySocket: any = {
    get connected() {
      return isLocalSandboxMode || Boolean(realSocket?.connected);
    },
    on(event: string, fn: (...args: any[]) => void) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event)!.add(fn);
      if (realSocket && !isLocalSandboxMode) {
        realSocket.on(event, fn);
      }
      if (event === 'connect' && isLocalSandboxMode) {
        setTimeout(() => fn(), 0);
      }
      return proxySocket;
    },
    off(event: string, fn?: (...args: any[]) => void) {
      if (fn && listeners.has(event)) {
        listeners.get(event)!.delete(fn);
      } else if (!fn) {
        listeners.delete(event);
      }
      if (realSocket) {
        realSocket.off(event, fn as any);
      }
      return proxySocket;
    },
    emit(event: string, data?: any, callback?: (...args: any[]) => void) {
      if (isLocalSandboxMode) {
        handleLocalEmit(event, data, callback);
        return proxySocket;
      }
      if (realSocket && realSocket.connected) {
        realSocket.emit(event, data, callback);
      } else {
        // 若真实 Socket 尚未就绪，自动降级至本地跨窗口母体中枢执行
        activateLocalSandbox();
        handleLocalEmit(event, data, callback);
      }
      return proxySocket;
    },
    disconnect() {
      if (bc) {
        try {
          bc.close();
        } catch {
          // ignore
        }
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', storageListener);
      }
      if (realSocket) {
        realSocket.disconnect();
      }
      return proxySocket;
    },
  };

  // 先用极速 HTTP 探针检测后端母体服务是否在线（兼容 file://、Vercel、GitHub Pages 与本地/云端 Node 服务），避免浏览器控制台报 WebSocket 错误
  const serverUrl = getSocketServerUrl();
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = setTimeout(() => controller?.abort(), 600);
  fetch(`${serverUrl}/health`, { signal: controller?.signal })
    .then(async (res) => {
      clearTimeout(timeoutId);
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json().catch(() => null);
        if (data && data.status === 'ok') {
          connectRealSocket(serverUrl);
          return;
        }
      }
      activateLocalSandbox();
    })
    .catch(() => {
      clearTimeout(timeoutId);
      activateLocalSandbox();
    });

  function connectRealSocket(url: string) {
    realSocket = io(url, {
      transports: ['websocket', 'polling'],
      reconnection: false,
      timeout: 1500,
    });

    listeners.forEach((fnSet, evt) => {
      fnSet.forEach((fn) => {
        realSocket?.on(evt, fn);
      });
    });

    realSocket.on('connect_error', () => {
      activateLocalSandbox();
    });
  }

  return proxySocket as Socket;
}
