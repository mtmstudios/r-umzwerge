import { Star, ExternalLink } from 'lucide-react';
import { GOOGLE_RATING, GOOGLE_REVIEWS_LINK, FEATURED_REVIEWS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { SEAData } from '@/lib/seaData';

interface SEASocialProofProps {
  data: SEAData;
}

// Google Icon SVG (colored)
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Review Card Component
function ReviewCard({ review, index }: { review: typeof FEATURED_REVIEWS[0]; index: number }) {
  return (
    <div 
      className="bg-card border border-border/50 rounded-xl p-5 lg:p-6 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-amber-400 text-amber-400"
          />
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-sm lg:text-base text-foreground/90 mb-4 leading-relaxed">
        „{review.text}"
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary">
            {review.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{review.author}</p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
      </div>
    </div>
  );
}

export function SEASocialProof({ data }: SEASocialProofProps) {
  const isGentle = data.tone === 'gentle';

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Was unsere Kunden sagen
          </h2>
          
          {/* Google Rating Badge */}
          <div className="inline-flex items-center gap-3 bg-muted/50 px-5 py-3 rounded-full">
            <GoogleIcon className="h-5 w-5" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-semibold text-foreground">
              {GOOGLE_RATING.score.toFixed(1)}
            </span>
            <span className="text-muted-foreground text-sm">
              · {GOOGLE_RATING.count} Bewertungen
            </span>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {FEATURED_REVIEWS.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center">
          <a
            href={GOOGLE_REVIEWS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium transition-colors",
              isGentle 
                ? "text-primary/80 hover:text-primary" 
                : "text-primary hover:text-primary/80"
            )}
          >
            Alle Bewertungen auf Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
