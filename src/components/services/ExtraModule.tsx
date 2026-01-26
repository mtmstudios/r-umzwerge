import { Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

interface ExtraModuleProps {
  title: string;
  points: string[];
}

export function ExtraModule({ title, points }: ExtraModuleProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-xl lg:text-2xl font-semibold text-primary-foreground mb-8">
              {title}
            </h2>
            
            <div className="space-y-4">
              {points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl p-4"
                >
                  <Check className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/90 text-left">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
