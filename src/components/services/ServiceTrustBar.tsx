import { Star, Clock, CheckCircle, Shield } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

const trustItems = [
  {
    icon: Star,
    label: '4.9/5 Google',
    highlight: true,
  },
  {
    icon: Clock,
    label: 'Antwort < 24h',
  },
  {
    icon: CheckCircle,
    label: 'Besenrein garantiert',
  },
  {
    icon: Shield,
    label: 'Festpreis möglich',
  },
];

export function ServiceTrustBar() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-6 lg:py-8 bg-secondary/30 border-y border-border/50">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10">
            {trustItems.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <item.icon 
                  className={cn(
                    "h-4 w-4 flex-shrink-0",
                    item.highlight ? "text-cta" : "text-primary"
                  )} 
                />
                <span className={cn(
                  "font-medium",
                  item.highlight ? "text-foreground" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
