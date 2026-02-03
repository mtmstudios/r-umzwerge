import { Package, Building2, Wrench, Zap, Clock, Star, Check, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import pricingConsultantImage from '@/assets/pricing-consultant.png';

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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Card */}
      <div className="relative bg-card border border-border rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 hover:scale-[1.02] w-full max-w-[140px] sm:max-w-[160px]">
        {/* Icon Container */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary transition-colors duration-300 group-hover:text-accent" />
        </div>
        
        {/* Label */}
        <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">{label}</h3>
        
        {/* Description */}
        <p className="text-xs text-muted-foreground leading-tight">{description}</p>
      </div>
      
      {/* Arrow pointing down (mobile only) */}
      <div className="mt-3 lg:hidden">
        <ArrowDown className="h-4 w-4 text-accent/60" />
      </div>
    </div>
  );
}

export function PricingSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="preise" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
      <div className="container-custom">
        <div ref={ref}>
          {/* Header */}
          <div className={cn(
            "text-center mb-10 lg:mb-14 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
              So entsteht der Preis – transparent & fair
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Keine versteckten Kosten. Nach der Einschätzung ist häufig ein Festpreis möglich.
            </p>
          </div>

          {/* Price Factors Pipeline */}
          <div className="relative mb-12 lg:mb-16">
            {/* Desktop: Horizontal connecting line */}
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            
            {/* Factor Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-4 justify-items-center">
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

            {/* Festpreis Badge */}
            <div className={cn(
              "flex justify-center mt-8 lg:mt-10 transition-all duration-700 delay-500",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                
                {/* Badge */}
                <div className="relative bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-lg shadow-primary/30 flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">=</span>
                  <span>Festpreis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Split Card: Image + CTA */}
          <div className={cn(
            "grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-12 lg:mb-16 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {/* Consultant Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-64 lg:h-80">
              <img 
                src={pricingConsultantImage}
                alt="Räumzwerge-Berater zeigt transparente Preisberechnung auf Tablet"
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-border/50">
                <p className="text-sm font-medium text-foreground">Transparente Preisberechnung</p>
              </div>
            </div>

            {/* WhatsApp CTA Card */}
            <div className="glass rounded-2xl p-6 lg:p-8 border border-border/50 flex flex-col justify-center relative overflow-hidden group">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-whatsapp/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-whatsapp/20 rounded-xl flex items-center justify-center">
                    <WhatsAppIcon className="h-7 w-7 text-whatsapp" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-xl mb-1">
                      Schnelle Preiseinschätzung
                    </h3>
                    <p className="text-muted-foreground">
                      WhatsApp-Foto reicht – Antwort innerhalb von 24 Stunden.
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 text-base btn-lift shadow-whatsapp"
                >
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">Foto senden · Preiseinschätzung erhalten</span>
                    <span className="sm:hidden">Preis erhalten</span>
                  </a>
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
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-20">
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
    </section>
  );
}
