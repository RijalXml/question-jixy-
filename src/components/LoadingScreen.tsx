import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  'Memeriksa jawaban...',
  'Menghitung skor...',
  'Menyiapkan hasil...',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [dotsPhase, setDotsPhase] = useState(0);

  useEffect(() => {
    // Phase text changes: step 0 (0-550ms), step 1 (550-1150ms), step 2 (1150-1700ms)
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

  // Modern dot pulse cycle "● ○ ○" -> "○ ● ○" -> "○ ○ ●"
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDotsPhase((prev) => (prev + 1) % 3);
    }, 320);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex w-full max-w-sm flex-col items-center text-center"
      >
        {/* Logo Badge */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="font-mono text-base font-bold tracking-tighter">PTS</div>
        </div>

        {/* Brand Title */}
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
          PTS MASTER
        </h2>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
          Penilaian Tengah Semester • Kelas 7
        </p>

        {/* Modern Spinner / Progress Wheel */}
        <div className="my-8 relative flex items-center justify-center">
          <div className="h-14 w-14 rounded-full border-2 border-zinc-200 dark:border-zinc-800" />
          <div className="absolute h-14 w-14 rounded-full border-2 border-transparent border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />

          {/* Central Pulsing Dot */}
          <div className="absolute h-3 w-3 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse" />
        </div>

        {/* Modern Animated "● ○ ○" Indicator */}
        <div className="flex items-center gap-2 mb-4 font-mono text-sm tracking-widest text-zinc-700 dark:text-zinc-300">
          <span className={dotsPhase === 0 ? 'text-zinc-900 dark:text-zinc-100 font-bold scale-125' : 'text-zinc-300 dark:text-zinc-700'}>
            ●
          </span>
          <span className={dotsPhase === 1 ? 'text-zinc-900 dark:text-zinc-100 font-bold scale-125' : 'text-zinc-300 dark:text-zinc-700'}>
            ●
          </span>
          <span className={dotsPhase === 2 ? 'text-zinc-900 dark:text-zinc-100 font-bold scale-125' : 'text-zinc-300 dark:text-zinc-700'}>
            ●
          </span>
        </div>

        {/* Dynamic Status Text */}
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-medium text-zinc-800 dark:text-zinc-200 font-mono"
        >
          {LOADING_STEPS[currentStepIndex]}
        </motion.div>

        {/* Subtle Progress Bar */}
        <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <motion.div
            className="h-full bg-zinc-900 dark:bg-zinc-100"
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
