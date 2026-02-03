import { useState, useRef, useEffect } from 'react';
import { Sparkles, CheckCircle, Truck, Heart, Shield, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { seaImages } from '@/lib/seaImages';
import type { SEAData, SEAVariant } from '@/lib/seaData';

const iconMap: Record<string, React.ElementType> = {
  'Besenrein': Sparkles,
  'Übergabefertig': CheckCircle,
  'Fachgerecht entsorgt': Truck,
  'Respektvoll geräumt': Heart,
  'Schnell erledigt': CheckCircle,
  'Diskret': Shield,
  'Respektvoll': Heart,
  'Ein neuer Anfang': Sparkles,
  'Schritt für Schritt': Users,
};

// Map slug to correct image set
const getImagesForVariant = (slug: SEAVariant) => {
  switch (slug) {
    case 'haushaltsaufloesung':
      return {
        before: seaImages.haushaltsaufloesung.before,
        after: seaImages.haushaltsaufloesung.after,
      };
    case 'entruempelung':
      return {
        before: seaImages.entruempelung.before,
        after: seaImages.entruempelung.after,
      };
    case 'messie-hilfe':
      return {
        before: seaImages.messie.before,
        after: seaImages.messie.after,
      };
    default:
      return {
        before: seaImages.entruempelung.before,
        after: seaImages.entruempelung.after,
      };
  }
};

interface SEABeforeAfterProps {
  data: SEAData;
}

export function SEABeforeAfter({ data }: SEABeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const isGentleMode = data.tone === 'gentle';
  const images = getImagesForVariant(data.slug);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 5), 95));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 5), 95));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section className="py-10 md:py-16 bg-secondary/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Headline */}
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">
          {isGentleMode ? 'Ein neuer Anfang – mit uns' : 'Das Ergebnis unserer Arbeit'}
        </h2>

        {/* Before/After Slider with Glassmorphism container */}
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
              {/* After Image (Base layer - full width) */}
              <div className="absolute inset-0">
                <img 
                  src={images.after} 
                  alt={data.afterImageAlt || 'Nachher'}
                  className="w-full h-full object-cover scale-[1.15]"
                  loading="lazy"
                />
              </div>

              {/* Before Image (Clipped - reveals from left) */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img 
                  src={images.before}
                  loading="lazy"
                  alt={data.beforeImageAlt || 'Vorher'}
                  className="w-full h-full object-cover scale-[1.15]"
                />
              </div>

              {/* Slider Handle with pulsing ring */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-lg"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                {/* Pulsing outer ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 animate-pulse-subtle" />
                
                {/* Handle button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-primary/20">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </div>

              {/* Labels with gradient background */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-gradient-to-r from-foreground/90 to-foreground/70 text-background text-xs font-semibold rounded-full backdrop-blur-sm">
                Vorher
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold rounded-full">
                Nachher
              </div>
            </div>
          </div>
        </div>

        {/* Outcome Badges with glow effect */}
        <div className="flex flex-wrap justify-center gap-3">
          {data.outcomeBadges.map((badge) => {
            const Icon = iconMap[badge] || CheckCircle;
            return (
              <div
                key={badge}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5",
                  "glass rounded-full",
                  "border border-border/30",
                  "hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-0.5",
                  "transition-all duration-300 cursor-default"
                )}
              >
                <Icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-foreground">{badge}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
