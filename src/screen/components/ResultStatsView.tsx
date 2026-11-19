import React, { useState, useEffect } from 'react';
import {
  Check,
  X,
  BookOpen,
  ArrowRight,
  Users,
  Award,
} from 'lucide-react';
import { ScreenQuizQuestion, ScreenStudent, OptionKey } from '../types';
import { calculateDistribution } from '../mockData';

interface ResultStatsViewProps {
  question: ScreenQuizQuestion;
  students: ScreenStudent[];
  onProceed: () => void;
}

// Kahoot 官方 4 色规范与几何符号定义
const KAHOOT_THEMES: Record<
  OptionKey,
  {
    symbol: string;
    name: string;
    baseBg: string;
    barBg: string;
    cardBg: string;
  }
> = {
  A: {
    symbol: '▲',
    name: '红角',
    baseBg: 'bg-[#e21b3c]',
    barBg: 'bg-[#e21b3c]',
    cardBg: 'bg-[#e21b3c]',
  },
  B: {
    symbol: '◆',
    name: '蓝钻',
    baseBg: 'bg-[#1368ce]',
    barBg: 'bg-[#1368ce]',
    cardBg: 'bg-[#1368ce]',
  },
  C: {
    symbol: '●',
    name: '黄圆',
    baseBg: 'bg-[#d89e00]',
    barBg: 'bg-[#d89e00]',
    cardBg: 'bg-[#d89e00]',
  },
  D: {
    symbol: '■',
    name: '绿方',
    baseBg: 'bg-[#26890c]',
    barBg: 'bg-[#26890c]',
    cardBg: 'bg-[#26890c]',
  },
};

