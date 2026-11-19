/**
 * Educineva 房间沙箱隔离内核 - RoomManager
 * 职责：
 * 1. 内存中管理所有活跃的教学游戏房间
 * 2. 6 位高并发防碰撞数字 PIN 码生成与映射
 * 3. 题目与配置快照深拷贝（Deep Clone），确保房间内存 100% 独立隔离
 * 4. 房间完整生命周期管理与安全资源回收
 * 5. 【第 2 步】：队伍体系（teams）维护、学生凭 PIN 进房、智能人数均衡分队、教师调度换队、断线重连恢复
 * 6. 【第 3 步】：题目物理脱敏下发、全量答题日志流水账本（Answer Log）、防重复答题防刷、实时计分与排行榜
 * 7. 【第 4 步】：Kahoot 式结算颁奖聚合计算（领奖台 Podium、获胜队伍评选、可展开错题学情复盘看板）
 */

/**
 * 深度拷贝工具函数：优先使用原生高效的 structuredClone，若不支持则降级为 JSON 序列化
 * @template T
 * @param {T} obj 
 * @returns {T}
 */
export function deepClone(obj) {
  if (obj === undefined || obj === null) return obj;
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(obj);
    } catch {
      // 容错降级
      return JSON.parse(JSON.stringify(obj));
    }
  }
  return JSON.parse(JSON.stringify(obj));
}

export class RoomManager {
  constructor() {
    /**
     * 主存储：roomId -> Room 实体对象
     * @type {Map<string, Object>}
     */
    this.rooms = new Map();

    /**
     * PIN 码索引加速表：pin -> roomId
     * 用于学生通过 6 位 PIN 码以 O(1) 复杂度极速寻址房间
     * @type {Map<string, string>}
     */
    this.pinToRoomId = new Map();
  }

  /**
   * 生成 6 位纯数字房间 PIN 码（100000 - 999999）
   * 包含绝对唯一的防碰撞冲突检测
   * @param {number} maxAttempts 最大尝试重试次数
   * @returns {string} 唯一的 6 位 PIN 码
   */
  generateUniquePin(maxAttempts = 10000) {
    for (let i = 0; i < maxAttempts; i++) {
      const pin = Math.floor(100000 + Math.random() * 900000).toString();
      if (!this.pinToRoomId.has(pin)) {
        return pin;
      }
    }
    throw new Error('PIN 码池已满或发生高频碰撞，请稍后重试');
  }

