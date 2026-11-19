import { Game, QuestionPaper, TeamConfig, Student } from '../types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'racing',
    name: '极速赛车',
    tag: '课中',
    category: 'in-class',
    coverUrl: './assets/games/racing.png',
    description: '答题加速，赛道超车！答对题目为赛车注入氮气加速，团队总里程最高者胜出。',
    minPlayers: 2,
    maxPlayers: 32,
    defaultRounds: 3,
    defaultDuration: 5,
    supportedTeamModes: ['team', 'individual'],
  },
  {
    id: 'quiz-quest',
    name: '知识闯关',
    tag: '课中',
    category: 'in-class',
    coverUrl: './assets/games/quiz-quest.png',
    description: '阶梯登山挑战，每答对一题踏上一块浮空浮岛石阶，争夺金色智慧之星！',
    minPlayers: 2,
    maxPlayers: 40,
    defaultRounds: 3,
    defaultDuration: 5,
    supportedTeamModes: ['team', 'individual'],
  },
  {
    id: 'tug-of-war',
    name: '拔河挑战',
    tag: '课中',
    category: 'in-class',
    coverUrl: './assets/games/tug-of-war.png',
    description: '经典阵营对抗！全队合力作答积蓄拔河力量，拔河绳过界即可夺得胜利旗帜。',
    minPlayers: 4,
    maxPlayers: 50,
    defaultRounds: 3,
    defaultDuration: 5,
    supportedTeamModes: ['team'],
  },
  {
    id: 'space',
    name: '太空冒险',
    tag: '课中',
    category: 'in-class',
    coverUrl: './assets/games/space.png',
    description: '宇航员星系探索，穿越小行星带与神秘黑洞，解开深空谜题收集能量晶体。',
    minPlayers: 2,
    maxPlayers: 30,
    defaultRounds: 3,
    defaultDuration: 5,
    supportedTeamModes: ['team', 'individual'],
  },
  {
    id: 'basketball',
    name: '答题投篮',
    tag: '课中',
    category: 'in-class',
    coverUrl: './assets/games/basketball.png',
    description: '课堂三分球争霸！根据答题精准度与作答用时判定空心入网或精彩暴扣。',
    minPlayers: 2,
    maxPlayers: 40,
    defaultRounds: 3,
    defaultDuration: 5,
    supportedTeamModes: ['team', 'individual'],
  },
  {
    id: 'treasure',
    name: '宝藏探险',
    tag: '课中',
    category: 'in-class',
    coverUrl: './assets/games/treasure.png',
    description: '寻宝藏宝图探险！一步步解开神秘符号与航海谜题，打开海岸黄金宝箱。',
    minPlayers: 2,
    maxPlayers: 30,
    defaultRounds: 3,
    defaultDuration: 5,
    supportedTeamModes: ['team', 'individual'],
  },
  {
    id: 'sprint',
    name: '欢乐竞速',
    tag: '课中',
    category: 'in-class',
    coverUrl: './assets/games/sprint.png',
    description: '操场田径百米冲刺！连续作答触发热血奔跑冲刺状态，抢占冲线第一名！',
    minPlayers: 2,
    maxPlayers: 40,
    defaultRounds: 3,
    defaultDuration: 5,
    supportedTeamModes: ['team', 'individual'],
  },
  {
    id: 'castle',
    name: '城堡守卫',
    tag: '课中',
    category: 'in-class',
    coverUrl: './assets/games/castle.png',
    description: '城堡防御战！答题筑起防线，抵御入侵军团，协同配合守卫荣誉堡垒。',
    minPlayers: 4,
    maxPlayers: 50,
    defaultRounds: 3,
    defaultDuration: 5,
    supportedTeamModes: ['team'],
  },
  // 课外练习游戏
  {
    id: 'math-galaxy',
    name: '算术星际战',
    tag: '课外',
    category: 'after-class',
    coverUrl: './assets/games/space.png',
    description: '课后自主强化练习，自适应难度算术打怪升级，积累课后徽章。',
    minPlayers: 1,
    maxPlayers: 1,
    defaultRounds: 5,
    defaultDuration: 10,
    supportedTeamModes: ['individual'],
  },
  {
    id: 'idiom-island',
    name: '成语接龙岛',
    tag: '课外',
    category: 'after-class',
    coverUrl: './assets/games/treasure.png',
    description: '课后趣味语文拓展，收集神话成语图鉴，巩固课堂核心成语词汇。',
    minPlayers: 1,
    maxPlayers: 1,
    defaultRounds: 5,
    defaultDuration: 10,
    supportedTeamModes: ['individual'],
  },
];

