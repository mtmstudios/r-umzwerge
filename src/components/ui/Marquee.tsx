import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
}

export function Marquee({
  children,
  className,
  speed = 'normal',
  pauseOnHover = true,
  direction = 'left',
}: MarqueeProps) {
  const speedMap = {
    slow: '40s',
    normal: '25s',
    fast: '15s',
  };

  return (
    <div
      className={cn(
        'marquee-container overflow-hidden',
        pauseOnHover && 'hover:[&_.marquee-track]:pause',
        className
      )}
    >
      <div
        className={cn(
          'marquee-track flex w-max',
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        )}
        style={{
          '--marquee-duration': speedMap[speed],
        } as React.CSSProperties}
      >
        {/* Original content */}
        <div className="flex shrink-0">{children}</div>
        {/* Duplicated for seamless loop */}
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
