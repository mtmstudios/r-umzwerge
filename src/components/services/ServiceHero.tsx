import { CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { PHOTO_GUIDE } from '@/lib/serviceData';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

interface ServiceHeroProps {
  h1: string;
  subline: string;
  trustPills: string[];
  imageSrc?: string;
  imageAlt?: string;
}

export function ServiceHero({ h1, subline, trustPills, imageSrc, imageAlt }: ServiceHeroProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative overflow-hidden">
      {/* Mobile & Tablet: Fullscreen background with overlay */}
      <div className="xl:hidden absolute inset-0">
        {imageSrc ? (
          <img 
            src={imageSrc}
            alt={imageAlt || h1}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Desktop: Standard background */}
      <div className="hidden xl:block absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-background" />

      <div className="container-custom relative">
        {/* Mobile & Tablet Layout: Fullscreen with centered content */}
        <div
          ref={ref}
          className={cn(
            "xl:hidden min-h-[85vh] md:min-h-[75vh] flex flex-col justify-center items-center text-center px-4 py-16 md:py-20",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 text-balance leading-tight max-w-2xl">
            {h1}
          </h1>
          
          <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-xl">
            {subline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full sm:w-auto sm:justify-center">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground text-sm md:text-base h-12 md:h-14 px-4 md:px-6 btn-lift shadow-whatsapp"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                <span className="hidden sm:inline">Foto senden · Preiseinschätzung erhalten</span>
                <span className="sm:hidden">Foto senden · Preis erhalten</span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 h-12 md:h-14 px-4 md:px-6 text-sm md:text-base bg-cta hover:bg-cta-hover text-cta-foreground border-0"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 flex-shrink-0" />
                Jetzt anrufen
              </a>
            </Button>
          </div>

          {/* Photo Guide */}
          <p className="text-sm text-white/70 mb-6">
            💡 {PHOTO_GUIDE}
          </p>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {trustPills.map((pill) => (
              <div
                key={pill}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/10"
              >
                <CheckCircle className="h-3.5 w-3.5 text-accent" />
                {pill}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout: Side-by-side grid */}
        <div
          className={cn(
            "hidden xl:grid xl:grid-cols-2 gap-16 items-center py-20 xl:py-32",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 lg:mb-6 leading-tight">
              {h1}
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
              {subline}
            </p>

            {/* Trust Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 lg:mb-8">
              {trustPills.map((pill) => (
                <div key={pill} className="flex items-center gap-1.5 sm:gap-2 bg-secondary/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">{pill}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button
                asChild
                size="lg"
                className="gap-2.5 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Foto senden · Preis erhalten</span>
                  <span className="sm:hidden">Foto senden</span>
                </a>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2.5 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300"
              >
                <a href={PHONE_LINK}>
                  <Phone className="h-5 w-5" />
                  Jetzt anrufen
                </a>
              </Button>
            </div>

            {/* Photo Guide */}
            <p className="text-xs sm:text-sm text-muted-foreground text-center lg:text-left">
              💡 {PHOTO_GUIDE}
            </p>
          </div>

          {/* Image / Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 shadow-soft">
              {imageSrc ? (
                <img 
                  src={imageSrc}
                  alt={imageAlt || h1}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-4 grid-rows-3 gap-4 p-8 h-full">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-primary rounded-xl"
                          style={{ opacity: 0.3 + (i % 3) * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Icon cluster */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary/60">Professionell & Zuverlässig</span>
                  </div>
                </div>
              )}
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
