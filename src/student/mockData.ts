import { StudentGameCard, CartoonAvatar, StudentSettlementResult } from './types';

// 8 款充满童趣的卡通萌趣头像
export const CARTOON_AVATARS: CartoonAvatar[] = [
  { id: 'avatar_bear', name: '机智小熊', src: './assets/games/char_a.png', bgColor: 'bg-amber-100' },
  { id: 'avatar_bunny', name: '元气灵兔', src: './assets/games/char_b.png', bgColor: 'bg-pink-100' },
  { id: 'avatar_astronaut', name: '星空领航员', src: './assets/games/space.png', bgColor: 'bg-indigo-100' },
  { id: 'avatar_racer', name: '极速小赛手', src: './assets/games/racing.png', bgColor: 'bg-cyan-100' },
  { id: 'avatar_warrior', name: '拔河先锋', src: './assets/games/tug-of-war.png', bgColor: 'bg-rose-100' },
  { id: 'avatar_knight', name: '城堡守护者', src: './assets/games/castle.png', bgColor: 'bg-emerald-100' },
  { id: 'avatar_mvp', name: '球场神射手', src: './assets/games/basketball.png', bgColor: 'bg-orange-100' },
  { id: 'avatar_scholar', name: '智多星达人', src: './assets/games/quiz-quest.png', bgColor: 'bg-purple-100' },
];

// 学生端游戏大厅画廊卡片数据
export const STUDENT_GAMES: StudentGameCard[] = [
  {
    id: 'game_racing',
    name: '极速赛车挑战',
    englishName: 'Turbo Math Racer',
    tag: '敏捷答题',
    category: 'battle',
    categoryLabel: '双队竞速',
    coverImage: './assets/games/racing.png',
    description: '答对题目立即氮气加速！与小伙伴组队，在环形赛道上漂移竞速吧！',
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-500 to-indigo-600',
    badgeText: '🔥 最受欢迎',
    isPopular: true,
  },
  {
    id: 'game_tug_of_war',
    name: '力拔千钧拔河赛',
    englishName: 'Tug of War Clash',
    tag: '团队合作',
    category: 'battle',
    categoryLabel: '阵营对决',
    coverImage: './assets/games/tug-of-war.png',
    description: '全班分为红蓝两队！答题越快越准，绳索就朝你的队伍拉近一分！',
    accentColor: '#ef4444',
    bgGradient: 'from-rose-500 to-red-600',
    badgeText: '⚡ 班级必玩',
    isPopular: true,
  },
  {
    id: 'game_quiz_quest',
    name: '知识大闯关 (Match Shift)',
    englishName: 'Quiz Quest Mania',
    tag: '益智消除',
    category: 'puzzle',
    categoryLabel: '益智消除',
    coverImage: './assets/games/quiz-quest.png',
    description: '趣味连击与知识方块消除！用智慧冲破迷雾关卡，解锁神秘知识宝箱！',
    accentColor: '#8b5cf6',
    bgGradient: 'from-purple-500 to-violet-600',
    badgeText: '⭐ 脑力激发',
    isPopular: true,
  },
  {
    id: 'game_space',
    name: '星际探索飞船',
    englishName: 'Galaxy Explorer',
    tag: '科学探秘',
    category: 'action',
    categoryLabel: '太空冒险',
    coverImage: './assets/games/space.png',
    description: '收集宇宙能量块！回答科学与常识问题，为火箭注入超光速推进燃料！',
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-500 to-teal-600',
    badgeText: '🚀 科幻冒险',
    isPopular: false,
  },
  {
    id: 'game_basketball',
    name: '灌篮高手对决',
    englishName: 'Slam Dunk Quiz',
    tag: '运动竞技',
    category: 'action',
    categoryLabel: '运动竞技',
    coverImage: './assets/games/basketball.png',
    description: '三分神射，百步穿杨！选择正确答案，精准空心入网引爆全场欢呼！',
    accentColor: '#f97316',
    bgGradient: 'from-orange-500 to-amber-600',
    badgeText: '🏀 燃爆全场',
    isPopular: false,
  },
  {
    id: 'game_castle',
    name: '王国保卫战',
    englishName: 'Kingdom Defender',
    tag: '策略防御',
    category: 'puzzle',
    categoryLabel: '策略闯关',
    coverImage: './assets/games/castle.png',
    description: '用知识筑造坚不可摧的魔法城墙！抵御知识怪兽的进攻，保卫王国荣耀！',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-500 to-teal-600',
    badgeText: '🛡️ 守护骑士',
    isPopular: false,
  },
];

