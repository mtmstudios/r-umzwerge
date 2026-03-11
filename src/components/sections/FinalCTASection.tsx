import { useState } from 'react';
import { Phone, CheckCircle, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { ContactFunnelModal } from '@/components/contact/ContactFunnelModal';

const badges = ["Unverbindlich", "Keine versteckten Kosten", "Besenrein"];

export function FinalCTASection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12 pb-32 sm:py-16 sm:pb-28 lg:py-24 lg:pb-24 bg-primary">
      <div className="container-custom">
        <div ref={ref} className={cn("text-center max-w-3xl mx-auto px-1", "scroll-reveal", isVisible && "visible")}>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Kostenlose Ersteinschätzung anfordern
          </h2>
          <p className="text-primary-foreground/80 mb-6 sm:mb-8 text-sm sm:text-base">
            Unverbindlich anfragen. Transparentes Vorgehen. Besenrein.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 sm:gap-3 bg-cta hover:bg-cta-hover text-cta-foreground h-12 sm:h-14 px-5 sm:px-8 btn-lift shadow-cta text-sm sm:text-base font-bold"
            >
              <ClipboardList className="h-5 w-5 flex-shrink-0" />
              <span>Angebot berechnen</span>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 h-12 sm:h-14 px-5 sm:px-8 bg-white/15 hover:bg-white/25 text-primary-foreground border-2 border-white/30 text-sm sm:text-base font-semibold"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 flex-shrink-0" />
                Jetzt anrufen
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactFunnelModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
