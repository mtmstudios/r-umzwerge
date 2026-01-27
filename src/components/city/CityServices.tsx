import { ArrowRight, Home, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import type { CityService } from '@/lib/cityData';

interface CityServicesProps {
  cityName: string;
  services: {
    entruempelung: CityService;
    haushaltsaufloesung: CityService;
    messie: CityService;
  };
}

export function CityServices({ cityName, services }: CityServicesProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  const serviceCards = [
    {
      icon: Home,
      ...services.entruempelung,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Heart,
      ...services.haushaltsaufloesung,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: ShieldCheck,
      ...services.messie,
      color: "text-cta",
      bgColor: "bg-cta/10",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="text-center mb-16">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
              Leistungen
            </span>
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Unsere Leistungen in {cityName}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professionelle Entrümpelung, Haushaltsauflösung und diskrete Messie-Hilfe – alles aus einer Hand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {serviceCards.map((service, index) => (
              <Link
                key={service.h2}
                to={service.link}
                className={cn(
                  "group p-6 lg:p-8 rounded-2xl border border-border bg-card",
                  "transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6", service.bgColor)}>
                  <service.icon className={cn("w-7 h-7", service.color)} />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.h2}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center text-primary font-medium">
                  Mehr erfahren
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
