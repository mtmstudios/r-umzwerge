import { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, Heart, Clock, Shield, Home, AlertCircle, Feather } from 'lucide-react';
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

// Icon-Mapping basierend auf Problemtext-Keywords
const getIconForProblem = (problem: string) => {
  const text = problem.toLowerCase();
  if (text.includes('verstorben') || text.includes('tod') || text.includes('trauer')) {
    return { icon: Feather, label: 'Trauerfall' };
  }
  if (text.includes('pflege') || text.includes('heim') || text.includes('umzug')) {
    return { icon: Home, label: 'Pflegeheim' };
  }
  if (text.includes('zeit') || text.includes('schnell') || text.includes('dringend')) {
    return { icon: Clock, label: 'Zeitdruck' };
  }
  if (text.includes('diskret') || text.includes('messie') || text.includes('scham')) {
    return { icon: Shield, label: 'Diskret' };
  }
  if (text.includes('überfordert') || text.includes('allein') || text.includes('weiß nicht')) {
    return { icon: AlertCircle, label: 'Überforderung' };
  }
  return { icon: Heart, label: 'Persönlich' };
};

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
    if (isDirect) return 'Jetzt Preis anfragen';
    return 'Jetzt Hilfe anfragen';
  };

  // WhatsApp-Nachricht
  const getWhatsAppMessage = () => {
    return isGentle 
      ? 'Hallo Räumzwerge, ich brauche diskret Hilfe. Ort: ____. Ich sende gleich Fotos.'
      : 'Hallo Räumzwerge, ich hätte gerne eine Preiseinschätzung. Ort: ____. Ich sende gleich Fotos.';
  };

  // Split-Card Komponente
  const PainPointCard = ({ point, index }: { point: { problem: string; solution: string }, index: number }) => {
    const { icon: IconComponent, label } = getIconForProblem(point.problem);
    
    return (
      <div
        className={cn(
          "pain-point-card rounded-2xl overflow-hidden h-full",
          "border border-border/40",
          "bg-card/50 backdrop-blur-sm",
          "transition-all duration-500",
          !isMobile && "opacity-0 translate-y-6",
          !isMobile && isVisible && "opacity-100 translate-y-0"
        )}
        style={!isMobile ? {
          transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
        } : undefined}
      >
        {/* Nummerierte Badge mit Gradient-Linie */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-3">
          <div className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
            "text-sm font-bold",
            "bg-gradient-to-br from-cta to-cta-hover text-cta-foreground",
            "shadow-lg shadow-cta/30"
          )}>
            {index + 1}
          </div>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-cta/60 via-cta/30 to-transparent rounded-full" />
        </div>

        {/* Split Content: Problem | Lösung */}
        <div className={cn(
          "grid h-auto",
          isMobile ? "grid-cols-1" : "grid-cols-2"
        )}>
          {/* Problem-Seite */}
          <div className={cn(
            "p-5 relative",
            isMobile ? "pb-4" : "border-r border-border/30",
            "bg-muted/40"
          )}>
            {/* Icon Badge */}
            <div className="flex items-center gap-2 mb-3">
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center",
                "bg-destructive/10 text-destructive"
              )}>
                <IconComponent className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {label}
              </span>
            </div>

            {/* Problem-Zitat */}
            <blockquote className={cn(
              "text-base lg:text-lg text-foreground/85 italic leading-relaxed",
              "border-l-3 border-destructive/50 pl-3"
            )}>
              „{point.problem}"
            </blockquote>
          </div>

          {/* Transformation-Pfeil (nur Desktop in der Mitte) */}
          {!isMobile && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-card border-2 border-accent shadow-lg",
                "text-accent"
              )}>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          )}

          {/* Mobile Pfeil */}
          {isMobile && (
            <div className="flex justify-center py-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                "bg-accent/20 text-accent"
              )}>
                <ArrowDown className="h-4 w-4" />
              </div>
            </div>
          )}

          {/* Lösungs-Seite */}
          <div className={cn(
            "p-5 relative",
            isMobile ? "pt-2" : "",
            "bg-gradient-to-br from-accent/5 to-primary/5"
          )}>
            {/* Lösung Label */}
            <div className="flex items-center gap-2 mb-3">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center",
                "bg-accent/20 text-accent"
              )}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={cn(
                "text-sm font-semibold",
                isGentle ? "text-primary" : "text-accent"
              )}>
                Unsere Lösung
              </span>
            </div>

            {/* Lösungs-Text */}
            <p className="text-foreground font-medium leading-relaxed">
              {point.solution}
            </p>
          </div>
        </div>
      </div>
    );
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
        </div>

        {/* Mobile: Carousel | Desktop: Stacked Cards */}
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
                  <CarouselItem key={index} className="pl-4 basis-[90%]">
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
            className="flex flex-col gap-6 max-w-4xl mx-auto"
          >
            {data.painPoints.map((point, index) => (
              <PainPointCard key={index} point={point} index={index} />
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
