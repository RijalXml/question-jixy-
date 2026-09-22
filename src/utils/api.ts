import { Question, SubjectId, LeaderboardEntry, AdminStats, AppConfig } from '../types';
import { questionsSki } from '../data/ski';
import { questionsBahasaInggris } from '../data/bahasaInggris';
import { questionsBahasaJawa } from '../data/bahasaJawa';

const LOCAL_STORAGE_KEYS = {
  LEADERBOARD: 'edukasi_lks_leaderboard',
  QUESTIONS: 'edukasi_lks_questions',
  CONFIG: 'edukasi_lks_config',
  RESULTS: 'edukasi_lks_results',
  LOCAL_ADMIN_TOKEN: 'edukasi_lks_admin_session',
};

// Initial Seed Questions Map
const DEFAULT_QUESTIONS: Record<SubjectId, Question[]> = {
  ski: questionsSki,
  bahasa_inggris: questionsBahasaInggris,
  bahasa_jawa: questionsBahasaJawa,
};

/**
 * Safely parses response as JSON, verifying content-type first to avoid
 * "Unexpected token 'T', The page could not be found is not valid JSON"
 */
async function safeFetchJson<T>(url: string, options?: RequestInit): Promise<{ ok: boolean; data: T | null; error?: string }> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
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

const MOCK_STUDENT_NAMES = [
  'ahmad fauzi',
  'nabila zahra',
  'rafi pratama',
  'siti nurhaliza',
  'budi santoso',
  'dinda kirana',
  'dimas setiawan',
  'alya putri',
];

export function getLocalLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.LEADERBOARD);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Enforce: ONLY participants with score >= 100 enter the leaderboard
        const cleaned = parsed.filter(
          (e) =>
            e &&
            Number(e.score) >= 100 &&
            !MOCK_STUDENT_NAMES.includes((e.studentName || '').toLowerCase().trim())
        );
        return cleaned;
      }
    }
  } catch (e) {}
  return [];
}

export function saveLocalLeaderboard(entries: LeaderboardEntry[]) {
  try {
    const valid = entries.filter((e) => e && Number(e.score) >= 100);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LEADERBOARD, JSON.stringify(valid));
  } catch (e) {}
}

export function getLocalQuestions(): Record<SubjectId, Question[]> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.QUESTIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.ski && parsed.bahasa_inggris && parsed.bahasa_jawa) {
        // Invalidate stale cache if all answers were 0 (option A)
        const isStaleAllZeros = (parsed.ski || []).length > 0 && (parsed.ski || []).every((q: any) => q.correctAnswer === 0);
        if (!isStaleAllZeros) {
          return parsed;
        }
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
 * Fetch Leaderboard with filtering (Strict score >= 100)
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
    return (result.data.items || []).filter((e) => e && Number(e.score) >= 100);
  }

  // Fallback to local storage
  const local = getLocalLeaderboard();
  let filtered = local.filter((e) => e && Number(e.score) >= 100);

  if (subject !== 'all') {
    filtered = filtered.filter((i) => i.subjectId === subject || i.subjectId === 'all');
  }

  const now = Date.now();
  if (timeframe === 'daily') {
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    filtered = filtered.filter((i) => new Date(i.completedAt).getTime() >= oneDayAgo);
  } else if (timeframe === 'weekly') {
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
    filtered = filtered.filter((i) => new Date(i.completedAt).getTime() >= oneWeekAgo);
  }

  filtered.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.xp - a.xp;
  });

  return filtered;
}

/**
 * Submit Quiz Result (Enforces score >= 100 for leaderboard entry)
 */
