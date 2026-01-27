import { Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { SEAData } from '@/lib/seaData';

interface SEAMidCTAProps {
  data: SEAData;
}

export function SEAMidCTA({ data }: SEAMidCTAProps) {
  const isGentle = data.tone === 'gentle';

  return (
    <section className={cn(
      "py-12 lg:py-16",
      isGentle ? "bg-primary/90" : "bg-primary"
    )}>
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 text-primary-foreground px-4 py-2 rounded-full mb-6">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Preiseinschätzung in unter 24h</span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            {data.ctaHeadline}
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            {data.ctaSubline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 px-8 text-base btn-lift shadow-whatsapp"
              data-track="cta-whatsapp-mid"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Foto senden · Preis erhalten</span>
                <span className="sm:hidden">Foto senden</span>
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className="gap-3 h-14 px-8 bg-cta hover:bg-cta-hover text-white transition-all"
              data-track="cta-phone-mid"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5" />
                Anrufen
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