export const QUESTION_PAPERS: QuestionPaper[] = [
  {
    id: 'p1',
    name: 'Paper 1',
    grade: '一年级',
    subject: '数学',
    questionCount: 20,
    questions: [
      {
        id: 'q1-1',
        type: 'single',
        stem: '3 + 5 = ?',
        options: { A: '6', B: '7', C: '8', D: '9' },
        answer: 'C'
      },
      {
        id: 'q1-2',
        type: 'single',
        stem: '10 - 4 = ?',
        options: { A: '5', B: '6', C: '7', D: '8' },
        answer: 'B'
      },
      {
        id: 'q1-3',
        type: 'single',
        stem: '7 + 6 = ?',
        options: { A: '12', B: '13', C: '14', D: '15' },
        answer: 'B'
      },
      {
        id: 'q1-4',
        type: 'single',
        stem: '15 - 8 = ?',
        options: { A: '6', B: '7', C: '8', D: '9' },
        answer: 'B'
      },
      {
        id: 'q1-5',
        type: 'single',
        stem: '9 + 9 = ?',
        options: { A: '18', B: '17', C: '19', D: '20' },
        answer: 'A'
      },
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `q1-${i + 6}`,
        type: 'single' as const,
        stem: `一年级口算基础强化练习 第 ${i + 6} 题：${i + 5} + 4 = ?`,
        options: {
          A: `${i + 8}`,
          B: `${i + 9}`,
          C: `${i + 10}`,
          D: `${i + 11}`
        },
        answer: 'B' as const
      }))
    ]
  },
  {
    id: 'p2',
    name: 'Paper 2',
    grade: '二年级',
    subject: '数学',
    questionCount: 25,
    questions: Array.from({ length: 25 }, (_, i) => ({
      id: `q2-${i + 1}`,
      type: 'single' as const,
      stem: `二年级乘加综合练习 第 ${i + 1} 题：${(i + 2) * 2} + 5 = ?`,
      options: {
        A: `${(i + 2) * 2 + 4}`,
        B: `${(i + 2) * 2 + 5}`,
        C: `${(i + 2) * 2 + 6}`,
        D: `${(i + 2) * 2 + 7}`
      },
      answer: 'B' as const
    }))
  },
  {
    id: 'p3',
    name: '科学小测',
    grade: '三年级',
    subject: '科学',
    questionCount: 15,
    questions: [
      {
        id: 'q3-1',
        type: 'single',
        stem: '植物进行光合作用需要吸收哪种气体？',
        options: { A: '氧气', B: '二氧化碳', C: '氮气', D: '氢气' },
        answer: 'B'
      },
      {
        id: 'q3-2',
        type: 'single',
        stem: '以下哪种动物属于哺乳动物？',
        options: { A: '金鱼', B: '鸽子', C: '海豚', D: '蝴蝶' },
        answer: 'C'
      },
      ...Array.from({ length: 13 }, (_, i) => ({
        id: `q3-${i + 3}`,
        type: 'single' as const,
        stem: `科学生活常识考题 第 ${i + 3} 题：下列哪项属于导体？`,
        options: { A: '铁丝', B: '塑料', C: '木头', D: '陶瓷' },
        answer: 'A' as const
      }))
    ]
  },
  {
    id: 'p4',
    name: '词汇练习',
    grade: '四年级',
    subject: '英文',
    questionCount: 30,
    questions: [
      {
        id: 'q4-1',
        type: 'single',
        stem: 'Choose the correct synonym for "Happy":',
        options: { A: 'Sad', B: 'Joyful', C: 'Angry', D: 'Tired' },
        answer: 'B'
      },
      {
        id: 'q4-2',
        type: 'single',
        stem: 'Which word is the opposite of "Ancient"?',
        options: { A: 'Modern', B: 'Old', C: 'Historic', D: 'Past' },
        answer: 'A'
      },
      ...Array.from({ length: 28 }, (_, i) => ({
        id: `q4-${i + 3}`,
        type: 'single' as const,
        stem: `Vocabulary Practice Question ${i + 3}: Select the correct word.`,
        options: { A: 'Quick', B: 'Quickly', C: 'Quicker', D: 'Quickest' },
        answer: 'B' as const
      }))
    ]
  },
  {
    id: 'p5',
    name: '单元复习',
    grade: '五年级',
    subject: '华文',
    questionCount: 20,
    questions: [
      {
        id: 'q5-1',
        type: 'single',
        stem: '下列词语中字形完全正确的一项是？',
        options: { A: '按步就班', B: '循规蹈矩', C: '再接再励', D: '迫不急待' },
        answer: 'B'
      },
      ...Array.from({ length: 19 }, (_, i) => ({
        id: `q5-${i + 2}`,
        type: 'single' as const,
        stem: `华文阅读与理解专项复习 第 ${i + 2} 题`,
        options: { A: '比喻', B: '拟人', C: '排比', D: '夸张' },
        answer: 'A' as const
      }))
    ]
  },
  {
    id: 'p6',
    name: 'Sejarah Bab 1',
    grade: '中四',
    subject: '历史',
    questionCount: 18,
    questions: [
      {
        id: 'q6-1',
        type: 'single',
        stem: 'Apakah ciri utama negara bangsa Kesultanan Melayu Melaka?',
        options: {
          A: 'Sistem Raja Berperlembagaan',
          B: 'Kedaulatan dan Undang-undang',
          C: 'Demokrasi Berparlimen',
          D: 'Republik'
        },
        answer: 'B'
      },
      ...Array.from({ length: 17 }, (_, i) => ({
        id: `q6-${i + 2}`,
        type: 'single' as const,
        stem: `Soalan Latihan Sejarah Tingkatan 4 No. ${i + 2}`,
        options: { A: 'Pilihan A', B: 'Pilihan B', C: 'Pilihan C', D: 'Pilihan D' },
        answer: 'A' as const
      }))
    ]
  }
];

