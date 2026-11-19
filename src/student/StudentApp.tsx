import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { StudentScreen, CartoonAvatar, StudentMistakeItem } from './types';
import { StudentHeader } from './components/StudentHeader';
import { GameGallery } from './components/GameGallery';
import { JoinModal } from './components/JoinModal';
import { LobbyView } from './components/LobbyView';
import { QuizArena, LiveDesensitizedQuestion } from './components/QuizArena';
import { SettlementView } from './components/SettlementView';
import { DebugBar } from './components/DebugBar';
import { CARTOON_AVATARS, MOCK_SETTLEMENT_DATA, PRESET_TEAMS } from './mockData';
import {
  createSocketConnection,
  getSocketServerUrl,
  normalizeTeamId,
} from '../socket/socketClient';
import { ArrowLeft } from 'lucide-react';

interface StudentAppProps {
  onBackToTeacherAdmin?: () => void;
}

export interface StudentSession {
  roomId?: string;
  studentId?: string;
  studentToken?: string;
  pin: string;
  nickname: string;
  avatar: CartoonAvatar;
  roomName: string;
  teamId: string;
  lastScore: number;
  correctCount: number;
  wrongCount: number;
  mistakes: StudentMistakeItem[];
}

export const StudentApp: React.FC<StudentAppProps> = ({ onBackToTeacherAdmin }) => {
  // 当前处于的画面状态，默认处于 1. 大厅主页 (Landing View)
  const [currentScreen, setCurrentScreen] = useState<StudentScreen>('landing');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [quizMode, setQuizMode] = useState<'pad' | 'game'>('pad');
  const [suggestedPin, setSuggestedPin] = useState<string>('686868');

  // 母体实时同步状态
  const [liveTeammates, setLiveTeammates] = useState<
    Array<{ id: string; name: string; avatar: string; teamId: string; isReady?: boolean }> | undefined
  >(undefined);
  const [teamChangeNotice, setTeamChangeNotice] = useState<{
    prevTeamName: string;
    newTeamName: string;
  } | null>(null);
  const [liveQuestion, setLiveQuestion] = useState<LiveDesensitizedQuestion | null>(null);
  const [liveStage, setLiveStage] = useState<string | null>(null);
  const [liveStageTimeLeft, setLiveStageTimeLeft] = useState<number | undefined>(undefined);
  const [liveSettlementData, setLiveSettlementData] = useState<any | null>(null);

  // 当前学生的用户身份与房间会话状态
  const [studentSession, setStudentSession] = useState<StudentSession>({
    pin: '686868',
    nickname: '机智小明',
    avatar: CARTOON_AVATARS[0],
    roomName: '一年级数学趣味大作战',
    teamId: 'blue',
    lastScore: 400,
    correctCount: 4,
    wrongCount: 1,
    mistakes: MOCK_SETTLEMENT_DATA.mistakes,
  });

  const socketRef = useRef<Socket | null>(null);
  const sessionRef = useRef<StudentSession>(studentSession);
  sessionRef.current = studentSession;

  // 打开加入弹窗时，自动探测母体服务器当前最新开启的课堂 PIN 码，方便一键填入测试
  useEffect(() => {
    if (!isJoinModalOpen) return;
    try {
      const saved = localStorage.getItem('educineva_active_room');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.pin) {
          setSuggestedPin(String(parsed.pin));
        }
      }
    } catch {
      // ignore
    }

    const serverUrl = getSocketServerUrl();
    fetch(`${serverUrl}/api/rooms`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.rooms) && data.rooms.length > 0) {
          const activeRooms = data.rooms
            .filter((r: any) => r.status !== 'closed')
            .sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
          const latestRoom = activeRooms[0] || data.rooms[data.rooms.length - 1];
          if (latestRoom?.pin) {
            setSuggestedPin(String(latestRoom.pin));
          }
        }
      })
      .catch(() => {
        // 离线环境静默忽略
      });
  }, [isJoinModalOpen]);

  // 初始化与 Educineva 母体 Socket 服务的长连接
  useEffect(() => {
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.on('connect', () => {
      // 如果已有会话凭证（断线重连恢复）
      const sess = sessionRef.current;
      if (sess.roomId && sess.studentToken) {
        socket.emit(
          'student_reconnect',
          {
            roomId: sess.roomId,
            studentToken: sess.studentToken,
          },
          (res: any) => {
            if (res && res.success) {
              setStudentSession((prev) => ({
                ...prev,
                teamId: normalizeTeamId(res.teamId),
                lastScore: res.score ?? prev.lastScore,
              }));
            }
          }
        );
      }
    });

    // 1. 监听等待大厅全房花名册同步
    socket.on('room_roster_update', (roster: any) => {
      if (!roster || !Array.isArray(roster.students)) return;
      const myId = sessionRef.current.studentId;
      const me = roster.students.find((s: any) => s.studentId === myId);
      if (me) {
        const normalizedNewTeam = normalizeTeamId(me.teamId);
        setStudentSession((prev) => ({
          ...prev,
          roomName: roster.roomName || prev.roomName,
          teamId: normalizedNewTeam,
        }));
      }

      const others = roster.students
        .filter((s: any) => s.studentId !== myId)
        .map((s: any) => ({
          id: s.studentId,
          name: s.name,
          avatar: s.avatar || './assets/games/char_b.png',
          teamId: normalizeTeamId(s.teamId),
          isReady: true,
        }));

      setLiveTeammates(others);
    });

    // 2. 监听老师在后台/大屏单独调动当前学生队伍的定向提醒
    socket.on('your_team_changed', (evt: any) => {
      if (!evt) return;
      const prevTeam = PRESET_TEAMS[sessionRef.current.teamId] || PRESET_TEAMS.blue;
      const newTeamKey = normalizeTeamId(evt.teamId);
      const nextTeam = PRESET_TEAMS[newTeamKey] || PRESET_TEAMS.blue;

      setStudentSession((prev) => ({
        ...prev,
        teamId: newTeamKey,
      }));
      setTeamChangeNotice({
        prevTeamName: prevTeam.name,
        newTeamName: evt.teamName || nextTeam.name,
      });
    });

    // 3. 监听老师大屏下发脱敏新题目 -> 自动从等待大厅切入 4 色几何手柄答题界面
    socket.on('new_question', (questionData: LiveDesensitizedQuestion) => {
      if (!questionData) return;
      setLiveQuestion(questionData);
      setLiveStage('question-prompt');
      setCurrentScreen('quiz');
    });

    const applySettlementToSession = (settlementData: any) => {
      if (!settlementData || !Array.isArray(settlementData.leaderboard)) return;
      setLiveSettlementData(settlementData);
      const myId = sessionRef.current.studentId;
      const myRecord =
        settlementData.leaderboard.find((item: any) => item.studentId === myId) ||
        settlementData.leaderboard.find((item: any) => item.name === sessionRef.current.nickname);

      if (myRecord) {
        const mappedMistakes: StudentMistakeItem[] = (myRecord.wrongQuestions || []).map(
          (wq: any, idx: number) => ({
            questionNumber: wq.questionNumber || idx + 1,
            prompt: wq.questionText,
            studentAnswer: wq.studentSelectedText || wq.studentSelected,
            correctAnswer: wq.correctAnswerText || wq.correctAnswer,
            explanation: wq.explanation || '请结合课堂老师讲解复习巩固本题知识点。',
          })
        );

        setStudentSession((prev) => ({
          ...prev,
          teamId: myRecord.teamId ? normalizeTeamId(myRecord.teamId) : prev.teamId,
          lastScore: myRecord.score ?? 0,
          correctCount:
            myRecord.correctCount ??
            Math.max(0, (myRecord.totalAnswered || 0) - (myRecord.wrongCount || 0)),
          wrongCount: myRecord.wrongCount ?? mappedMistakes.length,
          mistakes: mappedMistakes,
        }));
      }
      setCurrentScreen('settlement');
    };

    // 4. 监听老师大屏阶段同步（审题期 -> 抢答期 -> 统计揭晓 -> 颁奖台 -> 重回大厅）
    socket.on('screen_stage_sync', (payload: any) => {
      if (!payload) return;
      setLiveStage(payload.state);
      if (typeof payload.timeLeft === 'number') {
        setLiveStageTimeLeft(payload.timeLeft);
      }
      if (payload.state === 'lobby') {
        setLiveQuestion(null);
        setLiveSettlementData(null);
        setStudentSession((prev) => ({
          ...prev,
          lastScore: 0,
          correctCount: 0,
          wrongCount: 0,
          mistakes: [],
        }));
        setCurrentScreen('lobby');
      } else if (payload.state === 'podium') {
        const roomId = payload.roomId || sessionRef.current.roomId;
        if (roomId) {
          socket.emit('get_settlement_data', { roomId }, (res: any) => {
            if (res?.success && res.settlementData) {
              applySettlementToSession(res.settlementData);
            }
          });
        }
      }
    });

    // 5. 监听终局结算颁奖广播 -> 自动跳转到个人成绩单与错题解析页（与大屏第 1/2/3 名完全同步）
    socket.on('game_settlement_data', (settlementData: any) => {
      applySettlementToSession(settlementData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 成功加入房间后的流转处理（支持母体真实校验 + 离线 686868 演示兜底）
  const handleJoinSuccess = useCallback(
    (data: {
      pin: string;
      nickname: string;
      avatar: CartoonAvatar;
    }): Promise<{ success: boolean; error?: string } | void> => {
      return new Promise((resolve) => {
        const socket = socketRef.current;

        if (socket && socket.connected) {
          socket.emit(
            'student_join_room',
            {
              pin: data.pin,
              studentName: data.nickname,
              avatar: data.avatar.src,
            },
            (res: any) => {
              if (res && res.success) {
                const assignedTeam = normalizeTeamId(res.teamId);
                sessionRef.current = {
                  ...sessionRef.current,
                  roomId: res.roomId,
                  studentId: res.studentId,
                  studentToken: res.studentToken,
                  pin: data.pin,
                  nickname: data.nickname,
                  avatar: data.avatar,
                  roomName: res.roomName || sessionRef.current.roomName,
                  teamId: assignedTeam,
                };

                setStudentSession((prev) => ({
                  ...prev,
                  roomId: res.roomId,
                  studentId: res.studentId,
                  studentToken: res.studentToken,
                  pin: data.pin,
                  nickname: data.nickname,
                  avatar: data.avatar,
                  roomName: res.roomName || prev.roomName,
                  teamId: assignedTeam,
                }));

                if (res.roster && Array.isArray(res.roster.students)) {
                  const others = res.roster.students
                    .filter((s: any) => s.studentId !== res.studentId)
                    .map((s: any) => ({
                      id: s.studentId,
                      name: s.name,
                      avatar: s.avatar || './assets/games/char_b.png',
                      teamId: normalizeTeamId(s.teamId),
                      isReady: true,
                    }));
                  setLiveTeammates(others);
                } else {
                  setLiveTeammates([]);
                }

                setIsJoinModalOpen(false);
                if (res.activeQuestion) {
                  setLiveQuestion(res.activeQuestion);
                  setLiveStage(res.activeStage || 'question-options');
                  setCurrentScreen('quiz');
                } else {
                  setCurrentScreen('lobby');
                }
                resolve({ success: true });
              } else if (data.pin === '686868') {
                // 若输入的是默认离线演示码 686868，允许直接进入单机演示大厅
                setLiveTeammates(undefined);
                setLiveQuestion(null);
                setStudentSession((prev) => ({
                  ...prev,
                  roomId: undefined,
                  studentId: undefined,
                  studentToken: undefined,
                  pin: data.pin,
                  nickname: data.nickname,
                  avatar: data.avatar,
                }));
                setIsJoinModalOpen(false);
                setCurrentScreen('lobby');
                resolve({ success: true });
              } else {
                resolve({
                  success: false,
                  error: res?.error || '未找到该 PIN 码对应的活跃房间',
                });
              }
            }
          );
        } else {
          // 离线环境直接切入演示大厅
          setLiveTeammates(undefined);
          setLiveQuestion(null);
          setStudentSession((prev) => ({
            ...prev,
            pin: data.pin,
            nickname: data.nickname,
            avatar: data.avatar,
          }));
          setIsJoinModalOpen(false);
          setCurrentScreen('lobby');
          resolve({ success: true });
        }
      });
    },
    []
  );

  // 学生在手机手柄上提交答案给母体
  const handleSubmitLiveAnswer = useCallback(
    (
      questionId: string,
      selectedKey: 'A' | 'B' | 'C' | 'D'
    ): Promise<{ isCorrect: boolean; pointsEarned: number; currentScore: number } | null> => {
      return new Promise((resolve) => {
        const socket = socketRef.current;
        const sess = sessionRef.current;
        if (!socket || !socket.connected || !sess.roomId) {
          return resolve(null);
        }

        socket.emit(
          'student_submit_answer',
          {
            roomId: sess.roomId,
            studentId: sess.studentId,
            questionId,
            selectedOption: selectedKey,
          },
          (res: any) => {
            if (res && res.success && res.feedback) {
              resolve(res.feedback);
            } else {
              resolve(null);
            }
          }
        );
      });
    },
    []
  );

  // 退出房间
  const handleLeaveRoom = () => {
    setLiveQuestion(null);
    setLiveTeammates(undefined);
    setCurrentScreen('landing');
  };

  // 学生在等待大厅请求切换队伍（实时同步母体与老师大屏）
  const handleRequestSwitchTeam = useCallback(() => {
    const socket = socketRef.current;
    const sess = sessionRef.current;
    if (socket && socket.connected && sess.roomId && sess.studentId) {
      socket.emit('student_switch_team', {
        roomId: sess.roomId,
        studentId: sess.studentId,
      });
      return true;
    }
    return false;
  }, []);

  // 切换调试屏幕
  const handleSelectScreen = (screen: StudentScreen) => {
    if (screen === 'join-modal') {
      setIsJoinModalOpen(true);
    } else {
      setIsJoinModalOpen(false);
      setCurrentScreen(screen);
    }
  };

  const handleToggleQuizMode = () => {
    setQuizMode((prev) => (prev === 'pad' ? 'game' : 'pad'));
  };

  // 答题结束，流转到结算画面并保存真实错题
  const handleCompleteQuiz = (summary: {
    score: number;
    correctCount: number;
    wrongCount: number;
    mistakes: StudentMistakeItem[];
  }) => {
    setStudentSession((prev) => ({
      ...prev,
      lastScore: summary.score,
      correctCount: summary.correctCount,
      wrongCount: summary.wrongCount,
      mistakes: summary.mistakes,
    }));
    setCurrentScreen('settlement');
  };

  return (
    <div className="min-h-screen bg-radial from-pink-50/40 via-amber-50/30 to-blue-50/40 text-slate-800 flex flex-col font-sans select-none relative overflow-x-hidden">
      {/* 顶部若有返回后台的快捷条（仅在开发联合调试环境呈现） */}
      {onBackToTeacherAdmin && (
        <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-medium">当前运行环境：【学生端门户 (Student Portal)】- 严格物理隔离</span>
          </div>
          <button
            onClick={onBackToTeacherAdmin}
            className="flex items-center gap-1 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            返回教师端后台
          </button>
        </div>
      )}

      {/* 画面 1：学生端常驻导航 Header */}
      <StudentHeader onOpenJoinModal={() => setIsJoinModalOpen(true)} />

      {/* 主体画面路由分发 */}
      <main className="flex-1 flex flex-col">
        {/* 画面 1：学生端主页 / 游戏大厅 */}
        {currentScreen === 'landing' && (
          <GameGallery onJoinRoomClick={() => setIsJoinModalOpen(true)} />
        )}

        {/* 画面 3：等待大厅 (Lobby View) */}
        {currentScreen === 'lobby' && (
          <LobbyView
            roomName={studentSession.roomName}
            pin={studentSession.pin}
            nickname={studentSession.nickname}
            avatar={studentSession.avatar}
            initialTeamId={studentSession.teamId}
            liveTeammates={liveTeammates}
            externalTeamChangeNotice={teamChangeNotice}
            onRequestSwitchTeam={handleRequestSwitchTeam}
            onLeaveRoom={handleLeaveRoom}
            onStartQuiz={() => setCurrentScreen('quiz')}
          />
        )}

        {/* 画面 4：答题对战画面 (QuizArena) */}
        {currentScreen === 'quiz' && (
          <QuizArena
            roomName={studentSession.roomName}
            pin={studentSession.pin}
            studentName={studentSession.nickname}
            avatar={studentSession.avatar}
            teamId={studentSession.teamId}
            initialMode={quizMode}
            liveQuestion={liveQuestion}
            liveStage={liveStage}
            liveTimeLeft={liveStageTimeLeft}
            onSubmitLiveAnswer={handleSubmitLiveAnswer}
            onCompleteQuiz={handleCompleteQuiz}
            onBackToLobby={() => setCurrentScreen('lobby')}
          />
        )}

        {/* 画面 5：结算庆典与个人成绩单 (SettlementView) */}
        {currentScreen === 'settlement' && (
          <SettlementView
            studentId={studentSession.studentId}
            studentName={studentSession.nickname}
            avatar={studentSession.avatar}
            teamId={studentSession.teamId}
            totalScore={studentSession.lastScore}
            correctCount={studentSession.correctCount}
            wrongCount={studentSession.wrongCount}
            mistakes={studentSession.mistakes}
            liveSettlement={liveSettlementData}
            onRestart={() => setCurrentScreen('lobby')}
            onGoHome={() => setCurrentScreen('landing')}
          />
        )}
      </main>

      {/* 画面 2：加入房间弹窗（Join Modal） */}
      <JoinModal
        isOpen={isJoinModalOpen}
        suggestedPin={suggestedPin}
        onClose={() => setIsJoinModalOpen(false)}
        onJoinSuccess={handleJoinSuccess}
      />

      {/* 底部常驻【离线状态调试工具条 (Debug Bar)】 */}
      <DebugBar
        currentScreen={isJoinModalOpen ? 'join-modal' : currentScreen}
        onSelectScreen={handleSelectScreen}
        quizMode={quizMode}
        onToggleQuizMode={handleToggleQuizMode}
      />
    </div>
  );
};
