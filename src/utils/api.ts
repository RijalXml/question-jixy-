import { Question, SubjectId, LeaderboardEntry, AdminStats, AppConfig } from '../types';
import { questionsMatematika } from '../data/matematika';
import { questionsQuranHadis } from '../data/quranHadis';
import { questionsSeniRupa } from '../data/seniRupa';
import { getStoredAdminToken, setStoredAdminToken } from './storage';

const LOCAL_STORAGE_KEYS = {
  LEADERBOARD: 'quiz_edukasi_local_leaderboard',
  QUESTIONS: 'quiz_edukasi_local_questions',
  CONFIG: 'quiz_edukasi_local_config',
  RESULTS: 'quiz_edukasi_local_results',
  LOCAL_ADMIN_TOKEN: 'quiz_edukasi_admin_session',
};

// Initial Seed Questions Map
const DEFAULT_QUESTIONS: Record<SubjectId, Question[]> = {
  matematika: questionsMatematika,
  quran_hadis: questionsQuranHadis,
  seni_rupa: questionsSeniRupa,
};

// Initial Seed Leaderboard
const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    studentName: 'Ahmad Fauzi',
    avatar: '👨‍🎓',
    subjectId: 'matematika',
    score: 96,
    quizzesCompleted: 5,
    xp: 1480,
    completedAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
  },
  {
    id: 'lead-2',
    studentName: 'Nabila Zahra',
    avatar: '🧕',
    subjectId: 'quran_hadis',
    score: 100,
    quizzesCompleted: 6,
    xp: 1650,
    completedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
  },
  {
    id: 'lead-3',
    studentName: 'Rafi Pratama',
    avatar: '🎨',
    subjectId: 'seni_rupa',
    score: 93,
    quizzesCompleted: 4,
    xp: 1220,
    completedAt: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
  },
  {
    id: 'lead-4',
    studentName: 'Siti Nurhaliza',
    avatar: '⭐',
    subjectId: 'matematika',
    score: 90,
    quizzesCompleted: 3,
    xp: 1100,
    completedAt: new Date(Date.now() - 3600 * 1000 * 36).toISOString(),
  },
  {
    id: 'lead-5',
    studentName: 'Budi Santoso',
    avatar: '💡',
    subjectId: 'quran_hadis',
    score: 87,
    quizzesCompleted: 3,
    xp: 980,
    completedAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
  },
  {
    id: 'lead-6',
    studentName: 'Dinda Kirana',
    avatar: '🎓',
    subjectId: 'seni_rupa',
    score: 83,
    quizzesCompleted: 2,
    xp: 850,
    completedAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
  },
];

/**
 * Safely parses response as JSON, verifying content-type first to avoid
 * "Unexpected token 'T', The page could not be found is not valid JSON"
 */
async function safeFetchJson<T>(url: string, options?: RequestInit): Promise<{ ok: boolean; data: T | null; error?: string }> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      // Backend returned HTML or text (e.g. 404 page or index.html SPA redirect)
      return { ok: false, data: null, error: `Non-JSON response: ${res.status}` };
    }

    const json = await res.json();
    return { ok: res.ok, data: json, error: res.ok ? undefined : json.error || 'Server error' };
  } catch (err: any) {
    return { ok: false, data: null, error: err.message || 'Network request failed' };
  }
}

// ----------------------------------------------------
// LOCAL STORAGE HELPERS FOR CLIENT-SIDE / VERCEL FALLBACK
// ----------------------------------------------------

export function getLocalLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.LEADERBOARD);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return DEFAULT_LEADERBOARD;
}

export function saveLocalLeaderboard(entries: LeaderboardEntry[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LEADERBOARD, JSON.stringify(entries));
  } catch (e) {}
}

export function getLocalQuestions(): Record<SubjectId, Question[]> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.QUESTIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.matematika && parsed.quran_hadis && parsed.seni_rupa) {
        return parsed;
      }
    }
  } catch (e) {}
  return DEFAULT_QUESTIONS;
}

export function saveLocalQuestions(questionsMap: Record<SubjectId, Question[]>) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.QUESTIONS, JSON.stringify(questionsMap));
  } catch (e) {}
}

// ----------------------------------------------------
// API CLIENT WITH AUTOMATIC SEAMLESS FALLBACK
// ----------------------------------------------------

/**
 * Fetch Questions for a Subject
 */
export async function apiGetQuestions(subject: SubjectId): Promise<Question[]> {
  const result = await safeFetchJson<{ questions: Question[] }>(`/api/questions?subject=${subject}`);
  if (result.ok && result.data?.questions && result.data.questions.length > 0) {
    return result.data.questions;
  }
  // Fallback to local storage or bundled dataset
  const localMap = getLocalQuestions();
  return localMap[subject] || DEFAULT_QUESTIONS[subject];
}

/**
 * Fetch Leaderboard with filtering
 */
