import { Camera, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';

const steps = [
  {
    number: 1,
    icon: Camera,
    title: "Foto senden",
    description: "Ein paar Fotos + Ort via WhatsApp für eine erste Einschätzung.",
  },
  {
    number: 2,
    icon: Clock,
    title: "Preis in 24h",
    description: "Transparent & nachvollziehbar. Festpreis nach Einschätzung möglich.",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Wir räumen",
    description: "Pünktlich, sauber und fachgerecht entsorgt – besenrein.",
  },
];

export function ProcessSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="ablauf" className="py-12 md:py-14 lg:py-16 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "text-center mb-8 md:mb-10",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
            So funktioniert's
          </span>
          <h2 className="text-section-mobile lg:text-section text-foreground">
            In 3 Schritten zum freien Raum
          </h2>
        </div>

        <HorizontalTimeline steps={steps} className="mb-10 md:mb-12" />

        <div className={cn(
          "text-center scroll-reveal",
          isVisible && "visible"
        )}>
          <Button
            asChild
            size="lg"
            className="gap-2 sm:gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-12 sm:h-14 px-5 sm:px-8 btn-lift shadow-whatsapp text-sm sm:text-base"
          >
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
              <span className="hidden sm:inline">Jetzt Foto senden</span>
              <span className="sm:hidden">Foto senden</span>
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Diskret, respektvoll und ohne Überraschungen.
          </p>
        </div>
      </div>
    </section>
  );
}
