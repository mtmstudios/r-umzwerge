import { forwardRef } from 'react';
import { Phone } from 'lucide-react';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export const FloatingCTAs = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div 
      ref={ref}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-3 pb-4 bg-gradient-to-t from-background via-background/95 to-transparent"
    >
      <div className="flex gap-3">
        <a
          href={PHONE_LINK}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-card border border-border rounded-xl shadow-medium text-foreground font-medium transition-all active:scale-95"
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
