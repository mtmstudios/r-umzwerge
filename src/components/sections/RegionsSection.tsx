import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { InteractiveMap } from '@/components/regions/InteractiveMap';

export function RegionsSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

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

        {/* Centered Map - Full Width */}
        <div className="max-w-4xl mx-auto">
          <InteractiveMap />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Weitere Orte auf Anfrage – wir sind regional flexibel.
        </p>
      </div>
    </section>
  );
}