export const QUESTION_RULES = [
  { id: 'random-5-norepeat', label: '每轮随机抽取 5 题，不重复', desc: '系统从试卷题库中完全无放回抽取5道题目' },
  { id: 'random-10-norepeat', label: '每轮随机抽取 10 题，不重复', desc: '节奏紧凑，适合知识点综合较多的大测验' },
  { id: 'sequential', label: '按试卷题目顺序逐题出题', desc: '严格按照试卷中录入的题号1~N依次进行' },
  { id: 'adaptive', label: '根据答题表现难度自适应', desc: '两队领先或落后时动态匹配梯度难度题目' },
  { id: 'wrong-first', label: '易错题与重点高频题优先', desc: '优先抽取班级既往测试中错误率超过40%的题' },
];

export const CHARACTER_OPTIONS = [
  { id: 'char_a', name: '人物 A', avatar: './assets/games/char_a.png', badge: '护目镜极速少年' },
  { id: 'char_b', name: '人物 B', avatar: './assets/games/char_b.png', badge: '粉帽活力少女' },
  { id: 'char_c', name: '人物 C', avatar: './assets/games/char_a.png', badge: '智慧领航者' },
  { id: 'char_d', name: '人物 D', avatar: './assets/games/char_b.png', badge: '无畏探险手' },
];

export const INITIAL_STUDENTS_BLUE: Student[] = [
  { id: 's1', name: '张小凡', avatarColor: '#3b82f6', gender: 'boy', ready: true },
  { id: 's2', name: '李林林', avatarColor: '#0ea5e9', gender: 'girl', ready: true },
  { id: 's3', name: '王心怡', avatarColor: '#6366f1', gender: 'girl', ready: true },
  { id: 's4', name: '赵雨轩', avatarColor: '#2563eb', gender: 'boy', ready: true },
];

export const INITIAL_STUDENTS_RED: Student[] = [
  { id: 's5', name: '陈思源', avatarColor: '#ec4899', gender: 'boy', ready: true },
  { id: 's6', name: '刘博文', avatarColor: '#f43f5e', gender: 'boy', ready: true },
  { id: 's7', name: '周子涵', avatarColor: '#e11d48', gender: 'girl', ready: true },
  { id: 's8', name: '孙琪琪', avatarColor: '#db2777', gender: 'girl', ready: true },
];

export const INITIAL_UNASSIGNED: Student[] = [
  { id: 's9', name: '钱佳乐', avatarColor: '#8b5cf6', gender: 'boy', ready: false },
  { id: 's10', name: '吴亦然', avatarColor: '#10b981', gender: 'girl', ready: false },
  { id: 's11', name: '郑浩天', avatarColor: '#f59e0b', gender: 'boy', ready: false },
  { id: 's12', name: '冯雪儿', avatarColor: '#14b8a6', gender: 'girl', ready: false },
];

export const DEFAULT_TEAMS: TeamConfig[] = [
  {
    id: 'blue',
    name: '蓝队',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    textColor: '#1d4ed8',
    character: '人物 A',
    characterAvatar: './assets/games/char_a.png',
    students: INITIAL_STUDENTS_BLUE,
  },
  {
    id: 'red',
    name: '红队',
    color: '#e60067',
    bgColor: '#fdf2f7',
    borderColor: '#fbcfe1',
    textColor: '#b0004e',
    character: '人物 B',
    characterAvatar: './assets/games/char_b.png',
    students: INITIAL_STUDENTS_RED,
  },
];

export const AVAILABLE_TEAM_PRESETS: Omit<TeamConfig, 'students'>[] = [
  {
    id: 'blue',
    name: '蓝队',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    textColor: '#1d4ed8',
    character: '人物 A',
    characterAvatar: './assets/games/char_a.png',
  },
  {
    id: 'red',
    name: '红队',
    color: '#e60067',
    bgColor: '#fdf2f7',
    borderColor: '#fbcfe1',
    textColor: '#b0004e',
    character: '人物 B',
    characterAvatar: './assets/games/char_b.png',
  },
  {
    id: 'yellow',
    name: '黄队',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    textColor: '#b45309',
    character: '人物 C',
    characterAvatar: './assets/games/char_a.png',
  },
  {
    id: 'green',
    name: '绿队',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    textColor: '#15803d',
    character: '人物 D',
    characterAvatar: './assets/games/char_b.png',
  },
];
