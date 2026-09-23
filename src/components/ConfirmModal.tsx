import React, { useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  totalQuestions?: number;
  answeredCount?: number;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  totalQuestions = 30,
  answeredCount = 0,
  confirmLabel = 'Kumpulkan Ujian',
  cancelLabel = 'Cek Lagi',
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

  const unanswered = Math.max(0, totalQuestions - answeredCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md transition-opacity animate-in fade-in duration-150 select-none">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-sm overflow-hidden rounded-3xl glass-panel border border-white/20 bg-[#070b1a]/95 p-6 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/25 text-amber-300 border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 id="modal-title" className="text-base font-bold text-white font-orbitron">
              {title}
            </h3>
            <p className="text-xs text-violet-200/80 font-space">
              Simulasi Ujian Antariksa
            </p>
          </div>
        </div>

        {message && (
          <p className="mt-3 text-xs text-violet-200 leading-relaxed font-space">
            {message}
          </p>
        )}

        {totalQuestions > 0 && (
          <div className="mt-4 rounded-2xl glass-panel border border-white/10 bg-white/5 p-3.5 text-xs font-space">
            <div className="flex justify-between py-1 text-violet-200">
              <span>Soal Terjawab:</span>
              <span className="font-bold font-orbitron text-cyan-300">
                {answeredCount} / {totalQuestions}
              </span>
            </div>
            <div className="flex justify-between py-1 text-violet-200">
              <span>Belum Terjawab:</span>
              <span
                className={`font-bold font-orbitron ${
                  unanswered > 0
                    ? 'text-amber-300'
                    : 'text-emerald-300'
                }`}
              >
                {unanswered} butir soal
              </span>
            </div>
          </div>
        )}

        {unanswered > 0 && !message && (
          <p className="mt-3 text-xs text-amber-300/90 font-space">
            Perhatian: Masih ada {unanswered} soal yang belum terjawab. Soal kosong akan dihitung bernilai 0.
          </p>
        )}

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            id="cancel-submit-btn"
            type="button"
            onClick={onCancel}
            className="rounded-xl glass-panel border border-white/15 px-4 py-2.5 text-xs font-space text-violet-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            id="confirm-submit-btn"
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-orbitron font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] active:scale-95 transition-all"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
