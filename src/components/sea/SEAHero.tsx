import { useState } from 'react';
import { CheckCircle, Phone, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import { seaImages } from '@/lib/seaImages';
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';
import type { SEAData } from '@/lib/seaData';

interface SEAHeroProps {
  data: SEAData;
}

const trustChecks = [
  'Festpreisgarantie',
  'Keine versteckten Kosten',
  '100% Besenrein',
  'Diskret & Respektvoll',
];

export function SEAHero({ data }: SEAHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={seaImages.heroTeam}
          alt="Räumzwerge-Team beim professionellen Beladen des Transporters"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
      </div>

      <div className="container-custom relative">
        <div className="min-h-[92vh] md:min-h-[82vh] xl:min-h-[78vh] flex flex-col justify-center items-center text-center px-4 py-16 md:py-20 xl:py-24 pt-28 lg:pt-32 relative">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 mb-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-white/90">Noch diese Woche Termine frei</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-white mb-4 md:mb-5 text-balance leading-[1.1] max-w-4xl tracking-tight">
            {data.headline}
          </h1>
          
          <p className="text-lg md:text-xl xl:text-2xl text-white/95 mb-8 md:mb-10 max-w-2xl font-medium leading-relaxed">
            {data.subline}
          </p>

          {/* Dual-CTA: Phone (Primary) + Funnel (Secondary) */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto sm:justify-center">
            <Button
              asChild
              size="lg"
              className="gap-3 h-14 md:h-16 xl:h-[4.5rem] px-6 md:px-10 text-base md:text-lg xl:text-xl bg-cta hover:bg-cta-hover text-cta-foreground shadow-2xl shadow-cta/40 font-bold rounded-2xl transition-all duration-200"
              data-track="cta-phone-hero"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0" />
                <span>Jetzt anrufen</span>
              </a>
            </Button>
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 h-14 md:h-16 xl:h-[4.5rem] px-6 md:px-8 text-base md:text-lg bg-white/15 hover:bg-white/25 text-white border-2 border-white/30 backdrop-blur-sm font-semibold rounded-2xl transition-all duration-200"
              data-track="cta-funnel-hero"
            >
              <ClipboardList className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0" />
              <span>Angebot anfordern</span>
            </Button>
          </div>

          {/* Trust Checks */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 xl:gap-x-7">
            {trustChecks.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm md:text-base xl:text-lg text-white/95 font-medium"
              >
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-accent flex-shrink-0" />
                {item}
              </div>
            ))}
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
