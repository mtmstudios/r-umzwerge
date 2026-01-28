import { cn } from '@/lib/utils';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { useTimelineProgress } from '@/hooks/useTimelineProgress';
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

// Reusable Step Card Component
function StepCard({ 
  step, 
  isActive = true, 
  isCurrent = false, 
  isJustActivated = false 
}: { 
  step: TimelineStep; 
  isActive?: boolean; 
  isCurrent?: boolean; 
  isJustActivated?: boolean;
}) {
  const Icon = step.icon;
  
  return (
    <div
      className={cn(
        'relative flex flex-col items-center text-center transition-all duration-500',
        isActive ? 'opacity-100' : 'opacity-40'
      )}
    >
      {/* Step Circle */}
      <div
        className={cn(
          'relative z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-[120px] md:h-[120px] rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center',
          'border-2 transition-colors duration-500',
          isCurrent
            ? 'bg-primary border-primary shadow-lg shadow-primary/30'
            : isActive
            ? 'bg-primary/90 border-primary'
            : 'bg-card border-border',
          isJustActivated && 'animate-bounce-in',
          isCurrent && !isJustActivated && 'scale-110'
        )}
      >
        {/* Number Badge */}
        <span
          className={cn(
            'absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300',
            isCurrent
              ? 'bg-cta text-cta-foreground scale-110 shadow-cta'
              : isActive
              ? 'bg-cta/80 text-cta-foreground'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {step.number}
        </span>

        <Icon
          className={cn(
            'h-8 w-8 sm:h-10 sm:w-10 transition-all duration-300',
            isActive ? 'text-primary-foreground' : 'text-muted-foreground',
            isCurrent && 'scale-110'
          )}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          'mt-4 sm:mt-6 transition-all duration-500',
          isCurrent ? 'transform scale-105' : ''
        )}
      >
        <h3
          className={cn(
            'font-semibold text-base sm:text-lg mb-1 sm:mb-2 transition-colors duration-300',
            isActive ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {step.title}
        </h3>
        <p
          className={cn(
            'text-xs sm:text-sm max-w-[180px] sm:max-w-[200px] mx-auto transition-colors duration-300',
            isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'
          )}
        >
          {step.description}
        </p>
      </div>
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
        <CarouselContent className="ml-0">
          {steps.map((step, index) => (
            <CarouselItem key={step.number} className="pl-4 basis-[75%]">
              <div className={cn(
                "py-4 carousel-gpu transition-all duration-300 ease-out",
                index === current 
                  ? "scale-100 opacity-100" 
                  : "scale-90 opacity-60"
              )}>
                <StepCard 
                  step={step} 
                  isActive={true} 
                  isCurrent={index === current} 
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

// Desktop Timeline View
function DesktopTimeline({ steps }: { steps: TimelineStep[] }) {
  const { containerRef, activeStep, progress, justActivated } = 
    useTimelineProgress(steps.length);

  return (
    <div ref={containerRef} className="hidden md:block relative">
      {/* Progress Bar */}
      <div className="absolute top-[60px] left-0 right-0 z-0 h-1 bg-border rounded-full mx-auto max-w-3xl">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cta via-accent to-cta rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-3 gap-4 lg:gap-8">
        {steps.map((step, index) => (
          <StepCard
            key={step.number}
            step={step}
            isActive={index <= activeStep}
            isCurrent={index === activeStep}
            isJustActivated={justActivated === index}
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
