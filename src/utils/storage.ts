import { ActiveExamState, ExamResult, SubjectId } from '../types';

const STORAGE_KEYS = {
  THEME: 'pts_master_theme',
  STUDENT_NAME: 'pts_master_student_name',
  ACTIVE_EXAM: 'pts_master_active_exam',
  LAST_RESULT: 'pts_master_last_result',
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
  return 'dark'; // modern dark default like Claude Code
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
    console.error('Failed to save student name', e);
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
