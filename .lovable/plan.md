
# Plan: Logo doppelt so groß mit stärkerem Zuschnitt

## Ziel

Das Logo-Bild wird doppelt so groß skaliert, aber der Header behält seine aktuelle Höhe. Durch den stärkeren Overflow-Crop wird das Logo innerhalb des Containers "gezoomt", wodurch es weiter links positioniert erscheint und größer wirkt.

## Aktuelle Werte

| Element | Mobil | Desktop |
|---------|-------|---------|
| Logo-Container | h-20 (80px) | h-24 (96px) |
| Logo-Bild | h-32 (128px) | h-40 (160px) |
| Header-Padding | py-1 / py-0.5 | py-1.5 / py-1 |

## Neue Werte

| Element | Mobil | Desktop |
|---------|-------|---------|
| Logo-Container | h-20 (80px) | h-24 (96px) |
| Logo-Bild | h-64 (256px) | h-80 (320px) |
| Header-Padding | unverändert | unverändert |

Die Bildgröße wird verdoppelt (h-32 auf h-64, h-40 auf h-80), während der Container gleich bleibt.

## Technische Umsetzung

**Datei: `src/components/layout/Header.tsx`**

### Logo-Bild vergrößern (Zeile 41-47)

```tsx
// Vorher:
<div className="h-20 lg:h-24 overflow-hidden flex items-center">
  <img 
    src={logoRaeumzwerge} 
    alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
    className="h-32 lg:h-40 w-auto object-contain object-left"
  />
</div>

// Nachher:
<div className="h-20 lg:h-24 overflow-hidden flex items-center">
  <img 
    src={logoRaeumzwerge} 
    alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
    className="h-64 lg:h-80 w-auto object-contain object-left"
  />
</div>
```

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Logo-Bild von h-32/h-40 auf h-64/h-80 verdoppeln |

## Ergebnis

- Header-Höhe bleibt exakt gleich (~88px mobil / ~108px Desktop)
- Logo erscheint doppelt so groß durch stärkeren Zoom-Effekt
- Stärkerer Zuschnitt zeigt nur den zentralen Teil des Logos
- Logo ist durch `object-left` automatisch weiter links positioniert
- Der sichtbare Bereich des Logos wird kleiner (~31% statt ~62%), zeigt aber den wichtigsten Teil größer
