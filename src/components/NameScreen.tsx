import React, { useState } from 'react';
import { ArrowRight, User, Sparkles, Rocket } from 'lucide-react';

interface NameScreenProps {
  initialName?: string;
  onStart: (name: string) => void;
}

export const NameScreen: React.FC<NameScreenProps> = ({ initialName = '', onStart }) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Silakan masukkan nama kamu sebelum melanjutkan.');
      return;
    }
    setError('');
    onStart(trimmed);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 sm:p-6 select-none relative z-10 font-sans">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all">
          {/* Header Badge */}
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-3 py-1 text-xs font-orbitron font-bold text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <Rocket className="h-3.5 w-3.5 text-cyan-400" />
              <span>MISI SIMULASI KOSMIK</span>
            </div>
            <div className="text-[11px] font-orbitron font-bold text-violet-300">
              LKS GENAP 2026
            </div>
          </div>

          {/* Titles */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-orbitron">
              EDU-QUIZ KOSMIK
            </h1>
            <p className="text-xs sm:text-sm text-cyan-300 font-space font-medium">
              Simulasi Ujian Interaktif Bertema Luar Angkasa
            </p>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-violet-200/80 font-space">
            Jelajahi petualangan sains & pengetahuan pada mata pelajaran IPA, Fikih, dan PKn dengan evaluasi otomatis, penjelasan komprehensif, dan papan peringkat.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="student-name-input"
                className="block text-xs font-orbitron font-bold uppercase tracking-wider text-violet-200 mb-2"
              >
                Nama Penjelajah / Siswa
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-cyan-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="student-name-input"
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Ketik nama kamu di sini..."
                  className={`block w-full rounded-2xl glass-panel border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-violet-400/50 transition-all focus:border-cyan-400 focus:outline-hidden font-space ${
                    error
                      ? 'border-rose-400/80'
                      : 'border-white/15'
                  }`}
                />
              </div>
              {error && (
                <p className="mt-2 text-xs font-space font-medium text-rose-300">
                  {error}
                </p>
              )}
            </div>

            <button
              id="start-btn"
              type="submit"
              className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 py-3.5 px-4 text-xs font-orbitron font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:from-violet-500 hover:to-cyan-400 active:scale-[0.98] transition-all"
            >
              <span>Mulai Petualangan</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-cyan-200" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
