import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GameCard } from './components/GameCard';
import { GameDrawer } from './components/GameDrawer';
import { RoomCreatedModal, ACTIVE_ROOM_STORAGE_KEY } from './components/RoomCreatedModal';
import { QuestionManagement, LOCAL_STORAGE_PAPERS_KEY } from './components/QuestionManagement';
import { Search, Info, ExternalLink, Gamepad2, Tv } from 'lucide-react';
import { INITIAL_GAMES, QUESTION_PAPERS } from './mock/data';
import { Game, GameCategory, RoomConfig, QuestionPaper } from './types';
import { StudentApp } from './student/StudentApp';
import { TeacherScreenApp } from './screen/TeacherScreenApp';

export const App: React.FC = () => {
  // 检查是否从 URL 参数指定进入学生端或大屏展示端
  const [activePortal, setActivePortal] = useState<'teacher' | 'student' | 'screen'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('portal') === 'student') return 'student';
      if (params.get('portal') === 'screen') return 'screen';
    }
    return 'teacher';
  });

  // 全局共享题库试卷状态（教师在「题目管理」修改后，「游戏设定抽屉」实时同步）
  const [papers, setPapers] = useState<QuestionPaper[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PAPERS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load papers from localStorage:', e);
    }
    return QUESTION_PAPERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PAPERS_KEY, JSON.stringify(papers));
    } catch (e) {
      console.error('Failed to save papers to localStorage:', e);
    }
  }, [papers]);

  // Room Creation Success Modal
  const [createdRoomConfig, setCreatedRoomConfig] = useState<RoomConfig | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [launchedRoomInfo, setLaunchedRoomInfo] = useState<{ roomId: string; pin: string } | null>(
    () => {
      try {
        const saved = localStorage.getItem(ACTIVE_ROOM_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.roomId && parsed?.pin) {
            return { roomId: parsed.roomId, pin: parsed.pin };
          }
        }
      } catch {
        // ignore
      }
      return null;
    }
  );

  // Navigation: 'games' | 'question' (默认进入游戏管理页面方便直接选游戏开房，也可随时切题目管理)
  const [currentNav, setCurrentNav] = useState<'games' | 'question'>('games');

  // Games category filter: 'in-class' (课中游戏) | 'after-class' (课外游戏)
  const [activeCategory, setActiveCategory] = useState<GameCategory>('in-class');
  const [searchQuery, setSearchQuery] = useState('');

  // Drawer & Selection state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 如果处于学生端，则直接渲染完全隔离的学生端门户（所有 Hooks 必须在此 return 之前调用）
  if (activePortal === 'student') {
    return <StudentApp onBackToTeacherAdmin={() => setActivePortal('teacher')} />;
  }

  // 如果处于老师大屏端，则直接渲染大屏全屏展示门户
  if (activePortal === 'screen') {
    return (
      <TeacherScreenApp
        initialRoomId={launchedRoomInfo?.roomId}
        initialPin={launchedRoomInfo?.pin}
        onBackToAdmin={() => setActivePortal('teacher')}
      />
    );
  }

  // Filter games based on category and search
  const filteredGames = INITIAL_GAMES.filter((game) => {
    const matchesCategory = game.category === activeCategory;
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleCreateRoom = (config: RoomConfig) => {
    setCreatedRoomConfig(config);
    setIsDrawerOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans">
      {/* Global Left Sidebar */}
      <Sidebar currentTab={currentNav} onTabChange={setCurrentNav} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* 顶部多端快捷切换提示条 */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white px-6 py-2.5 flex flex-wrap items-center justify-between text-xs sm:text-sm font-bold shadow-sm gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base">🚀</span>
            <span>「Educineva 互动教学平台」已就绪：支持教师管理后台、学生手柄端与老师大屏展示端三端协同。</span>
            {launchedRoomInfo?.pin && (
              <span className="bg-emerald-500/90 text-white px-2.5 py-0.5 rounded-full text-xs font-mono font-black shadow-2xs">
                当前房间 PIN: {launchedRoomInfo.pin}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            {/* 老师大屏控制与展示端入口 */}
            <button
              onClick={() => setActivePortal('screen')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black shadow-xs transition-transform transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>进入【老师大屏控制与展示端】</span>
            </button>
            <a
              href={`${
                typeof window !== 'undefined' && window.location.protocol === 'file:'
                  ? './老师大屏-直接双击打开.html'
                  : './screen.html'
              }${
                launchedRoomInfo?.roomId
                  ? `?roomId=${encodeURIComponent(launchedRoomInfo.roomId)}&pin=${encodeURIComponent(launchedRoomInfo.pin)}`
                  : ''
              }`}
              target="_blank"
              rel="noreferrer"
              className="bg-black/25 hover:bg-black/35 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition"
              title="在新标签页中打开老师大屏"
            >
              <span>大屏新窗口</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* 学生端入口 */}
            <button
              onClick={() => setActivePortal('student')}
              className="bg-white text-pink-600 hover:bg-pink-50 px-3.5 py-1 rounded-full text-xs font-black shadow-xs transition-transform transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>进入【学生端】</span>
            </button>
            <a
              href={
                typeof window !== 'undefined' && window.location.protocol === 'file:'
                  ? './学生端-直接双击打开.html'
                  : './student.html'
              }
              target="_blank"
              rel="noreferrer"
              className="bg-black/25 hover:bg-black/35 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition"
              title="在新标签页中打开学生端"
            >
              <span>学生新窗口</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-[1480px] w-full mx-auto p-6 md:p-8 flex-1 flex flex-col">
          {/* Header */}
          <Header
            title={currentNav === 'games' ? '游戏管理' : '题目管理'}
            subtitle={
              currentNav === 'games'
                ? '选择游戏，配置课堂活动或课外练习'
                : '建立题目文件，供课中游戏与课外练习使用'
            }
          />

          {/* View Switch */}
          {currentNav === 'games' ? (
            <div className="space-y-6 flex-1 flex flex-col">
              {/* Controls Bar: Category Tabs & Search Bar (Exact Match to 1.png) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* [课中游戏] / [课外游戏] Tabs */}
                <div className="inline-flex p-1 bg-white border border-gray-200/80 rounded-2xl shadow-2xs">
                  <button
                    onClick={() => setActiveCategory('in-class')}
                    className={`px-7 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                      activeCategory === 'in-class'
                        ? 'bg-[#e60067] text-white shadow-sm shadow-pink-200'
                        : 'text-gray-600 hover:text-gray-900 font-medium'
                    }`}
                  >
                    课中游戏
                  </button>
                  <button
                    onClick={() => setActiveCategory('after-class')}
                    className={`px-7 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                      activeCategory === 'after-class'
                        ? 'bg-[#e60067] text-white shadow-sm shadow-pink-200'
                        : 'text-gray-600 hover:text-gray-900 font-medium'
                    }`}
                  >
                    课外游戏
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索游戏"
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-2xl text-sm text-gray-800 outline-none transition shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                    >
                      清空
                    </button>
                  )}
                </div>
              </div>

              {/* Section Sub-heading (Exact Match to 1.png) */}
              <div className="flex items-center gap-2 pt-1">
                <div className="w-1.5 h-4.5 bg-[#e60067] rounded-full" />
                <h2 className="text-sm font-medium text-gray-700">
                  选择游戏后，设置房间、题目与队伍
                </h2>
              </div>

              {/* 8 Interactive Games Grid (Exact Match to 1.png: 4 columns x 2 rows) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isSelected={selectedGame?.id === game.id && isDrawerOpen}
                    onSelect={handleSelectGame}
                  />
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="py-16 text-center bg-white rounded-3xl border border-gray-200/80 my-4 shadow-2xs">
                  <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-3 text-[#e60067]">
                    <Search className="w-8 h-8" />
                  </div>
                  <p className="text-base font-bold text-gray-700">
                    未找到名称匹配的游戏
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    请尝试搜索其他关键字，或切换到「课中游戏」标签
                  </p>
                </div>
              )}

              {/* Footer Note (Exact Match to 1.png) */}
              <div className="mt-auto pt-6 text-xs text-gray-400 flex items-center gap-1.5 select-none">
                <Info className="w-4 h-4 text-gray-400" />
                <span>点击游戏卡片，打开该游戏的设定窗口</span>
              </div>
            </div>
          ) : (
            <QuestionManagement papers={papers} onUpdatePapers={setPapers} />
          )}
        </div>
      </main>

      {/* Right Drawer Configuration Panel */}
      <GameDrawer
        game={selectedGame}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onCreateRoom={handleCreateRoom}
        papers={papers}
        onJumpToQuestions={() => {
          setIsDrawerOpen(false);
          setCurrentNav('question');
        }}
      />

      {/* Room Created Launch Modal */}
      <RoomCreatedModal
        game={selectedGame}
        roomConfig={createdRoomConfig}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        papers={papers}
        onRoomCreated={(info) => {
          setLaunchedRoomInfo(info);
        }}
        onLaunchScreen={(info) => {
          setLaunchedRoomInfo(info);
          setIsSuccessModalOpen(false);
          setActivePortal('screen');
        }}
      />
    </div>
  );
};
