import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink, PRICE_FACTORS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function PricingSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="preise" className="py-12 md:py-14 lg:py-16 bg-background overflow-hidden">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "grid lg:grid-cols-2 gap-8 lg:gap-12 items-start",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-section-mobile lg:text-section text-foreground mb-6">
              So entsteht der Preis – transparent & nachvollziehbar
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Wir erklären die Kosten klar und verständlich. Nach der Einschätzung – häufig per Foto – ist ein Festpreis möglich. Ohne Überraschungen und ohne versteckte Posten.
            </p>

            <div className="space-y-3 inline-flex flex-col items-center lg:items-start">
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

          {/* Right Column - Image + CTA Card */}
          <div className="space-y-6">
            {/* Visible Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/messiewohnung-bg.webp"
                alt="Entrümpelung einer vollen Wohnung"
                className="w-full h-64 lg:h-72 object-cover"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </div>

            {/* CTA Card */}
            <div className="glass rounded-2xl p-6 lg:p-8 border border-border/50 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-12 h-12 bg-whatsapp/20 rounded-xl flex items-center justify-center">
                  <WhatsAppIcon className="h-6 w-6 text-whatsapp" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    Schnelle Preiseinschätzung
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    WhatsApp-Foto reicht – Antwort innerhalb von 24 Stunden.
                  </p>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full gap-2 sm:gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-12 sm:h-14 btn-lift shadow-whatsapp text-sm sm:text-base"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">Foto senden · Preiseinschätzung erhalten</span>
                  <span className="sm:hidden">Preis erhalten</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
