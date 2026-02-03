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
        'group relative overflow-hidden rounded-xl sm:rounded-2xl',
        'flex flex-col items-center text-center',
        'transition-all duration-300 ease-out',
        'lg:hover:scale-[1.03] lg:hover:-translate-y-2 active:scale-[0.98]',
        // Size variants - increased min-height for tablet text
        isLarge 
          ? 'p-5 sm:p-6 md:p-8 min-h-[220px] sm:min-h-[240px] md:min-h-[260px]' 
          : 'p-4 sm:p-5 min-h-[180px] sm:min-h-[200px] md:min-h-[220px]',
        // Style variants with enhanced shadows (hover only on desktop)
        variant === 'default' && 'bg-card border border-border lg:hover:border-accent/60 lg:hover:shadow-[0_20px_50px_-15px_hsl(var(--accent)/0.2)]',
        variant === 'glass' && 'glass lg:hover:shadow-[0_20px_50px_-15px_hsl(var(--accent)/0.25)]',
        variant === 'accent' && 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground lg:hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.4)]',
        className
      )}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Featured Badge */}
      {featured && (
        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-accent/20 text-accent text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm border border-accent/30">
          ⭐ Kernkompetenz
        </span>
      )}

      {/* Glow effect on hover - animated gradient (desktop only) */}
      <div className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cta/10 via-accent/5 to-transparent animate-pulse-subtle" />
        <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Icon with enhanced animation (desktop only) */}
      <div
        className={cn(
          'relative rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto',
          'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          'lg:group-hover:scale-115 lg:group-hover:rotate-3',
          isLarge ? 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16' : 'w-10 h-10 sm:w-12 sm:h-12',
          variant === 'accent'
            ? 'bg-accent/20 lg:group-hover:bg-accent/30'
            : 'bg-accent/10 lg:group-hover:bg-accent/25 lg:group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)]'
        )}
      >
        <Icon
          className={cn(
            'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            'lg:group-hover:scale-110',
            isLarge ? 'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8' : 'h-5 w-5 sm:h-6 sm:w-6',
            variant === 'accent' ? 'text-accent' : 'text-primary lg:group-hover:text-accent'
          )}
        />
      </div>

      {/* Content */}
      <div className="relative space-y-1 sm:space-y-1.5 text-center flex-1">
        <h3
          className={cn(
            'font-semibold',
            isLarge ? 'text-sm sm:text-base md:text-lg' : 'text-sm sm:text-base',
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
              isLarge ? 'text-xs sm:text-sm' : 'text-xs sm:text-sm',
              variant === 'accent' ? 'text-primary-foreground/80' : 'text-muted-foreground'
            )}
          >
            {description}
          </p>
        )}

        {/* Highlights with icons */}
        {highlights && highlights.length > 0 && (
          <div className={cn(
            "flex flex-wrap justify-center mt-2 sm:mt-3",
            isLarge ? "gap-2 sm:gap-3" : "gap-1.5 sm:gap-2"
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
                  <span className="whitespace-nowrap">{highlight}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* "Zur Lösung" Link - visible on mobile/tablet, hover on desktop */}
      <div
        className={cn(
          'mt-4 flex items-center gap-1.5 font-medium text-sm',
          'transition-all duration-300 ease-out',
          'opacity-100 lg:opacity-0 lg:group-hover:opacity-100',
          variant === 'accent' ? 'text-accent' : 'text-primary'
        )}
      >
        <span>Zur Lösung</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 lg:group-hover:translate-x-1" />
      </div>
    </a>
  );
}
