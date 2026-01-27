
# Plan: Bilder-Problem beheben (IntersectionObserver Bug)

## Problem-Analyse

Das Problem ist NICHT die Bildformate - die Bilder werden korrekt geladen (Status 200). Das Problem liegt beim **IntersectionObserver** in Kombination mit responsiven Layouts.

### Ursache

In der `HeroSection.tsx` (und wahrscheinlich anderen Komponenten):

```typescript
// Zeile 35-41: Mobile Layout hat das ref
<div
  ref={ref}  // <-- IntersectionObserver beobachtet DIESES Element
  className="xl:hidden ..."  // <-- Auf Desktop AUSGEBLENDET!
>
```

```typescript
// Zeile 95-100: Desktop Layout nutzt isVisible, hat aber KEIN ref
<div
  className="hidden xl:grid ..."  // <-- Auf Desktop SICHTBAR
  // KEIN ref hier!
>
```

**Auf Desktop (1280px+):**
- Das Element mit dem `ref` ist durch `xl:hidden` versteckt
- Der IntersectionObserver kann versteckte Elemente nicht beobachten
- `isVisible` bleibt `false`
- Beide Layouts behalten `opacity: 0` (unsichtbar)

---

## Loesung

Das `ref` muss auf einem **immer sichtbaren Container** platziert werden, nicht auf einem responsiv ausgeblendeten Element.

### Betroffene Komponenten

1. `src/components/sections/HeroSection.tsx`
2. `src/components/services/ServiceHero.tsx`
3. Moeglicherweise weitere Komponenten mit demselben Pattern

### Aenderungen pro Datei

#### 1. HeroSection.tsx

**Aktuell (fehlerhaft):**
```tsx
return (
  <section className="relative overflow-hidden">
    ...
    <div className="container-custom relative">
      <div
        ref={ref}  // ref auf Mobile-only Container
        className="xl:hidden ..."
      >
        ...
      </div>
      
      <div
        className="hidden xl:grid ..."  // kein ref
      >
        ...
      </div>
    </div>
  </section>
);
```

**Korrigiert:**
```tsx
return (
  <section ref={ref} className="relative overflow-hidden">  // ref auf Section
    ...
    <div className="container-custom relative">
      <div
        className={cn(
          "xl:hidden ...",
          "scroll-reveal",
          isVisible && "visible"
        )}
      >
        ...
      </div>
      
      <div
        className={cn(
          "hidden xl:grid ...",
          "scroll-reveal",
          isVisible && "visible"
        )}
      >
        ...
      </div>
    </div>
  </section>
);
```

Das `ref` wird auf das `<section>` Element verschoben, das IMMER sichtbar ist (unabhaengig vom Breakpoint).

#### 2. ServiceHero.tsx

Dieselbe Korrektur: `ref` auf das `<section>` Element verschieben.

---

## Technische Details

| Datei | Aenderung |
|-------|-----------|
| `src/components/sections/HeroSection.tsx` | `ref` von Mobile-div auf `<section>` verschieben |
| `src/components/services/ServiceHero.tsx` | `ref` von Mobile-div auf `<section>` verschieben |

### Code-Aenderungen

**HeroSection.tsx - Zeile 19:**
```tsx
// Alt:
<section className="relative overflow-hidden">

// Neu:
<section ref={ref} className="relative overflow-hidden">
```

**HeroSection.tsx - Zeile 35-36:**
```tsx
// Alt:
<div
  ref={ref}
  className={cn(...)}
>

// Neu:
<div
  className={cn(...)}  // ref entfernt
>
```

**ServiceHero.tsx - analog:**
```tsx
// ref auf <section> verschieben
// ref aus Mobile-Container entfernen
```

---

## Zusaetzlich: WebP-Bilder in SEABeforeAfter

Die Datei `src/components/sea/SEABeforeAfter.tsx` referenziert noch `.webp` Bilder:
- `/images/messie-nachher.webp`
- `/images/messie-vorher.webp`

Diese Bilder existieren **NUR als WebP** (keine JPG-Alternativen vorhanden). Falls diese nicht geladen werden, muessen entweder:
1. JPG-Versionen der Bilder hinzugefuegt werden, oder
2. Die WebP-Referenzen beibehalten werden (WebP wird von modernen Browsern unterstuetzt)

Da die messie-webp Bilder im Network-Log mit Status 200 geladen werden, ist dies kein Problem.

---

## Zusammenfassung

| Aufgabe | Beschreibung |
|---------|--------------|
| **Fix IntersectionObserver** | `ref` auf immer sichtbare Container verschieben |
| **Betroffene Dateien** | HeroSection.tsx, ServiceHero.tsx |
| **Aenderungsumfang** | 2 Dateien, minimale Code-Aenderungen |
| **Erwartetes Ergebnis** | Alle Sections werden sichtbar, scroll-reveal funktioniert |

