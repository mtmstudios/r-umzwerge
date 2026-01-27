import { useState } from 'react';
import { X, Accessibility, Type, Contrast, Zap, Cookie, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility, FontSize } from './AccessibilityContext';
import { useCookieConsent } from '@/components/consent/CookieConsentContext';

interface AccessibilityWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityWidget({ isOpen, onClose }: AccessibilityWidgetProps) {
  const { settings, updateSettings, resetSettings } = useAccessibility();
  const { openBanner } = useCookieConsent();

  if (!isOpen) {
    return null;
  }

  const fontSizeOptions: { value: FontSize; label: string }[] = [
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Groß' },
    { value: 'xlarge', label: 'Sehr groß' },
  ];

  const handleOpenCookieSettings = () => {
    openBanner();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-widget-title"
      >
        {/* Header */}
        <div className="p-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Accessibility className="h-5 w-5 text-primary" />
            </div>
            <h2 id="accessibility-widget-title" className="text-lg font-semibold text-foreground">
              Barrierefreiheit
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Schließen"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Settings */}
        <div className="px-6 pb-4 space-y-6">
          {/* Font Size */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Type className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Schriftgröße</span>
            </div>
            <div className="flex gap-2">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateSettings({ fontSize: option.value })}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    settings.fontSize === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                  aria-pressed={settings.fontSize === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contrast */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Contrast className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Kontrast</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateSettings({ highContrast: false })}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  !settings.highContrast
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                aria-pressed={!settings.highContrast}
              >
                Normal
              </button>
              <button
                onClick={() => updateSettings({ highContrast: true })}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  settings.highContrast
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                aria-pressed={settings.highContrast}
              >
                Hoch
              </button>
            </div>
          </div>

          {/* Animations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Animationen</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateSettings({ reducedMotion: false })}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  !settings.reducedMotion
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                aria-pressed={!settings.reducedMotion}
              >
                An
              </button>
              <button
                onClick={() => updateSettings({ reducedMotion: true })}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  settings.reducedMotion
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                aria-pressed={settings.reducedMotion}
              >
                Reduziert
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-4 bg-muted/30 border-t border-border space-y-3">
          <Button
            variant="outline"
            onClick={handleOpenCookieSettings}
            className="w-full justify-start gap-2"
          >
            <Cookie className="h-4 w-4" />
            Cookie-Einstellungen ändern
          </Button>
          <Button
            variant="ghost"
            onClick={resetSettings}
            className="w-full justify-start gap-2 text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Einstellungen zurücksetzen
          </Button>
        </div>
      </div>
    </div>
  );
}
