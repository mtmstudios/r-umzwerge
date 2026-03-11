import { useState } from 'react';
import { Package, Building2, Wrench, Zap, Clock, Star, Check, ArrowDown, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import pricingTabletImage from '@/assets/pricing-tablet.png';
import { ContactFunnelModal } from '@/components/contact/ContactFunnelModal';

const PRICE_FACTORS = [
  { icon: Package, label: 'Umfang', description: 'Menge & Raumgröße' },
  { icon: Building2, label: 'Etage', description: 'Zugang & Stockwerk' },
  { icon: Wrench, label: 'Demontage', description: 'Möbel-Abbau' },
  { icon: Zap, label: 'Sondermüll', description: 'Elektro & Sperrgut' },
  { icon: Clock, label: 'Termin', description: 'Zeitdruck-Faktor' },
];

const TRUST_STATS = [
  { icon: Star, value: '4.9', label: 'Google-Bewertung' },
  { icon: Clock, value: '<24h', label: 'Antwortzeit' },
  { icon: Check, value: '85%', label: 'Festpreis-Quote' },
];

interface PriceFactorCardProps {
  icon: React.ElementType;
  label: string;
  description: string;
  index: number;
  isVisible: boolean;
}

function PriceFactorCard({ icon: Icon, label, description, index, isVisible }: PriceFactorCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col items-center text-center',
        'transition-all duration-500 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        index === 4 && 'col-span-2 md:col-span-1 justify-self-center'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-card border border-border rounded-2xl p-4 sm:p-5 lg:transition-all lg:duration-300 lg:hover:border-accent/60 lg:hover:shadow-lg lg:hover:shadow-accent/10 lg:hover:-translate-y-1 lg:hover:scale-[1.02] w-full max-w-[140px] sm:max-w-[160px]">
        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center lg:transition-all lg:duration-300 lg:group-hover:bg-accent/20 lg:group-hover:scale-110 lg:group-hover:rotate-3">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary lg:transition-colors lg:duration-300 lg:group-hover:text-accent" />
        </div>
        <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">{label}</h3>
        <p className="text-xs text-muted-foreground leading-tight">{description}</p>
      </div>
      <div className="mt-3 md:hidden">
        <ArrowDown className="h-4 w-4 text-accent/60" />
      </div>
    </div>
  );
}

interface ServicePricingProps {
  headline?: string;
  subline?: string;
  cityName?: string;
}

export function ServicePricing({ 
  headline = 'So entsteht der Preis – transparent & fair',
  subline = 'Keine versteckten Kosten. Nach der Einschätzung ist häufig ein Festpreis möglich.',
}: ServicePricingProps) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-secondary/30 via-secondary/20 to-background overflow-hidden">
      <div className="container-custom">
        <div ref={ref}>
          <div className={cn(
            "text-center mb-10 lg:mb-14 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
              {headline}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subline}
            </p>
          </div>

          <div className="relative mb-12 lg:mb-16">
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 lg:gap-4 justify-items-center">
              {PRICE_FACTORS.map((factor, index) => (
                <PriceFactorCard
                  key={factor.label}
                  icon={factor.icon}
                  label={factor.label}
                  description={factor.description}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>

            <div className={cn(
              "flex justify-center mt-8 lg:mt-10 transition-all duration-700 delay-500",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}>
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-lg shadow-primary/30 flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">=</span>
                  <span>Festpreis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Split Card: Image + CTA */}
          <div className={cn(
            "grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-stretch mb-12 lg:mb-16 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-56 sm:h-64 md:h-72 lg:h-80">
              <img 
                src={pricingTabletImage}
                alt="Tablet mit transparenter Preiskalkulation auf Tisch mit Umzugskartons"
                className="w-full h-full object-cover object-[center_35%] sm:object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-border/50">
                <p className="text-sm font-medium text-foreground whitespace-nowrap">Transparente Preisberechnung</p>
              </div>
            </div>

            {/* Funnel CTA Card */}
            <div className="glass rounded-2xl p-6 lg:p-8 border border-border/50 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cta/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6 text-center sm:text-left">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-cta/20 rounded-xl flex items-center justify-center">
                    <ClipboardList className="h-6 w-6 sm:h-7 sm:w-7 text-cta" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg sm:text-xl mb-1">
                      Schnelle Preiseinschätzung
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Kostenloses Angebot berechnen – Antwort innerhalb von 24 Stunden.
                    </p>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full gap-2 sm:gap-3 bg-cta hover:bg-cta-hover text-cta-foreground h-12 sm:h-14 text-sm sm:text-base btn-lift shadow-cta font-bold"
                >
                  <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span>📋 Angebot berechnen</span>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Kostenlos & unverbindlich
                </p>
              </div>
            </div>
          </div>

          {/* Trust Stats Strip */}
          <div className={cn(
            "pt-8 border-t border-border/50 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-20">
              {TRUST_STATS.map(({ icon: Icon, value, label }, index) => (
                <div
                  key={label}
                  className="flex items-center gap-3 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">{value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ContactFunnelModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
