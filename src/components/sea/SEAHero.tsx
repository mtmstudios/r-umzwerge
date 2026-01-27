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

  // Dynamic CTA text based on tone
  const getWhatsAppCTAText = () => {
    if (isGentle) return { long: 'Unverbindlich schreiben', short: 'Schreiben' };
    return { long: 'Foto senden · Preis erhalten', short: 'Foto senden' };
  };

  const ctaText = getWhatsAppCTAText();

  return (
    <section className="relative overflow-hidden">
      {/* Mobile & Tablet: Fullscreen background with overlay */}
      <div className="xl:hidden absolute inset-0">
        <img 
          src={data.heroImage}
          alt={data.heroImageAlt}
          className="w-full h-full object-cover"
        />
        <div className={cn(
          "absolute inset-0",
          isGentle 
            ? "bg-gradient-to-t from-black/85 via-black/60 to-black/40" 
            : "bg-gradient-to-t from-black/80 via-black/50 to-black/30"
        )} />
      </div>

      {/* Desktop: Standard background */}
      <div className={cn(
        "hidden xl:block absolute inset-0",
        isGentle 
          ? "bg-gradient-to-br from-muted/50 via-background to-background" 
          : "bg-gradient-to-br from-secondary/50 via-background to-background"
      )} />

      <div className="container-custom relative">
        {/* Mobile & Tablet Layout: Fullscreen with centered content */}
        <div className="xl:hidden min-h-[85vh] md:min-h-[75vh] flex flex-col justify-center items-center text-center px-4 py-16 md:py-20 pt-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 text-balance leading-tight max-w-2xl">
            {data.headline}
          </h1>
          
          <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-xl">
            {data.subline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto sm:justify-center">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground text-sm md:text-base h-12 md:h-14 px-4 md:px-6 btn-lift shadow-whatsapp"
              data-track="cta-whatsapp-hero"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                <span className="hidden sm:inline">{ctaText.long}</span>
                <span className="sm:hidden">{ctaText.short}</span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 h-12 md:h-14 px-4 md:px-6 text-sm md:text-base bg-cta hover:bg-cta-hover text-cta-foreground border-0"
              data-track="cta-phone-hero"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 flex-shrink-0" />
                Jetzt anrufen
              </a>
            </Button>
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {data.trustPills.map((pill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/10"
              >
                <CheckCircle className="h-3.5 w-3.5 text-accent" />
                {pill}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout: Side-by-side grid */}
        <div className="hidden xl:grid xl:grid-cols-2 gap-16 items-center py-20 xl:py-32 pt-28">
          {/* Content */}
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 lg:mb-6 leading-tight">
              {data.headline}
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
              {data.subline}
            </p>

            {/* Trust Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 lg:mb-8">
              {data.trustPills.map((pill, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                >
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                  <span className="text-xs sm:text-sm font-medium">{pill}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="gap-2.5 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base btn-lift shadow-whatsapp"
                data-track="cta-whatsapp-hero"
              >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5" />
                  {ctaText.long}
                </a>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2.5 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300"
                data-track="cta-phone-hero"
              >
                <a href={PHONE_LINK}>
                  <Phone className="h-5 w-5" />
                  Jetzt anrufen
                </a>
              </Button>
            </div>
          </div>

          {/* Image / Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 shadow-soft">
              <img 
                src={data.heroImage}
                alt={data.heroImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
