import { useState } from 'react';
import { Phone, Mail, MapPin, Accessibility } from 'lucide-react';
import { SERVICES, REGIONS, PHONE_NUMBER, EMAIL, ADDRESS, getWhatsAppLink } from '@/lib/constants';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { AccessibilityWidget } from '@/components/accessibility/AccessibilityWidget';
export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  return (
    <>
      <footer className="bg-primary text-primary-foreground pb-20 lg:pb-0">
        {/* Link Columns */}
        <div className="container-custom py-10 lg:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Leistungen */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary-foreground/90">
                Leistungen
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/leistungen/wohnungsentruempelung"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Wohnungsentrümpelung
                  </a>
                </li>
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <a
                      href={`/leistungen/${service.slug}`}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary-foreground/90">
                Kontakt
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    {PHONE_NUMBER}
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    <WhatsAppIcon className="h-4 w-4 flex-shrink-0" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  {ADDRESS}
                </li>
              </ul>
            </div>

            {/* Rechtliches */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary-foreground/90">
                Rechtliches
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/impressum"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Impressum
                  </a>
                </li>
                <li>
                  <a
                    href="/datenschutz"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a
                    href="/barrierefreiheit"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Barrierefreiheit
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsAccessibilityOpen(true)}
                    className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    <Accessibility className="h-4 w-4 flex-shrink-0" />
                    Einstellungen
                  </button>
                </li>
              </ul>
            </div>

            {/* Einsatzgebiet */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary-foreground/90">
                Einsatzgebiet
              </h3>
              <ul className="space-y-2.5">
                {REGIONS.map((region) => (
                  <li key={region.slug}>
                    <a
                      href={`/${region.slug}`}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {region.name}
                      {region.isHQ && (
                        <span className="text-accent ml-1 text-xs">(HQ)</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10">
          <div className="container-custom py-5">
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-sm text-primary-foreground/50">
              <p>© {currentYear} Räumzwerge. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessibility Widget */}
      <AccessibilityWidget 
        isOpen={isAccessibilityOpen} 
        onClose={() => setIsAccessibilityOpen(false)} 
      />
    </>
  );
}
