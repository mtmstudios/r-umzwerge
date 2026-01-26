

# Plan: Karte korrigieren – Koordinaten + Abstände

## Probleme

1. **Marker außerhalb der Karte**: Die Y-Koordinaten sind zu niedrig. Die SVG hat einen `viewBox` von `0 0 595.5 842.25`, aber der sichtbare Kartenbereich (Bundesländer) liegt zwischen ca. `y: 200` und `y: 700`.

2. **Zu große Abstände**: Die Section hat `py-16 lg:py-24` (64px / 96px) – das ist viel zu viel vertikaler Raum.

## Lösung

### 1. Stadt-Koordinaten komplett neu kalibrieren

Basierend auf dem SVG-Clip-Bereich (`y: 136` bis `y: 776`) müssen die Koordinaten deutlich nach unten verschoben werden:

```typescript
const cityCoordinates = {
  // Baden-Württemberg (linker Teil der Karte)
  stuttgart:   { x: 175, y: 340, labelOffset: { x: -90, y: 5 } },
  reutlingen:  { x: 195, y: 420, labelOffset: { x: -95, y: 5 } },
  aalen:       { x: 265, y: 310, labelOffset: { x: 10, y: -8 } },
  heidenheim:  { x: 285, y: 365, labelOffset: { x: 12, y: 5 } },
  ulm:         { x: 295, y: 430, labelOffset: { x: 12, y: 5 } },
  ravensburg:  { x: 240, y: 560, labelOffset: { x: 12, y: 5 } },
  
  // Bayern (rechter Teil der Karte)
  augsburg:    { x: 390, y: 455, labelOffset: { x: 12, y: 5 } },
  muenchen:    { x: 470, y: 520, labelOffset: { x: 12, y: 5 } },
};
```

Die neuen Werte verschieben alle Punkte um ca. +160-200 auf der Y-Achse, damit sie im sichtbaren Kartenbereich liegen.

### 2. Section-Abstände reduzieren

**Vorher**: `py-16 lg:py-24` (64px / 96px)
**Nachher**: `py-8 lg:py-12` (32px / 48px)

Zusätzlich `mb-12` beim Header auf `mb-6` reduzieren.

### 3. Hover-Animation hinzufügen

Die bereits geplante dezente Hover-Animation wird ebenfalls implementiert:

```tsx
<circle
  cx={coords.x}
  cy={coords.y}
  r="8"
  className="fill-primary transition-all duration-200 group-hover:fill-accent group-hover:scale-125"
  style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
/>
```

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/components/regions/InteractiveMap.tsx` | Neue Koordinaten + Hover-Animation |
| `src/components/sections/RegionsSection.tsx` | Abstände reduzieren |

## Ergebnis

- Alle Marker liegen korrekt auf der Karte
- Deutlich kompaktere vertikale Abstände
- Dezente Hover-Animation auf den Punkten
- Mobile-optimierte Darstellung bleibt erhalten

