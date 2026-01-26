

# Plan: Karten-Sektion radikal vereinfachen

## Neues Design-Konzept

Die Karte wird zur Hauptattraktion – minimalistisch, klar und professionell:

- **Volle Breite**: Karte zentriert ohne Sidebar
- **Einfache Marker**: Punkt + Stadtname direkt auf der Karte
- **Verlinkbar**: Jeder Stadtname ist klickbar für spätere Regions-Seiten
- **Keine Animation**: Statische, elegante Punkte ohne Puls-Chaos

## Änderungen im Detail

### 1. RegionsSection.tsx – Layout vereinfachen

**Vorher**: 2-Spalten Grid (Karte links, Text/Cards rechts)
**Nachher**: Nur Karte, zentriert, maximale Breite

```text
┌──────────────────────────────────────────────┐
│           Überschrift (zentriert)            │
│         Untertitel (zentriert)               │
├──────────────────────────────────────────────┤
│                                              │
│           ┌────────────────────┐             │
│           │                    │             │
│           │    KARTE           │             │
│           │    (volle Breite)  │             │
│           │                    │             │
│           │  • Stuttgart       │             │
│           │       • Ulm        │             │
│           │            • München│             │
│           └────────────────────┘             │
│                                              │
│       "Weitere Orte auf Anfrage"             │
└──────────────────────────────────────────────┘
```

- Komplette rechte Spalte entfernen (Region-Buttons, Cards)
- Karte in max-w-4xl Container zentrieren
- Kurzer Hinweistext darunter optional

### 2. InteractiveMap.tsx – Komplett überarbeiten

**Entfernen**:
- Legende (Hauptsitz/Standort)
- PulseDot Komponente
- MapTooltip Komponente
- Hover-State-Logik

**Neu**:
- Einfache Kreise als Marker (statisch, keine Animation)
- Stadtname als klickbarer Text neben dem Punkt
- Alle Marker in einheitlicher Farbe (Primary oder Accent)

```typescript
// Neuer Ansatz pro Stadt:
<g>
  {/* Einfacher Punkt */}
  <circle cx={x} cy={y} r="6" className="fill-primary" />
  
  {/* Stadtname als Link */}
  <a href={`/region/${slug}`}>
    <text x={x + 12} y={y + 4} className="text-sm fill-foreground">
      {name}
    </text>
  </a>
</g>
```

### 3. Stadt-Koordinaten anpassen

Die Koordinaten müssen zur tatsächlichen Karte passen. Da die ViewBox `595.5 x 842.25` ist:

```typescript
const cityCoordinates = {
  stuttgart:   { x: 120, y: 200 },
  reutlingen:  { x: 150, y: 260 },
  aalen:       { x: 200, y: 180 },
  heidenheim:  { x: 230, y: 220 },
  ulm:         { x: 260, y: 280 },
  augsburg:    { x: 350, y: 300 },
  muenchen:    { x: 450, y: 350 },
  ravensburg:  { x: 200, y: 400 },
};
```

*Diese Werte werden nach der Implementierung basierend auf der tatsächlichen Karte feinjustiert.*

### 4. Nicht mehr benötigte Dateien

Diese Komponenten werden nicht mehr verwendet:
- `src/components/regions/PulseDot.tsx` – wird ersetzt durch einfachen Circle
- `src/components/regions/MapTooltip.tsx` – nicht mehr nötig

## Dateien die geändert werden

| Datei | Aktion |
|-------|--------|
| `src/components/sections/RegionsSection.tsx` | Sidebar entfernen, Layout vereinfachen |
| `src/components/regions/InteractiveMap.tsx` | Komplett neu: einfache Marker + Stadtnamen |
| `src/components/regions/PulseDot.tsx` | Kann gelöscht werden (optional behalten) |
| `src/components/regions/MapTooltip.tsx` | Kann gelöscht werden (optional behalten) |

## Ergebnis

- Saubere, minimalistische Kartenanzeige
- Jede Stadt hat einen Punkt + lesbaren Namen
- Stadtnamen sind als Links vorbereitet (`/region/[slug]`)
- Keine störenden Animationen
- Professionelles, ruhiges Erscheinungsbild

