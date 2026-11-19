import React from 'react';
import {
  Clock,
  Sparkles,
  Zap,
  SkipForward,
  Eye,
  CheckCircle,
  Users,
  Play,
  Pause,
  Lock,
} from 'lucide-react';
import { ScreenQuizQuestion } from '../types';

interface QuestionLiveViewProps {
  currentState: 'question-prompt' | 'question-options';
  question: ScreenQuizQuestion;
  timeLeft: number;
  totalTime: number;
  isUrgent: boolean;
  isRunning: boolean;
  submittedCount: number;
  totalStudents: number;
  onRevealOptionsEarly: () => void;
  onRevealResultEarly: () => void;
  onSkipQuestion: () => void;
  onToggleTimer: () => void;
}

export const QuestionLiveView: React.FC<QuestionLiveViewProps> = ({
  currentState,
  question,
  timeLeft,
  totalTime,
  isUrgent,
  isRunning,
  submittedCount,
  totalStudents,
  onRevealOptionsEarly,
  onRevealResultEarly,
  onSkipQuestion,
  onToggleTimer,
}) => {
  const isPromptPhase = currentState === 'question-prompt';

  // 计算 SVG 环形进度
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    totalTime > 0
      ? circumference - (Math.max(0, timeLeft) / totalTime) * circumference
      : 0;

  // 提交比例
  const submitPercentage =
    totalStudents > 0 ? Math.round((submittedCount / totalStudents) * 100) : 0;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 select-none gap-3 relative overflow-hidden">
      {/* 
        ========================================================================
        【阶段 2A：题干审题思考期 (倒计时 1)】
        全屏聚焦题干！题干占屏幕中央绝对核心，倒计时1纯圆环跳动，杜绝方形边与截断
        ========================================================================
      */}
      {isPromptPhase && (
        <div className="w-full flex-1 min-h-0 flex flex-col justify-between items-center bg-gradient-to-br from-slate-900/95 via-indigo-950/80 to-slate-900/95 rounded-3xl p-3.5 sm:p-6 border border-amber-500/30 shadow-2xl relative overflow-hidden animate-fadeIn">
          {/* 背景光晕 */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* 顶部标签条 */}
          <div className="w-full flex items-center justify-between flex-shrink-0 z-10">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="px-3.5 py-1.5 rounded-2xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md">
                <span>QUESTION</span>
                <span className="text-white text-sm sm:text-base">
                  {question.number < 10 ? `0${question.number}` : question.number}
                </span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">
                  {question.total < 10 ? `0${question.total}` : question.total}
                </span>
              </div>

              <div className="px-3 py-1 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm font-bold text-slate-300">
                {question.category}
              </div>

              <div className="px-3 py-1 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-xs sm:text-sm font-black text-amber-300">
                +{question.points} PTS
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-xs sm:text-sm animate-pulse">
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>【倒计时 1 · 题干审题中】手机手柄待机 · 请看大屏思考</span>
            </div>
          </div>

          {/* 中央视觉核心：题干大字 + 纯圆形倒计时 1 (自适应居中，尺寸适中，绝无方形边与截断) */}
          <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 min-h-0 py-2 sm:py-3 gap-3 sm:gap-5 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>请全班小达人专注审读题目 · 构思你的答案</span>
            </div>

            {/* 超大清晰题干文字 */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-snug sm:leading-tight drop-shadow-lg px-2 max-w-3xl line-clamp-3">
              {question.prompt}
            </h1>

            {/* 纯圆形倒计时环 1 (无方形外边框，尺寸适中，100% 完整显示在视窗内) */}
            <div
              className={`relative rounded-full flex items-center justify-center flex-shrink-0 my-1 transition-all ${
                isUrgent ? 'animate-urgent-heartbeat' : ''
              }`}
            >
              <svg className="w-28 h-28 sm:w-32 sm:h-32 -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-slate-800/90 fill-none"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className={`fill-none transition-all duration-1000 ease-linear ${
                    isUrgent ? 'stroke-rose-500' : 'stroke-amber-400'
                  }`}
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span
                  className={`text-4xl sm:text-5xl font-black font-mono tracking-tighter leading-none ${
                    isUrgent ? 'text-rose-400 scale-105' : 'text-amber-300'
                  }`}
                >
                  {timeLeft}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-1">
                  审题秒数
                </span>
              </div>
            </div>
          </div>

          {/* 阶段 2A 底部主控条 (100% 完整常驻展露) */}
          <div className="w-full flex items-center justify-between pt-2.5 sm:pt-3 border-t border-slate-800/80 flex-shrink-0 z-10">
            <div className="flex items-center gap-2.5">
              <button
                onClick={onToggleTimer}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span>暂停倒计时</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>继续倒计时</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={onRevealOptionsEarly}
                className="px-6 sm:px-8 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:scale-105 active:scale-95 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition cursor-pointer flex items-center gap-2"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>⚡ 立即翻开四色选项 (进入作答)</span>
              </button>

              <button
                onClick={onSkipQuestion}
                className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <SkipForward className="w-4 h-4" />
                <span>跳过</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        【阶段 2B：四色选项展开与抢答期 (倒计时 2)】
        题干平滑缩小上移到顶部横幅，四色选项格子占全屏幕 60% 黄金巨幕区域！
        ========================================================================
      */}
      {!isPromptPhase && (
        <div className="w-full h-full flex flex-col justify-between gap-3 animate-fadeIn">
          {/* 1. 缩小并上移的精炼题干卡片（Zoom 小并上移特效，高度仅占 ~15%） */}
          <div className="w-full bg-slate-900/95 rounded-2xl px-6 py-3 border border-indigo-500/30 shadow-xl flex items-center justify-between gap-4 flex-shrink-0 transition-all duration-700 ease-out transform">
            {/* 左侧：题号徽章 + 缩小的精炼题干 */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="px-3.5 py-1.5 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs sm:text-sm font-black flex items-center gap-1 flex-shrink-0">
                <span>Q{question.number}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">{question.total}</span>
              </div>

              {/* 题干文本（缩小并上移后保持极佳可读性） */}
              <h2 className="text-lg sm:text-2xl font-black text-white truncate drop-shadow">
                {question.prompt}
              </h2>
            </div>

            {/* 右侧：紧凑倒计时 2 环 + 提交人数胶囊 */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* 提交人数进度球 */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-slate-300">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  已交: <strong className="text-emerald-400 text-sm">{submittedCount}</strong> / {totalStudents}
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-emerald-400 font-mono font-black">{submitPercentage}%</span>
              </div>

              {/* 紧凑型倒计时 2 胶囊 */}
              <div
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border font-black transition-all ${
                  isUrgent
                    ? 'bg-rose-500/30 border-rose-500 text-rose-300 animate-urgent-heartbeat'
                    : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="text-xs uppercase font-extrabold">倒计时</span>
                <span className="text-2xl font-mono text-white">{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* 2. 占屏幕 60% 黄金巨幕的 2×2 四色选项大格子 (大字号、大符号、与学生手机 4 宫格 1:1 同位置对齐) */}
          <div className="w-full flex-1 min-h-[58vh] grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 animate-options-pop">
            {question.options.map((opt, idx) => {
              const posLabel = ['左上', '右上', '左下', '右下'][idx] || '';
              return (
                <div
                  key={opt.key}
                  className={`w-full h-full rounded-3xl p-6 sm:p-8 lg:p-10 flex items-center justify-between border-3 shadow-2xl transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-default relative overflow-hidden group ${opt.bgClass} ${opt.borderClass}`}
                >
                  {/* 背景微光 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none"></div>

                  {/* 左侧：巨大 Kahoot 几何符号 + 选项文本 */}
                  <div className="flex items-center gap-5 sm:gap-8 min-w-0 flex-1 z-10">
                    {/* 巨型几何符号 (▲, ◆, ●, ■) */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-black/25 flex items-center justify-center text-white text-4xl sm:text-5xl lg:text-6xl font-black flex-shrink-0 shadow-2xl border-2 border-white/20">
                      {opt.symbol}
                    </div>

                    {/* 选项大字号文本 */}
                    <div className="flex flex-col text-left truncate">
                      <span className="text-xs sm:text-sm uppercase font-black text-white/80 tracking-widest mb-1">
                        {posLabel} · 选项 {opt.key}
                      </span>
                      <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-wide truncate drop-shadow-md">
                        {opt.text}
                      </span>
                    </div>
                  </div>

                  {/* 右侧按键徽章 */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 text-white font-black text-lg border border-white/30 shadow-inner z-10 flex-shrink-0">
                    {opt.key}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. 阶段 2B 底部老师主控悬浮条 */}
          <div className="w-full bg-slate-900/95 rounded-2xl px-6 py-3 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
            {/* 左侧说明与暂停 */}
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleTimer}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span>暂停倒计时</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>继续倒计时</span>
                  </>
                )}
              </button>

              <span className="text-xs text-slate-400 hidden sm:inline">
                学生正在手机手柄选择对应色块 · 倒计时结束或全员提交后揭晓
              </span>
            </div>

            {/* 右侧立即提前揭晓主按钮 */}
            <div className="flex items-center gap-3">
              <button
                onClick={onRevealResultEarly}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:scale-105 active:scale-95 text-white font-black text-sm sm:text-base shadow-xl shadow-rose-500/25 transition cursor-pointer flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>📢 立即提前揭晓 (进入柱状统计)</span>
              </button>

              <button
                onClick={onSkipQuestion}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <SkipForward className="w-4 h-4" />
                <span>跳过</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