export async function apiSubmitQuiz(data: {
  studentName: string;
  avatar?: string;
  subjectId: SubjectId;
  subjectTitle: string;
  totalQuestions: number;
  score: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  percentage: number;
  category: string;
}): Promise<{ ok: boolean; xpEarned: number }> {
  const xpEarned = Math.round(data.correctCount * 10 + (data.score >= 90 ? 100 : data.score >= 75 ? 50 : 20));

  const result = await safeFetchJson<{ success: boolean; result: { xpEarned: number } }>('/api/quiz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  // Also update local storage fallback
  const localLeaderboard = getLocalLeaderboard();
  if (Math.round(data.score) >= 100) {
    const existingIdx = localLeaderboard.findIndex(
      (l) => l.studentName.toLowerCase().trim() === data.studentName.toLowerCase().trim() && l.subjectId === data.subjectId
    );

    if (existingIdx >= 0) {
      localLeaderboard[existingIdx].score = Math.max(localLeaderboard[existingIdx].score, Math.round(data.score));
      localLeaderboard[existingIdx].xp += xpEarned;
      localLeaderboard[existingIdx].quizzesCompleted += 1;
      localLeaderboard[existingIdx].completedAt = new Date().toISOString();
    } else {
      localLeaderboard.push({
        id: 'lead-local-' + Date.now(),
        studentName: data.studentName.trim(),
        avatar: data.avatar || '🎓',
        subjectId: data.subjectId,
        score: Math.round(data.score),
        quizzesCompleted: 1,
        xp: xpEarned + 100,
        completedAt: new Date().toISOString(),
      });
    }
    saveLocalLeaderboard(localLeaderboard);
  }

  if (result.ok && result.data?.result) {
    return { ok: true, xpEarned: result.data.result.xpEarned || xpEarned };
  }

  return { ok: true, xpEarned };
}

/**
 * Admin Login
 */
export async function apiAdminLogin(
  username: string,
  password: string
): Promise<{ ok: boolean; token?: string; user?: any; error?: string }> {
  const result = await safeFetchJson<{ success: boolean; token: string; user: any }>('/api/admin/login', {
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

  const isOwnerUser =
    cleanUser === 'admin' ||
    cleanUser === 'owner' ||
    cleanUser === 'rijal' ||
    cleanUser === 'rijalhisyam234@gmail.com' ||
    cleanUser.includes('rijal') ||
    cleanUser === '';

  const isValidPass =
    cleanPass === 'admin123' ||
    cleanPass === 'admin' ||
    cleanPass === 'pts2026';

  if (isOwnerUser && isValidPass) {
    const fallbackToken = `token-client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(LOCAL_STORAGE_KEYS.LOCAL_ADMIN_TOKEN, fallbackToken);
    return {
      ok: true,
      token: fallbackToken,
      user: {
        name: 'Owner / Administrator',
        email: 'rijalhisyam234@gmail.com',
        role: 'ADMIN',
      },
    };
  }

  return {
    ok: false,
    error: result.error || 'Username atau password admin salah. Coba: admin / admin123',
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

  // Check local fallback & recognized token formats
  const localToken = sessionStorage.getItem(LOCAL_STORAGE_KEYS.LOCAL_ADMIN_TOKEN);
  return token.startsWith('adm_') || token.startsWith('token-client-') || token === localToken;
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

  const skiCount = (questionsMap.ski || []).filter((q) => q.isActive !== false).length;
  const bahasaInggrisCount = (questionsMap.bahasa_inggris || []).filter((q) => q.isActive !== false).length;
  const bahasaJawaCount = (questionsMap.bahasa_jawa || []).filter((q) => q.isActive !== false).length;
  const totalQ = skiCount + bahasaInggrisCount + bahasaJawaCount;

  const totalQuizzes = leaderboard.reduce((acc, curr) => acc + (curr.quizzesCompleted || 1), 0);
  const avgScore = leaderboard.length > 0
    ? Math.round(leaderboard.reduce((acc, curr) => acc + curr.score, 0) / leaderboard.length)
    : 0;

  return {
    totalUsers: leaderboard.length,
    totalQuestions: totalQ,
    totalQuizzesTaken: totalQuizzes,
    averageScore: avgScore,
    skiCount,
    bahasaInggrisCount,
    bahasaJawaCount,
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