// 5 道离线调试用趣味对战题目（脱敏下发格式）
export const MOCK_QUIZ_QUESTIONS = [
  {
    id: 1,
    number: 1,
    total: 5,
    prompt: '计算趣味题：3 + 5 = ?',
    type: 'single',
    points: 100,
    timeLimit: 15,
    category: '趣味数学',
    options: [
      { key: 'A', text: '6', color: 'red' },
      { key: 'B', text: '7', color: 'blue' },
      { key: 'C', text: '8', color: 'yellow' },
      { key: 'D', text: '9', color: 'green' },
    ],
    // 离线单机评测用参考索引（实际网络环境下由后端判定下发）
    correctOptionIndex: 2, // 'C'
    explanation: '3 加上 5 等于 8，太棒了！',
  },
  {
    id: 2,
    number: 2,
    total: 5,
    prompt: '自然科学常识：太阳系中体积最大的行星是哪一颗？',
    type: 'single',
    points: 100,
    timeLimit: 15,
    category: '太空探索',
    options: [
      { key: 'A', text: '地球', color: 'red' },
      { key: 'B', text: '火星', color: 'blue' },
      { key: 'C', text: '木星', color: 'yellow' },
      { key: 'D', text: '土星', color: 'green' },
    ],
    correctOptionIndex: 2, // 'C'
    explanation: '木星是太阳系中最大的行星，质量是所有其他行星总和的2.5倍！',
  },
  {
    id: 3,
    number: 3,
    total: 5,
    prompt: '四季探索：接天莲叶无穷碧，映日荷花别样红。荷花盛开在哪一个季节？',
    type: 'single',
    points: 100,
    timeLimit: 15,
    category: '诗词常识',
    options: [
      { key: 'A', text: '春季', color: 'red' },
      { key: 'B', text: '夏季', color: 'blue' },
      { key: 'C', text: '秋季', color: 'yellow' },
      { key: 'D', text: '冬季', color: 'green' },
    ],
    correctOptionIndex: 1, // 'B'
    explanation: '荷花在炎热的夏季盛开，是夏天的代表花卉。',
  },
  {
    id: 4,
    number: 4,
    total: 5,
    prompt: '动物王国：在我国传统文化中，额头有“王”字纹样、被尊称为百兽之王的是？',
    type: 'single',
    points: 100,
    timeLimit: 15,
    category: '自然生物',
    options: [
      { key: 'A', text: '东北虎 (老虎)', color: 'red' },
      { key: 'B', text: '非洲雄狮', color: 'blue' },
      { key: 'C', text: '森林大象', color: 'yellow' },
      { key: 'D', text: '敏捷金钱豹', color: 'green' },
    ],
    correctOptionIndex: 0, // 'A'
    explanation: '老虎额头上天然有类似“王”字的斑纹，被称为百兽之王。',
  },
  {
    id: 5,
    number: 5,
    total: 5,
    prompt: '地理常识：天安门广场与万里长城所在的中国首都是哪座历史名城？',
    type: 'single',
    points: 100,
    timeLimit: 15,
    category: '人文地理',
    options: [
      { key: 'A', text: '上海', color: 'red' },
      { key: 'B', text: '广州', color: 'blue' },
      { key: 'C', text: '北京', color: 'yellow' },
      { key: 'D', text: '西安', color: 'green' },
    ],
    correctOptionIndex: 2, // 'C'
    explanation: '北京是中华人民共和国的首都，拥有悠久灿烂的历史文化！',
  },
];

