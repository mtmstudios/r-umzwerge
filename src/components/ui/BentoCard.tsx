import { cn } from '@/lib/utils';
import { 
  LucideIcon, ArrowRight, Sparkles, BadgeCheck, Clock, Coins, Heart, 
  Package, DoorOpen, Trash2, CalendarCheck, Moon, FileX, 
  Calendar, Truck, EyeOff, Users, Check
} from 'lucide-react';

const getHighlightIcon = (text: string): LucideIcon => {
  const lower = text.toLowerCase();
  if (lower.includes('besenrein')) return Sparkles;
  if (lower.includes('festpreis')) return BadgeCheck;
  if (lower.includes('24h') || lower.includes('antwort')) return Clock;
  if (lower.includes('wertanrechnung') || lower.includes('angerechnet')) return Coins;
  if (lower.includes('respekt')) return Heart;
  if (lower.includes('komplett')) return Package;
  if (lower.includes('zugang') || lower.includes('enge')) return DoorOpen;
  if (lower.includes('entsorgung')) return Trash2;
  if (lower.includes('kurzfristig')) return CalendarCheck;
  if (lower.includes('geschäftszeit')) return Moon;
  if (lower.includes('dokument')) return FileX;
  if (lower.includes('termin')) return Calendar;
  if (lower.includes('fahrzeug') || lower.includes('neutral')) return Truck;
  if (lower.includes('diskret')) return EyeOff;
  if (lower.includes('team') || lower.includes('geschult')) return Users;
  return Check;
};

interface BentoCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  highlights?: string[];
  icon: LucideIcon;
  href: string;
  variant?: 'default' | 'glass' | 'accent';
  size?: 'default' | 'large';
  featured?: boolean;
  className?: string;
  index?: number;
}

export function BentoCard({
  title,
  subtitle,
  description,
  highlights,
  icon: Icon,
  href,
  variant = 'default',
  size = 'default',
  featured = false,
  className,
  index = 0,
}: BentoCardProps) {
  const isLarge = size === 'large';

  return (
    <a
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500',
        'flex flex-col items-center text-center',
        'hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]',
        // Size variants
        isLarge 
          ? 'p-6 sm:p-8 min-h-[180px] sm:min-h-[200px]' 
          : 'p-4 sm:p-5 min-h-[140px] sm:min-h-[160px]',
        // Style variants
        variant === 'default' && 'bg-card border border-border hover:border-accent/50 hover:shadow-medium',
        variant === 'glass' && 'glass hover:shadow-lg',
        variant === 'accent' && 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-xl',
        className
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Featured Badge */}
      {featured && (
        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-accent/20 text-accent text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm border border-accent/30">
          ⭐ Kernkompetenz
        </span>
      )}

      {/* Glow effect on hover - orange accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cta/10 via-transparent to-accent/5" />
      </div>

      {/* Icon */}
      <div
        className={cn(
          'relative rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto transition-all duration-300',
          'group-hover:scale-110 group-hover:rotate-3',
          isLarge ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-10 h-10 sm:w-12 sm:h-12',
          variant === 'accent'
            ? 'bg-accent/20'
            : 'bg-accent/10 group-hover:bg-accent/20'
        )}
      >
        <Icon
          className={cn(
            'transition-colors duration-300',
            isLarge ? 'h-7 w-7 sm:h-8 sm:w-8' : 'h-5 w-5 sm:h-6 sm:w-6',
            variant === 'accent' ? 'text-accent' : 'text-primary'
          )}
        />
      </div>

      {/* Content */}
      <div className="relative space-y-1 sm:space-y-1.5 text-center">
        <h3
          className={cn(
            'font-semibold',
            isLarge ? 'text-base sm:text-lg' : 'text-sm sm:text-base',
            variant === 'accent' ? 'text-primary-foreground' : 'text-foreground'
          )}
        >
          {title}
        </h3>

        {subtitle && (
          <p
            className={cn(
              'text-xs sm:text-sm',
              variant === 'accent' ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}
          >
            {subtitle}
          </p>
        )}

        {description && (
          <p
            className={cn(
              'leading-relaxed',
              isLarge ? 'text-sm' : 'text-xs sm:text-sm',
              variant === 'accent' ? 'text-primary-foreground/80' : 'text-muted-foreground'
            )}
          >
            {description}
          </p>
        )}

        {/* Highlights with icons */}
        {highlights && highlights.length > 0 && (
          <div className={cn(
            "flex flex-wrap justify-center mt-3",
            isLarge ? "gap-3" : "gap-2"
          )}>
            {highlights.slice(0, isLarge ? 3 : 2).map((highlight, i) => {
              const HighlightIcon = getHighlightIcon(highlight);
              return (
                <span
                  key={i}
                  className={cn(
                    "inline-flex items-center gap-1 text-xs",
                    variant === 'accent' ? "text-primary-foreground/70" : "text-muted-foreground/80"
                  )}
                >
                  <HighlightIcon className="h-3 w-3 text-accent flex-shrink-0" />
                  <span className="truncate max-w-[100px]">{highlight}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Arrow indicator */}
      <div
        className={cn(
          'absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 font-medium transition-all duration-300',
          'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
          isLarge ? 'text-sm' : 'text-xs sm:text-sm',
          variant === 'accent' ? 'text-accent' : 'text-primary'
        )}
      >
        <span>Details</span>
        <ArrowRight className={cn(isLarge ? 'h-4 w-4' : 'h-3.5 w-3.5')} />
      </div>
    </a>
  );
}
