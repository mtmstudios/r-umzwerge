import { cn } from '@/lib/utils';

interface SectionDividerProps {
  variant?: 'angle' | 'wave' | 'curve' | 'gradient' | 'glow';
  direction?: 'up' | 'down';
  className?: string;
  fillClassName?: string;
  fromColor?: string;
  toColor?: string;
}

export function SectionDivider({
  variant = 'angle',
  direction = 'down',
  className,
  fillClassName = 'fill-background',
  fromColor = 'hsl(var(--background))',
  toColor = 'hsl(var(--secondary) / 0.3)',
}: SectionDividerProps) {
  const isFlipped = direction === 'up';

  // Gradient variants use CSS instead of SVG
  if (variant === 'gradient') {
    return (
      <div
        className={cn(
          'relative w-full pointer-events-none',
          isFlipped && 'rotate-180',
          className
        )}
        style={{
          height: '60px',
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        }}
      />
    );
  }

  if (variant === 'glow') {
    return (
      <div
        className={cn(
          'relative w-full pointer-events-none',
          isFlipped && 'rotate-180',
          className
        )}
        style={{ height: '80px' }}
      >
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
          }}
        />
        {/* Accent glow line in the middle */}
        <div
          className="absolute left-0 right-0 h-[2px]"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'hsl(var(--accent))',
            boxShadow: '0 0 20px hsl(var(--accent) / 0.5), 0 0 40px hsl(var(--accent) / 0.3)',
            opacity: 0.6,
          }}
        />
      </div>
    );
  }

  // SVG-based variants
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
