import { MessageCircle, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

const trustPills = [
  "Antwort < 24h",
  "Festpreis nach Einschätzung möglich",
  "Besenrein & übergabefertig",
];

export function HeroSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-background" />
      
      <div className="container-custom relative">
        <div
          ref={ref}
          className={cn(
            "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-20",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-hero-mobile lg:text-hero text-foreground mb-6 text-balance">
              Entrümpelung ohne Stress – sauber, diskret, transparent.
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Wohnung, Haus, Keller, Garage oder Gewerbe: Wir räumen fachgerecht und besenrein. Preiseinschätzung per WhatsApp-Foto – innerhalb von 24 Stunden (oft schneller).
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                asChild
                size="lg"
                className="gap-3 bg-cta hover:bg-cta-hover text-cta-foreground text-base h-14 px-8 btn-lift shadow-cta"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Foto senden · Preiseinschätzung erhalten
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 h-14 px-8 text-base"
              >
                <a href={PHONE_LINK}>
                  <Phone className="h-5 w-5" />
                  Jetzt anrufen
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-8">
              Unverbindlich. Keine versteckten Kosten.
            </p>

            {/* Trust Pills */}
            <div className="flex flex-wrap gap-3">
              {trustPills.map((pill) => (
                <div
                  key={pill}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground"
                >
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {pill}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/3] lg:aspect-square bg-gradient-to-br from-primary/10 via-accent/10 to-secondary rounded-2xl lg:rounded-3xl overflow-hidden shadow-soft">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Bild-Platzhalter: Freundliches Team bei der Arbeit
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
