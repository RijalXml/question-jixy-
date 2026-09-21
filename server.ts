import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json({ limit: '10mb' }));

// Types
export type SubjectId = 'matematika' | 'quran_hadis' | 'seni_rupa';

export interface Question {
  id: number;
  subjectId: SubjectId;
  indicator: string;
  topic?: string;
  question: string;
  passage?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'challenging';
  isActive?: boolean;
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

export interface AppConfig {
  appName: string;
  appDescription: string;
  timerMinutes: number;
  allowReview: boolean;
}

// In-Memory & File-backed Store
const DB_FILE = path.join(process.cwd(), 'src', 'data', 'db_store.json');

// Active admin tokens (in-memory)
const activeAdminTokens = new Set<string>();

// Default Config
let appConfig: AppConfig = {
  appName: 'QUIZ EDUKASI',
  appDescription: 'Belajar • Bermain • Raih Prestasi — Platform quiz edukasi modern dan minimalist premium untuk Matematika, Qur\'an Hadis, dan Seni Rupa.',
  timerMinutes: 30,
  allowReview: true,
};

// Initial Seed Leaderboard
const initialLeaderboard: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    studentName: 'Ahmad Fauzi',
    avatar: '👨‍🎓',
    subjectId: 'matematika',
    score: 96,
    quizzesCompleted: 5,
    xp: 1480,
    completedAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(), // 3 hours ago
  },
  {
    id: 'lead-2',
    studentName: 'Nabila Zahra',
    avatar: '🧕',
    subjectId: 'quran_hadis',
    score: 100,
    quizzesCompleted: 6,
    xp: 1650,
    completedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(), // 12 hours ago
  },
  {
    id: 'lead-3',
    studentName: 'Rafi Pratama',
    avatar: '🎨',
    subjectId: 'seni_rupa',
    score: 93,
    quizzesCompleted: 4,
    xp: 1220,
    completedAt: new Date(Date.now() - 3600 * 1000 * 28).toISOString(), // yesterday
  },
  {
    id: 'lead-4',
    studentName: 'Siti Nurhaliza',
    avatar: '⭐',
    subjectId: 'matematika',
    score: 90,
    quizzesCompleted: 3,
    xp: 980,
    completedAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
  },
  {
    id: 'lead-5',
    studentName: 'Dimas Setiawan',
    avatar: '🚀',
    subjectId: 'quran_hadis',
    score: 87,
    quizzesCompleted: 3,
    xp: 890,
    completedAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
  },
  {
    id: 'lead-6',
    studentName: 'Alya Putri',
    avatar: '✨',
    subjectId: 'seni_rupa',
    score: 83,
    quizzesCompleted: 2,
    xp: 640,
    completedAt: new Date(Date.now() - 3600 * 1000 * 96).toISOString(),
  },
];

let questionsList: Question[] = [];
let leaderboardList: LeaderboardEntry[] = [...initialLeaderboard];
let quizResultsHistory: any[] = [];

// Helper to save store to file
function saveStore() {
  try {
    const data = {
      appConfig,
      questionsList,
      leaderboardList,
      quizResultsHistory,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save db_store.json:', err);
  }
}

// Helper to load store from file or seed from TypeScript files
async function initStore() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed.appConfig) appConfig = parsed.appConfig;
      if (parsed.questionsList && Array.isArray(parsed.questionsList) && parsed.questionsList.length > 0) {
        questionsList = parsed.questionsList;
      }
      if (parsed.leaderboardList && Array.isArray(parsed.leaderboardList)) {
        leaderboardList = parsed.leaderboardList;
      }
      if (parsed.quizResultsHistory && Array.isArray(parsed.quizResultsHistory)) {
        quizResultsHistory = parsed.quizResultsHistory;
      }
    } catch (e) {
      console.error('Error reading db_store.json, will re-import:', e);
    }
  }

  // If questionsList is empty, import from TS data files
  if (questionsList.length === 0) {
    try {
      const { questionsMatematika } = await import('./src/data/matematika.js');
      const { questionsQuranHadis } = await import('./src/data/quranHadis.js');
      const { questionsSeniRupa } = await import('./src/data/seniRupa.js');

      questionsList = [
        ...questionsMatematika,
        ...questionsQuranHadis,
        ...questionsSeniRupa,
      ];
      saveStore();
    } catch {
      // Fallback relative to current working directory
      try {
        const { questionsMatematika } = await import('./src/data/matematika.ts');
        const { questionsQuranHadis } = await import('./src/data/quranHadis.ts');
        const { questionsSeniRupa } = await import('./src/data/seniRupa.ts');

        questionsList = [
          ...questionsMatematika,
          ...questionsQuranHadis,
          ...questionsSeniRupa,
        ];
        saveStore();
      } catch (err2) {
        console.error('Failed to load initial questions:', err2);
      }
    }
  }
}

