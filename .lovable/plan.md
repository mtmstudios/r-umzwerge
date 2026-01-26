

# Plan: Timeline-Animation früher abschließen

## Problem

Die Scroll-Animation der Prozess-Schritte (HorizontalTimeline) wird erst abgeschlossen, wenn die Section fast komplett aus dem Viewport gescrollt ist. Der Nutzer muss zu weit scrollen, bis alle 3 Schritte aktiviert sind.

## Aktuelle Konfiguration

```typescript
const scrollStart = windowHeight * 0.7;  // Animation beginnt bei 70% Sichtbarkeit
const scrollEnd = sectionHeight * 0.2;   // Animation endet bei 20% Rest-Sichtbarkeit
```

## Lösung

Die Animation soll früher abgeschlossen sein – idealerweise wenn die Section etwa zur Hälfte sichtbar ist:

```typescript
const scrollStart = windowHeight * 0.8;  // Animation beginnt früher (80% Sichtbarkeit)
const scrollEnd = sectionHeight * 0.6;   // Animation endet früher (wenn noch 60% sichtbar)
```

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/hooks/useTimelineProgress.ts` | `scrollStart` und `scrollEnd` Werte anpassen |

## Technische Details

### Vorher vs. Nachher

| Parameter | Vorher | Nachher | Effekt |
|-----------|--------|---------|--------|
| `scrollStart` | `windowHeight * 0.7` | `windowHeight * 0.8` | Animation startet etwas früher |
| `scrollEnd` | `sectionHeight * 0.2` | `sectionHeight * 0.6` | Animation endet deutlich früher |

### Berechnung

Die Änderung von `0.2` auf `0.6` bei `scrollEnd` bedeutet:
- **Vorher**: Animation ist fertig, wenn nur noch 20% der Section sichtbar sind
- **Nachher**: Animation ist fertig, wenn noch 60% der Section sichtbar sind

Das verkürzt den Scroll-Bereich erheblich – alle 3 Schritte sind aktiviert, während der Nutzer die Timeline noch gut sehen kann.

## Ergebnis

- Alle 3 Schritte sind aktiviert, während die Section noch prominent im Viewport ist
- Bessere User Experience – der Nutzer sieht die komplette Animation ohne exzessives Scrollen
- Die Progress-Bar füllt sich schneller

