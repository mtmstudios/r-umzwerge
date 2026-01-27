import { useState, useRef, useEffect } from 'react';
import { Sparkles, CheckCircle, Truck, Heart, Shield, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SEAData } from '@/lib/seaData';

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

interface SEABeforeAfterProps {
  data: SEAData;
}

export function SEABeforeAfter({ data }: SEABeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const isGentleMode = data.tone === 'gentle';

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
    <section className="py-10 md:py-12 bg-secondary/30">
      <div className="container-custom">
        {/* Headline */}
        <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center mb-6">
          {isGentleMode ? 'Ein neuer Anfang – mit uns' : 'Das Ergebnis unserer Arbeit'}
        </h2>

        {/* Slider or Single Image */}
        {isGentleMode ? (
          // Gentle Mode: Only show "After" image with positive message
          <div className="max-w-2xl mx-auto aspect-[4/3] md:aspect-video bg-gradient-to-br from-accent/30 to-primary/20 rounded-xl overflow-hidden mb-6">
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center">
                <Sparkles className="h-10 w-10 text-primary mx-auto mb-3" />
                <p className="text-primary font-medium text-lg">Sauber, hell, befreit</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Ihr Raum – zurückgewonnen
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Standard Mode: Before/After Slider
          <div
            ref={containerRef}
            className="relative max-w-2xl mx-auto aspect-[4/3] md:aspect-video bg-muted rounded-xl overflow-hidden cursor-ew-resize select-none mb-6"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseLeave={handleMouseUp}
          >
            {/* Before Image (Full Width) */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-muted-foreground font-medium">VORHER</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Bild-Platzhalter
                  </p>
                </div>
              </div>
            </div>

            {/* After Image (Clipped) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-primary font-medium">NACHHER</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Bild-Platzhalter
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-medium flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-foreground/80 text-background text-xs font-medium rounded-full">
              Vorher
            </div>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              Nachher
            </div>
          </div>
        )}

        {/* Outcome Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {data.outcomeBadges.map((badge) => {
            const Icon = iconMap[badge] || CheckCircle;
            return (
              <div
                key={badge}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full"
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
