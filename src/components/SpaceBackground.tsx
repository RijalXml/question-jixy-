import React from 'react';
import quantumPlanetBg from '../assets/images/quantum_planet_bg_1790164105758.jpg';

/**
 * Ultra-lightweight, high-performance static cosmic background.
 * Optimized for everyday daily use:
 * - Single static Quantum planet backdrop texture
 * - Zero continuous keyframes or GPU animation loops
 * - Zero DOM overhead (no hundreds of animated divs)
 */
export const SpaceBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none bg-[#050510]"
    >
      {/* 1. Static Quantum Planet Texture */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url(${quantumPlanetBg})`,
          filter: 'brightness(0.92) contrast(1.1)',
        }}
      />

      {/* 2. Soft Dark Vignette & Nebula Overlay (Pure CSS, 0 CPU cost) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 15%, rgba(139, 92, 246, 0.18) 0%, rgba(5, 5, 16, 0.5) 60%, #050510 100%)',
        }}
      />

      {/* 3. Static High-Efficiency Starfield (Single SVG, 0% CPU consumption) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Subtle static constellation of stars */}
        {[
          [5, 12, 1.5], [14, 28, 1], [22, 8, 2], [31, 45, 1.2], [42, 19, 1.8],
          [55, 33, 1], [63, 12, 2.2], [72, 40, 1.4], [81, 15, 1], [89, 29, 2],
          [95, 8, 1.2], [8, 55, 1], [18, 70, 1.5], [29, 85, 2], [38, 62, 1],
          [48, 78, 1.3], [58, 92, 2], [67, 65, 1], [76, 82, 1.8], [85, 60, 1.2],
          [92, 75, 1.5], [12, 95, 1.2], [25, 38, 1.5], [49, 10, 2], [70, 22, 1.6],
          [84, 48, 1.2], [36, 25, 1.8], [61, 4, 1.5], [15, 82, 1], [52, 52, 1.4],
          [3, 35, 1], [97, 45, 1.3], [44, 90, 1.2], [79, 95, 1.5]
        ].map(([cx, cy, r], i) => (
          <circle
            key={i}
            cx={`${cx}%`}
            cy={`${cy}%`}
            r={r}
            fill={i % 3 === 0 ? '#c4b5fd' : '#ffffff'}
            opacity={0.3 + (i % 5) * 0.12}
          />
        ))}
      </svg>

      {/* 4. Crisp Static Quantum Planetary Horizon Arc */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160vw] max-w-[2200px] h-[320px] pointer-events-none opacity-85">
        <div
          className="w-full h-full rounded-[50%] border-b-2 sm:border-b-4 border-violet-400/70"
          style={{
            boxShadow:
              '0 20px 70px rgba(167, 139, 250, 0.5), inset 0 -15px 40px rgba(216, 180, 254, 0.35)',
            transform: 'translateY(-65%)',
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};
