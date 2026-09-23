import React from 'react';
import { SubjectId, ScreenState, UserProfile } from '../types';
import { LKS_SUBJECTS, LKS_CHAPTERS_DETAIL } from '../data/lksLessons';
import {
  BookOpen,
  Award,
  Sparkles,
  Trophy,
  ArrowRight,
  Bookmark,
  ChevronRight,
  TrendingUp,
  FileText,
  RotateCcw,
  Compass,
  Atom,
} from 'lucide-react';
import {
  SketchWashiTape,
  SketchUnderline,
  SketchDraftGrid,
} from './SketchElements';

interface HomeScreenProps {
  onSelectSubject: (sub: SubjectId) => void;
  onNavigate: (screen: ScreenState) => void;
  userProfile: UserProfile;
  onSelectSubchapter?: (subchapterId: string) => void;
  activeExamSubjectId?: SubjectId | null;
  onResumeExam?: () => void;
  onOpenScratchpad?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectSubject,
  onNavigate,
  userProfile,
  onSelectSubchapter,
  activeExamSubjectId,
  onResumeExam,
  onOpenScratchpad,
}) => {
  const subjects: SubjectId[] = ['ipa', 'fikih', 'pkn'];

  // Calculate quick stats across the 3 subjects
  const totalSubchapters = 11 + 10 + 9; // 30 subchapters
  const completedCount = Math.min(totalSubchapters, userProfile.quizzesCompleted * 3 + 5);
  const overallPercentage = Math.round((completedCount / totalSubchapters) * 100);

  // Quick continue subchapter
  const lastSubchapterId = userProfile.lastStudiedMateriId || 'ipa-sub-1a';
  const lastSubchapter = LKS_CHAPTERS_DETAIL[lastSubchapterId] || LKS_CHAPTERS_DETAIL['ipa-sub-1a'];

  return (
    <div className="space-y-7 pb-16 select-none relative z-10 font-sans">
      {/* 0. ACTIVE EXAM RESUME BANNER (IF ACTIVE EXAM EXISTS) */}
      {activeExamSubjectId && onResumeExam && (
        <section
          id="home-active-exam-banner"
          className="relative overflow-hidden rounded-3xl glass-panel border border-amber-400/50 bg-amber-950/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_25px_rgba(245,158,11,0.25)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 animate-pulse border border-amber-400/40">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/50">
                  SIMULASI AKTIF
                </span>
                <span className="text-xs font-bold text-amber-200 font-space">
                  Quiz Belum Diselesaikan
                </span>
              </div>
              <p className="text-xs text-amber-300/80 mt-0.5">
                Kamu memiliki sesi ujian aktif mata pelajaran {LKS_SUBJECTS[activeExamSubjectId]?.title}.
              </p>
            </div>
          </div>

          <button
            onClick={onResumeExam}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-orbitron font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95 transition-all"
          >
            <span>Lanjutkan Mengerjakan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      )}

      {/* 1. HERO GREETING BANNER WITH COSMIC GLASS DESIGN */}
      <section
        id="home-hero-banner"
        className="relative overflow-hidden rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#0d0722]/85 via-[#160b33]/85 to-[#0b102b]/85 backdrop-blur-2xl"
      >
        <SketchDraftGrid className="absolute inset-0 w-full h-full opacity-10" />
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 left-1/4 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-violet-400/30 text-xs font-space font-semibold text-violet-200">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Kurikulum LKS Semester Genap 2026</span>
              <span className="text-[10px] font-orbitron text-amber-300 font-bold">KOSMIK v2.0</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 flex-wrap font-orbitron">
                <span>Halo, {userProfile.name || 'Penjelajah Antariksa'}</span>
                <span className="text-2xl">🚀</span>
              </h2>
              <div className="h-1 w-36 bg-gradient-to-r from-violet-500 via-cyan-400 to-transparent rounded-full mt-2" />
            </div>

            <p className="text-xs sm:text-sm text-violet-200/80 leading-relaxed font-space">
              Jelajahi Lembar Kerja Siswa (LKS) Kosmik: Pelajari fenomena IPA tata surya, kuasai hukum Fikih ibadah, dan pahami norma PKn. Uji kompetensimu melalui 30 simulasi soal berimbang untuk meraih nilai sempurna 100!
            </p>

            {/* Quick Actions inside hero */}
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <button
                onClick={() => onNavigate('subject')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-orbitron font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)] active:scale-95 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                <span>Buka Materi LKS</span>
              </button>

              <button
                onClick={() => onSelectSubject('ipa')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-cyan-400/40 text-cyan-200 text-xs font-space font-semibold hover:bg-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.25)] active:scale-95 transition-all"
              >
                <span>Mulai Quiz IPA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {onOpenScratchpad && (
                <button
                  onClick={onOpenScratchpad}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-amber-400/50 bg-amber-500/10 text-amber-200 text-xs font-mono hover:bg-amber-500/20 transition-all"
                  title="Kertas Coretan & Sketsa Pensil"
                >
                  <span>✎ Kertas Coretan</span>
                </button>
              )}
            </div>
          </div>

          {/* Hero Quick Progress Hologram */}
          <div className="w-full lg:w-72 glass-panel p-4 rounded-2xl border border-white/15 space-y-3 bg-white/5 shadow-inner backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-orbitron">
              <span className="text-violet-300 font-bold flex items-center gap-1.5">
                <Atom className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                Eksplorasi Materi
              </span>
              <span className="text-cyan-300 font-bold">{overallPercentage}%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-center font-orbitron">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-lg font-extrabold text-white">{userProfile.quizzesCompleted}</span>
                <span className="text-[10px] text-violet-300 font-space">Quiz Selesai</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-lg font-extrabold text-amber-300">{userProfile.xp}</span>
                <span className="text-[10px] text-violet-300 font-space">Poin XP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTINUE READING CARD (IF AVAILABLE) */}
      {lastSubchapter && (
        <section
          id="home-continue-card"
          className="relative p-4 sm:p-5 rounded-3xl glass-panel border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-xl shadow-[0_4px_24px_rgba(6,182,212,0.15)] hover:border-cyan-400/50 transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider text-cyan-300 uppercase font-orbitron">
                    SUB {lastSubchapter.code}
                  </span>
                  <span className="text-violet-400">•</span>
                  <span className="text-[11px] text-violet-300/80 font-space">
                    {lastSubchapter.estimatedReadTime || '6 menit'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
                    Lanjutkan Baca
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white font-space mt-1">
                  {lastSubchapter.title}
                </h4>
                <p className="text-xs text-violet-200/70 line-clamp-1 mt-0.5 font-space">
                  {lastSubchapter.summary}
                </p>
              </div>
            </div>

            <button
              id="home-btn-continue"
              onClick={() => {
                if (onSelectSubchapter) {
                  onSelectSubchapter(lastSubchapter.id);
                  onSelectSubject(lastSubchapter.subjectId);
                  onNavigate('materi');
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-orbitron font-bold hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_14px_rgba(6,182,212,0.4)] active:scale-95 transition-all self-start sm:self-center"
            >
              <span>Buka Ringkasan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* 3. PRIMARY MATA PELAJARAN LKS CARDS (IPA, FIKIH, PKN) */}
      <section id="home-subjects-section" className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight font-orbitron flex items-center gap-2">
                <span>Mata Pelajaran LKS</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-cyan-300 border border-violet-400/30 font-space font-normal">
                  3 Mapel Terstruktur
                </span>
              </h3>
            </div>
            <p className="text-xs text-violet-200/70 mt-0.5 font-space">
              Pilih mata pelajaran untuk membaca ringkasan materi interaktif atau memulai quiz simulasi 30 soal seimbang
            </p>
          </div>
          <button
            onClick={() => onNavigate('subject')}
            className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-space transition-colors"
          >
            <span>Lihat Semua Bab</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {subjects.map((subId) => {
            const subjectInfo = LKS_SUBJECTS[subId];
            if (!subjectInfo) return null;
            const chapterCount = subjectInfo.chapters.length;
            const subCount = subjectInfo.chapters.reduce((a, b) => a + b.subchapters.length, 0);

            // Subject theme styling
            const themeConfig = {
              ipa: {
                border: 'border-cyan-500/35 hover:border-cyan-400/70',
                glow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]',
                iconBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]',
                badge: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
                btnGrad: 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500',
                btnGlow: 'shadow-[0_0_14px_rgba(6,182,212,0.35)]',
                tag: 'KOSMIK IPA',
              },
              fikih: {
                border: 'border-emerald-500/35 hover:border-emerald-400/70',
                glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]',
                iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
                badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
                btnGrad: 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500',
                btnGlow: 'shadow-[0_0_14px_rgba(16,185,129,0.35)]',
                tag: 'FIKIH IBADAH',
              },
              pkn: {
                border: 'border-amber-500/35 hover:border-amber-400/70',
                glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]',
                iconBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
                badge: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
                btnGrad: 'from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500',
                btnGlow: 'shadow-[0_0_14px_rgba(245,158,11,0.35)]',
                tag: 'PKN PANCASILA',
              },
            }[subId];

            return (
              <div
                key={subId}
                id={`home-subject-card-${subId}`}
                className={`relative rounded-3xl glass-panel border p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${themeConfig.border} ${themeConfig.glow}`}
              >
                {/* Top Corner Pill */}
                <div className="absolute -top-2.5 right-4 z-10">
                  <span className="text-[10px] font-orbitron font-bold px-2.5 py-0.5 rounded-full bg-zinc-900/90 text-white border border-white/20 shadow-md">
                    {themeConfig.tag}
                  </span>
                </div>

                <div>
                  {/* Card Header: Icon + Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${themeConfig.iconBg}`}>
                      {subjectInfo.icon}
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border font-space ${themeConfig.badge}`}>
                      {chapterCount} Bab • {subCount} Materi
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-base font-bold text-white tracking-tight font-space">
                    {subjectInfo.title}
                  </h4>
                  <p className="text-xs text-violet-200/70 mt-1 line-clamp-2 leading-relaxed font-space">
                    {subjectInfo.description}
                  </p>

                  {/* Chapter Highlights */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 font-space">
                    {subjectInfo.chapters.map((ch) => (
                      <div key={ch.id} className="flex items-center gap-1.5 text-[11px] text-violet-200/80 truncate">
                        <FileText className="w-3 h-3 text-violet-400 flex-shrink-0" />
                        <span className="font-medium truncate">{ch.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-2">
                  <button
                    id={`btn-open-subject-${subId}`}
                    onClick={() => onSelectSubject(subId)}
                    className="flex-1 py-2 px-3 rounded-xl glass-panel border border-white/15 text-violet-100 hover:text-white hover:bg-white/10 text-xs font-space font-medium transition-all text-center"
                  >
                    Buka Bab
                  </button>

                  <button
                    id={`btn-start-quiz-${subId}`}
                    onClick={() => {
                      onSelectSubject(subId);
                      onNavigate('quiz');
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl bg-gradient-to-r ${themeConfig.btnGrad} text-white text-xs font-orbitron font-bold transition-all text-center ${themeConfig.btnGlow} active:scale-95`}
                  >
                    Mulai Quiz
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. LEADERBOARD & PERFORMANCE TEASER (GLASS PANEL) */}
      <section
        id="home-leaderboard-teaser"
        className="rounded-3xl glass-panel border border-amber-400/30 p-5 sm:p-6 bg-amber-950/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0 text-3xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            🏆
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded-full bg-amber-500/25 text-amber-200 border border-amber-400/40">
                PAPAN JUARA 100
              </span>
              <span className="text-xs text-amber-300 font-space">Hanya Skor Sempurna</span>
            </div>
            <h4 className="text-base font-bold text-white font-orbitron">
              Panggung Kehormatan Siswa Terbaik
            </h4>
            <p className="text-xs text-violet-200/70 max-w-xl font-space">
              Jawab 30 butir soal tanpa kesalahan untuk mencatatkan namamu di Papan Juara Kosmik bersama peringkat siswa berprestasi lainnya!
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('leaderboard')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-orbitron font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:from-amber-400 hover:to-orange-400 transition-all active:scale-95 flex-shrink-0"
        >
          <Trophy className="w-4 h-4" />
          <span>Buka Leaderboard</span>
        </button>
      </section>
    </div>
  );
};
