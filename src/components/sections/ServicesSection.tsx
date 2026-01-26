import { ArrowRight, Users, Warehouse, Building2, Lock, Check } from 'lucide-react';
import { SERVICES, getWhatsAppLink } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { BentoCard } from '@/components/ui/BentoCard';

const serviceIcons: Record<string, typeof Users> = {
  'haushaltsaufloesung': Users,
  'keller-dachboden-garage': Warehouse,
  'gewerbe-buero-lager': Building2,
  'messie-wohnungen': Lock,
};

export function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.1);

  return (
    <section id="leistungen" className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
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
            "text-center mb-12",
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

        {/* Featured Card - Hauptleistung */}
        <div
          className={cn(
            "group relative bg-primary rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8 text-center overflow-hidden scroll-reveal glow-hover",
            headerVisible && "visible"
          )}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative max-w-4xl mx-auto">
            {/* Badge */}
            <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 backdrop-blur-sm border border-accent/30">
              ⭐ Unsere Kernkompetenz
            </span>
            
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground mb-2 sm:mb-3">
              Wohnungsentrümpelung
            </h3>
            
            <p className="text-primary-foreground/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
              Von der ersten Preiseinschätzung bis zur besenreinen Übergabe – 
              transparent, zuverlässig und respektvoll.
            </p>
            
            {/* USP Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              {[
                { icon: Check, text: 'Besenrein' },
                { icon: Check, text: 'Festpreis möglich' },
                { icon: Check, text: 'Antwort < 24h' },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 sm:gap-2 bg-primary-foreground/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-primary-foreground/90 text-xs sm:text-sm font-medium border border-primary-foreground/10"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                  {text}
                </span>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto gap-2 sm:gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-12 sm:h-14 px-5 sm:px-8 shadow-whatsapp btn-lift text-sm sm:text-base"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">Foto senden · Preis erhalten</span>
                  <span className="sm:hidden">Preis erhalten</span>
                </a>
              </Button>
              
              <a
                href="/leistungen/wohnungsentruempelung"
                className="group/link inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all text-sm sm:text-base"
              >
                Mehr erfahren
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Centered 2x2 Bento Grid */}
        <div
          ref={gridRef}
          className={cn(
            "max-w-4xl mx-auto grid md:grid-cols-2 gap-5 lg:gap-6",
            "scroll-reveal stagger-animation",
            gridVisible && "visible"
          )}
        >
          {SERVICES.map((service, index) => {
            const Icon = serviceIcons[service.slug] || Users;
            
            return (
              <BentoCard
                key={service.slug}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                icon={Icon}
                href={`/leistungen/${service.slug}`}
                variant={index === 3 ? 'glass' : 'default'}
                index={index}
              />
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-muted-foreground mt-10">
          Wir arbeiten transparent – keine versteckten Kosten.
        </p>
      </div>
    </section>
  );
}
