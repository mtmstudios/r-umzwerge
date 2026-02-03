import { useState } from 'react';
import { X, Check, MousePointerClick, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ComparisonFlipCardProps {
  problem: string;
  solution: string;
  index: number;
  isVisible: boolean;
}

export function ComparisonFlipCard({ problem, solution, index, isVisible }: ComparisonFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={cn(
        "comparison-flip-card cursor-pointer rounded-2xl h-[240px] sm:h-[220px]",
        "transition-all duration-500",
        isFlipped && "flipped",
        !isMobile && "opacity-0 translate-y-6",
        !isMobile && isVisible && "opacity-100 translate-y-0"
      )}
      style={!isMobile ? {
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      } : undefined}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? 'Karte zurückdrehen zum Problem' : 'Karte drehen zur Lösung'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="comparison-flip-card-inner w-full h-full">
        {/* === FRONT SIDE (Problem - Other providers) === */}
        <div className={cn(
          "comparison-flip-card-front flex flex-col overflow-hidden",
          "bg-gradient-to-br from-muted to-muted/70",
          "border border-border/40 rounded-2xl"
        )}>
          {/* Header with number and label */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <div className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
              "text-xs font-bold",
              "bg-destructive/15 text-destructive border border-destructive/30"
            )}>
              {index + 1}
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Andere Anbieter
            </span>
          </div>

          {/* Problem content with icon */}
          <div className={cn(
            "flex-1 mx-4 mb-3 px-4 py-3",
            "border-l-[3px] border-destructive/50",
            "bg-background/40 rounded-r-lg"
          )}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="h-4 w-4 text-destructive" />
              </div>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                {problem}
              </p>
            </div>
          </div>

          {/* Tap hint */}
          <div className={cn(
            "flex items-center justify-center gap-2 pb-4 px-4",
            "text-xs text-muted-foreground"
          )}>
            <MousePointerClick className="h-3.5 w-3.5 animate-pulse" />
            <span className="font-medium">
              {isMobile ? 'Antippen für Lösung' : 'Klicken für Lösung'}
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* === BACK SIDE (Solution - Räumzwerge) === */}
        <div className={cn(
          "comparison-flip-card-back flex flex-col overflow-hidden",
          "bg-gradient-to-br from-accent/15 via-primary/10 to-accent/5",
          "border border-accent/30 rounded-2xl"
        )}>
          {/* Header with number and label */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <div className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
              "text-xs font-bold",
              "bg-accent/20 text-accent border border-accent/40"
            )}>
              {index + 1}
            </div>
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              Räumzwerge
            </span>
          </div>

          {/* Solution content with icon */}
          <div className={cn(
            "flex-1 mx-4 mb-3 px-4 py-3",
            "border-l-[3px] border-accent",
            "bg-card/60 rounded-r-lg"
          )}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed">
                {solution}
              </p>
            </div>
          </div>

          {/* Back hint */}
          <div className={cn(
            "flex items-center justify-center gap-2 pb-4 px-4",
            "text-xs text-accent/70"
          )}>
            <MousePointerClick className="h-3.5 w-3.5" />
            <span className="font-medium">Erneut klicken zum Zurückdrehen</span>
          </div>
        </div>
      </div>
    </div>
  );
}
