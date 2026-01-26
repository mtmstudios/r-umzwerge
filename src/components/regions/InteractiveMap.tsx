import { REGIONS } from '@/lib/constants';

// Coordinates for cities on the SVG map (595.5 x 842.25 viewBox)
// These will need fine-tuning based on the actual map
const cityCoordinates: Record<string, { x: number; y: number; labelOffset?: { x: number; y: number } }> = {
  stuttgart:   { x: 120, y: 200, labelOffset: { x: 12, y: 5 } },
  reutlingen:  { x: 150, y: 260, labelOffset: { x: 12, y: 5 } },
  aalen:       { x: 200, y: 180, labelOffset: { x: 12, y: 5 } },
  heidenheim:  { x: 230, y: 220, labelOffset: { x: 12, y: 5 } },
  ulm:         { x: 260, y: 280, labelOffset: { x: 12, y: 5 } },
  augsburg:    { x: 350, y: 300, labelOffset: { x: 12, y: 5 } },
  muenchen:    { x: 450, y: 350, labelOffset: { x: 12, y: 5 } },
  ravensburg:  { x: 200, y: 400, labelOffset: { x: 12, y: 5 } },
};

export function InteractiveMap() {
  return (
    <div className="relative bg-card rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-border overflow-hidden">
      {/* Map Container */}
      <div className="relative">
        {/* SVG Map as background */}
        <img
          src="/images/sueddeutschland-map.svg"
          alt="Karte von Süddeutschland"
          className="w-full h-auto opacity-80"
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
                    r="6"
                    className="fill-primary transition-all duration-200 group-hover:fill-accent"
                  />
                  
                  {/* White border for visibility */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="6"
                    className="fill-none stroke-white stroke-[1.5]"
                  />

                  {/* City name */}
                  <text
                    x={coords.x + labelOffset.x}
                    y={coords.y + labelOffset.y}
                    className="text-[14px] font-medium fill-foreground transition-all duration-200 group-hover:fill-primary"
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
