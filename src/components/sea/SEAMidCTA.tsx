import { useRef, useState, useEffect } from 'react';
import { Phone, ClipboardList, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';
import type { SEAData } from '@/lib/seaData';

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
        { num: '1', label: 'Kontakt aufnehmen', sublabel: 'Per Telefon oder Formular', icon: MessageCircle },
        { num: '2', label: 'Gemeinsam besprechen', sublabel: 'Wir hören zu – ohne Druck', icon: MessageCircle },
        { num: '3', label: 'Wir räumen für Sie', sublabel: 'Diskret und besenrein', icon: Sparkles },
      ]
    : [
        { num: '1', label: 'Anfrage stellen', sublabel: 'Kostenloses Angebot berechnen', icon: ClipboardList },
        { num: '2', label: 'Festpreis in 24h', sublabel: 'Transparent & verbindlich', icon: MessageCircle },
        { num: '3', label: 'Besenrein übergeben', sublabel: 'Wir räumen komplett', icon: Sparkles },
      ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-14 lg:py-24 bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-12 lg:mb-16">
            So einfach geht's – in 3 Schritten
          </h2>

          <div ref={sectionRef} className="relative">
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
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cta to-cta-hover text-cta-foreground flex items-center justify-center font-bold text-xl shadow-lg shadow-cta/30">
                          {step.num}
                        </div>
                      </div>
                      
                      <div className="w-18 h-18 mx-auto mb-5 mt-5 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center shadow-inner" style={{ width: '4.5rem', height: '4.5rem' }}>
                        <Icon className="h-9 w-9 text-primary" />
                      </div>
                      
                      <p className="font-bold text-foreground text-xl mb-1">{step.label}</p>
                      <p className="text-muted-foreground text-base">{step.sublabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dual-CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12 lg:mt-16">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="gap-3 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-2xl shadow-lg shadow-cta/25 transition-all duration-200 w-full sm:w-auto"
              data-track="cta-funnel-mid"
            >
              <ClipboardList className="h-6 w-6" />
              Kostenloses Angebot berechnen
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 h-14 md:h-16 px-8 text-base md:text-lg bg-card hover:bg-secondary text-primary border-2 border-primary/30 font-semibold rounded-2xl transition-all duration-200 w-full sm:w-auto"
              data-track="cta-phone-mid"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5" />
                Jetzt anrufen
              </a>
            </Button>
          </div>
        </div>
      </div>

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
