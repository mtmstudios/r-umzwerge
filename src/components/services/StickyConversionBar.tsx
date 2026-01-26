import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function StickyConversionBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 gap-4">
          <p className="hidden sm:block text-sm text-muted-foreground">
            Preiseinschätzung innerhalb von 24h
          </p>
          
          <div className="flex items-center gap-3 ml-auto">
            <Button
              asChild
              size="sm"
              className="gap-2 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-9"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" />
                <span className="hidden xs:inline">Foto senden</span>
                <span className="xs:hidden">WhatsApp</span>
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 h-9"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Anrufen</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
