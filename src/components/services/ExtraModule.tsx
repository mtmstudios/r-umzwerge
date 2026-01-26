import { Check, Recycle, Heart, Truck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

interface ExtraModuleProps {
  title: string;
  subtitle?: string;
  points: string[];
}

// Map keywords to icons
const getPointIcon = (point: string) => {
  const lowerPoint = point.toLowerCase();
  if (lowerPoint.includes('recycl') || lowerPoint.includes('getrennt')) return Recycle;
  if (lowerPoint.includes('spende') || lowerPoint.includes('weitergabe') || lowerPoint.includes('brauchbar')) return Heart;
  if (lowerPoint.includes('entsor') || lowerPoint.includes('abtransport') || lowerPoint.includes('partner')) return Truck;
  return Check;
};

export function ExtraModule({ title, subtitle, points }: ExtraModuleProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="max-w-4xl mx-auto">
            {/* Split layout card with glassmorphism */}
            <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-card via-card to-secondary/30 border border-border shadow-lg">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 grid lg:grid-cols-5 gap-6 lg:gap-8 p-6 lg:p-10">
                {/* Left side: Icon cluster */}
                <div className="lg:col-span-2 flex flex-col justify-center items-center lg:items-start">
                  <div className="relative">
                    {/* Main icon */}
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <Recycle className="h-10 w-10 lg:h-12 lg:w-12 text-primary" />
                    </div>
                    {/* Secondary icons */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                      <Heart className="h-5 w-5 text-accent" />
                    </div>
                    <div className="absolute -bottom-1 -left-3 w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  {/* Visual indicators */}
                  <div className="hidden lg:flex flex-wrap gap-2 mt-6">
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                      Transparent
                    </span>
                    <span className="px-3 py-1 bg-accent/10 rounded-full text-xs font-medium text-accent">
                      Nachhaltig
                    </span>
                  </div>
                </div>

                {/* Right side: Content */}
                <div className="lg:col-span-3">
                  <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-2 lg:mb-3">
                    {title}
                  </h2>
                  
                  {subtitle && (
                    <p className="text-muted-foreground mb-6 text-sm lg:text-base">
                      {subtitle}
                    </p>
                  )}
                  
                  <div className="space-y-3">
                    {points.map((point) => {
                      const Icon = getPointIcon(point);
                      return (
                        <div
                          key={point}
                          className="flex items-start gap-3 bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors duration-200"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-foreground/90 text-sm lg:text-base pt-1">
                            {point}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
