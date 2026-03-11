import { Star, ExternalLink } from 'lucide-react';
import { GOOGLE_RATING, GOOGLE_REVIEWS_LINK, FEATURED_REVIEWS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { SEAData } from '@/lib/seaData';

interface SEASocialProofProps {
  data: SEAData;
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function ShimmerStars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5 relative">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
    </div>
  );
}

function ReviewCard({ review, index }: { review: typeof FEATURED_REVIEWS[0]; index: number }) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-5 lg:p-6 border border-border/30",
        "lg:hover:shadow-2xl lg:hover:-translate-y-2 lg:hover:shadow-primary/10",
        "transition-all duration-500",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm lg:text-base text-foreground/90 mb-4 leading-relaxed">„{review.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center shadow-sm">
          <span className="text-sm font-bold text-primary">{review.author.charAt(0)}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{review.author}</p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
      </div>
    </div>
  );
}

export function SEASocialProof({ data }: SEASocialProofProps) {
  const isGentle = data.tone === 'gentle';

  return (
    <section className="py-12 lg:py-16 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Was unsere Kunden sagen
          </h2>
          <div className="inline-flex items-center gap-3 glass px-6 py-4 rounded-full shadow-lg shadow-primary/5">
            <GoogleIcon className="h-6 w-6" />
            <ShimmerStars count={5} />
            <span className="font-bold text-foreground text-lg">{GOOGLE_RATING.score.toFixed(1)}</span>
            <span className="text-muted-foreground text-sm">· {GOOGLE_RATING.count} Bewertungen</span>
          </div>
        </div>

        {data.testimonial && (
          <div className="max-w-2xl mx-auto mb-10 glass rounded-2xl p-6 lg:p-8 border border-border/30 shadow-lg shadow-primary/5 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="flex gap-4">
              <span className="text-4xl lg:text-5xl font-serif text-primary/30 leading-none select-none">"</span>
              <div>
                <p className={cn(
                  "text-base lg:text-lg text-foreground/90 leading-relaxed mb-3 italic",
                  isGentle ? "text-foreground/80" : ""
                )}>
                  {data.testimonial.text}
                </p>
                <p className="text-sm font-semibold text-muted-foreground">– {data.testimonial.author}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {FEATURED_REVIEWS.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        <div className="text-center">
          <a
            href={GOOGLE_REVIEWS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 hover:gap-3 transition-all duration-300"
          >
            Alle Bewertungen auf Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
