import { Heart, Clock, Shield, Home, AlertCircle, Feather, Package, Euro, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon-Mapping basierend auf Problemtext-Keywords
const getIconForProblem = (problem: string) => {
  const text = problem.toLowerCase();
  if (text.includes('verstorben') || text.includes('tod') || text.includes('trauer')) {
    return { icon: Feather, label: 'Trauerfall' };
  }
  if (text.includes('pflege') || text.includes('heim') || text.includes('umzug') || text.includes('immobilie') || text.includes('verkauft')) {
    return { icon: Home, label: 'Wohnung' };
  }
  if (text.includes('zeit') || text.includes('schnell') || text.includes('dringend')) {
    return { icon: Clock, label: 'Zeitdruck' };
  }
  if (text.includes('platz') || text.includes('voll') || text.includes('keller') || text.includes('dachboden')) {
    return { icon: Package, label: 'Platzmangel' };
  }
  if (text.includes('kostet') || text.includes('preis') || text.includes('geld') || text.includes('überraschung')) {
    return { icon: Euro, label: 'Kosten' };
  }
  if (text.includes('diskret') || text.includes('messie') || text.includes('scham') || text.includes('schäm')) {
    return { icon: Shield, label: 'Diskret' };
  }
  if (text.includes('überfordert') || text.includes('allein') || text.includes('weiß nicht') || text.includes('anfangen')) {
    return { icon: AlertCircle, label: 'Überforderung' };
  }
  return { icon: Heart, label: 'Persönlich' };
};

interface ProblemSolutionCardProps {
  problem: string;
  solution: string;
  index: number;
  isVisible: boolean;
  isMobile: boolean;
}

export function ProblemSolutionCard({ problem, solution, index, isVisible, isMobile }: ProblemSolutionCardProps) {
  const { icon: IconComponent, label } = getIconForProblem(problem);

  return (
    <div
      className={cn(
        "rounded-2xl bg-card border border-border/40 overflow-hidden",
        "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.15)]",
        "transition-all duration-500",
        !isMobile && "opacity-0 translate-y-6",
        !isMobile && isVisible && "opacity-100 translate-y-0"
      )}
      style={!isMobile ? {
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      } : undefined}
    >
      {/* Header: Number + Icon + Label */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-cta to-cta-hover text-cta-foreground shadow-lg shadow-cta/25">
          {index + 1}
        </div>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-destructive/10 text-destructive">
          <IconComponent className="h-6 w-6" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>

      {/* Problem Quote */}
      <div className="mx-5 mb-4 px-4 py-3 border-l-[3px] border-destructive/40 bg-muted/40 rounded-r-lg">
        <blockquote className="text-base lg:text-lg text-foreground/85 italic leading-relaxed">
          „{problem}"
        </blockquote>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-border/60" />

      {/* Solution */}
      <div className="mx-5 mt-4 mb-5 px-4 py-3 border-l-[3px] border-accent bg-accent/5 rounded-r-lg">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-base lg:text-lg text-foreground font-medium leading-relaxed">
            {solution}
          </p>
        </div>
      </div>
    </div>
  );
}
