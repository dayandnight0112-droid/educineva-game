import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  CheckCircle2,
  Copy,
  Play,
  X,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { RoomConfig, Game, QuestionPaper, SingleChoiceQuestion } from '../types';
import { QUESTION_PAPERS, QUESTION_RULES } from '../mock/data';
import { createSocketConnection } from '../socket/socketClient';

export const ACTIVE_ROOM_STORAGE_KEY = 'educineva_active_room';

interface RoomCreatedModalProps {
  roomConfig: RoomConfig | null;
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  papers?: QuestionPaper[];
  onRoomCreated?: (info: { roomId: string; pin: string }) => void;
  onLaunchScreen?: (info: { roomId: string; pin: string }) => void;
}

/**
 * 根据教师选择的试卷与出题规则生成本场房间题库
 */
function selectQuestionsByRule(
  rawQuestions: SingleChoiceQuestion[],
  ruleId: string,
  rounds: number
): SingleChoiceQuestion[] {
  if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) return [];

  const copy = [...rawQuestions];

  if (ruleId === 'random-5-norepeat') {
    // Fisher-Yates 洗牌后无放回抽取 5 题
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(copy.length, 5));
  }

  if (ruleId === 'random-10-norepeat') {
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(copy.length, 10));
  }

  if (ruleId === 'sequential') {
    // 按试卷题目顺序逐题出题：若教师自定义试卷题目 <= 15 题则全部按序出题，否则按轮数*5题截取
    const maxCount = copy.length <= 15 ? copy.length : Math.min(copy.length, Math.max(5, (rounds || 1) * 5));
    return copy.slice(0, maxCount);
  }

  // adaptive / wrong-first 默认抽取 5 * 轮数（最少 5 题，最多不超过题库总数）
  const targetCount = copy.length <= 10 ? copy.length : Math.min(copy.length, Math.max(5, (rounds || 1) * 5));
  return copy.slice(0, targetCount);
}

