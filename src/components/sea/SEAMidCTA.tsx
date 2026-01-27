import { Phone, Camera, MessageCircle, Calendar } from 'lucide-react';
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
        { num: '3', label: 'Termin machen', icon: Calendar },
      ];

  // Dynamic CTA text
  const ctaText = isGentle
    ? { long: 'Unverbindlich schreiben', short: 'Schreiben' }
    : { long: 'Foto senden · Preis erhalten', short: 'Foto senden' };

  return (
    <section className={cn(
      "py-12 lg:py-16",
      isGentle ? "bg-primary/90" : "bg-primary"
    )}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-8 lg:mb-10">
            So einfach geht's
          </h2>

          {/* Process Steps */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8 mb-10 lg:mb-12">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center gap-2 lg:gap-3">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20 flex items-center justify-center mb-1">
                    <Icon className="h-5 w-5 lg:h-7 lg:w-7 text-primary-foreground" />
                  </div>
                  <span className="text-2xl lg:text-3xl font-bold text-accent">{step.num}</span>
                  <span className="text-xs sm:text-sm lg:text-base text-primary-foreground/90 font-medium">
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
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
            <a 
              href={PHONE_LINK}
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm lg:text-base font-medium"
              data-track="cta-phone-mid"
            >
              <Phone className="h-4 w-4" />
              Lieber anrufen?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
