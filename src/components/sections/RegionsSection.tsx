import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { REGIONS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { InteractiveMap } from '@/components/regions/InteractiveMap';

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
          {/* Interactive Map */}
          <InteractiveMap
            hoveredCity={hoveredCity}
            onHover={setHoveredCity}
          />

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
                      : "bg-card border-border text-foreground hover:border-accent hover:bg-accent/10",
                    hoveredCity === region.slug && "ring-2 ring-accent"
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
                  className={cn(
                    "flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-accent transition-all group",
                    hoveredCity === region.slug && "border-accent shadow-md"
                  )}
                  onMouseEnter={() => setHoveredCity(region.slug)}
                  onMouseLeave={() => setHoveredCity(null)}
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
