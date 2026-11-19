import React, { useState, useEffect } from 'react';
import { CartoonAvatar } from '../types';
import { PRESET_TEAMS, MOCK_TEAMMATES } from '../mockData';
import {
  Users,
  Shield,
  Swords,
  Sparkles,
  ArrowRight,
  LogOut,
  RefreshCw,
  Bell,
  CheckCircle2,
  Radio,
  Flame,
} from 'lucide-react';

interface LobbyViewProps {
  roomName: string;
  pin: string;
  nickname: string;
  avatar: CartoonAvatar;
  initialTeamId?: string;
  liveTeammates?: Array<{ id: string; name: string; avatar: string; teamId: string; isReady?: boolean }>;
  externalTeamChangeNotice?: { prevTeamName: string; newTeamName: string } | null;
  onRequestSwitchTeam?: () => boolean;
  onLeaveRoom: () => void;
  onStartQuiz: () => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  roomName,
  pin,
  nickname,
  avatar,
  initialTeamId = 'blue',
  liveTeammates,
  externalTeamChangeNotice,
  onRequestSwitchTeam,
  onLeaveRoom,
  onStartQuiz,
}) => {
  const [currentTeamId, setCurrentTeamId] = useState<string>(initialTeamId);
  const [teamChangeAlert, setTeamChangeAlert] = useState<{
    show: boolean;
    prevTeamName: string;
    newTeamName: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'my-team' | 'all'>('my-team');

  // 当母体/老师大屏同步更新了学生所属队伍时，立即同步并弹出提醒
  useEffect(() => {
    if (initialTeamId && initialTeamId !== currentTeamId) {
      const prevTeam = PRESET_TEAMS[currentTeamId] || PRESET_TEAMS.blue;
      const nextTeam = PRESET_TEAMS[initialTeamId] || PRESET_TEAMS.blue;
      setCurrentTeamId(initialTeamId);
      setTeamChangeAlert({
        show: true,
        prevTeamName: prevTeam.name,
        newTeamName: nextTeam.name,
      });
      const timer = setTimeout(() => setTeamChangeAlert(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [initialTeamId]);

  useEffect(() => {
    if (externalTeamChangeNotice) {
      setTeamChangeAlert({
        show: true,
        prevTeamName: externalTeamChangeNotice.prevTeamName,
        newTeamName: externalTeamChangeNotice.newTeamName,
      });
      const timer = setTimeout(() => setTeamChangeAlert(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [externalTeamChangeNotice]);

  const currentTeam = PRESET_TEAMS[currentTeamId] || PRESET_TEAMS.blue;

  // 切换队伍（联机模式下请求母体与老师大屏同步换队，离线模式下本地演示切换）
  const handleSimulateTeamChange = () => {
    if (onRequestSwitchTeam && onRequestSwitchTeam()) {
      return;
    }
    const nextTeamId = currentTeamId === 'blue' ? 'red' : 'blue';
    const prevName = currentTeam.name;
    const nextName = PRESET_TEAMS[nextTeamId].name;

    setCurrentTeamId(nextTeamId);
    setTeamChangeAlert({
      show: true,
      prevTeamName: prevName,
      newTeamName: nextName,
    });

    // 4 秒后自动淡出变队提示
    setTimeout(() => {
      setTeamChangeAlert(null);
    }, 4500);
  };

  // 优先使用母体同步的真实同房同学列表；若处于单机离线模式则使用 MOCK_TEAMMATES
  const activeTeammates = liveTeammates !== undefined ? liveTeammates : MOCK_TEAMMATES;
  const myTeammates = activeTeammates.filter((m) => m.teamId === currentTeamId);
  const displayedMembers = activeTab === 'my-team' ? myTeammates : activeTeammates;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* 顶部房间信息栏 */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-gray-100 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 p-0.5 shadow-sm">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-xl">
              🏫
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-gray-900">{roomName}</h2>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>连线正常</span>
              </span>
            </div>
            <p className="text-xs font-bold text-gray-500 mt-0.5">
              房间 PIN 码：
              <span className="text-pink-600 font-black tracking-widest text-sm bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200">
                {pin}
              </span>
              <span className="mx-2 text-gray-300">|</span>
              当前在线：<span className="text-gray-800 font-extrabold">{activeTeammates.length + 1} 位同学</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 模拟老师调队测试快捷按钮 */}
          <button
            onClick={handleSimulateTeamChange}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            title="模拟老师在教师端将您调换队伍，体验平滑变色动效"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin-hover" />
            <span>模拟老师换队</span>
          </button>

          {/* 退出房间按钮 */}
          <button
            onClick={onLeaveRoom}
            className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            title="退出当前房间返回大厅"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>退出</span>
          </button>
        </div>
      </div>

      {/* 变队悬浮提示通知（当队伍变动时触发平滑动画） */}
      {teamChangeAlert?.show && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xl shadow-orange-300/50 flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300 border-2 border-white/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg">
              <Bell className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <p className="text-sm font-black tracking-wide">
                🔔 队伍变动通知：老师已将你调至【{teamChangeAlert.newTeamName}】！
              </p>
              <p className="text-xs text-white/90 font-medium">
                阵营横幅与战队主题色已同步切换，快与新队友一同准备冲锋！
              </p>
            </div>
          </div>
          <button
            onClick={() => setTeamChangeAlert(null)}
            className="px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-black transition-colors cursor-pointer"
          >
            我知道了
          </button>
        </div>
      )}

      {/* 核心身份卡片：大头像、学生昵称，以及巨大的【队伍横幅】 */}
      <div
        className={`relative overflow-hidden rounded-[32px] border-4 transition-all duration-500 shadow-2xl p-6 sm:p-8 bg-white ${currentTeam.borderClass}`}
      >
        {/* 背景轻柔光泽纹理 */}
        <div
          className={`absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10 bg-gradient-to-br ${currentTeam.gradientBg} blur-2xl pointer-events-none transition-all duration-700`}
        ></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          {/* 左侧：学生大头像与昵称 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <div className="relative group">
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1.5 shadow-xl transition-all duration-500 bg-gradient-to-tr ${currentTeam.gradientBg}`}
              >
                <div className="w-full h-full bg-white rounded-[20px] p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={avatar.src}
                    alt={avatar.name}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                  />
                </div>
              </div>
              {/* 队伍角标徽章 */}
              <div
                className={`absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-xs font-black text-white shadow-md transition-colors duration-500 bg-gradient-to-r ${currentTeam.gradientBg}`}
              >
                {currentTeam.icon} {currentTeam.shortName}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>已就绪 · 等待开始</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {nickname}
              </h1>
              <p className="text-xs text-gray-500 font-bold flex items-center gap-1 justify-center sm:justify-start">
                <span>头像装扮：{avatar.name}</span>
              </p>
            </div>
          </div>

          {/* 右侧：巨大的【队伍横幅 (Team Banner)】 */}
          <div className="w-full md:w-auto">
            <div
              className={`rounded-2xl p-5 text-white shadow-lg transition-all duration-500 transform hover:scale-102 bg-gradient-to-r ${currentTeam.gradientBg}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl drop-shadow-sm">{currentTeam.icon}</span>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-white/80">
                    CURRENT TEAM · 你的所属阵营
                  </div>
                  <div className="text-xl sm:text-2xl font-black tracking-wide drop-shadow-xs">
                    {currentTeam.name}
                  </div>
                  <p className="text-xs text-white/90 font-semibold mt-0.5">
                    "{currentTeam.slogan}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 队友列表花名册区 (Roster) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-gray-100 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-black text-gray-900">
              同房间小伙伴花名册
            </h3>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
              {displayedMembers.length + (activeTab === 'my-team' ? 1 : 1)} 人
            </span>
          </div>

          {/* 分组切换 Tabs */}
          <div className="inline-flex p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setActiveTab('my-team')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'my-team'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              🛡️ 我的队伍 ({myTeammates.length + 1})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              👥 全房同学 ({activeTeammates.length + 1})
            </button>
          </div>
        </div>

        {/* 队友卡片网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* 自己 */}
          <div className="relative p-3 rounded-2xl bg-gradient-to-b from-pink-50 to-amber-50/40 border-2 border-pink-400 flex flex-col items-center text-center shadow-xs">
            <span className="absolute top-1.5 right-1.5 text-[9px] font-black bg-pink-500 text-white px-1.5 py-0.5 rounded-md shadow-xs">
              我
            </span>
            <div className="w-12 h-12 rounded-xl bg-white p-1 mb-2 shadow-xs border border-pink-200">
              <img src={avatar.src} alt="" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-black text-gray-900 truncate max-w-[90px]">
              {nickname}
            </span>
            <span
              className={`text-[10px] font-bold mt-1 px-1.5 py-0.2 rounded-md ${currentTeam.badgeBg}`}
            >
              {currentTeam.shortName}
            </span>
          </div>

          {/* 其他小伙伴 */}
          {displayedMembers.map((member) => {
            const memberTeam = PRESET_TEAMS[member.teamId] || PRESET_TEAMS.blue;
            return (
              <div
                key={member.id}
                className="p-3 rounded-2xl bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white p-1 mb-2 shadow-2xs border border-gray-100">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-black text-gray-800 truncate max-w-[90px]">
                  {member.name}
                </span>
                <span
                  className={`text-[10px] font-bold mt-1 px-1.5 py-0.2 rounded-md ${memberTeam.badgeBg}`}
                >
                  {memberTeam.shortName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部常驻脉冲等待区域 */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 shadow-xl border-2 border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="relative flex items-center justify-center">
            <span className="w-4 h-4 rounded-full bg-pink-500 animate-ping absolute"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 relative"></span>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black tracking-wide text-amber-300 flex items-center gap-1.5 justify-center sm:justify-start">
              <span>老师准备中，随时准备开战...</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            </h4>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              请保持屏幕常亮！当老师按下【开始游戏 / 题目下发】时，将自动秒级切入对战答题画面。
            </p>
          </div>
        </div>

        {/* 离线体验：模拟老师触发开始答题 */}
        <button
          onClick={onStartQuiz}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-pink-500/40 hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Flame className="w-4 h-4 text-amber-200" />
          <span>模拟老师发题 (立即开战)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
