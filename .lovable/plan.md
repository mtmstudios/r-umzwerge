
# Plan: Logo zuschneiden für kompakten Header

## Ziel

Das Logo soll größer dargestellt werden, aber der Header soll eine feste kompakte Höhe haben. Überstehende Teile des Logos werden abgeschnitten (zentriert).

## Technische Umsetzung

### Datei: `src/components/layout/Header.tsx`

1. **Logo-Container mit fixer Höhe und overflow:hidden**
   - Ein Container um das Logo begrenzt die Höhe und schneidet überstehende Bereiche ab
   - Das Logo selbst wird größer als der Container, sodass es zugeschnitten wird

2. **Logo-Klassen anpassen**
   - Das Logo wird mit `object-contain` und `scale` vergrößert, während der Container es beschneidet

```text
Vorher (Zeile 40-46):
┌─────────────────────────────────┐
│ <a href="/" ...>                │
│   <img className="h-20 lg:h-28" │
│        ... />                   │
│ </a>                            │
└─────────────────────────────────┘

Nachher:
┌───────────────────────────────────────────────────────┐
│ <a href="/" className="...">                          │
│   <div className="h-14 lg:h-16 overflow-hidden ...">  │  ← Container begrenzt Höhe
│     <img className="h-20 lg:h-28 object-contain" />   │  ← Logo ist größer
│   </div>                                              │
│ </a>                                                  │
└───────────────────────────────────────────────────────┘
```

### Konkrete Code-Änderung

```tsx
// Zeile 40-46 - Vorher:
<a href="/" className="flex items-center group">
  <img 
    src={logoRaeumzwerge} 
    alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
    className="h-20 lg:h-28 w-auto"
  />
</a>

// Nachher:
<a href="/" className="flex items-center group">
  <div className="h-14 lg:h-16 overflow-hidden flex items-center">
    <img 
      src={logoRaeumzwerge} 
      alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
      className="h-24 lg:h-32 w-auto object-contain"
    />
  </div>
</a>
```

### Header-Padding anpassen (optional)

```tsx
// Zeile 32-34 - Vorher:
isScrolled
  ? "glass-strong shadow-lg py-2"
  : "bg-card py-3 lg:py-4"

// Nachher (kompakter):
isScrolled
  ? "glass-strong shadow-lg py-1"
  : "bg-card py-2 lg:py-3"
```

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Logo-Container mit fixer Höhe (h-14/lg:h-16) + overflow:hidden; Logo selbst größer (h-24/lg:h-32) für Crop-Effekt; Header-Padding leicht reduziert |

## Ergebnis

- Header bleibt kompakt mit ca. 72px (mobil) / 88px (Desktop) Gesamthöhe
- Logo erscheint größer und prominenter
- Überstehende Logo-Ränder werden zentriert abgeschnitten
- Sauberes, professionelles Erscheinungsbild
