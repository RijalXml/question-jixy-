import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  type: 'synth' | 'ambient';
}

const TRACKS: Track[] = [
  {
    id: 'pigstep',
    title: 'Pigstep (Space Synth Remix)',
    artist: 'Lena Raine / Cosmic Edit',
    duration: 80, // 1:20
    type: 'synth',
  },
  {
    id: 'moog_city',
    title: 'Moog city 2',
    artist: 'C418 / Deep Space Ambient',
    duration: 179, // 2:59
    type: 'ambient',
  },
];

export const SpaceAudioPlayer: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({
    pigstep: 0,
    moog_city: 0,
  });
  const [isMuted, setIsMuted] = useState(false);

  // Web Audio Context & Nodes ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    oscs: OscillatorNode[];
    gain: GainNode | null;
    intervalId?: any;
  }>({ oscs: [], gain: null });

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Stop currently active Web Audio synth
  const stopSynth = () => {
    if (synthNodesRef.current.intervalId) {
      clearInterval(synthNodesRef.current.intervalId);
      synthNodesRef.current.intervalId = undefined;
    }
    synthNodesRef.current.oscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    synthNodesRef.current.oscs = [];
    if (synthNodesRef.current.gain) {
      try {
        synthNodesRef.current.gain.disconnect();
      } catch (e) {}
      synthNodesRef.current.gain = null;
    }
  };

  // Start synthesizing ambient cosmic sound
  const startSynth = (track: Track) => {
    stopSynth();

    try {
      const AudioCtxClass =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      synthNodesRef.current.gain = masterGain;

      // Filter for space warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, ctx.currentTime);
      filter.connect(masterGain);

      const oscs: OscillatorNode[] = [];

      if (track.id === 'moog_city') {
        // Moog City 2: Serene floating space chord (C minor 9 / F minor space pad)
        const freqs = [130.81, 155.56, 196.0, 233.08, 293.66]; // C3, Eb3, G3, Bb3, D4
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          // Subtle slow vibrato / detune
          osc.detune.setValueAtTime((idx - 2) * 4, ctx.currentTime);

          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(0.18, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start();
          oscs.push(osc);
        });
      } else {
        // Pigstep synth remix: rhythmic cosmic pulse bass & melodic chord
        const freqs = [98.0, 146.83, 196.0, 293.66]; // G2, D3, G3, D4
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx === 0 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(idx === 0 ? 0.22 : 0.14, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start();
          oscs.push(osc);
        });

        // Pulsing LFO filter cutoff
        let tick = 0;
        synthNodesRef.current.intervalId = setInterval(() => {
          tick++;
          const targetFreq = 400 + Math.sin(tick * 0.4) * 350;
          try {
            filter.frequency.linearRampToValueAtTime(
              targetFreq,
              ctx.currentTime + 0.15
            );
          } catch (e) {}
        }, 200);
      }

      synthNodesRef.current.oscs = oscs;
    } catch (e) {
      console.warn('Web Audio playback error', e);
    }
  };

  // Play/Pause toggle
  const handleTogglePlay = (track: Track) => {
    if (activeTrackId === track.id && isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      setActiveTrackId(track.id);
      setIsPlaying(true);
      startSynth(track);
    }
  };

  // Mute toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (synthNodesRef.current.gain && audioCtxRef.current) {
      synthNodesRef.current.gain.gain.setValueAtTime(
        nextMuted ? 0 : 0.12,
        audioCtxRef.current.currentTime
      );
    }
  };

  // Progress ticker effect
  useEffect(() => {
    let timer: any;
    if (isPlaying && activeTrackId) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const curr = prev[activeTrackId] || 0;
          const track = TRACKS.find((t) => t.id === activeTrackId);
          const max = track ? track.duration : 120;
          const next = curr + 1;
          if (next >= max) {
            stopSynth();
            setIsPlaying(false);
            return { ...prev, [activeTrackId]: 0 };
          }
          return { ...prev, [activeTrackId]: next };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeTrackId]);

  // Clean up on unmount
  useEffect(() => {
    return () => stopSynth();
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold font-orbitron text-white tracking-wide">
          Media
        </h3>
        <p className="text-xs text-zinc-400 font-space mt-1">
          Audio Musik & Suasana Belajar Antariksa (Real-time Synthesizer)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {TRACKS.map((track) => {
          const isThisPlaying = activeTrackId === track.id && isPlaying;
          const currentSec = progress[track.id] || 0;
          const pct = Math.min(100, (currentSec / track.duration) * 100);

          return (
            <div
              key={track.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0b21]/90 backdrop-blur-2xl p-5 shadow-xl transition-all hover:border-white/20"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm sm:text-base font-bold text-white font-space">
                  {track.id === 'pigstep'
                    ? 'One of My Favorite Songs'
                    : 'Another Track I Love'}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-violet-300/80">
                  <Music className="w-3.5 h-3.5 text-violet-400" />
                  <span className="font-mono text-[11px] truncate max-w-[120px]">
                    {track.title}
                  </span>
                </div>
              </div>

              {/* Minimalist Audio Bar matching Image 2 */}
              <div className="rounded-full bg-white/10 border border-white/20 px-3.5 py-2 flex items-center gap-3 backdrop-blur-md">
                {/* Play/Pause Button */}
                <button
                  type="button"
                  onClick={() => handleTogglePlay(track)}
                  aria-label={isThisPlaying ? 'Pause Audio' : 'Play Audio'}
                  className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  {isThisPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-black" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                  )}
                </button>

                {/* Timecode */}
                <span className="text-[11px] font-mono text-zinc-300 shrink-0 select-none">
                  {formatTime(currentSec)} / {formatTime(track.duration)}
                </span>

                {/* Scrubber track */}
                <div
                  className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newPct = Math.max(0, Math.min(1, clickX / rect.width));
                    setProgress((prev) => ({
                      ...prev,
                      [track.id]: Math.round(newPct * track.duration),
                    }));
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-violet-400 to-white rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Volume icon */}
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="text-zinc-300 hover:text-white transition-colors shrink-0"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Active Soundwave Indicator */}
              {isThisPlaying && (
                <div className="mt-3 flex items-center justify-center gap-1">
                  {[40, 75, 100, 60, 90, 45, 80, 50, 65, 85].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-violet-400 rounded-full animate-pulse"
                      style={{
                        height: `${Math.max(4, (h / 100) * 16)}px`,
                        animationDelay: `${i * 0.12}s`,
                        animationDuration: '0.8s',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
