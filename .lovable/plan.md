
# Plan: Highlight-Icons für Service-Karten

## Ziel

Jede Service-Karte zeigt ihre Highlights mit passenden Icons an (z.B. Häkchen für "Besenrein", Uhr für "Antwort < 24h").

## Aktuelle Situation

Die Highlights sind bereits in `constants.ts` definiert:
- Wohnungsentrümpelung: "Besenrein", "Festpreis möglich", "Antwort < 24h"
- Haushaltsauflösung: "Wertanrechnung möglich", "Respektvoller Umgang", etc.
- usw.

Diese werden jedoch in der BentoCard **nicht angezeigt**.

## Icon-Zuordnung

| Highlight-Text | Icon |
|----------------|------|
| Besenrein | `Sparkles` |
| Festpreis möglich | `BadgeCheck` |
| Antwort < 24h | `Clock` |
| Wertanrechnung möglich | `Coins` |
| Respektvoller Umgang | `Heart` |
| Komplettservice | `Package` |
| Enge Zugänge | `DoorOpen` |
| Entsorgung inklusive | `Trash2` |
| Kurzfristige Termine | `CalendarCheck` |
| Außerhalb Geschäftszeiten | `Moon` |
| Dokumentenvernichtung | `FileX` |
| Feste Terminplanung | `Calendar` |
| Neutrale Fahrzeuge | `Truck` |
| Diskretion garantiert | `EyeOff` |
| Geschultes Team | `Users` |
| Standard-Fallback | `Check` |

## Visuelles Design

```text
┌─────────────────────────────────┐
│         🏠 (Icon)               │
│     Wohnungsentrümpelung        │
│ Transparent, zuverlässig...     │
│                                 │
│ ✨ Besenrein  ✓ Festpreis  🕐 <24h │
└─────────────────────────────────┘
```

Die Highlights erscheinen als kompakte Zeile mit kleinen Icons unter der Beschreibung.

## Dateien die geändert werden

| Datei | Aktion |
|-------|--------|
| `src/components/ui/BentoCard.tsx` | Neue `highlights` Prop + Icon-Rendering |
| `src/components/sections/ServicesSection.tsx` | `highlights` an BentoCard übergeben |

## Technische Details

### 1. BentoCard.tsx - Highlights-Prop hinzufügen

**Neue Imports:**
```tsx
import { 
  ArrowRight, Sparkles, BadgeCheck, Clock, Coins, Heart, 
  Package, DoorOpen, Trash2, CalendarCheck, Moon, FileX, 
  Calendar, Truck, EyeOff, Users, Check
} from 'lucide-react';
```

**Icon-Mapping-Funktion:**
```tsx
const getHighlightIcon = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('besenrein')) return Sparkles;
  if (lower.includes('festpreis')) return BadgeCheck;
  if (lower.includes('24h') || lower.includes('antwort')) return Clock;
  if (lower.includes('wertanrechnung') || lower.includes('angerechnet')) return Coins;
  if (lower.includes('respekt')) return Heart;
  if (lower.includes('komplett')) return Package;
  if (lower.includes('zugang') || lower.includes('enge')) return DoorOpen;
  if (lower.includes('entsorgung')) return Trash2;
  if (lower.includes('kurzfristig')) return CalendarCheck;
  if (lower.includes('geschäftszeit')) return Moon;
  if (lower.includes('dokument')) return FileX;
  if (lower.includes('termin')) return Calendar;
  if (lower.includes('fahrzeug') || lower.includes('neutral')) return Truck;
  if (lower.includes('diskret')) return EyeOff;
  if (lower.includes('team') || lower.includes('geschult')) return Users;
  return Check;
};
```

**Interface-Erweiterung:**
```tsx
interface BentoCardProps {
  // ... bestehende Props
  highlights?: string[];
}
```

**Highlights-Rendering (nach description, vor Arrow):**
```tsx
{highlights && highlights.length > 0 && (
  <div className={cn(
    "flex flex-wrap justify-center gap-2 mt-3",
    isLarge ? "gap-3" : "gap-2"
  )}>
    {highlights.slice(0, isLarge ? 3 : 2).map((highlight, i) => {
      const HighlightIcon = getHighlightIcon(highlight);
      return (
        <span
          key={i}
          className={cn(
            "inline-flex items-center gap-1 text-xs",
            "text-muted-foreground/80",
            variant === 'accent' && "text-primary-foreground/70"
          )}
        >
          <HighlightIcon className="h-3 w-3 text-accent" />
          <span className="truncate max-w-[100px]">{highlight}</span>
        </span>
      );
    })}
  </div>
)}
```

### 2. ServicesSection.tsx - Highlights übergeben

Die `highlights` aus dem Service-Objekt an die BentoCard weitergeben:

```tsx
<BentoCard
  key={service.slug}
  title={service.title}
  subtitle={service.subtitle}
  description={service.description}
  highlights={service.highlights}  // NEU
  icon={Icon}
  href={`/leistungen/${service.slug}`}
  size="large"
  featured={service.featured}
  index={index}
/>
```

### Responsive Anpassungen

| Kartengröße | Anzahl Highlights | Layout |
|-------------|-------------------|--------|
| Large | Bis zu 3 | Horizontal, mehr Abstand |
| Default | Bis zu 2 | Horizontal, kompakt |

### Styling Details

- Icons in `text-accent` (grün) für visuellen Akzent
- Text in `text-muted-foreground/80` für Dezenz
- Abstand nach oben mit `mt-3`
- Flexbox mit `flex-wrap` für mobile Umbrüche
- Text-Truncate für lange Highlights

## Ergebnis

Jede Service-Karte zeigt ihre wichtigsten USPs mit passenden Icons an. Die großen Karten (Wohnungsentrümpelung, Haushaltsauflösung) zeigen bis zu 3 Highlights, die kleineren bis zu 2.
