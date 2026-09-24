import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Filter,
  Info,
} from 'lucide-react';
import { Question } from '../types';

interface ReviewScreenProps {
  questions: Question[];
  userAnswers: Record<number, number>;
  studentName: string;
  subjectTitle: string;
  onBackToResult: () => void;
  onRetry: () => void;
  onBackToMenu: () => void;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const hasArabic = (text?: string): boolean => {
  return !!text && /[\u0600-\u06FF]/.test(text);
};

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  questions,
  userAnswers,
  studentName,
  subjectTitle,
  onBackToResult,
  onRetry,
  onBackToMenu,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');

  // Compute status for each question
  const analyzedQuestions = questions.map((q) => {
    const userAnswer = userAnswers[q.id];
    const isUnanswered = userAnswer === undefined;
    const isCorrect = !isUnanswered && userAnswer === q.correctAnswer;
    const isIncorrect = !isUnanswered && userAnswer !== q.correctAnswer;

    return {
      ...q,
      userAnswer,
      isUnanswered,
      isCorrect,
      isIncorrect,
    };
  });

  const correctCount = analyzedQuestions.filter((q) => q.isCorrect).length;
  const incorrectCount = analyzedQuestions.filter((q) => q.isIncorrect).length;
  const unansweredCount = analyzedQuestions.filter((q) => q.isUnanswered).length;

