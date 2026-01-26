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
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-background overflow-hidden">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          {/* Content */}
          <div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight">
              {h1}
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
              {subline}
            </p>

            {/* Trust Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {trustPills.map((pill) => (
                <div key={pill} className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
                  <Check className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">{pill}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
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
                className="gap-3 h-14 px-8"
              >
                <a href={PHONE_LINK}>
                  <Phone className="h-5 w-5" />
                  Anrufen
                </a>
              </Button>
            </div>

            {/* Photo Guide */}
            <p className="text-sm text-muted-foreground">
              💡 {PHOTO_GUIDE}
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-secondary">
              {imageSrc ? (
                <img 
                  src={imageSrc}
                  alt={imageAlt || h1}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <span className="text-sm">Bild folgt</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
