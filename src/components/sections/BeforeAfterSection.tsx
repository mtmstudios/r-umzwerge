import { useState, useRef, useEffect } from 'react';
import { Sparkles, CheckCircle, Truck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

// Import images directly for Vite bundling
import beforeImage from '@/assets/before-after-vorher.webp';
import afterImage from '@/assets/before-after-nachher.webp';

const outcomeBadges = [
  { icon: Sparkles, text: "Besenrein" },
  { icon: CheckCircle, text: "Übergabefertig" },
  { icon: Truck, text: "Fachgerecht entsorgt" },
];

export function BeforeAfterSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

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
    <section className="py-12 md:py-14 lg:py-16 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            "text-center mb-8 md:mb-10",
            "scroll-reveal",
            isVisible && "visible"
          )}
        >
          <h2 className="text-section-mobile lg:text-section text-foreground mb-4">
            Das Ergebnis: spürbar mehr Freiraum
          </h2>
        </div>

        {/* Before/After Slider */}
        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto aspect-video bg-muted rounded-2xl lg:rounded-3xl overflow-hidden cursor-ew-resize select-none mb-8"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseLeave={handleMouseUp}
        >
          {/* After Image (Full Width) - Nachher */}
          <div className="absolute inset-0">
            <img 
              src={afterImage} 
              alt="Wohnung nach der Entrümpelung - besenrein"
              className="w-full h-full object-cover scale-[1.15]"
              loading="lazy"
            />
          </div>

          {/* Before Image (Clipped from left) - Vorher */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={beforeImage} 
              alt="Wohnung vor der Entrümpelung - voll mit Kartons und Müll"
              className="w-full h-full object-cover scale-[1.15]"
              loading="lazy"
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-medium flex items-center justify-center">
              <svg
                className="w-6 h-6 text-foreground"
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
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-foreground/80 text-background text-sm font-medium rounded-full">
            Vorher
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full">
            Nachher
          </div>
        </div>


        {/* Outcome Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {outcomeBadges.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-full"
            >
              <Icon className="h-5 w-5 text-accent" />
              <span className="font-medium text-foreground">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
