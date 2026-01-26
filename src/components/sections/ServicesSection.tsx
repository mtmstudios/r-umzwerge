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
            "group relative bg-primary rounded-3xl p-8 lg:p-12 mb-8 text-center overflow-hidden scroll-reveal glow-hover",
            headerVisible && "visible"
          )}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative max-w-2xl mx-auto">
            {/* Badge */}
            <span className="inline-block bg-accent/20 text-accent text-sm font-semibold px-5 py-2 rounded-full mb-6 backdrop-blur-sm border border-accent/30">
              ⭐ Unsere Kernkompetenz
            </span>
            
            <h3 className="text-2xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Wohnungsentrümpelung
            </h3>
            
            <p className="text-primary-foreground/80 mb-8 leading-relaxed text-lg">
              Von der ersten Preiseinschätzung bis zur besenreinen Übergabe – 
              transparent, zuverlässig und respektvoll.
            </p>
            
            {/* USP Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { icon: Check, text: 'Besenreine Übergabe' },
                { icon: Check, text: 'Festpreis möglich' },
                { icon: Check, text: 'Antwort unter 24h' },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground/90 text-sm font-medium border border-primary-foreground/10"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {text}
                </span>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 px-8 shadow-whatsapp btn-lift"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5" />
                  Foto senden · Preis erhalten
                </a>
              </Button>
              
              <a
                href="/leistungen/wohnungsentruempelung"
                className="group/link inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
              >
                Mehr erfahren
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className={cn(
            "grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5",
            "scroll-reveal stagger-animation",
            gridVisible && "visible"
          )}
        >
          {SERVICES.map((service, index) => {
            const Icon = serviceIcons[service.slug] || Users;
            // Make one card tall for visual interest
            const isTall = index === 1;
            
            return (
              <BentoCard
                key={service.slug}
                title={service.title}
                subtitle={service.subtitle}
                description={isTall ? service.longDescription : undefined}
                icon={Icon}
                href={`/leistungen/${service.slug}`}
                size={isTall ? 'tall' : 'normal'}
                variant={index === 3 ? 'glass' : 'default'}
                index={index}
                className={cn(
                  isTall && 'lg:row-span-2'
                )}
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
