import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import logoImage from '@/assets/logo-raeumzwerge.png';

export function SEAMinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - no link to prevent navigation away */}
          <div className="h-16 lg:h-20 overflow-hidden flex items-center">
            <img
              src={logoImage}
              alt="Räumzwerge"
              className="h-28 lg:h-36 w-auto object-contain object-center"
            />
          </div>

          {/* CTA Button */}
          <Button
            asChild
            size="sm"
            className="gap-2 bg-cta hover:bg-cta-hover text-white h-10 px-4"
            data-track="cta-header-phone"
          >
            <a href={PHONE_LINK}>
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Jetzt anrufen</span>
              <span className="sm:hidden">Anrufen</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
