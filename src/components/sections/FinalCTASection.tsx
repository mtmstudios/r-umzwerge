import { Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

const badges = ["Unverbindlich", "Keine versteckten Kosten", "Besenrein"];

export function FinalCTASection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-12 pb-32 sm:py-16 sm:pb-28 lg:py-24 lg:pb-24 bg-primary">
      <div className="container-custom">
        <div ref={ref} className={cn("text-center max-w-3xl mx-auto px-1", "scroll-reveal", isVisible && "visible")}>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Foto senden – Preiseinschätzung innerhalb von 24h
          </h2>
          <p className="text-primary-foreground/80 mb-6 sm:mb-8 text-sm sm:text-base">
            Unverbindlich anfragen. Transparentes Vorgehen. Besenrein.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button asChild size="lg" className="gap-2 sm:gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-12 sm:h-14 px-5 sm:px-8 btn-lift shadow-whatsapp text-sm sm:text-base">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                <span className="hidden sm:inline">Foto senden · Preiseinschätzung erhalten</span>
                <span className="sm:hidden">Preis erhalten</span>
              </a>
            </Button>
            <Button asChild size="lg" className="gap-2 h-12 sm:h-14 px-5 sm:px-8 bg-cta hover:bg-cta-hover text-white transition-all duration-300 text-sm sm:text-base">
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 flex-shrink-0" />
                Anrufen
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
    </section>
  );
}
