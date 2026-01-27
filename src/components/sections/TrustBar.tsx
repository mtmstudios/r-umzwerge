import { ShieldCheck, Clock, BadgeCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { Marquee } from '@/components/ui/Marquee';
import { cn } from '@/lib/utils';

const trustItems = [
  { icon: ShieldCheck, text: "Keine versteckten Kosten" },
  { icon: Clock, text: "Preiseinschätzung < 24h" },
  { icon: BadgeCheck, text: "Festpreis nach Einschätzung" },
  { icon: HeartHandshake, text: "Diskret & respektvoll" },
  { icon: Sparkles, text: "Besenrein" },
];

export function TrustBar() {
  return (
    <section className="bg-primary py-4 lg:py-5 overflow-hidden">
      <Marquee speed="normal" pauseOnHover>
        {trustItems.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center">
            <div className="flex items-center gap-3 px-6 lg:px-8">
              <Icon className="h-5 w-5 flex-shrink-0 text-accent" />
              <span className="text-sm font-medium text-primary-foreground whitespace-nowrap">
                {text}
              </span>
            </div>
            <span className="text-accent text-lg">|</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
