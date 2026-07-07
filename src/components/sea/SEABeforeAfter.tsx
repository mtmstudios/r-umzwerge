import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Phone, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import { seaImages } from '@/lib/seaImages';
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';
import { GewerbeFunnel } from '@/components/contact/sea/GewerbeFunnel';
import type { SEAData, SEAVariant } from '@/lib/seaData';

const iconMap: Record<string, boolean> = {
  'Besenrein': true, 'Übergabefertig': true, 'Fachgerecht entsorgt': true,
  'Respektvoll geräumt': true, 'Schnell erledigt': true, 'Diskret': true,
  'Respektvoll': true, 'Ein neuer Anfang': true, 'Schritt für Schritt': true,
};

const getImagesForVariant = (slug: SEAVariant) => {
  switch (slug) {
    case 'haushaltsaufloesung':
      return { before: seaImages.haushaltsaufloesung.before, after: seaImages.haushaltsaufloesung.after };
    case 'entruempelung':
      return { before: seaImages.entruempelung.before, after: seaImages.entruempelung.after };
    case 'messie-hilfe':
      return { before: seaImages.messie.before, after: seaImages.messie.after };
    case 'gewerbe':
      return { before: seaImages.gewerbe.before, after: seaImages.gewerbe.after };
    default:
      return { before: seaImages.entruempelung.before, after: seaImages.entruempelung.after };
  }
};

interface SEABeforeAfterProps {
  data: SEAData;
}

export function SEABeforeAfter({ data }: SEABeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const isGentleMode = data.tone === 'gentle';
  const images = getImagesForVariant(data.slug);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setSliderPosition(Math.min(Math.max((x / rect.width) * 100, 5), 95));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    setSliderPosition(Math.min(Math.max((x / rect.width) * 100, 5), 95));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => { isDragging.current = false; };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section className="py-10 md:py-16 bg-secondary/30 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">
          {isGentleMode ? 'Ein neuer Anfang – mit uns' : 'Das Ergebnis unserer Arbeit'}
        </h2>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="glass rounded-2xl p-3 shadow-xl shadow-primary/5">
            <div
              ref={containerRef}
              className="relative aspect-[4/3] md:aspect-video bg-muted rounded-xl overflow-hidden cursor-ew-resize select-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseLeave={handleMouseUp}
            >
              <div className="absolute inset-0">
                <img src={images.after} alt="Nachher" className="w-full h-full object-cover scale-[1.15]" loading="lazy" />
              </div>
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                <img src={images.before} loading="lazy" alt="Vorher" className="w-full h-full object-cover scale-[1.15]" />
              </div>
              <div className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-lg" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-primary/20">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-gradient-to-r from-foreground/90 to-foreground/70 text-background text-xs font-semibold rounded-full backdrop-blur-sm">
                Vorher
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold rounded-full">
                Nachher
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {data.outcomeBadges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-4 py-2.5 glass rounded-full border border-border/30 lg:hover:shadow-lg lg:hover:shadow-accent/10 lg:hover:-translate-y-0.5 transition-all duration-300 cursor-default"
            >
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">{badge}</span>
            </div>
          ))}
        </div>

        {/* Dual-CTA: Phone primary, Funnel secondary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-cta hover:bg-cta-hover text-cta-foreground h-12 md:h-14 px-6 md:px-8 text-sm md:text-base shadow-lg shadow-cta/25 w-full sm:w-auto font-bold rounded-2xl"
            data-track="cta-phone-beforeafter"
          >
            <a href={PHONE_LINK}>
              <Phone className="h-5 w-5 flex-shrink-0" />
              Jetzt anrufen
            </a>
          </Button>
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="gap-2 h-12 md:h-14 px-6 md:px-8 text-sm md:text-base bg-card hover:bg-secondary text-primary border-2 border-primary/30 font-semibold rounded-2xl w-full sm:w-auto"
            data-track="cta-funnel-beforeafter"
          >
            <ClipboardList className="h-5 w-5 flex-shrink-0" />
            Angebot anfordern
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Unverbindlich · Antwort innerhalb von 24h</p>
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
      {data.slug === 'gewerbe' && (
        <GewerbeFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </section>
  );
}
