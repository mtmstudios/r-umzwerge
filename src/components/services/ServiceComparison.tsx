import { Check, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { COMMON_BADGES, ComparisonData } from '@/lib/serviceData';
import logoNeu from '@/assets/logo-neu.png';

interface ServiceComparisonProps {
  comparison: ComparisonData;
}

export function ServiceComparison({ comparison }: ServiceComparisonProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-12 lg:py-24 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 lg:mb-4 text-center">
            Der Unterschied
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground text-center mb-8 lg:mb-12 max-w-2xl mx-auto px-4">
            Warum Kunden uns weiterempfehlen
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Andere Entrümpler - gedämpft */}
            <div className="bg-muted/30 border border-border/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8">
              <h3 className="font-semibold text-muted-foreground mb-4 sm:mb-6 text-center text-sm sm:text-base">
                Andere Entrümpler
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {comparison.others.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-destructive" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Räumzwerge - Premium mit Logo */}
            <div className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-accent/10 border-2 border-primary/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 overflow-hidden shadow-lg">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              
              {/* Accent line */}
              <div className="hidden lg:block absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-accent via-primary to-accent rounded-full" />
              
              <div className="relative z-10">
                {/* Logo Header */}
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <img 
                    src={logoNeu} 
                    alt="Räumzwerge" 
                    className="h-12 sm:h-14 lg:h-16 w-auto logo-trim"
                  />
                </div>
                
                <ul className="space-y-3 sm:space-y-4">
                  {comparison.raeumzwerge.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent" />
                      </div>
                      <span className="text-sm sm:text-base text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
