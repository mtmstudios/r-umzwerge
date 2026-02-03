import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { cn } from '@/lib/utils';
import { getWhatsAppLink } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { useIsMobile, useIsTabletOrMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  type CarouselApi 
} from '@/components/ui/carousel';
import { FlipCard } from './FlipCard';
import type { SEAData } from '@/lib/seaData';

interface SEAPainPointsProps {
  data: SEAData;
}

export function SEAPainPoints({ data }: SEAPainPointsProps) {
  const isGentle = data.tone === 'gentle';
  const isDirect = data.tone === 'direct';
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();
  const isTabletOrMobile = useIsTabletOrMobile();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Einblende-Animation für Carousel
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on('select', onSelect);
    return () => { carouselApi.off('select', onSelect); };
  }, [carouselApi]);

  // CTA-Text je nach Ton
  const getCtaText = () => {
    if (isGentle) return 'Unverbindlich schreiben';
    if (isDirect) return 'Jetzt Preis anfragen';
    return 'Jetzt Hilfe anfragen';
  };

  // WhatsApp-Nachricht
  const getWhatsAppMessage = () => {
    return isGentle 
      ? 'Hallo Räumzwerge, ich brauche diskret Hilfe. Ort: ____. Ich sende gleich Fotos.'
      : 'Hallo Räumzwerge, ich hätte gerne eine Preiseinschätzung. Ort: ____. Ich sende gleich Fotos.';
  };

  return (
    <section className={cn(
      "py-12 lg:py-20 relative overflow-hidden",
      isGentle ? "bg-muted/30" : "bg-muted/50"
    )}>
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
            {isGentle ? 'Wir verstehen, wie Sie sich fühlen' : 'Kennen Sie das?'}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {isGentle
              ? 'Sie sind nicht allein. Wir helfen – ohne Druck, ohne Wertung.'
              : 'Diese Situationen kennen wir. Und wir haben die Lösung.'}
          </p>
          <p className="text-sm text-muted-foreground/70 mt-3">
            {isMobile ? 'Tippen Sie auf eine Karte' : 'Klicken Sie auf eine Karte'} um die Lösung zu sehen
          </p>
        </div>

        {/* Mobile/Tablet: Carousel | Desktop: Grid */}
        {isTabletOrMobile ? (
          <div className={cn(
            "flex flex-col items-center space-y-6",
            "transition-all duration-700 ease-out",
            hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: 'center',
                loop: false,
              }}
              className="w-full max-w-sm md:max-w-md mx-auto"
            >
              <CarouselContent className="-ml-2">
                {data.painPoints.map((point, index) => (
                  <CarouselItem key={index} className="pl-2 basis-[85%] md:basis-[65%]">
                    <FlipCard
                      problem={point.problem}
                      solution={point.solution}
                      index={index}
                      isGentle={isGentle}
                      isMobile={isMobile}
                      isVisible={true}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Dot Indicators */}
            <div className="flex justify-center gap-2">
              {data.painPoints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    currentSlide === index 
                      ? "w-6 bg-cta" 
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Gehe zu Karte ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div 
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {data.painPoints.map((point, index) => (
              <FlipCard
                key={index}
                problem={point.problem}
                solution={point.solution}
                index={index}
                isGentle={isGentle}
                isMobile={isMobile}
                isVisible={isVisible}
              />
            ))}
          </div>
        )}

        {/* Zentraler WhatsApp CTA */}
        <div className="mt-10 lg:mt-14 flex justify-center">
          <a
            href={getWhatsAppLink(getWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button
              size="lg"
              className={cn(
                "gap-3 px-8 py-6 text-base font-semibold rounded-xl",
                "bg-whatsapp text-whatsapp-foreground",
                "hover:bg-whatsapp-hover",
                "shadow-lg shadow-whatsapp/30 hover:shadow-xl hover:shadow-whatsapp/40",
                "transition-all duration-300",
                "btn-lift"
              )}
            >
              <WhatsAppIcon className="h-6 w-6" />
              <span>{getCtaText()}</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-3">
              Antwort innerhalb von 24 Stunden
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
