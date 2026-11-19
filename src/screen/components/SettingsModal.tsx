import React from 'react';
import { X, Clock, Sliders, Volume2, Shield, Sparkles } from 'lucide-react';
import { ScreenSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  settings: ScreenSettings;
  onClose: () => void;
  onUpdateSettings: (newSettings: Partial<ScreenSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const timer1Presets = [5, 10, 15, 20, 30];
  const timer2Presets = [10, 15, 20, 30, 45];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm select-none animate-fadeIn">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl text-slate-800 relative overflow-hidden">
        {/* 背景装饰光晕 */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-100/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none"></div>

        {/* 顶部标题 */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-50 text-pink-600 border border-pink-200">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide text-slate-900">老师大屏节奏与参数设置</h2>
              <p className="text-xs text-slate-500">实时调整倒计时 1（审题）与倒计时 2（作答）时长</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 主体表单 */}
        <div className="py-5 space-y-6">
          {/* 1. 倒计时 1 (审题时长) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <div className="flex items-center gap-2 text-amber-700">
                <Clock className="w-4 h-4" />
                <span>倒计时 1：题干审题与思考时长</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-black border border-amber-200">
                当前: {settings.durationTimer1} 秒
              </span>
            </div>
            <p className="text-xs text-slate-500">
              此阶段大屏仅展示超大清晰题干，选项被遮罩，引导全班聚焦审题思考。
            </p>
            <div className="grid grid-cols-5 gap-2 pt-1">
              {timer1Presets.map((val) => (
                <button
                  key={val}
                  onClick={() => onUpdateSettings({ durationTimer1: val })}
                  className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    settings.durationTimer1 === val
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-gray-200'
                  }`}
                >
                  {val} 秒
                </button>
              ))}
            </div>
          </div>

          {/* 2. 倒计时 2 (作答时长) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <div className="flex items-center gap-2 text-emerald-700">
                <Sparkles className="w-4 h-4" />
                <span>倒计时 2：四色选项展开作答时长</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-black border border-emerald-200">
                当前: {settings.durationTimer2} 秒
              </span>
            </div>
            <p className="text-xs text-slate-500">
              此阶段四色选项卡片完整亮相，学生手机手柄激活抢答。
            </p>
            <div className="grid grid-cols-5 gap-2 pt-1">
              {timer2Presets.map((val) => (
                <button
                  key={val}
                  onClick={() => onUpdateSettings({ durationTimer2: val })}
                  className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    settings.durationTimer2 === val
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20 scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-gray-200'
                  }`}
                >
                  {val} 秒
                </button>
              ))}
            </div>
          </div>

          {/* 3. 辅助交互开关 */}
          <div className="pt-2 border-t border-gray-200 space-y-3">
            {/* 自动翻开选项 */}
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-bold text-slate-800">审题倒计时结束后自动展开选项</div>
                <div className="text-xs text-slate-500">若关闭，则需要老师手动点击【出选项】按钮</div>
              </div>
              <button
                onClick={() => onUpdateSettings({ autoAdvanceToOptions: !settings.autoAdvanceToOptions })}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.autoAdvanceToOptions ? 'bg-pink-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform absolute top-0.5 ${
                    settings.autoAdvanceToOptions ? 'left-6.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            {/* 音效开关 */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-bold text-slate-800">音效提示音</span>
              </div>
              <button
                onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.soundEnabled ? 'bg-pink-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform absolute top-0.5 ${
                    settings.soundEnabled ? 'left-6.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            {/* 房间锁定 */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-bold text-slate-800">锁定房间（禁止新玩家加入）</span>
              </div>
              <button
                onClick={() => onUpdateSettings({ isRoomLocked: !settings.isRoomLocked })}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.isRoomLocked ? 'bg-amber-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform absolute top-0.5 ${
                    settings.isRoomLocked ? 'left-6.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 底部关闭确认 */}
        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-sm shadow-lg shadow-pink-500/25 transition cursor-pointer"
          >
            保存并返回大屏
          </button>
        </div>
      </div>
    </div>
  );
};
