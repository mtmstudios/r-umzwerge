import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { ComparisonFlipCard } from './ComparisonFlipCard';
import { Progress } from '@/components/ui/progress';

export interface ComparisonPair {
  problem: string;
  solution: string;
}

interface UnifiedComparisonProps {
  headline?: string;
  subline?: string;
  pairs: ComparisonPair[];
  badges?: string[];
}

export function UnifiedComparison({ 
  headline = "Der Unterschied macht's",
  subline = "Klicken Sie auf eine Karte für unsere Lösung",
  pairs,
  badges = []
}: UnifiedComparisonProps) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Track flipped cards for progress
  const handleCardFlip = (index: number, isFlipped: boolean) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (isFlipped) {
        newSet.add(index);
      }
      return newSet;
    });
  };

  useEffect(() => {
    setFlippedCount(flippedCards.size);
  }, [flippedCards]);

  const progressPercentage = (flippedCount / pairs.length) * 100;

  return (
    <section className="py-12 lg:py-24 bg-background overflow-hidden">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
              Vergleich
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 lg:mb-4">
              {headline}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              {subline}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="max-w-md mx-auto mb-8 px-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Entdeckt</span>
              <span className="font-medium text-accent">{flippedCount} von {pairs.length}</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-muted"
            />
          </div>

          {/* Flip Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto mb-10 lg:mb-14">
            {pairs.map((pair, index) => (
              <div
                key={index}
                onClick={() => handleCardFlip(index, true)}
              >
                <ComparisonFlipCard
                  problem={pair.problem}
                  solution={pair.solution}
                  index={index}
                  isVisible={isVisible}
                />
              </div>
            ))}
          </div>

          {/* Badge row */}
          {badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className={cn(
                    "inline-flex items-center gap-1.5 sm:gap-2",
                    "bg-accent/10 text-accent",
                    "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full",
                    "text-xs sm:text-sm font-medium",
                    "transition-all duration-300",
                    "lg:hover:bg-accent/20 lg:hover:scale-105"
                  )}
                >
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
