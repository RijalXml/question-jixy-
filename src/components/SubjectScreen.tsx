import React from 'react';
import { SubjectId, ScreenState } from '../types';
import { LKS_SUBJECTS } from '../data/lksLessons';
import {
  Award,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SketchDraftGrid } from './SketchElements';

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
  const currentSubjectInfo = LKS_SUBJECTS[selectedSubject] || LKS_SUBJECTS['ipa'];
  const subjectKeys: SubjectId[] = ['ipa', 'fikih', 'pkn'];

  return (
    <div className="space-y-6 pb-12 select-none relative z-10 font-sans">
      {/* 1. SUBJECT SWITCHER PILLS (TOP) */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-white/10 overflow-x-auto no-scrollbar">
        {subjectKeys.map((key) => {
          const info = LKS_SUBJECTS[key];
          const isActive = selectedSubject === key;
          return (
            <button
              key={key}
              id={`subject-tab-${key}`}
              onClick={() => onSelectSubject(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-orbitron font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-violet-400/40'
                  : 'text-violet-200/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-base">{info.icon}</span>
              <span>{info.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-space ${
                isActive ? 'bg-white/20 text-white' : 'bg-transparent text-violet-400'
              }`}>
                {info.chapters.length} Bab
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. SUBJECT HEADER HERO WITH GLASS ACCENTS */}
      <div
        id="subject-header-hero"
        className="relative overflow-hidden p-6 sm:p-7 rounded-3xl glass-panel border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <SketchDraftGrid className="absolute right-0 top-0 w-32 h-32 opacity-10" />

        <div className="flex items-start gap-4 z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-3xl flex items-center justify-center border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex-shrink-0">
            {currentSubjectInfo.icon}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                LKS KOSMIK 2026
              </span>
              <span className="text-xs text-violet-300 font-space">Semester Genap</span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-orbitron">
                {currentSubjectInfo.title}
              </h2>
              <div className="h-1 w-28 bg-gradient-to-r from-cyan-400 to-transparent rounded-full mt-1.5" />
            </div>
            <p className="text-xs sm:text-sm text-violet-200/80 max-w-2xl leading-relaxed font-space">
              {currentSubjectInfo.description}
            </p>
          </div>
        </div>

        {/* Right Action: Mulai Quiz Pelajaran */}
        <div className="flex-shrink-0 flex items-center gap-3 z-10">
          {onOpenScratchpad && (
            <button
              onClick={onOpenScratchpad}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-dashed border-amber-400/50 bg-amber-500/10 text-amber-200 text-xs font-mono hover:bg-amber-500/20 transition-all active:scale-95"
              title="Kertas Coretan & Sketsa"
            >
              <span>✎ Coretan</span>
            </button>
          )}

          <button
            id="subject-btn-start-quiz"
            onClick={() => onNavigate('quiz')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-orbitron font-bold shadow-[0_0_20px_rgba(139,92,246,0.6)] active:scale-95 transition-all"
          >
            <Award className="w-4 h-4 text-cyan-300" />
            <span>Mulai Evaluasi (30 Soal)</span>
          </button>
        </div>
      </div>

      {/* 3. CHAPTERS & SUBCHAPTERS LIST */}
      <div className="space-y-6">
        {currentSubjectInfo.chapters.map((chapter, chapIdx) => (
          <div
            key={chapter.id}
            id={`chapter-section-${chapter.id}`}
            className="relative rounded-3xl glass-panel border border-white/12 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-4"
          >
            {/* Chapter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider text-cyan-400 uppercase font-orbitron">
                    Bab {chapIdx + 1}
                  </span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-white/5 border border-white/10 text-violet-300 font-space">
                    {chapter.chapterNumber}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-space mt-0.5">
                  {chapter.title}
                </h3>
                <p className="text-xs text-violet-200/70 mt-0.5 font-space">
                  {chapter.description}
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full glass-panel border border-white/15 text-cyan-200 self-start sm:self-center font-orbitron">
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
                  className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all cursor-pointer group flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-violet-500/20 text-cyan-300 border border-violet-400/30 font-orbitron">
                        {sub.code}
                      </span>
                      <span className="text-[10px] text-violet-300/70 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {sub.readTime}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-space">
                      {sub.title}
                    </h4>
                    <p className="text-[11px] text-violet-200/70 mt-1 line-clamp-2 leading-relaxed font-space">
                      {sub.summary}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-cyan-300 font-orbitron font-semibold">
                    <span>Baca Ringkasan Kosmik</span>
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
