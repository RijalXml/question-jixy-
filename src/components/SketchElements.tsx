import React from 'react';

/**
 * Hand-drawn unfinished sketch elements, doodle annotations,
 * and drafting blueprint accents for the educational quiz UI.
 */

// 1. Unfinished Book Sketch with drafting lines and hatchings
export const SketchBookIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} stroke-current`}>
    {/* Dashed construction guide lines */}
    <line x1="10" y1="50" x2="110" y2="50" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.35" />
    <line x1="60" y1="10" x2="60" y2="90" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.35" />
    <circle cx="60" cy="50" r="42" strokeDasharray="2 4" strokeWidth="0.6" opacity="0.25" />

    {/* Spine & Pages - slightly jittery hand-drawn paths */}
    <path
      d="M60 28 C60 28, 60 78, 60 82"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Left Page Outline */}
    <path
      d="M60 28 C45 22, 25 24, 14 30 C12 45, 13 65, 14 80 C26 75, 46 74, 60 80"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Left Page Multi-layer Draft Edges */}
    <path
      d="M15 82 C28 77, 46 76, 60 82"
      strokeWidth="1.2"
      opacity="0.6"
    />
    <path
      d="M16 84 C29 79, 47 78, 60 84"
      strokeWidth="1"
      strokeDasharray="4 2"
      opacity="0.45"
    />

    {/* Right Page Outline (Unfinished / In-Progress) */}
    <path
      d="M60 28 C75 22, 95 24, 106 30 C108 42, 107 60, 106 78 C94 73, 74 74, 60 80"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Unfinished Right Page guidelines */}
    <path
      d="M106 78 L114 82"
      strokeWidth="1"
      strokeDasharray="2 2"
      opacity="0.5"
    />
    <path
      d="M60 80 L112 84"
      strokeWidth="1.2"
      opacity="0.5"
    />

    {/* Left page text hatchings (sketchy text lines) */}
    <line x1="22" y1="38" x2="48" y2="37" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="22" y1="45" x2="52" y2="44" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="22" y1="52" x2="45" y2="51" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="22" y1="59" x2="50" y2="58" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="22" y1="66" x2="38" y2="65" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

    {/* Right page crosshatch shading (sketch wip) */}
    <line x1="68" y1="36" x2="98" y2="36" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
    <line x1="68" y1="43" x2="94" y2="43" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
    <line x1="68" y1="50" x2="96" y2="50" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />

    {/* Pencil drawing pointing to page */}
    <g transform="translate(85, 52) rotate(-35)">
      <polygon points="0,0 4,20 8,20 12,0" strokeWidth="1" fill="none" opacity="0.8" />
      <polygon points="4,20 6,26 8,20" strokeWidth="1" fill="currentColor" opacity="0.6" />
      <line x1="6" y1="0" x2="6" y2="20" strokeWidth="0.8" opacity="0.5" />
    </g>

    {/* Handwritten label in sketch */}
    <text x="14" y="95" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.5" stroke="none">
      draft_lks_v1.sketsa
    </text>
  </svg>
);

// 2. Unfinished Trophy Sketch
export const SketchTrophyIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} stroke-current`}>
    {/* Geometric layout center guide */}
    <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="3 3" strokeWidth="0.7" opacity="0.3" />
    <line x1="15" y1="30" x2="85" y2="30" strokeDasharray="2 3" strokeWidth="0.7" opacity="0.3" />

    {/* Cup outline */}
    <path
      d="M28 20 C28 20, 26 48, 50 56 C74 48, 72 20, 72 20 Z"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Rim ellipse */}
    <ellipse cx="50" cy="20" rx="22" ry="5" strokeWidth="1.4" strokeDasharray="6 2" opacity="0.8" />

    {/* Cup handles (rough sketch) */}
    <path
      d="M27 24 C14 26, 12 42, 26 46 C30 47, 33 46, 35 44"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M73 24 C86 26, 88 42, 74 46 C70 47, 67 46, 65 44"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Stem */}
    <path d="M46 56 L44 68 L56 68 L54 56" strokeWidth="1.6" strokeLinecap="round" />

    {/* Base */}
    <path d="M36 68 L32 82 L68 82 L64 68 Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="28" y1="86" x2="72" y2="86" strokeWidth="1.5" strokeLinecap="round" />

    {/* Unfinished Star inside cup */}
    <path
      d="M50 28 L52 35 L59 35 L53 39 L55 46 L50 42 L45 46 L47 39 L41 35 L48 35 Z"
      strokeWidth="1"
      opacity="0.7"
    />

    {/* Sketch dimension arrow */}
    <path d="M78 20 L86 20 M82 15 L82 82 M78 82 L86 82" strokeWidth="0.8" opacity="0.4" />
    <text x="85" y="52" fontSize="6" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.5">
      skor:100
    </text>
  </svg>
);

