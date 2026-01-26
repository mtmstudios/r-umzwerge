import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { PHOTO_GUIDE } from '@/lib/serviceData';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { Phone } from 'lucide-react';

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
    <section className="pt-20 pb-12 lg:pt-32 lg:pb-24 bg-background overflow-hidden">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center",
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
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
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
                className="gap-2.5 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300 max-lg:bg-cta max-lg:text-cta-foreground max-lg:border-cta"
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
            <div className="aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5">
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
                      <Check className="h-10 w-10 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary/60">Professionell & Zuverlässig</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
