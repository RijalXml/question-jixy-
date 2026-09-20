import React from 'react';
import { Sun, Moon, Clock, User, BookOpen } from 'lucide-react';
import { SubjectId } from '../types';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  studentName?: string;
  subjectTitle?: string;
  timeRemaining?: number; // seconds
  showTimer?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  studentName,
  subjectTitle,
  timeRemaining,
  showTimer = false,
}) => {
  const formatTime = (seconds?: number) => {
    if (seconds === undefined) return '30:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = (timeRemaining ?? 0) > 0 && (timeRemaining ?? 0) <= 300; // <= 5 minutes

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 transition-colors duration-200">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm font-mono text-xs font-bold tracking-tighter">
            PTS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
              PTS MASTER
            </span>
            <span className="text-[10px] text-zinc-700 dark:text-zinc-400 -mt-0.5">
              Kelas 7 SMP • Semester 1
            </span>
          </div>
        </div>

        {/* Center Live Exam Status (Mobile & Desktop) */}
        {showTimer && (
          <div className="flex items-center gap-2 sm:gap-4">
            {subjectTitle && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                {subjectTitle}
              </span>
            )}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-mono text-xs font-semibold tracking-wider transition-colors ${
                isLowTime
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900 animate-pulse'
                  : 'bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800'
              }`}
              title="Waktu Ujian Tersisa"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        )}

        {/* Right Action: Student Badge & Theme Switch */}
        <div className="flex items-center gap-2">
          {studentName && !showTimer && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
              <User className="w-3 h-3 text-zinc-500" />
              <span className="max-w-[120px] truncate font-medium">{studentName}</span>
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle tema gelap/terang"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
