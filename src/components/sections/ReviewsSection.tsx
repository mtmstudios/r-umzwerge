import { Star, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { GOOGLE_REVIEWS_LINK, GOOGLE_RATING, FEATURED_REVIEWS } from '@/lib/constants';

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl p-6 border border-border",
        "hover:shadow-lg hover:border-primary/20",
        "transition-all duration-300",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-accent fill-accent" />
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-foreground mb-4 line-clamp-4">
        "{review.text}"
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-primary font-medium">
            {review.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium text-foreground">{review.author}</p>
          <p className="text-sm text-muted-foreground">{review.date}</p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function ReviewsSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="referenzen" className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            "text-center mb-12",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h2 className="text-section-mobile lg:text-section text-foreground mb-6">
            Was unsere Kunden sagen
          </h2>
          
          {/* Google Rating Badge */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <GoogleIcon />
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-accent fill-accent" />
              ))}
            </div>
            <span className="font-semibold text-foreground">{GOOGLE_RATING.score}</span>
            <span className="text-muted-foreground">
              · {GOOGLE_RATING.count} Bewertungen
            </span>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {FEATURED_REVIEWS.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <a
            href={GOOGLE_REVIEWS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Alle Bewertungen auf Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
