import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useTimelineProgress } from '@/hooks/useTimelineProgress';

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

export function HorizontalTimeline({ steps, className }: HorizontalTimelineProps) {
  const { containerRef, activeStep, progress, justActivated } = 
    useTimelineProgress(steps.length);

  return (
    <div 
      ref={containerRef} 
      className={cn('relative', className)}
    >
      {/* Progress Bar - Desktop */}
      <div className="hidden md:block absolute top-[60px] left-0 right-0 z-0 h-1 bg-border rounded-full mx-auto max-w-3xl">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cta via-accent to-cta rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Steps Container */}
      <div className="grid md:grid-cols-3 gap-6 md:gap-4 lg:gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= activeStep;
          const isCurrent = index === activeStep;
          const isJustActivated = justActivated === index;

          return (
            <div
              key={step.number}
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
                  // Bounce animation only when just activated
                  isJustActivated && 'animate-bounce-in',
                  // Fallback scale when no animation is running
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

              {/* Mobile Connector Line */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute left-1/2 top-[105px] sm:top-[120px] w-0.5 h-6 -translate-x-1/2">
                  <div
                    className={cn(
                      'w-full h-full transition-all duration-300',
                      isActive ? 'bg-primary' : 'bg-border'
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
