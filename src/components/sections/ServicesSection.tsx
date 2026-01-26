import { useState } from 'react';
import { ArrowRight, Home, Users, Warehouse, Building2, Truck, ShieldAlert, RotateCcw, Check } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

const serviceIcons: Record<string, typeof Home> = {
  'wohnungsentruempelung': Home,
  'haushaltsaufloesung': Users,
  'keller-dachboden-garage': Warehouse,
  'gewerbe-buero-lager': Building2,
  'sperrmuell-abtransport': Truck,
  'messie-wohnungen': ShieldAlert,
};

export function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.1);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const handleCardClick = (slug: string) => {
    setFlippedCard(flippedCard === slug ? null : slug);
  };

  return (
    <section id="leistungen" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-12",
            "scroll-reveal",
            headerVisible && "visible"
          )}
        >
          <h2 className="text-section-mobile lg:text-section text-foreground mb-4">
            Leistungen – professionell & diskret
          </h2>
        </div>

        {/* Featured Card */}
        <div
          className={cn(
            "bg-primary rounded-2xl lg:rounded-3xl p-8 lg:p-12 mb-8 scroll-reveal",
            headerVisible && "visible"
          )}
        >
          <div className="max-w-2xl">
            <h3 className="text-xl lg:text-2xl font-semibold text-primary-foreground mb-4">
              Entrümpelung mit System
            </h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Von der ersten Preiseinschätzung bis zur besenreinen Übergabe – transparent, zuverlässig und respektvoll.
            </p>
            <a
              href="/leistungen"
              className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
            >
              Mehr erfahren
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Services Grid - Flip Cards */}
        <div
          ref={gridRef}
          className={cn(
            "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6",
            "scroll-reveal",
            gridVisible && "visible"
          )}
        >
          {SERVICES.map((service, index) => {
            const Icon = serviceIcons[service.slug] || Home;
            const isFlipped = flippedCard === service.slug;
            
            return (
              <div
                key={service.slug}
                className={cn(
                  "flip-card h-64 cursor-pointer",
                  isFlipped && "flipped"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => handleCardClick(service.slug)}
              >
                <div className="flip-card-inner">
                  {/* Front Side */}
                  <div className="flip-card-front bg-card border border-border p-6 flex flex-col items-center justify-center shadow-sm">
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-accent/30">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-center text-lg">
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <span className="text-sm text-muted-foreground mt-1">
                        {service.subtitle}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5 opacity-60">
                      <RotateCcw className="h-3 w-3" />
                      Details anzeigen
                    </span>
                  </div>

                  {/* Back Side */}
                  <div className="flip-card-back bg-gradient-to-br from-primary to-primary/80 p-5 flex flex-col justify-between shadow-lg">
                    <div>
                      <h3 className="font-semibold text-primary-foreground text-base mb-2">
                        {service.title}
                      </h3>
                      <p className="text-primary-foreground/90 text-xs leading-relaxed mb-3">
                        {service.longDescription}
                      </p>
                      {/* Highlights */}
                      <ul className="space-y-1.5">
                        {service.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-primary-foreground/80 text-xs">
                            <Check className="h-3 w-3 text-accent flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={`/leistungen/${service.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-medium py-2.5 px-4 rounded-xl hover:bg-accent/90 transition-colors text-sm mt-3"
                    >
                      Mehr erfahren
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-muted-foreground mt-8">
          Wir arbeiten transparent – keine versteckten Kosten.
        </p>
      </div>
    </section>
  );
}
