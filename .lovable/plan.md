
# Plan: Kontaktdaten aktualisieren

## Neue Daten

| Feld | Wert |
|------|------|
| **Telefon** | +49 160 3080676 |
| **WhatsApp** | 491603080676 (ohne + und Leerzeichen) |
| **E-Mail** | hallo@raeumzwerge.de |
| **Adresse** | Bibertalstraße 1, 89278 Nersingen |

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/lib/constants.ts` | Telefon, WhatsApp-Nummer, E-Mail aktualisieren + Adresse hinzufügen |
| `src/components/layout/Footer.tsx` | "Ulm (Hauptsitz)" durch vollständige Adresse ersetzen |

## Technische Details

### 1. constants.ts - Kontaktdaten

```typescript
// Zeile 2 - WhatsApp-Nummer (ohne + und Leerzeichen für wa.me Link)
export const WHATSAPP_NUMBER = "491603080676";

// Zeile 10-12 - Telefon
export const PHONE_NUMBER = "+49 160 3080676";
export const PHONE_LINK = "tel:+491603080676";

// Zeile 14-15 - E-Mail
export const EMAIL = "hallo@raeumzwerge.de";

// NEU: Adresse hinzufügen (nach EMAIL)
export const ADDRESS = "Bibertalstraße 1, 89278 Nersingen";
```

### 2. Footer.tsx - Adresse anzeigen

Zeile 108-111 ändern:

```tsx
// Vorher:
<li className="flex items-center gap-2 text-primary-foreground/70 text-sm">
  <MapPin className="h-4 w-4 flex-shrink-0" />
  Ulm (Hauptsitz)
</li>

// Nachher:
<li className="flex items-center gap-2 text-primary-foreground/70 text-sm">
  <MapPin className="h-4 w-4 flex-shrink-0" />
  {ADDRESS}
</li>
```

Zusätzlich den Import erweitern:
```tsx
import { SERVICES, REGIONS, PHONE_NUMBER, EMAIL, SERVICE_HOURS, ADDRESS, getWhatsAppLink } from '@/lib/constants';
```

## Automatisch aktualisierte Stellen

Da die Konstanten zentral definiert sind, werden folgende Komponenten automatisch die neuen Daten anzeigen:

- **Header** - WhatsApp CTA Button
- **FloatingCTAs** - Anrufen & WhatsApp Buttons
- **StickyConversionBar** - Desktop & Mobile CTAs
- **FinalCTASection** - Startseite
- **ServiceFinalCTA** - Leistungsseiten
- **Footer** - Alle Kontaktlinks

## Ergebnis

Alle Kontaktdaten auf der gesamten Website werden auf die neuen Werte aktualisiert:
- Telefonnummer: +49 160 3080676
- WhatsApp: wa.me/491603080676 mit vorausgefüllter Nachricht
- E-Mail: hallo@raeumzwerge.de
- Adresse im Footer: Bibertalstraße 1, 89278 Nersingen
