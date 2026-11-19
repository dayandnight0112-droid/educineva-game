import React, { useState } from 'react';
import { STUDENT_GAMES } from '../mockData';
import { StudentGameCard } from '../types';
import { Play, Flame, Sparkles, Award, Users, Swords, ChevronRight } from 'lucide-react';

interface GameGalleryProps {
  onJoinRoomClick: () => void;
  onPreviewGame?: (game: StudentGameCard) => void;
}

export const GameGallery: React.FC<GameGalleryProps> = ({ onJoinRoomClick, onPreviewGame }) => {
  const [filter, setFilter] = useState<'all' | 'battle' | 'puzzle' | 'action'>('all');
  const [activeTrialGame, setActiveTrialGame] = useState<StudentGameCard | null>(null);

  const filteredGames = STUDENT_GAMES.filter((g) => {
    if (filter === 'all') return true;
    return g.category === filter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-8">
      {/* 顶部醒目 Banner 欢迎区 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 p-6 sm:p-10 text-white shadow-xl shadow-pink-200/50">
        <div className="absolute -right-8 -bottom-10 w-48 h-48 sm:w-64 sm:h-64 opacity-25 rounded-full bg-white blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>课堂互动 · 趣味对战 · 知识升级</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-sm">
            欢迎来到 Educineva 游戏乐园！🎉
          </h1>
          <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
            输入老师给的 <span className="font-extrabold text-amber-300 underline underline-offset-4">6 位房间 PIN 码</span> 即可火速组队开战！先挑一款喜欢的游戏试玩热身吧！
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onJoinRoomClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-pink-600 font-black text-sm sm:text-base shadow-md hover:bg-amber-50 transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>🎮 输入 PIN 码加入</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 分类快捷标签栏 */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer shadow-xs ${
              filter === 'all'
                ? 'bg-pink-600 text-white shadow-pink-200 shadow-md scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
            }`}
          >
            🌟 全部游戏
          </button>
          <button
            onClick={() => setFilter('battle')}
            className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
              filter === 'battle'
                ? 'bg-blue-600 text-white shadow-blue-200 shadow-md scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
            }`}
          >
            <Swords className="w-4 h-4" />
            阵营双队对决
          </button>
          <button
            onClick={() => setFilter('puzzle')}
            className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
              filter === 'puzzle'
                ? 'bg-purple-600 text-white shadow-purple-200 shadow-md scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            益智脑力消除
          </button>
          <button
            onClick={() => setFilter('action')}
            className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
              filter === 'action'
                ? 'bg-amber-500 text-white shadow-amber-200 shadow-md scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
            }`}
          >
            <Flame className="w-4 h-4" />
            太空与体育竞技
          </button>
        </div>
        <span className="text-xs font-bold text-gray-400 hidden sm:inline-block">
          共 {filteredGames.length} 款趣味游戏
        </span>
      </div>

      {/* 游戏卡片画廊网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group relative bg-white rounded-3xl p-4 sm:p-5 border-2 border-gray-100 shadow-md hover:shadow-2xl hover:border-pink-300 transition-all duration-300 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1.5"
          >
            {/* 顶部热门角标 */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black bg-pink-50 text-pink-600 border border-pink-200">
                {game.badgeText}
              </span>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">
                {game.categoryLabel}
              </span>
            </div>

            {/* 封面图片预览区 */}
            <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-100 to-slate-200 mb-4 flex items-center justify-center p-3">
              <img
                src={game.coverImage}
                alt={game.name}
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                loading="lazy"
                onError={(e) => {
                  // 容错 fallback
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                  🎮 点击下方试玩
                </span>
              </div>
            </div>

            {/* 游戏名称与文案 */}
            <div className="space-y-1.5 mb-5 flex-1">
              <h3 className="text-lg sm:text-xl font-black text-gray-800 group-hover:text-pink-600 transition-colors">
                {game.name}
              </h3>
              <p className="text-xs text-gray-400 font-semibold">{game.englishName}</p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium line-clamp-2">
                {game.description}
              </p>
            </div>

            {/* 底部操作区 */}
            <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTrialGame(game);
                  if (onPreviewGame) onPreviewGame(game);
                }}
                className="flex-1 py-2.5 px-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-amber-200 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>单人试玩</span>
              </button>
              <button
                onClick={onJoinRoomClick}
                className="flex-1 py-2.5 px-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm shadow-pink-200 transition-all cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>课堂对战</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 单人试玩说明引导轻弹窗 */}
      {activeTrialGame && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border-2 border-amber-300 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <h4 className="text-lg font-black text-gray-800">{activeTrialGame.name} - 试玩须知</h4>
              </div>
              <button
                onClick={() => setActiveTrialGame(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="w-full h-36 rounded-2xl bg-gradient-to-tr from-amber-50 to-pink-50 flex items-center justify-center p-3 border border-amber-100">
              <img src={activeTrialGame.coverImage} alt="" className="h-full object-contain" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              {activeTrialGame.description}
            </p>
            <div className="bg-blue-50 text-blue-800 p-3 rounded-2xl text-xs font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span>老师发起课堂对战时，输入 6 位 PIN 码即可与全班同学组队联机！</span>
            </div>
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setActiveTrialGame(null);
                  onJoinRoomClick();
                }}
                className="flex-1 py-3 rounded-2xl bg-pink-500 text-white font-black text-sm hover:bg-pink-600 shadow-md shadow-pink-200 transition-colors cursor-pointer"
              >
                🚀 立即输入 PIN 码
              </button>
              <button
                onClick={() => setActiveTrialGame(null)}
                className="px-5 py-3 rounded-2xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                继续逛逛
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
