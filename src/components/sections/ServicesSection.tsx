import { Users, Warehouse, Building2, Lock, Home } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { BentoCard } from '@/components/ui/BentoCard';

const serviceIcons: Record<string, typeof Users> = {
  'wohnungsentruempelung': Home,
  'haushaltsaufloesung': Users,
  'keller-dachboden-garage': Warehouse,
  'gewerbe-buero-lager': Building2,
  'messie-wohnungen': Lock,
};

const SERVICE_ROUTES: Record<string, string> = {
  'wohnungsentruempelung': '/lp/entruempelung',
  'haushaltsaufloesung': '/lp/haushaltsaufloesung',
  'messie-wohnungen': '/lp/messie-hilfe',
};

export function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.1);

  // Split services: first 2 are large, rest are small
  const largeServices = SERVICES.slice(0, 2);
  const smallServices = SERVICES.slice(2, 5);

  return (
    <section id="leistungen" className="py-12 md:py-14 lg:py-16 bg-secondary/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-8 md:mb-10",
            "scroll-reveal",
            headerVisible && "visible"
          )}
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
            Unsere Services
          </span>
          <h2 className="text-section-mobile lg:text-section text-foreground mb-4">
            Leistungen – professionell & diskret
          </h2>
        </div>

        {/* Two-row grid layout */}
        <div
          ref={gridRef}
          className={cn(
            "max-w-5xl mx-auto space-y-5 lg:space-y-6",
            "scroll-reveal stagger-animation",
            gridVisible && "visible"
          )}
        >
          {/* Top row: 2 large cards */}
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {largeServices.map((service, index) => {
              const Icon = serviceIcons[service.slug] || Users;
              
              return (
                <BentoCard
                  key={service.slug}
                  title={service.title}
                  subtitle={service.subtitle}
                  description={service.description}
                  highlights={service.highlights}
                  icon={Icon}
                  href={SERVICE_ROUTES[service.slug] || `/leistungen/${service.slug}`}
                  size="large"
                  featured={service.featured}
                  index={index}
                />
              );
            })}
          </div>

          {/* Bottom row: 3 small cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
            {smallServices.map((service, index) => {
              const Icon = serviceIcons[service.slug] || Users;
              
              return (
                <BentoCard
                  key={service.slug}
                  title={service.title}
                  subtitle={service.subtitle}
                  description={service.description}
                  highlights={service.highlights}
                  icon={Icon}
                  href={SERVICE_ROUTES[service.slug] || `/leistungen/${service.slug}`}
                  size="default"
                  variant={service.slug === 'messie-wohnungen' ? 'glass' : 'default'}
                  index={index + 2}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-muted-foreground mt-8">
          Wir arbeiten transparent – keine versteckten Kosten.
        </p>
      </div>
    </section>
  );
}
