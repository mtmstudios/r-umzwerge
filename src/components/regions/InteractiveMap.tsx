import { REGIONS } from '@/lib/constants';

// Coordinates calibrated to the actual SVG map (viewBox 595.5 x 842.25)
// Based on Baden-Württemberg (left) and Bayern (right)
const cityCoordinates: Record<string, { x: number; y: number; labelOffset?: { x: number; y: number } }> = {
  stuttgart:   { x: 175, y: 175, labelOffset: { x: -90, y: 5 } },    // Northwest BW
  reutlingen:  { x: 220, y: 230, labelOffset: { x: -95, y: 5 } },    // South of Stuttgart
  aalen:       { x: 290, y: 145, labelOffset: { x: -55, y: -12 } },  // Northeast BW
  heidenheim:  { x: 310, y: 185, labelOffset: { x: 12, y: 5 } },     // East of Aalen
  ulm:         { x: 310, y: 260, labelOffset: { x: 12, y: 5 } },     // Border BW/Bayern
  augsburg:    { x: 405, y: 285, labelOffset: { x: 12, y: 5 } },     // Western Bavaria
  muenchen:    { x: 495, y: 350, labelOffset: { x: 12, y: 5 } },     // Central Bavaria
  ravensburg:  { x: 260, y: 420, labelOffset: { x: 12, y: 5 } },     // Bodensee region
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
                    className="fill-primary transition-all duration-200 group-hover:fill-accent"
                  />
                  
                  {/* White border for visibility */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="8"
                    className="fill-none stroke-white stroke-2"
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
