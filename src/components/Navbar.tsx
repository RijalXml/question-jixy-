import React from 'react';
import {
  Home,
  BookOpen,
  Trophy,
  User,
  ShieldCheck,
  Clock,
  Sparkles,
  LogOut,
  Orbit,
} from 'lucide-react';
import { ScreenState, UserRole, SpaceThemeMode } from '../types';
import { UserAvatar } from './UserAvatar';

interface NavbarProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  userRole: UserRole;
  userName: string;
  userAvatar: string;
  userXp: number;
  spaceTheme: SpaceThemeMode;
  onToggleSpaceTheme: () => void;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
  onOpenScratchpad?: () => void;
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
  spaceTheme,
  onToggleSpaceTheme,
  onOpenAdminLogin,
  onAdminLogout,
  onOpenScratchpad,
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
    <header className="sticky top-0 z-40 w-full px-3 pt-2.5 pb-1 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-6xl rounded-2xl glass-panel px-3.5 sm:px-5 py-2.5 flex items-center justify-between border border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-5 sm:gap-7">
          <button
            id="brand-logo-btn"
            type="button"
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2.5 text-left focus:outline-hidden"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.6)] transition-all group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.85)] font-orbitron text-xs font-bold">
              <Orbit className="w-5 h-5 animate-spin-slow text-cyan-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-white font-orbitron flex items-center gap-1.5">
                <span>EDUKASI LKS</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-violet-500/30 text-cyan-300 border border-violet-400/40">
                  KOSMIK
                </span>
              </span>
              <span className="text-[10.5px] font-medium text-violet-200/70 font-space tracking-wide">
                IPA • Fikih • PKn
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          {!isQuizActive && (
            <nav className="hidden md:flex items-center gap-1.5 font-space">
              <button
                id="nav-home"
                type="button"
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  currentScreen === 'home' || currentScreen === 'subject'
                    ? 'bg-violet-600/30 text-white border border-violet-400/40 shadow-[0_0_12px_rgba(139,92,246,0.35)]'
                    : 'text-violet-200/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Home className="h-3.5 w-3.5 text-violet-400" />
                <span>Beranda</span>
              </button>

              <button
                id="nav-quiz"
                type="button"
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  currentScreen === 'quiz'
                    ? 'bg-violet-600/30 text-white border border-violet-400/40 shadow-[0_0_12px_rgba(139,92,246,0.35)]'
                    : 'text-violet-200/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                <span>Quiz & Ujian</span>
              </button>

              <button
                id="nav-leaderboard"
                type="button"
                onClick={() => onNavigate('leaderboard')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  currentScreen === 'leaderboard'
                    ? 'bg-amber-500/25 text-amber-200 border border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                    : 'text-violet-200/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Trophy className="h-3.5 w-3.5 text-amber-400" />
                <span>Leaderboard</span>
              </button>

              <button
                id="nav-profile"
                type="button"
                onClick={() => onNavigate('profile')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  currentScreen === 'profile'
                    ? 'bg-violet-600/30 text-white border border-violet-400/40 shadow-[0_0_12px_rgba(139,92,246,0.35)]'
                    : 'text-violet-200/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <User className="h-3.5 w-3.5 text-purple-400" />
                <span>Profil</span>
              </button>

              {onOpenScratchpad && (
                <button
                  id="nav-scratchpad"
                  type="button"
                  onClick={onOpenScratchpad}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono text-amber-300 hover:bg-amber-500/10 transition-all border border-dashed border-amber-400/40"
                  title="Buka Kertas Coretan Kosmik"
                >
                  <span>✎ Kertas Coretan</span>
                </button>
              )}

              {/* ADMIN PANEL: STRICTLY ONLY VISIBLE WHEN USER ROLE IS ADMIN */}
              {userRole === 'ADMIN' && (
                <button
                  id="nav-admin"
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    currentScreen === 'admin'
                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                      : 'text-emerald-300 hover:bg-emerald-500/10'
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
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-xl bg-violet-950/60 text-violet-200 border border-violet-500/30">
                <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                {subjectTitle}
              </span>
            )}
            <div
              className={`flex items-center gap-2 px-3.5 py-1 rounded-xl font-orbitron text-xs font-bold tracking-wider transition-all ${
                isLowTime
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse'
                  : 'bg-violet-950/60 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* INTERACTIVE SPACE THEME TOGGLE (PLANET <-> BLACK HOLE) */}
          <button
            id="space-theme-toggle-btn"
            type="button"
            onClick={onToggleSpaceTheme}
            className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-400/30 bg-violet-950/60 hover:bg-violet-900/60 text-xs font-orbitron font-semibold text-white shadow-[0_0_14px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all active:scale-95"
            title={`Klik untuk beralih ke Mode ${spaceTheme === 'planet' ? 'Black Hole' : 'Planet'}`}
          >
            <span className="text-sm">
              {spaceTheme === 'planet' ? '🪐' : '🕳️'}
            </span>
            <span className="hidden sm:inline text-[11px] text-violet-200">
              {spaceTheme === 'planet' ? 'Mode Planet' : 'Black Hole'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping hidden sm:inline" />
          </button>

          {/* XP Pill */}
          {!isQuizActive && (
            <div
              onClick={() => onNavigate('profile')}
              className="cursor-pointer hidden sm:flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300 font-orbitron shadow-[0_0_10px_rgba(245,158,11,0.25)] hover:scale-105 transition-transform"
              title="Total XP Kosmik Anda"
            >
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>{userXp} XP</span>
            </div>
          )}

          {/* User Avatar & Name Button */}
          {!isQuizActive && (
            <button
              id="user-profile-btn"
              type="button"
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-violet-100 hover:bg-white/10 transition-colors"
            >
              <UserAvatar avatar={userAvatar} name={userName} size="xs" />
              <span className="hidden lg:inline max-w-[110px] truncate font-space font-medium text-white">{userName}</span>
            </button>
          )}

          {/* Admin Role Status Badge or Login Trigger */}
          {userRole === 'ADMIN' ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onNavigate('admin')}
                className="inline-flex items-center gap-1 rounded-xl bg-emerald-500/25 px-2.5 py-1 text-xs font-bold text-emerald-200 border border-emerald-400/50 hover:bg-emerald-500/35 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                title="Buka Panel Admin"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
              <button
                type="button"
                onClick={onAdminLogout}
                className="p-1 text-violet-300 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors"
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
              className="flex items-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/40 transition-all shadow-[0_0_8px_rgba(16,185,129,0.2)]"
              title="Login Administrator"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Bar (Glass Floating Bottom Bar on Mobile) */}
      {!isQuizActive && (
        <div className="flex md:hidden pointer-events-auto mt-2 mx-auto max-w-md rounded-2xl glass-panel px-2 py-1.5 justify-around border border-white/10 text-violet-200">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-space px-2 py-1 rounded-lg ${
              currentScreen === 'home' || currentScreen === 'subject'
                ? 'text-cyan-300 font-bold bg-white/10'
                : 'text-violet-300/70'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Beranda</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-space px-2 py-1 rounded-lg ${
              currentScreen === 'quiz'
                ? 'text-cyan-300 font-bold bg-white/10'
                : 'text-violet-300/70'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Quiz</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('leaderboard')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-space px-2 py-1 rounded-lg ${
              currentScreen === 'leaderboard'
                ? 'text-amber-300 font-bold bg-white/10'
                : 'text-violet-300/70'
            }`}
          >
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>Juara</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-space px-2 py-1 rounded-lg ${
              currentScreen === 'profile'
                ? 'text-violet-300 font-bold bg-white/10'
                : 'text-violet-300/70'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profil</span>
          </button>

          {onOpenScratchpad && (
            <button
              type="button"
              onClick={onOpenScratchpad}
              className="flex flex-col items-center gap-0.5 text-[11px] font-mono text-amber-400 px-2 py-1"
            >
              <span>✎</span>
              <span>Coretan</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
