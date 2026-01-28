import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import logoTransparent from '@/assets/logo-transparent.png';

export function SEAMinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-[420px]">
          {/* Logo - links to main website in new tab */}
          <a 
            href="https://www.raeumzwerge.de" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center group"
          >
            <img
              src={logoTransparent}
              alt="Räumzwerge"
              className="h-12 sm:h-14 lg:h-96 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
            />
          </a>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="gap-2.5 bg-cta hover:bg-cta-hover text-white font-semibold px-6 h-11 lg:h-12 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            data-track="cta-header-phone"
          >
            <a href={PHONE_LINK}>
              <Phone className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden sm:inline">Jetzt anrufen</span>
              <span className="sm:hidden">Anrufen</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
