import React, { useState } from 'react';
import { ArrowRight, Terminal, User, Sparkles, BookOpen, Clock } from 'lucide-react';

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
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90 transition-all">
          {/* Header Badge */}
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-mono font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400">
              <Terminal className="h-3.5 w-3.5 text-emerald-500" />
              <span>kelas-7 :: semester-1</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
              Kurikulum Merdeka
            </div>
          </div>

          {/* Titles */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl font-mono">
              PTS MASTER
            </h1>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Latihan PTS Kelas 7
            </p>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Aplikasi latihan interaktif Penilaian Tengah Semester dengan evaluasi otomatis, penjelasan komprehensif, dan simulasi waktu nyata.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="student-name-input"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono mb-2"
              >
                Identitas Siswa
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-600 dark:text-zinc-400">
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
                  placeholder="Masukkan nama kamu"
                  className={`block w-full rounded-xl border bg-zinc-50/50 py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:bg-white focus:outline-none focus:ring-2 dark:bg-zinc-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-950 ${
                    error
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-200 dark:border-rose-800 dark:focus:ring-rose-950'
                      : 'border-zinc-200 focus:border-zinc-400 focus:ring-zinc-200 dark:border-zinc-800 dark:focus:border-zinc-700 dark:focus:ring-zinc-800'
                  }`}
                />
              </div>
              {error && (
                <p className="mt-2 text-xs font-medium text-rose-500 dark:text-rose-400">
                  {error}
                </p>
              )}
            </div>

            <button
              id="start-btn"
              type="submit"
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.99] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm"
            >
              <span>Mulai</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          {/* Quick Info Badges */}
          <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-2 gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
              <span>30 Soal / Mapel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
              <span>Waktu 30 Menit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
