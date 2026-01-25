import { ShieldCheck, Clock, BadgeCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

const trustItems = [
  { icon: ShieldCheck, text: "Keine versteckten Kosten" },
  { icon: Clock, text: "Preiseinschätzung < 24h" },
  { icon: BadgeCheck, text: "Festpreis nach Einschätzung" },
  { icon: HeartHandshake, text: "Diskret & respektvoll" },
  { icon: Sparkles, text: "Besenrein" },
];

export function TrustBar() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="bg-primary py-6 lg:py-8">
      <div
        ref={ref}
        className={cn(
          "container-custom",
          "scroll-reveal",
          isVisible && "visible"
        )}
      >
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 lg:gap-x-12">
          {trustItems.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-primary-foreground"
            >
              <Icon className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
