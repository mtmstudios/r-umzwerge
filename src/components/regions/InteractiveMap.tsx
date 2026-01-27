import { REGIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Coordinates calibrated to the actual SVG map (viewBox 595.5 x 842.25)
// Based on Baden-Württemberg (left) and Bayern (right)
const cityCoordinates: Record<string, { x: number; y: number }> = {
  // Baden-Württemberg (linker Teil der Karte)
  stuttgart:   { x: 175, y: 340 },
  reutlingen:  { x: 195, y: 420 },
  aalen:       { x: 265, y: 310 },
  heidenheim:  { x: 285, y: 365 },
  ulm:         { x: 295, y: 430 },
  ravensburg:  { x: 240, y: 560 },
  // Bayern (rechter Teil der Karte)
  augsburg:    { x: 390, y: 455 },
  muenchen:    { x: 470, y: 520 },
};

interface InteractiveMapProps {
  activeCity?: string | null;
  onCityHover?: (slug: string | null) => void;
}

export function InteractiveMap({ activeCity, onCityHover }: InteractiveMapProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Map Container */}
      <div className="relative mx-auto max-w-[560px] lg:max-w-none">
        {/* SVG Map as background */}
        <img
          src="/images/sueddeutschland-map.svg"
          alt="Karte von Süddeutschland"
          className="w-full h-auto"
        />

        {/* Overlay for markers */}
        <svg
          viewBox="100 240 450 400"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {REGIONS.map((region) => {
            const coords = cityCoordinates[region.slug];
            if (!coords) return null;

            const isActive = activeCity === region.slug;
            const isHQ = region.isHQ;

            return (
              <a
                key={region.slug}
                href={`/region/${region.slug}`}
                className="group"
                onMouseEnter={() => onCityHover?.(region.slug)}
                onMouseLeave={() => onCityHover?.(null)}
              >
                <g className="cursor-pointer">
                  {/* Glow effect for active marker */}
                  {isActive && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="20"
                      className="fill-accent/30 animate-pulse-subtle"
                    />
                  )}
                  
                  {/* Main dot */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isActive ? 12 : 8}
                    className={cn(
                      "transition-all duration-300",
                      isActive
                        ? "fill-accent drop-shadow-glow"
                        : isHQ
                        ? "fill-primary"
                        : "fill-primary group-hover:fill-accent"
                    )}
                    style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                  />
                  
                  {/* White border for visibility */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isActive ? 12 : 8}
                    className={cn(
                      "fill-none stroke-white transition-all duration-300",
                      isActive ? "stroke-[3]" : "stroke-2"
                    )}
                    style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                  />

                  {/* HQ pulse animation */}
                  {isHQ && !isActive && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="16"
                      className="fill-none stroke-primary/40 stroke-2 animate-pulse-subtle"
                    />
                  )}
                </g>
              </a>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
