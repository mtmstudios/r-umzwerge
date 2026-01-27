import { useState } from 'react';
import { Check, AlertCircle, Lightbulb, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import type { ExtraModulePoint } from '@/lib/serviceData';

interface ExtraModuleProps {
  title: string;
  subtitle?: string;
  points: ExtraModulePoint[];
}

export function ExtraModule({ title, subtitle, points }: ExtraModuleProps) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-12 lg:py-24 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-2 lg:mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* Expanding Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {points.map((point, index) => {
              const isExpanded = expandedIndex === index;
              
              return (
                <div
                  key={index}
                  onClick={() => toggleExpand(index)}
                  className={cn(
                    "group relative bg-card border rounded-2xl overflow-hidden cursor-pointer transition-all duration-500",
                    "hover:shadow-lg hover:border-primary/30",
                    isExpanded 
                      ? "border-primary/50 shadow-lg bg-gradient-to-br from-card to-primary/5" 
                      : "border-border"
                  )}
                >
                  {/* Top accent line */}
                  <div className={cn(
                    "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
                    isExpanded 
                      ? "bg-gradient-to-r from-accent via-primary to-accent" 
                      : "bg-gradient-to-r from-transparent via-border to-transparent group-hover:via-primary/50"
                  )} />
                  
                  <div className="p-5 sm:p-6">
                    {/* Problem Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={cn(
                        "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                        isExpanded 
                          ? "bg-accent/20" 
                          : "bg-cta/10 group-hover:bg-cta/20"
                      )}>
                        {isExpanded ? (
                          <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                        ) : (
                          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cta" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={cn(
                          "font-medium text-sm sm:text-base transition-colors duration-300",
                          isExpanded ? "text-primary" : "text-foreground"
                        )}>
                          {point.problem}
                        </h3>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                        isExpanded && "rotate-180 text-primary"
                      )} />
                    </div>
                    
                    {/* Solution (expandable) */}
                    <div className={cn(
                      "overflow-hidden transition-all duration-500",
                      isExpanded ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                    )}>
                      <div className="flex items-start gap-3 pl-0 sm:pl-1">
                        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                          {point.solution}
                        </p>
                      </div>
                    </div>
                    
                    {/* Collapsed hint */}
                    <div className={cn(
                      "text-xs text-muted-foreground mt-2 transition-opacity duration-300",
                      isExpanded ? "opacity-0 h-0" : "opacity-100"
                    )}>
                      <span className="hidden sm:inline">Klicken für Lösung</span>
                      <span className="sm:hidden">Tippen für Lösung</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom confidence statement */}
          <div className="mt-8 lg:mt-12 text-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/5 border border-primary/20 rounded-full px-4 sm:px-6 py-2.5 sm:py-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span className="text-sm sm:text-base font-medium text-primary">
                Wir haben für jedes Problem eine Lösung
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
