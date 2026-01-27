import { MapPin } from 'lucide-react';
import { REGIONS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

export function ServiceRegions() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-16 lg:py-20 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-6 text-center lg:text-left">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  Wir sind in Süddeutschland für dich da
                </h3>
                <p className="text-sm text-muted-foreground">
                  Unser Hauptstandort ist Ulm – wir sind aber in der gesamten Region aktiv.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {REGIONS.map((region) => (
                <a
                  key={region.slug}
                  href={`/region/${region.slug}`}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
                    region.isHQ
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  {region.isHQ && <MapPin className="h-3 w-3" />}
                  {region.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
