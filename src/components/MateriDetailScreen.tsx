import React from 'react';
import { SubjectId, ScreenState } from '../types';
import { LKS_CHAPTERS_DETAIL, LKS_SUBJECTS } from '../data/lksLessons';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  Lightbulb
} from 'lucide-react';

interface MateriDetailScreenProps {
  subchapterId: string;
  selectedSubject: SubjectId;
  onNavigate: (screen: ScreenState) => void;
  onSelectSubchapter: (subchapterId: string) => void;
}

export const MateriDetailScreen: React.FC<MateriDetailScreenProps> = ({
  subchapterId,
  selectedSubject,
  onNavigate,
  onSelectSubchapter,
}) => {
  const materi = LKS_CHAPTERS_DETAIL[subchapterId] || LKS_CHAPTERS_DETAIL['ski-sub-a'];
  const subjectInfo = LKS_SUBJECTS[selectedSubject];

  // Find all subchapters in current subject for Next/Previous navigation
  const allSubchapters = subjectInfo.chapters.flatMap((c) => c.subchapters);
  const currentIndex = allSubchapters.findIndex((s) => s.id === materi.id);
  const prevSub = currentIndex > 0 ? allSubchapters[currentIndex - 1] : null;
  const nextSub = currentIndex < allSubchapters.length - 1 ? allSubchapters[currentIndex + 1] : null;

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto select-none">
      {/* 1. TOP NAV / BREADCRUMB */}
      <div className="flex items-center justify-between">
        <button
          id="materi-btn-back"
          onClick={() => onNavigate('subject')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-700/60 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Bab</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-400">
            {subjectInfo.title}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            {materi.code}
          </span>
        </div>
      </div>

      {/* 2. MATERI HEADER CARD */}
      <article
        id="materi-content-article"
        className="rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/70 dark:border-zinc-800/80 p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
              {materi.code}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {materi.estimatedReadTime}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {materi.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
            Berdasarkan Buku Lembar Kerja Siswa (LKS) Semester Genap.
          </p>
        </div>

        {/* 3. RINGKASAN INTI LKS */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Ringkasan Inti Materi
            </h3>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {materi.summary}
          </div>
        </section>

        {/* 4. POIN-POIN PENTING */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Poin-Poin Penting untuk Ujian PTS
            </h3>
          </div>
          <div className="space-y-2">
            {materi.keyPoints.map((point: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-zinc-800/60 border border-zinc-200/50 dark:border-zinc-700/50 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-emerald-200/60 dark:border-emerald-800/40">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. KOSAKATA / ISTILAH KUNCI */}
        {materi.vocabOrTerms && materi.vocabOrTerms.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                Istilah & Kosa Kata Penting
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {materi.vocabOrTerms.map((term: string, idx: number) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200 font-medium"
                >
                  {term}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. SMART ACTION ROW */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="materi-btn-tutor"
            onClick={() => onNavigate('tutor')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:hover:bg-purple-900/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-semibold transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tanya AI Tutor tentang Bab Ini</span>
          </button>

          <button
            id="materi-btn-quiz"
            onClick={() => onNavigate('quiz')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span>Uji Pemahaman di Quiz Soal</span>
          </button>
        </div>
      </article>

      {/* 7. PREVIOUS / NEXT SUBCHAPTER NAVIGATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prevSub ? (
          <button
            onClick={() => onSelectSubchapter(prevSub.id)}
            className="p-3.5 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800 text-left hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
          >
            <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 group-hover:text-indigo-600 transition-colors">
              <ChevronLeft className="w-3 h-3" />
              <span>Materi Sebelumnya</span>
            </div>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">
              {prevSub.code}: {prevSub.title}
            </p>
          </button>
        ) : <div />}

        {nextSub ? (
          <button
            onClick={() => onSelectSubchapter(nextSub.id)}
            className="p-3.5 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800 text-right hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
          >
            <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-zinc-400 group-hover:text-indigo-600 transition-colors">
              <span>Materi Selanjutnya</span>
              <ChevronRight className="w-3 h-3" />
            </div>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">
              {nextSub.code}: {nextSub.title}
            </p>
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
