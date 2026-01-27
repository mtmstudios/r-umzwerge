import { useRef, useState, useEffect } from 'react';
import { Phone, Camera, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { SEAData } from '@/lib/seaData';

interface SEAMidCTAProps {
  data: SEAData;
}

export function SEAMidCTA({ data }: SEAMidCTAProps) {
  const isGentle = data.tone === 'gentle';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic process steps based on tone
  const processSteps = isGentle
    ? [
        { num: '1', label: 'Kontakt aufnehmen', icon: MessageCircle },
        { num: '2', label: 'Gemeinsam besprechen', icon: MessageCircle },
        { num: '3', label: 'Termin nach Wunsch', icon: Calendar },
      ]
    : [
        { num: '1', label: 'Foto senden', icon: Camera },
        { num: '2', label: 'Einschätzung erhalten', icon: MessageCircle },
        { num: '3', label: 'Besenrein übergeben', icon: Sparkles },
      ];

  // Dynamic CTA text
  const ctaText = isGentle
    ? { long: 'Unverbindlich schreiben', short: 'Schreiben' }
    : { long: 'Foto senden · Preis erhalten', short: 'Foto senden' };

  // Intersection Observer for staggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center mb-8 lg:mb-10">
            So einfach geht's
          </h2>

          {/* Process Cards */}
          <div 
            ref={sectionRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-10"
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className={cn(
                    "relative bg-card rounded-2xl p-6 text-center",
                    "border border-border shadow-sm",
                    "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
                    "opacity-0 translate-y-4",
                    isVisible && "opacity-100 translate-y-0"
                  )}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                    transitionDuration: '500ms',
                  }}
                >
                  {/* Number Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
                    {step.num}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 mt-2 rounded-xl bg-secondary/50 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  
                  {/* Label */}
                  <p className="font-semibold text-foreground">{step.label}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Centered */}
          <div className="text-center space-y-4">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-14 px-8 text-base btn-lift shadow-whatsapp"
              data-track="cta-whatsapp-mid"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                <span className="hidden sm:inline">{ctaText.long}</span>
                <span className="sm:hidden">{ctaText.short}</span>
              </a>
            </Button>

            {/* Secondary: Text link for calling */}
            <div>
              <a 
                href={PHONE_LINK}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base font-medium"
                data-track="cta-phone-mid"
              >
                <Phone className="h-4 w-4" />
                Lieber anrufen?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
