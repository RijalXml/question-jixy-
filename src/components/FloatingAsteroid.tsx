import React from 'react';
import asteroidImg from '../assets/images/cosmic_asteroid_1790164146766.jpg';

interface FloatingAsteroidProps {
  className?: string;
  size?: number | string;
  rotation?: number;
  animation?: 'float-1' | 'float-2' | 'float-3' | 'float-4';
  blur?: boolean;
  glow?: boolean;
}

export const FloatingAsteroid: React.FC<FloatingAsteroidProps> = ({
  className = '',
  size = 120,
  rotation = 0,
  animation = 'float-1',
  blur = false,
  glow = true,
}) => {
  const animClass =
    animation === 'float-1'
      ? 'animate-float-1'
      : animation === 'float-2'
      ? 'animate-float-2'
      : animation === 'float-3'
      ? 'animate-float-3'
      : 'animate-float-4';

  const styleSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`pointer-events-none select-none z-20 ${animClass} ${className}`}
      style={{
        width: styleSize,
        height: styleSize,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <img
        src={asteroidImg}
        alt="Cosmic Asteroid"
        className="w-full h-full object-contain"
        style={{
          mixBlendMode: 'screen',
          filter: `${blur ? 'blur(3px)' : 'contrast(1.2) brightness(1.15)'} ${
            glow ? 'drop-shadow(0 0 25px rgba(139, 92, 246, 0.45))' : ''
          }`,
        }}
        loading="lazy"
      />
    </div>
  );
};
