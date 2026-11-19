import {
  ScreenQuizQuestion,
  ScreenStudent,
  ScreenSettings,
  ScreenTeam,
  QuestionDistribution,
  OptionKey,
} from './types';

// 老师大屏全局默认设置
export const DEFAULT_SCREEN_SETTINGS: ScreenSettings = {
  pin: '686868',
  roomName: '一年级趣味科学与数学大挑战',
  isRoomLocked: false,
  teamMode: 2, // 默认 2 队 (双阵营对战)
  durationTimer1: 15, // 倒计时 1：审题时长（秒）
  durationTimer2: 15, // 倒计时 2：抢答作答时长（秒）
  autoAdvanceToOptions: true,
  soundEnabled: true,
};

// 预设战队信息 (完整支持 2 队、3 队、4 队)
export const INITIAL_TEAMS: Record<'blue' | 'red' | 'yellow' | 'green', ScreenTeam> = {
  blue: {
    id: 'blue',
    name: '🟦 蓝队勇士',
    shortName: '蓝队勇士',
    slogan: '乘风破浪 · 智勇双全！',
    colorHex: '#3b82f6',
    accentColor: '#60a5fa',
    bgGradient: 'from-blue-600 via-indigo-600 to-sky-500',
    borderColor: 'border-blue-400',
    score: 1850,
    membersCount: 14,
    icon: '🛡️',
  },
  red: {
    id: 'red',
    name: '🟥 红队先锋',
    shortName: '红队先锋',
    slogan: '烈焰冲锋 · 所向披靡！',
    colorHex: '#ef4444',
    accentColor: '#f87171',
    bgGradient: 'from-rose-600 via-red-600 to-amber-500',
    borderColor: 'border-rose-400',
    score: 1720,
    membersCount: 14,
    icon: '⚔️',
  },
  yellow: {
    id: 'yellow',
    name: '🟨 黄队闪电',
    shortName: '黄队闪电',
    slogan: '疾风迅雷 · 势不可挡！',
    colorHex: '#eab308',
    accentColor: '#facc15',
    bgGradient: 'from-amber-500 via-yellow-500 to-orange-500',
    borderColor: 'border-yellow-400',
    score: 1680,
    membersCount: 0,
    icon: '⚡',
  },
  green: {
    id: 'green',
    name: '🟩 绿队神鹰',
    shortName: '绿队神鹰',
    slogan: '敏锐如鹰 · 破风翱翔！',
    colorHex: '#10b981',
    accentColor: '#34d399',
    bgGradient: 'from-emerald-600 via-teal-600 to-green-500',
    borderColor: 'border-emerald-400',
    score: 1650,
    membersCount: 0,
    icon: '🦅',
  },
};

