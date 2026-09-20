export type SubjectId = 'indonesia' | 'english';

export type ScreenState = 'name' | 'subject' | 'quiz' | 'result' | 'review';

export interface Question {
  id: number;
  indicator: string;
  topic?: string;
  question: string;
  passage?: string;
  options: string[]; // Exactly 4 options: [A, B, C, D]
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'challenging';
}

export interface ExamResult {
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
}

export interface ActiveExamState {
  studentName: string;
  subjectId: SubjectId;
  answers: Record<number, number>; // questionId -> selected option index (0..3)
  currentQuestionIndex: number;
  timeRemaining: number; // seconds remaining
  isFinished: boolean;
}
