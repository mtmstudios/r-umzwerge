
# Plan: Footer mit "Mit ❤️ erstellt von [Logo]" aktualisieren

## Ziel

Die Bottom Bar im Footer soll rechts "Mit ❤️ erstellt von [Logo]" anzeigen statt "Mo–Sa 8–20 Uhr". Das Logo soll klar sichtbar sein und nicht zu klein.

## Aktuelle Struktur

```text
┌─────────────────────────────────────────────────────────────┐
│ © 2025 Räumzwerge. Alle Rechte vorbehalten.    Mo–Sa 8–20 Uhr │
└─────────────────────────────────────────────────────────────┘
```

## Neue Struktur

```text
┌─────────────────────────────────────────────────────────────────────┐
│ © 2025 Räumzwerge. Alle Rechte vorbehalten.    Mit ❤️ erstellt von [LOGO] │
└─────────────────────────────────────────────────────────────────────┘
```

## Dateien die geändert werden

| Datei | Aktion |
|-------|--------|
| `src/assets/logo-white.png` | Logo-Datei ins Projekt kopieren |
| `src/components/layout/Footer.tsx` | Bottom Bar Text und Logo hinzufügen |

## Technische Details

### 1. Logo ins Projekt kopieren

Die hochgeladene Datei `user-uploads://LOGO-2-WHITE-TARANSPERNT.png` wird nach `src/assets/logo-white.png` kopiert.

### 2. Footer.tsx anpassen

**Neue Imports hinzufügen:**
```tsx
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import logoWhite from '@/assets/logo-white.png';
```

**Import aus constants anpassen (SERVICE_HOURS entfernen):**
```tsx
import { SERVICES, REGIONS, PHONE_NUMBER, EMAIL, ADDRESS, getWhatsAppLink } from '@/lib/constants';
```

**Bottom Bar (Zeilen 166-174) ändern:**

Vorher:
```tsx
<div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-primary-foreground/50">
  <p>© {currentYear} Räumzwerge. Alle Rechte vorbehalten.</p>
  <p>{SERVICE_HOURS}</p>
</div>
```

Nachher:
```tsx
<div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-primary-foreground/50">
  <p>© {currentYear} Räumzwerge. Alle Rechte vorbehalten.</p>
  <p className="flex items-center gap-1.5">
    Mit <Heart className="h-4 w-4 text-red-400 fill-red-400" /> erstellt von
    <img 
      src={logoWhite} 
      alt="Logo" 
      className="h-6 ml-1 object-contain" 
    />
  </p>
</div>
```

**Logo-Styling Details:**
- `h-6` (24px Höhe) - größer als ursprünglich geplant, damit das Logo trotz des Paddings im Bild gut sichtbar ist
- `object-contain` - stellt sicher, dass das Logo proportional skaliert wird
- `ml-1` - kleiner Abstand zwischen "von" und dem Logo

## Ergebnis

- Die Footer Bottom Bar zeigt rechts "Mit ❤️ erstellt von [Logo]"
- Das Herz-Symbol ist rot gefüllt (❤️)
- Das weiße Logo ist klar sichtbar auf dem dunklen Footer-Hintergrund
- Die Öffnungszeiten werden an dieser Stelle entfernt
