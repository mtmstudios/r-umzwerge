import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import logoNeu from '@/assets/logo-neu.png';

export function SEAMinimalHeader() {
  return (
    <header className="relative lg:fixed lg:top-0 left-0 right-0 z-50 bg-background/95 lg:backdrop-blur-sm border-b border-border/50 overflow-visible">
      <div className="container-custom overflow-visible">
        <div className="grid grid-cols-3 lg:flex lg:justify-between items-center py-1 overflow-visible">
          {/* Platzhalter links für Symmetrie auf Mobile/Tablet */}
          <div className="lg:hidden" />

          {/* Logo - zentriert auf Mobile/Tablet, links auf Desktop */}
          <a 
            href="https://www.raeumzwerge.de" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center lg:justify-start shrink-0"
          >
            <img
              src={logoNeu}
              alt="Räumzwerge – Entrümpelungen, Auflösungen, Service"
              className="object-contain logo-trim block h-[100px] sm:h-[120px] lg:h-[140px] w-auto -mt-3 -mb-6 sm:-mt-4 sm:-mb-8 lg:-mt-5 lg:-mb-10"
            />
          </a>

          {/* Anruf-Button rechts auf Mobil/Tablet */}
          <div className="lg:hidden flex justify-end">
            <a
              href={PHONE_LINK}
              className="p-2 -mr-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Jetzt anrufen"
            >
              <Phone className="h-6 w-6 text-primary" />
            </a>
          </div>

          {/* CTA Button - nur auf Desktop sichtbar */}
          <Button
            asChild
            size="lg"
            className="hidden lg:flex gap-2.5 bg-cta hover:bg-cta-hover text-white font-semibold px-6 h-12 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            data-track="cta-header-phone"
          >
            <a href={PHONE_LINK}>
              <Phone className="h-5 w-5" />
              <span>Jetzt anrufen</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
