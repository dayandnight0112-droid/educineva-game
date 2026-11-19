import React from 'react';
import {
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sliders,
  Users,
  Shield,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { TeacherScreenState, ScreenTeam, ScreenSettings } from '../types';

interface ScreenHeaderProps {
  currentState: TeacherScreenState;
  settings: ScreenSettings;
  teams: Record<'blue' | 'red' | 'yellow' | 'green', ScreenTeam>;
  totalStudents: number;
  submittedCount: number;
  currentQNum: number;
  totalQNum: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenSettings: () => void;
  onToggleSound: () => void;
  onBackToAdmin?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  currentState,
  settings,
  teams,
  totalStudents,
  submittedCount,
  currentQNum,
  totalQNum,
  isFullscreen,
  onToggleFullscreen,
  onOpenSettings,
  onToggleSound,
  onBackToAdmin,
}) => {
  // 画面中文标签（纯白亮色主题高对比胶囊）
  const stateLabels: Record<TeacherScreenState, { label: string; color: string }> = {
    lobby: { label: '等待大厅 · 投屏扫码', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    'question-prompt': { label: '阶段 2A · 题干审题思考 (倒计时 1)', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    'question-options': { label: '阶段 2B · 选项展开抢答 (倒计时 2)', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    'result-stats': { label: '画面三 · 柱状分布与答案揭晓', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    scoreboard: { label: '画面四 · 局间总积分榜与战队态势', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    podium: { label: '画面五 · 终局颁奖典礼与教学洞察', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-xs select-none z-40 transition-all text-slate-800">
      {/* 左侧：返回后台 + 品牌 Logo + 房间 PIN 码 */}
      <div className="flex items-center gap-4">
        {onBackToAdmin && (
          <button
            onClick={onBackToAdmin}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-gray-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            title="返回教师管理后台重新选游戏或题目"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-pink-500" />
            <span className="hidden md:inline">返回后台</span>
          </button>
        )}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 flex items-center justify-center shadow-md shadow-pink-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-slate-900 font-black text-base tracking-wide flex items-center gap-1.5">
              <span>Educineva</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-pink-50 text-pink-600 border border-pink-200">
                大屏控制端
              </span>
            </div>
            <div className="text-xs text-slate-500 font-medium truncate max-w-[200px] xl:max-w-xs">
              {settings.roomName}
            </div>
          </div>
        </div>

        {/* 醒目的 PIN 码气泡 */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200/80 shadow-xs">
          <span className="text-xs text-amber-700 font-bold uppercase tracking-wider">PIN 码</span>
          <span className="text-lg font-black tracking-widest text-slate-900 font-mono">
            {settings.pin}
          </span>
          {settings.isRoomLocked && (
            <span className="text-xs text-rose-600 flex items-center gap-0.5 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              <Shield className="w-3 h-3" /> 已锁房
            </span>
          )}
        </div>
      </div>

      {/* 中央：当前画面状态指示 & 题目进度 */}
      <div className="flex items-center gap-3">
        {currentState !== 'lobby' && currentState !== 'podium' && (
          <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-black text-xs sm:text-sm border border-gray-200 flex items-center gap-1.5 shadow-xs">
            <span className="text-pink-600">第</span>
            <span className="text-indigo-600 text-base">{currentQNum}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">{totalQNum}</span>
            <span className="text-pink-600">题</span>
          </div>
        )}

        <div
          className={`px-3.5 py-1 rounded-full text-xs font-bold border shadow-xs transition-all ${
            stateLabels[currentState].color
          }`}
        >
          {stateLabels[currentState].label}
        </div>
      </div>

      {/* 右侧：战队积分胶囊 + 工具操作 */}
      <div className="flex items-center gap-3">
        {/* 红蓝战队实时比分微缩条 */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-gray-200 text-xs font-black">
          <div className="flex items-center gap-1.5 text-blue-600">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span>蓝队: {teams.blue.score}</span>
          </div>
          <span className="text-slate-300 font-normal">|</span>
          <div className="flex items-center gap-1.5 text-rose-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>红队: {teams.red.score}</span>
          </div>
        </div>

        {/* 在线人数指示 */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-gray-200 text-xs font-bold text-slate-700">
          <Users className="w-3.5 h-3.5 text-indigo-600" />
          <span>
            {currentState === 'question-options' ? `${submittedCount} / ${totalStudents} 提交` : `${totalStudents} 人在场`}
          </span>
        </div>

        {/* 音效开关 */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-xl transition border cursor-pointer ${
            settings.soundEnabled
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-gray-200'
              : 'bg-slate-50 text-slate-400 border-gray-200'
          }`}
          title={settings.soundEnabled ? '音效开启' : '音效静音'}
        >
          {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* 倒计时参数设置按钮 */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-gray-200 transition cursor-pointer"
          title="大屏倒计时与参数设置"
        >
          <Sliders className="w-4 h-4 text-amber-600" />
        </button>

        {/* 网页全屏按钮 (专为教室投影大屏打造) */}
        <button
          onClick={onToggleFullscreen}
          className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition cursor-pointer"
          title="切换全屏演示模式"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-4 h-4" />
              <span className="hidden md:inline">退出全屏</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4" />
              <span className="hidden md:inline">全屏投影</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
