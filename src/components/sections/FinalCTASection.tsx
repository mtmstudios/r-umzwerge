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
    <section className="py-16 lg:py-24 bg-primary">
      <div className="container-custom">
        <div ref={ref} className={cn("text-center max-w-3xl mx-auto", "scroll-reveal", isVisible && "visible")}>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Foto senden – Preiseinschätzung innerhalb von 24 Stunden (oft schneller).
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Unverbindlich anfragen. Transparentes Vorgehen. Besenrein.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 px-8 btn-lift shadow-whatsapp">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Foto senden · Preiseinschätzung erhalten
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 h-14 px-8 border-2 border-primary-foreground/50 text-primary-foreground hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300">
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5" />
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
