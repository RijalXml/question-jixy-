import React, { useMemo } from 'react';
import { SpaceThemeMode } from '../types';
import quantumPlanetBg from '../assets/images/quantum_planet_bg_1790164105758.jpg';
import gargantuaBg from '../assets/images/gargantua_bg_1790164128944.jpg';

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
  // Generate 160 stars with distributed randomness
  const stars = useMemo<Star[]>(() => {
    const starArray: Star[] = [];
    for (let i = 0; i < 165; i++) {
      const x = (i * 19.3 + (i % 7) * 11.7) % 100;
      const y = (i * 29.7 + (i % 5) * 13.9) % 100;
      const size = i % 5 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1.2;
      const isPurple = i % 3 === 0;
      const color = isPurple ? '#c4b5fd' : '#ffffff';
      const opacity = 0.25 + (i % 10) * 0.07;
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
    >
      {/* 1. PHOTOREALISTIC BACKDROP TEXTURES (MATCHING IMAGE 1 & IMAGE 2) */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {mode === 'planet' ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105 animate-pulse-nebula"
            style={{
              backgroundImage: `url(${quantumPlanetBg})`,
              filter: 'brightness(0.9) contrast(1.15)',
              opacity: 0.88,
            }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
            style={{
              backgroundImage: `url(${gargantuaBg})`,
              filter: 'brightness(0.95) contrast(1.2)',
              opacity: 0.92,
            }}
          />
        )}
      </div>

      {/* 2. ATMOSPHERIC VIGNETTE & NEBULA COLOR OVERLAY */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background:
            mode === 'planet'
              ? 'radial-gradient(ellipse at 50% 15%, rgba(139, 92, 246, 0.22) 0%, rgba(5, 5, 16, 0.4) 60%, #050510 100%)'
              : 'radial-gradient(ellipse at 50% 40%, rgba(245, 158, 11, 0.12) 0%, rgba(0, 0, 0, 0.5) 60%, #000000 100%)',
        }}
      />

      {/* 3. TWINKLING STARFIELD LAYER */}
      <div className="absolute inset-0 opacity-80">
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

      {/* 4. QUANTUM ILLUMINATED TOP CELESTIAL HORIZON ARC (IMAGE 1 SIGNATURE) */}
      {mode === 'planet' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160vw] max-w-[2200px] h-[340px] pointer-events-none opacity-80">
          <div
            className="w-full h-full rounded-[50%] border-b-2 sm:border-b-4 border-violet-400/60 filter blur-[1px]"
            style={{
              boxShadow:
                '0 20px 80px rgba(167, 139, 250, 0.55), inset 0 -15px 45px rgba(216, 180, 254, 0.4)',
              transform: 'translateY(-65%)',
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            }}
          />
        </div>
      )}

      {/* 5. GARGANTUA ROTATING ACCRETION GLOW (IMAGE 2 SIGNATURE) */}
      {mode === 'blackhole' && (
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] h-[220px] pointer-events-none opacity-60">
          <div
            className="w-full h-full rounded-[50%] border-t-2 border-b-2 border-white/60 animate-spin-accretion"
            style={{
              boxShadow:
                '0 0 70px rgba(255, 255, 255, 0.7), 0 0 120px rgba(245, 158, 11, 0.5)',
              filter: 'blur(1px)',
              animationDuration: '30s',
            }}
          />
        </div>
      )}
    </div>
  );
};