// 离线调试用的预设队伍配置
export const PRESET_TEAMS: Record<string, {
  id: string;
  name: string;
  shortName: string;
  slogan: string;
  colorHex: string;
  gradientBg: string;
  borderClass: string;
  textClass: string;
  badgeBg: string;
  icon: string;
}> = {
  blue: {
    id: 'blue',
    name: '🟦 蓝队勇士',
    shortName: '蓝队',
    slogan: '乘风破浪 · 智勇双全！',
    colorHex: '#3b82f6',
    gradientBg: 'from-blue-600 via-indigo-600 to-sky-500',
    borderClass: 'border-blue-400',
    textClass: 'text-blue-600',
    badgeBg: 'bg-blue-100 text-blue-800',
    icon: '🛡️',
  },
  red: {
    id: 'red',
    name: '🟥 红队先锋',
    shortName: '红队',
    slogan: '烈焰冲锋 · 所向披靡！',
    colorHex: '#ef4444',
    gradientBg: 'from-rose-600 via-red-600 to-amber-500',
    borderClass: 'border-rose-400',
    textClass: 'text-rose-600',
    badgeBg: 'bg-rose-100 text-rose-800',
    icon: '⚔️',
  },
  yellow: {
    id: 'yellow',
    name: '🟨 黄队闪电',
    shortName: '黄队',
    slogan: '疾风迅雷 · 势不可挡！',
    colorHex: '#eab308',
    gradientBg: 'from-amber-500 via-yellow-500 to-orange-500',
    borderClass: 'border-amber-400',
    textClass: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800',
    icon: '⚡',
  },
  green: {
    id: 'green',
    name: '🟩 绿队神鹰',
    shortName: '绿队',
    slogan: '敏锐如鹰 · 破风翱翔！',
    colorHex: '#10b981',
    gradientBg: 'from-emerald-600 via-teal-600 to-green-500',
    borderClass: 'border-emerald-400',
    textClass: 'text-emerald-600',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    icon: '🦅',
  }
};

// 预设房间已加入的小伙伴花名册
export const MOCK_TEAMMATES = [
  { id: 'tm_1', name: '机智天天', avatar: './assets/games/char_a.png', teamId: 'blue', isReady: true },
  { id: 'tm_2', name: '元气阳阳', avatar: './assets/games/char_b.png', teamId: 'blue', isReady: true },
  { id: 'tm_3', name: '星空果果', avatar: './assets/games/space.png', teamId: 'blue', isReady: true },
  { id: 'tm_4', name: '极速浩浩', avatar: './assets/games/racing.png', teamId: 'blue', isReady: true },
  { id: 'tm_5', name: '拔河小雨', avatar: './assets/games/tug-of-war.png', teamId: 'blue', isReady: true },
  { id: 'tm_6', name: '学霸小涵', avatar: './assets/games/quiz-quest.png', teamId: 'red', isReady: true },
  { id: 'tm_7', name: '城堡朵朵', avatar: './assets/games/castle.png', teamId: 'red', isReady: true },
  { id: 'tm_8', name: '神射小宇', avatar: './assets/games/basketball.png', teamId: 'red', isReady: true },
  { id: 'tm_9', name: '敏捷小可', avatar: './assets/games/char_a.png', teamId: 'red', isReady: true },
  { id: 'tm_10', name: '飞跃乐乐', avatar: './assets/games/racing.png', teamId: 'red', isReady: true },
  { id: 'tm_11', name: '探索小峰', avatar: './assets/games/space.png', teamId: 'blue', isReady: true },
  { id: 'tm_12', name: '智囊小薇', avatar: './assets/games/quiz-quest.png', teamId: 'red', isReady: true },
];

// 离线调试用的预设结算与错题模拟数据
export const MOCK_SETTLEMENT_DATA: StudentSettlementResult = {
  totalScore: 480,
  rank: 2,
  totalParticipants: 28,
  correctCount: 4,
  wrongCount: 1,
  winningTeamName: '🟦 蓝队勇士',
  winningTeamColor: '#3b82f6',
  podium: [
    { rank: 1, teamName: '蓝队先锋', score: 1250, members: ['小明', '天天', '涵涵'] },
    { rank: 2, teamName: '红队火龙', score: 980, members: ['你', '果果', '阳阳'] },
    { rank: 3, teamName: '绿队神鹰', score: 820, members: ['浩浩', '朵朵', '小雨'] },
  ],
  mistakes: [
    {
      questionNumber: 3,
      prompt: '下面哪一个图形的内角和是 360 度？',
      studentAnswer: 'A. 三角形',
      correctAnswer: 'B. 长方形',
      explanation: '三角形内角和是 180 度，长方形有4个直角，4 × 90° = 360 度。',
    },
  ],
};
