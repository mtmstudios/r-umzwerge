import { Check, Plus } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { COMMON_BADGES } from '@/lib/serviceData';

interface ServiceScopeProps {
  included: string[];
  optional: string[];
}

export function ServiceScope({ included, optional }: ServiceScopeProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-12 lg:py-24 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 lg:mb-4 text-center">
            Leistungsumfang
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground text-center mb-8 lg:mb-12 max-w-2xl mx-auto px-4">
            Klar und transparent – was enthalten ist und was optional dazugebucht werden kann.
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 max-w-4xl mx-auto">
            {/* Included - with accent border */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
              <h3 className="font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                Inklusive
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional */}
            <div className="bg-secondary/50 border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8">
              <h3 className="font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </div>
                Optional
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {optional.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Badge row */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 lg:mt-12 px-2">
            {COMMON_BADGES.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-accent/10 text-accent px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
              >
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
