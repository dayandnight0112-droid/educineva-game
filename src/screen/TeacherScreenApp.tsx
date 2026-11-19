import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Socket } from 'socket.io-client';
import {
  TeacherScreenState,
  ScreenSettings,
  ScreenTeam,
  ScreenStudent,
  ScreenQuizQuestion,
  TeamId,
} from './types';
import {
  DEFAULT_SCREEN_SETTINGS,
  INITIAL_TEAMS,
  INITIAL_STUDENTS,
  MOCK_SCREEN_QUESTIONS,
} from './mockData';
import { useDualCountdown } from './hooks/useDualCountdown';
import { ScreenHeader } from './components/ScreenHeader';
import { ScreenDebugBar } from './components/ScreenDebugBar';
import { SettingsModal } from './components/SettingsModal';
import { LobbyView } from './components/LobbyView';
import { QuestionLiveView } from './components/QuestionLiveView';
import { ResultStatsView } from './components/ResultStatsView';
import { ScoreboardView } from './components/ScoreboardView';
import { PodiumView } from './components/PodiumView';
import { createSocketConnection, normalizeTeamId } from '../socket/socketClient';

interface TeacherScreenAppProps {
  initialRoomId?: string;
  initialPin?: string;
  onBackToAdmin?: () => void;
}

/**
 * 将服务端题库结构转换为大屏展示标准结构
 */
function convertServerQuestionsToScreen(rawQuestions: any[]): ScreenQuizQuestion[] {
  if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
    return MOCK_SCREEN_QUESTIONS;
  }

  return rawQuestions.map((q, idx) => {
    const optsObj = q.options || {};
    const textA = optsObj.A ?? optsObj[0]?.text ?? optsObj[0] ?? '选项 A';
    const textB = optsObj.B ?? optsObj[1]?.text ?? optsObj[1] ?? '选项 B';
    const textC = optsObj.C ?? optsObj[2]?.text ?? optsObj[2] ?? '选项 C';
    const textD = optsObj.D ?? optsObj[3]?.text ?? optsObj[3] ?? '选项 D';

    const rawAns = String(q.correctAnswer || q.answer || 'C').toUpperCase();
    const correctIdx = ['A', 'B', 'C', 'D'].indexOf(rawAns);

    return {
      id: idx + 1,
      number: idx + 1,
      total: rawQuestions.length,
      prompt: q.questionText || q.title || q.stem || q.prompt || `第 ${idx + 1} 题`,
      category: q.category || '课堂互动挑战',
      type: 'single',
      points: 100,
      options: [
        {
          key: 'A',
          text: String(textA),
          color: 'red',
          symbol: '▲',
          bgClass: 'bg-rose-500 hover:bg-rose-600',
          borderClass: 'border-rose-300',
          badgeBg: 'bg-rose-600 text-white',
          glowColor: 'rgba(244, 63, 94, 0.4)',
        },
        {
          key: 'B',
          text: String(textB),
          color: 'blue',
          symbol: '◆',
          bgClass: 'bg-blue-500 hover:bg-blue-600',
          borderClass: 'border-blue-300',
          badgeBg: 'bg-blue-600 text-white',
          glowColor: 'rgba(59, 130, 246, 0.4)',
        },
        {
          key: 'C',
          text: String(textC),
          color: 'yellow',
          symbol: '●',
          bgClass: 'bg-amber-400 hover:bg-amber-500',
          borderClass: 'border-amber-200',
          badgeBg: 'bg-amber-500 text-slate-900',
          glowColor: 'rgba(245, 158, 11, 0.4)',
        },
        {
          key: 'D',
          text: String(textD),
          color: 'green',
          symbol: '■',
          bgClass: 'bg-emerald-500 hover:bg-emerald-600',
          borderClass: 'border-emerald-300',
          badgeBg: 'bg-emerald-600 text-white',
          glowColor: 'rgba(16, 185, 129, 0.4)',
        },
      ],
      correctOptionIndex: correctIdx >= 0 ? correctIdx : 2,
      explanation: q.explanation || '紧扣课堂核心知识点，熟能生巧！',
    };
  });
}

