
# Plan: Header-Höhe reduzieren für kompakteres Design

## Ziel

Die Header-Höhe auf Desktop und Mobil reduzieren, während das Logo weiterhin prominent und gut sichtbar bleibt.

## Aktuelle Werte

| Element | Mobil | Desktop |
|---------|-------|---------|
| Logo-Container | h-32 (128px) | h-40 (160px) |
| Logo-Bild | h-44 (176px) | h-56 (224px) |
| Header-Padding (normal) | py-2 (16px) | py-3 (24px) |
| Header-Padding (scrolled) | py-1 (8px) | py-1 (8px) |
| **Geschätzte Gesamthöhe** | ~144px | ~184px |

## Neue Werte (kompakter)

| Element | Mobil | Desktop |
|---------|-------|---------|
| Logo-Container | h-20 (80px) | h-24 (96px) |
| Logo-Bild | h-32 (128px) | h-40 (160px) |
| Header-Padding (normal) | py-1 (8px) | py-1.5 (12px) |
| Header-Padding (scrolled) | py-0.5 (4px) | py-1 (8px) |
| **Geschätzte Gesamthöhe** | ~88px | ~108px |

## Technische Umsetzung

**Datei: `src/components/layout/Header.tsx`**

### 1. Header-Padding reduzieren (Zeile 32-34)

```tsx
// Vorher:
isScrolled
  ? "glass-strong shadow-lg py-1"
  : "bg-card py-2 lg:py-3"

// Nachher:
isScrolled
  ? "glass-strong shadow-lg py-0.5 lg:py-1"
  : "bg-card py-1 lg:py-1.5"
```

### 2. Logo-Container und Bild verkleinern (Zeile 41-46)

```tsx
// Vorher:
<div className="h-32 lg:h-40 overflow-hidden flex items-center">
  <img 
    src={logoRaeumzwerge} 
    alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
    className="h-44 lg:h-56 w-auto object-contain object-left"
  />
</div>

// Nachher:
<div className="h-20 lg:h-24 overflow-hidden flex items-center">
  <img 
    src={logoRaeumzwerge} 
    alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
    className="h-32 lg:h-40 w-auto object-contain object-left"
  />
</div>
```

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Logo-Container von h-32/h-40 auf h-20/h-24; Logo-Bild von h-44/h-56 auf h-32/h-40; Header-Padding reduzieren |

## Ergebnis

- Header wird ca. 50-75px niedriger auf beiden Gerätetypen
- Logo bleibt prominent durch den Overflow-Crop-Effekt
- Kompakteres, professionelleres Erscheinungsbild
- Mehr Platz für den eigentlichen Seiteninhalt
- Verhältnis Container:Bild bleibt ähnlich (~60% sichtbar)
