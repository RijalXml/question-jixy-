import React, { useEffect, useRef, useState } from 'react';
import { Compass, RotateCcw, Sparkles } from 'lucide-react';

interface PlanetDef {
  name: string;
  dist: number;
  radius: number;
  color: string;
  angle: number;
  hasRings?: boolean;
}

/**
 * Ultra-lightweight Static Orbit Infographic:
 * - Removed heavy continuous 60fps requestAnimationFrame loop
 * - Renders crisp vector solar system diagram once
 * - 0% continuous CPU and battery drain
 */
export const SpaceOrbitSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 340);

    const cx = width / 2;
    const cy = height / 2;

    // Dark space background
    ctx.fillStyle = '#060410';
    ctx.fillRect(0, 0, width, height);

    // Subtle star dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 35; i++) {
      const sx = (i * 43) % width;
      const sy = (i * 79) % height;
      ctx.fillRect(sx, sy, 1.2, 1.2);
    }

    const planets: PlanetDef[] = [
      { name: 'Merkurius', dist: 38, radius: 3, color: '#94a3b8', angle: 0.8 },
      { name: 'Venus', dist: 60, radius: 4.5, color: '#f59e0b', angle: 2.1 },
      { name: 'Bumi', dist: 90, radius: 5, color: '#38bdf8', angle: 3.7 },
      { name: 'Mars', dist: 122, radius: 4, color: '#ef4444', angle: 5.1 },
      { name: 'Jupiter', dist: 160, radius: 9, color: '#fb923c', angle: 1.4 },
      { name: 'Saturnus', dist: 200, radius: 7.5, color: '#eab308', angle: 4.2, hasRings: true },
    ];

    // Sun gradient
    const sunGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 20);
    sunGrad.addColorStop(0, '#fffbeb');
    sunGrad.addColorStop(0.3, '#fde047');
    sunGrad.addColorStop(0.7, '#f59e0b');
    sunGrad.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fillStyle = sunGrad;
    ctx.fill();

    // Sun center core
    ctx.beginPath();
    ctx.arc(cx, cy, 11, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Draw orbits and static planets
    planets.forEach((p) => {
      // Orbit track
      ctx.beginPath();
      ctx.arc(cx, cy, p.dist, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      const px = cx + Math.cos(p.angle) * p.dist;
      const py = cy + Math.sin(p.angle) * p.dist;

      // Saturn Rings
      if (p.hasRings) {
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(0.35);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 2.2, p.radius * 0.7, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.7)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
      }

      // Planet body
      ctx.beginPath();
      ctx.arc(px, py, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Earth Moon
      if (p.name === 'Bumi') {
        const mx = px + 10;
        const my = py - 4;
        ctx.beginPath();
        ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#cbd5e1';
        ctx.fill();
      }

      // Planet label
      if (showLabels) {
        ctx.font = '10px "Space Grotesk", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, px, py - p.radius - 5);
      }
    });
  }, [showLabels]);

  return (
    <div className="w-full space-y-3 select-none">
      <div className="flex items-center justify-between">
        <h4 className="text-base sm:text-lg font-bold text-white font-space flex items-center gap-2">
          <span className="text-violet-400">✦</span>
          <span>Peta Tata Surya & Orbit Planet (Materi IPA Terpadu)</span>
        </h4>
        <button
          type="button"
          onClick={() => setShowLabels((prev) => !prev)}
          className={`text-xs px-3 py-1 rounded-full border transition-all font-mono ${
            showLabels
              ? 'bg-violet-600/30 border-violet-400 text-violet-200'
              : 'bg-white/5 border-white/10 text-zinc-400'
          }`}
        >
          Label Planet: {showLabels ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Frame Container */}
      <div className="relative overflow-hidden rounded-2xl glass-panel border border-white/20 bg-black/85 shadow-2xl">
        <div className="w-full h-[340px] relative">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Watermark badge */}
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-black/70 border border-white/15 text-zinc-300">
              🔭 Bagan Orbit Keplerian · Ringan & Presisi
            </span>
          </div>
        </div>

        {/* Minimalist Info Bar */}
        <div className="px-5 py-3 bg-black/90 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
          <span className="text-zinc-300">
            Skala Orbit: Merkurius · Venus · Bumi · Mars · Jupiter · Saturnus
          </span>
          <span className="text-violet-300">Mode Ringan (0% Beban CPU)</span>
        </div>
      </div>
    </div>
  );
};