// 3. Hand-drawn Curly Arrow pointing to button or badge
export const SketchArrow: React.FC<{
  direction?: 'down-right' | 'up-right' | 'right' | 'curved';
  className?: string;
}> = ({ direction = 'down-right', className = 'w-12 h-12' }) => {
  if (direction === 'curved') {
    return (
      <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} stroke-current`}>
        <path
          d="M8 8 C15 32, 40 36, 50 22"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M44 18 L52 22 L48 29"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === 'up-right') {
    return (
      <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} stroke-current`}>
        <path
          d="M10 40 C14 20, 24 14, 40 12"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M32 8 L42 12 L36 22"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} stroke-current`}>
      <path
        d="M6 10 C18 6, 38 10, 48 26"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M40 26 L50 28 L48 18"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 4. Hand-drawn Wavy Underline
export const SketchUnderline: React.FC<{ className?: string }> = ({ className = 'w-28 h-3' }) => (
  <svg viewBox="0 0 140 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} stroke-current`}>
    <path
      d="M3 7 C18 3, 30 11, 48 6 C66 2, 82 10, 100 5 C114 2, 126 9, 137 6"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M8 11 C25 8, 42 12, 60 8 C78 5, 96 11, 114 8 C124 6, 131 9, 135 9"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// 5. Hand-drawn Rough Pencil Circle/Lasso
export const SketchCircle: React.FC<{ className?: string }> = ({ className = 'w-16 h-8' }) => (
  <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} stroke-current`}>
    <path
      d="M40 4 C18 4, 3 12, 4 22 C5 32, 22 36, 44 36 C66 36, 76 28, 75 18 C74 9, 58 5, 42 5"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M48 6 C68 7, 78 14, 76 21 C73 30, 52 35, 34 35"
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// 6. Washi Tape / Masking Tape with Sketch Texture
export const SketchWashiTape: React.FC<{
  text?: string;
  className?: string;
  color?: 'amber' | 'emerald' | 'blue' | 'zinc';
}> = ({ text = 'SKETSA DRAFT', className = '', color = 'amber' }) => {
  const colorMap = {
    amber: 'bg-amber-100/90 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700',
    emerald: 'bg-emerald-100/90 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700',
    blue: 'bg-blue-100/90 text-blue-900 border-blue-300 dark:bg-blue-950/80 dark:text-blue-200 dark:border-blue-700',
    zinc: 'bg-zinc-200/90 text-zinc-900 border-zinc-400 dark:bg-zinc-800/80 dark:text-zinc-200 dark:border-zinc-600',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border border-dashed shadow-xs -rotate-2 select-none ${colorMap[color]} ${className}`}
      style={{
        clipPath: 'polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)',
      }}
    >
      <span className="opacity-60">✎</span>
      <span>{text}</span>
    </div>
  );
};

// 7. Graph Paper Millimeter Draft Accent
export const SketchDraftGrid: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <div
    className={`pointer-events-none opacity-20 dark:opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:10px_10px] ${className}`}
  />
);

