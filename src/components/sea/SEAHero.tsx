import { Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { SEAData } from '@/lib/seaData';

interface SEAHeroProps {
  data: SEAData;
}

export function SEAHero({ data }: SEAHeroProps) {
  const isGentle = data.tone === 'gentle';

  return (
    <section
      className={cn(
        "min-h-[90vh] lg:min-h-[70vh] flex items-center pt-20 lg:pt-24 pb-12",
        isGentle ? "bg-gradient-to-b from-muted/50 to-background" : "bg-background"
      )}
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 lg:mb-6 leading-tight">
            {data.headline}
          </h1>

          {/* Subline */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-10 max-w-2xl mx-auto">
            {data.subline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 lg:mb-10">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 sm:h-16 px-6 sm:px-8 text-base sm:text-lg btn-lift shadow-whatsapp"
              data-track="cta-whatsapp-hero"
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
              variant="outline"
              className="gap-3 h-14 sm:h-16 px-6 sm:px-8 text-base sm:text-lg border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all"
              data-track="cta-phone-hero"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="hidden sm:inline">Jetzt anrufen</span>
                <span className="sm:hidden">Anrufen</span>
              </a>
            </Button>
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {data.trustPills.map((pill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm sm:text-base font-medium"
              >
                <CheckCircle className="h-4 w-4 text-accent" />
                {pill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
