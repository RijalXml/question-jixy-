import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Maximize2, RotateCcw, Compass, Sparkles } from 'lucide-react';

interface PlanetDef {
  name: string;
  dist: number;
  radius: number;
  color: string;
  speed: number;
  angle: number;
  hasRings?: boolean;
}

export const SpaceOrbitSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(42); // 0:42 / 2:41
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [showLabels, setShowLabels] = useState(true);

  const totalDuration = 161; // 2:41

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const planets: PlanetDef[] = [
      { name: 'Merkurius', dist: 38, radius: 3, color: '#a3a3a3', speed: 0.04, angle: 0.5 },
      { name: 'Venus', dist: 58, radius: 4.5, color: '#f59e0b', speed: 0.025, angle: 1.8 },
      { name: 'Bumi', dist: 85, radius: 5, color: '#38bdf8', speed: 0.018, angle: 3.2 },
      { name: 'Mars', dist: 115, radius: 4, color: '#ef4444', speed: 0.014, angle: 4.5 },
      { name: 'Jupiter', dist: 155, radius: 9, color: '#fb923c', speed: 0.009, angle: 0.8 },
      { name: 'Saturnus', dist: 195, radius: 7.5, color: '#eab308', speed: 0.006, angle: 2.1, hasRings: true },
    ];

    const render = () => {
      // Resize canvas to match display size
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const height = (canvas.height = 360);

      const cx = width / 2;
      const cy = height / 2;

      // Dark cosmos background
      ctx.fillStyle = '#04030a';
      ctx.fillRect(0, 0, width, height);

      // Star particles in background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 37) % width);
        const sy = ((i * 73) % height);
        ctx.fillRect(sx, sy, 1.2, 1.2);
      }

      // Draw Sun
      const sunGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 20);
      sunGrad.addColorStop(0, '#fffbeb');
      sunGrad.addColorStop(0.3, '#fde047');
      sunGrad.addColorStop(0.7, '#f59e0b');
      sunGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Sun glow
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Orbit tracks & Planets
      planets.forEach((p) => {
        // Orbit track
        ctx.beginPath();
        ctx.arc(cx, cy, p.dist, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Calculate planet position
        const px = cx + Math.cos(p.angle) * p.dist;
        const py = cy + Math.sin(p.angle) * p.dist;

        // Draw Saturn Rings
        if (p.hasRings) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(0.35);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.2, p.radius * 0.7, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.restore();
        }

        // Draw Planet Body
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Earth Moon
        if (p.name === 'Bumi') {
          const mx = px + Math.cos(p.angle * 8) * 11;
          const my = py + Math.sin(p.angle * 8) * 11;
          ctx.beginPath();
          ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#e2e8f0';
          ctx.fill();
        }

        // Planet Label
        if (showLabels) {
          ctx.font = '9px "Space Grotesk", sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.textAlign = 'center';
          ctx.fillText(p.name, px, py - p.radius - 4);
        }

        // Update angle if playing
        if (isPlaying) {
          p.angle += p.speed * speedMultiplier;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, speedMultiplier, showLabels]);

  // Scrubber ticker
  useEffect(() => {
    let t: any;
    if (isPlaying) {
      t = setInterval(() => {
        setCurrentTime((prev) => (prev >= totalDuration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(t);
  }, [isPlaying]);

  return (
    <div className="w-full space-y-3 select-none">
      <div className="flex items-center justify-between">
        <h4 className="text-base sm:text-lg font-bold text-white font-space flex items-center gap-2">
          <span className="text-violet-400">▶</span>
          <span>And My Favorite Space Animation (Simulasi Orbit Tata Surya)</span>
        </h4>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLabels((prev) => !prev)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-all font-mono ${
              showLabels
                ? 'bg-violet-600/30 border-violet-400 text-violet-200'
                : 'bg-white/5 border-white/10 text-zinc-400'
            }`}
          >
            Label Planet: {showLabels ? 'ON' : 'OFF'}
          </button>
          <button
            type="button"
            onClick={() =>
              setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 4 : 1))
            }
            className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-200 hover:text-white font-mono"
          >
            {speedMultiplier}x Speed
          </button>
        </div>
      </div>

      {/* Video / Simulation Container matching Image 2 */}
      <div className="relative overflow-hidden rounded-2xl glass-panel border border-white/20 bg-black/80 shadow-2xl">
        <div className="w-full h-[360px] relative">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Floating watermarked title */}
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/60 border border-white/10 text-zinc-300">
              🔭 Interactive Keplerian Orbit Engine
            </span>
          </div>
        </div>

        {/* Video Player Controller Bar matching Image 2 */}
        <div className="px-4 py-3 bg-black/90 border-t border-white/10 flex items-center gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label={isPlaying ? 'Jeda Simulasi' : 'Jalankan Simulasi'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5 fill-white" />
            )}
          </button>

          {/* Timecode */}
          <span className="text-zinc-300 select-none shrink-0">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </span>

          {/* Progress Timeline Scrubber */}
          <div
            className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              setCurrentTime(Math.round(pct * totalDuration));
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
              style={{
                width: `${Math.min(100, (currentTime / totalDuration) * 100)}%`,
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setCurrentTime(0)}
            className="text-zinc-400 hover:text-white transition-colors"
            title="Ulangi"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
