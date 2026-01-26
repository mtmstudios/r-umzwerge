
# Plan: Stadt-Positionen auf der Karte anpassen

## Problemanalyse

Die Karte wurde korrekt eingebunden und zeigt deine hochgeladene SVG. Allerdings sind die Koordinaten der Städte in `cityCoordinates` noch Schätzwerte und müssen an die tatsächlichen geografischen Positionen auf deiner Karte angepasst werden.

## Aktuelle Koordinaten (geschätzt)

Die ViewBox deiner Karte ist `0 0 595.5 842.25`. Die aktuellen Koordinaten:

```
ulm:        { x: 290, y: 380 }
muenchen:   { x: 480, y: 450 }
stuttgart:  { x: 180, y: 320 }
augsburg:   { x: 420, y: 400 }
heidenheim: { x: 280, y: 340 }
aalen:      { x: 250, y: 310 }
reutlingen: { x: 170, y: 380 }
ravensburg: { x: 260, y: 520 }
```

## Lösung

**Datei: `src/components/regions/InteractiveMap.tsx`**

Ich werde die Koordinaten basierend auf der geografischen Lage in Süddeutschland neu berechnen:

- **Stuttgart**: Westen, eher mittig-nord
- **Reutlingen**: Südlich von Stuttgart
- **Aalen**: Östlich von Stuttgart
- **Heidenheim**: Zwischen Aalen und Ulm
- **Ulm** (Hauptsitz): Zentral, am Schnittpunkt
- **Augsburg**: Östlich von Ulm Richtung München
- **München**: Ganz im Osten/Südosten
- **Ravensburg**: Im Süden, Bodensee-Region

### Angepasste Koordinaten (ca. Werte für ViewBox 595.5 x 842.25)

```typescript
const cityCoordinates: Record<string, { x: number; y: number }> = {
  stuttgart:  { x: 140, y: 280 },   // Westen, mittig-nord
  reutlingen: { x: 160, y: 330 },   // Südlich von Stuttgart
  aalen:      { x: 240, y: 260 },   // Östlich von Stuttgart
  heidenheim: { x: 270, y: 300 },   // Zwischen Aalen und Ulm
  ulm:        { x: 290, y: 350 },   // Zentral (Hauptsitz)
  augsburg:   { x: 380, y: 380 },   // Östlich von Ulm
  muenchen:   { x: 480, y: 420 },   // Ganz im Osten
  ravensburg: { x: 240, y: 480 },   // Süden, Bodensee-Region
};
```

## Technische Details

- Die exakten Pixelwerte hängen davon ab, wie die Deutschlandkarte in deiner SVG positioniert ist
- Nach der Implementierung können wir die Positionen bei Bedarf feinjustieren
