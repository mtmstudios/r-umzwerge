import { useRef, useState, useEffect } from 'react';
import { Phone, Camera, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';
import type { SEAData, SEAVariant } from '@/lib/seaData';

interface SEAMidCTAProps {
  data: SEAData;
}

export function SEAMidCTA({ data }: SEAMidCTAProps) {
  const isGentle = data.tone === 'gentle';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <section className="py-12 lg:py-20 bg-secondary/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-48 h-48 bg-cta/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center mb-10 lg:mb-14">
            So einfach geht's
          </h2>

          {/* Process Cards with Timeline */}
          <div 
            ref={sectionRef}
            className="relative"
          >
            {/* Connecting gradient line (desktop only) */}
            <div className="hidden sm:block absolute top-16 left-[15%] right-[15%] h-1 bg-gradient-to-r from-primary/20 via-cta/40 to-primary/20 rounded-full" />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className={cn(
                      "relative",
                      "opacity-0 translate-y-6",
                      isVisible && "opacity-100 translate-y-0"
                    )}
                    style={{
                      transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                      transitionProperty: 'opacity, transform',
                      transitionDuration: '600ms',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Card */}
                    <div className={cn(
                      "glass card-glow rounded-2xl p-6 lg:p-8 text-center",
                      "border border-border/30",
                      "transition-all duration-300"
                    )}>
                      {/* Number Badge with CTA glow */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="relative">
                          {/* Glow ring */}
                          <div className="absolute inset-0 w-10 h-10 rounded-full bg-cta/30 blur-md" />
                          
                          {/* Badge */}
                          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cta to-cta-hover text-cta-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-cta/30">
                            {step.num}
                          </div>
                        </div>
                      </div>
                      
                      {/* Icon with premium styling */}
                      <div className={cn(
                        "w-16 h-16 mx-auto mb-4 mt-4 rounded-2xl",
                        "bg-gradient-to-br from-secondary to-secondary/50",
                        "flex items-center justify-center",
                        "shadow-inner",
                        "icon-bounce"
                      )}>
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      
                      {/* Label */}
                      <p className="font-semibold text-foreground text-lg">{step.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTAs Centered */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className={cn(
                "gap-3 bg-cta hover:bg-cta-hover text-cta-foreground",
                "h-14 px-8 text-base",
                "btn-lift shadow-lg shadow-cta/25",
                "hover:shadow-xl hover:shadow-cta/30"
              )}
              data-track="cta-funnel-mid"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline">{isGentle ? 'Unverbindlich anfragen' : 'Jetzt Anfrage starten'}</span>
              <span className="sm:hidden">{isGentle ? 'Anfragen' : 'Anfrage starten'}</span>
            </Button>

            <Button
              asChild
              size="lg"
              className={cn(
                "gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground",
                "h-14 px-8 text-base",
                "btn-lift shadow-lg shadow-whatsapp/25"
              )}
              data-track="cta-whatsapp-mid"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                <span className="hidden sm:inline">{ctaText.long}</span>
                <span className="sm:hidden">{ctaText.short}</span>
              </a>
            </Button>
          </div>

          {/* Secondary: Text link for calling */}
          <div className="text-center mt-4">
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

      {/* Dynamic Funnel based on page slug */}
      {data.slug === 'haushaltsaufloesung' && (
        <HaushaltsaufloesungFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
      {data.slug === 'entruempelung' && (
        <EntruempelungFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
      {data.slug === 'messie-hilfe' && (
        <MessieFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </section>
  );
}
