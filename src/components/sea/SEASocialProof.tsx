import { Star, Quote } from 'lucide-react';
import { GOOGLE_RATING } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { SEAData } from '@/lib/seaData';

interface SEASocialProofProps {
  data: SEAData;
}

export function SEASocialProof({ data }: SEASocialProofProps) {
  const isGentle = data.tone === 'gentle';

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Google Rating */}
          <div className="inline-flex items-center gap-3 bg-muted/50 px-5 py-3 rounded-full mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-semibold text-foreground">
              {GOOGLE_RATING.score.toFixed(1)}
            </span>
            <span className="text-muted-foreground text-sm">
              auf Google ({GOOGLE_RATING.count} Bewertungen)
            </span>
          </div>

          {/* Testimonial Quote */}
          <div className={cn(
            "relative p-8 rounded-2xl",
            isGentle ? "bg-muted/30" : "bg-primary/5"
          )}>
            <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
            
            <blockquote className="relative z-10">
              <p className={cn(
                "text-lg lg:text-xl leading-relaxed mb-4",
                isGentle ? "text-foreground/90" : "text-foreground"
              )}>
                „{data.testimonial.text}"
              </p>
              <footer className="text-muted-foreground font-medium">
                — {data.testimonial.author}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
