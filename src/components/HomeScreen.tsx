import React from 'react';
import {
  Play,
  Award,
  Sparkles,
  Trophy,
  ArrowRight,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import { SubjectId, UserProfile, Question } from '../types';
import { UserAvatar } from './UserAvatar';

interface HomeScreenProps {
  userProfile: UserProfile;
  questionsMap: Record<SubjectId, Question[]>;
  onStartQuiz: (subjectId: SubjectId) => void;
  onNavigateToLeaderboard: () => void;
  onNavigateToProfile: () => void;
  activeExamSubjectId?: SubjectId | null;
  onResumeExam?: () => void;
}

interface SubjectCardInfo {
  id: SubjectId;
  title: string;
  badge: string;
  icon: string;
  description: string;
  topics: string[];
  colorBorder: string;
  accentBg: string;
}

const SUBJECT_CARDS: SubjectCardInfo[] = [
  {
    id: 'matematika',
    title: 'Matematika',
    badge: 'Semester 1',
    icon: '📐',
    description: 'Bilangan bulat, aljabar, perbandingan, aritmatika sosial, dan bangun datar.',
    topics: ['Aljabar', 'PLSV', 'Bangun Datar', 'Skala & Rasio'],
    colorBorder: 'group-hover:border-zinc-400 dark:group-hover:border-zinc-600',
    accentBg: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
  },
  {
    id: 'quran_hadis',
    title: "Qur'an Hadis",
    badge: 'Semester 1',
    icon: '📖',
    description: "Kedudukan wahyu, Surah Asy-Syams & Al-Lail, tajwid dasar, serta hadis ilmu & niat.",
    topics: ['Surah Pilihan', 'Tajwid Mad', 'Adab Penuntut Ilmu', 'Dalil Naqli'],
    colorBorder: 'group-hover:border-zinc-400 dark:group-hover:border-zinc-600',
    accentBg: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
  },
  {
    id: 'seni_rupa',
    title: 'Seni Rupa',
    badge: 'Semester 1',
    icon: '🎨',
    description: 'Unsur & prinsip seni, teori warna, teknik menggambar, ragam hias nusantara.',
    topics: ['Unsur Seni', 'Teori Warna', 'Ragam Hias', 'Teknik Arsir'],
    colorBorder: 'group-hover:border-zinc-400 dark:group-hover:border-zinc-600',
    accentBg: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userProfile,
  questionsMap,
  onStartQuiz,
  onNavigateToLeaderboard,
  onNavigateToProfile,
  activeExamSubjectId,
  onResumeExam,
}) => {
  // Calculate user progress per subject from history
  const getSubjectStats = (subjectId: SubjectId) => {
    const questions = questionsMap[subjectId] || [];
    const activeQuestionsCount = questions.filter((q) => q.isActive !== false).length || 30;

    const subjectHistory = userProfile.history.filter((h) => h.subjectId === subjectId);
    const completed = subjectHistory.length > 0;
    const bestScore = completed
      ? Math.max(...subjectHistory.map((h) => h.score))
      : null;
    const attempts = subjectHistory.length;

    // Progress percentage: 100% if completed at least once, or based on best score
    const progressPercent = bestScore !== null ? Math.min(100, Math.round(bestScore)) : 0;

    return {
      activeQuestionsCount,
      completed,
      bestScore,
      attempts,
      progressPercent,
    };
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero Section — Minimalist Premium */}
      <div className="mb-10 sm:mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50/90 px-3.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400 shadow-2xs mb-5">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Platform Quiz Interaktif Minimalist Premium</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-mono">
          QUIZ EDUKASI
        </h1>
        <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-sans">
          &ldquo;Belajar • Bermain • Raih Prestasi&rdquo;
        </p>
      </div>

      {/* User Quick Progress Banner */}
      <div className="mb-10 rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={onNavigateToProfile}
              className="group focus:outline-hidden"
              title="Buka profil siswa & ubah foto"
            >
              <UserAvatar
                avatar={userProfile.avatar}
                name={userProfile.name}
                size="lg"
                className="transition-transform group-hover:scale-105 ring-2 ring-zinc-200 dark:ring-zinc-700"
              />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onNavigateToProfile}
                  className="text-left font-semibold text-zinc-900 hover:text-amber-600 dark:text-zinc-100 dark:hover:text-amber-400 transition-colors"
                >
                  <h2 className="text-base font-semibold">
                    {userProfile.name}
                  </h2>
                </button>
                <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 font-mono">
                  Siswa
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Pilih mata pelajaran di bawah untuk menguji pemahaman dan mengumpulkan poin XP.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100 dark:border-zinc-800">
            <div className="text-center sm:text-right">
              <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                Total XP
              </span>
              <span className="text-base font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 justify-center sm:justify-end">
                <Sparkles className="h-3.5 w-3.5" />
                {userProfile.xp}
              </span>
            </div>

            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

            <div className="text-center sm:text-right">
              <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                Quiz Selesai
              </span>
              <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {userProfile.quizzesCompleted}
              </span>
            </div>

            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

            <button
              id="view-leaderboard-btn"
              type="button"
              onClick={onNavigateToLeaderboard}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-500" />
              <span>Leaderboard</span>
            </button>
          </div>
        </div>

        {/* Resume Banner (if an exam is in progress) */}
        {activeExamSubjectId && onResumeExam && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
            <div className="flex items-center gap-2 font-medium">
              <RotateCcw className="h-4 w-4 text-amber-600" />
              <span>
                Ada quiz yang sedang berjalan untuk mata pelajaran{' '}
                <strong>
                  {activeExamSubjectId === 'matematika'
                    ? 'Matematika'
                    : activeExamSubjectId === 'quran_hadis'
                    ? "Qur'an Hadis"
                    : 'Seni Rupa'}
                </strong>
                .
              </span>
            </div>
            <button
              type="button"
              onClick={onResumeExam}
              className="shrink-0 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
            >
              Lanjutkan Quiz
            </button>
          </div>
        )}
      </div>

      {/* 3 Main Subject Cards */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Mata Pelajaran Tersedia
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Silakan pilih modul latihan yang ingin Anda kerjakan hari ini
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBJECT_CARDS.map((subject) => {
            const stats = getSubjectStats(subject.id);

            return (
              <div
                key={subject.id}
                id={`card-${subject.id}`}
                className={`group flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 ${subject.colorBorder}`}
              >
                {/* Card Top: Icon, Title & Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-2xl shadow-2xs group-hover:scale-105 transition-transform">
                      {subject.icon}
                    </div>
                    <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-400">
                      {subject.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                    {subject.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {subject.description}
                  </p>

                  {/* Topic Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {subject.topics.map((t, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Number of Questions, Progress & Action Button */}
                <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
                  {/* Stats Row */}
                  <div className="mb-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {stats.activeQuestionsCount} Soal
                    </span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {stats.completed ? `Skor Terbaik: ${stats.bestScore}` : 'Belum Dicoba'}
                    </span>
                  </div>

                  {/* User Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[10.5px] text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
                      <span>Progress Pengguna</span>
                      <span>{stats.progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-500 ease-out"
                        style={{ width: `${stats.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Button "Mulai Quiz" */}
                  <button
                    id={`start-quiz-btn-${subject.id}`}
                    type="button"
                    onClick={() => onStartQuiz(subject.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-xs font-bold text-white shadow-2xs hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white active:scale-[0.98] transition-all font-mono"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Mulai Quiz</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Highlights Footer */}
      <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/40">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 shadow-2xs text-base">
              ⚡
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Latihan Interaktif & Cepat
              </h4>
              <p className="mt-0.5 text-[11.5px] text-zinc-500 dark:text-zinc-400">
                Pengerjaan 1 soal per layar dengan keyboard shortcut dan palet nomor soal lengkap.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 shadow-2xs text-base">
              🏆
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Leaderboard Harian & XP
              </h4>
              <p className="mt-0.5 text-[11.5px] text-zinc-500 dark:text-zinc-400">
                Kumpulkan poin XP di setiap jawaban benar dan raih posisi teratas di papan peringkat.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 shadow-2xs text-base">
              🔍
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Pembahasan & Kunci Jawaban
              </h4>
              <p className="mt-0.5 text-[11.5px] text-zinc-500 dark:text-zinc-400">
                Review mendalam dengan penjelasan komprehensif setelah menyelesaikan simulasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
