import { cn } from '@/lib/utils';
import { LucideIcon, ChevronRight, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { useState, useEffect, useCallback } from 'react';

interface TimelineStep {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

interface HorizontalTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

// Reusable Step Card Component with staggered animation
function StepCard({ 
  step, 
  index,
  isVisible,
  showArrow = false
}: { 
  step: TimelineStep; 
  index: number;
  isVisible: boolean;
  showArrow?: boolean;
}) {
  const Icon = step.icon;
  
  return (
    <div className="flex items-start gap-2 lg:gap-4">
      {/* Card */}
      <div
        className={cn(
          'relative flex flex-col items-center text-center transition-all duration-700 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        {/* Step Circle */}
        <div
          className={cn(
            'relative z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-[120px] md:h-[120px] rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center',
            'border-2 bg-primary border-primary shadow-lg shadow-primary/20 transition-all duration-500',
            'hover:shadow-xl hover:shadow-primary/30 hover:scale-105'
          )}
        >
          {/* Number Badge */}
          <span
            className={cn(
              'absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold',
              'bg-cta text-cta-foreground shadow-cta transition-all duration-500',
              isVisible ? 'scale-100' : 'scale-0'
            )}
            style={{ transitionDelay: `${index * 200 + 300}ms` }}
          >
            {step.number}
          </span>

          <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
        </div>

        {/* Content */}
        <div className="mt-4 sm:mt-6">
          <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">
            {step.title}
          </h3>
          <p className="text-xs sm:text-sm max-w-[180px] sm:max-w-[200px] mx-auto text-muted-foreground">
            {step.description}
          </p>
        </div>
      </div>

      {/* Arrow between cards */}
      {showArrow && (
        <div 
          className={cn(
            "hidden md:flex items-center justify-center pt-12 transition-all duration-500",
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          )}
          style={{ transitionDelay: `${index * 200 + 150}ms` }}
        >
          <div className="w-8 lg:w-12 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 text-accent" />
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile Carousel View
function MobileCarousel({ steps }: { steps: TimelineStep[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className="md:hidden relative">
      <Carousel 
        setApi={setApi}
        opts={{ align: 'center', loop: false, containScroll: false }}
        className="w-full overflow-visible"
      >
        <CarouselContent className="-ml-0">
          {steps.map((step, index) => (
            <CarouselItem key={step.number} className="pl-0 basis-[85%] flex justify-center">
              <div className={cn(
                "py-4 carousel-gpu transition-all duration-300 ease-out",
                index === current 
                  ? "scale-100 opacity-100" 
                  : "scale-90 opacity-60"
              )}>
                <StepCard 
                  step={step} 
                  index={0}
                  isVisible={true}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Swipe Hint - nur beim ersten Slide sichtbar */}
      {current === 0 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground animate-pulse pointer-events-none">
          <ChevronRight className="h-6 w-6" />
        </div>
      )}
      
      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              index === current 
                ? 'bg-cta w-6' 
                : 'bg-border hover:bg-muted-foreground/50'
            )}
            aria-label={`Gehe zu Schritt ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Desktop Timeline View with scroll-triggered staggered animation
function DesktopTimeline({ steps }: { steps: TimelineStep[] }) {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div ref={ref} className="hidden md:block relative">
      {/* Steps with arrows */}
      <div className="relative z-10 flex justify-center items-start gap-2 lg:gap-4">
        {steps.map((step, index) => (
          <StepCard
            key={step.number}
            step={step}
            index={index}
            isVisible={isVisible}
            showArrow={index < steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export function HorizontalTimeline({ steps, className }: HorizontalTimelineProps) {
  return (
    <div className={cn('relative', className)}>
      <MobileCarousel steps={steps} />
      <DesktopTimeline steps={steps} />
    </div>
  );
}
