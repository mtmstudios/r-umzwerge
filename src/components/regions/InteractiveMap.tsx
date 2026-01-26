import { REGIONS } from '@/lib/constants';

// Coordinates calibrated to the actual SVG map (viewBox 595.5 x 842.25)
// Based on Baden-Württemberg (left) and Bayern (right)
const cityCoordinates: Record<string, { x: number; y: number; labelOffset?: { x: number; y: number } }> = {
  // Baden-Württemberg (linker Teil der Karte)
  stuttgart:   { x: 175, y: 340, labelOffset: { x: -90, y: 5 } },
  reutlingen:  { x: 195, y: 420, labelOffset: { x: -95, y: 5 } },
  aalen:       { x: 265, y: 310, labelOffset: { x: 10, y: -8 } },
  heidenheim:  { x: 285, y: 365, labelOffset: { x: 12, y: 5 } },
  ulm:         { x: 295, y: 430, labelOffset: { x: 12, y: 5 } },
  ravensburg:  { x: 240, y: 560, labelOffset: { x: 12, y: 5 } },
  // Bayern (rechter Teil der Karte)
  augsburg:    { x: 390, y: 455, labelOffset: { x: 12, y: 5 } },
  muenchen:    { x: 470, y: 520, labelOffset: { x: 12, y: 5 } },
};

export function InteractiveMap() {
  return (
    <div className="relative overflow-hidden">
      {/* Map Container */}
      <div className="relative">
        {/* SVG Map as background */}
        <img
          src="/images/sueddeutschland-map.svg"
          alt="Karte von Süddeutschland"
          className="w-full h-auto"
        />

        {/* Overlay for markers */}
        <svg
          viewBox="0 0 595.5 842.25"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {REGIONS.map((region) => {
            const coords = cityCoordinates[region.slug];
            if (!coords) return null;

            const labelOffset = coords.labelOffset || { x: 12, y: 5 };

            return (
              <a
                key={region.slug}
                href={`/region/${region.slug}`}
                className="group"
              >
                <g className="cursor-pointer">
                  {/* Simple dot */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="8"
                    className="fill-primary transition-all duration-200 group-hover:fill-accent group-hover:scale-125"
                    style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                  />
                  
                  {/* White border for visibility */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="8"
                    className="fill-none stroke-white stroke-2 transition-all duration-200 group-hover:scale-125"
                    style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                  />

                  {/* City name - responsive text size */}
                  <text
                    x={coords.x + labelOffset.x}
                    y={coords.y + labelOffset.y}
                    className="text-[16px] md:text-[18px] font-semibold fill-foreground transition-all duration-200 group-hover:fill-primary"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {region.name}
                  </text>
                </g>
              </a>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
