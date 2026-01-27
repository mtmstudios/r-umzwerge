

# Plan: Alle 3 Themen umsetzen

## Übersicht

| # | Thema | Datei |
|---|-------|-------|
| 1 | WhatsApp-Link Update | `src/lib/constants.ts` |
| 2 | Mobile Carousel Pain-Points | `src/components/sea/SEAPainPoints.tsx` |
| 3 | Vorher/Nachher-Bilder tauschen | `src/components/sections/BeforeAfterSection.tsx` |

---

## 1. WhatsApp-Link Update

### Datei: `src/lib/constants.ts`

**Zeile 3 ändern:**

```typescript
// Von:
export const WHATSAPP_MESSAGE = "Hallo Räumzwerge, ich hätte gerne eine Preiseinschätzung. Ort: ____. Ich sende gleich Fotos.";

// Zu:
export const WHATSAPP_MESSAGE = "Hallo liebes Räumzwerge-Team, ich komme von euerer Website.";
```

Alle WhatsApp-Buttons auf allen Seiten nutzen automatisch den neuen Text.

---

## 2. Mobile Carousel für Pain-Points Section

### Datei: `src/components/sea/SEAPainPoints.tsx`

**Imports erweitern (Zeile 1):**
```tsx
import { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { cn } from '@/lib/utils';
import { getWhatsAppLink } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  type CarouselApi 
} from '@/components/ui/carousel';
import type { SEAData } from '@/lib/seaData';
```

**State hinzufügen (nach Zeile 17):**
```tsx
const isMobile = useIsMobile();
const [carouselApi, setCarouselApi] = useState<CarouselApi>();
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  if (!carouselApi) return;
  
  const onSelect = () => {
    setCurrentSlide(carouselApi.selectedScrollSnap());
  };
  
  carouselApi.on('select', onSelect);
  return () => { carouselApi.off('select', onSelect); };
}, [carouselApi]);
```

**Grid durch konditionelles Rendering ersetzen (Zeile 49-136):**

Mobile: Carousel mit Peek-Effekt und Dot-Navigation
Desktop: Bestehendes Grid-Layout

```text
Mobile Layout:
┌─────────────────────────────────┐
│  ┌───────────┐                  │
│  │  Card 1   │ Card 2 (peek)    │  ← Swipe
│  └───────────┘                  │
│                                 │
│        ●━━ ○ ○  ← Dots          │
└─────────────────────────────────┘
```

---

## 3. Vorher/Nachher-Bilder tauschen (Startseite)

### Aktuelles Problem

Das Clip-Path `inset(0 ${100 - sliderPosition}% 0 0)` zeigt das geclippte Bild von **links**. Aktuell ist das Nachher-Bild geclippt (links sichtbar) und das Vorher-Bild im Hintergrund (rechts sichtbar).

**Das ist verkehrt herum!** Links sollte "Vorher" sein, rechts "Nachher".

### Datei: `src/components/sections/BeforeAfterSection.tsx`

**Bilder tauschen (Zeilen 79-98):**

```tsx
{/* Before Image (Full Width) - wird zu NACHHER */}
<div className="absolute inset-0">
  <img 
    src="/images/before-after-nachher.webp"  // War: vorher.webp
    alt="Wohnung nach der Entrümpelung - besenrein"
    className="w-full h-full object-cover"
  />
</div>

{/* After Image (Clipped) - wird zu VORHER */}
<div
  className="absolute inset-0"
  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
>
  <img 
    src="/images/before-after-vorher.webp"  // War: nachher.webp
    alt="Wohnung vor der Entrümpelung - voll mit Kartons und Müll"
    className="w-full h-full object-cover"
  />
</div>
```

**Kommentare aktualisieren (Zeilen 79, 88):**
- Zeile 79: `{/* After Image (Full Width) - Nachher */}`
- Zeile 88: `{/* Before Image (Clipped from left) - Vorher */}`

### Ergebnis nach Änderung

```text
Slider bei 50%:
┌─────────────────────────────────┐
│  VORHER   │ Slider │  NACHHER  │
│  (geclippt)   ↔    │  (Hintergrund)
│                                 │
│  "Vorher" │        │ "Nachher" │
│   Label   │        │   Label   │
└─────────────────────────────────┘
```

Die Labels bleiben an der richtigen Position (links "Vorher", rechts "Nachher").

---

## Zusammenfassung der Änderungen

| Datei | Zeilen | Änderung |
|-------|--------|----------|
| `src/lib/constants.ts` | 3 | WHATSAPP_MESSAGE aktualisieren |
| `src/components/sea/SEAPainPoints.tsx` | 1-17, 49-136 | Imports + State + Mobile Carousel |
| `src/components/sections/BeforeAfterSection.tsx` | 79-98 | Bild-URLs und Kommentare tauschen |

---

## Erwartetes Ergebnis

1. **WhatsApp**: Alle Buttons öffnen `https://wa.me/491603080676?text=Hallo%20liebes%20R%C3%A4umzwerge-Team%2C%20ich%20komme%20von%20euerer%20Website.`

2. **Pain-Points Mobile**: Horizontales Swipe-Carousel mit 85% Card-Breite (Peek-Effekt) und animierten Dot-Indicators

3. **Before/After Slider**: Links = Vorher (unordentlich), Rechts = Nachher (sauber)

