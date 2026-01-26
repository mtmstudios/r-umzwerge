import { REGIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { PulseDot } from './PulseDot';
import { MapTooltip } from './MapTooltip';

// Coordinates for cities on the uploaded SVG map (595.5 x 842.25 viewBox)
const cityCoordinates: Record<string, { x: number; y: number }> = {
  stuttgart: { x: 140, y: 280 },    // Westen, mittig-nord
  reutlingen: { x: 160, y: 330 },   // Südlich von Stuttgart
  aalen: { x: 240, y: 260 },        // Östlich von Stuttgart
  heidenheim: { x: 270, y: 300 },   // Zwischen Aalen und Ulm
  ulm: { x: 290, y: 350 },          // Zentral (Hauptsitz)
  augsburg: { x: 380, y: 380 },     // Östlich von Ulm
  muenchen: { x: 480, y: 420 },     // Ganz im Osten
  ravensburg: { x: 240, y: 480 },   // Süden, Bodensee-Region
};

interface InteractiveMapProps {
  hoveredCity: string | null;
  onHover: (city: string | null) => void;
}

export function InteractiveMap({ hoveredCity, onHover }: InteractiveMapProps) {
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

            const isHovered = hoveredCity === region.slug;
            const isHQ = region.isHQ;

            return (
              <g
                key={region.slug}
                onMouseEnter={() => onHover(region.slug)}
                onMouseLeave={() => onHover(null)}
                className="cursor-pointer"
              >
                <PulseDot
                  cx={coords.x}
                  cy={coords.y}
                  isHQ={isHQ}
                  isHovered={isHovered}
                />

                {isHovered && (
                  <MapTooltip
                    x={coords.x}
                    y={coords.y}
                    name={region.name}
                    isHQ={isHQ}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-destructive animate-ping opacity-75" />
          </div>
          <span className="text-muted-foreground">Hauptsitz</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent animate-ping opacity-75" />
          </div>
          <span className="text-muted-foreground">Standort</span>
        </div>
      </div>
    </div>
  );
}
