import React from 'react';
import { CheckCircle2, ChevronRight, Edit3 } from 'lucide-react';
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
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col justify-center px-4 py-8 sm:px-6 sm:py-12">
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
            Halo, <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{studentName}</strong>! Pilih salah satu dari 3 mata pelajaran PTS Kelas 7 SMP berikut.
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

      {/* Cards Grid: 3 Subjects */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Card 1: Matematika */}
        <div
          id="select-subject-matematika"
          onClick={() => onSelectSubject('matematika')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelectSubject('matematika');
            }
          }}
          className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <div>
            {/* Top Row Icon & Soal Badge */}
            <div className="flex items-center justify-between">
              <span className="text-3xl" role="img" aria-label="Penggaris Segitiga Matematika">
                📐
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300">
                30 Soal
              </span>
            </div>

            {/* Subject Title & Description */}
            <h2 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
              Matematika
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Materi Kelas 7 SMP: Bilangan bulat & operasi campuran, pecahan & desimal, bentuk aljabar, persamaan linear (PLSV), perbandingan & skala, serta garis, sudut & bangun datar.
            </p>

            {/* Topic Highlights */}
            <div className="mt-5 space-y-1.5 border-t border-zinc-100 pt-4 dark:border-zinc-800/80 text-[11px] text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>Bilangan Bulat & Pecahan Campuran</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>Bentuk Aljabar & Penyelesaian PLSV</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>Perbandingan, Sudut & Bangun Datar</span>
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

        {/* Card 2: Qur'an Hadis */}
        <div
          id="select-subject-quran-hadis"
          onClick={() => onSelectSubject('quran_hadis')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelectSubject('quran_hadis');
            }
          }}
          className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <div>
            {/* Top Row Icon & Soal Badge */}
            <div className="flex items-center justify-between">
              <span className="text-3xl" role="img" aria-label="Kitab Suci Qur'an Hadis">
                📖
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300">
                30 Soal
              </span>
            </div>

            {/* Subject Title & Description */}
            <h2 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
              Qur'an Hadis
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Materi Kelas 7: Kedudukan Al-Qur'an & Hadis, kandungan Surah Asy-Syams dan Al-Lail, hukum tajwid (Alif Lam Syamsiyah/Qamariyah, Mad Thabi'i), serta hadis menuntut ilmu & niat ikhlas.
            </p>

            {/* Topic Highlights */}
            <div className="mt-5 space-y-1.5 border-t border-zinc-100 pt-4 dark:border-zinc-800/80 text-[11px] text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>Kedudukan Al-Qur'an & Hadis Nabi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>Surah Asy-Syams & Surah Al-Lail</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>Tajwid Dasar & Hadis Menuntut Ilmu</span>
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

        {/* Card 3: Seni Rupa */}
        <div
          id="select-subject-seni-rupa"
          onClick={() => onSelectSubject('seni_rupa')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelectSubject('seni_rupa');
            }
          }}
          className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <div>
            {/* Top Row Icon & Soal Badge */}
            <div className="flex items-center justify-between">
              <span className="text-3xl" role="img" aria-label="Palet Seni Rupa">
                🎨
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300">
                30 Soal
              </span>
            </div>

            {/* Subject Title & Description */}
            <h2 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
              Seni Rupa
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Materi Kelas 7 SMP: Unsur seni rupa (garis, bidang, tekstur, gelap-terang), prinsip seni, teori warna primer/sekunder, karya 2D & 3D, menggambar flora fauna alam benda, serta teknik berkarya.
            </p>

            {/* Topic Highlights */}
            <div className="mt-5 space-y-1.5 border-t border-zinc-100 pt-4 dark:border-zinc-800/80 text-[11px] text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Unsur Seni Rupa & Prinsip Komposisi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Teori Warna & Karya Seni 2D/3D</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Ragam Hias & Teknik Gambar (Arsir, Pointilis)</span>
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
      </div>
    </div>
  );
};
