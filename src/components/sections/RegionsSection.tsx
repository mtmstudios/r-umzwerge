import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { InteractiveMap } from '@/components/regions/InteractiveMap';
import { CityList } from '@/components/regions/CityList';

export function RegionsSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  return (
    <section className="py-8 lg:py-12 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "text-center mb-4 lg:mb-6",
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

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left: Map */}
          <div className="lg:sticky lg:top-24">
            <InteractiveMap 
              activeCity={activeCity}
              onCityHover={setActiveCity}
            />
          </div>
          
          {/* Right: City List */}
          <CityList 
            activeCity={activeCity}
            onCityHover={setActiveCity}
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Weitere Orte auf Anfrage – wir sind regional flexibel.
        </p>
      </div>
    </section>
  );
}
