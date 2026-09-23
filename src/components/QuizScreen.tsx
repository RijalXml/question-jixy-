import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Grid,
  RotateCcw,
  CheckCircle2,
  Clock,
  BookOpen,
  Orbit,
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

    // Subtle feedback pulse
    setFeedbackState({
      questionId: currentQuestion.id,
      optionIndex,
    });

    setTimeout(() => {
      setFeedbackState(null);
    }, 500);
  };

  const handleClearOption = () => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    setAnswers(newAnswers);
    onAnswerChange(currentQuestion.id, null);
  };

  const handleFinalSubmit = (finalAnswers: Record<number, number>) => {
    try {
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'],
      });
    } catch {}

    onSubmitExam(finalAnswers);
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const isTimeCritical = timeLeft <= 300; // <= 5 minutes

  const formattedTime = (() => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  })();

  if (!currentQuestion) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center glass-panel rounded-3xl m-6">
        <Orbit className="h-10 w-10 text-cyan-400 animate-spin-slow mb-4" />
        <p className="text-sm font-space text-violet-200">Menyiapkan bank soal simulasi ujian...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-5 sm:px-6 sm:py-8 font-sans select-none relative z-10">
      {/* Top Header Card: Exam Metadata & Timer */}
      <div className="mb-6 rounded-2xl glass-panel border border-white/12 p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToMenu}
              className="rounded-xl glass-panel border border-white/10 p-2 text-violet-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Kembali ke Beranda"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  SIMULASI UJIAN
                </span>
                <span className="text-xs text-violet-300/80 font-space font-medium">
                  {studentName}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-space mt-0.5">
                <BookOpen className="h-4 w-4 text-cyan-400" />
                <span>{subjectTitle}</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-xs font-orbitron font-bold text-cyan-300 glass-panel px-3 py-1 rounded-xl border border-cyan-500/30">
              Soal {currentIndex + 1} / {totalQuestions}
            </span>
            <div
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-orbitron font-bold tracking-wider transition-all ${
                isTimeCritical
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse'
                  : 'glass-panel text-white border border-white/15'
              }`}
            >
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] font-space text-violet-200/80 mb-1">
            <span>Indikator Soal: #{currentIndex + 1}</span>
            <span>
              Terjawab: {answeredCount} dari {totalQuestions}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl glass-panel border border-white/15 p-5 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all">
        {/* Indicator / Topic Tag */}
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-orbitron text-cyan-200">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4]" />
            {currentQuestion.indicator}
          </span>

          <button
            id="toggle-palette-btn"
            type="button"
            onClick={() => setShowQuestionPalette(!showQuestionPalette)}
            className="flex items-center gap-1.5 rounded-xl glass-panel border border-white/15 px-3 py-1 text-xs font-space font-semibold text-violet-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Grid className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Palet Soal</span>
            <span>({answeredCount}/{totalQuestions})</span>
          </button>
        </div>

        {/* Optional Reading Text / Passage */}
        {currentQuestion.passage && (
          <div className="mb-5 rounded-2xl glass-panel border border-violet-500/25 bg-violet-950/25 p-4">
            <div className="mb-1 text-[10px] font-orbitron uppercase tracking-wider text-cyan-300 font-semibold">
              Kutipan Teks / Bacaan:
            </div>
            <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-violet-100 font-space">
              {currentQuestion.passage}
            </p>
          </div>
        )}

        {/* Question Text */}
        <div className="text-base sm:text-lg font-semibold leading-relaxed text-white font-space">
          {currentQuestion.question}
        </div>

        {/* Options List (Glassmorphism 4-Choice State Engine) */}
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
                className={`group relative flex w-full items-start gap-3.5 rounded-2xl p-4 text-left transition-all duration-200 sm:items-center ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600/70 via-indigo-600/70 to-cyan-600/60 border border-cyan-300 text-white shadow-[0_0_24px_rgba(139,92,246,0.6)] scale-[1.01]'
                    : 'bg-white/[0.04] border border-white/10 text-violet-100 hover:border-violet-400/40 hover:bg-violet-950/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                } ${isJustClicked ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#050510]' : ''}`}
              >
                {/* Option Letter Box */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-orbitron text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-cyan-300 text-black shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                      : 'border border-white/15 bg-white/10 text-violet-200 group-hover:border-violet-400/40'
                  }`}
                >
                  {letter}
                </div>

                {/* Option Text */}
                <span className="flex-1 text-xs sm:text-sm leading-relaxed font-space font-normal">
                  {optionText}
                </span>

                {/* Selected Checkmark */}
                {isSelected && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.7)] animate-in fade-in zoom-in-75 duration-150" />
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
              className="inline-flex items-center gap-1 text-[11px] font-space text-violet-300 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Hapus pilihan nomor ini</span>
            </button>
          </div>
        )}
      </div>

      {/* Question Palette Drawer / Grid (Collapsible) */}
      {showQuestionPalette && (
        <div className="mt-4 rounded-3xl glass-panel border border-white/15 p-4 shadow-xl animate-in fade-in duration-200">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-orbitron font-bold text-white">
              Palet Nomor Soal ({totalQuestions} Nomor)
            </div>
            <div className="flex items-center gap-3 text-[11px] font-space text-violet-300">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4]" />
                Terjawab
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-white/20" />
                Kosong
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
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
                  className={`flex h-9 w-full items-center justify-center rounded-xl font-orbitron text-xs font-bold transition-all ${
                    isCurrent
                      ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#050510] font-black'
                      : ''
                  } ${
                    isAnswered
                      ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                      : 'bg-white/5 text-violet-300/60 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Navigation & Submission Buttons */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          id="prev-question-btn"
          type="button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          className="flex items-center gap-1.5 rounded-2xl glass-panel border border-white/15 px-4 py-2.5 text-xs font-space font-semibold text-violet-200 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-all"
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
              className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-orbitron font-bold text-white hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.5)] active:scale-95 transition-all"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              id="submit-exam-trigger-btn"
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-xs font-orbitron font-bold text-white hover:from-emerald-400 hover:to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-95 transition-all"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Selesai & Kumpulkan</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal to Submit */}
      <ConfirmModal
        isOpen={isSubmitModalOpen}
        title="Kumpulkan Lembar Jawaban?"
        message={`Kamu telah menjawab ${answeredCount} dari ${totalQuestions} soal. Masih ada ${unansweredCount} butir soal yang belum dijawab. Yakin ingin mengakhiri dan melihat perolehan skor?`}
        confirmLabel="Ya, Kumpulkan Sekarang"
        cancelLabel="Kembali Mengerjakan"
        onConfirm={() => {
          setIsSubmitModalOpen(false);
          handleFinalSubmit(answers);
        }}
        onCancel={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
};
