import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink, PRICE_FACTORS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { useParallax } from '@/hooks/useParallax';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function PricingSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { ref: parallaxRef, offset } = useParallax(0.3);

  return (
    <section id="preise" className="py-16 lg:py-24 bg-background overflow-hidden">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          {/* Content */}
          <div>
            <h2 className="text-section-mobile lg:text-section text-foreground mb-6">
              So entsteht der Preis – transparent & nachvollziehbar
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Wir erklären die Kosten klar und verständlich. Nach der Einschätzung – häufig per Foto – ist ein Festpreis möglich. Ohne Überraschungen und ohne versteckte Posten.
            </p>

            <div className="space-y-3 mb-8 lg:mb-0">
              {PRICE_FACTORS.map((factor) => (
                <div key={factor} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-foreground">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: Image extending to screen edge + floating CTA card */}
          <div className="relative min-h-[320px] lg:min-h-[380px]">
            {/* Background image that extends to the right edge */}
            <div 
              ref={parallaxRef}
              className="absolute inset-0 lg:-right-[calc(50vw-50%+2rem)] rounded-2xl lg:rounded-l-3xl lg:rounded-r-none overflow-hidden"
            >
              <img 
                src="/images/messiewohnung-bg.jpg"
                alt="Messie-Wohnung vor der Entrümpelung"
                className="w-full h-full object-cover transition-transform duration-100 ease-out"
                style={{ 
                  transform: `translateY(${offset}px) scale(1.1)`,
                }}
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30 lg:from-background/90 lg:via-background/50 lg:to-transparent" />
            </div>

            {/* Floating CTA Card */}
            <div className="relative z-20 bg-card/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-8 lg:p-10 shadow-medium lg:shadow-[0_24px_48px_-12px_hsl(var(--foreground)/0.2)] border border-border/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-whatsapp/20 rounded-xl flex items-center justify-center">
                  <WhatsAppIcon className="h-6 w-6 text-whatsapp" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    Schnelle Preiseinschätzung
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    WhatsApp-Foto reicht für eine erste Preiseinschätzung – innerhalb von 24 Stunden (oft schneller).
                  </p>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 btn-lift shadow-whatsapp"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5" />
                  Foto senden · Preiseinschätzung erhalten
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
