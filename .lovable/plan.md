
# Fix: Timeline-Hintergrund nicht mehr sichtbar

## Erkanntes Problem

Auf dem Screenshot sehe ich:
- Die Karten haben **weiße rechteckige Hintergründe** (`before:bg-background`) die stark auffallen
- Diese Hintergründe sollten NICHT sichtbar sein - sie waren nur gedacht um die Linie zu verdecken
- Die Service-Seiten (`/entruempelung` etc.) haben `bg-secondary/30` aber die Pseudo-Elemente zeigen trotzdem weiß

## Lösung

Die Linie ist bereits mit `-z-10` unter den Karten - wir brauchen das Pseudo-Element gar nicht mehr. Stattdessen bekommt nur der **Icon-Container selbst** einen passenden Hintergrund.

---

## Technische Änderung

### `src/components/ui/HorizontalTimeline.tsx`

**Vorher (Zeile 43-51):**
```tsx
'border-2 transition-all duration-500',
// Hintergrund-Abdeckung die die Timeline-Linie verdeckt
'before:absolute before:inset-[-8px] before:-z-10 before:rounded-3xl',
isCurrent
  ? 'bg-primary border-primary shadow-lg shadow-primary/30 before:bg-background'
  : isActive
  ? 'bg-primary/90 border-primary before:bg-background'
  : 'bg-card border-border before:bg-background',
```

**Nachher - Pseudo-Element entfernt:**
```tsx
'border-2 transition-all duration-500',
isCurrent
  ? 'bg-primary border-primary shadow-lg shadow-primary/30'
  : isActive
  ? 'bg-primary/90 border-primary'
  : 'bg-card border-border',
```

---

## Warum funktioniert das?

Die Timeline-Linie hat bereits `-z-10`:
```tsx
<div className="absolute top-[60px] left-0 right-0 -z-10 h-1 ..." />
```

Und der Karten-Container hat `relative z-10`:
```tsx
<div className="relative z-10 grid md:grid-cols-3 ..." />
```

Dadurch ist die Linie automatisch UNTER den Karten - ohne extra Hintergrund-Abdeckung.

---

## Visuelles Ergebnis

**Vorher:**
```text
┌─────────────────────────────────────────┐
│    ┌──────────┐  ┌──────────┐           │
│    │ ░░░░░░░░ │  │ ░░░░░░░░ │  ← Weißer │
│    │ ░ KARTE ░│  │ ░ KARTE ░│    Block  │
│    │ ░░░░░░░░ │  │ ░░░░░░░░ │           │
│    └──────────┘  └──────────┘           │
│  ─────────────────────────────          │
└─────────────────────────────────────────┘
```

**Nachher:**
```text
┌─────────────────────────────────────────┐
│       ┌────────┐    ┌────────┐          │
│       │  KARTE │    │  KARTE │          │
│       └────────┘    └────────┘          │
│                                         │ ← Kein Block
│  ─────────────────────────────          │    mehr sichtbar
└─────────────────────────────────────────┘
```

---

## Betroffene Seiten

Diese Änderung wirkt automatisch auf:
- Homepage `/` (ProcessSection)
- Alle Service-Seiten (ServiceProcess)
- Alle City-Seiten (ServiceProcess)

---

## Zusammenfassung

| Änderung | Datei |
|----------|-------|
| Pseudo-Element (`before:...`) entfernen | `HorizontalTimeline.tsx` |

Die Linie bleibt durch das korrekte z-index Layering weiterhin hinter den Karten verborgen, aber ohne sichtbaren weißen Hintergrund.
