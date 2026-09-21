export type SubjectId = 'matematika' | 'quran_hadis' | 'seni_rupa';

export type UserRole = 'USER' | 'ADMIN';

export type ScreenState =
  | 'name'
  | 'home'
  | 'subject'
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
  matematikaCount: number;
  quranHadisCount: number;
  seniRupaCount: number;
  recentActivity: Array<{
    id: string;
    studentName: string;
    subjectId: SubjectId;
    score: number;
    completedAt: string;
  }>;
}
