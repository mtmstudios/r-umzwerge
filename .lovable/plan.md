

# Plan: Sanfte Bounce-Animation für Timeline-Schritte

## Ziel

Wenn ein Schritt im Prozess-Timeline aktiviert wird (durch Scrollen), soll eine sanfte Bounce-Animation das Element kurz "aufspringen" lassen. Dies verstärkt die visuelle Rückmeldung und macht die Interaktion lebendiger.

## Design-Vorschau

```text
Scroll-Aktivierung eines Schritts:

    ┌─────────┐
    │    📸   │  ← Normale Größe (scale: 1.0)
    │         │
    └─────────┘
         ↓
    ┌───────────┐
    │     📸    │  ← Bounce nach oben (scale: 1.15)
    │           │
    └───────────┘
         ↓
    ┌──────────┐
    │    📸    │  ← Zurück + leicht kleiner (scale: 1.05)
    │          │
    └──────────┘
         ↓
    ┌──────────┐
    │    📸    │  ← Finale Größe (scale: 1.1)
    │          │
    └──────────┘
```

## Dateien die geändert werden

| Datei | Aktion | Beschreibung |
|-------|--------|--------------|
| `src/index.css` | Erweitern | Neue `@keyframes bounce-in` Animation hinzufügen |
| `src/hooks/useTimelineProgress.ts` | Erweitern | `justActivated` Array tracken für Bounce-Trigger |
| `src/components/ui/HorizontalTimeline.tsx` | Anpassen | Bounce-Klasse bei Aktivierung anwenden |

---

## Technische Details

### 1. CSS Keyframes in `index.css`

Eine sanfte Bounce-Animation, die nicht zu aufdringlich ist:

```css
/* Timeline Step Bounce Animation */
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.15);
  }
  60% {
    transform: scale(1.05);
  }
  80% {
    transform: scale(1.12);
  }
  100% {
    transform: scale(1.1);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

Die Animation:
- Dauert 0.5 Sekunden
- Nutzt einen elastischen Easing-Wert für natürliches Gefühl
- Endet bei `scale(1.1)` – passend zum bestehenden `scale-110` für `isCurrent`

### 2. Hook erweitern in `useTimelineProgress.ts`

Der Hook muss tracken, welche Schritte gerade neu aktiviert wurden:

```typescript
export function useTimelineProgress(stepsCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1); // Start bei -1
  const [progress, setProgress] = useState(0);
  const [justActivated, setJustActivated] = useState<number | null>(null);
  const previousActiveStep = useRef(-1);

  useEffect(() => {
    // ... bestehende Scroll-Logik ...
    
    const newActiveStep = Math.min(Math.floor(stepProgress), stepsCount - 1);
    
    // Prüfen ob ein neuer Schritt aktiviert wurde
    if (newActiveStep > previousActiveStep.current) {
      setJustActivated(newActiveStep);
      previousActiveStep.current = newActiveStep;
      
      // Animation-Klasse nach 500ms entfernen
      setTimeout(() => {
        setJustActivated(null);
      }, 500);
    }
    
    setActiveStep(newActiveStep);
  }, [stepsCount]);

  return { containerRef, activeStep, progress, justActivated };
}
```

### 3. Timeline-Komponente anpassen

Die Bounce-Animation nur anwenden, wenn der Schritt gerade aktiviert wurde:

```tsx
export function HorizontalTimeline({ steps, className }: HorizontalTimelineProps) {
  const { containerRef, activeStep, progress, justActivated } = useTimelineProgress(steps.length);

  // ... im Step Circle:
  <div
    className={cn(
      'relative z-10 w-[120px] h-[120px] rounded-3xl flex flex-col items-center justify-center',
      'border-2 transition-colors duration-500',
      isCurrent
        ? 'bg-primary border-primary shadow-lg shadow-primary/30'
        : isActive
        ? 'bg-primary/90 border-primary'
        : 'bg-card border-border',
      // Bounce-Animation nur bei Aktivierung
      justActivated === index && 'animate-bounce-in',
      // Fallback-Scale wenn keine Animation läuft
      isCurrent && justActivated !== index && 'scale-110'
    )}
  >
```

---

## Animations-Timing

| Phase | Zeit | Scale | Beschreibung |
|-------|------|-------|--------------|
| Start | 0ms | 1.0 | Ausgangsgröße |
| Peak | 200ms | 1.15 | Maximale Vergrößerung |
| Settle | 300ms | 1.05 | Leichte Korrektur |
| Finish | 500ms | 1.1 | Finale Größe (= isCurrent scale) |

## Ergebnis

- Jeder Schritt "springt" sanft auf, sobald er durch Scrollen aktiviert wird
- Die Animation ist dezent und passt zum Premium-Design
- Sie läuft nur einmal pro Aktivierung (nicht beim kontinuierlichen Scrollen)
- Nach der Animation bleibt der `scale-110` Zustand erhalten

