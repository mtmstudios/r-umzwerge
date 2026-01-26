import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

export function ServiceFinalCTA() {
  const { ref, isVisible } = useScrollReveal(0.1);

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
            Schick uns einfach ein paar Fotos per WhatsApp – wir melden uns innerhalb von 24 Stunden mit einer Einschätzung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 px-8"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Foto senden · Preis erhalten
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-3 h-14 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5" />
                Jetzt anrufen
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
