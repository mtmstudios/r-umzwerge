

# Plan: SVG-Divider durch Gradient-Fade ersetzen

## Analyse des Problems

Der aktuelle `SectionDivider` vor der BeforeAfterSection verwendet `variant="curve"` mit `fillClassName="fill-muted"`. Da beide Sektionen (PricingSection und BeforeAfterSection) ähnliche helle Hintergrundfarben haben, ist der SVG-Kurven-Divider kaum sichtbar.

**Farbübergänge aktuell:**
- PricingSection: `bg-background` (Off-White)
- Divider: `fill-muted` (sehr ähnlich)
- BeforeAfterSection: `bg-secondary/30` (helles Grün)

## Lösung: Neuer Gradient-Fade Variant

### 1. SectionDivider-Komponente erweitern

Neuer `gradient`-Variant, der statt SVG einen CSS-Gradienten nutzt:

```text
+--------------------------------------------------+
|  PricingSection (bg-background)                  |
+--------------------------------------------------+
|  ████████████████████████████████████████████    | ← Gradient-Fade
|  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    |   (sanfter Übergang)
|  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    |
+--------------------------------------------------+
|  BeforeAfterSection (bg-secondary/30)            |
+--------------------------------------------------+
```

### 2. Technische Implementierung

**Datei: `src/components/ui/SectionDivider.tsx`**

```tsx
interface SectionDividerProps {
  variant?: 'angle' | 'wave' | 'curve' | 'gradient' | 'glow';  // NEUE Varianten
  direction?: 'up' | 'down';
  className?: string;
  fillClassName?: string;
  fromColor?: string;  // NEU: Start-Farbe für Gradient
  toColor?: string;    // NEU: End-Farbe für Gradient
}
```

**Neue Varianten:**

| Variant | Beschreibung | Use Case |
|---------|-------------|----------|
| `gradient` | Sanfter linearer Farbübergang (40-60px Höhe) | Standard-Sektionswechsel |
| `glow` | Gradient mit subtiler Mittellinie (accent-Farbe) | Akzentuierte Übergänge |

### 3. Änderung in Index.tsx

**Vorher:**
```tsx
<SectionDivider variant="curve" fillClassName="fill-muted" />
<BeforeAfterSection />
```

**Nachher:**
```tsx
<SectionDivider 
  variant="gradient" 
  fromColor="hsl(var(--background))" 
  toColor="hsl(var(--secondary) / 0.3)" 
/>
<BeforeAfterSection />
```

### 4. Alle anderen Divider überprüfen und anpassen

Die anderen SVG-Divider im Projekt können beibehalten oder ebenfalls durch Gradienten ersetzt werden:

| Position | Aktuell | Empfehlung |
|----------|---------|------------|
| TrustBar → Process | curve, fill-background | gradient (für Konsistenz) |
| Process → Services | angle, fill-secondary/30 | beibehalten (sichtbar genug) |
| Services → Pricing | wave, fill-background | gradient |
| **Pricing → BeforeAfter** | curve, fill-muted | **gradient** ✓ |
| BeforeAfter → Reviews | angle, fill-background | gradient |
| Reviews → Regions | wave, fill-secondary/30 | beibehalten |
| Regions → FAQ | curve, fill-background | gradient |
| FAQ → FinalCTA | angle, fill-primary | beibehalten (starker Kontrast) |

---

## Zusammenfassung der Änderungen

| Datei | Änderung |
|-------|----------|
| `src/components/ui/SectionDivider.tsx` | Neue `gradient` und `glow` Varianten hinzufügen |
| `src/pages/Index.tsx` | Unsichtbare Divider durch `variant="gradient"` ersetzen |

## Ergebnis

- Sanfte, sichtbare Übergänge zwischen allen Sektionen
- Professionellerer, modernerer Look
- Keine harten Kanten oder unsichtbaren SVGs mehr
- Optional: `glow`-Variant für besondere Akzente (z.B. vor dem FinalCTA)

