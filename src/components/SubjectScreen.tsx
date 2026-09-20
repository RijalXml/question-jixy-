import React from 'react';
import { ArrowRight, BookCheck, Sparkles, User, CheckCircle2, ChevronRight, Edit3 } from 'lucide-react';
import { SubjectId } from '../types';

interface SubjectScreenProps {
  studentName: string;
  onSelectSubject: (subject: SubjectId) => void;
  onChangeName: () => void;
}

export const SubjectScreen: React.FC<SubjectScreenProps> = ({
  studentName,
  onSelectSubject,
  onChangeName,
}) => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-4xl flex-col justify-center px-4 py-8 sm:px-6 sm:py-12">
      {/* Top Greeting & Student Info */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300">
            <span>SESI LATIHAN</span>
            <span>•</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">SIAP DIKERJAKAN</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
            Pilih Mata Pelajaran
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Halo, <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{studentName}</strong>! Pilih salah satu mata pelajaran untuk memulai latihan PTS.
          </p>
        </div>

        <button
          id="change-name-btn"
          onClick={onChangeName}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-2xs hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>Ganti Nama</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Card 1: Bahasa Indonesia */}
        <div
          id="select-subject-indonesia"
          onClick={() => onSelectSubject('indonesia')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelectSubject('indonesia');
            }
          }}
          className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <div>
            {/* Top Row Flag & Soal Badge */}
            <div className="flex items-center justify-between">
              <span className="text-3xl" role="img" aria-label="Bendera Indonesia">
                🇮🇩
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300">
                40 Soal
              </span>
            </div>

            {/* Subject Title & Description */}
            <h2 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
              Bahasa Indonesia
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Mencakup teks deskripsi, struktur, kebahasaan, tanda baca, huruf kapital, dan puisi rakyat (pantun, gurindam, mantra) sesuai kisi-kisi resmi.
            </p>

            {/* Topic Highlights */}
            <div className="mt-5 space-y-1.5 border-t border-zinc-100 pt-4 dark:border-zinc-800/80 text-[11px] text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Teks Deskripsi & Struktur Spasial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Ejaan Huruf Kapital, Kata Depan & Tanda Koma</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Puisi Rakyat: Pantun, Gurindam & Mantra</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-2">
            <div className="flex w-full items-center justify-between rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white group-hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:group-hover:bg-white transition-colors">
              <span>Mulai Latihan</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Card 2: Bahasa Inggris */}
        <div
          id="select-subject-english"
          onClick={() => onSelectSubject('english')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelectSubject('english');
            }
          }}
          className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <div>
            {/* Top Row Flag & Soal Badge */}
            <div className="flex items-center justify-between">
              <span className="text-3xl" role="img" aria-label="United Kingdom Flag">
                🇬🇧
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300">
                40 Soal
              </span>
            </div>

            {/* Subject Title & Description */}
            <h2 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
              Bahasa Inggris
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Berdasarkan materi Semester 1 Kurikulum Merdeka: About Me, Culinary and Me, dan Home Sweet Home dilengkapi dialog dan reading comprehension.
            </p>

            {/* Topic Highlights */}
            <div className="mt-5 space-y-1.5 border-t border-zinc-100 pt-4 dark:border-zinc-800/80 text-[11px] text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                <span>Chapter 1: Greetings, Intro & Personal Info</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                <span>Chapter 2: Culinary, Food Taste & Simple Present</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                <span>Chapter 3: Rooms, Chores & Prepositions</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-2">
            <div className="flex w-full items-center justify-between rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white group-hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:group-hover:bg-white transition-colors">
              <span>Start Practice</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
