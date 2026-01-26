import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface BentoCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon: LucideIcon;
  href: string;
  variant?: 'default' | 'glass' | 'accent';
  className?: string;
  index?: number;
}

export function BentoCard({
  title,
  subtitle,
  description,
  icon: Icon,
  href,
  variant = 'default',
  className,
  index = 0,
}: BentoCardProps) {
  return (
    <a
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-500 min-h-[160px] sm:min-h-[180px]',
        'flex flex-col items-center text-center',
        'hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]',
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
      {/* Glow effect on hover - orange accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cta/10 via-transparent to-accent/5" />
      </div>

      {/* Icon */}
      <div
        className={cn(
          'relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto transition-all duration-300',
          'group-hover:scale-110 group-hover:rotate-3',
          variant === 'accent'
            ? 'bg-accent/20'
            : 'bg-accent/10 group-hover:bg-accent/20'
        )}
      >
        <Icon
          className={cn(
            'h-6 w-6 sm:h-7 sm:w-7 transition-colors duration-300',
            variant === 'accent' ? 'text-accent' : 'text-primary'
          )}
        />
      </div>

      {/* Content */}
      <div className="relative space-y-1.5 sm:space-y-2 text-center">
        <h3
          className={cn(
            'font-semibold text-base sm:text-lg',
            variant === 'accent' ? 'text-primary-foreground' : 'text-foreground'
          )}
        >
          {title}
        </h3>

        {subtitle && (
          <p
            className={cn(
              'text-sm',
              variant === 'accent' ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}
          >
            {subtitle}
          </p>
        )}

        {description && (
          <p
            className={cn(
              'text-sm leading-relaxed',
              variant === 'accent' ? 'text-primary-foreground/80' : 'text-muted-foreground'
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* Arrow indicator */}
      <div
        className={cn(
          'absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm font-medium transition-all duration-300',
          'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
          variant === 'accent' ? 'text-accent' : 'text-primary'
        )}
      >
        <span>Details</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </a>
  );
}
