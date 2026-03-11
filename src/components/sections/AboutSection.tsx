import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import heroTeamImage from '@/assets/hero-team.jpg';

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src={heroTeamImage}
              alt="Das Räumzwerge-Team vor einem Einsatzfahrzeug"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
              Über uns
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4 lg:mb-6">
              Wer sind die Räumzwerge?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Wir sind ein regionaler Partner aus Süddeutschland, der sich auf professionelle Entrümpelungen spezialisiert hat. Was uns antreibt? Menschen in schwierigen Situationen schnell, diskret und respektvoll zu helfen – ohne Vorurteile.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Ob Haushaltsauflösung, Wohnungsentrümpelung oder sensible Messie-Räumung: Bei uns stehen Pünktlichkeit, Transparenz und ein fairer Festpreis im Mittelpunkt. Unser geschultes Team arbeitet besenrein und behandelt jede Situation mit dem nötigen Feingefühl.
            </p>
            <p className="text-base font-medium text-foreground italic">
              – Ihr Team der Räumzwerge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
