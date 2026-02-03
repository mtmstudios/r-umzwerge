import { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
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
    <div
      className={cn(
        // Glassmorphism base
        "glass card-glow rounded-2xl overflow-hidden h-full",
        "border border-border/30",
        // Transitions
        "transition-all duration-500",
        !isMobile && "opacity-0 translate-y-6",
        !isMobile && isVisible && "opacity-100 translate-y-0"
      )}
      style={!isMobile ? {
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      } : undefined}
    >
      <div className="p-6 lg:p-8 flex flex-col h-full relative z-10">
        {/* Problem: Emotionales Zitat */}
        <div className="flex-grow mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className={cn(
              "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
              "icon-bounce transition-all duration-300",
              "bg-gradient-to-br",
              isGentle 
                ? "from-primary/20 to-primary/5 shadow-lg shadow-primary/10" 
                : "from-accent/20 to-accent/5 shadow-lg shadow-accent/10"
            )}>
              <MessageCircle className={cn(
                "h-6 w-6",
                isGentle ? "text-primary" : "text-accent"
              )} />
            </div>
            <span className="text-sm text-muted-foreground pt-3 font-medium">
              Was wir oft hören:
            </span>
          </div>
          <blockquote className={cn(
            "text-lg lg:text-xl text-foreground/90 italic leading-relaxed pl-4",
            "border-l-2",
            isGentle ? "border-primary/40" : "border-accent/40"
          )}>
            „{point.problem}"
          </blockquote>
        </div>

        {/* Lösung mit animiertem Gradient-Hintergrund */}
        <div className={cn(
          "rounded-xl p-4 mb-4 relative overflow-hidden",
          "border-l-4",
          isGentle ? "border-primary" : "border-accent"
        )}>
          {/* Animated gradient background */}
          <div className={cn(
            "absolute inset-0 opacity-60",
            isGentle 
              ? "bg-gradient-to-r from-primary/15 via-primary/8 to-primary/15"
              : "bg-gradient-to-r from-accent/15 via-accent/8 to-accent/15"
          )} />
          
          <div className="relative z-10">
            <p className={cn(
              "text-sm font-semibold mb-1",
              isGentle ? "text-primary" : "text-accent"
            )}>
              Unsere Lösung:
            </p>
            <p className="text-foreground font-medium leading-relaxed">
              {point.solution}
            </p>
          </div>
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
              "border-whatsapp/40 text-whatsapp",
              "hover:bg-whatsapp hover:text-whatsapp-foreground hover:border-whatsapp",
              "transition-all duration-300",
              "shadow-sm hover:shadow-lg hover:shadow-whatsapp/20"
            )}
          >
            <span className="flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4" />
              {getCtaText()}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </a>
      </div>
    </div>
  );

  return (
    <section className={cn(
      "py-12 lg:py-20 relative overflow-hidden",
      isGentle ? "bg-muted/30" : "bg-muted/50"
    )}>
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
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
