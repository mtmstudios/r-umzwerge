
# Smoother Timeline Animation + Linie hinter Karten

## Betroffene Seiten

Die Änderungen wirken auf **alle Seiten**, da sie die gemeinsame Komponente nutzen:

| Seite | Komponente |
|-------|------------|
| Homepage `/` | `ProcessSection.tsx` |
| Service-Seiten `/entruempelung`, `/haushaltsaufloesung`, etc. | `ServiceProcess.tsx` |
| City-Seiten `/ulm`, `/muenchen`, `/augsburg`, etc. | `ServiceProcess.tsx` |

---

## Probleme & Lösungen

| Problem | Lösung |
|---------|--------|
| Fortschrittslinie scheint durch die Karten | Linie auf `z-0`, Karten-Container auf `z-10`, Karten bekommen Hintergrund-Abdeckung |
| Animation zu abrupt/schnell | Längerer Scroll-Bereich (40% statt 20%) + Easing-Kurve |
| Nicht komplett bei Section-Ankunft | Timeline erreicht 100% wenn Section im Viewport-Zentrum |

---

## Technische Änderungen

### 1. `src/hooks/useTimelineProgress.ts`

**Smootherer Scroll-Bereich:**

```typescript
// Vorher: Zu kurzer Bereich (20%)
const scrollStart = windowHeight * 0.7;
const scrollEnd = windowHeight * 0.5;

// Nachher: Längerer, sanfterer Bereich (40%)
const scrollStart = windowHeight * 0.85;  // Früher starten
const scrollEnd = windowHeight * 0.45;    // Später enden
```

**Easing-Funktion für natürliche Bewegung:**

```typescript
// Smooth ease-in-out-quad
const easedProgress = rawProgress < 0.5
  ? 2 * rawProgress * rawProgress
  : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
```

---

### 2. `src/components/ui/HorizontalTimeline.tsx`

**Progress-Bar hinter die Karten (z-index Fix):**

```tsx
// Vorher:
<div className="absolute top-[60px] ... z-0 h-1 ...">

// Nachher:
<div className="absolute top-[60px] ... -z-10 h-1 ...">
```

**Karten-Container mit höherem z-index:**

```tsx
// Vorher:
<div className="grid md:grid-cols-3 ...">

// Nachher:
<div className="relative z-10 grid md:grid-cols-3 ...">
```

**Hintergrund-Abdeckung für Karten-Icons:**

```tsx
// In StepCard - Circle bekommt Pseudo-Element das die Linie verdeckt
<div className={cn(
  'relative z-10 w-24 h-24 ... rounded-2xl',
  // NEU: Hintergrund der die Linie verdeckt
  'before:absolute before:inset-[-4px] before:-z-10 before:bg-secondary/30 before:rounded-3xl'
)}>
```

**Smoothere CSS-Transitions:**

```tsx
// Progress-Bar mit längerer Animation
className="... transition-all duration-500 ease-out"

// Karten mit gestaffelter Einblendung (optional)
style={{ transitionDelay: `${index * 100}ms` }}
```

---

## Visuelles Ergebnis

```text
Scroll-Fortschritt:    0%      25%      50%      75%     100%
                       ▼        ▼        ▼        ▼        ▼
Progress-Bar:         [      ][====   ][======= ][========][=========]
                              ↑ sanfter Start    ↑ smooth Ende
                                (eased)

Layering (Seitenansicht):
┌─────────────────────────────────────────┐
│  Karten (z-10)        ┌─┐  ┌─┐  ┌─┐    │
│                       │1│  │2│  │3│    │
│                       └─┘  └─┘  └─┘    │
│  ─────────────────────────────────────  │ ← Linie (z-0) HINTER Karten
│  Hintergrund-Abdeckung (before pseudo)  │
└─────────────────────────────────────────┘
```

---

## Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `src/hooks/useTimelineProgress.ts` | Längerer Scroll-Range (85% → 45%), Easing-Funktion |
| `src/components/ui/HorizontalTimeline.tsx` | z-index Layering, Hintergrund-Abdeckung, smoothere Transitions |

---

## Ergebnis auf allen Seiten

Nach der Änderung wirkt die Timeline auf:

- **Homepage** (`/`) - "In 3 Schritten zum freien Raum"
- **Entrümpelung** (`/entruempelung`) - "So läuft's ab"
- **Haushaltsauflösung** (`/haushaltsaufloesung`) - "So läuft's ab"
- **Messiewohnung** (`/messiewohnung-entruempeln`) - "So läuft's ab"
- **Ulm** (`/ulm`) - "So läuft's ab"
- **München** (`/muenchen`) - "So läuft's ab"
- **Alle anderen City-Seiten** - "So läuft's ab"

Die Animation wird überall:
- Sanfter und länger aufgebaut
- Die Linie bleibt hinter den Karten unsichtbar
- Bei Erreichen der Section ist alles vollständig sichtbar
