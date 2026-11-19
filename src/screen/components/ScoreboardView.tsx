import React from 'react';
import {
  Trophy,
  Flame,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ScreenTeam, ScreenStudent } from '../types';

interface ScoreboardViewProps {
  teams: Record<'blue' | 'red' | 'yellow' | 'green', ScreenTeam>;
  students: ScreenStudent[];
  currentQIndex: number;
  totalQuestions: number;
  teamMode: 2 | 3 | 4;
  onNext: () => void;
}

export const ScoreboardView: React.FC<ScoreboardViewProps> = ({
  teams,
  students,
  currentQIndex,
  totalQuestions,
  teamMode,
  onNext,
}) => {
  // 1. 计算各个战队当前实际累计总分
  const teamScores: Record<string, number> = {
    blue: 0,
    red: 0,
    yellow: 0,
    green: 0,
  };

  students.forEach((s) => {
    if (teamScores[s.teamId] !== undefined) {
      teamScores[s.teamId] += s.score;
    }
  });

  // 2. 筛选全班前 5 名个人小达人 (Top 5 Leaderboard)
  const sortedStudents = [...students].sort((a, b) => b.score - a.score);
  const top5Students = sortedStudents.slice(0, 5);
  const maxScore = top5Students[0]?.score || 1;

  // 3. 计算 2 队模式下的比分拉锯
  const blueScore = teamScores.blue;
  const redScore = teamScores.red;
  const total2TeamScore = blueScore + redScore || 1;
  const blueRatio = Math.round((blueScore / total2TeamScore) * 100);
  const redRatio = 100 - blueRatio;
  const scoreDiff = Math.abs(blueScore - redScore);
  const isBlueLeading = blueScore > redScore;
  const isTie = blueScore === redScore;

  const isLastQuestion = currentQIndex >= totalQuestions - 1;

  // 名次徽章配置 (紧凑精致，统一尺寸，适配 1080P/768P 大屏)
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-xs sm:text-sm shadow-[0_0_15px_rgba(245,158,11,0.6)] border border-white flex-shrink-0">
            👑 1
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-900 flex items-center justify-center font-black text-xs shadow-[0_0_12px_rgba(226,232,240,0.5)] border border-white flex-shrink-0">
            🥈 2
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center font-black text-xs shadow-[0_0_12px_rgba(180,83,9,0.5)] border border-amber-300 flex-shrink-0">
            🥉 3
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center font-black text-xs flex-shrink-0">
            #{rank}
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 select-none gap-3 sm:gap-4 relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0d1026] to-slate-950 text-white animate-fadeIn">
      {/* 
        ========================================================================
        1. 顶部：战队总分比分对决横幅 (轻量紧凑布局，节约垂直空间)
        ========================================================================
      */}
      {teamMode === 2 ? (
        <div className="w-full bg-slate-900/90 rounded-2xl px-5 py-2 sm:py-2.5 border border-indigo-500/30 shadow-xl flex-shrink-0">
          <div className="flex items-center justify-between text-xs sm:text-sm font-black mb-1.5">
            {/* 蓝队 */}
            <div className="flex items-center gap-2 text-blue-400">
              <span className="text-lg">🛡️</span>
              <span className="text-xs sm:text-sm font-bold">{teams.blue.name}</span>
              <span className="text-base sm:text-lg font-mono text-white font-black">
                {blueScore}
              </span>
              <span className="text-[10px] text-blue-300 font-normal">分</span>
            </div>

            {/* 中央领先悬殊播报 */}
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-950/80 border border-slate-700 text-[11px] font-black shadow-inner">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {isTie ? (
                <span className="text-amber-300">战况焦灼 · 双方完全平分 ⚖️</span>
              ) : (
                <span className={isBlueLeading ? 'text-blue-300' : 'text-rose-300'}>
                  {isBlueLeading ? '🟦 蓝队' : '🟥 红队'} 暂时领跑 (+{scoreDiff} 分) ⚡
                </span>
              )}
            </div>

            {/* 红队 */}
            <div className="flex items-center gap-2 text-rose-400">
              <span className="text-[10px] text-rose-300 font-normal">分</span>
              <span className="text-base sm:text-lg font-mono text-white font-black">
                {redScore}
              </span>
              <span className="text-xs sm:text-sm font-bold">{teams.red.name}</span>
              <span className="text-lg">⚔️</span>
            </div>
          </div>

          {/* 红蓝双向拉伸对决能量条 */}
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden flex shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 transition-all duration-1000"
              style={{ width: `${blueRatio}%` }}
            />
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-rose-600 transition-all duration-1000"
              style={{ width: `${redRatio}%` }}
            />
          </div>
        </div>
      ) : (
        /* 3 队或 4 队并排战况展示 */
        <div className="w-full bg-slate-900/90 rounded-2xl px-5 py-2 border border-indigo-500/30 shadow-xl grid grid-cols-3 sm:grid-cols-4 gap-2 flex-shrink-0">
          {(['blue', 'red', 'yellow', 'green'] as const).slice(0, teamMode).map((tid) => {
            const team = teams[tid];
            return (
              <div
                key={tid}
                className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{team.icon}</span>
                  <span className="text-xs font-bold text-slate-300">{team.shortName}</span>
                </div>
                <span className="text-sm font-black text-white font-mono">
                  {teamScores[tid]}分
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 
        ========================================================================
        2. 核心大屏个人榜单：前 5 名小达人荣誉榜 (全屏精巧适配，1~5 名 100% 完整同屏呈现)
        ========================================================================
      */}
      <div className="w-full flex-1 min-h-0 bg-slate-950/60 rounded-3xl p-3 sm:p-4 border border-slate-800/80 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* 榜单标题 */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/70 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-md">
              <Trophy className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>班级个人先锋 TOP 5 荣誉榜</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  答题积分实时飞入中
                </span>
              </h2>
            </div>
          </div>

          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            积分依据答题正确率与提交速度综合加冕
          </span>
        </div>

        {/* Top 5 纵向条目容器 (完全适配 5 个条目，绝无截断) */}
        <div className="flex-1 flex flex-col justify-around py-1 sm:py-2 gap-1.5 sm:gap-2 overflow-y-auto custom-lobby-scrollbar min-h-0">
          {top5Students.map((stu, index) => {
            const rank = index + 1;
            const isBlue = stu.teamId === 'blue';
            const scoreBarPercent = Math.max(18, Math.min(100, Math.round((stu.score / maxScore) * 100)));

            return (
              <div
                key={stu.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="w-full flex items-center gap-2.5 sm:gap-3.5 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-md backdrop-blur-sm animate-leaderboard-slide group transition-all hover:bg-slate-900 hover:border-slate-700"
              >
                {/* 1. 排名勋章 */}
                <div className="flex-shrink-0">{getRankBadge(rank)}</div>

                {/* 2. 卡通头像与阵营光圈 */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 border-2 flex items-center justify-center overflow-hidden bg-slate-950 flex-shrink-0 shadow-md ${
                    isBlue ? 'border-blue-400' : 'border-rose-400'
                  }`}
                >
                  <img
                    src={stu.avatar}
                    alt={stu.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* 3. 昵称与阵营微标 */}
                <div className="w-24 sm:w-32 flex flex-col text-left flex-shrink-0 min-w-0">
                  <span className="text-xs sm:text-sm font-black text-white truncate leading-tight">
                    {stu.name}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        isBlue ? 'bg-blue-500/20 text-blue-300' : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {isBlue ? '蓝队勇士' : '红队先锋'}
                    </span>
                    {stu.streak >= 2 && (
                      <span className="text-[9px] text-amber-300 font-bold flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        {stu.streak}连对
                      </span>
                    )}
                  </div>
                </div>

                {/* 4. 动态展开的积分进度柱 (Score Progress Bar) */}
                <div className="flex-1 h-5 sm:h-6 bg-slate-950 rounded-lg overflow-hidden p-0.5 flex items-center relative border border-slate-800/80">
                  <div
                    style={{ width: `${scoreBarPercent}%` }}
                    className={`h-full rounded-md transition-all duration-1000 ease-out flex items-center justify-end px-2 shadow-inner ${
                      rank === 1
                        ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : isBlue
                        ? 'bg-gradient-to-r from-blue-600 to-sky-400'
                        : 'bg-gradient-to-r from-rose-600 to-amber-500'
                    }`}
                  >
                    {/* 本轮加分动态弹跳气泡 */}
                    <span className="animate-point-pop text-[10px] font-black text-slate-950 bg-white/95 px-1 py-0.2 rounded shadow-xs">
                      +100
                    </span>
                  </div>
                </div>

                {/* 5. 个人总积分大字号数值 */}
                <div className="w-20 sm:w-24 text-right flex-shrink-0">
                  <span className="text-base sm:text-lg font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
                    {stu.score}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 ml-1">PTS</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 
        ========================================================================
        3. 底部常驻老师主控控制栏：大号【下一题 ➔】或【终局颁奖典礼 🏆】
        ========================================================================
      */}
      <div className="w-full bg-slate-900/95 rounded-2xl px-5 sm:px-6 py-2 sm:py-2.5 border border-slate-800 shadow-xl flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>
            {isLastQuestion
              ? '全部题目答题完毕！点击开启终局 Kahoot 颁奖典礼与教师教学洞察'
              : `当前第 ${currentQIndex + 1} 题结算完成，准备切入第 ${currentQIndex + 2} 题审题倒计时`}
          </span>
        </div>

        {/* 核心主控按键 */}
        <button
          onClick={onNext}
          className="px-6 sm:px-10 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 hover:scale-105 active:scale-95 text-white font-black text-sm sm:text-base shadow-lg shadow-pink-500/25 transition-all cursor-pointer flex items-center gap-2 border border-pink-400/40"
        >
          <span>
            {isLastQuestion ? '查看终局 Kahoot 颁奖典礼 🏆' : `下一题 (第 ${currentQIndex + 2} 题 ➔)`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
