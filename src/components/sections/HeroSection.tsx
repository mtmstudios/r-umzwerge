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
    <section className="relative overflow-hidden">
      {/* Mobile: Fullscreen background with overlay */}
      <div className="lg:hidden absolute inset-0">
        <img 
          src={heroTeamImage} 
          alt="Räumzwerge Team bei der Entrümpelung"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Desktop: Standard background */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-background" />
      
      <div className="container-custom relative">
        {/* Mobile Layout: Fullscreen with content at bottom */}
        <div
          ref={ref}
          className={cn(
            "lg:hidden min-h-[85vh] flex flex-col justify-end pb-8 pt-24",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h1 className="text-3xl font-bold text-white mb-4 text-balance leading-tight">
            Entrümpelung ohne Stress – sauber, diskret, transparent.
          </h1>
          
          <p className="text-base text-white/90 mb-6 max-w-xl">
            Wohnung, Haus, Keller, Garage oder Gewerbe: Wir räumen fachgerecht und besenrein. Preiseinschätzung per WhatsApp-Foto – innerhalb von 24 Stunden.
          </p>

          {/* Mobile CTAs */}
          <div className="flex flex-col gap-3 mb-4">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground text-sm h-12 px-4 btn-lift shadow-whatsapp"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                Foto senden · Preis erhalten
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 h-12 px-4 text-sm bg-cta hover:bg-cta-hover text-cta-foreground border-0"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 flex-shrink-0" />
                Jetzt anrufen
              </a>
            </Button>
          </div>

          <p className="text-sm text-white/70 mb-6">
            Unverbindlich. Keine versteckten Kosten.
          </p>

          {/* Mobile Trust Pills */}
          <div className="flex flex-wrap gap-2">
            {trustPills.map((pill) => (
              <div
                key={pill}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/10"
              >
                <CheckCircle className="h-3.5 w-3.5 text-accent" />
                {pill}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout: Original side-by-side grid */}
        <div
          className={cn(
            "hidden lg:grid lg:grid-cols-2 gap-16 items-center py-20",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          {/* Content */}
          <div>
            <h1 className="text-hero text-foreground mb-6 text-balance">
              Entrümpelung ohne Stress – sauber, diskret, transparent.
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Wohnung, Haus, Keller, Garage oder Gewerbe: Wir räumen fachgerecht und besenrein. Preiseinschätzung per WhatsApp-Foto – innerhalb von 24 Stunden (oft schneller).
            </p>

            {/* Desktop CTAs */}
            <div className="flex flex-row gap-4 mb-6 max-w-xl">
              <Button
                asChild
                size="lg"
                className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground text-base h-14 px-6 btn-lift shadow-whatsapp shrink-0"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                  Foto senden · Preiseinschätzung erhalten
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 h-14 px-6 text-base border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300 shrink-0"
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

            {/* Desktop Trust Pills */}
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

          {/* Hero Visual (Desktop only) */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-soft">
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
