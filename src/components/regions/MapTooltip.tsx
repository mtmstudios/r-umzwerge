import { cn } from '@/lib/utils';

interface MapTooltipProps {
  x: number;
  y: number;
  name: string;
  isHQ: boolean;
}

export function MapTooltip({ x, y, name, isHQ }: MapTooltipProps) {
  const tooltipWidth = 180;
  const tooltipHeight = 60;
  const tooltipY = y - tooltipHeight - 20;
  const tooltipX = x - tooltipWidth / 2;

  // Ensure tooltip doesn't go off screen
  const adjustedX = Math.max(10, Math.min(tooltipX, 595.5 - tooltipWidth - 10));

  return (
    <g className="pointer-events-none animate-fade-in">
      {/* Connector line */}
      <line
        x1={x}
        y1={y - 15}
        x2={x}
        y2={tooltipY + tooltipHeight}
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        className="opacity-60"
      />

      {/* Tooltip background with glassmorphism effect */}
      <rect
        x={adjustedX}
        y={tooltipY}
        width={tooltipWidth}
        height={tooltipHeight}
        rx="12"
        className="fill-card/95 stroke-border"
        strokeWidth="1"
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
        }}
      />

      {/* Accent bar at top */}
      <rect
        x={adjustedX}
        y={tooltipY}
        width={tooltipWidth}
        height="4"
        rx="12"
        className={cn(
          isHQ ? "fill-destructive" : "fill-accent"
        )}
        style={{
          clipPath: 'inset(0 0 0 0 round 12px 12px 0 0)',
        }}
      />

      {/* HQ Badge */}
      {isHQ && (
        <g>
          <rect
            x={adjustedX + tooltipWidth - 60}
            y={tooltipY + 8}
            width="52"
            height="18"
            rx="9"
            className="fill-destructive/20"
          />
          <text
            x={adjustedX + tooltipWidth - 34}
            y={tooltipY + 20}
            textAnchor="middle"
            className="text-[9px] fill-destructive font-semibold"
          >
            Hauptsitz
          </text>
        </g>
      )}

      {/* City name */}
      <text
        x={adjustedX + 14}
        y={tooltipY + 28}
        className="text-sm fill-foreground font-semibold"
      >
        {name}
      </text>

      {/* Subtitle */}
      <text
        x={adjustedX + 14}
        y={tooltipY + 46}
        className="text-[11px] fill-muted-foreground"
      >
        Entrümpelung vor Ort
      </text>

      {/* Arrow indicator */}
      <g transform={`translate(${adjustedX + tooltipWidth - 24}, ${tooltipY + 36})`}>
        <circle r="8" className="fill-accent/10" />
        <path
          d="M -3 0 L 2 0 M 0 -2 L 3 0 L 0 2"
          className="stroke-accent"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Pointer triangle */}
      <polygon
        points={`${x},${tooltipY + tooltipHeight + 8} ${x - 8},${tooltipY + tooltipHeight} ${x + 8},${tooltipY + tooltipHeight}`}
        className="fill-card/95"
      />
    </g>
  );
}
