import { useState } from 'react';
import { CheckCircle, Phone, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { serviceImages } from '@/lib/serviceImages';
import { ContactFunnelModal } from '@/components/contact/ContactFunnelModal';

interface CityHeroProps {
  h1: string;
  subline: string;
  trustPills: string[];
  imageAlt: string;
}

export function CityHero({ h1, subline, trustPills, imageAlt }: CityHeroProps) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={serviceImages.heroTeamRaeumzwerge}
          alt={imageAlt}
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      <div className="container-custom relative">
        <div
          className={cn(
            "min-h-[90vh] md:min-h-[80vh] xl:min-h-[75vh] flex flex-col justify-center items-center text-center px-4 py-16 md:py-20 xl:py-24 pt-28 lg:pt-32",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h1 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-4 md:mb-6 text-balance leading-tight max-w-4xl">
            {h1}
          </h1>
          
          <p className="text-base md:text-lg xl:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
            {subline}
          </p>

          {/* Dual-CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full sm:w-auto sm:justify-center">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 bg-cta hover:bg-cta-hover text-cta-foreground text-sm md:text-base xl:text-lg h-12 md:h-14 xl:h-16 px-4 md:px-6 xl:px-8 btn-lift"
            >
              <ClipboardList className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0" />
              <span>📋 Angebot berechnen</span>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 h-12 md:h-14 xl:h-16 px-4 md:px-6 xl:px-8 text-sm md:text-base xl:text-lg bg-white/15 hover:bg-white/25 text-white border-2 border-white/30 backdrop-blur-sm"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0" />
                <span>📞 Jetzt anrufen</span>
              </a>
            </Button>
          </div>

          <p className="text-sm xl:text-base text-white/70 mb-6">
            Unverbindlich. Keine versteckten Kosten.
          </p>

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
