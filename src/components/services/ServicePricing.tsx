import { Check, Calculator, Euro, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PRICE_FACTORS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

const trustStats = [
  { icon: Star, value: '4.9', label: 'Google-Bewertung' },
  { icon: Clock, value: '<24h', label: 'Antwortzeit' },
  { icon: Check, value: '85%', label: 'Festpreis-Quote' },
];

export function ServicePricing() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-12 lg:py-24 bg-gradient-to-br from-secondary/30 via-secondary/20 to-primary/5 overflow-hidden">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
            {/* Left Side - Animated Icon Cluster */}
            <div className="hidden lg:flex items-center justify-center relative">
              {/* Main floating icon */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center shadow-lg float-animation">
                  <Calculator className="h-16 w-16 text-primary" />
                </div>
                
                {/* Orbiting icons */}
                <div className="absolute -top-4 -right-6 w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center shadow-md float-animation" style={{ animationDelay: '0.5s' }}>
                  <Euro className="h-7 w-7 text-accent" />
                </div>
                
                <div className="absolute -bottom-3 -left-8 w-12 h-12 bg-cta/20 rounded-xl flex items-center justify-center float-animation" style={{ animationDelay: '1s' }}>
                  <Check className="h-6 w-6 text-cta" />
                </div>
                
                <div className="absolute top-1/2 -right-12 w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center float-animation" style={{ animationDelay: '1.5s' }}>
                  <Star className="h-5 w-5 text-accent" />
                </div>
              </div>
              
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl" />
            </div>

            {/* Right Side - Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 lg:mb-4">
                Transparente Preise
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 lg:mb-8">
                Keine versteckten Kosten. Nach der Einschätzung ist häufig ein Festpreis möglich.
              </p>

              {/* Price factors as interactive pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 lg:mb-8">
                {PRICE_FACTORS.map((factor, index) => (
                  <span
                    key={factor}
                    className="bg-card border border-border hover:border-accent/50 hover:bg-accent/5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-foreground transition-all duration-300 cursor-default hover:scale-105 hover:shadow-md"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {factor}
                  </span>
                ))}
              </div>

              {/* CTA Card with Glassmorphism */}
              <div className="glass rounded-2xl p-5 sm:p-6 border border-border/50 relative overflow-hidden group">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-whatsapp/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-whatsapp/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon className="h-6 w-6 text-whatsapp" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="font-semibold text-foreground text-base sm:text-lg">
                        Schnelle Preiseinschätzung
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        WhatsApp-Foto reicht – Antwort innerhalb von 24h.
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full gap-2.5 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-12 sm:h-14 text-sm sm:text-base btn-lift shadow-whatsapp"
                  >
                    <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon className="h-5 w-5" />
                      <span className="hidden sm:inline">Foto senden · Preiseinschätzung erhalten</span>
                      <span className="sm:hidden">Preiseinschätzung erhalten</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Stats Strip */}
          <div className="mt-10 lg:mt-14 pt-8 border-t border-border/50">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-16">
              {trustStats.map(({ icon: Icon, value, label }, index) => (
                <div
                  key={label}
                  className="flex items-center gap-3 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-foreground">{value}</div>
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
