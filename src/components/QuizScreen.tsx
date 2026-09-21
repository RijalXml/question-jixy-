import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Grid,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  User,
  Check,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, SubjectId } from '../types';
import { ConfirmModal } from './ConfirmModal';

interface QuizScreenProps {
  studentName: string;
  subjectId: SubjectId;
  subjectTitle: string;
  questions: Question[];
  savedAnswers: Record<number, number>;
  initialIndex?: number;
  initialTimeRemaining?: number;
  onAnswerChange: (questionId: number, optionIndex: number | null) => void;
  onSubmitExam: (answers: Record<number, number>) => void;
  onTimeTick: (secondsLeft: number) => void;
  onBackToMenu: () => void;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export const QuizScreen: React.FC<QuizScreenProps> = ({
  studentName,
  subjectId,
  subjectTitle,
  questions,
  savedAnswers,
  initialIndex = 0,
  initialTimeRemaining = 1800,
  onAnswerChange,
  onSubmitExam,
  onTimeTick,
  onBackToMenu,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [answers, setAnswers] = useState<Record<number, number>>(savedAnswers);
  const [timeLeft, setTimeLeft] = useState<number>(initialTimeRemaining);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);
  const [feedbackState, setFeedbackState] = useState<{
    questionId: number;
    optionIndex: number;
    type: 'selected';
  } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex] || questions[0];
  const selectedOption = answers[currentQuestion?.id];

  // Sync state answers with prop if updated
  useEffect(() => {
    setAnswers(savedAnswers);
  }, [savedAnswers]);

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinalSubmit(answers);
          return 0;
        }
        const updated = prev - 1;
        onTimeTick(updated);
        return updated;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [answers, onSubmitExam, onTimeTick]);

  // Keyboard navigation for A, B, C, D and Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitModalOpen) return;

      const key = e.key.toUpperCase();
      if (key === 'A') handleSelectOption(0);
      else if (key === 'B') handleSelectOption(1);
      else if (key === 'C') handleSelectOption(2);
      else if (key === 'D') handleSelectOption(3);
      else if (e.key === 'ArrowRight' && currentIndex < totalQuestions - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, isSubmitModalOpen, currentQuestion?.id]);

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: optionIndex };
    setAnswers(newAnswers);
    onAnswerChange(currentQuestion.id, optionIndex);

    // Light subtle feedback animation
    setFeedbackState({
      questionId: currentQuestion.id,
      optionIndex,
      type: 'selected',
    });

    setTimeout(() => {
      setFeedbackState(null);
    }, 600);
  };

  const handleClearOption = () => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    setAnswers(newAnswers);
    onAnswerChange(currentQuestion.id, null);
  };

  const handleFinalSubmit = (finalAnswers: Record<number, number>) => {
    // Fire light celebratory confetti on submission
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#6366f1', '#f59e0b', '#06b6d4'],
      });
    } catch (e) {}

    onSubmitExam(finalAnswers);
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Format timer
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isTimeCritical = timeLeft <= 300;

  if (!currentQuestion) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-zinc-500">Soal tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-4xl px-4 py-4 sm:px-6 sm:py-6">
      {/* Quiz Top Status Bar */}
      <div className="mb-4 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Student & Subject */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToMenu}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 transition-colors"
              title="Kembali ke Dashboard Utama"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Menu</span>
            </button>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <div className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
              <User className="h-3.5 w-3.5 text-zinc-400" />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{studentName}</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
            <div className="hidden sm:flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-mono">
              <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
              <span>{subjectTitle}</span>
            </div>
          </div>

          {/* Question Index & Live Timer */}
          <div className="flex items-center gap-2.5 font-mono">
            <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              Soal {currentIndex + 1} / {totalQuestions}
            </span>
            <div
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wider ${
                isTimeCritical
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 animate-pulse'
                  : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mb-1">
            <span>Indikator Soal: {currentIndex + 1} / {totalQuestions}</span>
            <span>
              Terjawab: {answeredCount} dari {totalQuestions}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-7 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90 transition-all">
        {/* Indicator / Topic Tag */}
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {currentQuestion.indicator}
          </span>

          <button
            id="toggle-palette-btn"
            type="button"
            onClick={() => setShowQuestionPalette(!showQuestionPalette)}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <Grid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Palet Soal</span>
            <span>({answeredCount}/{totalQuestions})</span>
          </button>
        </div>

        {/* Optional Reading Text / Passage */}
        {currentQuestion.passage && (
          <div className="mb-5 rounded-xl border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <div className="mb-1 text-[10px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold">
              Kutipan Teks / Bacaan:
            </div>
            <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
              {currentQuestion.passage}
            </p>
          </div>
        )}

        {/* Question Text */}
        <div className="text-base sm:text-lg font-semibold leading-relaxed text-zinc-900 dark:text-zinc-100">
          {currentQuestion.question}
        </div>

        {/* Options List */}
        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((optionText, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const letter = OPTION_LABELS[optIdx];
            const isJustClicked =
              feedbackState &&
              feedbackState.questionId === currentQuestion.id &&
              feedbackState.optionIndex === optIdx;

            return (
              <button
                key={optIdx}
                id={`option-${currentQuestion.id}-${letter}`}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`group relative flex w-full items-start gap-3.5 rounded-xl border p-3.5 text-left transition-all duration-200 sm:items-center ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-2xs dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 scale-[1.005]'
                    : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50'
                } ${isJustClicked ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-zinc-900' : ''}`}
              >
                {/* Option Letter Box */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100'
                      : 'border border-zinc-200 bg-zinc-100 text-zinc-600 group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {letter}
                </div>

                {/* Option Text */}
                <span className="flex-1 text-xs sm:text-sm leading-relaxed font-normal">
                  {optionText}
                </span>

                {/* Selected Checkmark / Indicator */}
                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600 animate-in fade-in zoom-in-75 duration-150" />
                )}
              </button>
            );
          })}
        </div>

        {/* Reset Choice Action */}
        {selectedOption !== undefined && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleClearOption}
              className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Hapus pilihan untuk soal ini</span>
            </button>
          </div>
        )}
      </div>

      {/* Question Palette Drawer / Grid (Collapsible) */}
      {showQuestionPalette && (
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in duration-150">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
              Palet Nomor Soal ({totalQuestions} Nomor)
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Terjawab
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                Kosong
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowQuestionPalette(false);
                  }}
                  className={`flex h-9 items-center justify-center rounded-lg font-mono text-xs font-semibold transition-all ${
                    isCurrent ? 'ring-2 ring-zinc-900 dark:ring-zinc-100' : ''
                  } ${
                    isAnswered
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:bg-zinc-800'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pb-8">
        <button
          id="prev-question-btn"
          type="button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
            currentIndex === 0
              ? 'cursor-not-allowed border-zinc-200 text-zinc-300 dark:border-zinc-800 dark:text-zinc-700'
              : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 active:scale-[0.98]'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Sebelumnya</span>
        </button>

        <div className="flex items-center gap-2">
          {currentIndex < totalQuestions - 1 ? (
            <button
              id="next-question-btn"
              type="button"
              onClick={() => setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all font-mono"
            >
              <span>Berikutnya</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : null}

          {/* Submit Exam Button */}
          <button
            id="submit-exam-btn"
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white active:scale-[0.98] transition-all font-mono"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Selesai & Kumpulkan</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isSubmitModalOpen}
        title="Yakin ingin mengumpulkan jawaban?"
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        onCancel={() => setIsSubmitModalOpen(false)}
        onConfirm={() => {
          setIsSubmitModalOpen(false);
          handleFinalSubmit(answers);
        }}
      />
    </div>
  );
};
