import React from 'react';

interface UserAvatarProps {
  avatar?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const SIZE_CLASSES = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-xl',
  xl: 'h-16 w-16 text-2xl',
  '2xl': 'h-20 w-20 text-4xl',
};

const ROUNDED_CLASSES = {
  xs: 'rounded-md',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-2xl',
  '2xl': 'rounded-3xl',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  avatar = '🎓',
  name = 'Siswa',
  size = 'md',
  className = '',
}) => {
  const isImageUrl =
    avatar &&
    (avatar.startsWith('data:image') ||
      avatar.startsWith('http://') ||
      avatar.startsWith('https://') ||
      avatar.startsWith('blob:') ||
      avatar.startsWith('/'));

  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const roundedClass = ROUNDED_CLASSES[size] || ROUNDED_CLASSES.md;

  if (isImageUrl) {
    return (
      <div
        className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-zinc-200/80 bg-zinc-100 shadow-2xs dark:border-zinc-700/80 dark:bg-zinc-800 ${sizeClass} ${roundedClass} ${className}`}
      >
        <img
          src={avatar}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Otherwise render emoji or initial
  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center select-none border border-zinc-200/80 bg-zinc-100 shadow-2xs dark:border-zinc-800 dark:bg-zinc-800/90 ${sizeClass} ${roundedClass} ${className}`}
    >
      <span>{avatar || '🎓'}</span>
    </div>
  );
};
