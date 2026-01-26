

# Plan: Mobile Touch-Timeline & Entrümpelung-Kachel Anpassen

## Zwei Änderungen

### 1. Entrümpelung Featured Card - Breite anpassen

**Problem:** Die Entrümpelung-Karte hat `max-w-2xl` (672px), während das Bento-Grid `max-w-4xl` (896px) hat. Dadurch schließt die Karte nicht an den gleichen Rändern ab wie die anderen Kacheln.

**Lösung:** Die innere `max-w-2xl` Container-Klasse auf `max-w-4xl` ändern, damit beide Elemente die gleiche maximale Breite haben und bündig abschließen.

```text
Vorher:
┌────────────────────────────────────────┐ max-w-4xl
│     ┌────────────────────────┐         │
│     │   Wohnungsentrümpelung │ max-w-2xl (zu schmal)
│     └────────────────────────┘         │
├────────────────────────────────────────┤
│ ┌────────────┐    ┌────────────┐       │
│ │  Haushalt  │    │   Keller   │       │ max-w-4xl
│ └────────────┘    └────────────┘       │
└────────────────────────────────────────┘

Nachher:
┌────────────────────────────────────────┐ max-w-4xl
│ ┌────────────────────────────────────┐ │
│ │      Wohnungsentrümpelung          │ │ max-w-4xl (bündig!)
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ ┌────────────┐    ┌────────────┐       │
│ │  Haushalt  │    │   Keller   │       │
│ └────────────┘    └────────────┘       │
└────────────────────────────────────────┘
```

---

### 2. Mobile Touch-Timeline

**Problem:** Auf Mobile scrollt der Nutzer durch die Seite und die Timeline-Animation wird durch Scroll-Position gesteuert. Das fühlt sich auf Touch-Geräten unnatürlich an.

**Lösung:** Auf Mobile (< 768px) wird die Timeline touch-basiert:
- Tippen auf einen Schritt aktiviert ihn direkt
- Swipe links/rechts wechselt zwischen Schritten
- Progress-Bar bleibt, aber wird durch aktiven Schritt berechnet statt durch Scroll

---

## Dateien die geändert werden

| Datei | Aktion | Beschreibung |
|-------|--------|--------------|
| `src/components/sections/ServicesSection.tsx` | Ändern | `max-w-2xl` → `max-w-4xl` für Featured Card |
| `src/hooks/useTimelineProgress.ts` | Erweitern | Mobile-Erkennung + Touch-Handler hinzufügen |
| `src/components/ui/HorizontalTimeline.tsx` | Anpassen | Touch-Events auf Schritt-Circles |

---

## Technische Details

### ServicesSection - Featured Card Breite

Zeile 58 ändern:
```tsx
// Vorher:
<div className="relative max-w-2xl mx-auto">

// Nachher:
<div className="relative max-w-4xl mx-auto">
```

### useTimelineProgress - Mobile Touch-Modus

Der Hook wird erweitert, um auf Mobile zwischen zwei Modi zu wechseln:

```typescript
export function useTimelineProgress(stepsCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [justActivated, setJustActivated] = useState<number | null>(null);
  const previousActiveStep = useRef(-1);
  
  // NEU: Mobile-Erkennung
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // NEU: Touch-Handler für Mobile
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= stepsCount) return;
    
    // Bounce-Animation triggern
    if (stepIndex !== activeStep) {
      setJustActivated(stepIndex);
      setTimeout(() => setJustActivated(null), 500);
    }
    
    setActiveStep(stepIndex);
    setProgress((stepIndex + 1) / stepsCount);
    previousActiveStep.current = stepIndex;
  }, [stepsCount, activeStep]);

  // Scroll-Logik nur auf Desktop
  useEffect(() => {
    if (isMobile) return; // Skip scroll handling on mobile
    
    // ... bestehende Scroll-Logik ...
  }, [stepsCount, isMobile]);

  // NEU: Auf Mobile erster Schritt sofort aktiv
  useEffect(() => {
    if (isMobile && activeStep === -1) {
      goToStep(0);
    }
  }, [isMobile, activeStep, goToStep]);

  return { 
    containerRef, 
    activeStep, 
    progress, 
    justActivated,
    isMobile,     // NEU
    goToStep      // NEU
  };
}
```

### HorizontalTimeline - Touch-Events

Die Komponente bekommt Touch-Handler für die Schritt-Circles:

```tsx
export function HorizontalTimeline({ steps, className }: HorizontalTimelineProps) {
  const { containerRef, activeStep, progress, justActivated, isMobile, goToStep } = 
    useTimelineProgress(steps.length);
  
  // NEU: Swipe-Detection
  const touchStartX = useRef<number>(0);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // Swipe-Threshold: 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → nächster Schritt
        goToStep(activeStep + 1);
      } else {
        // Swipe right → vorheriger Schritt
        goToStep(activeStep - 1);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={cn('relative', className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bar - auch auf Mobile sichtbar, Berechnung angepasst */}
      <div className="absolute top-[60px] left-0 right-0 h-1 bg-border ...">
        <div style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
        {steps.map((step, index) => (
          <div
            key={step.number}
            // NEU: Tap-Handler auf Mobile
            onClick={() => isMobile && goToStep(index)}
            className={cn(
              // NEU: Cursor auf Mobile
              isMobile && 'cursor-pointer',
              // ... bestehende Klassen
            )}
          >
            {/* Step Circle */}
            <div className={cn(
              // ... bestehende Klassen
            )}>
              {/* ... Icon & Number ... */}
            </div>
          </div>
        ))}
      </div>
      
      {/* NEU: Mobile Swipe-Hinweis */}
      {isMobile && (
        <p className="text-center text-sm text-muted-foreground mt-6">
          Tippen oder wischen zum Navigieren
        </p>
      )}
    </div>
  );
}
```

---

## User Experience auf Mobile

| Interaktion | Aktion |
|-------------|--------|
| **Tap auf Schritt** | Aktiviert diesen Schritt direkt mit Bounce-Animation |
| **Swipe links** | Wechselt zum nächsten Schritt |
| **Swipe rechts** | Wechselt zum vorherigen Schritt |
| **Scrollen** | Scrollt normal durch die Seite (keine Timeline-Steuerung) |

---

## Ergebnis

1. **Entrümpelung-Karte**: Schließt jetzt bündig an den gleichen Rändern ab wie das Bento-Grid darunter
2. **Mobile Timeline**: Intuitive Touch-Steuerung statt scroll-basierte Animation – der Nutzer tippt auf Schritte oder wischt zwischen ihnen

