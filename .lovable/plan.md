
# Plan: Logo noch größer machen

## Änderung

**Datei: `src/components/layout/Header.tsx`**

Die Logo-Höhe wird weiter erhöht:

| Breakpoint | Aktuell | Neu |
|------------|---------|-----|
| Mobile | h-14 (56px) | h-20 (80px) |
| Desktop (lg:) | h-20 (80px) | h-28 (112px) |

```tsx
// Zeile 43 - Vorher:
className="h-14 lg:h-20 w-auto"

// Nachher:
className="h-20 lg:h-28 w-auto"
```

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Logo-Höhe auf h-20 / lg:h-28 setzen |

## Ergebnis

- Logo fast doppelt so groß wie aktuell
- Mobile: 80px Höhe
- Desktop: 112px Höhe
