import React, { useState } from 'react';
import { SubjectId, ScreenState, UserProfile, SpaceThemeMode } from '../types';
import { LKS_SUBJECTS, LKS_CHAPTERS_DETAIL } from '../data/lksLessons';
import { FloatingAsteroid } from './FloatingAsteroid';
import { SpaceAudioPlayer } from './SpaceAudioPlayer';
import { SpaceOrbitSimulation } from './SpaceOrbitSimulation';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Trophy,
  RotateCcw,
  Compass,
  FileText,
  Bookmark,
  Orbit,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

interface HomeScreenProps {
  onSelectSubject: (sub: SubjectId) => void;
  onNavigate: (screen: ScreenState) => void;
  userProfile: UserProfile;
  onSelectSubchapter?: (subchapterId: string) => void;
  activeExamSubjectId?: SubjectId | null;
  onResumeExam?: () => void;
  onOpenScratchpad?: () => void;
  spaceTheme?: SpaceThemeMode;
  onToggleSpaceTheme?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectSubject,
  onNavigate,
  userProfile,
  onSelectSubchapter,
  activeExamSubjectId,
  onResumeExam,
  onOpenScratchpad,
}) => {
  const [activeTier, setActiveTier] = useState<SubjectId>('ipa');

  // Quick continue subchapter
  const lastSubchapterId = userProfile.lastStudiedMateriId || 'ipa-sub-1a';
  const lastSubchapter =
    LKS_CHAPTERS_DETAIL[lastSubchapterId] || LKS_CHAPTERS_DETAIL['ipa-sub-1a'];

  return (
    <div className="relative space-y-16 pb-24 select-none font-sans">
      {/* =========================================================================
          SECTION 1: IMAGE 1 EXACT REPLICA — THE "QUANTUM" COSMIC HERO VIEWPORT
      ========================================================================= */}
      <div className="relative pt-4 sm:pt-6">
        {/* Foreground 3D Asteroid Rocks (Exact Positioning from Image 1, Static & Ultra-lightweight) */}
        {/* Big foreground asteroid (Bottom Left, partially overlapping container) */}
        <FloatingAsteroid
          size={240}
          rotation={-18}
          className="absolute -bottom-16 -left-12 sm:-bottom-20 sm:-left-20 z-30 opacity-95 hidden sm:block"
        />

        {/* Small top-left rock */}
        <FloatingAsteroid
          size={90}
          rotation={35}
          className="absolute -top-6 left-12 z-10 opacity-70 hidden md:block"
        />

        {/* Mid-right rock */}
        <FloatingAsteroid
          size={110}
          rotation={-45}
          className="absolute top-1/3 -right-6 sm:-right-12 z-30 opacity-85"
        />

        {/* Bottom-right rock */}
        <FloatingAsteroid
          size={150}
          rotation={22}
          className="absolute -bottom-10 right-8 z-20 opacity-80 hidden lg:block"
        />

        {/* The Central Quantum Frosted Glass Window */}
        <div className="relative mx-auto max-w-5xl rounded-[32px] sm:rounded-[40px] border border-white/20 bg-[#070514]/85 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_90px_rgba(139,92,246,0.35)] overflow-hidden transition-all">
          {/* Inner Glowing Planetary Atmosphere Horizon (Image 1 Signature) */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[140%] h-[320px] pointer-events-none opacity-85">
            <div
              className="w-full h-full rounded-[50%] border-b-[3px] border-violet-300/80 filter blur-[0.5px]"
              style={{
                boxShadow:
                  '0 25px 80px rgba(168, 85, 247, 0.9), inset 0 -20px 50px rgba(216, 180, 254, 0.5)',
                background:
                  'radial-gradient(ellipse at 50% 100%, rgba(139, 92, 246, 0.45) 0%, rgba(91, 33, 182, 0.15) 50%, transparent 80%)',
              }}
            />
          </div>

          {/* Sinuous Energy Light Trails (Image 1 Signature) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.5) 0%, transparent 60%), radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.4) 0%, transparent 50%)',
            }}
          />

          {/* 1. Inner Navigation Bar (Matching Image 1 Top Header) */}
          <div className="relative z-20 border-b border-white/10 px-5 sm:px-8 py-3.5 flex items-center justify-between backdrop-blur-md bg-white/[0.02]">
            {/* Left Nav Links */}
            <div className="flex items-center gap-4 text-xs font-space text-zinc-400">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Home</span>
              </div>
              <button
                onClick={() => onNavigate('subject')}
                className="hidden md:inline hover:text-white transition-colors"
              >
                Materi LKS
              </button>
              <button
                onClick={() => onNavigate('leaderboard')}
                className="hidden md:inline hover:text-white transition-colors"
              >
                Peringkat Juara
              </button>
              {onOpenScratchpad && (
                <button
                  onClick={onOpenScratchpad}
                  className="hidden sm:inline hover:text-amber-300 transition-colors"
                >
                  Coretan ✎
                </button>
              )}
            </div>

            {/* Center Logo: "Quantum" */}
            <div className="text-base sm:text-lg font-extrabold tracking-wider font-orbitron text-white">
              Quantum
            </div>

            {/* Right Status Badge & CTA */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[11px] font-mono text-zinc-400">
                LKS Genap 2026
              </span>
              <button
                onClick={() => onNavigate('subject')}
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-3.5 py-1.5 text-xs font-space font-semibold hover:bg-zinc-200 active:scale-95 transition-all shadow-md"
              >
                <span>Mulai Belajar</span>
                <span className="text-xs">↗</span>
              </button>
            </div>
          </div>

          {/* 2. Hero Content Body (Exact Layout & Typography from Image 1) */}
          <div className="relative z-20 px-6 sm:px-12 py-16 sm:py-24 text-center flex flex-col items-center">
            {/* Internal Asteroids inside the glass frame */}
            <FloatingAsteroid
              size={90}
              rotation={15}
              className="absolute left-8 sm:left-16 top-1/2 -translate-y-1/2 opacity-75 hidden sm:block pointer-events-none"
            />
            <FloatingAsteroid
              size={100}
              rotation={-25}
              className="absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 opacity-75 hidden sm:block pointer-events-none"
            />

            {/* Sub-tag kicker: ✦ Precision. Speed. Intelligence. */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[11px] sm:text-xs font-space tracking-widest text-violet-200 uppercase font-medium">
                Precision. Speed. Intelligence.
              </span>
            </div>

            {/* Monumental Hero Title: Q U A N T U M */}
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black font-orbitron tracking-[0.25em] sm:tracking-[0.4em] text-white uppercase"
              style={{
                textShadow:
                  '0 0 40px rgba(168, 85, 247, 0.8), 0 0 80px rgba(139, 92, 246, 0.4), 0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              QUANTUM
            </h1>

            {/* Subtitle: STOP GUESSING - START SCALING */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl font-bold tracking-[0.15em] sm:tracking-[0.22em] text-violet-200 uppercase font-space">
              STOP GUESSING — START SCALING
            </p>

            {/* Indonesian context line */}
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-space max-w-lg leading-relaxed">
              Platform Simulasi Ujian & Ringkasan Materi Terpadu IPA (Sains), Fikih Ibadah, dan PKn Berbasis Antariksa
            </p>

            {/* Primary Action Button: [ Build My Growth Engine ↗ ] */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
              <button
                id="btn-hero-start-quantum"
                onClick={() => onNavigate('subject')}
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-7 py-3 text-xs sm:text-sm font-space font-bold text-white shadow-[0_0_35px_rgba(139,92,246,0.7)] hover:shadow-[0_0_45px_rgba(139,92,246,0.95)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 border border-violet-400/40"
              >
                <span>Mulai Simulasi Ujian</span>
                <span className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </button>

              {onOpenScratchpad && (
                <button
                  onClick={onOpenScratchpad}
                  className="rounded-full glass-panel border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 text-xs font-mono text-amber-300 hover:text-amber-200 transition-all inline-flex items-center gap-2"
                >
                  <span>✎ Kertas Coretan</span>
                </button>
              )}
            </div>

            {/* Active Exam Alert inside Hero if present */}
            {activeExamSubjectId && onResumeExam && (
              <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/50 backdrop-blur-md">
                <span className="text-amber-300 font-bold text-xs font-orbitron">
                  Simulasi Belum Selesai!
                </span>
                <button
                  onClick={onResumeExam}
                  className="text-xs font-space font-bold underline text-white hover:text-amber-200"
                >
                  Lanjutkan Sekarang →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: IMAGE 2 TOP TIER CARDS (SATELLITE, PLANET, STAR)
      ========================================================================= */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-orbitron text-white tracking-wide">
            PILIHAN MATA PELAJARAN LKS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-space mt-1">
            Format Ujian Standar: 30 Soal Terdistribusi Proporsional (A, B, C, D)
          </p>
        </div>

        {/* 3 Tier Cards matching Image 2 top layout (SATELLITE, PLANET, STAR) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. SATELLITE (IPA) */}
          <div
            className={`relative rounded-3xl glass-panel border transition-all duration-300 p-6 flex flex-col justify-between bg-black/65 backdrop-blur-xl shadow-2xl ${
              activeTier === 'ipa'
                ? 'border-cyan-400/70 shadow-[0_0_35px_rgba(6,182,212,0.35)]'
                : 'border-white/15 hover:border-white/30'
            }`}
          >
            <div>
              <div className="text-xs font-bold tracking-widest text-cyan-300 uppercase font-orbitron">
                SATELLITE
              </div>
              <div className="mt-2 text-3xl font-extrabold text-white font-orbitron">
                IPA
              </div>
              <p className="text-xs text-cyan-200/80 font-space mt-0.5">
                30 Butir Soal Terverifikasi
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-zinc-300 font-space border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Sistem Tata Surya & Planet</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Karakteristik Benda Langit</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Rotasi & Revolusi Bumi</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Satelit Alami & Gravitasi</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Pembahasan Kunci Jawaban</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <button
                id="btn-quiz-tier-ipa"
                onClick={() => {
                  onSelectSubject('ipa');
                  onNavigate('quiz');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-orbitron text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 transition-all text-center"
              >
                Mulai Quiz IPA ↗
              </button>
              <button
                onClick={() => onSelectSubject('ipa')}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-200 font-space text-xs border border-white/10 transition-all text-center"
              >
                Baca Ringkasan Bab
              </button>
            </div>
          </div>

          {/* 2. PLANET (FIKIH) */}
          <div
            className={`relative rounded-3xl glass-panel border transition-all duration-300 p-6 flex flex-col justify-between bg-black/65 backdrop-blur-xl shadow-2xl ${
              activeTier === 'fikih'
                ? 'border-emerald-400/70 shadow-[0_0_35px_rgba(16,185,129,0.35)]'
                : 'border-white/15 hover:border-white/30'
            }`}
          >
            <div>
              <div className="text-xs font-bold tracking-widest text-emerald-300 uppercase font-orbitron">
                PLANET
              </div>
              <div className="mt-2 text-3xl font-extrabold text-white font-orbitron">
                FIKIH
              </div>
              <p className="text-xs text-emerald-200/80 font-space mt-0.5">
                30 Butir Soal Terverifikasi
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-zinc-300 font-space border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Thaharah & Konsep Bersuci</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Wudhu & Tayammum Praktis</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Shalat Jamaah & Jamak Qashar</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Puasa Wajib & Puasa Sunnah</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Zakat Fitrah & Zakat Mal</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <button
                id="btn-quiz-tier-fikih"
                onClick={() => {
                  onSelectSubject('fikih');
                  onNavigate('quiz');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-orbitron text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 transition-all text-center"
              >
                Mulai Quiz Fikih ↗
              </button>
              <button
                onClick={() => onSelectSubject('fikih')}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 font-space text-xs border border-white/10 transition-all text-center"
              >
                Baca Ringkasan Bab
              </button>
            </div>
          </div>

          {/* 3. STAR (PKN) */}
          <div
            className={`relative rounded-3xl glass-panel border transition-all duration-300 p-6 flex flex-col justify-between bg-black/65 backdrop-blur-xl shadow-2xl ${
              activeTier === 'pkn'
                ? 'border-amber-400/70 shadow-[0_0_35px_rgba(245,158,11,0.35)]'
                : 'border-white/15 hover:border-white/30'
            }`}
          >
            <div>
              <div className="text-xs font-bold tracking-widest text-amber-300 uppercase font-orbitron">
                STAR
              </div>
              <div className="mt-2 text-3xl font-extrabold text-white font-orbitron">
                PKN
              </div>
              <p className="text-xs text-amber-200/80 font-space mt-0.5">
                30 Butir Soal Terverifikasi
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-zinc-300 font-space border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✦</span>
                  <span>5 Nilai Sila Pancasila</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-amber-400">✦</span>
                  <span>Norma Agama, Hukum & Adat</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-amber-400">✦</span>
                  <span>Hak & Kewajiban Warga Negara</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-amber-400">✦</span>
                  <span>Bhinneka Tunggal Ika</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-amber-400">✦</span>
                  <span>Toleransi & Gotong Royong</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <button
                id="btn-quiz-tier-pkn"
                onClick={() => {
                  onSelectSubject('pkn');
                  onNavigate('quiz');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-orbitron text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95 transition-all text-center"
              >
                Mulai Quiz PKn ↗
              </button>
              <button
                onClick={() => onSelectSubject('pkn')}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 font-space text-xs border border-white/10 transition-all text-center"
              >
                Baca Ringkasan Bab
              </button>
            </div>
          </div>
        </div>

        {/* Back to Home pill link matching Image 2 */}
        <div className="text-center pt-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            -- Back to Home / Kembali ke Atas
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: IMAGE 2 MEDIA & AUDIO SECTION
      ========================================================================= */}
      <div className="pt-6">
        <SpaceAudioPlayer />
      </div>

      {/* =========================================================================
          SECTION 4: IMAGE 2 MINECRAFT / SPACE ANIMATION SIMULATION VIEWPORT
      ========================================================================= */}
      <div className="pt-6">
        <SpaceOrbitSimulation />
      </div>

      {/* =========================================================================
          SECTION 5: IMAGE 2 ABOUT MEDIA CONTENT SECTION
      ========================================================================= */}
      <div className="rounded-3xl glass-panel border border-white/15 bg-black/60 backdrop-blur-xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-lg sm:text-xl font-bold font-orbitron text-white">
          About Media Content & Kurikulum LKS
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 font-space leading-relaxed">
          Platform Quiz Edukasi Antariksa memadukan materi Lembar Kerja Siswa (LKS) semester genap dengan visualisasi interaktif modern. Setiap modul dan paket kuis dirancang dengan bobot indikator yang proporsional, kunci jawaban acak tanpa bias, serta pembahasan komprehensif untuk membantu siswa memahami konsep sains, nilai-nilai spiritualitas fikih, dan wawasan kebangsaan Pancasila.
        </p>
        <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-mono text-zinc-400">
          <span>© 2026 Quiz Edukasi · Platform Pembelajaran Antariksa</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors"
          >
            -- Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
