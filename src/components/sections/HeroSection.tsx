import { Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import heroTeamImage from '@/assets/hero-team.jpg';

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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 max-w-xl">
              <Button
                asChild
                size="lg"
                className="gap-2 sm:gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground text-sm sm:text-base h-12 sm:h-14 px-4 sm:px-6 btn-lift shadow-whatsapp shrink-0"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">Foto senden · Preiseinschätzung erhalten</span>
                  <span className="sm:hidden">Foto senden · Preis erhalten</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300 shrink-0 max-lg:bg-cta max-lg:text-cta-foreground max-lg:border-cta"
              >
                <a href={PHONE_LINK}>
                  <Phone className="h-5 w-5 flex-shrink-0" />
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
            <div className="aspect-[4/3] lg:aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-soft">
              <img
                src={heroTeamImage}
                alt="Räumzwerge Team bei der Entrümpelung – Mitarbeiter verladen Kartons in einen Transporter"
                className="w-full h-full object-cover"
              />
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
