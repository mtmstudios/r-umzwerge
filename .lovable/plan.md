

# Plan: Logo-Margin noch weiter nach links

## Ziel

Den negativen linken Margin des Logos vergrößern, damit es noch weiter links im Header erscheint und besser zur rechten CTA-Button-Position passt.

## Aktuelle vs. neue Werte

| Breakpoint | Aktuell | Neu |
|------------|---------|-----|
| Mobil | -ml-4 (-16px) | -ml-8 (-32px) |
| Desktop (lg) | -ml-6 (-24px) | -ml-12 (-48px) |

## Technische Umsetzung

**Datei: `src/components/layout/Header.tsx`**

### Logo-Link Margin anpassen (Zeile 40)

```tsx
// Vorher:
<a href="/" className="flex items-center group shrink-0 -ml-4 lg:-ml-6">

// Nachher:
<a href="/" className="flex items-center group shrink-0 -ml-8 lg:-ml-12">
```

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Margin von `-ml-4 lg:-ml-6` auf `-ml-8 lg:-ml-12` erhöhen |

## Ergebnis

- Logo erscheint doppelt so weit links wie zuvor
- Stärkere visuelle Balance zum rechten CTA-Button
- Alle anderen Header-Elemente bleiben unverändert

