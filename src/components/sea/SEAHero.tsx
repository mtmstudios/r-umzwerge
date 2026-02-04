import { useState } from 'react';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink } from '@/lib/constants';
import { seaImages } from '@/lib/seaImages';
import { ContactFunnelModal } from '@/components/contact/ContactFunnelModal';
import type { SEAData } from '@/lib/seaData';

interface SEAHeroProps {
  data: SEAData;
}

export function SEAHero({ data }: SEAHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isGentle = data.tone === 'gentle';

  // Dynamic CTA text based on tone
  const getModalCTAText = () => {
    if (isGentle) return { long: 'Unverbindlich anfragen', short: 'Anfragen' };
    return { long: 'Jetzt Anfrage starten', short: 'Anfrage starten' };
  };

  const getWhatsAppCTAText = () => {
    if (isGentle) return { long: 'Diskret schreiben', short: 'Schreiben' };
    return { long: 'Foto senden · Preis erhalten', short: 'WhatsApp' };
  };

  const modalCta = getModalCTAText();
  const whatsappCta = getWhatsAppCTAText();

  return (
    <section className="relative overflow-hidden">
      {/* Fullscreen background for ALL breakpoints */}
      <div className="absolute inset-0">
        <img 
          src={seaImages.heroTeam}
          alt="Räumzwerge-Team beim professionellen Beladen des Transporters"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      <div className="container-custom relative">
        {/* Unified Layout: Fullscreen with centered content for ALL breakpoints */}
        <div className="min-h-[85vh] md:min-h-[75vh] xl:min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-16 md:py-20 xl:py-24 pt-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-4 md:mb-6 text-balance leading-tight max-w-4xl">
            {data.headline}
          </h1>
          
          <p className="text-base md:text-lg xl:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
            {data.subline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto sm:justify-center">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 bg-cta hover:bg-cta-hover text-cta-foreground text-sm md:text-base xl:text-lg h-12 md:h-14 xl:h-16 px-4 md:px-6 xl:px-8 btn-lift"
              data-track="cta-funnel-hero"
            >
              <MessageSquare className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0" />
              <span className="hidden sm:inline">{modalCta.long}</span>
              <span className="sm:hidden">{modalCta.short}</span>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 h-12 md:h-14 xl:h-16 px-4 md:px-6 xl:px-8 text-sm md:text-base xl:text-lg bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground border-0 shadow-whatsapp"
              data-track="cta-whatsapp-hero"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0" />
                <span className="hidden sm:inline">{whatsappCta.long}</span>
                <span className="sm:hidden">{whatsappCta.short}</span>
              </a>
            </Button>
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center gap-2 xl:gap-3">
            {data.trustPills.map((pill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 xl:px-4 xl:py-2 bg-white/15 backdrop-blur-sm rounded-full text-xs xl:text-sm font-medium text-white border border-white/10"
              >
                <CheckCircle className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-accent" />
                {pill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactFunnelModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
