import React, { useMemo } from 'react';
import { SpaceThemeMode } from '../types';

interface SpaceBackgroundProps {
  mode: SpaceThemeMode;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  animationClass: string;
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ mode }) => {
  // Generate 160 stars with deterministic-like distributed randomness
  const stars = useMemo<Star[]>(() => {
    const starArray: Star[] = [];
    for (let i = 0; i < 165; i++) {
      // Seeded random variation
      const x = (i * 19.3 + (i % 7) * 11.7) % 100;
      const y = (i * 29.7 + (i % 5) * 13.9) % 100;
      const size = (i % 5 === 0) ? 2.5 : (i % 2 === 0) ? 1.8 : 1.2;
      const isPurple = i % 3 === 0;
      const color = isPurple ? '#c4b5fd' : '#ffffff';
      const opacity = 0.25 + ((i % 10) * 0.07);
      const animTypes = ['animate-twinkle-1', 'animate-twinkle-2', 'animate-twinkle-3', ''];
      const animationClass = animTypes[i % animTypes.length];

      starArray.push({
        id: i,
        x,
        y,
        size,
        color,
        opacity,
        animationClass,
      });
    }
    return starArray;
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none transition-all duration-1000"
      style={{
        background:
          mode === 'planet'
            ? 'radial-gradient(circle at 40% 40%, #0c0824 0%, #050510 65%, #18092d 100%)'
            : 'radial-gradient(circle at 50% 35%, #050510 0%, #04030a 50%, #150622 100%)',
      }}
    >
      {/* Deep Space Nebulae Dust */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full filter blur-[100px] opacity-25 animate-pulse-nebula"
        style={{
          top: '-15%',
          right: '-10%',
          background: 'radial-gradient(circle, #8b5cf6 0%, #6d28d9 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full filter blur-[90px] opacity-20 animate-pulse-nebula"
        style={{
          bottom: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, #06b6d4 0%, #3b82f6 50%, transparent 80%)',
          animationDelay: '3s',
        }}
      />

      {/* Starfield Layer (160+ stars) */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.animationClass}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.opacity,
              boxShadow: star.size > 2 ? `0 0 6px ${star.color}` : 'none',
            }}
          />
        ))}
      </div>

      {/* MODE PLANET RENDERING */}
      {mode === 'planet' && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Main Giant Ringed Planet (Lower Right / Center Right) */}
          <div className="absolute -right-16 -bottom-16 sm:right-6 sm:bottom-6 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none opacity-85 animate-float-1">
            {/* Saturn-like Ring Back */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[36%] rounded-[50%] border-4 sm:border-[7px] border-[#a78bfa]/40 filter blur-[0.5px]"
              style={{
                transform: 'translate(-50%, -50%) rotate(-24deg)',
                boxShadow: '0 0 25px rgba(167, 139, 250, 0.45), inset 0 0 15px rgba(245, 158, 11, 0.3)',
              }}
            />
            {/* Planet Body */}
            <div
              className="absolute inset-4 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #a78bfa 0%, #6d28d9 45%, #2e1065 75%, #050510 100%)',
                boxShadow:
                  'inset -25px -25px 50px rgba(5, 5, 16, 0.95), inset 15px 15px 30px rgba(196, 181, 253, 0.4), 0 0 45px rgba(139, 92, 246, 0.45)',
              }}
            >
              {/* Cloud Bands */}
              <div
                className="absolute inset-0 rounded-full opacity-35"
                style={{
                  background:
                    'repeating-linear-gradient(40deg, transparent, transparent 18px, rgba(255, 255, 255, 0.12) 18px, rgba(255, 255, 255, 0.12) 28px)',
                }}
              />
            </div>
            {/* Saturn Ring Front */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[36%] rounded-[50%] border-t-4 sm:border-t-[7px] border-l-4 sm:border-l-[7px] border-[#c4b5fd]/60"
              style={{
                transform: 'translate(-50%, -50%) rotate(-24deg)',
                clipPath: 'polygon(0% 45%, 100% 45%, 100% 100%, 0% 100%)',
                boxShadow: '0 0 30px rgba(196, 181, 253, 0.6)',
              }}
            />
          </div>

          {/* Small Planet 1: Cyan/Aqua Ice Planet (Top Left) */}
          <div
            className="absolute top-16 left-6 sm:left-14 w-20 h-20 sm:w-28 sm:h-28 rounded-full animate-float-2 opacity-80"
            style={{
              background: 'radial-gradient(circle at 30% 25%, #67e8f9 0%, #0891b2 50%, #155e75 80%, #041f2d 100%)',
              boxShadow:
                'inset -8px -8px 20px rgba(4, 31, 45, 0.9), inset 6px 6px 12px rgba(207, 250, 254, 0.5), 0 0 30px rgba(6, 182, 212, 0.35)',
            }}
          />

          {/* Small Planet 2: Crimson/Amber Mars-like Planet (Top Right) */}
          <div
            className="absolute top-32 right-12 sm:right-28 w-14 h-14 sm:w-20 sm:h-20 rounded-full animate-float-3 opacity-75"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #fb923c 0%, #b91c1c 55%, #7f1d1d 85%, #050510 100%)',
              boxShadow:
                'inset -6px -6px 16px rgba(5, 5, 16, 0.9), inset 4px 4px 10px rgba(254, 215, 170, 0.5), 0 0 25px rgba(249, 115, 22, 0.3)',
            }}
          />

          {/* Small Planet 3: Amethyst Moon (Mid Left) */}
          <div
            className="hidden sm:block absolute top-[55%] left-10 w-12 h-12 rounded-full animate-float-4 opacity-60"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #e9d5ff 0%, #9333ea 60%, #3b0764 100%)',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.35)',
            }}
          />

          {/* Floating Asteroids (CSS polygonal particles) */}
          <div
            className="absolute top-1/3 left-1/4 w-3.5 h-3 rounded-md animate-float-1 opacity-50 bg-[#71717a] border border-[#a1a1aa]/30"
            style={{ transform: 'rotate(45deg)' }}
          />
          <div
            className="absolute top-2/3 right-1/3 w-4 h-3.5 rounded-md animate-float-3 opacity-40 bg-[#52525b] border border-[#71717a]/30"
            style={{ transform: 'rotate(120deg)' }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-2.5 h-2 rounded-sm animate-float-2 opacity-50 bg-[#a1a1aa]/60"
            style={{ transform: 'rotate(15deg)' }}
          />
          <div
            className="absolute bottom-28 left-1/3 w-3 h-3 rounded-md animate-float-4 opacity-40 bg-[#71717a]"
            style={{ transform: 'rotate(70deg)' }}
          />
        </div>
      )}

      {/* MODE BLACK HOLE RENDERING */}
      {mode === 'blackhole' && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Cosmic Center Gravitational Vortex */}
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] flex items-center justify-center pointer-events-none">
            {/* Outer Accretion Glow Rays */}
            <div
              className="absolute inset-0 rounded-full animate-spin-accretion opacity-70"
              style={{
                background:
                  'conic-gradient(from 0deg, #f59e0b, #ef4444, #ec4899, #8b5cf6, #3b82f6, #f59e0b)',
                filter: 'blur(35px)',
              }}
            />

            {/* Elliptical Accretion Disk Ring 1 */}
            <div
              className="absolute w-[125%] h-[42%] rounded-[50%] animate-spin-accretion"
              style={{
                border: '8px solid transparent',
                borderTopColor: '#f59e0b',
                borderBottomColor: '#ec4899',
                boxShadow:
                  '0 0 50px #f59e0b, 0 0 90px rgba(236, 72, 153, 0.7), inset 0 0 40px #f59e0b',
                transform: 'rotate(-15deg)',
                filter: 'blur(2px)',
                animationDuration: '18s',
              }}
            />

            {/* Elliptical Accretion Disk Ring 2 (Cross Tilt) */}
            <div
              className="absolute w-[115%] h-[36%] rounded-[50%] animate-spin-accretion"
              style={{
                border: '6px solid transparent',
                borderLeftColor: '#f97316',
                borderRightColor: '#8b5cf6',
                boxShadow: '0 0 40px #f97316, 0 0 70px rgba(139, 92, 246, 0.6)',
                transform: 'rotate(32deg)',
                animationDirection: 'reverse',
                animationDuration: '26s',
                filter: 'blur(1.5px)',
              }}
            />

            {/* Photon Sphere (Bright White-Gold Ring) */}
            <div
              className="absolute w-44 h-44 sm:w-64 sm:h-64 rounded-full"
              style={{
                boxShadow:
                  '0 0 40px #ffffff, 0 0 80px #f59e0b, 0 0 120px rgba(239, 68, 68, 0.6)',
                border: '3px solid rgba(255, 255, 255, 0.85)',
              }}
            />

            {/* Black Hole Event Horizon (Deep Void) */}
            <div
              className="relative w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-[#000000] z-10"
              style={{
                boxShadow:
                  'inset 0 0 60px rgba(0, 0, 0, 1), 0 0 25px rgba(0, 0, 0, 0.95)',
              }}
            >
              {/* Gravitational Lensing Halo */}
              <div
                className="absolute -inset-2 rounded-full border-2 border-white/25 filter blur-[2px] pointer-events-none"
              />
            </div>

            {/* Distortion Swirl Particles */}
            <div
              className="absolute w-full h-full rounded-full animate-spin-accretion opacity-40"
              style={{
                background:
                  'radial-gradient(circle, transparent 40%, rgba(245, 158, 11, 0.15) 60%, transparent 80%)',
                animationDuration: '12s',
              }}
            />
          </div>

          {/* Drifting Space Debris pulled toward singularity */}
          <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-amber-400/70 filter blur-[1px] animate-float-1" />
          <div className="absolute bottom-24 right-1/4 w-2.5 h-2.5 rounded-full bg-rose-400/60 filter blur-[1px] animate-float-3" />
          <div className="absolute top-1/2 right-16 w-3 h-1.5 rounded-sm bg-purple-400/50 animate-float-2" />
        </div>
      )}
    </div>
  );
};
