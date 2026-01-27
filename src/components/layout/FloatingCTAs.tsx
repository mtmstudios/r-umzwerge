import { forwardRef, useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { cn } from '@/lib/utils';

export const FloatingCTAs = forwardRef<HTMLDivElement>((props, ref) => {
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
        "lg:hidden fixed bottom-0 left-0 right-0 z-50 p-3 pb-4 bg-gradient-to-t from-background via-background/95 to-transparent",
        "transition-all duration-300",
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="flex gap-3 ml-14">
        <a
          href={PHONE_LINK}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-cta border-2 border-cta rounded-xl shadow-medium text-cta-foreground font-medium transition-all active:scale-95"
          aria-label="Anrufen"
        >
          <Phone className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">Anrufen</span>
        </a>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground rounded-xl shadow-whatsapp font-medium transition-all active:scale-95"
          aria-label="WhatsApp öffnen"
        >
          <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">WhatsApp</span>
        </a>
      </div>
    </div>
  );
});

FloatingCTAs.displayName = 'FloatingCTAs';
