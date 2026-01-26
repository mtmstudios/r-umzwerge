import { cn } from '@/lib/utils';

interface SectionDividerProps {
  variant?: 'angle' | 'wave' | 'curve';
  direction?: 'up' | 'down';
  className?: string;
  fillClassName?: string;
}

export function SectionDivider({
  variant = 'angle',
  direction = 'down',
  className,
  fillClassName = 'fill-background',
}: SectionDividerProps) {
  const isFlipped = direction === 'up';

  const paths = {
    angle: 'M0,0 L100,100 L100,0 Z',
    wave: 'M0,50 Q25,0 50,50 T100,50 L100,0 L0,0 Z',
    curve: 'M0,100 Q50,0 100,100 L100,0 L0,0 Z',
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden pointer-events-none',
        isFlipped && 'rotate-180',
        className
      )}
      style={{ marginTop: '-1px', marginBottom: '-1px' }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={cn('w-full h-16 md:h-20 lg:h-24', fillClassName)}
      >
        {variant === 'angle' && (
          <polygon points="0,100 100,0 100,100" />
        )}
        {variant === 'wave' && (
          <path d="M0,40 Q20,0 40,40 T80,40 T120,40 L100,100 L0,100 Z" />
        )}
        {variant === 'curve' && (
          <path d="M0,100 Q50,0 100,100 L100,100 L0,100 Z" />
        )}
      </svg>
    </div>
  );
}
