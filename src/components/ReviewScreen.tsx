import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Filter,
  Check,
  X,
  Info,
} from 'lucide-react';
import { Question, SubjectId } from '../types';

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
    <div className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Top Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            id="back-to-result-btn"
            onClick={onBackToResult}
            className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Skor</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
            Review Pembahasan Jawaban
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            {subjectTitle} • Siswa: <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{studentName}</strong>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all font-mono"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Ulangi Tes</span>
          </button>
          <button
            onClick={onBackToMenu}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all font-mono"
          >
            <span>Menu Utama</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium font-mono transition-colors ${
            filter === 'all'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
          }`}
        >
          <span>Semua ({questions.length})</span>
        </button>

        <button
          onClick={() => setFilter('correct')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium font-mono transition-colors ${
            filter === 'correct'
              ? 'bg-emerald-600 text-white'
              : 'text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40'
          }`}
        >
          <Check className="h-3 w-3" />
          <span>✅ Benar ({correctCount})</span>
        </button>

        <button
          onClick={() => setFilter('incorrect')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium font-mono transition-colors ${
            filter === 'incorrect'
              ? 'bg-rose-600 text-white'
              : 'text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40'
          }`}
        >
          <X className="h-3 w-3" />
          <span>❌ Salah ({incorrectCount})</span>
        </button>

        <button
          onClick={() => setFilter('unanswered')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium font-mono transition-colors ${
            filter === 'unanswered'
              ? 'bg-zinc-600 text-white'
              : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
          }`}
        >
          <HelpCircle className="h-3 w-3" />
          <span>⚪ Tidak dijawab ({unansweredCount})</span>
        </button>
      </div>

      {/* Questions Review List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
            Tidak ada soal dalam kategori ini.
          </div>
        ) : (
          filteredQuestions.map((q, index) => {
            return (
              <div
                key={q.id}
                className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900/90 transition-all"
              >
                {/* Question Header Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 bg-zinc-50/70 px-5 py-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      Soal #{q.id}
                    </span>
                    <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-mono text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                      {q.indicator}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {q.isCorrect && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      ✅ Jawaban Benar
                    </span>
                  )}
                  {q.isIncorrect && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-400">
                      <XCircle className="h-3.5 w-3.5" />
                      ❌ Jawaban Salah
                    </span>
                  )}
                  {q.isUnanswered && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      <HelpCircle className="h-3.5 w-3.5" />
                      ⚪ Tidak Dijawab
                    </span>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6">
                  {/* Optional Passage */}
                  {q.passage && (
                    <div className="mb-4 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3.5 dark:border-zinc-800/80 dark:bg-zinc-950/40">
                      <div className="mb-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                        Kutipan Teks:
                      </div>
                      <p className="whitespace-pre-line text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                        {q.passage}
                      </p>
                    </div>
                  )}

                  {/* Question Text */}
                  <div className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed mb-5">
                    {q.question}
                  </div>

                  {/* Options with Visual States */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const letter = OPTION_LABELS[optIdx];
                      const isCorrect = optIdx === q.correctAnswer;
                      const isUserPick = optIdx === q.userAnswer;

                      let rowClass = 'border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300';
                      let badgeClass = 'border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400';

                      if (isCorrect) {
                        rowClass = 'border-emerald-500/80 bg-emerald-50/60 text-emerald-950 dark:border-emerald-500/60 dark:bg-emerald-950/30 dark:text-emerald-200 font-medium';
                        badgeClass = 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950 font-bold';
                      } else if (isUserPick && !isCorrect) {
                        rowClass = 'border-rose-400 bg-rose-50/60 text-rose-950 dark:border-rose-700/60 dark:bg-rose-950/30 dark:text-rose-200';
                        badgeClass = 'bg-rose-600 text-white dark:bg-rose-600';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-start sm:items-center justify-between gap-3 rounded-xl border p-3 text-xs sm:text-sm transition-colors ${rowClass}`}
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs ${badgeClass}`}>
                              {letter}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </div>

                          <div className="shrink-0 font-mono text-[11px] font-semibold">
                            {isCorrect && (
                              <span className="text-emerald-700 dark:text-emerald-400">
                                Kunci Benar
                              </span>
                            )}
                            {isUserPick && !isCorrect && (
                              <span className="text-rose-600 dark:text-rose-400">
                                Pilihan Kamu
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50/90 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60 text-xs">
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                      <Info className="h-3.5 w-3.5 text-zinc-500" />
                      <span>Pembahasan & Penjelasan:</span>
                    </div>
                    <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Back to top / return button */}
      <div className="mt-8 flex justify-center pb-8">
        <button
          onClick={onBackToResult}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-all font-mono"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Halaman Hasil</span>
        </button>
      </div>
    </div>
  );
};
