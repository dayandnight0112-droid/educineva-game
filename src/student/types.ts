/**
 * Educineva Kids - 学生端专用类型定义
 * 严格与教师端隔离：绝不包含任何管理指令、题库编辑或正确答案密钥
 */

// 离线调试与当前视图状态
export type StudentScreen = 
  | 'landing'     // 1. 学生端主页 / 游戏大厅
  | 'join-modal'  // 2. 加入房间弹窗
  | 'lobby'       // 3. 等待大厅
  | 'quiz'        // 4. 答题对战（手柄模式 / 独立游戏模式）
  | 'settlement'; // 5. Kahoot 结算庆典与个人成绩单

// 游戏卡片定义
export interface StudentGameCard {
  id: string;
  name: string;
  englishName?: string;
  tag: string;
  category: 'puzzle' | 'battle' | 'action' | 'elimination';
  categoryLabel: string;
  coverImage: string;
  description: string;
  accentColor: string; // 鲜艳糖果主色，如 '#3b82f6', '#ec4899', '#f59e0b', '#10b981'
  bgGradient: string;
  badgeText: string;
  isPopular?: boolean;
}

// 卡通头像定义
export interface CartoonAvatar {
  id: string;
  name: string;
  src: string;
  bgColor: string;
}

// 队伍阵营信息
export interface StudentTeam {
  id: string;
  name: string; // 如 "蓝队勇士", "红队先锋", "绿队飞鹰", "黄队闪电"
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  iconName: string;
}

// 队友简要信息
export interface Teammate {
  id: string;
  name: string;
  avatar: string;
  teamId: string;
  isSelf?: boolean;
}

// 脱敏题目（绝不包含正确答案）
export interface StudentDesensitizedQuestion {
  questionId: string | number;
  questionNumber: number;
  totalQuestions: number;
  prompt: string;
  options: string[]; // 4个选项文本
  timeLimit: number; // 倒计时秒数
  points: number;
  image?: string;
}

// 个人答题即时反馈（仅在提交后由服务端返回）
export interface StudentAnswerFeedback {
  questionId: string | number;
  isCorrect: boolean;
  pointsEarned: number;
  currentScore: number;
  streak?: number;
}

// 个人错题条目定义
export interface StudentMistakeItem {
  questionNumber: number;
  prompt: string;
  studentAnswer: string;
  correctAnswer: string;
  explanation?: string;
}

// 个人结算成绩单
export interface StudentSettlementResult {
  totalScore: number;
  rank: number;
  totalParticipants: number;
  correctCount: number;
  wrongCount: number;
  winningTeamName: string;
  winningTeamColor: string;
  podium: {
    rank: number;
    teamName: string;
    score: number;
    avatar?: string;
    members?: string[];
  }[];
  mistakes: StudentMistakeItem[];
}
  }[];
}
