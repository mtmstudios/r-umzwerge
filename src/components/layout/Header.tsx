import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS, getWhatsAppLink, PHONE_LINK, SERVICE_HOURS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Utility Topbar */}
      <div className="hidden lg:block bg-background border-b border-border">
        <div className="container-custom py-2 flex justify-between items-center text-sm text-muted-foreground">
          <span>{SERVICE_HOURS}</span>
          <span>Preiseinschätzung per Foto – innerhalb von 24 Stunden (oft schneller)</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-card/95 header-shadow"
            : "bg-card border-b border-border"
        )}
      >
        <div className="container-custom py-3 lg:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">Räumzwerge</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                item.children ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors outline-none">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 bg-popover border border-border shadow-lg z-50">
                      {item.children.map((child, index) => (
                        <DropdownMenuItem key={child.href} asChild className={index === 0 ? "font-medium" : ""}>
                          <a 
                            href={child.href}
                            className="w-full cursor-pointer"
                          >
                            {child.label}
                            {index === 0 && <span className="ml-auto text-muted-foreground">→</span>}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <a href={PHONE_LINK}>
                  <Phone className="h-4 w-4" />
                  Anrufen
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                className="gap-2 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground btn-lift"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  Foto per WhatsApp senden
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -mr-2"
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

          {/* Trust Line (Desktop) */}
          <div className="hidden lg:flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            <span>✓ Keine versteckten Kosten</span>
            <span className="text-border">·</span>
            <span>✓ Festpreis nach Einschätzung</span>
            <span className="text-border">·</span>
            <span>✓ Besenrein</span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-in-up">
            <nav className="container-custom py-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                item.children ? (
                  <Collapsible 
                    key={item.label}
                    open={isServicesOpen}
                    onOpenChange={setIsServicesOpen}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-base font-medium text-foreground hover:bg-secondary rounded-lg transition-colors">
                      {item.label}
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isServicesOpen && "rotate-180"
                      )} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="pl-4 flex flex-col gap-1 mt-1">
                        {item.children.map((child, index) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "py-2 px-4 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors",
                              index === 0 && "font-medium"
                            )}
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
                    className="py-3 px-4 text-base font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                <Button
                  asChild
                  variant="outline"
                  className="w-full gap-2"
                >
                  <a href={PHONE_LINK}>
                    <Phone className="h-4 w-4" />
                    Anrufen
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full gap-2 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground"
                >
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="h-4 w-4" />
                    Foto per WhatsApp senden
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
