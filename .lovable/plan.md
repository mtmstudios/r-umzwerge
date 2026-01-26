

# Fix: TrustBar Trennzeichen auf Pipe-Symbol

## Problem

Du hast recht! Das Trennzeichen soll ein **senkrechter Strich `|`** sein (gerade von oben nach unten), nicht ein Punkt `·` oder ein waagerechter Strich `–`.

## Lösung

**Datei: `src/components/sections/TrustBar.tsx` (Zeile 33)**

```tsx
// VORHER (Middle Dot)
<span className="text-accent text-lg">·</span>

// NACHHER (Pipe-Symbol - senkrechter Strich)
<span className="text-accent text-lg">|</span>
```

## Ergebnis

Das Trennzeichen in der TrustBar wird dann ein gerader senkrechter Strich `|` von oben nach unten sein.

