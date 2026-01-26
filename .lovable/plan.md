
# Plan: Neue Karte einsetzen

## Was passiert

Die hochgeladene Karte `KARTE-2.svg` wird die aktuelle Karte ersetzen.

## Technische Änderung

**Datei: `public/images/sueddeutschland-map.svg`**

- Die alte Datei wird durch die neue `KARTE-2.svg` ersetzt
- Die ViewBox bleibt identisch (`595.5 x 842.25`)
- Die Stadt-Koordinaten in `InteractiveMap.tsx` bleiben unverändert, da sie auf der gleichen ViewBox basieren

## Ablauf

1. `user-uploads://KARTE-2.svg` → `public/images/sueddeutschland-map.svg` kopieren (überschreiben)

## Nach der Umsetzung

Falls die Städte auf der neuen Karte anders positioniert erscheinen, können wir die Koordinaten feinjustieren.
