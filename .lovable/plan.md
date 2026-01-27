

# Plan: Logo auf Mobil noch größer machen (h-110)

## Aktuelle Situation

Das Logo verwendet derzeit:
- **Mobil/Tablet**: `h-80` (320px) für das Bild
- **Desktop**: `h-64` (256px) für das Bild

## Problem

Tailwind CSS hat keine Standard-Klasse `h-110`. Die höchste Standard-Höhenklasse ist `h-96` (384px).

## Lösung

Wir verwenden Tailwinds **Arbitrary Value Syntax** mit `h-[27.5rem]` (entspricht 440px, was h-110 wäre).

## Technische Änderungen

### Datei: `src/components/layout/Header.tsx`

**Zeile 56-60 - Bild-Höhe auf Mobil erhöhen:**

| Element | Aktuell | Neu |
|---------|---------|-----|
| Container-Höhe Mobil | `h-24` (96px) | `h-28` (112px) |
| Bild-Höhe Mobil | `h-80` (320px) | `h-[27.5rem]` (440px) |
| Desktop | Unverändert | Unverändert |

```tsx
// Von:
<div className="h-24 lg:h-20 flex items-center">
  <img 
    className="h-80 lg:h-64 ..."
  />
</div>

// Zu:
<div className="h-28 lg:h-20 flex items-center">
  <img 
    className="h-[27.5rem] lg:h-64 ..."
  />
</div>
```

## Ergebnis

- **Mobil/Tablet**: Logo wird ~37% größer (320px → 440px)
- **Desktop**: Bleibt unverändert bei 256px
- Container wächst leicht mit (96px → 112px) um das größere Logo aufzunehmen

