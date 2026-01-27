import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import logoImage from '@/assets/logo-raeumzwerge.png';

export function SEAMinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - links to main website in new tab */}
          <a 
            href="https://www.raeumzwerge.de" 
            target="_blank" 
            rel="noopener noreferrer"
            className="h-20 lg:h-24 overflow-hidden flex items-center -ml-8 lg:-ml-12 group"
          >
            <img
              src={logoImage}
              alt="Räumzwerge"
              className="h-64 lg:h-80 w-auto object-contain object-left transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
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
