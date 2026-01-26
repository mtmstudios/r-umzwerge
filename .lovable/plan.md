
# Plan: Timeline-Timing Fix & Orange Akzente

## 1. Timeline-Timing korrigieren

### Problem
Der Hook `useTimelineProgress.ts` berechnet den Progress mit falschen Schwellenwerten:
- `scrollStart = windowHeight * 0.8` (80% vom Viewport)
- `scrollEnd = -sectionHeight * 0.3` (30% nach Verlassen)

Das bedeutet: Der letzte Schritt wird erst markiert, wenn die Section fast aus dem Viewport verschwunden ist.

### Lösung
Die Schwellenwerte anpassen, damit alle 3 Schritte abgeschlossen sind, **bevor** man das Ende der Section erreicht:

```typescript
// VORHER (zu langsam)
const scrollStart = windowHeight * 0.8;
const scrollEnd = -sectionHeight * 0.3;

// NACHHER (schneller - alle Schritte während Section im View)
const scrollStart = windowHeight * 0.7;  // Früher starten
const scrollEnd = sectionHeight * 0.2;   // POSITIV = innerhalb der Section enden
```

**Effekt**: Die Timeline ist zu 100% abgeschlossen, wenn die Section noch ca. 20% im Viewport sichtbar ist.

---

## 2. Orange Akzente hinzufügen

### Aktuelle Situation
Die `cta`-Farbe (Orange #FF8A3D) ist definiert, wird aber nur beim Hover des "Anrufen"-Buttons verwendet.

### Elemente für Orange-Akzente

| Element | Änderung |
|---------|----------|
| **Timeline Nummern-Badge** | `bg-accent` → `bg-cta` für aktiven Step |
| **Timeline Progress-Bar** | `from-primary via-accent to-primary` → `from-cta via-accent to-cta` |
| **Pricing CTA-Card** | Orangener Akzent-Rahmen oder Glow |
| **Services-Karten Hover** | Dezenter orange Glow statt grün |
| **Trust Pills Icons** | Einige Icons orange statt nur grün |

### Konkrete Änderungen in HorizontalTimeline.tsx

```tsx
// Number Badge - Aktiver Step
isCurrent
  ? 'bg-cta text-cta-foreground scale-110'
  : isActive
  ? 'bg-cta/80 text-cta-foreground'
  : 'bg-muted text-muted-foreground'

// Progress Bar
className="bg-gradient-to-r from-cta via-accent to-cta rounded-full"
```

### Optionale Erweiterungen

**In ProcessSection.tsx (Haupt-Timeline):**
- WhatsApp-Button hat schon grün → Orange-Akzent auf den Timeline-Karten als Kontrast

**In BentoCard.tsx (Services-Karten):**
- Hover-Glow von `accent` → `cta` für wärmeren Look

**In TrustBar.tsx:**
- Alternierende Icons: Manche grün (`accent`), manche orange (`cta`)

---

## Dateien zu ändern

| Datei | Änderung |
|-------|----------|
| `src/hooks/useTimelineProgress.ts` | Scroll-Timing anpassen (früher abschließen) |
| `src/components/ui/HorizontalTimeline.tsx` | Orange Nummern-Badges & Progress-Bar |
| `src/components/sections/ProcessSection.tsx` | Optional: Orange-Akzent im CTA-Bereich |
| `src/components/ui/BentoCard.tsx` | Optional: Orange Hover-Glow |

---

## Technische Details

### useTimelineProgress.ts (Zeilen 21-22)

```typescript
// Früher starten (bei 70% Sichtbarkeit) und früher enden (noch 20% im View)
const scrollStart = windowHeight * 0.7;
const scrollEnd = sectionHeight * 0.2;  // Positiv = innerhalb der Section
```

### HorizontalTimeline.tsx (Zeilen 57-65)

```tsx
<span
  className={cn(
    'absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
    isCurrent
      ? 'bg-cta text-cta-foreground scale-110 shadow-cta'
      : isActive
      ? 'bg-cta/80 text-cta-foreground'
      : 'bg-muted text-muted-foreground'
  )}
>
```

### HorizontalTimeline.tsx (Zeilen 23-27)

```tsx
<div
  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cta via-accent to-cta rounded-full transition-all duration-300 ease-out"
  style={{ width: `${progress * 100}%` }}
/>
```

---

## Ergebnis

1. **Besseres Timing**: Alle 3 Timeline-Schritte sind markiert, bevor man zur nächsten Section scrollt
2. **Konsistente Orange-Akzente**: Der warme CTA-Farbton taucht auf mehreren Elementen auf
3. **Visueller Zusammenhalt**: Orange verbindet Call-to-Actions (Anrufen, Timeline-Badges)
4. **Professioneller Look**: Durchdachtes Farbkonzept statt nur Grün-Dominanz
