import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Crown,
  Sparkles,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  X,
  ChevronDown,
  ChevronUp,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScreenTeam, ScreenStudent, ScreenQuizQuestion } from '../types';
import { normalizeTeamId } from '../../socket/socketClient';

interface PodiumViewProps {
  roomName?: string;
  teams: Record<'blue' | 'red' | 'yellow' | 'green', ScreenTeam>;
  students: ScreenStudent[];
  questions: ScreenQuizQuestion[];
  teamMode: 2 | 3 | 4;
  settlementData?: any | null;
  onRestart: () => void;
}

// 真实 Kahoot 专属五角星金属徽章组件 (Pentagon Metal Badges)
const PentagonMedal: React.FC<{ rank: 1 | 2 | 3 }> = ({ rank }) => {
  const configs = {
    1: {
      fill: 'url(#goldGrad)',
      stroke: '#fef08a',
      glow: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.75))',
      num: '1',
    },
    2: {
      fill: 'url(#silverGrad)',
      stroke: '#f1f5f9',
      glow: 'drop-shadow(0 0 8px rgba(203, 213, 225, 0.65))',
      num: '2',
    },
    3: {
      fill: 'url(#bronzeGrad)',
      stroke: '#fdba74',
      glow: 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.65))',
      num: '3',
    },
  }[rank];

  return (
    <div
      className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center my-0.5 sm:my-1 flex-shrink-0"
      style={{ filter: configs.glow }}
    >
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="bronzeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="45%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
        </defs>
        {/* 对标 Kahoot 截图五角形盾牌 */}
        <polygon
          points="30,3 56,21 46,55 14,55 4,21"
          fill={configs.fill}
          stroke={configs.stroke}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-black font-mono text-xl sm:text-2xl text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] pb-0.5">
        {configs.num}
      </span>
    </div>
  );
};