// Middleware to verify admin token
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Akses ditolak. Token otorisasi admin diperlukan.' });
  }

  const token = authHeader.split(' ')[1];
  if (!activeAdminTokens.has(token)) {
    return res.status(403).json({ error: 'Sesi admin tidak valid atau telah kedaluwarsa.' });
  }

  next();
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Health & Config
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/config', (req, res) => {
  res.json(appConfig);
});

// 2. Questions (Public / User)
app.get('/api/questions', (req, res) => {
  const { subject } = req.query;
  let result = questionsList.filter((q) => q.isActive !== false);

  if (subject && typeof subject === 'string') {
    result = result.filter((q) => q.subjectId === subject);
  }

  res.json({
    total: result.length,
    questions: result,
  });
});

// 3. Leaderboard (Public)
app.get('/api/leaderboard', (req, res) => {
  const { subject, timeframe } = req.query;
  let items = [...leaderboardList];

  // Filter by subject
  if (subject && subject !== 'all') {
    items = items.filter((item) => item.subjectId === subject || item.subjectId === 'all');
  }

  // Filter by timeframe
  const now = Date.now();
  if (timeframe === 'daily') {
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    items = items.filter((item) => new Date(item.completedAt).getTime() >= oneDayAgo);
  } else if (timeframe === 'weekly') {
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
    items = items.filter((item) => new Date(item.completedAt).getTime() >= oneWeekAgo);
  }

  // Sort by score DESC, then xp DESC
  items.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.xp - a.xp;
  });

  res.json({
    total: items.length,
    items,
  });
});

// 4. Submit Quiz (Records Score, History & Leaderboard)
app.post('/api/quiz/submit', (req, res) => {
  const {
    studentName,
    avatar = '🎓',
    subjectId,
    subjectTitle,
    totalQuestions,
    score,
    correctCount,
    incorrectCount,
    unansweredCount,
    percentage,
    category,
  } = req.body;

  if (!studentName || !subjectId) {
    return res.status(400).json({ error: 'Nama siswa dan mata pelajaran wajib diisi.' });
  }

  // Calculate XP earned: 10 XP per correct + bonus for score
  const xpEarned = Math.round(correctCount * 10 + (score >= 90 ? 100 : score >= 75 ? 50 : 20));

  const resultRecord = {
    id: 'res-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    studentName,
    avatar,
    subjectId,
    subjectTitle: subjectTitle || subjectId,
    totalQuestions: totalQuestions || 30,
    score: Math.round(score),
    correctCount: correctCount || 0,
    incorrectCount: incorrectCount || 0,
    unansweredCount: unansweredCount || 0,
    percentage: percentage || score,
    category: category || (score >= 85 ? 'Sangat Baik' : score >= 70 ? 'Baik' : 'Cukup'),
    completedAt: new Date().toISOString(),
    xpEarned,
  };

  quizResultsHistory.unshift(resultRecord);

  // Update or insert into leaderboard
  const existingIdx = leaderboardList.findIndex(
    (l) => l.studentName.toLowerCase().trim() === studentName.toLowerCase().trim() && l.subjectId === subjectId
  );

  if (existingIdx >= 0) {
    const prev = leaderboardList[existingIdx];
    leaderboardList[existingIdx] = {
      ...prev,
      avatar: avatar || prev.avatar,
      score: Math.max(prev.score, Math.round(score)),
      quizzesCompleted: prev.quizzesCompleted + 1,
      xp: prev.xp + xpEarned,
      completedAt: new Date().toISOString(),
    };
  } else {
    leaderboardList.push({
      id: 'lead-' + Date.now(),
      studentName: studentName.trim(),
      avatar: avatar || '🎓',
      subjectId,
      score: Math.round(score),
      quizzesCompleted: 1,
      xp: xpEarned + 100, // welcome bonus
      completedAt: new Date().toISOString(),
    });
  }

  saveStore();

  res.json({
    success: true,
    result: resultRecord,
  });
});

