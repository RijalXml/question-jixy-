export type SubjectId = 'ips' | 'pjok' | 'taaruf' | 'adawat' | 'usrah' | 'ipa' | 'fikih' | 'pkn';

export type SpaceThemeMode = 'planet' | 'blackhole';

export type UserRole = 'USER' | 'ADMIN';

export type ScreenState =
  | 'name'
  | 'home'
  | 'belajar'
  | 'subject'
  | 'materi'
  | 'quiz'
  | 'loading'
  | 'result'
  | 'review'
  | 'leaderboard'
  | 'profile'
  | 'admin';

export interface Question {
  id: number;
  subjectId: SubjectId;
  indicator: string;
  topic?: string;
  question: string;
  passage?: string;
  options: string[]; // Exactly 4 options: [A, B, C, D]
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'challenging';
  isActive?: boolean;
}

export interface ExamResult {
  id?: string;
  studentName: string;
  avatar?: string;
  subjectId: SubjectId;
  subjectTitle: string;
  totalQuestions: number;
  score: number; // 0 to 100
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  percentage: number;
  category: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Belajar Lagi';
  completedAt: string;
  xpEarned?: number;
}

export interface ActiveExamState {
  studentName: string;
  subjectId: SubjectId;
  answers: Record<number, number>; // questionId -> selected option index (0..3)
  currentQuestionIndex: number;
  timeRemaining: number; // seconds remaining
  isFinished: boolean;
}

export interface LeaderboardEntry {
  id: string;
  studentName: string;
  avatar: string;
  subjectId: SubjectId | 'all';
  score: number;
  quizzesCompleted: number;
  xp: number;
  completedAt: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  role: UserRole;
  totalScore: number;
  xp: number;
  quizzesCompleted: number;
  completedSubjects: SubjectId[];
  history: ExamResult[];
  lastStudiedMateriId?: string;
}

export interface AppConfig {
  appName: string;
  appDescription: string;
  timerMinutes: number;
  allowReview: boolean;
}

export interface AdminStats {
  totalUsers: number;
  totalQuestions: number;
  totalQuizzesTaken: number;
  averageScore: number;
  ipsCount: number;
  pjokCount: number;
  taarufCount?: number;
  adawatCount?: number;
  usrahCount?: number;
  ipaCount?: number;
  fikihCount?: number;
  pknCount?: number;
  skiCount?: number;
  bahasaInggrisCount?: number;
  bahasaJawaCount?: number;
  recentActivity: Array<{
    id: string;
    studentName: string;
    subjectId: SubjectId | 'all' | string;
    score: number;
    completedAt: string;
  }>;
}

// LKS Lesson Data Structures (Based on User's LKS Table of Contents)
export interface LKSSubchapter {
  id: string;
  code: string; // e.g., "A", "B", "C", "D"
  title: string;
  page?: string;
  readTime: string; // e.g. "5 menit"
  summary: string;
  keyPoints: string[];
  vocabulary?: Array<{ term: string; meaning: string }>;
  practicalTips?: string;
}

export interface LKSChapter {
  id: string;
  chapterNumber: string; // e.g. "BAB I", "Unit 1", "Wulangan I"
  title: string;
  description: string;
  subchapters: LKSSubchapter[];
}

export interface LKSSubjectInfo {
  id: SubjectId;
  name: string;
  codeName: string;
  curriculum: string;
  icon: string;
  tagline: string;
  description: string;
  progressPercent: number;
  totalMaterials: number;
  chapters: LKSChapter[];
}
