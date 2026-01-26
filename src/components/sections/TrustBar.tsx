import { ShieldCheck, Clock, BadgeCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { Marquee } from '@/components/ui/Marquee';
import { cn } from '@/lib/utils';

const trustItems = [
  { icon: ShieldCheck, text: "Keine versteckten Kosten", color: 'text-accent' },
  { icon: Clock, text: "Preiseinschätzung < 24h", color: 'text-cta' },
  { icon: BadgeCheck, text: "Festpreis nach Einschätzung", color: 'text-accent' },
  { icon: HeartHandshake, text: "Diskret & respektvoll", color: 'text-cta' },
  { icon: Sparkles, text: "Besenrein", color: 'text-accent' },
];

export function TrustBar() {
  return (
    <section className="bg-primary py-4 lg:py-5 overflow-hidden">
      <Marquee speed="normal" pauseOnHover>
        {trustItems.map(({ icon: Icon, text, color }, index) => (
          <div
            key={text}
            className={cn(
              "flex items-center gap-3 px-8 lg:px-12",
              index < trustItems.length - 1 && "border-r border-primary-foreground/20"
            )}
          >
            <Icon className={cn("h-5 w-5 flex-shrink-0", color)} />
            <span className="text-sm font-medium text-primary-foreground whitespace-nowrap">
              {text}
            </span>
          </div>
        ))}
        {/* Separator dot */}
        <div className="px-8">
          <span className="text-accent text-lg">•</span>
        </div>
      </Marquee>
    </section>
  );
}