// ----------------------------------------------------
// ADMIN AUTH & MANAGEMENT ROUTES
// ----------------------------------------------------

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminSecret = process.env.ADMIN_PASSWORD || 'admin123';

  // Only single admin account allowed
  const isValidUser =
    username === 'admin' ||
    username === 'owner' ||
    username === 'rijalhisyam234@gmail.com';

  if (!isValidUser || password !== adminSecret) {
    return res.status(401).json({
      error: 'Autentikasi admin gagal. Kredensial tidak valid.',
    });
  }

  // Generate secure token
  const token = 'adm_' + crypto.randomBytes(32).toString('hex');
  activeAdminTokens.add(token);

  res.json({
    success: true,
    token,
    user: {
      name: 'Owner / Administrator',
      email: 'rijalhisyam234@gmail.com',
      role: 'ADMIN',
    },
  });
});

// Admin Verify Token
app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.split(' ')[1];
  const valid = activeAdminTokens.has(token);

  res.json({
    valid,
    role: valid ? 'ADMIN' : 'USER',
  });
});

// Admin Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeAdminTokens.delete(token);
  }
  res.json({ success: true });
});

// Admin Dashboard Stats
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const distinctUsers = new Set(leaderboardList.map((l) => l.studentName.toLowerCase().trim())).size;
  const totalQuizzes = quizResultsHistory.length;
  const averageScore =
    quizResultsHistory.length > 0
      ? Math.round(
          quizResultsHistory.reduce((acc, curr) => acc + (curr.score || 0), 0) /
            quizResultsHistory.length
        )
      : 85;

  const matematikaCount = questionsList.filter((q) => q.subjectId === 'matematika').length;
  const quranHadisCount = questionsList.filter((q) => q.subjectId === 'quran_hadis').length;
  const seniRupaCount = questionsList.filter((q) => q.subjectId === 'seni_rupa').length;

  res.json({
    totalUsers: distinctUsers || 6,
    totalQuestions: questionsList.length,
    totalQuizzesTaken: totalQuizzes || 23,
    averageScore,
    matematikaCount,
    quranHadisCount,
    seniRupaCount,
    recentActivity: quizResultsHistory.slice(0, 10),
  });
});

// Admin Questions List (All, including inactive)
app.get('/api/admin/questions', requireAdmin, (req, res) => {
  const { subject } = req.query;
  let items = [...questionsList];
  if (subject && typeof subject === 'string' && subject !== 'all') {
    items = items.filter((q) => q.subjectId === subject);
  }
  res.json({
    total: items.length,
    questions: items,
  });
});

// Admin Add Question
app.post('/api/admin/questions', requireAdmin, (req, res) => {
  const {
    subjectId,
    question,
    options,
    correctAnswer,
    explanation,
    indicator,
    topic,
    difficulty = 'medium',
    isActive = true,
  } = req.body;

  // Validation
  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });
  }

  if (!Array.isArray(options) || options.length !== 4 || options.some((opt) => !opt || !opt.trim())) {
    return res.status(400).json({ error: 'Pilihan jawaban A, B, C, dan D wajib diisi lengkap.' });
  }

  if (correctAnswer === undefined || correctAnswer === null || correctAnswer < 0 || correctAnswer > 3) {
    return res.status(400).json({ error: 'Kunci jawaban benar (A, B, C, atau D) wajib ditentukan.' });
  }

  if (!['matematika', 'quran_hadis', 'seni_rupa'].includes(subjectId)) {
    return res.status(400).json({ error: 'Mata pelajaran tidak valid.' });
  }

  const nextId =
    questionsList.length > 0 ? Math.max(...questionsList.map((q) => q.id || 0)) + 1 : 1;

  const newQuestion: Question = {
    id: nextId,
    subjectId,
    indicator: indicator?.trim() || 'Indikator Baru',
    topic: topic?.trim() || 'Umum',
    question: question.trim(),
    options: options.map((opt: string) => opt.trim()),
    correctAnswer: Number(correctAnswer),
    explanation: explanation?.trim() || 'Pembahasan soal belum ditambahkan.',
    difficulty,
    isActive: Boolean(isActive),
  };

  questionsList.unshift(newQuestion);
  saveStore();

  res.status(201).json({
    success: true,
    question: newQuestion,
  });
});

