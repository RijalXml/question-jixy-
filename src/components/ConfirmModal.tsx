import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  totalQuestions: number;
  answeredCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  totalQuestions,
  answeredCount,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const unanswered = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 id="modal-title" className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              {title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Penilaian Tengah Semester
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40 text-xs">
          <div className="flex justify-between py-1 text-zinc-600 dark:text-zinc-400">
            <span>Soal Terjawab:</span>
            <span className="font-semibold font-mono text-zinc-900 dark:text-zinc-100">
              {answeredCount} / {totalQuestions}
            </span>
          </div>
          <div className="flex justify-between py-1 text-zinc-600 dark:text-zinc-400">
            <span>Belum Terjawab:</span>
            <span
              className={`font-semibold font-mono ${
                unanswered > 0
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {unanswered} soal
            </span>
          </div>
        </div>

        {unanswered > 0 && (
          <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
            Perhatian: Masih ada {unanswered} soal yang belum kamu jawab. Jawaban yang kosong akan dihitung salah.
          </p>
        )}

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            id="cancel-submit-btn"
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            Batal
          </button>
          <button
            id="confirm-submit-btn"
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs"
          >
            Kumpulkan
          </button>
        </div>
      </div>
    </div>
  );
};
