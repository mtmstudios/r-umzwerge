import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import logoRaeumzwerge from '@/assets/logo-raeumzwerge-cropped.png';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS, PHONE_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
isScrolled
          ? "glass-strong shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.12)] py-0.5 lg:py-1 border-b border-border/30"
          : "bg-card py-1 lg:py-1.5 shadow-none border-b border-transparent"
      )}
    >
      <div className="container-custom">
        <div className="grid grid-cols-3 lg:flex lg:justify-between items-center gap-6 lg:gap-8">
          {/* Mobile Menu Button - links auf Mobil/Tablet */}
          <div className="lg:hidden flex justify-start">
            <button
              className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo - zentriert auf Mobil/Tablet, links auf Desktop */}
          <a href="/" className="flex items-center justify-center lg:justify-start group shrink-0">
            <div className="h-[120px] sm:h-36 lg:h-40 flex items-center">
              <img 
                src={logoRaeumzwerge} 
                alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
                className="h-[120px] sm:h-36 lg:h-40 w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
              />
            </div>
          </a>

          {/* Platzhalter rechts für Symmetrie auf Mobil/Tablet */}
          <div className="lg:hidden" />

          {/* Desktop Navigation - größer mit Underline-Animation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="nav-link flex items-center gap-1.5 text-base font-medium text-foreground/80 hover:text-foreground transition-colors outline-none">
                    {item.label}
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openDropdown === item.label && "rotate-180"
                    )} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="w-56 bg-card border border-border rounded-xl shadow-lg py-2">
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Desktop CTA - Jetzt anrufen */}
          <div className="hidden lg:block">
            <Button
              asChild
              size="lg"
              className="gap-2.5 bg-cta hover:bg-cta-hover text-white font-semibold px-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5" />
                Jetzt anrufen
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-strong border-t border-border/50 animate-fade-in">
          <nav className="container-custom py-4 flex flex-col items-center gap-1">
            {NAV_ITEMS.map((item) => (
              item.children ? (
                <Collapsible 
                  key={item.label}
                  open={isServicesOpen}
                  onOpenChange={setIsServicesOpen}
                >
                  <CollapsibleTrigger className="flex items-center justify-center gap-2 w-full py-3 px-4 text-base font-medium text-foreground hover:bg-secondary/50 rounded-xl transition-colors">
                    {item.label}
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isServicesOpen && "rotate-180"
                    )} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="flex flex-col items-center gap-1 mt-1 w-full">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="py-2.5 px-4 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/30 rounded-lg transition-colors text-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-3 px-4 text-base font-medium text-foreground hover:bg-secondary/50 rounded-xl transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
            
            {/* Mobile CTA - Jetzt anrufen */}
            <div className="mt-4 pt-4 border-t border-border/50 w-full max-w-xs">
              <Button
                asChild
                size="lg"
                className="w-full gap-2.5 bg-cta hover:bg-cta-hover text-white font-semibold"
              >
                <a href={PHONE_LINK}>
                  <Phone className="h-5 w-5" />
                  Jetzt anrufen
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
