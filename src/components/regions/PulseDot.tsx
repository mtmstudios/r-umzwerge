import { cn } from '@/lib/utils';

interface PulseDotProps {
  cx: number;
  cy: number;
  isHQ: boolean;
  isHovered: boolean;
}

export function PulseDot({ cx, cy, isHQ, isHovered }: PulseDotProps) {
  const baseRadius = isHQ ? 12 : 8;
  const pulseRadius = isHQ ? 20 : 14;

  return (
    <g>
      {/* Outer pulse ring - animated */}
      <circle
        cx={cx}
        cy={cy}
        r={pulseRadius}
        className={cn(
          "animate-ping",
          isHQ ? "fill-destructive/30" : "fill-accent/30"
        )}
        style={{
          animationDuration: '2s',
          animationIterationCount: 'infinite',
        }}
      />

      {/* Second pulse ring - offset animation */}
      <circle
        cx={cx}
        cy={cy}
        r={pulseRadius * 0.7}
        className={cn(
          "animate-ping",
          isHQ ? "fill-destructive/40" : "fill-accent/40"
        )}
        style={{
          animationDuration: '2s',
          animationDelay: '0.5s',
          animationIterationCount: 'infinite',
        }}
      />

      {/* Glow effect */}
      <circle
        cx={cx}
        cy={cy}
        r={baseRadius + 4}
        className={cn(
          "transition-all duration-300",
          isHQ ? "fill-destructive/20" : "fill-accent/20",
          isHovered && "fill-opacity-50"
        )}
        filter="url(#glow)"
      />

      {/* Main dot */}
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? baseRadius + 2 : baseRadius}
        className={cn(
          "transition-all duration-200",
          isHQ
            ? "fill-destructive stroke-white"
            : "fill-accent stroke-white",
          isHovered && "stroke-[3]"
        )}
        strokeWidth="2"
        style={{
          filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : undefined,
        }}
      />

      {/* Inner highlight */}
      <circle
        cx={cx - baseRadius * 0.25}
        cy={cy - baseRadius * 0.25}
        r={baseRadius * 0.3}
        className="fill-white/40"
      />

      {/* SVG Filter for glow effect */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </g>
  );
}