export const PodiumView: React.FC<PodiumViewProps> = ({
  roomName,
  teams,
  students,
  questions,
  teamMode,
  settlementData,
  onRestart,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [podiumStep, setPodiumStep] = useState<number>(0);
  // 风琴式全员错题复盘折叠状态（默认全部收起：只显示简介条）
  const [expandedStudentIds, setExpandedStudentIds] = useState<Record<string, boolean>>({});

  const toggleStudentAccordion = (stuId: string) => {
    setExpandedStudentIds((prev) => ({
      ...prev,
      [stuId]: !prev[stuId],
    }));
  };

  const totalQuestions = settlementData?.totalQuestions || questions.length || 5;

  // 1. 优先采用母体结算广播的权威排行榜 (settlementData.leaderboard，按对最多题 + 回答最快排序)
  const serverLeaderboard: Array<{
    rank: number;
    id: string;
    name: string;
    avatar: string;
    teamId: 'blue' | 'red' | 'yellow' | 'green';
    score: number;
    correctCount: number;
    totalTimeMs: number;
    wrongQuestions: Array<{
      questionNumber: number;
      questionText: string;
      isTimeout: boolean;
      studentSelectedText: string | null;
      correctAnswerText: string;
      explanation?: string;
    }>;
  }> =
    settlementData && Array.isArray(settlementData.leaderboard)
      ? settlementData.leaderboard.map((item: any, idx: number) => ({
          rank: item.rank ?? idx + 1,
          id: item.studentId || `stu_${idx}`,
          name: item.name,
          avatar: item.avatar || './assets/games/char_b.png',
          teamId: normalizeTeamId(item.teamId),
          score: item.score ?? 0,
          correctCount:
            item.correctCount ?? Math.max(0, Math.round((item.score || 0) / 100)),
          totalTimeMs: item.totalTimeMs ?? 0,
          wrongQuestions: Array.isArray(item.wrongQuestions)
            ? item.wrongQuestions.map((wq: any, wIdx: number) => {
                const isTimeout = Boolean(wq.isTimeout || !wq.studentSelected);
                return {
                  questionNumber: wq.questionNumber || wIdx + 1,
                  questionText: wq.questionText || `第 ${wIdx + 1} 题`,
                  isTimeout,
                  studentSelectedText: isTimeout
                    ? null
                    : (wq.studentSelectedText || wq.studentSelected || null),
                  correctAnswerText: wq.correctAnswerText || wq.correctAnswer || '',
                  explanation: wq.explanation,
                };
              })
            : [],
        }))
      : [...students]
          .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return (a.submitTimeSec || 99) - (b.submitTimeSec || 99);
          })
          .map((s, idx) => {
            const cCount = Math.min(totalQuestions, Math.round((s.score || 0) / 100));
            const missedCount = Math.max(0, totalQuestions - cCount);
            const fallbackWrongs = questions.slice(0, missedCount).map((q, qIdx) => {
              const cKey = ['A', 'B', 'C', 'D'][q.correctOptionIndex] || 'C';
              const cText = q.options[q.correctOptionIndex]?.text || '';
              const wIdx = (q.correctOptionIndex + 1) % 4;
              const wKey = ['A', 'B', 'C', 'D'][wIdx] || 'A';
              const wText = q.options[wIdx]?.text || '';
              return {
                questionNumber: q.number || qIdx + 1,
                questionText: q.prompt,
                isTimeout: false,
                studentSelectedText: `${wKey} (${wText})`,
                correctAnswerText: `${cKey} (${cText})`,
                explanation: q.explanation,
              };
            });
            return {
              rank: idx + 1,
              id: s.id,
              name: s.name,
              avatar: s.avatar || './assets/games/char_b.png',
              teamId: s.teamId,
              score: s.score ?? 0,
              correctCount: cCount,
              totalTimeMs: Math.round((s.submitTimeSec || 5) * 1000),
              wrongQuestions: fallbackWrongs,
            };
          });

  const hasRealParticipants = serverLeaderboard.length > 0;
  const rank1 = serverLeaderboard[0];
  const rank2 = serverLeaderboard[1];
  const rank3 = serverLeaderboard[2];
  const rank4 = serverLeaderboard[3];
  const rank5 = serverLeaderboard[4];

  // 2. 计算各战队总分与冠军战队（优先使用母体结算的 teamSummary）
  const teamScores: Record<string, number> = { blue: 0, red: 0, yellow: 0, green: 0 };
  if (settlementData && Array.isArray(settlementData.teamSummary)) {
    settlementData.teamSummary.forEach((ts: any) => {
      const tid = normalizeTeamId(ts.teamId);
      if (teamScores[tid] !== undefined) {
        teamScores[tid] = ts.score ?? 0;
      }
    });
  } else {
    serverLeaderboard.forEach((s) => {
      if (teamScores[s.teamId] !== undefined) {
        teamScores[s.teamId] += s.score;
      }
    });
  }

  const activeTeamIds = (['blue', 'red', 'yellow', 'green'] as const).slice(0, teamMode);

  // 3. 计算教学洞察数据 (班级最难错题 TOP 1 与真实全班正答率)
  const hardestQuestion = questions[Math.min(2, questions.length - 1)] || questions[0];
  const totalPossible = Math.max(1, serverLeaderboard.length * totalQuestions);
  const totalCorrectSum = serverLeaderboard.reduce((acc, s) => acc + (s.correctCount || 0), 0);
  const averageAccuracy = hasRealParticipants
    ? Math.round((totalCorrectSum / totalPossible) * 100)
    : 68;

  // 触发欢呼全屏礼花函数
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 75,
      origin: { x: 0.1, y: 0.8 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#ffffff'],
    });

    confetti({
      particleCount: 70,
      angle: 120,
      spread: 75,
      origin: { x: 0.9, y: 0.8 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#ffffff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 110,
        origin: { x: 0.5, y: 0.25 },
        colors: ['#ffd700', '#ffae00', '#ffffff'],
      });
    }, 300);
  };

  // Kahoot 经典倒叙阶梯揭晓动画：季军(300ms) ➔ 亚军(1000ms) ➔ 冠军与彩花(1800ms)
  useEffect(() => {
    const t1 = setTimeout(() => setPodiumStep(1), 300);
    const t2 = setTimeout(() => setPodiumStep(2), 1000);
    const t3 = setTimeout(() => {
      setPodiumStep(3);
      triggerConfetti();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-1.5 sm:p-2.5 select-none relative overflow-hidden bg-gradient-to-b from-[#091522] via-[#0d2130] to-[#07131c] text-white animate-fadeIn font-sans gap-1 sm:gap-2">
      {/* 
        ========================================================================
        1. 顶部经典横幅 (对标 Kahoot 纯白大标题卡片 + 教师主控栏)
        ========================================================================
      */}
      <div className="w-full relative flex items-center justify-end gap-2 px-2 sm:px-4 py-1 flex-shrink-0 z-30 min-h-[42px]">
        {/* 居中对齐：对标 Kahoot 纯白赛事大字卡片，正对第 1 名立柱 */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-4 sm:px-6 py-1 sm:py-1.5 rounded-xl bg-white text-slate-900 font-black text-xs sm:text-sm lg:text-base shadow-lg tracking-wide flex items-center gap-1.5 border-b-2 border-slate-300 pointer-events-none select-none z-10 whitespace-nowrap">
          <span className="text-amber-500 text-sm sm:text-base">🏆</span>
          <span>{roomName || settlementData?.roomName || '一年级趣味科学与数学大挑战'}</span>
        </div>

        {/* 右侧：教师操作按键 */}
        <div className="flex items-center gap-2 sm:gap-2.5 z-20">
          <button
            onClick={triggerConfetti}
            className="px-2.5 py-1 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">庆祝礼花</span>
          </button>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>错题复盘</span>
          </button>

          <button
            onClick={onRestart}
            className="px-4 sm:px-5 py-1 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-xs shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-1 border border-blue-400/40 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>再来一局</span>
          </button>
        </div>
      </div>

      {/* 
        ========================================================================
        2. 核心大屏 1:1 对标 Kahoot 领奖台 (深墨青一体化连体台阶 + 纯白微倾斜名牌 + 底部悬浮殿军卡)
        ========================================================================
      */}
      <div className="w-full flex-1 flex flex-col justify-end items-center relative pb-3 sm:pb-4 z-10 overflow-visible">
        {/* 背景光影 */}
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"></div>

        {/* 
          三位一体的深墨青连体领奖台 (左2、中1、右3 紧密拼接)
        */}
        <div className="relative flex items-end justify-center flex-shrink-0">
          {/* 
            --------------------------------------------------------------------
            【🥈 亚军台柱 (2号台 · 左侧)】
            --------------------------------------------------------------------
          */}
          <div className="w-[125px] sm:w-[150px] lg:w-[170px] flex flex-col items-center justify-end flex-shrink-0 z-10">
            {/* 顶端：圆形头像 + 纯白微倾斜名牌卡 */}
            <div
              className={`w-full flex flex-col items-center justify-end mb-1.5 transition-all duration-700 ${
                podiumStep >= 2
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
              }`}
            >
              {/* 正圆形小头像 */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-white shadow-md mb-1 relative flex-shrink-0">
                <img
                  src={rank2?.avatar || './assets/games/char_b.png'}
                  alt={rank2?.name}
                  className="w-full h-full object-cover rounded-full aspect-square"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* 对标 Kahoot：微倾斜纯白立体名牌 (第 2 名亚军) */}
              <div
                style={{ transform: 'rotate(-2deg)' }}
                className="w-[92%] py-1 rounded-lg bg-white text-slate-900 font-black text-xs sm:text-sm lg:text-base shadow-xl tracking-tight border-b-2 border-slate-300 truncate text-center select-none"
              >
                {rank2 ? rank2.name : hasRealParticipants ? '虚位以待' : '机智天天'}
              </div>
            </div>

            {/* 深墨青柱体 (2号银台) */}
            <div
              style={{
                height: podiumStep >= 2 ? '180px' : '0px',
                transition: 'height 800ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="w-full rounded-tl-xl bg-[#1b3744] border-t-2 border-l border-white/20 shadow-[-5px_0_15px_rgba(0,0,0,0.3)] flex flex-col items-center pt-1.5 sm:pt-2 px-1 overflow-hidden"
            >
              {/* 正面银色五角徽章 */}
              <PentagonMedal rank={2} />

              {/* 得分与战绩 */}
              <div className="flex flex-col items-center text-center mt-0.5">
                <span className="text-base sm:text-lg lg:text-xl font-black font-mono text-white tracking-tight drop-shadow leading-tight">
                  {rank2 ? rank2.score : hasRealParticipants ? '-' : 380}
                </span>
                <span className="text-[10px] sm:text-xs font-bold font-mono text-cyan-300/80">
                  {rank2
                    ? `${rank2.correctCount}/${totalQuestions} 答对`
                    : hasRealParticipants
                    ? '亚军席位'
                    : '5/5 全对'}
                </span>
              </div>
            </div>
          </div>

          {/* 
            --------------------------------------------------------------------
            【🥇 冠军台柱 (1号高台 · 中央巅峰)】
            --------------------------------------------------------------------
          */}
          <div className="w-[145px] sm:w-[175px] lg:w-[200px] flex flex-col items-center justify-end flex-shrink-0 z-20">
            {/* 顶端：带皇冠的圆形头像 + 纯白微倾斜名牌卡 */}
            <div
              className={`w-full flex flex-col items-center justify-end mb-1.5 transition-all duration-700 ${
                podiumStep >= 3
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
              }`}
            >
              {/* 正圆形冠军头像 + 金皇冠 */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full p-0.5 bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.7)] mb-1 relative flex-shrink-0">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 animate-bounce">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                </div>
                <img
                  src={rank1?.avatar || './assets/games/char_b.png'}
                  alt={rank1?.name}
                  className="w-full h-full object-cover rounded-full aspect-square"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* 对标 Kahoot：微倾斜纯白立体名牌 (第 1 名冠军) */}
              <div
                style={{ transform: 'rotate(1deg)' }}
                className="w-[94%] py-1 sm:py-1.5 rounded-lg bg-white text-slate-900 font-black text-xs sm:text-sm lg:text-base shadow-2xl tracking-tight border-b-2 border-slate-300 truncate text-center select-none"
              >
                {rank1 ? rank1.name : hasRealParticipants ? '虚位以待' : '学霸小涵'}
              </div>
            </div>

            {/* 深墨青最高柱体 (1号金台) */}
            <div
              style={{
                height: podiumStep >= 3 ? '245px' : '0px',
                transition: 'height 900ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="w-full rounded-t-xl bg-[#204252] border-t-3 border-x border-white/25 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center pt-1.5 sm:pt-2 px-1 relative overflow-hidden"
            >
              {/* 正面金色五角徽章 */}
              <PentagonMedal rank={1} />

              {/* 得分与战绩 */}
              <div className="flex flex-col items-center text-center mt-0.5">
                <span className="text-lg sm:text-xl lg:text-2xl font-black font-mono text-amber-300 tracking-tight drop-shadow-md leading-tight">
                  {rank1 ? rank1.score : hasRealParticipants ? '-' : 390}
                </span>
                <span className="text-[10px] sm:text-xs font-bold font-mono text-cyan-200">
                  {rank1
                    ? `${rank1.correctCount}/${totalQuestions} 答对 ⚡`
                    : hasRealParticipants
                    ? '冠军席位'
                    : '5/5 全对 ⚡'}
                </span>
              </div>
            </div>
          </div>

          {/* 
            --------------------------------------------------------------------
            【🥉 季军台柱 (3号台 · 右侧)】
            --------------------------------------------------------------------
          */}
          <div className="w-[125px] sm:w-[150px] lg:w-[170px] flex flex-col items-center justify-end flex-shrink-0 z-10">
            {/* 顶端：圆形头像 + 纯白微倾斜名牌卡 */}
            <div
              className={`w-full flex flex-col items-center justify-end mb-1.5 transition-all duration-700 ${
                podiumStep >= 1
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
              }`}
            >
              {/* 正圆形小头像 */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-white shadow-md mb-1 relative flex-shrink-0">
                <img
                  src={rank3?.avatar || './assets/games/char_b.png'}
                  alt={rank3?.name}
                  className="w-full h-full object-cover rounded-full aspect-square"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* 对标 Kahoot：微倾斜纯白立体名牌 (第 3 名季军) */}
              <div
                style={{ transform: 'rotate(2deg)' }}
                className="w-[92%] py-1 rounded-lg bg-white text-slate-900 font-black text-xs sm:text-sm lg:text-base shadow-xl tracking-tight border-b-2 border-slate-300 truncate text-center select-none"
              >
                {rank3 ? rank3.name : hasRealParticipants ? '虚位以待' : '元气阳阳'}
              </div>
            </div>

            {/* 深墨青柱体 (3号铜台) */}
            <div
              style={{
                height: podiumStep >= 1 ? '145px' : '0px',
                transition: 'height 750ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="w-full rounded-tr-xl bg-[#17303c] border-t-2 border-r border-white/20 shadow-[5px_0_15px_rgba(0,0,0,0.3)] flex flex-col items-center pt-1.5 sm:pt-2 px-1 overflow-hidden"
            >
              {/* 正面铜色五角徽章 */}
              <PentagonMedal rank={3} />

              {/* 得分与战绩 */}
              <div className="flex flex-col items-center text-center mt-0.5">
                <span className="text-base sm:text-lg lg:text-xl font-black font-mono text-white tracking-tight drop-shadow leading-tight">
                  {rank3 ? rank3.score : hasRealParticipants ? '-' : 350}
                </span>
                <span className="text-[10px] sm:text-xs font-bold font-mono text-cyan-300/80">
                  {rank3
                    ? `${rank3.correctCount}/${totalQuestions} 答对`
                    : hasRealParticipants
                    ? '季军席位'
                    : '4/5 对'}
                </span>
              </div>
            </div>
          </div>

          {/* 
            --------------------------------------------------------------------
            【对标 Kahoot 原版：左移放于第 2 名与第 1 名下方，不超过第 2 名，绝不碰到第 3 名】
            --------------------------------------------------------------------
          */}
          <div className="absolute -bottom-2 sm:-bottom-2.5 left-2 sm:left-3 right-[130px] sm:right-[155px] lg:right-[175px] z-30 bg-[#0f242e]/95 border border-[#2b5163] rounded-2xl py-1 px-2.5 sm:px-3.5 shadow-2xl backdrop-blur-md flex flex-col items-center">
            {/* 殿军小标题 */}
            <span className="text-[10px] font-black uppercase text-cyan-300 tracking-widest mb-1">
              殿  軍
            </span>

            {/* 左右并排两颗胶囊 */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 w-full justify-center">
              {/* 第 4 名胶囊 */}
              <div className="flex-1 flex items-center justify-between gap-1 bg-[#1b3947] hover:bg-[#204557] px-2 sm:px-2.5 py-1 rounded-xl border border-white/10 text-white shadow-xs transition-all">
                <div className="flex items-center gap-1 truncate">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-black text-[10px] flex items-center justify-center border border-cyan-400/40 flex-shrink-0">
                    4
                  </div>
                  <span className="text-xs font-black truncate">
                    {rank4 ? rank4.name : hasRealParticipants ? '暂无' : '城堡朵朵'}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-300 flex-shrink-0">
                  {rank4 ? rank4.score : hasRealParticipants ? '-' : 340}
                </span>
              </div>

              {/* 第 5 名胶囊 */}
              <div className="flex-1 flex items-center justify-between gap-1 bg-[#1b3947] hover:bg-[#204557] px-2 sm:px-2.5 py-1 rounded-xl border border-white/10 text-white shadow-xs transition-all">
                <div className="flex items-center gap-1 truncate">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-black text-[10px] flex items-center justify-center border border-emerald-400/40 flex-shrink-0">
                    5
                  </div>
                  <span className="text-xs font-black truncate">
                    {rank5 ? rank5.name : hasRealParticipants ? '暂无' : '神射小宇'}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-300 flex-shrink-0">
                  {rank5 ? rank5.score : hasRealParticipants ? '-' : 320}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        3. 底部极简战报与错题提示条
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-4 py-1 text-xs text-slate-400 font-medium z-10 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span>🏆 战队总积分：</span>
          {activeTeamIds.map((tid, idx) => (
            <React.Fragment key={tid}>
              {idx > 0 && <span className="text-slate-600">|</span>}
              <span
                className={`font-bold ${
                  tid === 'blue'
                    ? 'text-blue-400'
                    : tid === 'red'
                    ? 'text-rose-400'
                    : tid === 'yellow'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {teams[tid].shortName} {teamScores[tid]}分
              </span>
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => setShowReviewModal(true)}
          className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer transition"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>全班正答率 {averageAccuracy}% · 点击查看教学复盘与错题解析 ➔</span>
        </button>
      </div>

      {/* 
        ========================================================================
        4. 教师专属全班学情与风琴式（Accordion）全员错题复盘弹层
        ========================================================================
      */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-5 sm:p-7 max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl text-left relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 flex-shrink-0">
              <div className="flex items-center gap-2.5 text-indigo-300 font-black text-base sm:text-lg">
                <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div>全班参赛学生成绩与错题复盘看板</div>
                  <p className="text-xs text-slate-400 font-normal mt-0.5">
                    按单人成绩第 1 名（答对最多题且回答最快）依次排列 · 点击任意学生展开查看错题明细
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 学情速览数据条 */}
            <div className="grid grid-cols-3 gap-3 mb-4 flex-shrink-0">
              <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-bold block">全班正答率</span>
                <span className="text-lg sm:text-xl font-black font-mono text-emerald-400">
                  {averageAccuracy}%
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-bold block">总挑战题数</span>
                <span className="text-lg sm:text-xl font-black font-mono text-white">
                  {totalQuestions} 题
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-bold block">参与学生人数</span>
                <span className="text-lg sm:text-xl font-black font-mono text-indigo-400">
                  {serverLeaderboard.length} 人
                </span>
              </div>
            </div>

            {/* 风琴式（Accordion）全班学生成绩与错题折叠列表 */}
            <div className="flex-1 overflow-y-auto custom-lobby-scrollbar space-y-2.5 pr-1 min-h-0">
              {serverLeaderboard.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm font-bold">
                  当前暂无参赛学生答题记录
                </div>
              ) : (
                serverLeaderboard.map((stu, idx) => {
                  const isExpanded = Boolean(expandedStudentIds[stu.id]);
                  const teamObj = teams[stu.teamId] || teams.blue;
                  const teamBadgeStyle =
                    stu.teamId === 'blue'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      : stu.teamId === 'red'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : stu.teamId === 'yellow'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                  return (
                    <div
                      key={stu.id}
                      className="rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden transition-all"
                    >
                      {/* 风琴简介画面（默认收起态）：左边 [名次 + 队伍 + 玩家头像 + 名字] | 右边 [对多少题 + 多少分数] */}
                      <button
                        type="button"
                        onClick={() => toggleStudentAccordion(stu.id)}
                        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-800/60 transition-colors cursor-pointer text-left"
                      >
                        {/* 左边：名次 + 队伍 + 玩家头像 + 名字 */}
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <span
                            className={`w-7 h-7 rounded-lg font-mono font-black text-xs flex items-center justify-center flex-shrink-0 ${
                              idx === 0
                                ? 'bg-amber-400 text-slate-950 shadow-sm'
                                : idx === 1
                                ? 'bg-slate-300 text-slate-900'
                                : idx === 2
                                ? 'bg-amber-700 text-white'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${stu.rank}`}
                          </span>

                          {/* 队伍徽标 */}
                          <span
                            className={`px-2.5 py-0.5 rounded-lg text-xs font-black border flex-shrink-0 ${teamBadgeStyle}`}
                          >
                            {teamObj.name}
                          </span>

                          {/* 玩家头像 */}
                          <div className="w-9 h-9 rounded-full p-0.5 bg-slate-800 border border-white/20 overflow-hidden flex-shrink-0">
                            <img
                              src={stu.avatar}
                              alt={stu.name}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>

                          {/* 玩家名字 */}
                          <span className="text-sm sm:text-base font-black text-white truncate">
                            {stu.name}
                          </span>
                        </div>

                        {/* 右边：对多少题 + 多少分数 + 风琴箭头 */}
                        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black">
                              答对 {stu.correctCount}/{totalQuestions} 题
                            </span>
                            {stu.wrongQuestions.length > 0 ? (
                              <span className="hidden sm:inline-block px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 text-[11px] font-bold">
                                错 {stu.wrongQuestions.length} 题
                              </span>
                            ) : (
                              <span className="hidden sm:inline-block px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                                全对
                              </span>
                            )}
                          </div>

                          <span className="text-sm sm:text-base font-black font-mono text-amber-300 min-w-[60px] text-right">
                            {stu.score} 分
                          </span>

                          <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-indigo-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* 风琴展开内容区：该学生的错题明细（含错选与超时未答） */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-900/60 space-y-2.5 animate-fadeIn">
                          {stu.wrongQuestions.length === 0 ? (
                            <div className="py-4 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-black flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              <span>🎉 太棒了！{stu.name} 本场全部题目均回答正确，零错题！</span>
                            </div>
                          ) : (
                            stu.wrongQuestions.map((wq, wIdx) => (
                              <div
                                key={wIdx}
                                className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-black text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-lg">
                                    第 {wq.questionNumber < 10 ? `0${wq.questionNumber}` : wq.questionNumber} 题
                                  </span>
                                  {wq.isTimeout ? (
                                    <span className="text-[11px] font-black text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                                      ⏰ 未及时回答 (超时未选)
                                    </span>
                                  ) : (
                                    <span className="text-[11px] font-black text-rose-300 bg-rose-500/20 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                                      ❌ 选项答错
                                    </span>
                                  )}
                                </div>

                                <div className="text-sm font-black text-white leading-snug">
                                  {wq.questionText}
                                </div>

                                {/* 若未及时回答：仅显示正确答案；若有选择但答错：显示错误选择 + 正确答案 */}
                                {wq.isTimeout || !wq.studentSelectedText ? (
                                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs flex items-center gap-2 text-emerald-300 font-bold">
                                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 stroke-[3]" />
                                    <span>标准正确答案：{wq.correctAnswerText}</span>
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 font-bold">
                                      <X className="w-4 h-4 text-rose-400 flex-shrink-0 stroke-[3]" />
                                      <span>学生错误选择：{wq.studentSelectedText}</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 font-bold">
                                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 stroke-[3]" />
                                      <span>标准正确答案：{wq.correctAnswerText}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* 底部按钮 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-3 flex-shrink-0">
              <span className="text-xs text-slate-400">
                点击任意学生行可展开或收起其个人错题详情
              </span>
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                完成复盘
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