  /**
   * 创建房间沙箱
   */
  createRoom({
    teacherId,
    teacherSocketId,
    roomName,
    gameId = 'speed-racing',
    gameMode = 'classic',
    config = {},
    questions = []
  }) {
    if (!teacherId) throw new Error('创建房间失败：必须提供 teacherId');
    if (!roomName) throw new Error('创建房间失败：必须提供 roomName');

    const roomId = `room_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const pin = this.generateUniquePin();

    const isolatedConfig = deepClone(config);
    const isolatedQuestions = deepClone(questions);

    const hasTeams = config.hasTeams !== undefined ? Boolean(config.hasTeams) : true;
    const initialTeams = Array.isArray(config.teams) && config.teams.length > 0
      ? deepClone(config.teams).map(t => ({ score: 0, ...t }))
      : [
          { id: 'team_red', name: '红队', color: '#EF4444', score: 0 },
          { id: 'team_blue', name: '蓝队', color: '#3B82F6', score: 0 }
        ];

    const room = {
      roomId,
      pin,
      teacherId,
      teacherSocketId,
      roomName,
      gameId,
      gameMode,
      hasTeams,
      teams: initialTeams,
      students: new Map(), // studentId -> Student Object
      tokenToStudentId: new Map(), // token -> studentId
      config: isolatedConfig,
      questions: isolatedQuestions,
      createdAt: Date.now(),
      status: 'waiting', // waiting | in_game | finished | closed
      settlementData: null, // 结算归档数据
      players: new Map(),
      sandboxState: {
        currentQuestionIndex: -1,
        activeQuestionId: null,
        scores: {},
        answers: {}
      }
    };

    this.rooms.set(roomId, room);
    this.pinToRoomId.set(pin, roomId);

    console.log(`[RoomManager] 房间已创建: "${roomName}" (ID: ${roomId}, PIN: ${pin}, 包含题目: ${isolatedQuestions.length} 道, 队伍数: ${room.teams.length})`);

    return this.getRoomSnapshot(roomId);
  }

  /**
   * 自动均衡计算：为新进房学生分配当前人数最少的队伍
   */
  assignBalancedTeam(room) {
    if (!room.hasTeams || !room.teams || room.teams.length === 0) {
      return null;
    }

    const teamCounts = new Map();
    for (const team of room.teams) {
      teamCounts.set(team.id, 0);
    }
    for (const student of room.students.values()) {
      if (student.teamId && teamCounts.has(student.teamId)) {
        teamCounts.set(student.teamId, teamCounts.get(student.teamId) + 1);
      }
    }

    let minTeamId = room.teams[0].id;
    let minCount = Infinity;
    for (const team of room.teams) {
      const count = teamCounts.get(team.id) ?? 0;
      if (count < minCount) {
        minCount = count;
        minTeamId = team.id;
      }
    }
    return minTeamId;
  }

  /**
   * 学生加入房间（支持自动均衡分队，初始化计分与答题流水账本）
   */
  addStudentToRoom(roomId, { name, socketId, avatar }) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);
    if (!name || !String(name).trim()) throw new Error('学生姓名不能为空');

    const studentId = `stu_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const token = `tok_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const teamId = this.assignBalancedTeam(room);

    const student = {
      studentId,
      name: String(name).trim(),
      avatar: avatar || './assets/games/char_b.png',
      teamId,
      socketId,
      token,
      joinedAt: Date.now(),
      score: 0,
      streak: 0,
      wrongCount: 0,
      lastQuestionId: null,
      lastAnswerIndex: null,
      lastIsCorrect: null,
      answeredQuestionIds: new Set(),
      answerLogs: []
    };

    room.students.set(studentId, student);
    room.tokenToStudentId.set(token, studentId);

    console.log(`[RoomManager] 学生进房: "${student.name}" (ID: ${studentId}, 分配队伍: ${teamId || '无'}) -> 房间 ${room.roomName}`);

    return { student, room };
  }

  /**
   * 学生断线重连恢复
   */
  reconnectStudent(roomId, { studentToken, socketId }) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);
    const studentId = room.tokenToStudentId.get(studentToken);
    if (!studentId) throw new Error('无效的学生凭证 Token 或学生已被移除');
    const student = room.students.get(studentId);
    if (!student) throw new Error('未检索到学生身份信息');

    student.socketId = socketId;
    console.log(`[RoomManager] 学生重连成功: "${student.name}" (ID: ${student.studentId}) -> 房间 ${room.roomName}`);
    return student;
  }

  /**
   * 教师端操作：添加新队伍
   */
  addTeam(roomId, { teamName, teamColor }) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);
    if (!teamName || !String(teamName).trim()) throw new Error('队伍名称不能为空');

    const teamId = `team_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newTeam = {
      id: teamId,
      name: String(teamName).trim(),
      color: teamColor || '#10B981',
      score: 0
    };

    room.teams.push(newTeam);
    console.log(`[RoomManager] 房间 [${room.roomName}] 新增队伍: "${newTeam.name}" (ID: ${newTeam.id})`);
    return newTeam;
  }

