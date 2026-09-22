import React from 'react';
import { ScreenState, UserRole } from '../types';
import {
  Home,
  BookOpen,
  Sparkles,
  Award,
  Trophy,
  Settings,
  Shield,
  Compass
} from 'lucide-react';

interface SidebarProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  userRole: UserRole;
  onOpenAdminLogin: () => void;
  totalXP: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onOpenAdminLogin,
}) => {
  const navItems = [
    { id: 'home' as ScreenState, label: 'Beranda', icon: Home },
    { id: 'subject' as ScreenState, label: 'Pelajaran', icon: BookOpen },
    { id: 'tutor' as ScreenState, label: 'AI Tutor', icon: Sparkles, badge: 'AI' },
    { id: 'quiz' as ScreenState, label: 'Quiz LKS', icon: Award },
    { id: 'leaderboard' as ScreenState, label: 'Peringkat', icon: Trophy },
  ];

  return (
    <>
      {/* DESKTOP SLIM VERTICAL FLOATING SIDEBAR */}
      <aside
        id="main-sidebar"
        className="hidden md:flex flex-col justify-between items-center w-16 xl:w-18 py-6 my-4 ml-4 rounded-3xl bg-zinc-900/90 dark:bg-zinc-950/90 text-zinc-300 backdrop-blur-2xl border border-white/10 shadow-2xl z-30 transition-all duration-300"
      >
        {/* Top App Mark */}
        <div className="flex flex-col items-center gap-6">
          <button
            id="sidebar-logo-btn"
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
            title="EDUKASI LKS"
          >
            <Compass className="w-5 h-5" />
          </button>

          {/* Navigation Icons List */}
          <nav className="flex flex-col items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id || (item.id === 'subject' && currentScreen === 'materi');
              return (
                <div key={item.id} className="relative group">
                  <button
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => onNavigate(item.id)}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 relative ${
                      isActive
                        ? 'bg-white text-zinc-950 shadow-lg shadow-white/10 font-semibold scale-105'
                        : 'text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 px-1 text-[9px] font-bold rounded-full bg-indigo-500 text-white leading-tight">
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Tooltip on Hover */}
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-zinc-900 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50 border border-white/10">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Admin / Settings */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative group">
            <button
              id="sidebar-admin-btn"
              onClick={() => {
                if (userRole === 'ADMIN') {
                  onNavigate('admin');
                } else {
                  onOpenAdminLogin();
                }
              }}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                currentScreen === 'admin'
                  ? 'bg-amber-400 text-zinc-950 shadow-md font-bold'
                  : 'text-zinc-400 hover:text-amber-400 hover:bg-white/10 active:scale-95'
              }`}
            >
              {userRole === 'ADMIN' ? (
                <Shield className="w-5 h-5 text-amber-400" />
              ) : (
                <Settings className="w-5 h-5" />
              )}
            </button>
            <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-zinc-900 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50 border border-white/10">
              {userRole === 'ADMIN' ? 'Admin Panel' : 'Login Admin'}
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        id="mobile-bottom-bar"
        className="md:hidden fixed bottom-3 inset-x-3 z-50 bg-zinc-900/95 dark:bg-zinc-950/95 text-zinc-300 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl px-2 py-1.5 flex items-center justify-around"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || (item.id === 'subject' && currentScreen === 'materi');
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive ? 'text-white bg-white/15 font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

        <button
          id="mobile-nav-admin"
          onClick={() => (userRole === 'ADMIN' ? onNavigate('admin') : onOpenAdminLogin())}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            currentScreen === 'admin' ? 'text-amber-400 bg-white/15 font-semibold' : 'text-zinc-400'
          }`}
        >
          {userRole === 'ADMIN' ? <Shield className="w-5 h-5 text-amber-400" /> : <Settings className="w-5 h-5" />}
          <span className="text-[10px] mt-0.5 tracking-tight">{userRole === 'ADMIN' ? 'Admin' : 'Login'}</span>
        </button>
      </nav>
    </>
  );
};
