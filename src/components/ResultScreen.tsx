import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
  Trophy,
  Share2,
  Check,
  Printer,
  BarChart3,
} from 'lucide-react';
import { ExamResult } from '../types';
import { UserAvatar } from './UserAvatar';

interface ResultScreenProps {
  result: ExamResult;
  onReview: () => void;
  onRetry: () => void;
  onBackToMenu: () => void;
  onViewLeaderboard?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onReview,
  onRetry,
  onBackToMenu,
  onViewLeaderboard,
}) => {
  const [copied, setCopied] = useState(false);

  // Earned XP: 10 XP per correct answer + 50 bonus if score >= 80
  const earnedXP = result.correctCount * 10 + (result.score >= 80 ? 50 : 0);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sangat Baik':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-800';
      case 'Baik':
        return 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-800';
      case 'Cukup':
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-800';
      default:
        return 'text-zinc-700 bg-zinc-100 border-zinc-200 dark:text-zinc-300 dark:bg-zinc-800 dark:border-zinc-700';
    }
  };

  const handleShare = () => {
    const text = `Saya telah menyelesaikan quiz ${result.subjectTitle} di QUIZ EDUKASI dengan skor ${result.score}/100 (${result.category}) dan meraih +${earnedXP} XP!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-2xl flex-col justify-center px-4 py-8 sm:px-6">
      {/* Celebration Header */}
      <div className="text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900 mb-4">
          <Award className="h-7 w-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
          Ujian Selesai 🎉
        </h1>
        <div className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Evaluasi lembar jawaban telah berhasil dihitung dan diperbarui ke Leaderboard.
        </div>
      </div>

      {/* Main Result Card */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90 transition-all print:border-none print:shadow-none">
        {/* Student & Subject Header Strip */}
        <div className="border-b border-zinc-100 bg-zinc-50/70 p-4 sm:px-6 dark:border-zinc-800/80 dark:bg-zinc-950/40">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <UserAvatar avatar={result.avatar} name={result.studentName} size="xs" />
              <div>
                <span className="text-zinc-600 dark:text-zinc-400 font-mono">Nama: </span>
                <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {result.studentName}
                </strong>
              </div>
            </div>
            <div>
              <span className="text-zinc-600 dark:text-zinc-400 font-mono">Mata Pelajaran: </span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                {result.subjectTitle}
              </strong>
            </div>
          </div>
        </div>

        {/* Primary Score Hero */}
        <div className="p-6 sm:p-8 text-center border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-medium">
            Skor Akhir
          </div>
          <div className="mt-2 flex items-baseline justify-center gap-1 font-mono">
            <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              {result.score}
            </span>
            <span className="text-lg sm:text-xl font-medium text-zinc-600 dark:text-zinc-400">
              / 100
            </span>
          </div>

          {/* Badges: Category + Earned XP */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1 text-xs font-bold font-mono tracking-wide ${getCategoryColor(
                result.category
              )}`}
            >
              <span>Kategori: {result.category}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>+{earnedXP} XP Diperoleh</span>
            </div>
          </div>
        </div>

        {/* Breakdown Grid: Benar, Salah, Tidak Dijawab, Persentase */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-zinc-100 dark:divide-zinc-800/80 text-center">
          <div className="p-4">
            <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-[11px] font-mono font-medium">Benar</span>
            </div>
            <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              {result.correctCount}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-center gap-1 text-rose-600 dark:text-rose-400 mb-1">
              <XCircle className="h-4 w-4" />
              <span className="text-[11px] font-mono font-medium">Salah</span>
            </div>
            <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              {result.incorrectCount}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-center gap-1 text-zinc-600 dark:text-zinc-400 mb-1">
              <HelpCircle className="h-4 w-4" />
              <span className="text-[11px] font-mono font-medium">Tidak dijawab</span>
            </div>
            <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              {result.unansweredCount}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
              <BarChart3 className="h-4 w-4" />
              <span className="text-[11px] font-mono font-medium">Persentase</span>
            </div>
            <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              {result.percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            id="review-answers-btn"
            onClick={onReview}
            type="button"
            className="flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 px-4 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white active:scale-[0.99] transition-all font-mono"
          >
            <BookOpen className="h-4 w-4" />
            <span>Review Pembahasan</span>
          </button>

          <button
            id="retry-test-btn"
            onClick={onRetry}
            type="button"
            className="flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3 px-4 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 active:scale-[0.99] transition-all font-mono"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Ulangi Quiz</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          {onViewLeaderboard && (
            <button
              type="button"
              onClick={onViewLeaderboard}
              className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200 dark:hover:bg-amber-900 transition-colors"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-600" />
              <span>Lihat Leaderboard</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? 'Disalin!' : 'Bagikan Skor'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Cetak Hasil</span>
            </button>

            <button
              id="back-to-menu-btn"
              onClick={onBackToMenu}
              type="button"
              className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>Menu Utama</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
