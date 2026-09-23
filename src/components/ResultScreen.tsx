import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
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
        return 'text-emerald-300 bg-emerald-500/20 border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]';
      case 'Baik':
        return 'text-cyan-300 bg-cyan-500/20 border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]';
      case 'Cukup':
        return 'text-amber-300 bg-amber-500/20 border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]';
      default:
        return 'text-violet-300 bg-white/10 border-white/15';
    }
  };

  const handleShare = () => {
    const text = `Saya telah menyelesaikan quiz ${result.subjectTitle} di QUIZ EDUKASI KOSMIK dengan skor ${result.score}/100 (${result.category}) dan meraih +${earnedXP} XP!`;
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
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col justify-center px-4 py-8 sm:px-6 font-sans select-none relative z-10">
      {/* Celebration Header */}
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(139,92,246,0.6)] mb-4 border border-violet-400/40">
          <Award className="h-8 w-8 text-cyan-200" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-orbitron">
          Misi Ujian Selesai! 🎉
        </h1>
        <div className="mt-2 text-xs sm:text-sm text-violet-200/80 font-space">
          Evaluasi lembar jawaban telah dianalisis secara presisi dan diperbarui ke Papan Peringkat.
        </div>
      </div>

      {/* Main Result Card */}
      <div className="mt-6 overflow-hidden rounded-3xl glass-panel border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all">
        {/* Student & Subject Header Strip */}
        <div className="border-b border-white/10 bg-white/5 p-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <UserAvatar avatar={result.avatar} name={result.studentName} size="xs" />
              <div>
                <span className="text-violet-300/80 font-space">Penjelajah: </span>
                <strong className="font-semibold text-white font-space">
                  {result.studentName}
                </strong>
              </div>
            </div>
            <div>
              <span className="text-violet-300/80 font-space">Mata Pelajaran: </span>
              <strong className="font-semibold text-cyan-300 font-space">
                {result.subjectTitle}
              </strong>
            </div>
          </div>
        </div>

        {/* Primary Score Hero */}
        <div className="p-6 sm:p-8 text-center border-b border-white/10">
          <div className="text-xs font-orbitron uppercase tracking-wider text-cyan-300 font-semibold">
            Skor Akhir Simulasi
          </div>
          <div className="mt-2 flex items-baseline justify-center gap-1 font-orbitron">
            <span className="text-5xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              {result.score}
            </span>
            <span className="text-lg sm:text-xl font-bold text-violet-300">
              / 100
            </span>
          </div>

          {/* Badges: Category + Earned XP */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1 text-xs font-bold font-orbitron tracking-wide ${getCategoryColor(
                result.category
              )}`}
            >
              <span>Kategori: {result.category}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-300 font-orbitron shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>+{earnedXP} XP Diperoleh</span>
            </div>
          </div>
        </div>

        {/* Question Breakdown Grid (3 Pillars) */}
        <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10 p-4 text-center font-orbitron">
          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-emerald-300 mb-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Benar</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {result.correctCount}
            </div>
            <div className="text-[10px] text-violet-300 font-space font-medium">butir soal</div>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-rose-300 mb-1">
              <XCircle className="h-3.5 w-3.5" />
              <span>Salah</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {result.incorrectCount}
            </div>
            <div className="text-[10px] text-violet-300 font-space font-medium">butir soal</div>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-violet-300 mb-1">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Kosong</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {result.unansweredCount}
            </div>
            <div className="text-[10px] text-violet-300 font-space font-medium">butir soal</div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              id="btn-review-answers"
              onClick={onReview}
              className="flex-1 w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 py-3 text-xs font-orbitron font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] active:scale-95 transition-all"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Review Pembahasan Soal</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              id="btn-retry-quiz"
              onClick={onRetry}
              className="flex-1 w-full flex items-center justify-center gap-2 rounded-2xl glass-panel border border-white/15 py-3 text-xs font-orbitron font-bold text-violet-100 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
            >
              <RotateCcw className="h-4 w-4 text-cyan-300" />
              <span>Ulangi Ujian</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs font-space">
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 rounded-xl glass-panel border border-white/10 px-3 py-1.5 text-violet-200 hover:text-white transition-colors"
                title="Salin hasil ujian"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Bagikan'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 rounded-xl glass-panel border border-white/10 px-3 py-1.5 text-violet-200 hover:text-white transition-colors"
                title="Cetak Sertifikat Hasil"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Cetak</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {onViewLeaderboard && (
                <button
                  onClick={onViewLeaderboard}
                  className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold"
                >
                  <Trophy className="h-3.5 w-3.5" />
                  <span>Leaderboard</span>
                </button>
              )}

              <button
                onClick={onBackToMenu}
                className="text-violet-300 hover:text-white font-medium"
              >
                Menu Utama →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
