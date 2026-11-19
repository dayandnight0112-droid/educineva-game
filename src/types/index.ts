export type GameCategory = 'in-class' | 'after-class';

export interface Game {
  id: string;
  name: string;
  tag: '课中' | '课外';
  category: GameCategory;
  coverUrl: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  defaultRounds: number;
  defaultDuration: number; // in minutes
  supportedTeamModes: ('team' | 'individual')[];
}

export interface Student {
  id: string;
  name: string;
  avatarColor: string;
  gender: 'boy' | 'girl';
  score?: number;
  ready?: boolean;
}

export interface TeamConfig {
  id: string;
  name: string; // e.g., '蓝队', '红队', '绿队', '黄队'
  color: string; // hex
  bgColor: string;
  borderColor: string;
  textColor: string;
  character: string; // '人物 A', '人物 B', etc.
  characterAvatar: string;
  students: Student[];
}

export interface SingleChoiceQuestion {
  id: string;
  type: 'single';
  stem: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: 'A' | 'B' | 'C' | 'D';
}

export interface QuestionPaper {
  id: string;
  name: string;
  grade: string;
  subject: string;
  questionCount: number;
  questions?: SingleChoiceQuestion[];
  updatedAt?: string;
}

export interface RoomConfig {
  gameId: string;
  roomName: string;
  questionPaperId: string;
  durationMinutes: number;
  rounds: number;
  isTeamMode: boolean;
  teamCount: number;
  playersPerTeam: number;
  questionRule: string;
  teams: TeamConfig[];
  unassignedStudents: Student[];
}
