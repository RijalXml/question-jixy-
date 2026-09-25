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
  const [activeTier, setActiveTier] = useState<SubjectId>('ips');

  // Quick continue subchapter
  const lastSubchapterId = userProfile.lastStudiedMateriId || 'ips-sub-1a';
  const lastSubchapter =
    LKS_CHAPTERS_DETAIL[lastSubchapterId] || LKS_CHAPTERS_DETAIL['ips-sub-1a'];

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

        {/* The Central Quantum Frosted Window - Sleek Blur, Less Gloss */}
        <div className="relative mx-auto max-w-5xl rounded-[32px] sm:rounded-[40px] border border-white/10 bg-[#09071b]/92 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(139,92,246,0.18)] overflow-hidden transition-all">
          {/* Inner Glowing Planetary Atmosphere Horizon - Softened & Atmospheric */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[140%] h-[320px] pointer-events-none opacity-50">
            <div
              className="w-full h-full rounded-[50%] border-b-[2px] border-violet-400/40 filter blur-[1px]"
              style={{
                boxShadow:
                  '0 20px 60px rgba(168, 85, 247, 0.4), inset 0 -10px 30px rgba(216, 180, 254, 0.25)',
                background:
                  'radial-gradient(ellipse at 50% 100%, rgba(139, 92, 246, 0.25) 0%, rgba(91, 33, 182, 0.08) 50%, transparent 80%)',
              }}
            />
          </div>

          {/* Sinuous Energy Light Trails */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.35) 0%, transparent 60%), radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%)',
            }}
          />

          {/* 1. Inner Navigation Bar */}
          <div className="relative z-20 border-b border-white/[0.07] px-5 sm:px-8 py-3.5 flex items-center justify-between backdrop-blur-xl bg-black/30">
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
              Platform Simulasi Ujian & Ringkasan Materi Terpadu IPS dan PJOK Kelas 7 SMP/MTs Berbasis LKS Kosmik
            </p>

            {/* Primary Action Button: [ Build My Growth Engine ↗ ] */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
              <button
                id="btn-hero-start-quantum"
                onClick={() => onNavigate('subject')}
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-7 py-3 text-xs sm:text-sm font-space font-bold text-white shadow-[0_0_35px_rgba(139,92,246,0.7)] hover:shadow-[0_0_45px_rgba(139,92,246,0.95)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 border border-violet-400/40"
              >
                <span>Mulai Simulasi IPS & PJOK</span>
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
          SECTION 2: SUBJECT CARDS (IPS & PJOK)
      ========================================================================= */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-orbitron text-white tracking-wide">
            PAKET KUIS & MODUL PEMBELAJARAN
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-space mt-1">
            Kurikulum Merdeka SMP/MTs Kelas 7 • Standar 30 Butir Soal Terdistribusi Proporsional & Pembahasan Lengkap
          </p>
        </div>

        {/* 2 Focused High-Impact Tier Cards: IPS & PJOK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* 1. IPS (ILMU PENGETAHUAN SOSIAL) */}
          <div
            className={`relative rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between bg-[#0e0c22]/90 backdrop-blur-2xl shadow-xl ${
              activeTier === 'ips'
                ? 'border-cyan-400/50 shadow-[0_12px_36px_rgba(6,182,212,0.25)]'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold tracking-widest text-cyan-300 uppercase font-orbitron flex items-center gap-1.5">
                  <span>🌏</span>
                  <span>MODUL UTAMA • IPS</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  30 Soal
                </span>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-orbitron">
                ILMU PENGETAHUAN SOSIAL
              </div>
              <p className="text-xs text-cyan-200/80 font-space mt-0.5">
                Ruang Geografi, Interaksi Sosial, Dinamika Ekonomi & Jejak Sejarah
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-zinc-300 font-space border-t border-white/[0.08] pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Letak Astronomis, Geologis & Iklim Tropis Indonesia</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Potensi Kemaritiman, Hutan Mangrove & Hutan Hujan Tropis</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Interaksi Sosial (Asosiatif & Disosiatif) dan Lembaga Sosial</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Kelangkaan, Permintaan, Penawaran & Harga Pasar</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-cyan-400">✦</span>
                  <span>Zaman Praaksara, Kerajaan Hindu-Buddha & Akulturasi Islam</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2.5">
              <button
                id="btn-quiz-tier-ips"
                onClick={() => {
                  onSelectSubject('ips');
                  onNavigate('quiz');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-orbitron text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95 transition-all text-center"
              >
                Mulai Quiz IPS (30 Soal) ↗
              </button>
              <button
                onClick={() => {
                  onSelectSubject('ips');
                  onNavigate('subject');
                }}
                className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-cyan-200 font-space text-xs border border-white/10 transition-all text-center"
              >
                Baca Ringkasan Materi IPS
              </button>
            </div>
          </div>

          {/* 2. PJOK (PENDIDIKAN JASMANI, OLAHRAGA & KESEHATAN) */}
          <div
            className={`relative rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between bg-[#0e0c22]/90 backdrop-blur-2xl shadow-xl ${
              activeTier === 'pjok'
                ? 'border-emerald-400/50 shadow-[0_12px_36px_rgba(16,185,129,0.25)]'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold tracking-widest text-emerald-300 uppercase font-orbitron flex items-center gap-1.5">
                  <span>⚽</span>
                  <span>MODUL UTAMA • PJOK</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  30 Soal
                </span>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-orbitron">
                PENJASORKES (PJOK)
              </div>
              <p className="text-xs text-emerald-200/80 font-space mt-0.5">
                Keterampilan Bola, Atletik, Beladiri, Kebugaran & Hidup Sehat
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-zinc-300 font-space border-t border-white/[0.08] pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Sepak Bola (Passing Kaki Dalam), Bola Voli & Bola Basket</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Bulu Tangkis (Smash, Lob, Rally Point 21) & Tenis Meja</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Atletik Jalan Cepat, Start Jongkok Sprint & Tolak Peluru</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Pencak Silat (Kuda-kuda, Tendangan T) & Senam Lantai</span>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <span className="text-emerald-400">✦</span>
                  <span>Pola Hidup Sehat "Isi Piringku", Aktivitas Air & P3K R.I.C.E</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2.5">
              <button
                id="btn-quiz-tier-pjok"
                onClick={() => {
                  onSelectSubject('pjok');
                  onNavigate('quiz');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-orbitron text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 transition-all text-center"
              >
                Mulai Quiz PJOK (30 Soal) ↗
              </button>
              <button
                onClick={() => {
                  onSelectSubject('pjok');
                  onNavigate('subject');
                }}
                className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-emerald-200 font-space text-xs border border-white/10 transition-all text-center"
              >
                Baca Ringkasan Materi PJOK
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
      <div className="rounded-3xl border border-white/10 bg-[#0c0a20]/90 backdrop-blur-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-lg sm:text-xl font-bold font-orbitron text-white">
          About Media Content & Kurikulum LKS
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 font-space leading-relaxed">
          Platform Quiz Edukasi Antariksa memadukan materi Lembar Kerja Siswa (LKS) IPS (Ilmu Pengetahuan Sosial) dan PJOK (Pendidikan Jasmani, Olahraga & Kesehatan) Kelas 7 SMP/MTs berdasarkan Kurikulum Merdeka. Setiap modul materi dan paket kuis dirancang dengan bobot indikator kompetensi proporsional, pembahasan komprehensif, konsep geografis, sosiologis, ekonomi, sejarah nusantara, penguasaan gerak olahraga, kebugaran jasmani, serta pedoman hidup sehat.
        </p>
        <div className="pt-2 flex items-center justify-between border-t border-white/[0.08] text-xs font-mono text-zinc-400">
          <span>© 2026 Quiz Edukasi · Pembelajaran IPS & PJOK Kelas 7</span>
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
