import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CartoonAvatar, StudentMistakeItem } from '../types';
import { MOCK_SETTLEMENT_DATA, PRESET_TEAMS } from '../mockData';
import { normalizeTeamId } from '../../socket/socketClient';
import {
  Trophy,
  Crown,
  Sparkles,
  BookOpen,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  Check,
  X,
  Info,
} from 'lucide-react';

interface SettlementViewProps {
  studentId?: string;
  studentName: string;
  avatar: CartoonAvatar;
  teamId: string;
  totalScore?: number;
  correctCount?: number;
  wrongCount?: number;
  mistakes?: StudentMistakeItem[];
  liveSettlement?: any | null;
  onRestart: () => void;
  onGoHome: () => void;
}

export const SettlementView: React.FC<SettlementViewProps> = ({
  studentId,
  studentName,
  avatar,
  teamId,
  totalScore,
  correctCount,
  wrongCount,
  mistakes,
  liveSettlement,
  onRestart,
  onGoHome,
}) => {
  const [isMistakeModalOpen, setIsMistakeModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

  const isLive = Boolean(liveSettlement && Array.isArray(liveSettlement.leaderboard));
  const myLiveRecord = isLive
    ? liveSettlement.leaderboard.find((item: any) => item.studentId === studentId) ||
      liveSettlement.leaderboard.find((item: any) => item.name === studentName)
    : null;

  // 1. 个人成绩统计（优先采用母体结算广播数据，与老师大屏 100% 同步）
  const actualScore =
    myLiveRecord?.score ?? (totalScore !== undefined ? totalScore : MOCK_SETTLEMENT_DATA.totalScore);
  const actualCorrect =
    myLiveRecord?.correctCount ??
    (correctCount !== undefined ? correctCount : MOCK_SETTLEMENT_DATA.correctCount);
  const actualWrong =
    myLiveRecord?.wrongCount ??
    (wrongCount !== undefined ? wrongCount : MOCK_SETTLEMENT_DATA.wrongCount);
  const totalQuestions = liveSettlement?.totalQuestions || actualCorrect + actualWrong || 5;
  const accuracy = Math.round((actualCorrect / Math.max(1, totalQuestions)) * 100);

  // 2. 真实个人错题清单：根据玩家实际答题失误动态呈现
  const actualMistakes = mistakes !== undefined ? mistakes : MOCK_SETTLEMENT_DATA.mistakes;

  // 3. 个人冠亚季军领奖台 (第 1 名、第 2 名、第 3 名与老师大屏 PodiumView 100% 同步！)
  const offlinePlayers = [
    {
      studentId: 'me_offline',
      name: studentName,
      avatar: avatar.src,
      teamId,
      teamName: PRESET_TEAMS[teamId]?.shortName || '蓝队',
      score: actualScore,
      correctCount: actualCorrect,
    },
    {
      studentId: 'sim_1',
      name: '学霸小涵',
      avatar: './assets/games/char_b.png',
      teamId: 'red',
      teamName: '红队',
      score: 390,
      correctCount: 4,
    },
    {
      studentId: 'sim_2',
      name: '机智天天',
      avatar: './assets/games/char_a.png',
      teamId: 'blue',
      teamName: '蓝队',
      score: 350,
      correctCount: 3,
    },
    {
      studentId: 'sim_3',
      name: '元气阳阳',
      avatar: './assets/games/char_b.png',
      teamId: 'blue',
      teamName: '蓝队',
      score: 300,
      correctCount: 3,
    },
  ].sort((a, b) => b.score - a.score);

  const syncedLeaderboard: Array<{
    rank: number;
    studentId: string;
    name: string;
    avatar: string;
    teamId: string;
    teamName: string;
    score: number;
    correctCount: number;
  }> = isLive
    ? liveSettlement.leaderboard.map((item: any, idx: number) => {
        const normTeam = normalizeTeamId(item.teamId);
        return {
          rank: item.rank ?? idx + 1,
          studentId: item.studentId || `stu_${idx}`,
          name: item.name,
          avatar: item.avatar || './assets/games/char_b.png',
          teamId: normTeam,
          teamName: PRESET_TEAMS[normTeam]?.shortName || item.teamName || '战队',
          score: item.score ?? 0,
          correctCount: item.correctCount ?? Math.round((item.score || 0) / 100),
        };
      })
    : offlinePlayers.map((p, idx) => ({ ...p, rank: idx + 1 }));

  const rank1 = syncedLeaderboard[0] || null;
  const rank2 = syncedLeaderboard[1] || null;
  const rank3 = syncedLeaderboard[2] || null;

  // 计算个人在全班的真实排名与总参战人数
  const myRank =
    myLiveRecord?.rank ??
    (syncedLeaderboard.findIndex((p) => p.studentId === studentId || p.name === studentName) + 1 || 1);
  const totalParticipants = isLive ? syncedLeaderboard.length : 28;

  // 4. 战队积分与冠军战队（优先采用母体结算的 teamSummary）
  const teamScores =
    isLive && Array.isArray(liveSettlement.teamSummary) && liveSettlement.teamSummary.length > 0
      ? liveSettlement.teamSummary.map((ts: any) => {
          const normId = normalizeTeamId(ts.teamId);
          const preset = PRESET_TEAMS[normId] || PRESET_TEAMS.blue;
          return {
            teamId: normId,
            name: preset.name,
            shortName: preset.shortName,
            score: ts.score ?? 0,
            color: preset.colorHex,
            badgeBg: preset.badgeBg,
          };
        })
      : [
          {
            teamId: 'blue',
            name: '🟦 蓝队勇士',
            shortName: '蓝队',
            score: 750 + (teamId === 'blue' ? actualScore : 0),
            color: '#3b82f6',
            badgeBg: 'bg-blue-100 text-blue-800',
          },
          {
            teamId: 'red',
            name: '🟥 红队先锋',
            shortName: '红队',
            score: 820 + (teamId === 'red' ? actualScore : 0),
            color: '#ef4444',
            badgeBg: 'bg-rose-100 text-rose-800',
          },
        ].sort((a, b) => b.score - a.score);

  const championTeam = teamScores[0] || {
    teamId: 'blue',
    name: '🟦 蓝队勇士',
    shortName: '蓝队',
    score: actualScore,
    color: '#3b82f6',
    badgeBg: 'bg-blue-100 text-blue-800',
  };

  const isMeRank = (item: typeof rank1) =>
    Boolean(item && ((studentId && item.studentId === studentId) || item.name === studentName));

  // 触发炫酷彩带礼花
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e60067', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
        });
      }, 250);
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
        });
      }, 400);
    } catch (e) {
      console.warn('Confetti trigger skipped', e);
    }
  };

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 pb-28 space-y-6 select-none">
      {/* 顶部冠军队伍大横幅（依据动态排序第一名展示） */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 p-6 sm:p-8 text-white shadow-2xl border-4 border-amber-300 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="absolute top-2 right-4 flex items-center gap-2">
          <button
            onClick={() => setIsRuleModalOpen(true)}
            className="px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 text-xs font-bold text-white border border-white/30 transition-all cursor-pointer flex items-center gap-1"
            title="查看冠亚季军排名计算规则"
          >
            <Info className="w-3.5 h-3.5" />
            <span>排名规则</span>
          </button>

          <button
            onClick={fireConfetti}
            className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-black tracking-wide text-white border border-white/30 transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-xs"
            title="再次喷洒彩带礼花"
          >
            <span>🎉 放礼花</span>
          </button>
        </div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-black tracking-wider uppercase">
            <Crown className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>
              {isLive
                ? `${liveSettlement.roomName || '课堂终局对决'} · 大屏领奖结果实时同步`
                : 'CHAMPION CEREMONY · 课堂终局对决结算'}
            </span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md">
            🏆 荣耀属于 {championTeam.name}！
          </h1>
          <p className="text-sm sm:text-base font-bold text-amber-100 max-w-lg mx-auto leading-relaxed">
            {myRank === 1
              ? `🎉 恭喜你以 ${actualScore} 分斩获全班个人第 1 名（冠军）！同时 ${championTeam.name} 累计 ${championTeam.score} 分问鼎战队桂冠！`
              : myRank === 2
              ? `🥈 太棒了！你以 ${actualScore} 分夺得全班个人第 2 名（亚军）！榜首冠军为 ${rank1?.name || '同学'}（${rank1?.score ?? 0}分）！`
              : myRank === 3
              ? `🥉 干得漂亮！你以 ${actualScore} 分荣登全班个人第 3 名（季军）！榜首冠军为 ${rank1?.name || '同学'}（${rank1?.score ?? 0}分）！`
              : championTeam.teamId === teamId
              ? `太棒啦！在你与队友的默契拼搏下，${championTeam.name} 斩获全班最高 ${championTeam.score} 分，荣登冠军宝座！`
              : `全班激烈竞逐，个人冠军为【${rank1?.name || '虚位以待'}】，战队桂冠由 ${championTeam.name}（${championTeam.score} 分）夺得！`}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 与老师大屏 100% 同步的 3D 荣耀颁奖台 (Podium: 亚军第2名 / 冠军第1名 / 季军第3名) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-gray-100 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
              全班前三甲荣耀领奖台 (与老师大屏实时同步)
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            🥇 第1名 · 🥈 第2名 · 🥉 第3名 同步揭晓
          </span>
        </div>

        {/* 领奖台立柱容器 (左：第2名亚军银台 / 中：第1名冠军金台 / 右：第3名季军铜台) */}
        <div className="flex items-end justify-center gap-2 sm:gap-6 pt-8 pb-2 px-2">
          {/* 第 2 名：亚军银台 (左侧) */}
          <div className="flex-1 max-w-[175px] flex flex-col items-center">
            <div className="text-center mb-2 animate-in slide-in-from-bottom-2 duration-300 flex flex-col items-center">
              <div className="relative mb-1">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-slate-300 shadow-md overflow-hidden border-2 border-white">
                  <img
                    src={rank2?.avatar || './assets/games/char_b.png'}
                    alt={rank2?.name || '亚军'}
                    className="w-full h-full object-cover rounded-full bg-white"
                  />
                </div>
                {isMeRank(rank2) && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-pink-500 text-white text-[9px] font-black shadow-xs">
                    我
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-black text-gray-900 truncate max-w-[125px]">
                {rank2 ? rank2.name : '虚位以待'}
              </p>
              <span className="text-[10px] font-bold text-gray-500 mb-0.5">
                {rank2 ? `${rank2.teamName} · ${rank2.correctCount}/${totalQuestions}对` : '第 2 名席位'}
              </span>
              <p className="text-[11px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                {rank2 ? `${rank2.score} 分 · 亚军` : '-- 分 · 亚军'}
              </p>
            </div>
            <div className="w-full h-36 sm:h-44 rounded-t-3xl bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 shadow-lg border-2 border-slate-200 flex flex-col items-center justify-center text-white relative overflow-hidden">
              <span className="text-4xl sm:text-6xl font-black drop-shadow-md opacity-90">2</span>
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase opacity-80 mt-1">
                🥈 亚军 2ND
              </span>
            </div>
          </div>

          {/* 第 1 名：冠军金台 (中间，最高，戴皇冠) */}
          <div className="flex-1 max-w-[195px] flex flex-col items-center relative z-10 -mt-8">
            <div className="text-center mb-2 animate-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
              <div className="relative inline-block mb-1">
                <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 fill-amber-400 filter drop-shadow-md animate-bounce mx-auto -mb-1" />
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-0.5 bg-amber-400 shadow-lg overflow-hidden border-2 border-amber-200">
                  <img
                    src={rank1?.avatar || './assets/games/char_b.png'}
                    alt={rank1?.name || '冠军'}
                    className="w-full h-full object-cover rounded-full bg-white"
                  />
                </div>
                {isMeRank(rank1) && (
                  <span className="absolute bottom-0 -right-2 px-1.5 py-0.2 rounded-full bg-pink-500 text-white text-[9px] font-black shadow-xs">
                    我
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base font-black text-gray-900 truncate max-w-[140px]">
                {rank1 ? rank1.name : '虚位以待'}
              </p>
              <span className="text-[10px] font-bold text-amber-700 mb-0.5">
                {rank1 ? `${rank1.teamName} · ${rank1.correctCount}/${totalQuestions}对 ⚡` : '第 1 名席位'}
              </span>
              <p className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full inline-block shadow-xs">
                {rank1 ? `${rank1.score} 分 · 冠军` : '-- 分 · 冠军'}
              </p>
            </div>
            <div className="w-full h-48 sm:h-56 rounded-t-3xl bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 shadow-2xl border-4 border-amber-200 flex flex-col items-center justify-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 pointer-events-none"></div>
              <span className="text-5xl sm:text-7xl font-black drop-shadow-lg">1</span>
              <span className="text-xs sm:text-sm font-black tracking-widest uppercase opacity-95 mt-1">
                🥇 冠军 1ST
              </span>
            </div>
          </div>

          {/* 第 3 名：季军铜台 (右侧) */}
          <div className="flex-1 max-w-[175px] flex flex-col items-center">
            <div className="text-center mb-2 animate-in slide-in-from-bottom-1 duration-300 flex flex-col items-center">
              <div className="relative mb-1">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-amber-600 shadow-md overflow-hidden border-2 border-white">
                  <img
                    src={rank3?.avatar || './assets/games/char_b.png'}
                    alt={rank3?.name || '季军'}
                    className="w-full h-full object-cover rounded-full bg-white"
                  />
                </div>
                {isMeRank(rank3) && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-pink-500 text-white text-[9px] font-black shadow-xs">
                    我
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-black text-gray-900 truncate max-w-[125px]">
                {rank3 ? rank3.name : '虚位以待'}
              </p>
              <span className="text-[10px] font-bold text-gray-500 mb-0.5">
                {rank3 ? `${rank3.teamName} · ${rank3.correctCount}/${totalQuestions}对` : '第 3 名席位'}
              </span>
              <p className="text-[11px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                {rank3 ? `${rank3.score} 分 · 季军` : '-- 分 · 季军'}
              </p>
            </div>
            <div className="w-full h-28 sm:h-32 rounded-t-3xl bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 shadow-md border-2 border-amber-600 flex flex-col items-center justify-center text-white relative overflow-hidden">
              <span className="text-3xl sm:text-5xl font-black drop-shadow-md opacity-90">3</span>
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase opacity-80 mt-1">
                🥉 季军 3RD
              </span>
            </div>
          </div>
        </div>

        {/* 底部同步战队总积分条（与老师大屏底部战队积分完全一致） */}
        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-black text-gray-600 flex items-center gap-1.5">
            <span>🏆 战队总积分排行：</span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {teamScores.map((t, idx) => (
              <span
                key={t.teamId}
                className={`px-3 py-1 rounded-full font-black text-xs flex items-center gap-1 ${t.badgeBg}`}
              >
                <span>{idx === 0 ? '👑' : `#${idx + 1}`}</span>
                <span>{t.name}</span>
                <span>{t.score} 分</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 保护隐私的个人成绩单 (Personal Private Scorecard) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-gray-100 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 p-1 shadow-md">
              <div className="w-full h-full bg-white rounded-xl p-1 flex items-center justify-center">
                <img src={avatar.src} alt="" className="w-full h-full object-contain" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-gray-900">{studentName}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-pink-100 text-pink-700">
                  {PRESET_TEAMS[teamId]?.name || '蓝队勇士'}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-bold mt-0.5">
                个人专属成绩单 · 保护隐私仅自己可见
              </p>
            </div>
          </div>

          {/* 错题自查入口按钮：动态展示真实错题数 */}
          <div>
            <button
              onClick={() => setIsMistakeModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-purple-200 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                📖 查看我的错题自查卡 ({actualMistakes.length} 题)
              </span>
            </button>
          </div>
        </div>

        {/* 4 宫格个人成绩统计指标 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. 个人得分 */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 text-center space-y-1">
            <span className="text-xs font-black text-pink-600 uppercase tracking-wider">
              你的总得分
            </span>
            <div className="text-2xl sm:text-3xl font-black text-pink-700">
              {actualScore} <span className="text-xs font-normal">分</span>
            </div>
            <p className="text-[11px] text-pink-500/80 font-bold">已计入战队总分</p>
          </div>

          {/* 2. 全班排名 */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 text-center space-y-1">
            <span className="text-xs font-black text-amber-700 uppercase tracking-wider">
              全班个人排名
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-800">
              第 {myRank} <span className="text-xs font-normal">名</span>
            </div>
            <p className="text-[11px] text-amber-600/80 font-bold">
              全班 {totalParticipants} 位同侪
            </p>
          </div>

          {/* 3. 答对题数 */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-center space-y-1">
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">
              答对题数
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 flex items-center justify-center gap-1">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>{actualCorrect} 题</span>
            </div>
            <p className="text-[11px] text-emerald-600/80 font-bold">
              准确率 {accuracy}%
            </p>
          </div>

          {/* 4. 答错题数 */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200 text-center space-y-1">
            <span className="text-xs font-black text-gray-600 uppercase tracking-wider">
              错题自查
            </span>
            <div className="text-2xl sm:text-3xl font-black text-gray-800 flex items-center justify-center gap-1">
              <XCircle className="w-5 h-5 text-rose-500" />
              <span>{actualMistakes.length} 题</span>
            </div>
            <p className="text-[11px] text-gray-500 font-bold">
              {actualMistakes.length === 0 ? '满分大满贯！' : '点右上角查看错题'}
            </p>
          </div>
        </div>
      </div>

      {/* 底部流转操作栏 */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-black text-sm shadow-md shadow-pink-200 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>再战一局 (重新开始)</span>
        </button>
        <button
          onClick={onGoHome}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-gray-100 text-gray-800 font-black text-sm border-2 border-gray-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Home className="w-4 h-4 text-gray-500" />
          <span>返回游戏大厅</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 个人错题自查卡弹窗：精准展示实际做错的题目 */}
      {/* ========================================================================= */}
      {isMistakeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div
            className="relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl border-4 border-purple-200 overflow-hidden my-auto max-h-[88vh] flex flex-col transform transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 弹窗头部 */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
                  📖
                </div>
                <div>
                  <h3 className="text-xl font-black">我的个人错题自查卡</h3>
                  <p className="text-xs text-white/80 font-bold">
                    共错 {actualMistakes.length} 题 · 标红我的选择 vs 标绿标准正解
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMistakeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 弹窗错题内容滚动区 */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {actualMistakes.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="text-6xl animate-bounce">🎉</div>
                  <h4 className="text-xl font-black text-gray-800">
                    太厉害了！本局全部答对，零错题！
                  </h4>
                  <p className="text-xs font-bold text-gray-500">
                    你已经掌握了全部题目知识点，继续保持！
                  </p>
                </div>
              ) : (
                actualMistakes.map((mistake, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-xl w-fit">
                      <span>第 0{mistake.questionNumber} 题 · 错题复习</span>
                    </div>

                    <h4 className="text-base font-black text-gray-900 leading-snug">
                      {mistake.prompt}
                    </h4>

                    {/* 错项与正解对照 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {/* 我的选择（标红） */}
                      <div className="p-3 rounded-xl bg-rose-50 border-2 border-rose-200 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-black text-rose-700">
                          <X className="w-4 h-4 text-rose-600 stroke-[3]" />
                          <span>我的当时选择 (失误)</span>
                        </div>
                        <p className="font-bold text-rose-900 text-sm pl-5">
                          {mistake.studentAnswer}
                        </p>
                      </div>

                      {/* 正确答案（标绿） */}
                      <div className="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-200 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-black text-emerald-700">
                          <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                          <span>标准正确答案 (正解)</span>
                        </div>
                        <p className="font-bold text-emerald-900 text-sm pl-5">
                          {mistake.correctAnswer}
                        </p>
                      </div>
                    </div>

                    {/* 锦囊解析 */}
                    {mistake.explanation && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900 leading-relaxed">
                        <span className="font-black text-amber-800">💡 知识锦囊解析：</span>
                        {mistake.explanation}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* 弹窗底部操作 */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button
                onClick={() => setIsMistakeModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs transition-colors cursor-pointer shadow-sm"
              >
                自查完毕，关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 战队积分与领奖台排名规则说明弹窗 */}
      {/* ========================================================================= */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border-2 border-amber-300 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <h4 className="text-lg font-black text-gray-900">
                  冠亚季军是如何计算的？
                </h4>
              </div>
              <button
                onClick={() => setIsRuleModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-gray-600 leading-relaxed">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                <p className="font-black text-amber-900 mb-1">📊 1. 战队积分累加法则：</p>
                每个队伍的最终总积分 = 该队伍中所有同学答对题目的得分之和。
              </div>

              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-medium">
                <p className="font-black text-blue-900 mb-1">🎮 2. 你的贡献直接影响排名：</p>
                你在答题对战中获得的个人总分（如 {actualScore} 分），已完全累加至你所属的战队总积分中！
              </div>

              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-medium">
                <p className="font-black text-purple-900 mb-1">🥇 3. 领奖台席位裁决：</p>
                比赛结束时，系统将所有战队总积分从高到低进行绝对排序：
                <ul className="list-disc pl-5 mt-1 space-y-0.5 font-bold">
                  <li>总分最高队 ➔ 🏆 冠军金台 (1st)</li>
                  <li>总分次高队 ➔ 🥈 亚军银台 (2nd)</li>
                  <li>总分第三队 ➔ 🥉 季军铜台 (3rd)</li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsRuleModalOpen(false)}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs transition-colors cursor-pointer"
              >
                明白啦！
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
