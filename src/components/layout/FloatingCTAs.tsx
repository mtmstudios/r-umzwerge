import { forwardRef, useState, useEffect } from 'react';
import { Phone, ClipboardList } from 'lucide-react';
import { PHONE_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FloatingCTAsProps {
  onFunnelOpen?: () => void;
}

export const FloatingCTAs = forwardRef<HTMLDivElement, FloatingCTAsProps>(({ onFunnelOpen }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector('main > section:first-of-type');
    if (!heroSection) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
    );
    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-50 p-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-background via-background/98 to-background/90",
        "transition-all duration-300",
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="flex gap-3">
        <a
          href={PHONE_LINK}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-card border-2 border-primary rounded-xl shadow-lg text-primary font-bold text-base transition-all active:scale-95"
          aria-label="Anrufen"
        >
          <Phone className="h-5 w-5 flex-shrink-0" />
          <span>Anrufen</span>
        </a>
        {onFunnelOpen ? (
          <button
            onClick={onFunnelOpen}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-cta hover:bg-cta-hover text-cta-foreground rounded-xl shadow-lg font-bold text-base transition-all active:scale-95"
            aria-label="Angebot berechnen"
          >
            <ClipboardList className="h-5 w-5 flex-shrink-0" />
            <span>Angebot</span>
          </button>
        ) : (
          <a
            href="#kontakt"
            className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-cta hover:bg-cta-hover text-cta-foreground rounded-xl shadow-lg font-bold text-base transition-all active:scale-95"
            aria-label="Angebot berechnen"
          >
            <ClipboardList className="h-5 w-5 flex-shrink-0" />
            <span>Angebot</span>
          </a>
        )}
      </div>
    </div>
  );
});

FloatingCTAs.displayName = 'FloatingCTAs';
