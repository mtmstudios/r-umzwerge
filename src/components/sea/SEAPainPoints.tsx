import { useState, useEffect, useRef } from 'react';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile, useIsTabletOrMobile } from '@/hooks/use-mobile';
import { ProblemSolutionCard } from './ProblemSolutionCard';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';
import type { SEAData } from '@/lib/seaData';

interface SEAPainPointsProps {
  data: SEAData;
}

export function SEAPainPoints({ data }: SEAPainPointsProps) {
  const isGentle = data.tone === 'gentle';
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-14 lg:py-20 relative overflow-hidden bg-secondary/40">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {isGentle ? 'Wir verstehen, wie Sie sich fühlen' : 'Kennen Sie das?'}
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-xl mx-auto">
            {isGentle
              ? 'Sie sind nicht allein. Wir helfen – ohne Druck, ohne Wertung.'
              : 'Diese Situationen kennen wir. Und wir haben die Lösung.'}
          </p>
        </div>

        {/* Cards Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-5xl mx-auto"
        >
          {data.painPoints.map((point, index) => (
            <ProblemSolutionCard
              key={index}
              problem={point.problem}
              solution={point.solution}
              index={index}
              isVisible={isVisible}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* CTA – Orange funnel button */}
        <div className="mt-10 lg:mt-14 flex flex-col items-center">
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "gap-3 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold rounded-2xl",
              "bg-cta hover:bg-cta-hover text-cta-foreground",
              "shadow-xl shadow-cta/30 hover:shadow-2xl hover:shadow-cta/40",
              "transition-all duration-200",
              "w-full sm:w-auto",
              "animate-[pulse-subtle_2s_ease-in-out_infinite]"
            )}
            data-track="cta-funnel-painpoints"
          >
            <ClipboardList className="h-6 w-6" />
            📋 Jetzt kostenloses Angebot berechnen
          </Button>
          <p className="text-muted-foreground text-sm mt-3">Unverbindlich · Antwort in unter 24h</p>
        </div>
      </div>

      {/* Funnels */}
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
