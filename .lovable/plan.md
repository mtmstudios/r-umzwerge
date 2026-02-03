
# OG-Image + Preis-Section Bild aktualisieren

## Aufgabe 1: OG-Image austauschen

Das hochgeladene Logo wird als neues Vorschaubild beim Teilen von Links verwendet.

| Datei | Aktion |
|-------|--------|
| `public/og-image.jpg` | Ersetzen durch `user-uploads://Entrümpelungszauberer-01_4-3.jpg` |

---

## Aufgabe 2: Preis-Section Bild ersetzen

Das neue Tablet-Bild wird eingesetzt und so positioniert, dass das Tablet auf allen Geräten sichtbar bleibt.

| Datei | Aktion |
|-------|--------|
| `src/assets/pricing-tablet.png` | Neues Bild hinzufügen |
| `src/components/sections/PricingSection.tsx` | Import + Container anpassen |

### Technische Details

**Import ändern (Zeile 7):**
```tsx
import pricingTabletImage from '@/assets/pricing-tablet.png';
```

**Bild-Container anpassen (Zeile 127-132):**
- Höhere Container: `h-56 sm:h-64 md:h-72 lg:h-80`
- Zentrierung: `object-center` statt `object-top`
- Neuer Alt-Text für das Tablet-Motiv

---

## Hinweis

Nach dem OG-Image Update kann es einige Zeit dauern, bis Messenger (WhatsApp, Facebook) das neue Bild anzeigen - das alte ist gecacht.