export const TeacherScreenApp: React.FC<TeacherScreenAppProps> = ({
  initialRoomId,
  initialPin,
  onBackToAdmin,
}) => {
  // 1. 全局配置与状态机
  const [settings, setSettings] = useState<ScreenSettings>(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    let savedPin: string | undefined;
    let savedRoomName: string | undefined;
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('educineva_active_room') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        savedPin = parsed?.pin;
        savedRoomName = parsed?.roomName;
      }
    } catch {
      // ignore
    }
    const urlPin = params?.get('pin') || initialPin || savedPin;
    return {
      ...DEFAULT_SCREEN_SETTINGS,
      pin: urlPin || DEFAULT_SCREEN_SETTINGS.pin,
      roomName: savedRoomName || DEFAULT_SCREEN_SETTINGS.roomName,
    };
  });
  const [currentState, setCurrentState] = useState<TeacherScreenState>('lobby');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<ScreenQuizQuestion[]>(MOCK_SCREEN_QUESTIONS);

  // 2. 战队与学生实体数据
  const [teams, setTeams] = useState<Record<'blue' | 'red' | 'yellow' | 'green', ScreenTeam>>(INITIAL_TEAMS);
  const [students, setStudents] = useState<ScreenStudent[]>(INITIAL_STUDENTS);

  // 3. UI 模态框与全屏 & 终局结算数据
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [liveSettlement, setLiveSettlement] = useState<any | null>(null);

  // Socket 引用与当前活跃房间 ID
  const socketRef = useRef<Socket | null>(null);
  const roomIdRef = useRef<string | null>(initialRoomId || null);
  const currentQIndexRef = useRef<number>(0);
  currentQIndexRef.current = currentQIndex;

  // 当前题目
  const currentQ: ScreenQuizQuestion = questions[currentQIndex] || questions[0];

  // 辅助：向母体同步当前大屏状态
  const syncStageToStudents = useCallback(
    (state: TeacherScreenState, qIdx: number, timeLeft?: number) => {
      if (socketRef.current && roomIdRef.current) {
        socketRef.current.emit('teacher_sync_stage', {
          roomId: roomIdRef.current,
          state,
          questionIndex: qIdx,
          timeLeft,
        });
      }
    },
    []
  );

  // 4. 双阶段倒计时控制器 (倒计时 1: 题干审题; 倒计时 2: 选项抢答)
  const countdown = useDualCountdown({
    durationTimer1: settings.durationTimer1,
    durationTimer2: settings.durationTimer2,
    autoAdvance: settings.autoAdvanceToOptions,
    onTimer1Complete: () => {
      // 审题倒计时 1 结束 -> 自动转入 阶段 2B：四色选项展开与抢答
      setCurrentState('question-options');
      syncStageToStudents('question-options', currentQIndexRef.current, settings.durationTimer2);
    },
    onTimer2Complete: () => {
      // 抢答倒计时 2 结束 -> 自动转入 画面三：条形统计分布与答案揭晓
      setCurrentState('result-stats');
      syncStageToStudents('result-stats', currentQIndexRef.current, 0);
    },
  });

  // 连接 Educineva 母体 Socket 服务
  useEffect(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    let savedRoomId: string | undefined;
    let savedPin: string | undefined;
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('educineva_active_room') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        savedRoomId = parsed?.roomId;
        savedPin = parsed?.pin;
      }
    } catch {
      // ignore
    }

    const targetRoomId = initialRoomId || params?.get('roomId') || savedRoomId || undefined;
    const targetPin = initialPin || params?.get('pin') || savedPin || undefined;

    const socket = createSocketConnection();
    socketRef.current = socket;

    const createNewScreenRoom = () => {
      const serverQuestions = MOCK_SCREEN_QUESTIONS.map((q) => ({
        id: `q_${q.id}`,
        questionText: q.prompt,
        options: {
          A: q.options[0].text,
          B: q.options[1].text,
          C: q.options[2].text,
          D: q.options[3].text,
        },
        correctAnswer: ['A', 'B', 'C', 'D'][q.correctOptionIndex],
        explanation: q.explanation,
      }));

      socket.emit(
        'teacher_create_room',
        {
          teacherId: 'teacher_screen_host',
          roomName: settings.roomName,
          gameId: 'speed-racing',
          gameMode: 'team',
          config: {
            hasTeams: true,
            teamMode: settings.teamMode || 2,
            timePerQuestion: settings.durationTimer2,
            teams: [
              { id: 'blue', name: '🟦 蓝队勇士', color: '#3B82F6', score: 0 },
              { id: 'red', name: '🟥 红队先锋', color: '#EF4444', score: 0 },
            ],
          },
          questions: serverQuestions,
        },
        (res: any) => {
          if (res && res.success) {
            roomIdRef.current = res.roomId;
            setSettings((prev) => ({ ...prev, pin: res.pin }));
            setStudents([]);
            setTeams((prev) => ({
              blue: { ...prev.blue, score: 0, membersCount: 0 },
              red: { ...prev.red, score: 0, membersCount: 0 },
              yellow: { ...prev.yellow, score: 0, membersCount: 0 },
              green: { ...prev.green, score: 0, membersCount: 0 },
            }));
            try {
              localStorage.setItem(
                'educineva_active_room',
                JSON.stringify({
                  roomId: res.roomId,
                  pin: res.pin,
                  roomName: settings.roomName,
                  createdAt: Date.now(),
                })
              );
            } catch {
              // ignore
            }
          }
        }
      );
    };

    socket.on('connect', () => {
      // 优先绑定教师在管理后台已创建的房间（含 autoLatest 自动吸附最新活跃课堂）
      socket.emit(
        'teacher_bind_room',
        { roomId: targetRoomId, pin: targetPin, autoLatest: true },
        (res: any) => {
          if (res && res.success) {
            roomIdRef.current = res.roomId;
            setSettings((prev) => ({
              ...prev,
              pin: res.pin,
              roomName: res.roomData?.roomName || prev.roomName,
              teamMode: res.roomData?.config?.teamMode || prev.teamMode,
            }));
            setTeams((prev) => {
              const next = {
                blue: { ...prev.blue, score: 0, membersCount: 0 },
                red: { ...prev.red, score: 0, membersCount: 0 },
                yellow: { ...prev.yellow, score: 0, membersCount: 0 },
                green: { ...prev.green, score: 0, membersCount: 0 },
              };
              if (Array.isArray(res.roomData?.teams)) {
                res.roomData.teams.forEach((t: any) => {
                  const tid = normalizeTeamId(t.id || t.teamId);
                  if (next[tid]) {
                    next[tid] = {
                      ...next[tid],
                      score: t.score || 0,
                    };
                  }
                });
              }
              return next;
            });
            try {
              localStorage.setItem(
                'educineva_active_room',
                JSON.stringify({
                  roomId: res.roomId,
                  pin: res.pin,
                  roomName: res.roomData?.roomName || settings.roomName,
                  createdAt: Date.now(),
                })
              );
            } catch {
              // ignore
            }
            if (res.roomData?.questions?.length > 0) {
              setQuestions(convertServerQuestionsToScreen(res.roomData.questions));
            }
            if (Array.isArray(res.roster?.students)) {
              const mapped: ScreenStudent[] = res.roster.students.map((s: any) => ({
                id: s.studentId,
                name: s.name,
                avatar: s.avatar || './assets/games/char_b.png',
                teamId: normalizeTeamId(s.teamId),
                score: s.score || 0,
                streak: s.streak || 0,
                isReady: true,
                currentAnswerIndex: null,
                isSubmitted: false,
              }));
              setStudents(mapped);
            }
          } else {
            createNewScreenRoom();
          }
        }
      );
    });

    // 监听真实学生进房与队伍变动花名册
    socket.on('room_roster_update', (roster: any) => {
      if (!roster || !Array.isArray(roster.students)) return;
      if (Array.isArray(roster.teams) && (roster.teams.length === 2 || roster.teams.length === 3 || roster.teams.length === 4)) {
        setSettings((prev) => ({ ...prev, teamMode: roster.teams.length as 2 | 3 | 4 }));
      }
      setStudents((prev) => {
        return roster.students.map((s: any) => {
          const existing = prev.find((p) => p.id === s.studentId);
          return {
            id: s.studentId,
            name: s.name,
            avatar: s.avatar || existing?.avatar || './assets/games/char_b.png',
            teamId: normalizeTeamId(s.teamId),
            score: s.score ?? existing?.score ?? 0,
            streak: s.streak ?? existing?.streak ?? 0,
            isReady: true,
            currentAnswerIndex: existing?.currentAnswerIndex ?? null,
            isSubmitted: existing?.isSubmitted ?? false,
            isCorrect: existing?.isCorrect,
          };
        });
      });
    });

    // 监听真实学生提交答案与实时计分板更新
    socket.on('scoreboard_update', (scoreboard: any) => {
      if (!scoreboard) return;

      if (Array.isArray(scoreboard.teams)) {
        setTeams((prev) => {
          const next = { ...prev };
          scoreboard.teams.forEach((t: any) => {
            const tid = normalizeTeamId(t.teamId);
            if (next[tid]) {
              next[tid] = {
                ...next[tid],
                score: t.score || 0,
                membersCount: t.memberCount ?? next[tid].membersCount,
              };
            }
          });
          return next;
        });
      }

      if (Array.isArray(scoreboard.students) && scoreboard.students.length > 0) {
        setStudents((prev) => {
          return scoreboard.students.map((s: any) => {
            const existing = prev.find((p) => p.id === s.studentId);
            const hasAnsweredCurrent = Boolean(
              s.hasAnsweredCurrent ??
                (scoreboard.activeQuestionId && s.lastQuestionId === scoreboard.activeQuestionId)
            );
            return {
              id: s.studentId,
              name: s.name,
              avatar: s.avatar || existing?.avatar || './assets/games/char_b.png',
              teamId: normalizeTeamId(s.teamId),
              score: s.score ?? 0,
              streak: s.streak ?? 0,
              isReady: true,
              currentAnswerIndex: hasAnsweredCurrent
                ? (s.lastAnswerIndex ?? existing?.currentAnswerIndex ?? 0)
                : (existing?.currentAnswerIndex ?? null),
              isSubmitted: hasAnsweredCurrent ? true : (existing?.isSubmitted ?? false),
              isCorrect: hasAnsweredCurrent ? s.lastIsCorrect : existing?.isCorrect,
            };
          });
        });
      }
    });

    // 监听母体终局结算广播（同步领奖台第 1/2/3 名、获胜战队与全班排行榜）
    socket.on('game_settlement_data', (settlementData: any) => {
      if (settlementData) {
        setLiveSettlement(settlementData);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [initialRoomId, initialPin]);

  // 统计当前提交人数
  const submittedCount = students.filter((s) => s.isSubmitted).length;

  // 当在作答阶段 (question-options) 全班所有在场学生均已交卷时，自动揭晓统计
  useEffect(() => {
    if (
      currentState === 'question-options' &&
      students.length > 0 &&
      submittedCount >= students.length
    ) {
      const timer = setTimeout(() => {
        countdown.reset();
        setCurrentState('result-stats');
        syncStageToStudents('result-stats', currentQIndex, 0);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [currentState, students.length, submittedCount, countdown, currentQIndex, syncStageToStudents]);

  // 5. 状态流转处理函数
  // 5.1 点击“开始对决” -> 进入第1题阶段 2A (题干审题)
  const handleStartGame = useCallback(() => {
    setLiveSettlement(null);
    setCurrentQIndex(0);
    setCurrentState('question-prompt');
    setStudents((prev) =>
      prev.map((s) => ({ ...s, isSubmitted: false, currentAnswerIndex: null }))
    );
    countdown.startTimer1(settings.durationTimer1);

    if (socketRef.current && roomIdRef.current) {
      socketRef.current.emit('teacher_push_question', {
        roomId: roomIdRef.current,
        questionIndex: 0,
      });
      syncStageToStudents('question-prompt', 0, settings.durationTimer1);
    }
  }, [countdown, settings.durationTimer1, syncStageToStudents]);

  // 5.2 老师提前点击“立即展开选项” (跳过审题倒计时 1)
  const handleRevealOptionsEarly = useCallback(() => {
    countdown.skip(); // 触发 onTimer1Complete 并启动 Timer 2
  }, [countdown]);

  // 5.3 老师提前点击“提前揭晓答案” (跳过作答倒计时 2)
  const handleRevealResultEarly = useCallback(() => {
    countdown.skip(); // 触发 onTimer2Complete
  }, [countdown]);

  // 5.3.1 跳过本题
  const handleSkipQuestion = useCallback(() => {
    countdown.reset();
    setCurrentState('result-stats');
    syncStageToStudents('result-stats', currentQIndex, 0);
  }, [countdown, currentQIndex, syncStageToStudents]);

  // 5.3.2 老师点击“调配队伍” (根据当前 2/3/4 队模式均衡轮换分配)
  const handleRebalanceTeams = useCallback(() => {
    const teamKeys: ('blue' | 'red' | 'yellow' | 'green')[] = ['blue', 'red', 'yellow', 'green'];
    const mode = settings.teamMode || 2;
    setStudents((prev) =>
      prev.map((s, idx) => ({
        ...s,
        teamId: teamKeys[idx % mode],
      }))
    );

    if (socketRef.current && roomIdRef.current) {
      socketRef.current.emit('teacher_rebalance_teams', {
        roomId: roomIdRef.current,
        teamMode: mode,
      });
    }
  }, [settings.teamMode]);

  // 5.3.3 切换队伍数量模式 (2 队 / 3 队 / 4 队)
  const handleChangeTeamMode = useCallback((mode: 2 | 3 | 4) => {
    setSettings((prev) => ({ ...prev, teamMode: mode }));
    const teamKeys: ('blue' | 'red' | 'yellow' | 'green')[] = ['blue', 'red', 'yellow', 'green'];
    setStudents((prev) =>
      prev.map((s, idx) => ({
        ...s,
        teamId: teamKeys[idx % mode],
      }))
    );

    if (socketRef.current && roomIdRef.current) {
      socketRef.current.emit('teacher_rebalance_teams', {
        roomId: roomIdRef.current,
        teamMode: mode,
      });
    }
  }, []);

  // 5.3.4 老师在大屏等待大厅点击某个学生卡片，单独将该学生调换至下一支队伍
  const handleMoveStudent = useCallback(
    (studentId: string) => {
      const teamKeys: TeamId[] = ['blue', 'red', 'yellow', 'green'];
      const mode = settings.teamMode || 2;
      const activeKeys = teamKeys.slice(0, mode);

      setStudents((prev) =>
        prev.map((s) => {
          if (s.id !== studentId) return s;
          const currIdx = activeKeys.indexOf(s.teamId);
          const nextTeamId = activeKeys[(currIdx + 1) % activeKeys.length];

          if (socketRef.current && roomIdRef.current) {
            socketRef.current.emit('teacher_move_student', {
              roomId: roomIdRef.current,
              studentId: s.id,
              targetTeamId: nextTeamId,
            });
          }

          return {
            ...s,
            teamId: nextTeamId,
          };
        })
      );
    },
    [settings.teamMode]
  );

  // 5.3.5 切换房间锁定状态
  const handleToggleLockRoom = useCallback(() => {
    setSettings((prev) => {
      const nextLocked = !prev.isRoomLocked;
      if (socketRef.current && roomIdRef.current) {
        socketRef.current.emit('teacher_toggle_lock_room', {
          roomId: roomIdRef.current,
          isLocked: nextLocked,
        });
      }
      return { ...prev, isRoomLocked: nextLocked };
    });
  }, []);

  // 5.4 从画面三(统计) -> 点击进入画面四(局间积分榜)
  const handleProceedFromStats = useCallback(() => {
    setCurrentState('scoreboard');
    syncStageToStudents('scoreboard', currentQIndex, 0);
  }, [currentQIndex, syncStageToStudents]);

  // 5.5 从局间积分榜 -> 进入下一题或终局颁奖
  const handleNextFromScoreboard = useCallback(() => {
    if (currentQIndex < questions.length - 1) {
      const nextIdx = currentQIndex + 1;
      setCurrentQIndex(nextIdx);
      setCurrentState('question-prompt');
      setStudents((prev) =>
        prev.map((s) => ({ ...s, isSubmitted: false, currentAnswerIndex: null }))
      );
      countdown.startTimer1(settings.durationTimer1);

      if (socketRef.current && roomIdRef.current) {
        socketRef.current.emit('teacher_push_question', {
          roomId: roomIdRef.current,
          questionIndex: nextIdx,
        });
        syncStageToStudents('question-prompt', nextIdx, settings.durationTimer1);
      }
    } else {
      // 全部题目答完 -> 进画面五：终局颁奖典礼
      setCurrentState('podium');
      if (socketRef.current && roomIdRef.current) {
        socketRef.current.emit(
          'teacher_end_game',
          {
            roomId: roomIdRef.current,
          },
          (res: any) => {
            if (res?.success && res.settlementData) {
              setLiveSettlement(res.settlementData);
            }
          }
        );
        syncStageToStudents('podium', currentQIndex, 0);
      }
    }
  }, [currentQIndex, questions.length, countdown, settings.durationTimer1, syncStageToStudents]);

  // 6. 全屏切换监听与控制
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 7. 离线调试控制动作
  const handleSelectDebugState = (state: TeacherScreenState) => {
    setCurrentState(state);
    if (state === 'question-prompt') {
      countdown.startTimer1(settings.durationTimer1);
      if (socketRef.current && roomIdRef.current) {
        socketRef.current.emit('teacher_push_question', {
          roomId: roomIdRef.current,
          questionIndex: currentQIndex,
        });
      }
      syncStageToStudents('question-prompt', currentQIndex, settings.durationTimer1);
    } else if (state === 'question-options') {
      countdown.startTimer2(settings.durationTimer2);
      syncStageToStudents('question-options', currentQIndex, settings.durationTimer2);
    } else if (state === 'podium') {
      countdown.reset();
      if (socketRef.current && roomIdRef.current) {
        socketRef.current.emit(
          'teacher_end_game',
          {
            roomId: roomIdRef.current,
          },
          (res: any) => {
            if (res?.success && res.settlementData) {
              setLiveSettlement(res.settlementData);
            }
          }
        );
      }
      syncStageToStudents('podium', currentQIndex, 0);
    } else {
      countdown.reset();
      syncStageToStudents(state, currentQIndex, 0);
    }
  };

  const handleSelectDebugQuestion = (index: number) => {
    setCurrentQIndex(index);
    setStudents((prev) =>
      prev.map((s) => ({ ...s, isSubmitted: false, currentAnswerIndex: null }))
    );
    if (currentState === 'question-prompt') {
      countdown.startTimer1(settings.durationTimer1);
      if (socketRef.current && roomIdRef.current) {
        socketRef.current.emit('teacher_push_question', {
          roomId: roomIdRef.current,
          questionIndex: index,
        });
      }
    } else if (currentState === 'question-options') {
      countdown.startTimer2(settings.durationTimer2);
      if (socketRef.current && roomIdRef.current) {
        socketRef.current.emit('teacher_push_question', {
          roomId: roomIdRef.current,
          questionIndex: index,
        });
      }
    }
  };

  const handleSimulateAddStudents = (count: number) => {
    setStudents((prev) => {
      const newStudents: ScreenStudent[] = [];
      for (let i = 0; i < count; i++) {
        const id = `s_sim_${Date.now()}_${i}`;
        const teamId = prev.length % 2 === 0 ? 'blue' : 'red';
        newStudents.push({
          id,
          name: `萌新达人${prev.length + i + 1}`,
          avatar: './assets/games/char_b.png',
          teamId,
          score: 100,
          streak: 1,
          isReady: true,
          currentAnswerIndex: Math.floor(Math.random() * 4),
          isSubmitted: true,
          submitTimeSec: 5,
        });
      }
      return [...prev, ...newStudents];
    });
  };

  const handleSimulateSubmissionRatio = (ratio: number) => {
    setStudents((prev) => {
      const targetCount = Math.round(prev.length * ratio);
      return prev.map((s, idx) => {
        const shouldSubmit = idx < targetCount;
        return {
          ...s,
          isSubmitted: shouldSubmit,
          currentAnswerIndex: shouldSubmit ? (s.currentAnswerIndex ?? 2) : null,
        };
      });
    });
  };

  const handleResetAll = () => {
    setLiveSettlement(null);
    setCurrentState('lobby');
    setCurrentQIndex(0);
    setStudents((prev) =>
      prev.map((s) => ({ ...s, score: 0, streak: 0, isSubmitted: false, currentAnswerIndex: null }))
    );
    setTeams((prev) => ({
      blue: { ...prev.blue, score: 0 },
      red: { ...prev.red, score: 0 },
      yellow: { ...prev.yellow, score: 0 },
      green: { ...prev.green, score: 0 },
    }));
    countdown.reset();
    syncStageToStudents('lobby', 0, 0);
  };

  const handleUpdateSettings = (newSettings: Partial<ScreenSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-radial from-slate-900 via-indigo-950 to-slate-950 text-white font-sans select-none relative">
      {/* 顶部常驻大屏信息与状态栏 */}
      <ScreenHeader
        currentState={currentState}
        settings={settings}
        teams={teams}
        totalStudents={students.length}
        submittedCount={submittedCount}
        currentQNum={currentQ.number}
        totalQNum={questions.length}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleSound={() => handleUpdateSettings({ soundEnabled: !settings.soundEnabled })}
        onBackToAdmin={onBackToAdmin}
      />

      {/* 大屏核心舞台区域 (1080P/4K 高清视窗容器，保持沉浸式与自适应比例) */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-1 sm:p-2 lg:p-2.5 flex flex-col justify-center items-center relative overflow-hidden">
        {/* 画面一：等待大厅与投屏扫码 */}
        {currentState === 'lobby' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-slate-900/40 rounded-3xl border border-slate-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden animate-fadeIn">
            <LobbyView
              settings={settings}
              teams={teams}
              students={students}
              onStartGame={handleStartGame}
              onRebalanceTeams={handleRebalanceTeams}
              onToggleLockRoom={handleToggleLockRoom}
              onChangeTeamMode={handleChangeTeamMode}
              onMoveStudent={handleMoveStudent}
            />
          </div>
        )}

        {/* 画面二：题目展示与倒计时大屏 (含 2A 题干审题思考 + 2B 四色选项展开抢答) */}
        {(currentState === 'question-prompt' || currentState === 'question-options') && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-slate-900/40 rounded-3xl border border-slate-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden animate-fadeIn">
            <QuestionLiveView
              currentState={currentState}
              question={currentQ}
              timeLeft={countdown.timeLeft}
              totalTime={countdown.totalTime}
              isUrgent={countdown.isUrgent}
              isRunning={countdown.isRunning}
              submittedCount={submittedCount}
              totalStudents={students.length}
              onRevealOptionsEarly={handleRevealOptionsEarly}
              onRevealResultEarly={handleRevealResultEarly}
              onSkipQuestion={handleSkipQuestion}
              onToggleTimer={() => (countdown.isRunning ? countdown.pause() : countdown.resume())}
            />
          </div>
        )}

        {/* 画面三：条形统计分布图与答案揭晓 */}
        {currentState === 'result-stats' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-slate-900/40 rounded-3xl border border-slate-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden animate-fadeIn">
            <ResultStatsView
              question={currentQ}
              students={students}
              onProceed={handleProceedFromStats}
            />
          </div>
        )}

        {/* 画面四：局间积分榜与战队态势 */}
        {currentState === 'scoreboard' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-slate-900/40 rounded-3xl border border-slate-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden animate-fadeIn">
            <ScoreboardView
              teams={teams}
              students={students}
              currentQIndex={currentQIndex}
              totalQuestions={questions.length}
              teamMode={settings.teamMode || 2}
              onNext={handleNextFromScoreboard}
            />
          </div>
        )}

        {/* 画面五：终局颁奖典礼与教学洞察 */}
        {currentState === 'podium' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-slate-900/40 rounded-3xl border border-slate-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden animate-fadeIn">
            <PodiumView
              roomName={settings.roomName}
              teams={teams}
              students={students}
              questions={questions}
              teamMode={settings.teamMode || 2}
              settlementData={liveSettlement}
              onRestart={handleResetAll}
            />
          </div>
        )}
      </main>

      {/* 参数与倒计时设置弹窗 */}
      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* 底部常驻离线调试工具条 (Debug Bar) */}
      <ScreenDebugBar
        currentState={currentState}
        currentQIndex={currentQIndex}
        totalQuestions={questions.length}
        isTimerRunning={countdown.isRunning}
        timeLeft={countdown.timeLeft}
        countdownPhase={countdown.phase}
        settings={settings}
        onSelectState={handleSelectDebugState}
        onSelectQuestion={handleSelectDebugQuestion}
        onToggleTimer={() => (countdown.isRunning ? countdown.pause() : countdown.resume())}
        onSkipTimer={countdown.skip}
        onSimulateAddStudents={handleSimulateAddStudents}
        onSimulateSubmissionRatio={handleSimulateSubmissionRatio}
        onResetAll={handleResetAll}
        onUpdateSettings={handleUpdateSettings}
        onChangeTeamMode={handleChangeTeamMode}
      />
    </div>
  );
};
