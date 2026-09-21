import React from 'react';
import {
  Home,
  BookOpen,
  Trophy,
  User,
  ShieldCheck,
  Sun,
  Moon,
  Clock,
  Sparkles,
  KeyRound,
  LogOut,
} from 'lucide-react';
import { ScreenState, UserRole } from '../types';

interface NavbarProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  userRole: UserRole;
  userName: string;
  userAvatar: string;
  userXp: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
  // Active quiz props (if on quiz screen)
  isQuizActive?: boolean;
  timeRemaining?: number;
  subjectTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  userName,
  userAvatar,
  userXp,
  theme,
  onToggleTheme,
  onOpenAdminLogin,
  onAdminLogout,
  isQuizActive = false,
  timeRemaining,
  subjectTitle,
}) => {
  const formatTime = (seconds?: number) => {
    if (seconds === undefined) return '30:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = (timeRemaining ?? 0) > 0 && (timeRemaining ?? 0) <= 300;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <button
            id="brand-logo-btn"
            type="button"
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2.5 text-left focus:outline-hidden"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs transition-transform group-hover:scale-105 font-mono text-xs font-bold">
              QE
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
                QUIZ EDUKASI
              </span>
              <span className="text-[10.5px] font-medium text-zinc-500 dark:text-zinc-400">
                Belajar • Bermain • Prestasi
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          {!isQuizActive && (
            <nav className="hidden md:flex items-center gap-1 font-sans">
              <button
                id="nav-home"
                type="button"
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  currentScreen === 'home' || currentScreen === 'subject'
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200'
                }`}
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </button>

              <button
                id="nav-quiz"
                type="button"
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  currentScreen === 'quiz'
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Quiz</span>
              </button>

              <button
                id="nav-leaderboard"
                type="button"
                onClick={() => onNavigate('leaderboard')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  currentScreen === 'leaderboard'
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200'
                }`}
              >
                <Trophy className="h-3.5 w-3.5 text-amber-500" />
                <span>Leaderboard</span>
              </button>

              <button
                id="nav-profile"
                type="button"
                onClick={() => onNavigate('profile')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  currentScreen === 'profile'
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200'
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>Profile</span>
              </button>

              {/* ADMIN PANEL: STRICTLY ONLY VISIBLE WHEN USER ROLE IS ADMIN */}
              {userRole === 'ADMIN' && (
                <button
                  id="nav-admin"
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    currentScreen === 'admin'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800 font-semibold'
                      : 'text-emerald-700 hover:bg-emerald-50/70 dark:text-emerald-400 dark:hover:bg-emerald-950/30'
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Admin Panel</span>
                </button>
              )}
            </nav>
          )}
        </div>

        {/* Live Quiz Indicator in Navbar (if in quiz) */}
        {isQuizActive && (
          <div className="flex items-center gap-2 sm:gap-4">
            {subjectTitle && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
                {subjectTitle}
              </span>
            )}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-mono text-xs font-semibold tracking-wider transition-colors ${
                isLowTime
                  ? 'bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-900 animate-pulse'
                  : 'bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP Pill */}
          {!isQuizActive && (
            <div
              onClick={() => onNavigate('profile')}
              className="cursor-pointer hidden sm:flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50/70 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300 font-mono transition-transform hover:scale-105"
              title="Total XP Anda"
            >
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>{userXp} XP</span>
            </div>
          )}

          {/* User Avatar & Name Button */}
          {!isQuizActive && (
            <button
              id="user-profile-btn"
              type="button"
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className="text-sm">{userAvatar}</span>
              <span className="hidden lg:inline max-w-[110px] truncate font-medium">{userName}</span>
            </button>
          )}

          {/* Admin Role Status Badge or Login Trigger */}
          {userRole === 'ADMIN' ? (
            <div className="hidden sm:flex items-center gap-1">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="h-3 w-3" />
                ADMIN
              </span>
              <button
                type="button"
                onClick={onAdminLogout}
                className="p-1 text-zinc-400 hover:text-rose-500 transition-colors"
                title="Keluar dari Admin"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="open-admin-login-btn"
              type="button"
              onClick={onOpenAdminLogin}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Admin Login (Khusus Pemilik)"
              aria-label="Admin Login"
            >
              <KeyRound className="h-4 w-4" />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onToggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      {!isQuizActive && (
        <div className="flex md:hidden border-t border-zinc-100 bg-zinc-50/60 dark:border-zinc-800/60 dark:bg-zinc-900/60 px-4 py-2 justify-around">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
              currentScreen === 'home' || currentScreen === 'subject'
                ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
              currentScreen === 'quiz'
                ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Quiz</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('leaderboard')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
              currentScreen === 'leaderboard'
                ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>Leaderboard</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
              currentScreen === 'profile'
                ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </button>

          {userRole === 'ADMIN' && (
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className={`flex flex-col items-center gap-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
