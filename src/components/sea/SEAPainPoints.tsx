import { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { cn } from '@/lib/utils';
import { getWhatsAppLink } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  type CarouselApi 
} from '@/components/ui/carousel';
import type { SEAData } from '@/lib/seaData';

interface SEAPainPointsProps {
  data: SEAData;
}

export function SEAPainPoints({ data }: SEAPainPointsProps) {
  const isGentle = data.tone === 'gentle';
  const isDirect = data.tone === 'direct';
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

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
    if (isDirect) return 'Preis anfragen';
    return 'Jetzt Hilfe anfragen';
  };

  // WhatsApp-Nachricht mit Kontext
  const getWhatsAppMessage = (problem: string) => {
    return `Hallo Räumzwerge, ${isGentle ? 'ich brauche diskret Hilfe' : 'ich hätte gerne eine Preiseinschätzung'}. Meine Situation: ${problem.substring(0, 50)}... Ort: ____.`;
  };

  // Card-Komponente für Wiederverwendung
  const PainPointCard = ({ point, index }: { point: { problem: string; solution: string }, index: number }) => (
    <Card
      className={cn(
        "border-none shadow-lg h-full",
        "hover:shadow-xl hover:-translate-y-1",
        "hover:shadow-primary/10",
        isGentle ? "bg-background" : "bg-card",
        !isMobile && "opacity-0 translate-y-6",
        !isMobile && isVisible && "opacity-100 translate-y-0"
      )}
      style={!isMobile ? {
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
        transitionProperty: 'opacity, transform',
        transitionDuration: '500ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      } : undefined}
    >
      <CardContent className="p-6 lg:p-8 flex flex-col h-full">
        {/* Problem: Emotionales Zitat */}
        <div className="flex-grow mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
              isGentle ? "bg-primary/10" : "bg-accent/10"
            )}>
              <MessageCircle className={cn(
                "h-5 w-5",
                isGentle ? "text-primary/70" : "text-accent"
              )} />
            </div>
            <span className="text-sm text-muted-foreground pt-2.5">
              Was wir oft hören:
            </span>
          </div>
          <blockquote className="text-lg lg:text-xl text-foreground/90 italic leading-relaxed pl-4 border-l-2 border-muted">
            „{point.problem}"
          </blockquote>
        </div>

        {/* Lösung mit grünem Akzent */}
        <div className={cn(
          "rounded-xl p-4 mb-4",
          "bg-gradient-to-r from-primary/10 to-primary/5",
          "border-l-4 border-primary"
        )}>
          <p className="text-sm font-medium text-primary/70 mb-1">
            Unsere Lösung:
          </p>
          <p className="text-foreground font-medium leading-relaxed">
            {point.solution}
          </p>
        </div>

        {/* WhatsApp Mini-CTA */}
        <a
          href={getWhatsAppLink(getWhatsAppMessage(point.problem))}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-auto"
        >
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-full justify-between",
              "border-[#25D366]/30 text-[#25D366]",
              "hover:bg-[#25D366] hover:text-white",
              "transition-all duration-300",
              "group-hover:border-[#25D366]"
            )}
          >
            <span className="flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4" />
              {getCtaText()}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );

  return (
    <section className={cn(
      "py-12 lg:py-20",
      isGentle ? "bg-muted/30" : "bg-muted/50"
    )}>
      <div className="container-custom">
        {/* Header mit angepasstem Text */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
            {isGentle ? 'Wir verstehen, wie Sie sich fühlen' : 'Kennen Sie das?'}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {isGentle
              ? 'Sie sind nicht allein. Wir helfen – ohne Druck, ohne Wertung.'
              : 'Diese Situationen kennen wir. Und wir haben die Lösung.'}
          </p>
        </div>

        {/* Mobile: Carousel | Desktop: Grid */}
        {isMobile ? (
          <div className="space-y-6">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {data.painPoints.map((point, index) => (
                  <CarouselItem key={index} className="pl-4 basis-[85%]">
                    <PainPointCard point={point} index={index} />
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
                      ? "w-6 bg-primary" 
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
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
          >
            {data.painPoints.map((point, index) => (
              <PainPointCard key={index} point={point} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