  const filteredQuestions = analyzedQuestions.filter((q) => {
    if (filter === 'correct') return q.isCorrect;
    if (filter === 'incorrect') return q.isIncorrect;
    if (filter === 'unanswered') return q.isUnanswered;
    return true;
  });

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-6 sm:px-6 sm:py-8 font-sans select-none relative z-10">
      {/* Top Header Card */}
      <div className="mb-6 rounded-3xl glass-panel border border-white/12 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            id="back-to-result-btn"
            onClick={onBackToResult}
            className="mb-2 inline-flex items-center gap-1.5 text-xs font-space font-semibold text-cyan-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Ringkasan Skor</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-orbitron">
            Review Pembahasan Jawaban Kosmik
          </h1>
          <p className="text-xs text-violet-200/80 mt-1 font-space">
            {subjectTitle} • Penjelajah:{' '}
            <strong className="font-semibold text-cyan-200">{studentName}</strong>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 rounded-2xl glass-panel border border-white/15 px-3.5 py-2 text-xs font-orbitron font-bold text-violet-100 hover:bg-white/10 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ulangi Tes</span>
          </button>
          <button
            onClick={onBackToMenu}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-orbitron font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] active:scale-95 transition-all"
          >
            <span>Menu Utama</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-orbitron font-bold transition-all ${
            filter === 'all'
              ? 'bg-violet-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)] border border-violet-400/40'
              : 'text-violet-300 hover:bg-white/5'
          }`}
        >
          <span>Semua ({questions.length})</span>
        </button>

        <button
          onClick={() => setFilter('correct')}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-orbitron font-bold transition-all ${
            filter === 'correct'
              ? 'bg-emerald-500/30 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.4)] border border-emerald-400/50'
              : 'text-emerald-300/80 hover:bg-emerald-500/10'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Benar ({correctCount})</span>
        </button>

        <button
          onClick={() => setFilter('incorrect')}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-orbitron font-bold transition-all ${
            filter === 'incorrect'
              ? 'bg-rose-500/30 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.4)] border border-rose-400/50'
              : 'text-rose-300/80 hover:bg-rose-500/10'
          }`}
        >
          <XCircle className="h-3.5 w-3.5" />
          <span>Salah ({incorrectCount})</span>
        </button>

        <button
          onClick={() => setFilter('unanswered')}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-orbitron font-bold transition-all ${
            filter === 'unanswered'
              ? 'bg-white/20 text-white border border-white/30'
              : 'text-violet-300/80 hover:bg-white/5'
          }`}
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Kosong ({unansweredCount})</span>
        </button>
      </div>

      {/* Questions Review List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-3xl glass-panel border border-white/10 p-8 text-center text-xs font-space text-violet-300">
            Tidak ada soal dalam kategori filter ini.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            return (
              <div
                key={q.id}
                className="overflow-hidden rounded-3xl glass-panel border border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all"
              >
                {/* Question Header Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron text-xs font-bold text-white">
                      Soal #{q.id}
                    </span>
                    <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-orbitron text-cyan-300">
                      {q.indicator}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {q.isCorrect && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-orbitron font-bold text-emerald-300 border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Jawaban Benar (+1 Poin)
                    </span>
                  )}
                  {q.isIncorrect && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-orbitron font-bold text-rose-300 border border-rose-400/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                      <XCircle className="h-3.5 w-3.5" />
                      Jawaban Salah
                    </span>
                  )}
                  {q.isUnanswered && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-orbitron font-bold text-violet-300 border border-white/15">
                      <HelpCircle className="h-3.5 w-3.5" />
                      Tidak Dijawab
                    </span>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Optional Passage */}
                  {q.passage && (
                    <div className="rounded-2xl glass-panel border border-violet-500/30 bg-violet-950/30 p-4">
                      <div className="mb-1 text-[10px] font-orbitron uppercase tracking-wider text-cyan-300 font-semibold">
                        Kutipan Teks:
                      </div>
                      <p className={`whitespace-pre-line text-violet-100 ${
                        hasArabic(q.passage)
                          ? 'font-arabic text-sm sm:text-base leading-loose'
                          : 'text-xs sm:text-sm leading-relaxed font-space'
                      }`}>
                        {q.passage}
                      </p>
                    </div>
                  )}

                  {/* Question Text */}
                  <div className={`font-medium text-white ${
                    hasArabic(q.question)
                      ? 'font-arabic text-base sm:text-xl leading-loose'
                      : 'text-sm sm:text-base leading-relaxed font-space'
                  }`}>
                    {q.question}
                  </div>

                  {/* Options with Visual States */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const letter = OPTION_LABELS[optIdx];
                      const isCorrect = optIdx === q.correctAnswer;
                      const isUserPick = optIdx === q.userAnswer;
                      const containsArabic = hasArabic(opt);

                      let rowClass = 'border-white/10 bg-white/[0.03] text-violet-200';
                      let badgeClass = 'border-white/15 bg-white/10 text-violet-300';

                      if (isCorrect) {
                        rowClass = 'border-emerald-400/60 bg-emerald-500/20 text-emerald-100 font-medium shadow-[0_0_16px_rgba(16,185,129,0.3)]';
                        badgeClass = 'bg-emerald-400 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.8)]';
                      } else if (isUserPick && !isCorrect) {
                        rowClass = 'border-rose-400/60 bg-rose-500/20 text-rose-100 shadow-[0_0_16px_rgba(244,63,94,0.3)]';
                        badgeClass = 'bg-rose-500 text-white font-bold';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-start sm:items-center justify-between gap-3 rounded-2xl border p-3.5 text-xs sm:text-sm transition-all ${rowClass}`}
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-orbitron text-xs ${badgeClass}`}>
                              {letter}
                            </span>
                            <span className={containsArabic ? 'font-arabic text-sm sm:text-base leading-loose' : 'leading-relaxed font-space'}>
                              {opt}
                            </span>
                          </div>

                          <div className="shrink-0 font-orbitron text-[11px] font-bold">
                            {isCorrect && (
                              <span className="text-emerald-300">
                                ✓ Kunci Benar
                              </span>
                            )}
                            {isUserPick && !isCorrect && (
                              <span className="text-rose-300">
                                ✗ Pilihan Kamu
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="mt-4 rounded-2xl glass-panel border border-violet-400/30 bg-violet-950/40 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-orbitron font-bold text-cyan-300 mb-1">
                      <Info className="h-4 w-4" />
                      <span>Pembahasan Materi & Penjelasan:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-violet-100 leading-relaxed font-space">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
