import { useState } from 'react';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { ContactFunnelModal } from '@/components/contact/ContactFunnelModal';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import heroTeamImage from '@/assets/hero-team.jpg';

const trustPills = [
  "Antwort < 24h",
  "Festpreis nach Einschätzung möglich",
  "Besenrein & übergabefertig",
];

export function HeroSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Fullscreen background for ALL breakpoints */}
      <div className="absolute inset-0">
        <img 
          src={heroTeamImage} 
          alt="Räumzwerge-Team mit gebrandetem Transporter beim Verladen von Möbeln und Kartons vor einem Wohnhaus"
          className="w-full h-full object-cover object-[25%_center] md:object-center"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>
      
      <div className="container-custom relative">
        {/* Unified Layout: Fullscreen with centered content for ALL breakpoints */}
        <div
          className={cn(
            "min-h-[85vh] md:min-h-[75vh] xl:min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-16 md:py-20 xl:py-24",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h1 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-4 md:mb-6 text-balance leading-tight max-w-4xl">
            Entrümpelung ohne Stress – mit unseren Teams in ganz Süddeutschland.
          </h1>
          
          <p className="text-base md:text-lg xl:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
            Von Ulm aus koordinieren wir Entrümpelungen in ganz Baden-Württemberg und Bayern. Preiseinschätzung per WhatsApp-Foto – innerhalb von 24 Stunden.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full sm:w-auto sm:justify-center">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 bg-cta hover:bg-cta-hover text-cta-foreground text-sm md:text-base xl:text-lg h-12 md:h-14 xl:h-16 px-4 md:px-6 xl:px-8 btn-lift"
            >
              <MessageSquare className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0" />
              <span className="hidden sm:inline">Jetzt Anfrage starten</span>
              <span className="sm:hidden">Anfrage starten</span>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 h-12 md:h-14 xl:h-16 px-4 md:px-6 xl:px-8 text-sm md:text-base xl:text-lg bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground border-0"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0" />
                <span className="hidden sm:inline">Foto senden · Preis erhalten</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </Button>
          </div>

          <p className="text-sm xl:text-base text-white/70 mb-6">
            Unverbindlich. Keine versteckten Kosten.
          </p>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center gap-2 xl:gap-3">
            {trustPills.map((pill) => (
              <div
                key={pill}
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
