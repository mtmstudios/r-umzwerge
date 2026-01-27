import { MapPin, ArrowRight } from 'lucide-react';
import { REGIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function CityList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {REGIONS.map((region) => {
        const isHQ = region.isHQ;

        return (
          <a
            key={region.slug}
            href={`/region/${region.slug}`}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border transition-all duration-200",
              "group cursor-pointer",
              "bg-card border-border hover:bg-primary/5 hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-3">
              <MapPin
                className={cn(
                  "w-5 h-5 transition-colors duration-200",
                  isHQ ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )}
              />
              <span className="font-medium text-foreground">
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
                "text-muted-foreground -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary"
              )}
            />
          </a>
        );
      })}
    </div>
  );
}
