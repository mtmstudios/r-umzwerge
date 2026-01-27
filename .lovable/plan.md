

# Plan: Timeline vollständig scroll-basiert – ohne Wischen

## Ziel

Die Timeline soll auf **allen Geräten** automatisch per Scroll funktionieren. Wenn die Section in der **Mitte des Viewports** ist, muss die Timeline **100% erreicht** haben. Kein manuelles Wischen oder Tippen.

---

## Technische Umsetzung

### Datei 1: `src/hooks/useTimelineProgress.ts`

**Änderungen:**

| Was | Aktion |
|-----|--------|
| `isMobile` State | Entfernen |
| `goToStep` Callback | Entfernen |
| Mobile-Initialisierung (`useEffect` mit `goToStep(0)`) | Entfernen |
| `if (isMobile) return;` Check | Entfernen |
| Scroll-Berechnung | Anpassen für 100% bei Section-Mitte |

**Neue Scroll-Berechnung:**
```typescript
// ALT: Progress über gesamte Section
const scrollStart = windowHeight * 0.8;
const scrollEnd = sectionHeight * 0.6;

// NEU: 100% wenn Section-Mitte im Viewport
const scrollStart = windowHeight * 0.7;
const scrollEnd = windowHeight * 0.5;
```

**Vereinfachter Return:**
```typescript
return { 
  containerRef, 
  activeStep, 
  progress, 
  justActivated
  // isMobile und goToStep werden nicht mehr exportiert
};
```

---

### Datei 2: `src/components/ui/HorizontalTimeline.tsx`

**Entfernen:**

| Element | Grund |
|---------|-------|
| `touchStartX` Ref | Kein Wischen mehr |
| `handleTouchStart` Funktion | Kein Wischen mehr |
| `handleTouchEnd` Funktion | Kein Wischen mehr |
| `onTouchStart` / `onTouchEnd` Props | Kein Wischen mehr |
| `onClick={() => isMobile && goToStep(index)}` | Kein Tippen mehr |
| `cursor-pointer select-none` Klassen | Kein Tippen mehr |
| "Tippen oder wischen" Hint-Text | Obsolet |
| `isMobile` / `goToStep` aus Hook-Import | Nicht mehr benötigt |

---

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/hooks/useTimelineProgress.ts` | Scroll für alle Geräte, schnellerer Progress, vereinfacht |
| `src/components/ui/HorizontalTimeline.tsx` | Touch-Interaktion komplett entfernen |

---

## Ergebnis

Nach dieser Änderung:
- Timeline füllt sich **automatisch beim Scrollen** auf allen Geräten
- **100% Progress bei Section-Mitte** im Viewport
- **Kein Wischen, kein Tippen** erforderlich
- Gleiche User Experience auf Mobile, Tablet und Desktop

