import { Phone, MessageCircle } from 'lucide-react';
import { getWhatsAppLink, PHONE_LINK } from '@/lib/constants';

export function FloatingCTAs() {
  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50 flex gap-3">
      <a
        href={PHONE_LINK}
        className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-card border border-border rounded-2xl shadow-medium text-foreground font-medium transition-all hover:bg-secondary"
        aria-label="Anrufen"
      >
        <Phone className="h-5 w-5" />
        <span>Anrufen</span>
      </a>
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-cta hover:bg-cta-hover text-cta-foreground rounded-2xl shadow-cta font-medium transition-all float-animation"
        aria-label="WhatsApp öffnen"
      >
        <MessageCircle className="h-5 w-5" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
