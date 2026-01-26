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
    <>
      {/* Desktop: Below header */}
      <div
        className={cn(
          "fixed left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm transition-transform duration-300",
          "hidden lg:block top-16",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-12 gap-4">
            <p className="text-sm text-muted-foreground">
              Preiseinschätzung innerhalb von 24h
            </p>
            
            <div className="flex items-center gap-3">
              <Button
                asChild
                size="sm"
                className="gap-2 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-9"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  Foto senden
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
                  Anrufen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Bottom bar */}
      <div
        className={cn(
          "fixed left-0 right-0 bottom-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg transition-transform duration-300",
          "lg:hidden",
          isVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="container-custom py-3">
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="flex-1 gap-2 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground h-12"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Foto senden · Preis erhalten
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-12 w-12 flex-shrink-0"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