// 5 道符合 Kahoot 4 色规范的高清大屏对战题目
export const MOCK_SCREEN_QUESTIONS: ScreenQuizQuestion[] = [
  {
    id: 1,
    number: 1,
    total: 5,
    prompt: '计算趣味题：3 + 5 = ?',
    category: '趣味数学',
    type: 'single',
    points: 100,
    options: [
      {
        key: 'A',
        text: '6',
        color: 'red',
        symbol: '▲',
        bgClass: 'bg-rose-500 hover:bg-rose-600',
        borderClass: 'border-rose-300',
        badgeBg: 'bg-rose-600 text-white',
        glowColor: 'rgba(244, 63, 94, 0.4)',
      },
      {
        key: 'B',
        text: '7',
        color: 'blue',
        symbol: '◆',
        bgClass: 'bg-blue-500 hover:bg-blue-600',
        borderClass: 'border-blue-300',
        badgeBg: 'bg-blue-600 text-white',
        glowColor: 'rgba(59, 130, 246, 0.4)',
      },
      {
        key: 'C',
        text: '8',
        color: 'yellow',
        symbol: '●',
        bgClass: 'bg-amber-400 hover:bg-amber-500',
        borderClass: 'border-amber-200',
        badgeBg: 'bg-amber-500 text-slate-900',
        glowColor: 'rgba(245, 158, 11, 0.4)',
      },
      {
        key: 'D',
        text: '9',
        color: 'green',
        symbol: '■',
        bgClass: 'bg-emerald-500 hover:bg-emerald-600',
        borderClass: 'border-emerald-300',
        badgeBg: 'bg-emerald-600 text-white',
        glowColor: 'rgba(16, 185, 129, 0.4)',
      },
    ],
    correctOptionIndex: 2, // 'C' -> 8
    explanation: '3 加上 5 等于 8。数一数手指数目，或者用加法口诀即可轻松得出！',
  },
  {
    id: 2,
    number: 2,
    total: 5,
    prompt: '自然科学常识：太阳系中体积最大的行星是哪一颗？',
    category: '宇宙探秘',
    type: 'single',
    points: 100,
    options: [
      {
        key: 'A',
        text: '地球 (Earth)',
        color: 'red',
        symbol: '▲',
        bgClass: 'bg-rose-500 hover:bg-rose-600',
        borderClass: 'border-rose-300',
        badgeBg: 'bg-rose-600 text-white',
        glowColor: 'rgba(244, 63, 94, 0.4)',
      },
      {
        key: 'B',
        text: '火星 (Mars)',
        color: 'blue',
        symbol: '◆',
        bgClass: 'bg-blue-500 hover:bg-blue-600',
        borderClass: 'border-blue-300',
        badgeBg: 'bg-blue-600 text-white',
        glowColor: 'rgba(59, 130, 246, 0.4)',
      },
      {
        key: 'C',
        text: '木星 (Jupiter)',
        color: 'yellow',
        symbol: '●',
        bgClass: 'bg-amber-400 hover:bg-amber-500',
        borderClass: 'border-amber-200',
        badgeBg: 'bg-amber-500 text-slate-900',
        glowColor: 'rgba(245, 158, 11, 0.4)',
      },
      {
        key: 'D',
        text: '土星 (Saturn)',
        color: 'green',
        symbol: '■',
        bgClass: 'bg-emerald-500 hover:bg-emerald-600',
        borderClass: 'border-emerald-300',
        badgeBg: 'bg-emerald-600 text-white',
        glowColor: 'rgba(16, 185, 129, 0.4)',
      },
    ],
    correctOptionIndex: 2, // 'C' -> 木星
    explanation: '木星是太阳系八大行星中最大的一颗，其质量是其余所有行星总和的2.5倍！',
  },
  {
    id: 3,
    number: 3,
    total: 5,
    prompt: '四季探索：“接天莲叶无穷碧，映日荷花别样红”描绘的是哪个季节？',
    category: '诗词常识',
    type: 'single',
    points: 100,
    options: [
      {
        key: 'A',
        text: '春季 (Spring)',
        color: 'red',
        symbol: '▲',
        bgClass: 'bg-rose-500 hover:bg-rose-600',
        borderClass: 'border-rose-300',
        badgeBg: 'bg-rose-600 text-white',
        glowColor: 'rgba(244, 63, 94, 0.4)',
      },
      {
        key: 'B',
        text: '夏季 (Summer)',
        color: 'blue',
        symbol: '◆',
        bgClass: 'bg-blue-500 hover:bg-blue-600',
        borderClass: 'border-blue-300',
        badgeBg: 'bg-blue-600 text-white',
        glowColor: 'rgba(59, 130, 246, 0.4)',
      },
      {
        key: 'C',
        text: '秋季 (Autumn)',
        color: 'yellow',
        symbol: '●',
        bgClass: 'bg-amber-400 hover:bg-amber-500',
        borderClass: 'border-amber-200',
        badgeBg: 'bg-amber-500 text-slate-900',
        glowColor: 'rgba(245, 158, 11, 0.4)',
      },
      {
        key: 'D',
        text: '冬季 (Winter)',
        color: 'green',
        symbol: '■',
        bgClass: 'bg-emerald-500 hover:bg-emerald-600',
        borderClass: 'border-emerald-300',
        badgeBg: 'bg-emerald-600 text-white',
        glowColor: 'rgba(16, 185, 129, 0.4)',
      },
    ],
    correctOptionIndex: 1, // 'B' -> 夏季
    explanation: '荷花盛开在烈日炎炎的夏季，“映日荷花别样红”正是南宋诗人杨万里笔下的西湖夏日盛景！',
  },
  {
    id: 4,
    number: 4,
    total: 5,
    prompt: '动物王国：在中华传统文化中，额头天然带有“王”字纹样的是哪种动物？',
    category: '自然生物',
    type: 'single',
    points: 100,
    options: [
      {
        key: 'A',
        text: '东北虎 (老虎)',
        color: 'red',
        symbol: '▲',
        bgClass: 'bg-rose-500 hover:bg-rose-600',
        borderClass: 'border-rose-300',
        badgeBg: 'bg-rose-600 text-white',
        glowColor: 'rgba(244, 63, 94, 0.4)',
      },
      {
        key: 'B',
        text: '非洲雄狮',
        color: 'blue',
        symbol: '◆',
        bgClass: 'bg-blue-500 hover:bg-blue-600',
        borderClass: 'border-blue-300',
        badgeBg: 'bg-blue-600 text-white',
        glowColor: 'rgba(59, 130, 246, 0.4)',
      },
      {
        key: 'C',
        text: '森林大象',
        color: 'yellow',
        symbol: '●',
        bgClass: 'bg-amber-400 hover:bg-amber-500',
        borderClass: 'border-amber-200',
        badgeBg: 'bg-amber-500 text-slate-900',
        glowColor: 'rgba(245, 158, 11, 0.4)',
      },
      {
        key: 'D',
        text: '敏捷金钱豹',
        color: 'green',
        symbol: '■',
        bgClass: 'bg-emerald-500 hover:bg-emerald-600',
        borderClass: 'border-emerald-300',
        badgeBg: 'bg-emerald-600 text-white',
        glowColor: 'rgba(16, 185, 129, 0.4)',
      },
    ],
    correctOptionIndex: 0, // 'A' -> 老虎
    explanation: '老虎额头的黑色条纹酷似汉字中的“王”字，因而被民间尊奉为“百兽之王”。',
  },
  {
    id: 5,
    number: 5,
    total: 5,
    prompt: '几何探索：在以下平面图形中，内角和正好是 360 度的是？',
    category: '空间与几何',
    type: 'single',
    points: 100,
    options: [
      {
        key: 'A',
        text: '三角形',
        color: 'red',
        symbol: '▲',
        bgClass: 'bg-rose-500 hover:bg-rose-600',
        borderClass: 'border-rose-300',
        badgeBg: 'bg-rose-600 text-white',
        glowColor: 'rgba(244, 63, 94, 0.4)',
      },
      {
        key: 'B',
        text: '长方形 (矩形)',
        color: 'blue',
        symbol: '◆',
        bgClass: 'bg-blue-500 hover:bg-blue-600',
        borderClass: 'border-blue-300',
        badgeBg: 'bg-blue-600 text-white',
        glowColor: 'rgba(59, 130, 246, 0.4)',
      },
      {
        key: 'C',
        text: '五角星',
        color: 'yellow',
        symbol: '●',
        bgClass: 'bg-amber-400 hover:bg-amber-500',
        borderClass: 'border-amber-200',
        badgeBg: 'bg-amber-500 text-slate-900',
        glowColor: 'rgba(245, 158, 11, 0.4)',
      },
      {
        key: 'D',
        text: '圆形',
        color: 'green',
        symbol: '■',
        bgClass: 'bg-emerald-500 hover:bg-emerald-600',
        borderClass: 'border-emerald-300',
        badgeBg: 'bg-emerald-600 text-white',
        glowColor: 'rgba(16, 185, 129, 0.4)',
      },
    ],
    correctOptionIndex: 1, // 'B' -> 长方形
    explanation: '三角形内角和为 180 度；长方形有4个直角，4 × 90° = 360 度！',
  },
];