export async function apiGetLeaderboard(
  subject: SubjectId | 'all' = 'all',
  timeframe: 'all' | 'daily' | 'weekly' = 'all'
): Promise<LeaderboardEntry[]> {
  const params = new URLSearchParams();
  if (subject !== 'all') params.set('subject', subject);
  if (timeframe !== 'all') params.set('timeframe', timeframe);

  const result = await safeFetchJson<{ items: LeaderboardEntry[] }>(`/api/leaderboard?${params.toString()}`);
  if (result.ok && result.data?.items) {
    return result.data.items;
  }

  // Fallback to local leaderboard filter
  const entries = getLocalLeaderboard();
  let filtered = [...entries];

  if (subject !== 'all') {
    filtered = filtered.filter((e) => e.subjectId === subject || e.subjectId === 'all');
  }

  const now = Date.now();
  if (timeframe === 'daily') {
    const oneDayAgo = now - 24 * 3600 * 1000;
    filtered = filtered.filter((e) => new Date(e.completedAt).getTime() >= oneDayAgo);
  } else if (timeframe === 'weekly') {
    const oneWeekAgo = now - 7 * 24 * 3600 * 1000;
    filtered = filtered.filter((e) => new Date(e.completedAt).getTime() >= oneWeekAgo);
  }

  // Sort descending by score, then XP
  filtered.sort((a, b) => b.score - a.score || b.xp - a.xp);
  return filtered;
}

/**
 * Submit Quiz Result
 */
export async function apiSubmitQuiz(data: {
  studentName: string;
  avatar?: string;
  subjectId: SubjectId;
  answers: Record<number, number>;
  score: number;
  correctCount: number;
  totalQuestions: number;
  xp: number;
}): Promise<{ ok: boolean; xpEarned: number }> {
  // Always update local leaderboard first so offline/Vercel is instant
  const currentLeaderboard = getLocalLeaderboard();
  const existingIdx = currentLeaderboard.findIndex(
    (e) => e.studentName.toLowerCase().trim() === data.studentName.toLowerCase().trim()
  );

  const studentAvatar = data.avatar || '🎓';

  if (existingIdx >= 0) {
    const existing = currentLeaderboard[existingIdx];
    currentLeaderboard[existingIdx] = {
      ...existing,
      avatar: data.avatar || existing.avatar || '🎓',
      score: Math.max(existing.score, data.score),
      quizzesCompleted: existing.quizzesCompleted + 1,
      xp: existing.xp + data.xp,
      completedAt: new Date().toISOString(),
      subjectId: data.subjectId,
    };
  } else {
    currentLeaderboard.push({
      id: `lead-user-${Date.now()}`,
      studentName: data.studentName,
      avatar: studentAvatar,
      subjectId: data.subjectId,
      score: data.score,
      quizzesCompleted: 1,
      xp: data.xp,
      completedAt: new Date().toISOString(),
    });
  }

  saveLocalLeaderboard(currentLeaderboard);

  // Try to sync with backend if running
  await safeFetchJson('/api/quiz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      avatar: studentAvatar,
    }),
  });

  return { ok: true, xpEarned: data.xp };
}

/**
 * Admin Login
 */
