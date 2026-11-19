import React, { useState } from 'react';
import { StudentScreen } from '../types';
import { Wrench, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface DebugBarProps {
  currentScreen: StudentScreen;
  onSelectScreen: (screen: StudentScreen) => void;
  // 是否提供模式A与模式B切换快捷按钮
  quizMode?: 'pad' | 'game';
  onToggleQuizMode?: () => void;
}

export const DebugBar: React.FC<DebugBarProps> = ({
  currentScreen,
  onSelectScreen,
  quizMode = 'pad',
  onToggleQuizMode,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const screens: { id: StudentScreen; label: string; number: string; icon: string }[] = [
    { id: 'landing', label: '大厅主页', number: '1', icon: '🏠' },
    { id: 'join-modal', label: '进房弹窗', number: '2', icon: '🔑' },
    { id: 'lobby', label: '等待大厅', number: '3', icon: '⏳' },
    { id: 'quiz', label: '答题对战', number: '4', icon: '🎮' },
    { id: 'settlement', label: '结算庆典', number: '5', icon: '🏆' },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none select-none">
      <div className="bg-slate-900/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/80 p-2 pointer-events-auto transition-all duration-300">
        <div className="flex items-center justify-between px-2 pb-1.5 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <Wrench className="w-3.5 h-3.5" />
            <span>离线全真交互调试台 (Debug Bar)</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-sm">
              即点即测
            </span>
          </div>

          <div className="flex items-center gap-3">
            {currentScreen === 'quiz' && onToggleQuizMode && (
              <button
                onClick={onToggleQuizMode}
                className="text-[11px] px-2 py-0.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors cursor-pointer"
              >
                切换为: {quizMode === 'pad' ? '模式B (独立游戏)' : '模式A (答题手柄)'}
              </button>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              title={collapsed ? '展开调试条' : '收起调试条'}
            >
              {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="grid grid-cols-5 gap-1.5 pt-2">
            {screens.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectScreen(item.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-md shadow-pink-500/40 scale-102 ring-1 ring-pink-400'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-[11px] sm:text-xs text-center truncate">
                    {item.number}.{item.label}
                  </span>
                  {isActive && <Check className="w-3 h-3 text-pink-200 hidden sm:inline-block" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
