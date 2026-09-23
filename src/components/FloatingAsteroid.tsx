import React from 'react';
import asteroidImg from '../assets/images/cosmic_asteroid_1790164146766.jpg';

interface FloatingAsteroidProps {
  className?: string;
  size?: number | string;
  rotation?: number;
  blur?: boolean;
  glow?: boolean;
}

/**
 * Ultra-lightweight static asteroid:
 * - Removed infinite CSS keyframe transforms
 * - Zero GPU / CPU cycle waste
 * - Retains gorgeous chiseled 3D rock visual with specular rim highlight
 */
export const FloatingAsteroid: React.FC<FloatingAsteroidProps> = ({
  className = '',
  size = 120,
  rotation = 0,
  blur = false,
  glow = true,
}) => {
  const styleSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`pointer-events-none select-none z-20 ${className}`}
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
          filter: `${blur ? 'blur(2px)' : 'contrast(1.15) brightness(1.1)'} ${
            glow ? 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))' : ''
          }`,
        }}
        loading="lazy"
      />
    </div>
  );
};