  /**
   * 教师端操作：删除队伍
   */
  removeTeam(roomId, teamId) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);

    const index = room.teams.findIndex(t => t.id === teamId);
    if (index === -1) throw new Error(`队伍不存在: ${teamId}`);

    const [removedTeam] = room.teams.splice(index, 1);

    const reassignedStudents = [];
    for (const student of room.students.values()) {
      if (student.teamId === teamId) {
        student.teamId = this.assignBalancedTeam(room);
        reassignedStudents.push({
          studentId: student.studentId,
          name: student.name,
          newTeamId: student.teamId,
          socketId: student.socketId
        });
      }
    }

    console.log(`[RoomManager] 房间 [${room.roomName}] 删除队伍 "${removedTeam.name}"，已重新调度 ${reassignedStudents.length} 名学生`);
    return { success: true, reassignedStudents };
  }

  /**
   * 教师端操作：在后台自由调队/换队
   */
  moveStudentTeam(roomId, studentId, targetTeamId) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);

    const student = room.students.get(studentId);
    if (!student) throw new Error(`学生不存在: ${studentId}`);

    let targetTeam = null;
    if (targetTeamId !== null) {
      targetTeam = room.teams.find(t => t.id === targetTeamId);
      if (!targetTeam) throw new Error(`目标队伍不存在: ${targetTeamId}`);
    }

    const oldTeamId = student.teamId;
    student.teamId = targetTeamId;

    console.log(`[RoomManager] 教师调队: 学生 "${student.name}" [${oldTeamId} -> ${targetTeamId}] (房间: ${room.roomName})`);
    return { student, targetTeam };
  }

  /**
   * 教师大屏端操作：一键自动均衡调配队伍 / 切换 2/3/4 队模式
   */
  rebalanceTeams(roomId, teamMode) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);

    if (teamMode === 2 || teamMode === 3 || teamMode === 4) {
      const presetPool = [
        { id: 'blue', name: '🟦 蓝队勇士', color: '#3B82F6', score: 0 },
        { id: 'red', name: '🟥 红队先锋', color: '#EF4444', score: 0 },
        { id: 'yellow', name: '🟨 黄队闪电', color: '#EAB308', score: 0 },
        { id: 'green', name: '🟩 绿队神鹰', color: '#10B981', score: 0 }
      ];
      room.teams = presetPool.slice(0, teamMode).map(pt => {
        const existing = room.teams.find(t => t.id === pt.id);
        return existing ? { ...pt, score: existing.score || 0 } : pt;
      });
    }

    const activeTeams = room.teams;
    const reassignedStudents = [];
    if (activeTeams && activeTeams.length > 0) {
      let idx = 0;
      for (const student of room.students.values()) {
        const targetTeam = activeTeams[idx % activeTeams.length];
        const changed = student.teamId !== targetTeam.id;
        student.teamId = targetTeam.id;
        if (changed) {
          reassignedStudents.push({
            studentId: student.studentId,
            name: student.name,
            newTeamId: targetTeam.id,
            newTeamName: targetTeam.name,
            newTeamColor: targetTeam.color,
            socketId: student.socketId
          });
        }
        idx++;
      }
    }

    return { teams: room.teams, reassignedStudents };
  }

  /**
   * 题目安全物理脱敏分发
   */
  getDesensitizedQuestion(roomId, questionIndex) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);

    if (questionIndex < 0 || questionIndex >= room.questions.length) {
      throw new Error(`题目索引超出范围: [${questionIndex}]，题库总数: ${room.questions.length}`);
    }

    const rawQuestion = room.questions[questionIndex];
    const questionId = rawQuestion.id || rawQuestion.questionId || `q_${questionIndex}`;
    const questionText = rawQuestion.questionText || rawQuestion.title || rawQuestion.question || '';

    room.sandboxState.currentQuestionIndex = questionIndex;
    room.sandboxState.activeQuestionId = questionId;

    return {
      questionId,
      index: questionIndex,
      total: room.questions.length,
      questionText,
      options: deepClone(rawQuestion.options),
      timeLimit: rawQuestion.timeLimit || room.config.timePerQuestion || 30
    };
  }

  /**
   * 提交答题、防刷校验、即时判分与全量账本写入
   */
  submitStudentAnswer(roomId, { studentId, questionId, selectedOption }) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);

    const student = room.students.get(studentId);
    if (!student) throw new Error(`学生不存在: ${studentId}`);

    if (student.answeredQuestionIds.has(questionId)) {
      throw new Error('该题目您已提交作答，无法重复提交');
    }

    const rawQuestion = room.questions.find(
      q => (q.id === questionId || q.questionId === questionId)
    );
    if (!rawQuestion) {
      throw new Error(`未找到题目: ${questionId}`);
    }

    const correctAnswer = rawQuestion.correctAnswer || rawQuestion.answer;
    if (correctAnswer === undefined || correctAnswer === null) {
      throw new Error(`题库配置异常：题目 [${questionId}] 缺少标准答案字段`);
    }

    const formattedSelected = String(selectedOption ?? '').trim();
    const formattedCorrect = String(correctAnswer).trim();

    const isCorrect = (
      formattedSelected.toUpperCase() === formattedCorrect.toUpperCase() ||
      formattedSelected === formattedCorrect
    );

    const pointsEarned = isCorrect ? 100 : 0;

    student.score += pointsEarned;
    if (isCorrect) {
      student.streak = (student.streak || 0) + 1;
    } else {
      student.streak = 0;
      student.wrongCount += 1;
    }
    student.lastQuestionId = questionId;
    const optIdx = ['A', 'B', 'C', 'D'].indexOf(formattedSelected.toUpperCase());
    student.lastAnswerIndex = optIdx >= 0 ? optIdx : 0;
    student.lastIsCorrect = isCorrect;
    student.answeredQuestionIds.add(questionId);

    const questionText = rawQuestion.questionText || rawQuestion.title || rawQuestion.question;
    const logEntry = {
      questionId,
      questionText,
      options: deepClone(rawQuestion.options),
      studentSelected: formattedSelected,
      correctAnswer: formattedCorrect,
      isCorrect,
      pointsEarned,
      submittedAt: Date.now()
    };
    student.answerLogs.push(logEntry);

    if (student.teamId) {
      const team = room.teams.find(t => t.id === student.teamId);
      if (team) {
        team.score = (team.score || 0) + pointsEarned;
      }
    }

    console.log(`[RoomManager] 答题判定: 学生 "${student.name}" 作答 [${questionId}] -> 选: ${formattedSelected}, 标答: ${formattedCorrect}, 判定: ${isCorrect ? '✔正确(+100)' : '✘错误'}, 个人总分: ${student.score}`);

    return {
      isCorrect,
      pointsEarned,
      currentScore: student.score,
      student,
      logEntry
    };
  }

  // =========================================================================
  // 【第 4 步核心】：Kahoot 式结算颁奖与全量错题学情复盘聚合引擎
  // =========================================================================

  /**
   * 执行游戏结算与学情复盘数据聚合
   * @param {string} roomId 
   * @returns {Object} 包含 podium (领奖台前三), teamSummary (队伍排行与冠军), leaderboard (全员成绩及错题对照)
   */
  settleGame(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);

    // 状态变更为结算已完成
    room.status = 'finished';

    // 1. 全员得分排名与学情错题聚合
    const studentsList = Array.from(room.students.values());

    // 排序逻辑：积分降序，平分按错题数少者靠前，再平分按进房早者靠前
    studentsList.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.wrongCount !== b.wrongCount) return a.wrongCount - b.wrongCount;
      return a.joinedAt - b.joinedAt;
    });

    // 映射构建完整学情复盘看板数据（含错题对照）
    const leaderboard = studentsList.map((student, index) => {
      const team = room.teams.find(t => t.id === student.teamId);

      // 从答题流水账本中提取全部错题
      const wrongQuestions = (student.answerLogs || [])
        .filter(log => !log.isCorrect)
        .map(log => {
          let studentSelectedText = String(log.studentSelected);
          let correctAnswerText = String(log.correctAnswer);

          // 如果题目选项为字典对象结构（如 { A: "5", B: "6" }），提取文字标签
          if (log.options && typeof log.options === 'object' && !Array.isArray(log.options)) {
            if (log.options[log.studentSelected] !== undefined) {
              studentSelectedText = `${log.studentSelected} (${log.options[log.studentSelected]})`;
            }
            if (log.options[log.correctAnswer] !== undefined) {
              correctAnswerText = `${log.correctAnswer} (${log.options[log.correctAnswer]})`;
            }
          }

          const qIndex = room.questions.findIndex(
            q => (q.id === log.questionId || q.questionId === log.questionId)
          );
          const rawQ = qIndex >= 0 ? room.questions[qIndex] : null;

          return {
            questionId: log.questionId,
            questionNumber: qIndex >= 0 ? qIndex + 1 : 1,
            questionText: log.questionText,
            options: log.options,
            studentSelected: log.studentSelected,
            studentSelectedText,
            correctAnswer: log.correctAnswer,
            correctAnswerText,
            explanation: rawQ?.explanation || `标准正确答案是 ${correctAnswerText}。`
          };
        });

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
        wrongCount: student.wrongCount || 0,
        correctCount: Math.max(0, (student.answerLogs || []).length - (student.wrongCount || 0)),
        totalAnswered: (student.answerLogs || []).length,
        isPerfect: wrongQuestions.length === 0,
        wrongQuestions
      };
    });

    // 2. 领奖台 Podium（提取前 1、2、3 名）
    const podium = leaderboard.slice(0, 3).map(item => ({
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
      isPerfect: item.isPerfect
    }));

    // 3. 队伍排名与冠军评选
    const teamSummary = room.teams.map(team => {
      // 重新统计该队学生与团队当前总积分
      const teamStudents = studentsList.filter(s => s.teamId === team.id);
      const calculatedScore = teamStudents.reduce((acc, curr) => acc + (curr.score || 0), 0);

      return {
        teamId: team.id,
        name: team.name,
        color: team.color,
        score: calculatedScore,
        memberCount: teamStudents.length
      };
    }).sort((a, b) => b.score - a.score);

    const winnerTeam = teamSummary.length > 0 ? teamSummary[0] : null;

    const settlementData = {
      roomId: room.roomId,
      roomName: room.roomName,
      totalQuestions: room.questions.length,
      finishedAt: Date.now(),
      winnerTeam,
      podium,
      teamSummary,
      leaderboard
    };

    // 保存进沙箱
    room.settlementData = settlementData;

    console.log(`[RoomManager] 房间 [${room.roomName}] 结算完毕: 冠军队伍 [${winnerTeam ? winnerTeam.name : '无'}]，榜首个人 [${podium[0] ? podium[0].name : '无'}] (满分学员: ${leaderboard.filter(l => l.isPerfect).length} 人)`);

    return settlementData;
  }

  /**
   * 重置房间本局比赛积分与作答记录（供老师点击「再来一局」时全房同步重开）
   */
  resetRoomGame(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`房间不存在: ${roomId}`);

    room.status = 'waiting';
    room.settlementData = null;
    room.sandboxState = {
      currentQuestionIndex: -1,
      activeQuestionId: null,
      activeStage: 'lobby',
      scores: {},
      answers: {}
    };

    for (const team of room.teams) {
      team.score = 0;
    }

    for (const student of room.students.values()) {
      student.score = 0;
      student.streak = 0;
      student.wrongCount = 0;
      student.lastQuestionId = null;
      student.lastAnswerIndex = null;
      student.lastIsCorrect = null;
      if (student.answeredQuestionIds) {
        student.answeredQuestionIds.clear();
      } else {
        student.answeredQuestionIds = new Set();
      }
      student.answerLogs = [];
    }

    console.log(`[RoomManager] 房间 [${room.roomName}] 已重置本局成绩，全员返回等待大厅`);
    return this.getRoomRoster(roomId);
  }

  /**
   * 获取房间当前的结算数据
   * @param {string} roomId 
   * @returns {Object|null}
   */
  getSettlementData(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    return room.settlementData || null;
  }

  /**
   * 获取实时积分排行榜速报
   */
  getScoreboard(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    const teams = room.teams.map(t => ({
      teamId: t.id,
      name: t.name,
      color: t.color,
      score: t.score || 0,
      memberCount: Array.from(room.students.values()).filter(s => s.teamId === t.id).length
    })).sort((a, b) => b.score - a.score);

    const activeQId = room.sandboxState?.activeQuestionId || null;

    const students = Array.from(room.students.values()).map(s => {
      const hasAnsweredCurrent = Boolean(
        activeQId &&
        (s.lastQuestionId === activeQId || (s.answeredQuestionIds && s.answeredQuestionIds.has(activeQId)))
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
        answeredCount: s.answeredQuestionIds ? s.answeredQuestionIds.size : s.answerLogs.length
      };
    }).sort((a, b) => b.score - a.score);

    return {
      roomId: room.roomId,
      activeQuestionId: activeQId,
      currentQuestionIndex: room.sandboxState?.currentQuestionIndex ?? -1,
      teams,
      students,
      updatedAt: Date.now()
    };
  }

  /**
   * 获取学生完整的答题流水账本
   */
  getStudentAnswerLogs(roomId, studentId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    const student = room.students.get(studentId);
    if (!student) return null;

    return {
      studentId: student.studentId,
      name: student.name,
      teamId: student.teamId,
      score: student.score,
      wrongCount: student.wrongCount,
      answeredCount: student.answerLogs.length,
      answerLogs: deepClone(student.answerLogs)
    };
  }

  /**
   * 获取房间花名册
   */
  getRoomRoster(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    return {
      roomId: room.roomId,
      roomName: room.roomName,
      hasTeams: room.hasTeams,
      teams: deepClone(room.teams),
      students: Array.from(room.students.values()).map(s => ({
        studentId: s.studentId,
        name: s.name,
        avatar: s.avatar || './assets/games/char_b.png',
        teamId: s.teamId,
        score: s.score || 0,
        streak: s.streak || 0,
        joinedAt: s.joinedAt
      }))
    };
  }

  getStudent(roomId, studentId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    return room.students.get(studentId) || null;
  }

  getRoom(roomId) {
    return this.rooms.get(roomId) || null;
  }

  getRoomSnapshot(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    return {
      roomId: room.roomId,
      pin: room.pin,
      teacherId: room.teacherId,
      teacherSocketId: room.teacherSocketId,
      roomName: room.roomName,
      gameId: room.gameId,
      gameMode: room.gameMode,
      hasTeams: room.hasTeams,
      teams: deepClone(room.teams),
      config: deepClone(room.config),
      questions: deepClone(room.questions),
      createdAt: room.createdAt,
      status: room.status,
      studentCount: room.students.size,
      playerCount: room.players.size
    };
  }

  getRoomByPin(pin) {
    const roomId = this.pinToRoomId.get(pin);
    if (!roomId) return null;
    return this.getRoomSnapshot(roomId);
  }

  closeRoom(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) {
      console.warn(`[RoomManager] 尝试关闭不存在的房间: ${roomId}`);
      return false;
    }

    const { pin, roomName } = room;

    room.status = 'closed';
    room.players.clear();
    room.students.clear();
    room.tokenToStudentId.clear();
    room.teams = [];
    room.questions = [];
    room.config = {};
    room.sandboxState = null;
    room.settlementData = null;

    this.pinToRoomId.delete(pin);
    this.rooms.delete(roomId);

    console.log(`[RoomManager] 房间已销毁并释放资源: "${roomName}" (ID: ${roomId}, PIN: ${pin})`);
    return true;
  }

  getRoomCount() {
    return this.rooms.size;
  }

  getAllRoomSummaries() {
    const summaries = [];
    for (const room of this.rooms.values()) {
      summaries.push({
        roomId: room.roomId,
        pin: room.pin,
        roomName: room.roomName,
        teacherId: room.teacherId,
        gameId: room.gameId,
        status: room.status,
        hasTeams: room.hasTeams,
        teamCount: room.teams.length,
        studentCount: room.students.size,
        playerCount: room.players.size,
        questionCount: room.questions.length,
        createdAt: room.createdAt
      });
    }
    return summaries;
  }

  findRoomByTeacherSocketId(socketId) {
    for (const room of this.rooms.values()) {
      if (room.teacherSocketId === socketId) {
        return room;
      }
    }
    return null;
  }
}
