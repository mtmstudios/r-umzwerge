import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface BentoCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon: LucideIcon;
  href: string;
  size?: 'normal' | 'tall' | 'wide';
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
  size = 'normal',
  variant = 'default',
  className,
  index = 0,
}: BentoCardProps) {
  return (
    <a
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-500',
        'hover:scale-[1.02] hover:-translate-y-1',
        // Size variants
        size === 'tall' && 'md:row-span-2',
        size === 'wide' && 'md:col-span-2',
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
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5" />
      </div>

      {/* Icon */}
      <div
        className={cn(
          'relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300',
          'group-hover:scale-110 group-hover:rotate-3',
          variant === 'accent'
            ? 'bg-accent/20'
            : 'bg-accent/10 group-hover:bg-accent/20'
        )}
      >
        <Icon
          className={cn(
            'h-7 w-7 transition-colors duration-300',
            variant === 'accent' ? 'text-accent' : 'text-primary'
          )}
        />
      </div>

      {/* Content */}
      <div className="relative space-y-2">
        <h3
          className={cn(
            'font-semibold text-lg',
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
          'absolute bottom-6 right-6 flex items-center gap-2 text-sm font-medium transition-all duration-300',
          'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
          variant === 'accent' ? 'text-accent' : 'text-primary'
        )}
      >
        <span>Details</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </a>
  );
}
