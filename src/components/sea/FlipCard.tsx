import { useState } from 'react';
import { ArrowRight, Heart, Clock, Shield, Home, AlertCircle, Feather, MousePointerClick } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { cn } from '@/lib/utils';
import { getWhatsAppLink } from '@/lib/constants';

// Icon-Mapping basierend auf Problemtext-Keywords
const getIconForProblem = (problem: string) => {
  const text = problem.toLowerCase();
  if (text.includes('verstorben') || text.includes('tod') || text.includes('trauer')) {
    return { icon: Feather, label: 'Trauerfall' };
  }
  if (text.includes('pflege') || text.includes('heim') || text.includes('umzug')) {
    return { icon: Home, label: 'Pflegeheim' };
  }
  if (text.includes('zeit') || text.includes('schnell') || text.includes('dringend')) {
    return { icon: Clock, label: 'Zeitdruck' };
  }
  if (text.includes('diskret') || text.includes('messie') || text.includes('scham')) {
    return { icon: Shield, label: 'Diskret' };
  }
  if (text.includes('überfordert') || text.includes('allein') || text.includes('weiß nicht')) {
    return { icon: AlertCircle, label: 'Überforderung' };
  }
  return { icon: Heart, label: 'Persönlich' };
};

interface FlipCardProps {
  problem: string;
  solution: string;
  index: number;
  isGentle: boolean;
  isMobile: boolean;
  isVisible: boolean;
}

export function FlipCard({ problem, solution, index, isGentle, isMobile, isVisible }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { icon: IconComponent, label } = getIconForProblem(problem);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // WhatsApp-Nachricht
  const getWhatsAppMessage = () => {
    return isGentle 
      ? 'Hallo Räumzwerge, ich brauche diskret Hilfe. Ort: ____. Ich sende gleich Fotos.'
      : 'Hallo Räumzwerge, ich hätte gerne eine Preiseinschätzung. Ort: ____. Ich sende gleich Fotos.';
  };

  return (
    <div
      className={cn(
        "flip-card cursor-pointer rounded-2xl h-[320px] sm:h-[280px]",
        "transition-all duration-500",
        isFlipped && "flipped",
        !isMobile && "opacity-0 translate-y-6",
        !isMobile && isVisible && "opacity-100 translate-y-0"
      )}
      style={!isMobile ? {
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
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
      <div className="flip-card-inner w-full h-full">
        {/* === VORDERSEITE (Problem) === */}
        <div className={cn(
          "flip-card-front flex flex-col overflow-hidden",
          "bg-gradient-to-br from-muted to-muted/70",
          "border border-border/40"
        )}>
          {/* Nummer Badge + Gradient Line */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-3">
            <div className={cn(
              "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
              "text-sm font-bold",
              "bg-gradient-to-br from-cta to-cta-hover text-cta-foreground",
              "shadow-lg shadow-cta/30"
            )}>
              {index + 1}
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-cta/60 via-cta/30 to-transparent rounded-full" />
          </div>

          {/* Icon Badge */}
          <div className="flex items-center gap-2 px-5 mb-3">
            <div className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center",
              "bg-destructive/10 text-destructive"
            )}>
              <IconComponent className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {label}
            </span>
          </div>

          {/* Problem-Zitat mit Akzent-Border */}
          <div className={cn(
            "flex-1 mx-5 mb-4 px-4 py-3",
            "border-l-[3px] border-destructive/50",
            "bg-background/40 rounded-r-lg"
          )}>
            <blockquote className="text-base lg:text-lg text-foreground/90 italic leading-relaxed">
              „{problem}"
            </blockquote>
          </div>

          {/* Tap Hinweis */}
          <div className={cn(
            "flex items-center justify-center gap-2 pb-5 px-5",
            "text-sm text-muted-foreground"
          )}>
            <MousePointerClick className="h-4 w-4 animate-pulse" />
            <span className="font-medium">
              {isMobile ? 'Antippen für Lösung' : 'Klicken für Lösung'}
            </span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* === RÜCKSEITE (Lösung) === */}
        <div className={cn(
          "flip-card-back flex flex-col overflow-hidden",
          "bg-gradient-to-br from-accent/15 via-primary/10 to-accent/5",
          "border border-accent/30"
        )}>
          {/* Nummer Badge */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-3">
            <div className={cn(
              "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
              "text-sm font-bold",
              "bg-gradient-to-br from-accent to-primary text-primary-foreground",
              "shadow-lg shadow-accent/30"
            )}>
              {index + 1}
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-accent/60 via-accent/30 to-transparent rounded-full" />
          </div>

          {/* Lösung Header mit Checkmark */}
          <div className="flex items-center gap-3 px-5 mb-3">
            <div className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center",
              "bg-accent/20 text-accent"
            )}>
              <svg 
                className="w-7 h-7" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5 13l4 4L19 7" 
                  className="animate-[draw-check_0.4s_ease-out_0.3s_forwards]"
                  style={{ 
                    strokeDasharray: 24,
                    strokeDashoffset: 24
                  }}
                />
              </svg>
            </div>
            <span className={cn(
              "text-base font-bold",
              isGentle ? "text-primary" : "text-accent"
            )}>
              Unsere Lösung
            </span>
          </div>

          {/* Lösungs-Text mit Akzent-Border */}
          <div className={cn(
            "flex-1 mx-5 mb-3 px-4 py-3",
            "border-l-[3px] border-accent",
            "bg-card/60 rounded-r-lg"
          )}>
            <p className="text-base text-foreground font-medium leading-relaxed">
              {solution}
            </p>
          </div>

          {/* Mini WhatsApp CTA */}
          <div className="px-5 pb-5">
            <a
              href={getWhatsAppLink(getWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                className={cn(
                  "w-full gap-2 py-5 text-sm font-semibold rounded-xl",
                  "bg-whatsapp text-whatsapp-foreground",
                  "hover:bg-whatsapp-hover",
                  "shadow-md shadow-whatsapp/20 hover:shadow-lg hover:shadow-whatsapp/30",
                  "transition-all duration-300"
                )}
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{isGentle ? 'Unverbindlich anfragen' : 'Jetzt anfragen'}</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
