import React from 'react';
import { SubjectId, ScreenState } from '../types';
import { LKS_CHAPTERS_DETAIL, LKS_SUBJECTS } from '../data/lksLessons';
import {
  ArrowLeft,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';

interface MateriDetailScreenProps {
  subchapterId: string;
  selectedSubject: SubjectId;
  onNavigate: (screen: ScreenState) => void;
  onSelectSubchapter: (subchapterId: string) => void;
  onOpenScratchpad?: () => void;
}

export const MateriDetailScreen: React.FC<MateriDetailScreenProps> = ({
  subchapterId,
  selectedSubject,
  onNavigate,
  onSelectSubchapter,
  onOpenScratchpad,
}) => {
  const materi = LKS_CHAPTERS_DETAIL[subchapterId] || LKS_CHAPTERS_DETAIL['taaruf-sub-1a'];
  const subjectInfo = LKS_SUBJECTS[selectedSubject] || LKS_SUBJECTS['taaruf'];

  // Find all subchapters in current subject for Next/Previous navigation
  const allSubchapters = subjectInfo.chapters.flatMap((c) => c.subchapters);
  const currentIndex = allSubchapters.findIndex((s) => s.id === materi.id);
  const prevSub = currentIndex > 0 ? allSubchapters[currentIndex - 1] : null;
  const nextSub = currentIndex < allSubchapters.length - 1 ? allSubchapters[currentIndex + 1] : null;

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto select-none relative z-10 font-sans">
      {/* 1. TOP NAV / BREADCRUMB */}
      <div className="flex items-center justify-between">
        <button
          id="materi-btn-back"
          onClick={() => onNavigate('subject')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl glass-panel border border-white/15 text-xs font-space font-semibold text-violet-200 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-300" />
          <span>Kembali ke Daftar Bab</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-space text-violet-300">
            {subjectInfo.name}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-xs font-orbitron font-bold text-cyan-300 glass-panel px-2 py-0.5 rounded-lg border border-cyan-400/40">
            Sub {materi.code}
          </span>
        </div>
      </div>

      {/* 2. MATERI HEADER CARD */}
      <article
        id="materi-content-article"
        className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-6"
      >
        <div className="border-b border-white/10 pb-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-orbitron font-bold text-violet-300">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
              Subbab {materi.code}
            </span>
            <span className="flex items-center gap-1 text-violet-300/80 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {materi.readTime || materi.page || '5 menit'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-orbitron">
            {materi.title}
          </h2>
          <p className="text-xs sm:text-sm text-violet-200/80 leading-relaxed font-space">
            Ringkasan kurikulum Lembar Kerja Siswa (LKS) Bahasa Arab Kelas 7 SMP/MTs.
          </p>
        </div>

        {/* 3. RINGKASAN INTI LKS */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-orbitron font-bold text-cyan-300 uppercase tracking-wider">
              Ringkasan Inti Materi
            </h3>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-white/[0.03] text-xs sm:text-sm text-violet-100 leading-relaxed font-space">
            {materi.summary}
          </div>
        </section>

        {/* 4. POIN-POIN PENTING */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-orbitron font-bold text-emerald-300 uppercase tracking-wider">
              Poin-Poin Penting untuk Ujian PTS / Simulasi
            </h3>
          </div>
          <div className="space-y-2 font-space">
            {materi.keyPoints.map((point: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl glass-panel border border-white/10 bg-white/[0.03] text-xs sm:text-sm text-violet-100"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-orbitron font-bold text-xs flex items-center justify-center flex-shrink-0 border border-emerald-400/40">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. KOSAKATA / ISTILAH KUNCI */}
        {materi.vocabulary && materi.vocabulary.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-orbitron font-bold text-amber-300 uppercase tracking-wider">
                Mufrodat & Istilah Kunci
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-space">
              {materi.vocabulary.map((v, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl glass-panel border border-amber-400/30 bg-amber-950/20 flex items-center justify-between gap-3 text-xs"
                >
                  <span className="font-arabic text-base text-amber-200 font-bold">{v.term}</span>
                  <span className="text-violet-200/90 text-right">{v.meaning}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tips Praktis */}
        {materi.practicalTips && (
          <div className="p-4 rounded-2xl glass-panel border border-cyan-400/30 bg-cyan-950/20 flex items-start gap-3 text-xs font-space">
            <span className="text-cyan-400 text-base">💡</span>
            <div>
              <span className="font-orbitron font-bold text-cyan-300 block mb-0.5">TIPS UJIAN & HAFALAN:</span>
              <p className="text-cyan-100/90 leading-relaxed">{materi.practicalTips}</p>
            </div>
          </div>
        )}

        {/* 6. ACTION ROW */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          {onOpenScratchpad ? (
            <button
              onClick={onOpenScratchpad}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-amber-400/50 bg-amber-500/10 text-amber-200 text-xs font-mono hover:bg-amber-500/20 transition-all"
            >
              <span>✎ Buka Kertas Coretan</span>
            </button>
          ) : <div />}

          <button
            id="materi-btn-quiz"
            onClick={() => onNavigate('quiz')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white text-xs font-orbitron font-bold shadow-[0_0_20px_rgba(139,92,246,0.6)] active:scale-95 transition-all"
          >
            <Award className="w-4 h-4 text-cyan-200" />
            <span>Uji Pemahaman di Simulasi Quiz</span>
          </button>
        </div>
      </article>

      {/* 7. PREVIOUS / NEXT SUBCHAPTER NAVIGATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prevSub ? (
          <button
            onClick={() => onSelectSubchapter(prevSub.id)}
            className="p-4 rounded-3xl glass-panel border border-white/10 text-left hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center gap-1 text-[11px] font-space font-semibold text-violet-300 group-hover:text-cyan-300 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Materi Sebelumnya</span>
            </div>
            <p className="text-xs font-bold text-white mt-1 truncate font-space">
              {prevSub.code}: {prevSub.title}
            </p>
          </button>
        ) : <div />}

        {nextSub ? (
          <button
            onClick={() => onSelectSubchapter(nextSub.id)}
            className="p-4 rounded-3xl glass-panel border border-white/10 text-right hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center justify-end gap-1 text-[11px] font-space font-semibold text-violet-300 group-hover:text-cyan-300 transition-colors">
              <span>Materi Selanjutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs font-bold text-white mt-1 truncate font-space">
              {nextSub.code}: {nextSub.title}
            </p>
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