export const RoomCreatedModal: React.FC<RoomCreatedModalProps> = ({
  roomConfig,
  game,
  isOpen,
  onClose,
  papers,
  onRoomCreated,
  onLaunchScreen,
}) => {
  const [copied, setCopied] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [livePin, setLivePin] = useState<string>('686868');
  const [liveRoomId, setLiveRoomId] = useState<string>('');
  const [isConnectedToServer, setIsConnectedToServer] = useState(false);
  const [dispatchedQuestionCount, setDispatchedQuestionCount] = useState<number>(5);

  const activePapers = papers && papers.length > 0 ? papers : QUESTION_PAPERS;
  const paper =
    activePapers.find((p) => p.id === roomConfig?.questionPaperId) || activePapers[0];
  const ruleObj = QUESTION_RULES.find((r) => r.id === roomConfig?.questionRule);

  const onRoomCreatedRef = useRef(onRoomCreated);
  onRoomCreatedRef.current = onRoomCreated;

  // 计算本次抽取的题目列表
  const selectedQuestions = useMemo(() => {
    if (!roomConfig || !paper) return [];
    return selectQuestionsByRule(
      paper.questions || [],
      roomConfig.questionRule,
      roomConfig.rounds
    );
  }, [roomConfig, paper]);

  useEffect(() => {
    if (!isOpen || !roomConfig || !game) return;

    setGameStarted(false);
    setIsLaunching(false);
    setDispatchedQuestionCount(selectedQuestions.length || 5);

    const socket = createSocketConnection();
    let created = false;

    socket.on('connect', () => {
      if (created) return;
      created = true;
      setIsConnectedToServer(true);

      const teamCount =
        roomConfig.teamCount === 3 || roomConfig.teamCount === 4
          ? roomConfig.teamCount
          : 2;

      const defaultPresetPool = [
        { id: 'blue', name: '🟦 蓝队勇士', color: '#3B82F6', score: 0 },
        { id: 'red', name: '🟥 红队先锋', color: '#EF4444', score: 0 },
        { id: 'yellow', name: '🟨 黄队闪电', color: '#EAB308', score: 0 },
        { id: 'green', name: '🟩 绿队神鹰', color: '#10B981', score: 0 },
      ];

      const presetTeams = defaultPresetPool.slice(0, teamCount).map((pt, idx) => {
        const customTeam = roomConfig.teams[idx];
        return {
          ...pt,
          character: customTeam?.character || `人物 ${String.fromCharCode(65 + idx)}`,
          characterAvatar: customTeam?.characterAvatar || './assets/games/char_a.png',
        };
      });

      const categoryLabel = paper
        ? `${paper.grade}${paper.subject} · ${paper.name}`
        : '课堂互动挑战';

      const paperQuestions = selectedQuestions.map((q, idx) => ({
        id: q.id || `q_${idx + 1}`,
        questionText: q.stem,
        options: q.options,
        correctAnswer: q.answer,
        category: categoryLabel,
        explanation: `标准答案是 ${q.answer}（${q.options[q.answer]}）。紧扣「${paper?.name || '本课'}」核心知识点！`,
      }));

      socket.emit(
        'teacher_create_room',
        {
          teacherId: 'teacher_admin_host',
          roomName: roomConfig.roomName || `${game.name}课堂`,
          gameId: game.id,
          gameMode: roomConfig.isTeamMode ? 'team' : 'individual',
          config: {
            hasTeams: roomConfig.isTeamMode,
            teamMode: teamCount,
            playersPerTeam: roomConfig.playersPerTeam,
            rounds: roomConfig.rounds,
            durationMinutes: roomConfig.durationMinutes,
            questionRule: roomConfig.questionRule,
            questionRuleLabel: ruleObj?.label || '按试卷题目顺序出题',
            paperId: paper?.id,
            paperName: paper?.name,
            grade: paper?.grade,
            subject: paper?.subject,
            gameName: game.name,
            teams: presetTeams,
          },
          questions: paperQuestions,
        },
        (res: any) => {
          if (res && res.success) {
            setLivePin(res.pin);
            setLiveRoomId(res.roomId);
            const activeInfo = {
              roomId: res.roomId,
              pin: res.pin,
              roomName: roomConfig.roomName || `${game.name}课堂`,
              createdAt: Date.now(),
            };
            try {
              localStorage.setItem(ACTIVE_ROOM_STORAGE_KEY, JSON.stringify(activeInfo));
            } catch {
              // ignore storage error
            }
            onRoomCreatedRef.current?.({ roomId: res.roomId, pin: res.pin });
          }
        }
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [isOpen, roomConfig, game, paper, ruleObj, selectedQuestions]);

  if (!isOpen || !roomConfig || !game) return null;

  const totalAssignedStudents = roomConfig.teams.reduce(
    (acc, t) => acc + t.students.length,
    0
  );

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(livePin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunchGame = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      setGameStarted(true);
      if (onLaunchScreen) {
        onLaunchScreen({ roomId: liveRoomId, pin: livePin });
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-scale-up">
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-pink-500 via-[#e60067] to-rose-600 p-6 text-white text-center relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-black tracking-tight">课堂房间已就绪！</h3>
          <p className="text-white/80 text-xs mt-1 flex items-center justify-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>
              {isConnectedToServer
                ? '母体 Socket 实时沙箱已生成独立 6 位 PIN 码'
                : '离线演示模式就绪，学生端可随时加入'}
            </span>
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Room Code & Quick Copy */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-gray-400 block">
                课堂 6 位 PIN 码 (学生端输入即可加入)
              </span>
              <span className="text-3xl font-black text-[#e60067] tracking-widest font-mono">
                {livePin}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-700 shadow-2xs'
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? '已复制' : '复制 PIN 码'}</span>
            </button>
          </div>

          {/* Config Summary Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100/80">
              <span className="text-gray-400 block mb-0.5">选定游戏与房间</span>
              <span className="font-bold text-gray-900 flex items-center gap-1.5 truncate">
                <img
                  src={game.coverUrl}
                  alt={game.name}
                  className="w-5 h-5 rounded object-cover shrink-0"
                />
                <span className="truncate">{roomConfig.roomName || game.name}</span>
              </span>
            </div>

            <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100/80">
              <span className="text-gray-400 block mb-0.5">
                已选题库 (本场抽 {dispatchedQuestionCount} 题)
              </span>
              <span className="font-bold text-gray-900 truncate block">
                {paper ? `${paper.name} (${paper.grade}${paper.subject})` : '一年级数学 Paper 1'}
              </span>
            </div>

            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/80">
              <span className="text-gray-400 block mb-0.5">对抗设定</span>
              <span className="font-bold text-gray-900">
                {roomConfig.isTeamMode
                  ? `${roomConfig.teams.length} 支队伍 · 每队 ${roomConfig.playersPerTeam} 人`
                  : '个人闯关竞速模式'}
              </span>
            </div>

            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/80">
              <span className="text-gray-400 block mb-0.5">轮数与出题规则</span>
              <span className="font-bold text-gray-900 truncate block" title={ruleObj?.label}>
                {roomConfig.rounds} 轮 ({roomConfig.durationMinutes}分钟) · {ruleObj?.label || '顺序出题'}
              </span>
            </div>
          </div>

          {/* Teams and Joined Students Overview */}
          <div className="space-y-2 border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {roomConfig.isTeamMode
                  ? `队伍阵营就绪 (${roomConfig.teams.length} 支队伍 · 学生输入 PIN 自动入队)`
                  : '个人竞速通道已开启'}
              </span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {isConnectedToServer ? '母体房间通道已开启' : '本地通道正常'}
              </span>
            </div>

            {roomConfig.isTeamMode && (
              <div className="grid grid-cols-2 gap-2">
                {roomConfig.teams.map((t) => (
                  <div
                    key={t.id}
                    className="p-2.5 rounded-xl border text-xs"
                    style={{
                      backgroundColor: t.bgColor,
                      borderColor: t.borderColor,
                      color: t.textColor,
                    }}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="flex items-center gap-1.5">
                        <img
                          src={t.characterAvatar}
                          alt={t.character}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        {t.name}
                      </span>
                      <span className="text-[10px] opacity-80">{t.character}</span>
                    </div>
                    <div className="text-[11px] opacity-85 truncate">
                      等待学生手机输入 PIN 码 [{livePin}] 入场
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-3 border border-gray-200 hover:border-gray-300 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition text-center cursor-pointer"
            >
              稍后启动
            </button>

            <a
              href={`${
                typeof window !== 'undefined' && window.location.protocol === 'file:'
                  ? './老师大屏-直接双击打开.html'
                  : './screen.html'
              }?roomId=${encodeURIComponent(liveRoomId)}&pin=${encodeURIComponent(livePin)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>新窗口开大屏</span>
            </a>

            <button
              onClick={handleLaunchGame}
              disabled={isLaunching}
              className="flex-1 py-3 bg-[#e60067] hover:bg-[#d0005d] text-white rounded-xl text-xs font-bold shadow-md shadow-pink-200 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {isLaunching ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>正在跳转老师大屏...</span>
                </>
              ) : gameStarted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>大屏游戏已联机启动！</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>立即启动老师大屏</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
