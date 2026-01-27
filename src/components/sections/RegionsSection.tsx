import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { CityList } from '@/components/regions/CityList';

export function RegionsSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "text-center mb-6",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h2 className="text-section-mobile lg:text-section text-foreground mb-2">
            Unsere Regionen in Süddeutschland
          </h2>
          <p className="text-muted-foreground">
            Baden-Württemberg & Bayern – schnell vor Ort
          </p>
        </div>

        {/* Zentrierte Stadt-Liste */}
        <div className="max-w-2xl mx-auto">
          <CityList />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Weitere Orte auf Anfrage – wir sind regional flexibel.
        </p>
      </div>
    </section>
  );
}
