import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  'Memeriksa telemetri jawaban...',
  'Menghitung skor evaluasi...',
  'Menyiapkan laporan navigasi kosmik...',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [dotsPhase, setDotsPhase] = useState(0);

  useEffect(() => {
    const stepTimer1 = setTimeout(() => {
      setCurrentStepIndex(1);
    }, 550);

    const stepTimer2 = setTimeout(() => {
      setCurrentStepIndex(2);
    }, 1150);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1750);

    return () => {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDotsPhase((prev) => (prev + 1) % 3);
    }, 320);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 select-none relative z-10 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex w-full max-w-sm flex-col items-center text-center rounded-3xl glass-panel border border-white/15 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        {/* Cosmic Badge */}
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-400/40">
          <Rocket className="h-8 w-8 text-cyan-200 animate-pulse" />
        </div>

        {/* Brand Title */}
        <h2 className="text-xl font-black tracking-tight text-white font-orbitron">
          MEMPROSES EVALUASI
        </h2>
        <p className="mt-1 text-xs text-violet-300/80 font-space">
          Simulasi PTS Kosmik • LKS 2026
        </p>

        {/* Cosmic Spinner / Progress Wheel */}
        <div className="my-7 relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-2 border-white/10" />
          <div className="absolute h-16 w-16 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-400 animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

          {/* Central Pulsing Star */}
          <div className="absolute h-4 w-4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 animate-ping" />
        </div>

        {/* Animated Dots */}
        <div className="flex items-center gap-2 mb-3 font-orbitron text-sm tracking-widest">
          <span className={dotsPhase === 0 ? 'text-cyan-300 font-bold scale-125' : 'text-white/20'}>
            ●
          </span>
          <span className={dotsPhase === 1 ? 'text-violet-300 font-bold scale-125' : 'text-white/20'}>
            ●
          </span>
          <span className={dotsPhase === 2 ? 'text-cyan-300 font-bold scale-125' : 'text-white/20'}>
            ●
          </span>
        </div>

        {/* Dynamic Status Text */}
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs font-semibold text-violet-200 font-space"
        >
          {LOADING_STEPS[currentStepIndex]}
        </motion.div>

        {/* Subtle Cosmic Progress Bar */}
        <div className="mt-6 h-1.5 w-52 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            initial={{ width: '15%' }}
            animate={{
              width: currentStepIndex === 0 ? '40%' : currentStepIndex === 1 ? '75%' : '100%',
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};