export const ResultStatsView: React.FC<ResultStatsViewProps> = ({
  question,
  students,
  onProceed,
}) => {
  const [animated, setAnimated] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // 挂载后启动直立立柱冲天拔起生长动画
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // 实时根据学生作答分布计算 4 个选项的选票与百分比
  const distribution = calculateDistribution(students, question.correctOptionIndex);
  const totalSubmitted = students.filter((s) => s.isSubmitted).length || 1;
  const correctOptionKey = (['A', 'B', 'C', 'D'] as OptionKey[])[question.correctOptionIndex];
  const correctCount = distribution[correctOptionKey].count;
  const accuracyRate = Math.round((correctCount / totalSubmitted) * 100);

  const keys: OptionKey[] = ['A', 'B', 'C', 'D'];

  // 计算最高票数以确定垂直柱子最大高度
  const maxCount = Math.max(...keys.map((k) => distribution[k].count), 1);

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3.5 select-none relative overflow-hidden bg-[#0c1022] text-white animate-fadeIn font-sans gap-2 sm:gap-3">
      {/* 
        ========================================================================
        1. 顶部经典控制横幅 (题干大字 + 班级正答率 + 官方题解弹层 + Kahoot 经典 Next 按键)
        ========================================================================
      */}
      <div className="w-full bg-slate-900/95 rounded-2xl px-4 sm:px-6 py-2 border border-slate-800 shadow-xl flex items-center justify-between gap-4 flex-shrink-0 z-20">
        {/* 左侧：题号与题目题干 */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="px-3 py-1 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs sm:text-sm font-black flex items-center gap-1 flex-shrink-0">
            <span>Q{question.number}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{question.total}</span>
          </div>

          <h2 className="text-base sm:text-xl font-black text-white truncate drop-shadow">
            {question.prompt}
          </h2>
        </div>

        {/* 右侧：班级速报、题解按钮与标志性 Next 下一题按键 */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-slate-300">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>已答: {totalSubmitted}人</span>
          </div>

          <div
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs sm:text-sm font-black shadow-xs ${
              accuracyRate >= 60
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>全班正答率: {accuracyRate}%</span>
          </div>

          {/* 题解开关按钮 (不占用主屏空间，点击呼出官方题解弹层) */}
          <button
            onClick={() => setShowExplanation(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>官方题解</span>
          </button>

          {/* Kahoot 经典明蓝主控 Next 按键 */}
          <button
            onClick={onProceed}
            className="px-6 sm:px-8 py-1.5 rounded-xl bg-[#1368ce] hover:bg-[#0f52a5] text-white font-black text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border border-blue-400/40 cursor-pointer"
          >
            <span>Next 下一题</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 
        ========================================================================
        2. 上半屏：真正对标 Kahoot 的【垂直挺拔冲天立柱】(占据屏幕 68% 核心高度)
           - 立柱宽度严格收敛为 76px~88px，修长挺拔，极具视觉冲击力！
           - 最高立柱（黄色 19 票）可垂直冲天生长到 62% 高度，柱高超过 240px，高宽比超 3:1！
           - 矮立柱（4、3、2 票）依比例生长，与冲天的黄色冠军立柱形成极具震撼的梯级落差！
           - 顶部预留整整 60px 充裕呼吸安全区，绝对不顶到顶栏！
           - 纯白纯净大字号数字在最高峰，大绿勾贴柱，完全吻合 Kahoot 原版！
        ========================================================================
      */}
      <div className="w-full flex-1 min-h-[300px] flex items-end justify-center gap-8 sm:gap-14 lg:gap-20 px-4 sm:px-12 pb-3 relative z-10">
        {/* 地平基准线 */}
        <div className="absolute bottom-3 inset-x-8 sm:inset-x-16 h-1 bg-slate-800/80 rounded-full pointer-events-none"></div>

        {/* 4 根垂直立柱容器 */}
        {keys.map((key, idx) => {
          const opt = question.options[idx];
          const stat = distribution[key];
          const isCorrect = key === correctOptionKey;
          const theme = KAHOOT_THEMES[key];

          // 核心高度比例：
          // - 冠军立柱（maxCount 19 票）生长到图表区的 62%（约 200px~260px 高度）
          // - 其他票数按比例平滑落差：4 票约为 13%、3 票约为 10%、2 票约为 7%
          // - 0 票为 0%
          const maxGrowthPercent = 62;
          const targetHeightPercent =
            stat.count === 0
              ? 0
              : Math.max(6, Math.round((stat.count / maxCount) * maxGrowthPercent));

          return (
            <div
              key={key}
              className="w-18 sm:w-22 lg:w-24 h-full flex flex-col justify-end items-center relative z-10"
            >
              {/* 
                直立矩形平顶柱体 (直上直下，顶端微圆角，与底座完全同宽，修长挺拔！)
              */}
              <div
                style={{
                  height: animated ? `${targetHeightPercent}%` : '0%',
                  transition: 'height 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`w-full rounded-t-sm relative flex flex-col items-center justify-start ${theme.barBg} ${
                  isCorrect
                    ? 'opacity-100 shadow-[0_0_35px_rgba(216,158,0,0.5)]'
                    : 'opacity-40'
                }`}
              >
                {/* 
                  柱顶指示器：紧贴柱体平顶上方
                  - Kahoot 原版顺位：
                    1. 最上方：纯白大字号数字 (如 19, 4, 3, 2)
                    2. 下方紧贴柱顶：大绿勾 ✓ (正确选项独享)
                */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center justify-end pb-1.5 whitespace-nowrap pointer-events-none">
                  {/* 1. 顶部加粗纯净数字 (得分之巅，大字号高清对比) */}
                  <span
                    className={`text-2xl sm:text-3xl lg:text-4xl font-black font-mono leading-none tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}
                  >
                    {stat.count}
                  </span>

                  {/* 2. 贴在立柱顶端的鲜亮大对勾 (对标原生 Kahoot) */}
                  {isCorrect && (
                    <div className="flex items-center justify-center mt-1.5 animate-bounce">
                      <Check className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 stroke-[4] drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                    </div>
                  )}
                </div>
              </div>

              {/* 
                Kahoot 标志性专属几何彩色底座 (Base Podium)
                - 包含纯白色的几何形状：▲、◆、●、■
                - 底座保持扎实色块感与纯白符号，绝不变黑变灰
              */}
              <div
                className={`w-full h-10 sm:h-11 rounded-b-sm flex items-center justify-center text-white text-xl sm:text-2xl font-black shadow-md border-t border-black/30 flex-shrink-0 transition-all ${
                  theme.baseBg
                } ${isCorrect ? 'opacity-100 shadow-[0_0_20px_rgba(216,158,0,0.4)]' : 'opacity-90'}`}
              >
                <span className="text-white drop-shadow-md select-none">{theme.symbol}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        ========================================================================
        3. 下半屏：1:1 对标 Kahoot 经典【四色巨幕选项卡 (2×2 网格)】
           - 占满下半屏精炼空间 (约 26% 高度，为上方立柱腾出整整 68% 耸立高度)
           - 正确选项卡：100% 全亮高饱和金黄 + 纯白外边框 + 璀璨绿色对勾徽章
           - 错误选项卡：保持正宗红/蓝/绿底色 (带轻度半透)，文字保持 100% 高清纯白大字！
           - 错误选项右侧带半透明圆圈叉号 ✕，正误对比极致鲜明！
        ========================================================================
      */}
      <div className="w-full h-[25%] sm:h-[27%] max-h-[160px] min-h-[105px] grid grid-cols-2 grid-rows-2 gap-2 sm:gap-2.5 flex-shrink-0 z-10">
        {keys.map((key, idx) => {
          const opt = question.options[idx];
          const isCorrect = key === correctOptionKey;
          const theme = KAHOOT_THEMES[key];

          return (
            <div
              key={key}
              className={`rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between shadow-lg transition-all duration-500 relative overflow-hidden border-2 ${
                isCorrect
                  ? `${theme.cardBg} border-white shadow-[0_0_35px_rgba(255,255,255,0.35)] scale-[1.01] text-white`
                  : `${theme.cardBg} opacity-40 hover:opacity-55 border-transparent text-white`
              }`}
            >
              {/* 左侧：白色几何符号 + 选项文本 */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <span className="text-xl sm:text-3xl font-black select-none drop-shadow flex-shrink-0 text-white">
                  {theme.symbol}
                </span>

                <span className="text-base sm:text-xl lg:text-2xl font-black drop-shadow leading-tight truncate text-white">
                  {opt.text}
                </span>
              </div>

              {/* 右侧：正确展示圆圈大绿勾，错误展示半透明小叉号 */}
              {isCorrect ? (
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-2xl flex-shrink-0 border-2 border-emerald-500 animate-pulse ml-2">
                  <Check className="w-4 h-4 sm:w-6 sm:h-6 stroke-[4] text-emerald-600" />
                </div>
              ) : (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/35 text-white/60 flex items-center justify-center flex-shrink-0 ml-2 border border-white/15">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 
        ========================================================================
        4. 教师专属精讲题解弹层 (Modal Drawer)
           - 点击顶部「官方题解」弹出，老师复盘完毕即可一键关闭，绝不挤占游戏巨幕空间
        ========================================================================
      */}
      {showExplanation && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowExplanation(false)}
        >
          <div
            className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-left relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2.5 text-amber-300 font-black text-base sm:text-lg">
                <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                </div>
                <span>教师讲解要点 · 官方权威题解</span>
              </div>
              <button
                onClick={() => setShowExplanation(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 正确选项提示 */}
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-400 font-bold">正确选项为：</span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black text-sm sm:text-base flex items-center gap-1.5">
                <Check className="w-4 h-4 stroke-[3]" />
                {correctOptionKey}. {question.options[question.correctOptionIndex].text}
              </span>
            </div>

            {/* 解析正文 */}
            <div className="bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
              {question.explanation}
            </div>

            {/* 底部确认按钮 */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowExplanation(false)}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                关闭题解
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