// 28 名全班真实小达人（已均匀编入红蓝战队）
export const INITIAL_STUDENTS: ScreenStudent[] = [
  { id: 's_01', name: '机智天天', avatar: './assets/games/char_a.png', teamId: 'blue', score: 380, streak: 3, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 3.2, isCorrect: true },
  { id: 's_02', name: '元气阳阳', avatar: './assets/games/char_b.png', teamId: 'blue', score: 350, streak: 2, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 4.1, isCorrect: true },
  { id: 's_03', name: '星空果果', avatar: './assets/games/space.png', teamId: 'blue', score: 310, streak: 1, isReady: true, currentAnswerIndex: 0, isSubmitted: true, submitTimeSec: 5.5, isCorrect: false },
  { id: 's_04', name: '极速浩浩', avatar: './assets/games/racing.png', teamId: 'blue', score: 290, streak: 1, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 4.8, isCorrect: true },
  { id: 's_05', name: '拔河小雨', avatar: './assets/games/tug-of-war.png', teamId: 'blue', score: 260, streak: 0, isReady: true, currentAnswerIndex: 1, isSubmitted: true, submitTimeSec: 6.2, isCorrect: false },
  { id: 's_06', name: '探索小峰', avatar: './assets/games/space.png', teamId: 'blue', score: 240, streak: 1, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 7.1, isCorrect: true },
  { id: 's_07', name: '小熊奇奇', avatar: './assets/games/char_a.png', teamId: 'blue', score: 220, streak: 0, isReady: true, currentAnswerIndex: 3, isSubmitted: true, submitTimeSec: 8.0, isCorrect: false },
  { id: 's_08', name: '灵兔欢欢', avatar: './assets/games/char_b.png', teamId: 'blue', score: 210, streak: 1, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 5.9, isCorrect: true },
  { id: 's_09', name: '疾风小杰', avatar: './assets/games/racing.png', teamId: 'blue', score: 190, streak: 0, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 6.8, isCorrect: true },
  { id: 's_10', name: '力士壮壮', avatar: './assets/games/tug-of-war.png', teamId: 'blue', score: 170, streak: 0, isReady: true, currentAnswerIndex: 0, isSubmitted: true, submitTimeSec: 9.1, isCorrect: false },
  { id: 's_11', name: '智慧文文', avatar: './assets/games/quiz-quest.png', teamId: 'blue', score: 160, streak: 0, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 4.4, isCorrect: true },
  { id: 's_12', name: '护盾小涛', avatar: './assets/games/castle.png', teamId: 'blue', score: 150, streak: 0, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 5.7, isCorrect: true },
  { id: 's_13', name: '冲刺晨晨', avatar: './assets/games/sprint.png', teamId: 'blue', score: 130, streak: 0, isReady: true, currentAnswerIndex: 1, isSubmitted: true, submitTimeSec: 10.2, isCorrect: false },
  { id: 's_14', name: '宝藏亮亮', avatar: './assets/games/treasure.png', teamId: 'blue', score: 110, streak: 0, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 8.5, isCorrect: true },

  // 红队先锋 (14 人)
  { id: 's_15', name: '学霸小涵', avatar: './assets/games/char_b.png', teamId: 'red', score: 390, streak: 3, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 2.8, isCorrect: true },
  { id: 's_16', name: '城堡朵朵', avatar: './assets/games/castle.png', teamId: 'red', score: 340, streak: 2, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 3.9, isCorrect: true },
  { id: 's_17', name: '神射小宇', avatar: './assets/games/basketball.png', teamId: 'red', score: 320, streak: 2, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 4.3, isCorrect: true },
  { id: 's_18', name: '敏捷小可', avatar: './assets/games/char_a.png', teamId: 'red', score: 280, streak: 1, isReady: true, currentAnswerIndex: 0, isSubmitted: true, submitTimeSec: 6.0, isCorrect: false },
  { id: 's_19', name: '飞跃乐乐', avatar: './assets/games/racing.png', teamId: 'red', score: 270, streak: 1, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 5.1, isCorrect: true },
  { id: 's_20', name: '智囊小薇', avatar: './assets/games/quiz-quest.png', teamId: 'red', score: 250, streak: 1, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 4.7, isCorrect: true },
  { id: 's_21', name: '闪电小博', avatar: './assets/games/sprint.png', teamId: 'red', score: 220, streak: 0, isReady: true, currentAnswerIndex: 3, isSubmitted: true, submitTimeSec: 7.4, isCorrect: false },
  { id: 's_22', name: '火箭欣欣', avatar: './assets/games/space.png', teamId: 'red', score: 200, streak: 1, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 6.3, isCorrect: true },
  { id: 's_23', name: '投篮阿龙', avatar: './assets/games/basketball.png', teamId: 'red', score: 180, streak: 0, isReady: true, currentAnswerIndex: 1, isSubmitted: true, submitTimeSec: 8.8, isCorrect: false },
  { id: 's_24', name: '守卫婷婷', avatar: './assets/games/castle.png', teamId: 'red', score: 160, streak: 0, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 5.6, isCorrect: true },
  { id: 's_25', name: '探宝小轩', avatar: './assets/games/treasure.png', teamId: 'red', score: 140, streak: 0, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 9.3, isCorrect: true },
  { id: 's_26', name: '灵动佳佳', avatar: './assets/games/char_b.png', teamId: 'red', score: 130, streak: 0, isReady: true, currentAnswerIndex: 0, isSubmitted: true, submitTimeSec: 6.9, isCorrect: false },
  { id: 's_27', name: '奔跑楠楠', avatar: './assets/games/sprint.png', teamId: 'red', score: 120, streak: 0, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 7.7, isCorrect: true },
  { id: 's_28', name: '追风翔翔', avatar: './assets/games/racing.png', teamId: 'red', score: 100, streak: 0, isReady: true, currentAnswerIndex: 2, isSubmitted: true, submitTimeSec: 8.2, isCorrect: true },
];

