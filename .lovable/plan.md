
# Plan: Logo noch weiter vergrößern

## Änderung

**Datei: `src/components/layout/Header.tsx`**

Container und Logo-Höhe werden weiter erhöht:

| Element | Aktuell | Neu |
|---------|---------|-----|
| Container | h-24 lg:h-28 | h-28 lg:h-32 |
| Logo-Bild | h-40 lg:h-56 | h-48 lg:h-64 |

```tsx
// Zeile 41-46 - Vorher:
<div className="h-24 lg:h-28 overflow-hidden flex items-center">
  <img 
    src={logoRaeumzwerge} 
    alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
    className="h-40 lg:h-56 w-auto object-contain"
  />
</div>

// Nachher:
<div className="h-28 lg:h-32 overflow-hidden flex items-center">
  <img 
    src={logoRaeumzwerge} 
    alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
    className="h-48 lg:h-64 w-auto object-contain"
  />
</div>
```

## Ergebnis

- Container: 112px (mobil) / 128px (Desktop)
- Logo-Bild: 192px (mobil) / 256px (Desktop)
- Logo wird noch prominenter mit mehr sichtbarem Detail
