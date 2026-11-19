import React, { useState, useRef, useEffect } from 'react';
import {
  QrCode,
  Users,
  Copy,
  Check,
  RefreshCw,
  Play,
  Lock,
  Unlock,
  X,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ScreenSettings, ScreenTeam, ScreenStudent } from '../types';
import { RealisticLightning } from './RealisticLightning';

interface LobbyViewProps {
  settings: ScreenSettings;
  teams: Record<'blue' | 'red' | 'yellow' | 'green', ScreenTeam>;
  students: ScreenStudent[];
  onStartGame: () => void;
  onRebalanceTeams: () => void;
  onToggleLockRoom: () => void;
  onChangeTeamMode?: (mode: 2 | 3 | 4) => void;
  onMoveStudent?: (studentId: string) => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  settings,
  teams,
  students,
  onStartGame,
  onRebalanceTeams,
  onToggleLockRoom,
  onChangeTeamMode,
  onMoveStudent,
}) => {
  const [copied, setCopied] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const teamMode = settings.teamMode || 2;

  const handleCopyPin = () => {
    navigator.clipboard?.writeText(settings.pin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 监听学生数量与视口变化，动态判定是否需要滑块滚动
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const checkOverflow = () => {
      // 当内容高度超过可视区域时才触发溢出滑块
      setHasOverflow(el.scrollHeight > el.clientHeight + 8);
    };
    checkOverflow();
    const timer = setTimeout(checkOverflow, 150);
    window.addEventListener('resize', checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [students.length, teamMode]);

  // 快捷向下/向上滚动滑块辅助
  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 160, behavior: 'smooth' });
    }
  };

  const handleScrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -160, behavior: 'smooth' });
    }
  };

  // 根据学生真实所属的 teamId 将学生分流到各个阵营
  const blueStudents = students.filter((s) => s.teamId === 'blue');
  const redStudents = students.filter((s) => s.teamId === 'red');
  const yellowStudents = teamMode >= 3 ? students.filter((s) => s.teamId === 'yellow') : [];
  const greenStudents = teamMode === 4 ? students.filter((s) => s.teamId === 'green') : [];

  // 格式化 6 位 PIN (如 686 868 经典 Kahoot 格式)
  const formattedPin =
    settings.pin.length === 6
      ? `${settings.pin.slice(0, 3)} ${settings.pin.slice(3)}`
      : settings.pin;

  // 根据人数动态决定竞技场高度 (少人时紧凑包裹，多人时自适应扩充到最大视口)
  const getArenaHeightClass = () => {
    if (students.length <= 6) return 'max-h-[30vh] min-h-[140px]';
    if (students.length <= 12) return 'max-h-[42vh] min-h-[200px]';
    if (students.length <= 18) return 'max-h-[52vh] min-h-[260px]';
    return 'max-h-[62vh] min-h-[320px]';
  };

  // 渲染单个学生 Kahoot 样式卡片
  const renderStudentCard = (stu: ScreenStudent, bgClass: string, borderClass: string) => (
    <div
      key={stu.id}
      onClick={() => onMoveStudent?.(stu.id)}
      title="点击可将该学生快速调换至下一支队伍"
      className={`animate-bubble-pop flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl border shadow-lg backdrop-blur-sm transition-transform hover:scale-105 cursor-pointer select-none ${bgClass} ${borderClass}`}
    >
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 bg-black/25 border border-white/50 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
        <img
          src={stu.avatar}
          alt={stu.name}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <span className="text-sm sm:text-base font-black text-white truncate tracking-wide drop-shadow-sm">
        {stu.name}
      </span>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4 select-none relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0b0e24] to-slate-950 text-white">
      {/* 
        ========================================================================
        1. 顶部正中上方：纯正 Kahoot 原生悬浮白色长条 (Join at + PIN + QR Code)
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between gap-4 px-2 sm:px-6 pt-1 flex-shrink-0 z-30">
        {/* 左侧：阵营模式自由切换 (2队 / 3队 / 4队) */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>阵营模式:</span>
          </span>
          {([2, 3, 4] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onChangeTeamMode?.(mode)}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                teamMode === mode
                  ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {mode} 队对战
            </button>
          ))}
        </div>

        {/* 核心中轴：Kahoot 原生经典悬浮白色长胶囊 */}
        <div className="mx-auto bg-white rounded-3xl py-2 px-5 sm:px-8 shadow-2xl border border-slate-200 flex items-center gap-4 sm:gap-6 text-slate-900 transition-transform hover:scale-[1.01]">
          <div className="flex flex-col text-left leading-tight hidden sm:flex">
            <span className="text-xs sm:text-sm font-black text-slate-800">
              微信扫码 或 浏览器访问
            </span>
            <span className="text-xs font-bold text-slate-500 font-mono">
              educineva.com
            </span>
          </div>

          <div className="hidden sm:block text-2xl font-light text-slate-300">/</div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-black uppercase text-slate-500 tracking-wider">
                Game PIN:
              </span>
              <span className="text-3xl sm:text-5xl font-black font-mono tracking-widest text-slate-950">
                {formattedPin}
              </span>
            </div>

            <button
              onClick={handleCopyPin}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition cursor-pointer"
              title="复制 PIN 码"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div
            onClick={() => setIsQrModalOpen(true)}
            className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer shadow-inner group flex-shrink-0 transition"
            title="点击全屏放大二维码"
          >
            <QrCode className="w-8 h-8 sm:w-9 sm:h-9 text-slate-900 group-hover:scale-105 transition-transform" />
          </div>
        </div>

        {/* 右侧：人数指示与锁房 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-black text-white shadow-md">
            <Users className="w-3.5 h-3.5 text-pink-400" />
            <span>{students.length} 人在场</span>
          </div>

          <button
            onClick={onToggleLockRoom}
            className={`p-2 rounded-2xl border transition cursor-pointer ${
              settings.isRoomLocked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-white border-slate-800'
            }`}
            title={settings.isRoomLocked ? '房间已锁定' : '点击锁定房间'}
          >
            {settings.isRoomLocked ? <Lock className="w-4 h-4 text-amber-400" /> : <Unlock className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 
        ========================================================================
        2. 战队对决核心竞技场 (根据人数动态调整高度与滑块，无 VS 徽标)
        ========================================================================
      */}
      <div className="w-full flex-1 flex flex-col justify-center my-auto px-1 sm:px-4">
        <div
          className={`w-full ${getArenaHeightClass()} relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950/50 backdrop-blur-md shadow-2xl flex flex-col transition-all duration-300`}
        >
          {/* 顶部常驻固定阵营横幅栏 (Header) */}
          <div className="w-full flex items-center justify-between px-6 py-2.5 border-b border-slate-800/80 bg-slate-900/85 flex-shrink-0 z-20 gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-blue-400 font-black text-base sm:text-lg">
              <span className="text-xl">🛡️</span>
              <span>{teams.blue.name}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {blueStudents.length} 人
              </span>
            </div>

            {teamMode >= 3 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-amber-400 font-black text-sm sm:text-base">
                  <span>⚡</span>
                  <span>{teams.yellow.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {yellowStudents.length} 人
                  </span>
                </div>
                {teamMode === 4 && (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm sm:text-base">
                    <span>🦅</span>
                    <span>{teams.green.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {greenStudents.length} 人
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 text-rose-400 font-black text-base sm:text-lg pr-4">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {redStudents.length} 人
              </span>
              <span>{teams.red.name}</span>
              <span className="text-xl">⚔️</span>
            </div>
          </div>

          {/* 
            核心全量学生滚动容器：
            - 根据人数自适应，内容不溢出时不显示冗余滑块；
            - 人数多时才在右侧激活专用平滑滑块 (custom-lobby-scrollbar)！
          */}
          <div
            ref={scrollContainerRef}
            className={`w-full flex-1 relative px-4 sm:px-6 py-4 ${
              hasOverflow ? 'overflow-y-auto custom-lobby-scrollbar' : 'overflow-hidden'
            }`}
          >
            {/* 
              ----------------------------------------------------------------------
              【2 队对战模式】：左蓝右红，严格根据用户手绘图 2 设计
              - 上方红色交织闪电束 + 下方蓝色交织闪电束 + 中心电浆碰撞光球 (NO VS)
              ----------------------------------------------------------------------
            */}
            {teamMode === 2 && (
              <div className="w-full grid grid-cols-2 relative min-h-full">
                {/* 左侧：蓝队花名册 */}
                <div className="pr-10">
                  {blueStudents.length === 0 ? (
                    <div className="h-24 rounded-2xl border border-dashed border-blue-500/30 bg-blue-950/20 flex items-center justify-center text-xs sm:text-sm font-bold text-blue-300/70 px-4 text-center">
                      等待学生手机输入 PIN 码 [{formattedPin}] 加入蓝队...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 content-start">
                      {blueStudents.map((stu) =>
                        renderStudentCard(
                          stu,
                          'bg-[#1d4ed8]/95 text-white',
                          'border-blue-400/60 shadow-blue-500/20'
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* 右侧：红队花名册 */}
                <div className="pl-10">
                  {redStudents.length === 0 ? (
                    <div className="h-24 rounded-2xl border border-dashed border-rose-500/30 bg-rose-950/20 flex items-center justify-center text-xs sm:text-sm font-bold text-rose-300/70 px-4 text-center">
                      等待学生手机输入 PIN 码 [{formattedPin}] 加入红队...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 content-start">
                      {redStudents.map((stu) =>
                        renderStudentCard(
                          stu,
                          'bg-[#b91c1c]/95 text-white',
                          'border-rose-400/60 shadow-rose-500/20'
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* 真实高压闪电特效 (对标图 2：上红下蓝 + 中心电浆碰撞，无 VS 徽章) */}
                <RealisticLightning mode={2} />
              </div>
            )}

            {/* 
              ----------------------------------------------------------------------
              【3 队对战模式】：严格根据用户手绘图 1 设计
              - 上红垂直射线 + 左下黄射线 + 右下蓝射线 + 三向中心碰撞核心 (NO VS)
              ----------------------------------------------------------------------
            */}
            {teamMode === 3 && (
              <div className="w-full flex flex-col gap-6 relative min-h-full">
                <div className="w-full grid grid-cols-2 relative pb-6">
                  <div className="pr-8">
                    <div className="text-blue-400 font-bold text-sm mb-2">🛡️ 蓝队 ({blueStudents.length}人)</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {blueStudents.map((stu) => renderStudentCard(stu, 'bg-[#1d4ed8]/95 text-white', 'border-blue-400/60'))}
                    </div>
                  </div>

                  <div className="pl-8">
                    <div className="text-rose-400 font-bold text-sm mb-2">⚔️ 红队 ({redStudents.length}人)</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {redStudents.map((stu) => renderStudentCard(stu, 'bg-[#b91c1c]/95 text-white', 'border-rose-400/60'))}
                    </div>
                  </div>
                </div>

                {/* 下方黄队 */}
                <div className="pt-2 border-t border-amber-500/30">
                  <div className="text-amber-400 font-bold text-sm mb-2">⚡ 黄队 ({yellowStudents.length}人)</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
                    {yellowStudents.map((stu) => renderStudentCard(stu, 'bg-[#b45309]/95 text-white', 'border-amber-400/60'))}
                  </div>
                </div>

                {/* 真实高压闪电特效 (对标图 1：三向闪电碰撞，无 VS 徽章) */}
                <RealisticLightning mode={3} />
              </div>
            )}

            {/* 
              ----------------------------------------------------------------------
              【4 队对战模式】：十字 4 色高压闪电 (上红、左蓝、下黄、右绿，无 VS)
              ----------------------------------------------------------------------
            */}
            {teamMode === 4 && (
              <div className="w-full grid grid-cols-2 gap-6 relative min-h-full">
                <div className="p-3 bg-blue-950/20 rounded-2xl border border-blue-500/30">
                  <div className="text-blue-400 font-bold text-sm mb-2">🛡️ 蓝队 ({blueStudents.length}人)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {blueStudents.map((stu) => renderStudentCard(stu, 'bg-[#1d4ed8]/95 text-white', 'border-blue-400/60'))}
                  </div>
                </div>

                <div className="p-3 bg-rose-950/20 rounded-2xl border border-rose-500/30">
                  <div className="text-rose-400 font-bold text-sm mb-2">⚔️ 红队 ({redStudents.length}人)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {redStudents.map((stu) => renderStudentCard(stu, 'bg-[#b91c1c]/95 text-white', 'border-rose-400/60'))}
                  </div>
                </div>

                <div className="p-3 bg-amber-950/20 rounded-2xl border border-amber-500/30">
                  <div className="text-amber-400 font-bold text-sm mb-2">⚡ 黄队 ({yellowStudents.length}人)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {yellowStudents.map((stu) => renderStudentCard(stu, 'bg-[#b45309]/95 text-white', 'border-amber-400/60'))}
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/20 rounded-2xl border border-emerald-500/30">
                  <div className="text-emerald-400 font-bold text-sm mb-2">🦅 绿队 ({greenStudents.length}人)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {greenStudents.map((stu) => renderStudentCard(stu, 'bg-[#047857]/95 text-white', 'border-emerald-400/60'))}
                  </div>
                </div>

                {/* 真实高压闪电特效 (4 向十字闪电，无 VS 徽章) */}
                <RealisticLightning mode={4} />
              </div>
            )}
          </div>

          {/* 浮动翻页微调小助手 (仅在内容真实溢出时才显示，无溢出时不干扰视线) */}
          {hasOverflow && (
            <div className="absolute right-3 bottom-3 flex items-center gap-1.5 z-30 animate-fadeIn">
              <button
                onClick={handleScrollUp}
                className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-md cursor-pointer transition"
                title="向上滑动"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={handleScrollDown}
                className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-md cursor-pointer transition"
                title="向下滑动查看更多学生"
              >
                <ChevronDown className="w-4 h-4 text-pink-400" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 
        ========================================================================
        3. 底部主控栏：调配队伍 + 锁定 + 巨型【Start 开始答题】按键
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-3 sm:px-6 py-2.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onRebalanceTeams}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>🔄 调配队伍 (自动均衡)</span>
          </button>
        </div>

        {/* 巨型 Kahoot 风格【Start / 启动对决】主键 */}
        <div className="flex items-center gap-3">
          <button
            onClick={onStartGame}
            className="px-8 sm:px-12 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:scale-105 active:scale-95 text-white font-black text-base sm:text-xl shadow-xl shadow-pink-500/30 transition-transform cursor-pointer flex items-center gap-2 border border-pink-400/40"
          >
            <Play className="w-5 h-5 fill-current animate-pulse" />
            <span>Start 开始答题</span>
          </button>
        </div>
      </div>

      {/* 4. 微信/手机扫码大屏投屏弹窗 (点击 QR 触发) */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center relative flex flex-col items-center text-slate-900">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-black uppercase text-pink-600 tracking-wider">
              Educineva 互动大屏
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">手机微信扫码直达</h3>

            <div className="my-5 p-3 bg-white border border-slate-200 rounded-2xl shadow-inner">
              <QrCode className="w-48 h-48 text-slate-900" />
            </div>

            <div className="text-xs text-slate-500 font-bold mb-2">
              或在手机访问 educineva.com 输入 PIN:
            </div>
            <div className="text-3xl font-black tracking-widest text-pink-600 font-mono">
              {formattedPin}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
