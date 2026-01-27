import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import logoRaeumzwerge from '@/assets/logo-raeumzwerge.png';
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
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);

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
          ? "glass-strong shadow-lg py-2"
          : "bg-card py-3 lg:py-4"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-6 lg:gap-8">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img 
              src={logoRaeumzwerge} 
              alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
              className="h-14 lg:h-20 w-auto"
            />
          </a>

          {/* Desktop Navigation - größer mit Underline-Animation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setIsDesktopDropdownOpen(true)}
                  onMouseLeave={() => setIsDesktopDropdownOpen(false)}
                >
                  <button className="nav-link flex items-center gap-1.5 text-base font-medium text-foreground/80 hover:text-foreground transition-colors outline-none">
                    {item.label}
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isDesktopDropdownOpen && "rotate-180"
                    )} />
                  </button>
                  {isDesktopDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="w-56 glass-strong rounded-xl shadow-lg py-2">
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-secondary transition-colors"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-strong border-t border-border/50 animate-fade-in">
          <nav className="container-custom py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              item.children ? (
                <Collapsible 
                  key={item.label}
                  open={isServicesOpen}
                  onOpenChange={setIsServicesOpen}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-base font-medium text-foreground hover:bg-secondary/50 rounded-xl transition-colors">
                    {item.label}
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isServicesOpen && "rotate-180"
                    )} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="pl-4 flex flex-col gap-1 mt-1">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="py-2.5 px-4 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/30 rounded-lg transition-colors"
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
                  className="py-3 px-4 text-base font-medium text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
            
            {/* Mobile CTA - Jetzt anrufen */}
            <div className="mt-4 pt-4 border-t border-border/50">
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
