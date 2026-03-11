import { useState } from 'react';
import { ClipboardList, Clock, Sparkles, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { ContactFunnelModal } from '@/components/contact/ContactFunnelModal';
import { PHONE_LINK } from '@/lib/constants';

const steps = [
  {
    number: 1,
    icon: ClipboardList,
    title: "Anfrage starten",
    description: "Kostenloses Angebot berechnen – in nur 5 Schritten.",
  },
  {
    number: 2,
    icon: Clock,
    title: "Telefonische Einschätzung",
    description: "Wir rufen Sie umgehend an, besprechen die Details und nennen Ihnen oft direkt einen Festpreis.",
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto gap-2 sm:gap-3 bg-cta hover:bg-cta-hover text-cta-foreground h-12 sm:h-14 px-5 sm:px-8 btn-lift shadow-cta text-sm sm:text-base font-bold"
            >
              <ClipboardList className="h-5 w-5 flex-shrink-0" />
              <span>Rückruf anfordern</span>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto gap-2 h-12 sm:h-14 px-5 sm:px-8 bg-transparent hover:bg-primary/10 text-primary border-2 border-primary/30 text-sm sm:text-base font-semibold"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 flex-shrink-0" />
                Jetzt anrufen
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Diskret, respektvoll und ohne Überraschungen.
          </p>
        </div>
      </div>

      <ContactFunnelModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
