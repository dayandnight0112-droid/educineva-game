import React from 'react';
import { Gamepad2, Sparkles, Star } from 'lucide-react';

interface StudentHeaderProps {
  onOpenJoinModal: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ onOpenJoinModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-pink-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* 左侧：充满童趣的 Educineva Kids Logo */}
        <div className="flex items-center space-x-3 cursor-pointer select-none group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-md shadow-pink-200 transform group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <span className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">🚀</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 font-sans">
                Educineva
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-black bg-amber-400 text-amber-950 shadow-xs uppercase tracking-wider transform -rotate-2">
                Kids
              </span>
            </div>
            <p className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-500" />
              快乐学习 · 游戏竞技乐园
            </p>
          </div>
        </div>

        {/* 右侧：常驻吸睛的【🎮 加入房间】圆角大按钮 */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenJoinModal}
            className="group relative inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-white font-black text-base sm:text-lg bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 shadow-lg shadow-pink-300/60 hover:shadow-xl hover:shadow-pink-400/80 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-95 transition-all duration-200 overflow-hidden cursor-pointer"
          >
            {/* 炫彩流动光斑 */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            
            <Gamepad2 className="w-6 h-6 animate-bounce text-white drop-shadow-sm" />
            <span className="tracking-wide drop-shadow-xs">🎮 加入房间</span>
            <Star className="w-4 h-4 fill-amber-200 text-amber-200 hidden sm:inline-block animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
};
