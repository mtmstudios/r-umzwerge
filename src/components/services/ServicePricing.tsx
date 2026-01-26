import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PRICE_FACTORS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

export function ServicePricing() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Transparente Preise
            </h2>
            <p className="text-muted-foreground mb-8">
              Keine versteckten Kosten. Nach der Einschätzung ist häufig ein Festpreis möglich.
            </p>

            {/* Price factors */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {PRICE_FACTORS.map((factor) => (
                <span
                  key={factor}
                  className="bg-card border border-border px-4 py-2 rounded-full text-sm text-foreground"
                >
                  {factor}
                </span>
              ))}
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
              <span className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-accent" />
                Festpreis nach Einschätzung möglich
              </span>
              <span className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-accent" />
                Keine versteckten Kosten
              </span>
              <span className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-accent" />
                Transparent & nachvollziehbar
              </span>
            </div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 px-8"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Foto senden · Preiseinschätzung erhalten
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
