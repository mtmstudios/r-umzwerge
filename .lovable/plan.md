

# Plan: Logo deutlich größer machen

## Problem

Nach dem Anwenden von `clip-path: inset(32% 5% 32% 5%)` wird das Logo zwar beschnitten, aber es erscheint immer noch zu klein, weil:
1. Die Bildhöhe nur `h-40` (160px) beträgt
2. Der `clip-path` das Bild visuell verkleinert (schneidet 32% oben/unten ab)
3. Der Container mit `h-16` (64px) sehr kompakt ist

## Lösung

Wir müssen das Bild **stark skalieren** UND gleichzeitig den `clip-path` anwenden, damit das sichtbare Logo den Container ausfüllt.

## Technische Änderungen

### Datei: `src/components/layout/Header.tsx`

**Zeile 55-62 - Logo größer skalieren:**

```tsx
// Von (aktuell):
<a href="/" className="flex items-center justify-center lg:justify-start group shrink-0 lg:-ml-4">
  <div className="h-16 flex items-center">
    <img 
      src={logoRaeumzwerge} 
      alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
      className="h-40 w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
      style={{ clipPath: 'inset(32% 5% 32% 5%)' }}
    />
  </div>
</a>

// Zu (neu):
<a href="/" className="flex items-center justify-center lg:justify-start group shrink-0">
  <div className="h-20 lg:h-24 flex items-center">
    <img 
      src={logoRaeumzwerge} 
      alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
      className="h-64 lg:h-80 w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
      style={{ clipPath: 'inset(30% 5% 30% 5%)' }}
    />
  </div>
</a>
```

### Änderungen im Detail

| Element | Aktuell | Neu | Begründung |
|---------|---------|-----|------------|
| Container-Höhe | `h-16` (64px) | `h-20 lg:h-24` (80px / 96px) | Mehr Platz für größeres Logo |
| Bild-Höhe Mobil | `h-40` (160px) | `h-64` (256px) | +60% größer |
| Bild-Höhe Desktop | `h-40` (160px) | `h-80` (320px) | +100% größer |
| clip-path | `inset(32% 5% 32% 5%)` | `inset(30% 5% 30% 5%)` | Etwas weniger Crop für mehr Logo-Inhalt |
| Desktop-Margin | `lg:-ml-4` | Entfernt | Nicht mehr nötig |

### Wie es funktioniert

```text
Container (h-20 / 80px):
┌──────────────────────────────────────────────┐
│                                              │
│   Bild (h-64 / 256px, aber geclippt):        │
│   ┌────────────────────────────────────┐     │
│   │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← 30% oben abgeschnitten (nicht sichtbar)
│   │                                    │     │
│   │   ╔════════════════════════════╗   │     │
│   │   ║   RÄUMZWERGE LOGO          ║   │ ← Sichtbarer Bereich
│   │   ╚════════════════════════════╝   │     │
│   │                                    │     │
│   │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← 30% unten abgeschnitten (nicht sichtbar)
│   └────────────────────────────────────┘     │
│                                              │
└──────────────────────────────────────────────┘

Das Bild ist 256px hoch, aber durch clip-path werden
oben und unten je 30% (~77px) abgeschnitten.
Sichtbar bleiben ~102px vom mittleren Bereich,
der das eigentliche Logo enthält.
```

## Ergebnis

- Logo erscheint **deutlich größer** auf allen Geräten
- Mobil: ~2x größer als aktuell
- Desktop: ~2.5x größer als aktuell
- Header bleibt mit 80-96px Höhe angenehm kompakt
- Transparente Ränder sind unsichtbar

## Falls immer noch zu klein

Die Werte können weiter angepasst werden:
- **Noch größer:** `h-80 lg:h-96` (Bild) + `h-24 lg:h-28` (Container)
- **Weniger Crop:** `inset(25% 3% 25% 3%)`

