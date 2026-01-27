import { MapPin, ArrowRight } from 'lucide-react';
import { REGIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CityListProps {
  activeCity?: string | null;
  onCityHover?: (slug: string | null) => void;
}

export function CityList({ activeCity, onCityHover }: CityListProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {REGIONS.map((region) => {
        const isActive = activeCity === region.slug;
        const isHQ = region.isHQ;

        return (
          <a
            key={region.slug}
            href={`/region/${region.slug}`}
            onMouseEnter={() => onCityHover?.(region.slug)}
            onMouseLeave={() => onCityHover?.(null)}
            className={cn(
              "flex items-center justify-between p-3 md:p-3.5 rounded-lg border transition-all duration-200",
              "group cursor-pointer",
              isActive
                ? "bg-primary/10 border-primary shadow-sm"
                : "bg-card border-border hover:bg-primary/5 hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-3">
              <MapPin
                className={cn(
                  "w-5 h-5 transition-colors duration-200",
                  isActive || isHQ ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )}
              />
              <span
                className={cn(
                  "font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-foreground"
                )}
              >
                {region.name}
              </span>
              {isHQ && (
                <Badge variant="default" className="text-xs">
                  Hauptsitz
                </Badge>
              )}
            </div>
            <ArrowRight
              className={cn(
                "w-4 h-4 transition-all duration-200",
                isActive
                  ? "text-primary translate-x-0 opacity-100"
                  : "text-muted-foreground -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              )}
            />
          </a>
        );
      })}
    </div>
  );
}
