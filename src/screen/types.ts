/**
 * Educineva - 老师大屏控制与展示端 (Teacher Presentation Screen)
 * 类型定义与状态机规范
 */

// 老师大屏核心画面状态
export type TeacherScreenState =
  | 'lobby'             // 画面一：等待大厅与投屏扫码
  | 'question-prompt'   // 画面二A：题干审题与思考期 (倒计时 1)
  | 'question-options'  // 画面二B：四色选项展开与抢答期 (倒计时 2)
  | 'result-stats'      // 画面三：条形统计分布图与答案揭晓
  | 'scoreboard'        // 画面四：局间积分榜与战队对决态势
  | 'podium';           // 画面五：终局 Kahoot 颁奖典礼与教师教学洞察

// 4 色几何符号卡片定义 (Kahoot 经典 4 色)
export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  key: OptionKey;
  text: string;
  color: 'red' | 'blue' | 'yellow' | 'green';
  symbol: '▲' | '◆' | '●' | '■';
  bgClass: string;
  borderClass: string;
  badgeBg: string;
  glowColor: string;
}

// 题目定义 (老师大屏完整版，含题干、选项、分值与官方解析)
export interface ScreenQuizQuestion {
  id: number;
  number: number;
  total: number;
  prompt: string;
  category: string;
  type: 'single' | 'multiple';
  points: number;
  options: QuizOption[];
  correctOptionIndex: number; // 0: A, 1: B, 2: C, 3: D
  explanation: string;
  image?: string;
}

// 战队定义 (支持 2 队、3 队、4 队)
export type TeamId = 'blue' | 'red' | 'yellow' | 'green';

export interface ScreenTeam {
  id: TeamId;
  name: string;        // 如 "🟦 蓝队勇士", "🟥 红队先锋", "🟨 黄队闪电", "🟩 绿队神鹰"
  shortName: string;   // "蓝队" / "红队" / "黄队" / "绿队"
  slogan: string;
  colorHex: string;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  score: number;
  membersCount: number;
  icon: string;
}

// 参战学生数据模型
export interface ScreenStudent {
  id: string;
  name: string;
  avatar: string;
  teamId: TeamId;
  score: number;
  streak: number;
  isReady: boolean;
  // 当前题作答情况
  currentAnswerIndex: number | null; // 0, 1, 2, 3 或 null (未作答)
  isSubmitted: boolean;
  submitTimeSec?: number; // 耗时秒数
  isCorrect?: boolean;
}

// 选项提交统计
export interface OptionVoteStats {
  count: number;
  percentage: number;
  isCorrect: boolean;
}

export type QuestionDistribution = Record<OptionKey, OptionVoteStats>;

// 房间与计时器全局配置 (老师随时可调)
export interface ScreenSettings {
  pin: string;
  roomName: string;
  isRoomLocked: boolean;
  teamMode: 2 | 3 | 4;   // 战队对战模式：2 队 (双阵营对战) | 3 队 (三足鼎立) | 4 队 (四强逐鹿)
  durationTimer1: number; // 倒计时 1 (审题思考时长，默认 15s)
  durationTimer2: number; // 倒计时 2 (选项作答时长，默认 15s)
  autoAdvanceToOptions: boolean; // 倒计时 1 结束后是否自动翻开选项
  soundEnabled: boolean;
}
