import { Camera, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink } from '@/lib/constants';
import { useAnimatedCounter, useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

const steps = [
  {
    number: 1,
    icon: Camera,
    title: "Foto senden (WhatsApp)",
    description: "Ein paar Fotos + Ort reichen für eine erste Einschätzung.",
  },
  {
    number: 2,
    icon: Clock,
    title: "Preiseinschätzung innerhalb von 24 Stunden",
    description: "Transparent & nachvollziehbar. Festpreis nach Einschätzung möglich.",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Wir räumen – besenrein",
    description: "Pünktlich, sauber, fachgerecht entsorgt.",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, count, isVisible } = useAnimatedCounter(step.number);
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "relative bg-card rounded-2xl p-6 lg:p-8 border border-border card-hover",
        "scroll-reveal",
        isVisible && "visible"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Step Number */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
          <span className={cn(
            "text-2xl font-bold text-primary-foreground",
            isVisible && "count-animate"
          )}>
            {count}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {step.title}
          </h3>
        </div>
      </div>
      
      <p className="text-muted-foreground leading-relaxed">
        {step.description}
      </p>

      {/* Connecting line for desktop */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-8 w-16 border-t-2 border-dashed border-border" />
      )}
    </div>
  );
}

export function ProcessSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="ablauf" className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "text-center mb-12",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h2 className="text-section-mobile lg:text-section text-foreground mb-4">
            In 3 Schritten zum freien Raum
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 px-8 btn-lift shadow-whatsapp"
          >
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5" />
              Jetzt Foto senden
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Diskret, respektvoll und ohne Überraschungen.
          </p>
        </div>
      </div>
    </section>
  );
}
