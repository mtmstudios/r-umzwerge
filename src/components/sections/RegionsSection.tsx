import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { REGIONS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

// SVG coordinates for cities (approximate positions on a simplified map)
const cityCoordinates: Record<string, { x: number; y: number }> = {
  ulm: { x: 200, y: 180 },
  muenchen: { x: 340, y: 220 },
  stuttgart: { x: 120, y: 140 },
  augsburg: { x: 290, y: 200 },
  heidenheim: { x: 210, y: 150 },
  aalen: { x: 190, y: 130 },
  reutlingen: { x: 130, y: 180 },
  ravensburg: { x: 180, y: 260 },
};

export function RegionsSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "text-center mb-12",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h2 className="text-section-mobile lg:text-section text-foreground mb-4">
            Unsere Regionen in Süddeutschland
          </h2>
          <p className="text-muted-foreground">
            Baden-Württemberg & Bayern – schnell vor Ort
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Map */}
          <div className="relative bg-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-border">
            <svg
              viewBox="0 0 450 350"
              className="w-full h-auto"
              aria-label="Karte von Süddeutschland mit Standorten"
            >
              {/* Simplified BW + Bavaria outline */}
              <path
                d="M 50 50 
                   L 150 30 L 250 40 L 350 60 L 400 120 
                   L 420 200 L 380 280 L 300 320 
                   L 200 330 L 100 300 L 50 250 
                   L 30 150 Z"
                fill="hsl(var(--secondary))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />
              
              {/* State divider line (approximate) */}
              <path
                d="M 160 40 Q 180 150 200 320"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* State labels */}
              <text
                x="100"
                y="200"
                className="text-xs fill-muted-foreground font-medium"
              >
                Baden-
              </text>
              <text
                x="85"
                y="215"
                className="text-xs fill-muted-foreground font-medium"
              >
                Württemberg
              </text>
              <text
                x="300"
                y="170"
                className="text-xs fill-muted-foreground font-medium"
              >
                Bayern
              </text>

              {/* City markers */}
              {REGIONS.map((region) => {
                const coords = cityCoordinates[region.slug];
                if (!coords) return null;
                
                const isHovered = hoveredCity === region.slug;
                const isHQ = region.isHQ;

                return (
                  <g
                    key={region.slug}
                    onMouseEnter={() => setHoveredCity(region.slug)}
                    onMouseLeave={() => setHoveredCity(null)}
                    className="cursor-pointer"
                  >
                    {/* Marker */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isHQ ? 10 : 7}
                      className={cn(
                        "transition-all duration-200 marker-glow",
                        isHQ
                          ? "fill-destructive stroke-destructive"
                          : "fill-accent stroke-accent",
                        isHovered && "stroke-[3]"
                      )}
                      strokeWidth="2"
                    />
                    
                    {/* HQ label */}
                    {isHQ && (
                      <text
                        x={coords.x}
                        y={coords.y - 18}
                        textAnchor="middle"
                        className="text-[10px] fill-destructive font-semibold"
                      >
                        Hauptsitz
                      </text>
                    )}

                    {/* City name on hover */}
                    {isHovered && (
                      <g>
                        <rect
                          x={coords.x - 60}
                          y={coords.y + 15}
                          width="120"
                          height="36"
                          rx="8"
                          className="fill-card stroke-border"
                          strokeWidth="1"
                        />
                        <text
                          x={coords.x}
                          y={coords.y + 32}
                          textAnchor="middle"
                          className="text-xs fill-foreground font-medium"
                        >
                          Entrümpelung in {region.name}
                        </text>
                        <text
                          x={coords.x}
                          y={coords.y + 46}
                          textAnchor="middle"
                          className="text-[10px] fill-primary font-medium"
                        >
                          Region ansehen →
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Hauptsitz</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-muted-foreground">Standort</span>
              </div>
            </div>
          </div>

          {/* City List */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Regionen
            </h3>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {REGIONS.map((region) => (
                <a
                  key={region.slug}
                  href={`/region/${region.slug}`}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all",
                    region.isHQ
                      ? "bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20"
                      : "bg-card border-border text-foreground hover:border-accent hover:bg-accent/10"
                  )}
                  onMouseEnter={() => setHoveredCity(region.slug)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">
                    {region.name}
                    {region.isHQ && " (Hauptsitz)"}
                  </span>
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Weitere Orte auf Anfrage – wir sind regional flexibel.
            </p>

            {/* Region cards preview */}
            <div className="space-y-3">
              {REGIONS.slice(0, 3).map((region) => (
                <a
                  key={region.slug}
                  href={`/region/${region.slug}`}
                  className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-accent transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      region.isHQ ? "bg-destructive/10" : "bg-secondary"
                    )}>
                      <MapPin className={cn(
                        "h-5 w-5",
                        region.isHQ ? "text-destructive" : "text-primary"
                      )} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Entrümpelung in {region.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {region.isHQ ? "Hauptsitz" : "Schnell vor Ort"}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
