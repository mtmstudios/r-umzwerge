import { Check, Plus } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { SCOPE_BADGES } from '@/lib/serviceData';

interface ServiceScopeProps {
  included: string[];
  optional: string[];
}

export function ServiceScope({ included, optional }: ServiceScopeProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4 text-center">
            Leistungsumfang
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Klar und transparent – was enthalten ist und was optional dazugebucht werden kann.
          </p>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* Included - with accent border */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 lg:p-8 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary-foreground" />
                </div>
                Inklusive
              </h3>
              <ul className="space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional */}
            <div className="bg-secondary/50 border border-border rounded-2xl p-6 lg:p-8">
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-muted-foreground" />
                </div>
                Optional
              </h3>
              <ul className="space-y-4">
                {optional.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Plus className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Badge row */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {SCOPE_BADGES.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium"
              >
                <Check className="h-4 w-4" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