// Admin Edit Question
app.put('/api/admin/questions/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const qIdx = questionsList.findIndex((q) => q.id === id);

  if (qIdx === -1) {
    return res.status(404).json({ error: 'Soal tidak ditemukan.' });
  }

  const {
    subjectId,
    question,
    options,
    correctAnswer,
    explanation,
    indicator,
    topic,
    difficulty,
    isActive,
  } = req.body;

  // Validation
  if (question !== undefined && (!question || !question.trim())) {
    return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });
  }

  if (options !== undefined) {
    if (!Array.isArray(options) || options.length !== 4 || options.some((opt) => !opt || !opt.trim())) {
      return res.status(400).json({ error: 'Pilihan jawaban A, B, C, dan D wajib diisi lengkap.' });
    }
  }

  if (correctAnswer !== undefined) {
    if (correctAnswer < 0 || correctAnswer > 3) {
      return res.status(400).json({ error: 'Kunci jawaban benar harus antara A sampai D.' });
    }
  }

  const prev = questionsList[qIdx];
  questionsList[qIdx] = {
    ...prev,
    subjectId: subjectId || prev.subjectId,
    question: question !== undefined ? question.trim() : prev.question,
    options: options !== undefined ? options.map((opt: string) => opt.trim()) : prev.options,
    correctAnswer: correctAnswer !== undefined ? Number(correctAnswer) : prev.correctAnswer,
    explanation: explanation !== undefined ? explanation.trim() : prev.explanation,
    indicator: indicator !== undefined ? indicator.trim() : prev.indicator,
    topic: topic !== undefined ? topic.trim() : prev.topic,
    difficulty: difficulty || prev.difficulty,
    isActive: isActive !== undefined ? Boolean(isActive) : prev.isActive,
  };

  saveStore();

  res.json({
    success: true,
    question: questionsList[qIdx],
  });
});

// Admin Delete Question
app.delete('/api/admin/questions/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const initialLength = questionsList.length;
  questionsList = questionsList.filter((q) => q.id !== id);

  if (questionsList.length === initialLength) {
    return res.status(404).json({ error: 'Soal tidak ditemukan.' });
  }

  saveStore();
  res.json({ success: true, message: 'Soal berhasil dihapus.' });
});

// Admin Toggle Question Active
app.patch('/api/admin/questions/:id/toggle', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const q = questionsList.find((item) => item.id === id);

  if (!q) {
    return res.status(404).json({ error: 'Soal tidak ditemukan.' });
  }

  q.isActive = q.isActive === false ? true : false;
  saveStore();

  res.json({ success: true, isActive: q.isActive });
});

// Admin Update Config
app.post('/api/admin/config', requireAdmin, (req, res) => {
  const { appName, appDescription, timerMinutes, allowReview } = req.body;

  if (appName) appConfig.appName = appName.trim();
  if (appDescription) appConfig.appDescription = appDescription.trim();
  if (timerMinutes && typeof timerMinutes === 'number' && timerMinutes > 0) {
    appConfig.timerMinutes = timerMinutes;
  }
  if (typeof allowReview === 'boolean') {
    appConfig.allowReview = allowReview;
  }

  saveStore();
  res.json({ success: true, appConfig });
});

// Admin Reset Leaderboard
app.delete('/api/admin/leaderboard', requireAdmin, (req, res) => {
  leaderboardList = [];
  quizResultsHistory = [];
  saveStore();
  res.json({ success: true, message: 'Leaderboard dan riwayat quiz berhasil direset.' });
});

// ----------------------------------------------------
// SERVER START & VITE INTEGRATION
// ----------------------------------------------------

async function startServer() {
  await initStore();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`QUIZ EDUKASI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
