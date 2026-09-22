import React from 'react';
import { ScreenState, SubjectId, UserProfile } from '../types';
import { LKS_SUBJECTS } from '../data/lksLessons';
import {
  Search,
  Sun,
  Moon,
  Flame,
  Zap,
  Menu,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface TopBarProps {
  currentScreen: ScreenState;
  selectedSubject: SubjectId;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
  onOpenMobileMenu?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (screen: ScreenState) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  selectedSubject,
  theme,
  onToggleTheme,
  userProfile,
  onOpenProfile,
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
  onNavigate,
}) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Beranda Belajar';
      case 'subject':
        return LKS_SUBJECTS[selectedSubject]?.title || 'Pelajaran';
      case 'materi':
        return 'Ringkasan Materi LKS';
      case 'quiz':
        return 'Evaluasi & Quiz Soal';
      case 'result':
        return 'Hasil Belajar';
      case 'leaderboard':
        return 'Panggung Kehormatan Skor 100';
      case 'tutor':
        return 'AI Tutor Pendamping LKS';
      case 'admin':
        return 'Panel Administrator';
      default:
        return 'EDUKASI LKS';
    }
  };

  return (
    <header
      id="main-topbar"
      className="w-full flex items-center justify-between px-4 lg:px-6 py-3 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-xs mb-4 select-none"
    >
      {/* Left: Mobile Menu Trigger + Breadcrumb Title */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            id="topbar-mobile-menu-btn"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-semibold text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors hidden sm:inline"
          >
            Dashboard
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 hidden sm:inline" />
          <h1 className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
            {getScreenTitle()}
          </h1>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden md:flex items-center max-w-xs xl:max-w-sm w-full mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            id="topbar-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari materi, bab, kosa kata..."
            className="w-full pl-8 pr-12 py-1.5 text-xs rounded-xl bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded px-1 py-0.5 bg-white/50 dark:bg-zinc-800/50">
            LKS
          </kbd>
        </div>
      </div>

      {/* Right Controls: Stats, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Pill */}
        <div
          id="topbar-streak"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-semibold"
          title="Streak Belajar: 7 Hari berturut-turut"
        >
          <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>7 Hari</span>
        </div>

        {/* XP Pill */}
        <div
          id="topbar-xp"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-amber-600 dark:text-amber-400 text-xs font-semibold"
          title="Total Poin XP Kamu"
        >
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{userProfile.xp || 250} XP</span>
        </div>

        {/* AI Quick Button */}
        <button
          id="topbar-ai-btn"
          onClick={() => onNavigate('tutor')}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-900/40 text-purple-600 dark:text-purple-400 text-xs font-semibold hover:scale-105 active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>AI Tutor</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          id="topbar-theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle dark/light theme"
          className="p-1.5 sm:p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 transition-colors"
          title={theme === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
        </button>

        {/* User Avatar Button */}
        <button
          id="topbar-profile-btn"
          onClick={onOpenProfile}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-transform border border-white/20"
          title="Profil Siswa"
        >
          {userProfile.avatar || '🎓'}
        </button>
      </div>
    </header>
  );
};
