
# Plan: Staggered Fade-In Animation für Dialog-Karten

## Ziel
Die drei Dialog-Karten in der Pain-Points-Section sollen nacheinander animiert eingeblendet werden, wenn sie beim Scrollen sichtbar werden - für einen professionellen, dynamischen Eindruck.

## Animations-Konzept

```text
Zeitlinie beim Scroll-Trigger:
  
  0ms    ─────────────────────────────────────────────────
         │ Karte 1 startet fade-in + slide-up
         
  150ms  ─────────────────────────────────────────────────
         │ Karte 2 startet fade-in + slide-up
         
  300ms  ─────────────────────────────────────────────────
         │ Karte 3 startet fade-in + slide-up
         
  ~600ms ─────────────────────────────────────────────────
         │ Alle Karten vollständig sichtbar
```

## Technische Umsetzung

### Änderungen in `src/components/sea/SEAPainPoints.tsx`

**1. Import des useScrollReveal Hooks (Zeile 1-7):**

```tsx
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { cn } from '@/lib/utils';
import { getWhatsAppLink } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';  // NEU
import type { SEAData } from '@/lib/seaData';
```

**2. Hook in der Komponente verwenden (nach Zeile 15):**

```tsx
export function SEAPainPoints({ data }: SEAPainPointsProps) {
  const isGentle = data.tone === 'gentle';
  const isDirect = data.tone === 'direct';
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);  // NEU
```

**3. Ref am Grid-Container (Zeile 48):**

```tsx
<div 
  ref={sectionRef}  // NEU
  className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
>
```

**4. Staggered Animation auf jeder Card (Zeile 50-57):**

```tsx
<Card
  key={index}
  className={cn(
    "border-none shadow-lg transition-all duration-300",
    "hover:shadow-xl hover:-translate-y-1",
    "hover:shadow-primary/10",
    isGentle ? "bg-background" : "bg-card",
    // NEU: Staggered fade-in animation
    "opacity-0 translate-y-6",
    isVisible && "opacity-100 translate-y-0"
  )}
  style={{
    transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
    transitionProperty: 'opacity, transform',
    transitionDuration: '500ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
  }}
>
```

## Animations-Parameter

| Parameter | Wert | Begründung |
|-----------|------|------------|
| Stagger-Delay | 150ms pro Karte | Schnell genug für Dynamik, langsam genug zum Wahrnehmen |
| Animations-Dauer | 500ms | Snappy aber smooth |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` | "Expo.out" - schneller Start, sanftes Ende |
| Slide-Distanz | 24px (translate-y-6) | Subtil aber spürbar |
| Trigger-Threshold | 0.15 (15% sichtbar) | Früh genug für volle Animation |

## Vorher vs. Nachher

| Aspekt | Vorher | Nachher |
|--------|--------|---------|
| Erscheinung | Alle Karten sofort sichtbar | Karten blenden nacheinander ein |
| Bewegung | Keine | Sanftes Hochgleiten (24px) |
| Timing | - | 0ms, 150ms, 300ms versetzt |
| Trigger | - | Beim ersten Sichtbarwerden (15%) |

## Datei-Änderungen

| Datei | Zeilen | Änderung |
|-------|--------|----------|
| `src/components/sea/SEAPainPoints.tsx` | 7 | Import `useScrollReveal` hinzufügen |
| `src/components/sea/SEAPainPoints.tsx` | 16 | Hook-Aufruf mit `sectionRef` |
| `src/components/sea/SEAPainPoints.tsx` | 48 | `ref={sectionRef}` am Grid |
| `src/components/sea/SEAPainPoints.tsx` | 50-58 | Card-Klassen + style-Prop für Animation |

## Erwartetes Ergebnis

- Karten erscheinen nacheinander mit 150ms Versatz
- Jede Karte gleitet 24px nach oben während des Einblendens
- Animation wird nur einmal ausgelöst (beim ersten Sichtbarwerden)
- Smooth "expo-out" Easing für professionellen Look
- Funktioniert auf allen 3 SEA-Landingpages
