import { Sparkles, ShieldCheck, Handshake } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

const benefits = [
  {
    icon: Sparkles,
    title: 'Besenreine Magie',
    description: 'Wir übergeben jedes Objekt zu 100% besenrein. Sie müssen sich um nichts mehr kümmern.',
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Diskretion',
    description: 'Wir arbeiten leise, respektvoll und auf Wunsch mit neutralen Fahrzeugen.',
  },
  {
    icon: Handshake,
    title: 'Transparenter Festpreis',
    description: 'Keine versteckten Kosten. Nach unserer Einschätzung wissen Sie genau, woran Sie sind.',
  },
];

export function GarantieSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-secondary/20">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            'text-center mb-10 md:mb-12 scroll-reveal',
            isVisible && 'visible'
          )}
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
            Unser Versprechen
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
            Das Räumzwerge-Versprechen: Fleißig, sauber, zuverlässig.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={cn(
                'group bg-card border border-border rounded-2xl p-6 lg:p-8 text-center transition-all duration-500 ease-out lg:hover:shadow-xl lg:hover:-translate-y-1 lg:hover:border-accent/40',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-5 bg-primary/10 rounded-2xl flex items-center justify-center lg:group-hover:bg-accent/20 lg:group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="h-7 w-7 text-primary lg:group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
