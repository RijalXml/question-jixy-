import React from 'react';
import { SubjectId, ScreenState } from '../types';
import { LKS_SUBJECTS } from '../data/lksLessons';
import {
  BookOpen,
  Award,
  ChevronRight,
  Clock,
  CheckCircle,
  FileText
} from 'lucide-react';
import { SketchWashiTape, SketchUnderline, SketchArrow, SketchDraftGrid } from './SketchElements';

interface SubjectScreenProps {
  selectedSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  onSelectSubchapter: (subchapterId: string) => void;
  onNavigate: (screen: ScreenState) => void;
  onOpenScratchpad?: () => void;
}

export const SubjectScreen: React.FC<SubjectScreenProps> = ({
  selectedSubject,
  onSelectSubject,
  onSelectSubchapter,
  onNavigate,
  onOpenScratchpad,
}) => {
  const currentSubjectInfo = LKS_SUBJECTS[selectedSubject];
  const subjectKeys: SubjectId[] = ['ski', 'bahasa_inggris', 'bahasa_jawa'];

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* 1. SUBJECT SWITCHER PILLS (TOP) */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/60 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-700/50 overflow-x-auto no-scrollbar">
        {subjectKeys.map((key) => {
          const info = LKS_SUBJECTS[key];
          const isActive = selectedSubject === key;
          return (
            <button
              key={key}
              id={`subject-tab-${key}`}
              onClick={() => onSelectSubject(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <span>{info.icon}</span>
              <span>{info.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300' : 'bg-transparent text-zinc-400'
              }`}>
                {info.chapters.length} Bab
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. SUBJECT HEADER HERO WITH SKETCH ACCENTS */}
      <div
        id="subject-header-hero"
        className="relative overflow-hidden p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/70 dark:border-zinc-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <SketchDraftGrid className="absolute right-0 top-0 w-32 h-32" />

        <div className="flex items-start gap-4 z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-3xl flex items-center justify-center border border-indigo-200 dark:border-indigo-800/60 flex-shrink-0">
            {currentSubjectInfo.icon}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <SketchWashiTape text="SKETSA LKS" color="blue" />
              <span className="text-xs text-zinc-400">Semester Genap 2026</span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {currentSubjectInfo.title}
              </h2>
              <SketchUnderline className="text-indigo-400/50 w-28" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {currentSubjectInfo.description}
            </p>
          </div>
        </div>

        {/* Right Action: Mulai Quiz Pelajaran */}
        <div className="flex-shrink-0 flex items-center gap-3 z-10">
          {onOpenScratchpad && (
            <button
              onClick={onOpenScratchpad}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-dashed border-amber-300 dark:border-amber-700 text-xs font-semibold hover:bg-amber-100 transition-all active:scale-95"
            >
              <span>✎ Coretan</span>
            </button>
          )}

          <div className="relative">
            <button
              id="subject-btn-start-quiz"
              onClick={() => onNavigate('quiz')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold shadow-sm active:scale-95 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Mulai Evaluasi (30 Soal)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. CHAPTERS & SUBCHAPTERS LIST */}
      <div className="space-y-6">
        {currentSubjectInfo.chapters.map((chapter, chapIdx) => (
          <div
            key={chapter.id}
            id={`chapter-section-${chapter.id}`}
            className="relative rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/60 dark:border-zinc-800/80 p-5 sm:p-6 shadow-xs space-y-4"
          >
            {/* Chapter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                    Bab {chapIdx + 1}
                  </span>
                  <SketchWashiTape text={`DRAFT BAB ${chapIdx + 1}`} color="zinc" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {chapter.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {chapter.description}
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 self-start sm:self-center font-mono">
                {chapter.subchapters.length} Subbab Materi
              </span>
            </div>

            {/* Subchapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {chapter.subchapters.map((sub) => (
                <div
                  key={sub.id}
                  id={`subchapter-card-${sub.id}`}
                  onClick={() => {
                    onSelectSubchapter(sub.id);
                    onNavigate('materi');
                  }}
                  className="p-4 rounded-2xl bg-zinc-50/70 dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-600 font-mono">
                        {sub.code}
                      </span>
                      <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {sub.readTime}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {sub.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {sub.summary}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-dashed border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    <span>Baca Ringkasan LKS</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