// 计算当前题目选择分布统计
export function calculateDistribution(
  students: ScreenStudent[],
  correctIndex: number
): QuestionDistribution {
  const counts: Record<OptionKey, number> = { A: 0, B: 0, C: 0, D: 0 };
  const keys: OptionKey[] = ['A', 'B', 'C', 'D'];
  const submittedStudents = students.filter((s) => s.isSubmitted && s.currentAnswerIndex !== null);
  const totalSubmitted = submittedStudents.length || 1; // 避免除以0

  submittedStudents.forEach((s) => {
    if (s.currentAnswerIndex !== null && s.currentAnswerIndex >= 0 && s.currentAnswerIndex < 4) {
      const key = keys[s.currentAnswerIndex];
      counts[key] += 1;
    }
  });

  return {
    A: {
      count: counts.A,
      percentage: Math.round((counts.A / totalSubmitted) * 100),
      isCorrect: correctIndex === 0,
    },
    B: {
      count: counts.B,
      percentage: Math.round((counts.B / totalSubmitted) * 100),
      isCorrect: correctIndex === 1,
    },
    C: {
      count: counts.C,
      percentage: Math.round((counts.C / totalSubmitted) * 100),
      isCorrect: correctIndex === 2,
    },
    D: {
      count: counts.D,
      percentage: Math.round((counts.D / totalSubmitted) * 100),
      isCorrect: correctIndex === 3,
    },
  };
}
