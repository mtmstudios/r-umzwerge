
# Fix: TrustBar Trennzeichen

## Problem
Im Screenshot sichtbar: Nach "Besenrein" steht ein **–** (En Dash) als Trenner.

Aber bei allen anderen Elementen auf der Seite wird **·** (Middle Dot) verwendet:
- `Foto senden · Preiseinschätzung erhalten`
- `Foto senden · Preis erhalten`

## Lösung

**Datei: `src/components/sections/TrustBar.tsx` (Zeile 33)**

```tsx
// VORHER
<span className="text-accent text-lg">–</span>

// NACHHER
<span className="text-accent text-lg">·</span>
```

## Ergebnis
Das Trennzeichen in der TrustBar ist dann konsistent mit allen anderen "laufenden" Text-Elementen auf der Website.
