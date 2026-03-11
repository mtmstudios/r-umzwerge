import { useState } from 'react';
import { Phone, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { ContactFunnelModal } from '@/components/contact/ContactFunnelModal';

export function ServiceFinalCTA() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-16 pb-28 lg:py-24 lg:pb-24 bg-primary">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal text-center", isVisible && "visible")}
        >
          <h2 className="text-2xl lg:text-3xl font-semibold text-primary-foreground mb-4">
            Bereit für deine Preiseinschätzung?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Starte jetzt deine kostenlose Anfrage – wir melden uns innerhalb von 24 Stunden mit einer Einschätzung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="gap-3 bg-cta hover:bg-cta-hover text-cta-foreground h-14 px-8 font-bold btn-lift shadow-lg shadow-cta/25"
            >
              <ClipboardList className="h-5 w-5" />
              Angebot berechnen
            </Button>

            <Button
              asChild
              size="lg"
              className="gap-3 h-14 px-8 bg-white/15 hover:bg-white/25 text-primary-foreground border-2 border-white/30 font-semibold"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5" />
                Jetzt anrufen
              </a>
            </Button>
          </div>
        </div>
      </div>

      <ContactFunnelModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
