import { ArrowRight, Home, Users, Warehouse, Building2, Truck, ShieldAlert } from 'lucide-react';
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

        {/* Services Grid */}
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
            return (
              <div
                key={service.slug}
                className="bg-card rounded-xl p-6 border border-border card-hover group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {service.title}
                      {service.subtitle && (
                        <span className="block text-sm font-normal text-muted-foreground">
                          {service.subtitle}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {service.description}
                    </p>
                    <a
                      href={`/leistungen/${service.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all"
                    >
                      Mehr erfahren
                      <ArrowRight className="h-3 w-3" />
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
