import { useRef, useState, useEffect } from 'react';
import { Phone, Camera, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
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

  const processSteps = isGentle
    ? [
        { num: '1', label: 'Kontakt aufnehmen', sublabel: 'Per WhatsApp oder Telefon', icon: MessageCircle },
        { num: '2', label: 'Gemeinsam besprechen', sublabel: 'Wir hören zu – ohne Druck', icon: MessageCircle },
        { num: '3', label: 'Wir räumen für Sie', sublabel: 'Diskret und besenrein', icon: Sparkles },
      ]
    : [
        { num: '1', label: 'Fotos senden', sublabel: '3–6 Fotos per WhatsApp', icon: Camera },
        { num: '2', label: 'Festpreis in 24h', sublabel: 'Transparent & verbindlich', icon: MessageCircle },
        { num: '3', label: 'Besenrein übergeben', sublabel: 'Wir räumen komplett', icon: Sparkles },
      ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-14 lg:py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-12 lg:mb-16">
            So einfach geht's – in 3 Schritten
          </h2>

          {/* Process Steps */}
          <div ref={sectionRef} className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden sm:block absolute top-20 left-[15%] right-[15%] h-1 bg-gradient-to-r from-primary/20 via-cta/40 to-primary/20 rounded-full" />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className={cn(
                      "relative opacity-0 translate-y-6",
                      isVisible && "opacity-100 translate-y-0"
                    )}
                    style={{
                      transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                      transitionProperty: 'opacity, transform',
                      transitionDuration: '600ms',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div className="glass card-glow rounded-2xl p-7 lg:p-9 text-center border border-border/30">
                      {/* Number Badge */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cta to-cta-hover text-cta-foreground flex items-center justify-center font-bold text-xl shadow-lg shadow-cta/30">
                          {step.num}
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className="w-18 h-18 mx-auto mb-5 mt-5 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center shadow-inner" style={{ width: '4.5rem', height: '4.5rem' }}>
                        <Icon className="h-9 w-9 text-primary" />
                      </div>
                      
                      {/* Label */}
                      <p className="font-bold text-foreground text-xl mb-1">{step.label}</p>
                      <p className="text-muted-foreground text-base">{step.sublabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secondary WhatsApp CTA below process */}
          <div className="flex flex-col items-center mt-12 lg:mt-16">
            <Button
              asChild
              size="lg"
              className="gap-3 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold rounded-2xl shadow-lg shadow-whatsapp/25 transition-all duration-200"
              data-track="cta-whatsapp-process"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-6 w-6" />
                <span>📸 Fotos senden & Preis erhalten</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <p className="text-muted-foreground text-base mt-3">Antwort innerhalb von 24 Stunden</p>
            
            {/* Secondary phone link */}
            <a 
              href={PHONE_LINK}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-base font-medium mt-3"
              data-track="cta-phone-mid"
            >
              <Phone className="h-4 w-4" />
              Lieber anrufen?
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic Funnel */}
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