// 8. Pencil Sketch Doodle Icon (Pencil with graphite hatch)
export const SketchPencilDoodle: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} stroke-current`}>
    <path
      d="M4 28 L9 26 L24 11 L19 6 L4 21 Z"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M4 28 L4 23 L9 28 Z" fill="currentColor" opacity="0.7" stroke="none" />
    <path d="M16 9 L21 14" strokeWidth="1.4" />
    <path d="M22 9 L26 5 C27 4, 28 5, 29 6 C30 7, 30 8, 29 9 L25 13" strokeWidth="1.5" />
    {/* Doodle motion scribble */}
    <path d="M2 30 C5 29, 8 31, 12 30" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 9. Floating Draft Scratchpad Modal for Student Scribbling & Notes
interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
}

export const SketchScratchpadModal: React.FC<ScratchpadProps> = ({ isOpen, onClose, studentName = 'Siswa' }) => {
  const [activeTool, setActiveTool] = React.useState<'pencil' | 'pen' | 'highlighter' | 'eraser'>('pencil');
  const [color, setColor] = React.useState('#1e293b');
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const isDrawing = React.useRef(false);
  const lastPoint = React.useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale canvas for sharp retina rendering
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Initial background grid drawing
    drawGrid(ctx, rect.width, rect.height);
  }, [isOpen]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 0.5;
    const step = 20;

    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Left red notebook margin
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(35, 0);
    ctx.lineTo(35, height);
    ctx.stroke();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    isDrawing.current = true;
    lastPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !lastPoint.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);

    if (activeTool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx.stroke();
    } else if (activeTool === 'highlighter') {
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
      ctx.lineWidth = 14;
      ctx.lineCap = 'square';
      ctx.stroke();
    } else if (activeTool === 'pen') {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
    } else {
      // Pencil mode (with slight sketch texture)
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    lastPoint.current = currentPoint;
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    drawGrid(ctx, rect.width, rect.height);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#fcfbfa] dark:bg-zinc-900 border-2 border-dashed border-zinc-400 dark:border-zinc-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header tape & title */}
        <div className="px-5 py-4 bg-zinc-100/90 dark:bg-zinc-800/90 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SketchWashiTape text="SKETSA & CORETAN DRAFT" color="amber" />
            <div>
              <h3 className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <span>Kertas Coretan Siswa</span>
                <span className="text-xs text-zinc-400 font-normal">({studentName})</span>
              </h3>
              <p className="text-[11px] text-zinc-500 font-sans">
                Gunakan untuk sketsa hitungan rumus, catatan kosakata, atau coretan belajar LKS.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-2 bg-white dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-700 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setActiveTool('pencil');
                setColor('#1e293b');
              }}
              className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition-all ${
                activeTool === 'pencil'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <span>✏️ Pensil 2B</span>
            </button>
            <button
              onClick={() => {
                setActiveTool('pen');
                setColor('#2563eb');
              }}
              className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition-all ${
                activeTool === 'pen'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <span>🖊️ Pulpen Biru</span>
            </button>
            <button
              onClick={() => {
                setActiveTool('highlighter');
              }}
              className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition-all ${
                activeTool === 'highlighter'
                  ? 'bg-amber-400 text-amber-950 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <span>🖍️ Stabilo Kuning</span>
            </button>
            <button
              onClick={() => setActiveTool('eraser')}
              className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition-all ${
                activeTool === 'eraser'
                  ? 'bg-rose-500 text-white font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <span>🧼 Penghapus</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium transition-colors"
            >
              Bersihkan Kertas
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
            >
              Selesai Mencoret
            </button>
          </div>
        </div>

        {/* Canvas area (styled like millimeter notebook paper) */}
        <div className="relative flex-1 bg-white min-h-[380px] sm:min-h-[460px] cursor-crosshair overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full block touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          {/* Subtle draft watermark */}
          <div className="absolute bottom-3 right-4 pointer-events-none text-[10px] font-mono text-zinc-400 select-none">
            [DRAFT SKETSA • LEMBAR KERJA SISWA 2026]
          </div>
        </div>
      </div>
    </div>
  );
};
