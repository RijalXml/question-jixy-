import { ActiveExamState, ExamResult, SubjectId, UserProfile, AppConfig } from '../types';

const STORAGE_KEYS = {
  THEME: 'quiz_edukasi_theme',
  STUDENT_NAME: 'quiz_edukasi_student_name',
  USER_PROFILE: 'quiz_edukasi_user_profile',
  ACTIVE_EXAM: 'quiz_edukasi_active_exam',
  LAST_RESULT: 'quiz_edukasi_last_result',
  ADMIN_TOKEN: 'quiz_edukasi_admin_token',
  APP_CONFIG: 'quiz_edukasi_app_config',
};

export const getStoredTheme = (): 'dark' | 'light' => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    console.error('Failed to read theme from storage', e);
  }
  return 'light'; // Modern clean Apple-inspired light palette by default
};

export const setStoredTheme = (theme: 'dark' | 'light') => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.error('Failed to save theme to storage', e);
  }
};

export const getStoredStudentName = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEYS.STUDENT_NAME) || '';
  } catch (e) {
    return '';
  }
};

export const setStoredStudentName = (name: string) => {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, name);
  } catch (e) {
    console.error('Failed to save student name to storage', e);
  }
};

export const getStoredUserProfile = (): UserProfile => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse user profile', e);
  }

  // Check legacy student name
  const legacyName = localStorage.getItem(STORAGE_KEYS.STUDENT_NAME) || 'Siswa Berprestasi';

  return {
    name: legacyName,
    avatar: '🎓',
    role: 'USER',
    totalScore: 0,
    xp: 250,
    quizzesCompleted: 0,
    completedSubjects: [],
    history: [],
    lastStudiedMateriId: 'ski-sub-a',
  };
};

export const setStoredUserProfile = (profile: UserProfile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, profile.name);
  } catch (e) {
    console.error('Failed to save user profile', e);
  }
};

export const getStoredAdminToken = (): string | null => {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) || localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
  } catch (e) {
    return null;
  }
};

export const setStoredAdminToken = (token: string | null) => {
  try {
    if (!token) {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    } else {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
    }
  } catch (e) {
    console.error('Failed to save admin token', e);
  }
};

export const getStoredActiveExam = (): ActiveExamState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_EXAM);
    if (!data) return null;
    return JSON.parse(data) as ActiveExamState;
  } catch (e) {
    return null;
  }
};

export const setStoredActiveExam = (state: ActiveExamState | null) => {
  try {
    if (!state) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);
    } else {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(state));
    }
  } catch (e) {
    console.error('Failed to save exam state', e);
  }
};

export const getStoredLastResult = (): ExamResult | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LAST_RESULT);
    if (!data) return null;
    return JSON.parse(data) as ExamResult;
  } catch (e) {
    return null;
  }
};

export const setStoredLastResult = (result: ExamResult | null) => {
  try {
    if (!result) {
      localStorage.removeItem(STORAGE_KEYS.LAST_RESULT);
    } else {
      localStorage.setItem(STORAGE_KEYS.LAST_RESULT, JSON.stringify(result));
    }
  } catch (e) {
    console.error('Failed to save result', e);
  }
};

export const getStoredAppConfig = (): AppConfig => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APP_CONFIG);
    if (data) return JSON.parse(data);
  } catch (e) {}

  return {
    appName: 'EDUKASI LKS',
    appDescription: 'Platform Pembelajaran Modern Berbasis LKS — SKI, Bahasa Inggris, dan Bahasa Jawa.',
    timerMinutes: 30,
    allowReview: true,
  };
};

export const setStoredAppConfig = (config: AppConfig) => {
  try {
    localStorage.setItem(STORAGE_KEYS.APP_CONFIG, JSON.stringify(config));
  } catch (e) {}
};
