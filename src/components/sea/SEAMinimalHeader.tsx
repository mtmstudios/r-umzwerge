import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import logoImage from '@/assets/logo-raeumzwerge.webp';

export function SEAMinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - no link to prevent navigation away */}
<div className="h-20 lg:h-24 overflow-hidden flex items-center -ml-8 lg:-ml-12">
            <img
              src={logoImage}
              alt="Räumzwerge"
              className="h-64 lg:h-80 w-auto object-contain object-left"
            />
          </div>

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