export async function apiAdminLogin(username: string, password: string): Promise<{
  ok: boolean;
  token?: string;
  user?: { name: string; email: string; role: 'ADMIN' };
  error?: string;
}> {
  // Try backend first
  const result = await safeFetchJson<{
    token: string;
    user: { name: string; email: string; role: 'ADMIN' };
  }>('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (result.ok && result.data?.token) {
    return { ok: true, token: result.data.token, user: result.data.user };
  }

  // Fallback check for offline / Vercel single-admin deployment
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  const isOwnerUser = cleanUser === 'admin' || cleanUser === 'rijalhisyam234@gmail.com';
  const isValidPass = cleanPass === 'admin123' || cleanPass === 'pts2026' || cleanPass === 'admin';

  if (isOwnerUser && isValidPass) {
    const fallbackToken = `token-client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(LOCAL_STORAGE_KEYS.LOCAL_ADMIN_TOKEN, fallbackToken);
    return {
      ok: true,
      token: fallbackToken,
      user: {
        name: 'Administrator',
        email: 'rijalhisyam234@gmail.com',
        role: 'ADMIN',
      },
    };
  }

  return {
    ok: false,
    error: result.error || 'Username atau password admin salah.',
  };
}

/**
 * Admin Verify
 */
export async function apiAdminVerify(token: string): Promise<boolean> {
  if (!token) return false;
  const result = await safeFetchJson<{ valid: boolean }>('/api/admin/verify', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (result.ok && result.data?.valid) return true;

  // Check local fallback
  const localToken = sessionStorage.getItem(LOCAL_STORAGE_KEYS.LOCAL_ADMIN_TOKEN);
  return token.startsWith('token-client-') || token === localToken;
}

/**
 * Admin Get Stats
 */
export async function apiAdminGetStats(token: string): Promise<AdminStats> {
  const result = await safeFetchJson<AdminStats>('/api/admin/stats', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (result.ok && result.data) return result.data;

  // Local fallback calculation
  const questionsMap = getLocalQuestions();
  const leaderboard = getLocalLeaderboard();

  const matCount = (questionsMap.matematika || []).filter((q) => q.isActive !== false).length;
  const qhCount = (questionsMap.quran_hadis || []).filter((q) => q.isActive !== false).length;
  const srCount = (questionsMap.seni_rupa || []).filter((q) => q.isActive !== false).length;
  const totalQ = matCount + qhCount + srCount;

  const totalQuizzes = leaderboard.reduce((acc, curr) => acc + (curr.quizzesCompleted || 1), 0);
  const avgScore = leaderboard.length > 0
    ? Math.round(leaderboard.reduce((acc, curr) => acc + curr.score, 0) / leaderboard.length)
    : 0;

  return {
    totalUsers: leaderboard.length,
    totalQuestions: totalQ,
    totalQuizzesTaken: totalQuizzes,
    averageScore: avgScore,
    matematikaCount: matCount,
    quranHadisCount: qhCount,
    seniRupaCount: srCount,
    recentActivity: leaderboard.slice(0, 5),
  };
}

/**
 * Admin Get Questions
 */
export async function apiAdminGetQuestions(token: string, subject: SubjectId): Promise<Question[]> {
  const result = await safeFetchJson<{ questions: Question[] }>(`/api/admin/questions?subject=${subject}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (result.ok && result.data?.questions) {
    return result.data.questions;
  }

  const localMap = getLocalQuestions();
  return localMap[subject] || [];
}

/**
 * Admin Save Question (Create or Edit)
 */
export async function apiAdminSaveQuestion(
  token: string,
  questionData: Omit<Question, 'id'> & { id?: number }
): Promise<{ ok: boolean; question?: Question; error?: string }> {
  // Try backend first
  if (questionData.id) {
    const res = await safeFetchJson<{ success: boolean; question: Question }>(
      `/api/admin/questions/${questionData.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
      }
    );
    if (res.ok && res.data?.question) {
      return { ok: true, question: res.data.question };
    }
  } else {
    const res = await safeFetchJson<{ success: boolean; question: Question }>('/api/admin/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(questionData),
    });
    if (res.ok && res.data?.question) {
      return { ok: true, question: res.data.question };
    }
  }

  // Fallback to local storage update
  const localMap = getLocalQuestions();
  const subList = localMap[questionData.subjectId] || [];

  if (questionData.id) {
    const idx = subList.findIndex((q) => q.id === questionData.id);
    if (idx >= 0) {
      subList[idx] = { ...subList[idx], ...questionData } as Question;
      localMap[questionData.subjectId] = subList;
      saveLocalQuestions(localMap);
      return { ok: true, question: subList[idx] };
    }
  } else {
    const newId = Math.max(0, ...subList.map((q) => q.id)) + 1;
    const newQ: Question = {
      ...(questionData as Question),
      id: newId,
    };
    subList.push(newQ);
    localMap[questionData.subjectId] = subList;
    saveLocalQuestions(localMap);
    return { ok: true, question: newQ };
  }

  return { ok: false, error: 'Gagal menyimpan soal.' };
}

/**
 * Admin Delete Question
 */
export async function apiAdminDeleteQuestion(token: string, id: number, subject: SubjectId): Promise<boolean> {
  await safeFetchJson(`/api/admin/questions/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const localMap = getLocalQuestions();
  if (localMap[subject]) {
    localMap[subject] = localMap[subject].filter((q) => q.id !== id);
    saveLocalQuestions(localMap);
  }
  return true;
}

/**
 * Admin Toggle Active
 */
export async function apiAdminToggleQuestion(token: string, id: number, subject: SubjectId): Promise<boolean> {
  await safeFetchJson(`/api/admin/questions/${id}/toggle`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });

  const localMap = getLocalQuestions();
  if (localMap[subject]) {
    const q = localMap[subject].find((item) => item.id === id);
    if (q) {
      q.isActive = q.isActive === false ? true : false;
      saveLocalQuestions(localMap);
      return true;
    }
  }
  return false;
}

/**
 * Admin Save Config
 */
export async function apiAdminSaveConfig(token: string, config: Partial<AppConfig>): Promise<boolean> {
  await safeFetchJson('/api/admin/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(config),
  });
  return true;
}

/**
 * Admin Reset Leaderboard
 */
export async function apiAdminResetLeaderboard(token: string): Promise<boolean> {
  await safeFetchJson('/api/admin/leaderboard', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  saveLocalLeaderboard([]);
  return true;
}
