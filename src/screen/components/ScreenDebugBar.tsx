import React, { useState } from 'react';
import {
  Wrench,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  SkipForward,
  UserPlus,
  Users,
  CheckCircle2,
  RefreshCw,
  Clock,
  Sparkles,
} from 'lucide-react';
import { TeacherScreenState, ScreenSettings } from '../types';

interface ScreenDebugBarProps {
  currentState: TeacherScreenState;
  currentQIndex: number;
  totalQuestions: number;
  isTimerRunning: boolean;
  timeLeft: number;
  countdownPhase: string;
  settings: ScreenSettings;
  onSelectState: (state: TeacherScreenState) => void;
  onSelectQuestion: (index: number) => void;
  onToggleTimer: () => void;
  onSkipTimer: () => void;
  onSimulateAddStudents: (count: number) => void;
  onSimulateSubmissionRatio: (ratio: number) => void;
  onResetAll: () => void;
  onUpdateSettings: (newSettings: Partial<ScreenSettings>) => void;
  onChangeTeamMode?: (mode: 2 | 3 | 4) => void;
}

export const ScreenDebugBar: React.FC<ScreenDebugBarProps> = ({
  currentState,
  currentQIndex,
  totalQuestions,
  isTimerRunning,
  timeLeft,
  countdownPhase,
  settings,
  onSelectState,
  onSelectQuestion,
  onToggleTimer,
  onSkipTimer,
  onSimulateAddStudents,
  onSimulateSubmissionRatio,
  onResetAll,
  onUpdateSettings,
  onChangeTeamMode,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const screens: { state: TeacherScreenState; name: string; tag: string }[] = [
    { state: 'lobby', name: '1. 等待大厅', tag: 'Lobby' },
    { state: 'question-prompt', name: '2A. 审题 (倒计时1)', tag: 'Timer1' },
    { state: 'question-options', name: '2B. 抢答 (倒计时2)', tag: 'Timer2' },
    { state: 'result-stats', name: '3. 柱状统计', tag: 'BarChart' },
    { state: 'scoreboard', name: '4. 局间积分榜', tag: 'Scores' },
    { state: 'podium', name: '5. 终局颁奖', tag: 'Podium' },
  ];

  return (
    <aside
      aria-label="老师大屏离线状态调试工具条"
      className="fixed bottom-0 left-0 right-0 z-50 select-none transition-all duration-300"
    >
      {/* 展开/折叠浮动标签 */}
      <div className="flex justify-end px-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-3 py-1 bg-white/95 hover:bg-slate-50 text-pink-600 font-bold text-xs rounded-t-xl border-t border-x border-gray-200 shadow-md cursor-pointer backdrop-blur-md"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>离线调试工具条 (Debug Bar)</span>
          {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 调试面板主体 */}
      {!isCollapsed && (
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 py-2.5 shadow-xl text-slate-700">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* 1. 核心画面 6 大状态秒切 */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3 text-pink-500" />
                <span>画面秒切:</span>
              </span>
              {screens.map((item) => {
                const isActive = currentState === item.state;
                return (
                  <button
                    key={item.state}
                    onClick={() => onSelectState(item.state)}
                    className={`px-3 py-1.5 rounded-lg font-black transition-all cursor-pointer whitespace-nowrap text-xs ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/20 scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-gray-200'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* 2. 题目切换 (Q1 ~ Q5) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-gray-200">
              <span className="text-[10px] text-slate-500 font-bold px-1.5">题目:</span>
              {Array.from({ length: totalQuestions }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectQuestion(idx)}
                  className={`w-6 h-6 rounded font-black text-xs transition cursor-pointer flex items-center justify-center ${
                    currentQIndex === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* 2.1 阵营模式 (2队 / 3队 / 4队) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-gray-200">
              <span className="text-[10px] text-slate-500 font-bold px-1">战队:</span>
              {([2, 3, 4] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => onChangeTeamMode?.(m)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-black transition cursor-pointer ${
                    settings.teamMode === m
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {m}队
                </button>
              ))}
            </div>

            {/* 3. 倒计时控制 (暂停/继续/跳过 + 时长微调) */}
            <div className="flex items-center gap-2 bg-slate-100 px-2.5 py-1 rounded-lg border border-gray-200">
              <div className="flex items-center gap-1.5 text-amber-600 font-black">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">
                  {countdownPhase === 'timer1' ? 'T1' : countdownPhase === 'timer2' ? 'T2' : 'Timer'}:{' '}
                  <span className="text-slate-900 text-sm font-mono">{timeLeft}s</span>
                </span>
              </div>
              <button
                onClick={onToggleTimer}
                className="p-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-gray-200 transition cursor-pointer"
                title={isTimerRunning ? '暂停计时' : '继续计时'}
              >
                {isTimerRunning ? <Pause className="w-3 h-3 text-amber-600" /> : <Play className="w-3 h-3 text-emerald-600" />}
              </button>
              <button
                onClick={onSkipTimer}
                className="p-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-gray-200 transition cursor-pointer"
                title="立即跳过本阶段"
              >
                <SkipForward className="w-3 h-3 text-pink-500" />
              </button>
            </div>

            {/* 4. 模拟学生与提交动作 */}
            <div className="flex items-center gap-1.5">
              {/* 模拟加人 */}
              <div className="inline-flex rounded-lg bg-slate-100 border border-gray-200 p-0.5">
                <button
                  onClick={() => onSimulateAddStudents(1)}
                  className="px-2 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded transition cursor-pointer flex items-center gap-1"
                  title="进房 +1 名学生"
                >
                  <UserPlus className="w-3 h-3 text-indigo-600" />
                  <span>+1人</span>
                </button>
                <button
                  onClick={() => onSimulateAddStudents(5)}
                  className="px-2 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded transition cursor-pointer"
                  title="进房 +5 名学生"
                >
                  +5人
                </button>
              </div>

              {/* 模拟提交比例 */}
              <div className="inline-flex rounded-lg bg-slate-100 border border-gray-200 p-0.5">
                <button
                  onClick={() => onSimulateSubmissionRatio(0)}
                  className="px-2 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded transition cursor-pointer"
                  title="模拟无人提交"
                >
                  0%
                </button>
                <button
                  onClick={() => onSimulateSubmissionRatio(0.5)}
                  className="px-2 py-1 text-[11px] font-bold text-amber-700 hover:bg-white rounded transition cursor-pointer"
                  title="模拟半数提交"
                >
                  50%
                </button>
                <button
                  onClick={() => onSimulateSubmissionRatio(1)}
                  className="px-2 py-1 text-[11px] font-bold text-emerald-700 hover:bg-white rounded transition cursor-pointer flex items-center gap-0.5"
                  title="模拟全员提交完毕"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>100%</span>
                </button>
              </div>

              {/* 重置 */}
              <button
                onClick={onResetAll}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-gray-200 transition cursor-pointer"
                title="重置所有状态到大厅"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
