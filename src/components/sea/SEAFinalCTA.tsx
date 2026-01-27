import { Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { SEAData } from '@/lib/seaData';

interface SEAFinalCTAProps {
  data: SEAData;
}

const trustBadges = ['Unverbindlich', 'Keine versteckten Kosten', 'Besenrein'];

export function SEAFinalCTA({ data }: SEAFinalCTAProps) {
  const isGentle = data.tone === 'gentle';

  return (
    <section className={cn(
      "py-16 lg:py-20",
      isGentle ? "bg-primary/90" : "bg-primary"
    )}>
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            {data.ctaHeadline}
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-base lg:text-lg">
            {isGentle
              ? 'Wir melden uns diskret und unverbindlich.'
              : 'Foto senden – Preiseinschätzung innerhalb von 24h.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 sm:h-16 px-8 text-base sm:text-lg btn-lift shadow-whatsapp"
              data-track="cta-whatsapp-final"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="hidden sm:inline">Foto senden · Preis erhalten</span>
                <span className="sm:hidden">Foto senden</span>
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className="gap-3 h-14 sm:h-16 px-8 text-base sm:text-lg bg-cta hover:bg-cta-hover text-white transition-all"
              data-track="cta-phone-final"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                Anrufen
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-primary-foreground/80"
              >
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
