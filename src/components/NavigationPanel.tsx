import React, { useState } from 'react';
import { SubjectId, ScreenState, UserProfile } from '../types';
import { LKS_SUBJECTS } from '../data/lksLessons';
import {
  BookOpen,
  Sparkles,
  Award,
  Trophy,
  ChevronRight,
  Search,
  Flame,
  Zap,
  BookMarked
} from 'lucide-react';

interface NavigationPanelProps {
  currentScreen: ScreenState;
  selectedSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  onNavigate: (screen: ScreenState) => void;
  userProfile: UserProfile;
  onOpenProfileModal?: () => void;
  onSearchMateri?: (query: string) => void;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  currentScreen,
  selectedSubject,
  onSelectSubject,
  onNavigate,
  userProfile,
  onOpenProfileModal,
  onSearchMateri,
}) => {
  const [panelSearch, setPanelSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPanelSearch(val);
    if (onSearchMateri) onSearchMateri(val);
  };

  const subjectKeys: SubjectId[] = ['ski', 'bahasa_inggris', 'bahasa_jawa'];

  return (
    <aside
      id="desktop-navigation-panel"
      className="hidden lg:flex flex-col w-72 xl:w-80 h-[calc(100vh-2rem)] my-4 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-sm p-4 overflow-y-auto no-scrollbar transition-all duration-300 select-none"
    >
      {/* 1. macOS Style Window Controls & Branding */}
      <div className="flex items-center justify-between pb-3 px-1 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-400/90 shadow-sm inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-400/90 shadow-sm inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/90 shadow-sm inline-block" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
          <span>LKS Dashboard</span>
        </div>
      </div>

      {/* 2. User Profile Summary Pill */}
      <div
        id="panel-user-profile"
        onClick={onOpenProfileModal}
        className="mt-4 p-3 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer border border-zinc-200/50 dark:border-zinc-700/50 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 dark:from-indigo-500/30 dark:to-violet-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-lg font-bold border border-indigo-200 dark:border-indigo-800/50">
          {userProfile.avatar || '🎓'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
              {userProfile.name || 'Siswa Berprestasi'}
            </h4>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
              {userProfile.role}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
              {userProfile.xp || 250} XP
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-500" />
              7 Hari
            </span>
          </div>
        </div>
      </div>

      {/* 3. Panel Search Input */}
      <div className="mt-4 relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          id="panel-search-input"
          type="text"
          value={panelSearch}
          onChange={handleSearchChange}
          placeholder="Cari materi LKS..."
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* 4. Section: MATA PELAJARAN LKS */}
      <div className="mt-5">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
            Mata Pelajaran
          </span>
          <span className="text-[10px] font-semibold text-zinc-400 px-1.5 py-0.2 rounded-md bg-zinc-100 dark:bg-zinc-800">
            3 LKS
          </span>
        </div>

        <div className="space-y-1">
          {subjectKeys.map((key) => {
            const info = LKS_SUBJECTS[key];
            const isSelected = selectedSubject === key && (currentScreen === 'subject' || currentScreen === 'materi');
            return (
              <button
                key={key}
                id={`panel-subject-btn-${key}`}
                onClick={() => {
                  onSelectSubject(key);
                  onNavigate('subject');
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-md font-medium'
                    : 'hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base flex-shrink-0">{info.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate leading-tight">{info.title}</p>
                    <p className={`text-[10px] truncate ${isSelected ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-400'}`}>
                      {info.chapters.length} Bab • {info.chapters.reduce((a, b) => a + b.subchapters.length, 0)} Materi
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white dark:text-zinc-900' : 'text-zinc-400'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Section: AKTIVITAS & FITUR */}
      <div className="mt-5">
        <div className="px-2 mb-2">
          <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
            Menu Belajar
          </span>
        </div>

        <div className="space-y-1">
          <button
            id="panel-btn-materi"
            onClick={() => onNavigate('subject')}
            className={`w-full flex items-center gap-2.5 p-2.5 rounded-2xl text-left text-xs font-medium transition-all ${
              currentScreen === 'subject' || currentScreen === 'materi'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <BookMarked className="w-4 h-4 text-indigo-500" />
            <span>Materi & Ringkasan LKS</span>
          </button>

          <button
            id="panel-btn-quiz"
            onClick={() => onNavigate('quiz')}
            className={`w-full flex items-center gap-2.5 p-2.5 rounded-2xl text-left text-xs font-medium transition-all ${
              currentScreen === 'quiz'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-500" />
            <span>Kerjakan Quiz & Ujian</span>
          </button>

          <button
            id="panel-btn-tutor"
            onClick={() => onNavigate('tutor')}
            className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left text-xs font-medium transition-all ${
              currentScreen === 'tutor'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>AI Pembimbing LKS</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
              SMART
            </span>
          </button>

          <button
            id="panel-btn-leaderboard"
            onClick={() => onNavigate('leaderboard')}
            className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left text-xs font-medium transition-all ${
              currentScreen === 'leaderboard'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Panggung Skor 100</span>
            </div>
            <span className="text-[10px] font-bold text-amber-500">100+ PTS</span>
          </button>
        </div>
      </div>

      {/* 6. Bottom Micro Card: Kurikulum Standar LKS */}
      <div className="mt-auto pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-100 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
            <span>Standar LKS</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">PTS 2026</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Materi akurat berbasis buku Lembar Kerja Siswa semester genap.
          </p>
        </div>
      </div>
    </aside>
  );
};
