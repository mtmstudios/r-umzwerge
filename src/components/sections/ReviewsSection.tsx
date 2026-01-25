import { Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

function SkeletonReviewCard({ index }: { index: number }) {
  return (
    <div
      className="bg-card rounded-xl p-6 border border-border animate-pulse"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-muted rounded" />
        ))}
      </div>
      
      {/* Text lines */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-4/5" />
        <div className="h-4 bg-muted rounded w-3/5" />
      </div>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted rounded-full" />
        <div className="space-y-1">
          <div className="h-4 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="referenzen" className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "text-center mb-12",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h2 className="text-section-mobile lg:text-section text-foreground mb-4">
            Referenzen
          </h2>
          <p className="text-muted-foreground">
            Kundenbewertungen werden in Kürze ergänzt.
          </p>
        </div>

        {/* Skeleton Review Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, index) => (
            <SkeletonReviewCard key={index} index={index} />
          ))}
        </div>

        {/* Google Reviews Placeholder */}
        <div className="max-w-sm mx-auto bg-card rounded-xl p-6 border border-border text-center">
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-muted fill-muted" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Google Bewertungen
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Bewertungen werden geladen...
          </p>
        </div>
      </div>
    </section>
  );
}
