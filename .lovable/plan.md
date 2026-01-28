

## Header minimieren

Der Header wird drastisch verkleinert - von den aktuell riesigen 384px (Desktop) auf eine kompakte, professionelle Groesse.

---

## Aktuelle Situation (nach 6x-Vergroesserung)

| Viewport | Logo-Hoehe | Container |
|----------|------------|-----------|
| Mobile | `h-12` (48px) | 64px |
| Tablet | `sm:h-14` (56px) | 64px |
| Desktop | `lg:h-96` (384px) | 420px (SEA) |

---

## Neue minimierte Groessen

Das Logo wird auf eine schlanke, moderne Header-Groesse reduziert:

| Viewport | Logo-Hoehe | Groesse in px |
|----------|------------|---------------|
| Mobile | `h-8` | 32px |
| Tablet | `sm:h-9` | 36px |
| Desktop | `lg:h-10` | 40px |

Dies entspricht einer Reduzierung um den **Faktor 9.6** auf Desktop (von 384px auf 40px).

---

## Technische Aenderungen

### Header.tsx (Zeile 59)

```tsx
// Vorher:
className="h-12 sm:h-14 lg:h-96 w-auto object-contain ..."

// Nachher:
className="h-8 sm:h-9 lg:h-10 w-auto object-contain ..."
```

### SEAMinimalHeader.tsx

**Container-Hoehe (Zeile 10):**
```tsx
// Vorher:
<div className="flex items-center justify-between h-16 lg:h-[420px]">

// Nachher:
<div className="flex items-center justify-between h-12 lg:h-14">
```

**Logo-Hoehe (Zeile 21):**
```tsx
// Vorher:
className="h-12 sm:h-14 lg:h-96 w-auto object-contain ..."

// Nachher:
className="h-8 sm:h-9 lg:h-10 w-auto object-contain ..."
```

---

## Visueller Vergleich

```text
VORHER (Desktop):
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│   [████████████████████████████████████████████████]   │  384px Logo
│   [████████  RÄUMZWERGE - RIESIG  ██████████████████]   │
│   [████████████████████████████████████████████████]   │
│                                                         │
│                                                   [CTA] │
└─────────────────────────────────────────────────────────┘

NACHHER (Desktop):
┌─────────────────────────────────────────────────────────┐
│ [🏠 Räumzwerge]    Nav | Nav | Nav              [CTA]  │  40px Logo
└─────────────────────────────────────────────────────────┘
```

---

## Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/layout/Header.tsx` | Logo von `h-12 sm:h-14 lg:h-96` auf `h-8 sm:h-9 lg:h-10` |
| `src/components/sea/SEAMinimalHeader.tsx` | Container von `h-16 lg:h-[420px]` auf `h-12 lg:h-14`, Logo anpassen |

