

## Carousel Performance-Optimierung & Peek-Effekt

Die Mobile-Carousel-Ansicht wird mit GPU-beschleunigten Animationen optimiert und der Peek-Effekt wird visuell verstaerkt.

---

## Aktuelle Situation

Der Code hat bereits `basis-[75%]` und `containScroll: false` - theoretisch sollte der naechste Slide sichtbar sein. Das Problem: Die Karten sind nicht visuell abgegrenzt und die Browser-GPU wird nicht optimal genutzt.

---

## Loesung: 3 Optimierungen

### 1. GPU-Beschleunigung mit will-change

Neue CSS-Klasse in `index.css`:

```css
/* GPU-optimierte Carousel-Animationen */
.carousel-gpu {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### 2. Visueller Peek-Effekt verstaerken

Nicht-aktive Slides werden kleiner und ausgegraut, damit der Swipe-Hinweis offensichtlich ist:

```tsx
// In StepCard: Skalierung basierend auf isCurrent
<div className={cn(
  'transition-all duration-300',
  isCurrent 
    ? 'scale-100 opacity-100' 
    : 'scale-90 opacity-60'  // Peek-Slides sind kleiner + ausgegraut
)}>
```

### 3. Swipe-Hinweis mit Pfeil-Icon

Ein dezenter visueller Hinweis rechts neben der ersten Karte:

```tsx
{current === 0 && (
  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground animate-pulse">
    <ChevronRight className="h-6 w-6" />
  </div>
)}
```

---

## Technische Aenderungen

| Datei | Aenderung |
|-------|-----------|
| `src/index.css` | Neue `.carousel-gpu` Klasse hinzufuegen |
| `src/components/ui/HorizontalTimeline.tsx` | GPU-Klasse anwenden, Peek-Skalierung, optionaler Swipe-Hinweis |

---

## Visuelles Ergebnis

```text
Vorher:   [   Step 1   ] [Step 2 halb]
                         ↑ Gleiche Groesse, kaum erkennbar

Nachher:  [   Step 1   ] [S2]  →
             100%        90% + ausgegraut + Pfeil
```

Der Nutzer sieht sofort:
- Aktiver Step: Volle Groesse, volle Deckkraft
- Naechster Step: Kleiner + ausgegraut = "Da ist noch mehr"
- Optional: Animierter Pfeil bei Step 1

---

## Code-Aenderungen (HorizontalTimeline.tsx)

### MobileCarousel anpassen:

```tsx
<CarouselContent className="ml-0">
  {steps.map((step, index) => (
    <CarouselItem key={step.number} className="pl-4 basis-[75%]">
      <div className={cn(
        "py-4 carousel-gpu transition-all duration-300 ease-out",
        index === current 
          ? "scale-100 opacity-100" 
          : "scale-90 opacity-60"
      )}>
        <StepCard 
          step={step} 
          isActive={true} 
          isCurrent={index === current} 
        />
      </div>
    </CarouselItem>
  ))}
</CarouselContent>
```

### CSS hinzufuegen (index.css):

```css
/* Carousel GPU Optimization for Mobile */
.carousel-gpu {
  will-change: transform, opacity;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
```

