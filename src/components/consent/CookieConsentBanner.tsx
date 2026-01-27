import { useState } from 'react';
import { X, Cookie, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent } from './CookieConsentContext';

export function CookieConsentBanner() {
  const { showBanner, consent, updateConsent, acceptAll, acceptNecessary } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [localStatistics, setLocalStatistics] = useState(consent.statistics);
  const [localMarketing, setLocalMarketing] = useState(consent.marketing);

  if (!showBanner) {
    return null;
  }

  const handleSaveSelection = () => {
    updateConsent({
      statistics: localStatistics,
      marketing: localMarketing,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 id="cookie-banner-title" className="text-lg font-semibold text-foreground">
                Cookie-Einstellungen
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Wir nutzen Cookies, um unsere Website zu verbessern und Ihnen relevante Inhalte anzuzeigen.
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="px-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-4"
            aria-expanded={showDetails}
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Details ausblenden
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Details anzeigen
              </>
            )}
          </button>

          {showDetails && (
            <div className="space-y-4 pb-4">
              {/* Necessary */}
              <div className="flex items-start justify-between gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Notwendig</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Essenziell für die Funktion der Website. Kann nicht deaktiviert werden.
                  </p>
                </div>
                <Switch checked disabled aria-label="Notwendige Cookies (immer aktiv)" />
              </div>

              {/* Statistics */}
              <div className="flex items-start justify-between gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Statistik</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Google Analytics – Hilft uns zu verstehen, wie Besucher unsere Website nutzen.
                  </p>
                </div>
                <Switch 
                  checked={localStatistics} 
                  onCheckedChange={setLocalStatistics}
                  aria-label="Statistik-Cookies"
                />
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Marketing</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Google Ads – Ermöglicht die Messung der Werbewirksamkeit.
                  </p>
                </div>
                <Switch 
                  checked={localMarketing} 
                  onCheckedChange={setLocalMarketing}
                  aria-label="Marketing-Cookies"
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 pt-4 bg-muted/30 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={acceptNecessary}
              className="flex-1 order-2 sm:order-1"
            >
              Nur Notwendige
            </Button>
            {showDetails && (
              <Button
                variant="outline"
                onClick={handleSaveSelection}
                className="flex-1 order-3 sm:order-2"
              >
                Auswahl speichern
              </Button>
            )}
            <Button
              onClick={acceptAll}
              className="flex-1 order-1 sm:order-3 bg-primary hover:bg-primary/90"
            >
              Alle akzeptieren
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Mehr Informationen in unserer{' '}
            <a 
              href="/datenschutz" 
              className="text-primary hover:underline inline-flex items-center gap-0.5"
            >
              Datenschutzerklärung
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
