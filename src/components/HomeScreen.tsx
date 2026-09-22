import React from 'react';
import { SubjectId, ScreenState, UserProfile } from '../types';
import { LKS_SUBJECTS, LKS_CHAPTERS_DETAIL } from '../data/lksLessons';
import {
  BookOpen,
  Award,
  Sparkles,
  Trophy,
  ArrowRight,
  Clock,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  TrendingUp,
  FileText,
  RotateCcw,
  Edit3
} from 'lucide-react';
import {
  SketchBookIllustration,
  SketchTrophyIllustration,
  SketchArrow,
  SketchUnderline,
  SketchWashiTape,
  SketchDraftGrid,
  SketchPencilDoodle
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
  const subjects: SubjectId[] = ['ski', 'bahasa_inggris', 'bahasa_jawa'];

  // Calculate quick stats
  const totalSubchapters = 12 + 10 + 8; // 30
  const completedCount = Math.min(totalSubchapters, userProfile.quizzesCompleted * 3 + 6);
  const overallPercentage = Math.round((completedCount / totalSubchapters) * 100);

  // Quick continue subchapter
  const lastSubchapterId = userProfile.lastStudiedMateriId || 'ski-sub-a';
  const lastSubchapter = LKS_CHAPTERS_DETAIL[lastSubchapterId];

  return (
    <div className="space-y-7 pb-16 select-none">
      {/* 0. ACTIVE EXAM RESUME BANNER (IF ACTIVE EXAM EXISTS) */}
      {activeExamSubjectId && onResumeExam && (
        <section
          id="home-active-exam-banner"
          className="relative overflow-hidden rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-dashed border-amber-400 dark:border-amber-600 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-800 dark:text-amber-300 flex items-center justify-center flex-shrink-0 animate-pulse">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <SketchWashiTape text="UJIAN BERJALAN" color="amber" />
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  Quiz Belum Diselesaikan
                </span>
              </div>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                Kamu memiliki sesi ujian aktif mata pelajaran {LKS_SUBJECTS[activeExamSubjectId]?.title}.
              </p>
            </div>
          </div>

          <button
            onClick={onResumeExam}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shadow-xs active:scale-95 transition-all"
          >
            <span>Lanjutkan Mengerjakan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      )}

      {/* 1. HERO GREETING BANNER WITH UNFINISHED BOOK SKETCH */}
      <section
        id="home-hero-banner"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-white/10"
      >
        {/* Sketch draft background pattern */}
        <SketchDraftGrid className="absolute inset-0 w-full h-full" />
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-zinc-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Kurikulum LKS Semester Genap 2026</span>
              <span className="text-[10px] font-mono text-amber-300 font-normal">✎ draft_wip</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 flex-wrap">
                <span>Halo, {userProfile.name || 'Siswa Berprestasi'}</span>
                <span className="text-2xl">👋</span>
              </h2>
              <SketchUnderline className="text-amber-400/70 w-36 mt-1" />
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              Pelajari materi Lembar Kerja Siswa (LKS) secara terstruktur, buat coretan sketsa rumus di kertas draft, dan buktikan kemampuanmu di Quiz Evaluasi untuk meraih skor sempurna 100.
            </p>

            {/* Quick Actions inside hero */}
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <button
                onClick={() => onNavigate('subject')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-100 shadow-sm active:scale-95 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pelajari Materi LKS</span>
              </button>

              {onOpenScratchpad && (
                <button
                  onClick={onOpenScratchpad}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold backdrop-blur-sm active:scale-95 transition-all"
                >
                  <SketchPencilDoodle className="w-3.5 h-3.5 text-amber-300" />
                  <span>Kertas Coretan & Sketsa</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Hero Side: Unfinished Book Sketch + Progress Ring */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4">
            {/* Unfinished Book Sketch with hand-drawn blueprint aesthetics */}
            <div className="relative p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
              <SketchBookIllustration className="w-24 h-20 text-indigo-300 drop-shadow-sm" />
              <div className="text-left font-mono">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 block font-bold">
                  [SKETSA LKS DRAFT]
                </span>
                <span className="text-xs text-white font-bold block mt-0.5">
                  3 Mata Pelajaran
                </span>
                <span className="text-[10px] text-zinc-400 block">
                  SKI • B.Inggris • B.Jawa
                </span>
              </div>
            </div>

            {/* Quick Progress Ring */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-4 min-w-[220px]">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/20"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-400"
                    strokeDasharray={`${overallPercentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] font-bold text-white">{overallPercentage}%</span>
              </div>
              <div>
                <p className="text-[11px] text-zinc-300 font-medium">Progres Pembelajaran</p>
                <p className="text-xs font-bold text-white mt-0.5">{completedCount}/{totalSubchapters} Materi</p>
                <p className="text-[10px] text-emerald-300 mt-0.5 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3 h-3" /> Siap Ujian PTS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECENT ACTIVITY RESUME (CONTINUE READING) */}
      {lastSubchapter && (
        <section
          id="home-continue-card"
          className="relative p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/60 dark:border-zinc-800/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800/80 transition-all"
        >
          <div className="absolute top-2 right-4 hidden sm:block">
            <SketchWashiTape text="LANJUTKAN BACA" color="blue" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 border border-indigo-100 dark:border-indigo-900/40">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                    {lastSubchapter.code}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {lastSubchapter.estimatedReadTime}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {lastSubchapter.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
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
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm active:scale-95 transition-all self-start sm:self-center"
            >
              <span>Buka Ringkasan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* 3. PRIMARY MATA PELAJARAN LKS CARDS (3 MATA PELAJARAN) */}
      <section id="home-subjects-section" className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Mata Pelajaran LKS
              </h3>
              <SketchWashiTape text="SKETSA 3 MAPEL" color="emerald" />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Pilih mata pelajaran untuk membaca ringkasan materi atau mengerjakan simulasi quiz 30 soal
            </p>
          </div>
          <button
            onClick={() => onNavigate('subject')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua Bab</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {subjects.map((subId) => {
            const subjectInfo = LKS_SUBJECTS[subId];
            const chapterCount = subjectInfo.chapters.length;
            const subCount = subjectInfo.chapters.reduce((a, b) => a + b.subchapters.length, 0);

            // Subject theme accents
            const accentColors = {
              ski: {
                badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40',
                btn: 'hover:border-emerald-300 dark:hover:border-emerald-700',
                iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
                bar: 'bg-emerald-500',
                pct: '75%',
                tapeColor: 'emerald' as const,
                tag: 'SKETSA SKI',
              },
              bahasa_inggris: {
                badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/40',
                btn: 'hover:border-blue-300 dark:hover:border-blue-700',
                iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
                bar: 'bg-blue-500',
                pct: '60%',
                tapeColor: 'blue' as const,
                tag: 'SKETSA INGGRIS',
              },
              bahasa_jawa: {
                badge: 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40',
                btn: 'hover:border-amber-300 dark:hover:border-amber-700',
                iconBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60',
                bar: 'bg-amber-500',
                pct: '80%',
                tapeColor: 'amber' as const,
                tag: 'SKETSA JAWA',
              },
            }[subId];

            return (
              <div
                key={subId}
                id={`home-subject-card-${subId}`}
                className={`relative rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/70 dark:border-zinc-800/80 p-5 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${accentColors.btn}`}
              >
                {/* Washi tape on top right corner */}
                <div className="absolute -top-2.5 right-4 z-10">
                  <SketchWashiTape text={accentColors.tag} color={accentColors.tapeColor} />
                </div>

                <div>
                  {/* Card Header: Icon + Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${accentColors.iconBg}`}>
                      {subjectInfo.icon}
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${accentColors.badge}`}>
                      {chapterCount} Bab • {subCount} Materi
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {subjectInfo.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {subjectInfo.description}
                  </p>

                  {/* Chapter Highlights */}
                  <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800 space-y-1.5">
                    {subjectInfo.chapters.map((ch) => (
                      <div key={ch.id} className="flex items-center gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-300 truncate">
                        <FileText className="w-3 h-3 text-zinc-400 flex-shrink-0" />
                        <span className="font-medium truncate">{ch.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Indicator with sketch blueprint label */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">
                      <span className="font-mono text-[10px]">kelengkapan_draft</span>
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">{accentColors.pct}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${accentColors.bar}`}
                        style={{ width: accentColors.pct }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`home-btn-baca-${subId}`}
                      onClick={() => {
                        onSelectSubject(subId);
                        onNavigate('subject');
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all active:scale-95"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Materi LKS</span>
                    </button>

                    <button
                      id={`home-btn-quiz-${subId}`}
                      onClick={() => {
                        onSelectSubject(subId);
                        onNavigate('quiz');
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold shadow-xs transition-all active:scale-95"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Quiz (30 Soal)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SMART LEARNING SUITE BENTO GRID (WITH UNFINISHED SKETCHES) */}
      <section id="home-bento-section" className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kertas Coretan & Sketsa Card (Replaces AI Tutor, fits user sketch request!) */}
        <div
          id="home-card-scratchpad"
          onClick={() => {
            if (onOpenScratchpad) {
              onOpenScratchpad();
            } else {
              onNavigate('subject');
            }
          }}
          className="relative p-5 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 backdrop-blur-xl border border-dashed border-amber-300 dark:border-amber-800/60 shadow-xs cursor-pointer hover:border-amber-400 dark:hover:border-amber-700 transition-all group overflow-hidden"
        >
          <SketchDraftGrid className="absolute inset-0 w-full h-full opacity-40" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-800 dark:text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform border border-amber-300 dark:border-amber-700">
                <Edit3 className="w-5 h-5" />
              </div>
              <SketchWashiTape text="SKETSA & CORETAN" color="amber" />
            </div>

            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span>Kertas Coretan Siswa</span>
              <span className="text-xs text-amber-600 dark:text-amber-400">✎</span>
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Buka lembar sketsa untuk mencatat rumus, coretan kosakata bahasa, atau corat-coret sebelum ujian.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-800 dark:text-amber-300 group-hover:translate-x-1 transition-transform">
              <span>Buka lembar sketsa sekarang</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Leaderboard Honor Card with Unfinished Trophy Sketch */}
        <div
          id="home-card-hall-of-fame"
          onClick={() => onNavigate('leaderboard')}
          className="relative p-5 rounded-3xl bg-gradient-to-br from-amber-500/5 via-white/70 to-rose-500/5 dark:from-amber-950/20 dark:via-zinc-900/80 dark:to-rose-950/20 backdrop-blur-xl border border-amber-200/40 dark:border-amber-900/30 shadow-xs cursor-pointer hover:border-amber-300 dark:hover:border-amber-800 transition-all group overflow-hidden"
        >
          {/* Subtle unfinished trophy sketch in background */}
          <div className="absolute -right-2 -bottom-2 opacity-15 dark:opacity-20 pointer-events-none">
            <SketchTrophyIllustration className="w-28 h-28 text-amber-600" />
          </div>

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-amber-200 dark:border-amber-800/40">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Panggung Skor 100
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Hanya peserta dengan nilai sempurna (100 poin) yang berhak tercatat di papan kehormatan juara.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Lihat Peringkat Juara</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Study Strategy Tip Card with hand-drawn note style */}
        <div className="relative p-5 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-dashed border-zinc-300 dark:border-zinc-700 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 border border-indigo-200 dark:border-indigo-800/40">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Tips Sukses PTS LKS
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            Baca rangkuman materi 10 menit sebelum mencoba quiz evaluasi 30 butir untuk menguji daya ingatmu.
          </p>
          <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-zinc-400">
            <Clock className="w-3 h-3" />
            <span>Target latihan: 20 menit per hari</span>
          </div>
        </div>
      </section>
    </div>
  );
};
