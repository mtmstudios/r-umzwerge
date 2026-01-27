

# Plan: Logo noch größer machen und mehr vom Bild zeigen

## Ziel

Das Logo soll größer werden und mehr vom Originalbild sichtbar sein (weniger Zuschnitt).

## Aktuelle Werte

| Element | Mobil | Desktop |
|---------|-------|---------|
| Logo-Container | h-24 (96px) | h-28 (112px) |
| Logo-Bild | h-40 (160px) | h-56 (224px) |
| **Sichtbarer Anteil** | ~60% | ~50% |

## Neue Werte

| Element | Mobil | Desktop |
|---------|-------|---------|
| Logo-Container | h-32 (128px) | h-40 (160px) |
| Logo-Bild | h-44 (176px) | h-56 (224px) |
| **Sichtbarer Anteil** | ~73% | ~71% |

## Technische Umsetzung

**Datei: `src/components/layout/Header.tsx`**

### Logo-Container und Bild anpassen (Zeile 41-46)

```tsx
// Vorher:
<div className="h-24 lg:h-28 overflow-hidden flex items-center">
  <img 
    src={logoRaeumzwerge} 
    alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
    className="h-40 lg:h-56 w-auto object-contain object-left"
  />
</div>

// Nachher:
<div className="h-32 lg:h-40 overflow-hidden flex items-center">
  <img 
    src={logoRaeumzwerge} 
    alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
    className="h-44 lg:h-56 w-auto object-contain object-left"
  />
</div>
```

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Container von h-24/h-28 auf h-32/h-40; Bild auf h-44/h-56 anpassen |

## Ergebnis

- Container wird deutlich größer (128px mobil / 160px Desktop)
- Mehr vom Logo wird sichtbar (~70% statt ~50-60%)
- Logo erscheint prominenter und vollständiger
- Header-Höhe steigt entsprechend für maximale Logo-Präsenz

