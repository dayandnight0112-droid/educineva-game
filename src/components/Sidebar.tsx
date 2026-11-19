import React from 'react';
import { Gamepad2, FileText, ArrowLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentTab: 'games' | 'question';
  onTabChange: (tab: 'games' | 'question') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200/90 flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Top Branding */}
      <div>
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <button
              title="返回上一级"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-[#e60067] leading-tight font-sans">
                Educineva
              </span>
              <span className="text-[13px] text-gray-500 font-normal">
                教师管理后台
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 mt-4 space-y-2">
          {/* Games Menu Item */}
          <button
            onClick={() => onTabChange('games')}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] font-semibold transition-all duration-200 ${
              currentTab === 'games'
                ? 'bg-[#fde7f0] text-[#e60067] shadow-2xs'
                : 'text-gray-700 hover:bg-gray-50 font-medium'
            }`}
          >
            <div
              className={`p-1 rounded-lg ${
                currentTab === 'games' ? 'text-[#e60067]' : 'text-gray-500'
              }`}
            >
              <Gamepad2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span>Games</span>
          </button>

          {/* Question Menu Item */}
          <button
            onClick={() => onTabChange('question')}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] transition-all duration-200 ${
              currentTab === 'question'
                ? 'bg-[#fde7f0] text-[#e60067] font-semibold shadow-2xs'
                : 'text-gray-700 hover:bg-gray-50 font-medium'
            }`}
          >
            <div
              className={`p-1 rounded-lg ${
                currentTab === 'question' ? 'text-[#e60067]' : 'text-gray-500'
              }`}
            >
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span>Question</span>
          </button>
        </nav>
      </div>

      {/* Bottom Teacher Account Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition cursor-pointer group">
          <div className="relative">
            <img
              src="./assets/games/teacher_avatar.png"
              alt="Teacher Avatar"
              className="w-11 h-11 rounded-full object-cover border-2 border-pink-100 shadow-2xs group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[15px] font-bold text-gray-800 leading-snug">
              Teacher
            </span>
            <span className="text-xs text-gray-400">
              教师账号
            </span>
          </div>
          <ChevronRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-gray-500 transition-colors" />
        </div>
      </div>
    </aside>
  );
};
