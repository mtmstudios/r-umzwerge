

# Plan: Logo weiter nach links positionieren

## Problem

Das Logo erscheint durch die Verdoppelung der Größe zwar größer, aber der `overflow-hidden` Container schneidet das Bild so ab, dass es nicht am linken Rand des Headers beginnt. Es sollte bündig zur linken Kante des Headers sein, um symmetrisch zum "Jetzt anrufen" Button auf der rechten Seite zu wirken.

## Lösung

Ein negativer linker Margin wird auf den Logo-Container angewendet, um das Logo über den normalen Container-Rand hinaus nach links zu verschieben.

## Technische Umsetzung

**Datei: `src/components/layout/Header.tsx`**

### Logo-Container mit negativem Margin (Zeile 40-48)

```tsx
// Vorher:
<a href="/" className="flex items-center group shrink-0">
  <div className="h-20 lg:h-24 overflow-hidden flex items-center">
    <img 
      src={logoRaeumzwerge} 
      alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
      className="h-64 lg:h-80 w-auto object-contain object-left"
    />
  </div>
</a>

// Nachher:
<a href="/" className="flex items-center group shrink-0 -ml-4 lg:-ml-6">
  <div className="h-20 lg:h-24 overflow-hidden flex items-center">
    <img 
      src={logoRaeumzwerge} 
      alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
      className="h-64 lg:h-80 w-auto object-contain object-left"
    />
  </div>
</a>
```

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | `-ml-4 lg:-ml-6` zum Logo-Link hinzufügen |

## Ergebnis

- Logo erscheint weiter links im Header
- Bessere visuelle Balance zum CTA-Button auf der rechten Seite
- Das Logo nutzt den Platz am linken Rand optimal aus
- Header-Höhe und andere Elemente bleiben unverändert

