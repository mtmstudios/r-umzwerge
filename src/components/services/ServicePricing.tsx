import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PRICE_FACTORS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

export function ServicePricing() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-12 lg:py-24 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="max-w-3xl mx-auto text-center px-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 lg:mb-4">
              Transparente Preise
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 lg:mb-8">
              Keine versteckten Kosten. Nach der Einschätzung ist häufig ein Festpreis möglich.
            </p>

            {/* Price factors */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 lg:mb-8">
              {PRICE_FACTORS.map((factor) => (
                <span
                  key={factor}
                  className="bg-card border border-border px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-foreground"
                >
                  {factor}
                </span>
              ))}
            </div>

            {/* Trust points */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-x-6 sm:gap-y-3 mb-8 lg:mb-10">
              <span className="flex items-center justify-center gap-2 text-xs sm:text-sm text-foreground">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                Festpreis nach Einschätzung möglich
              </span>
              <span className="flex items-center justify-center gap-2 text-xs sm:text-sm text-foreground">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                Keine versteckten Kosten
              </span>
              <span className="flex items-center justify-center gap-2 text-xs sm:text-sm text-foreground">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                Transparent & nachvollziehbar
              </span>
            </div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="gap-2.5 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Foto senden · Preiseinschätzung erhalten</span>
                <span className="sm:hidden">Preiseinschätzung erhalten</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
