

## Timeline Carousel Optimierung

Die Mobile-Carousel-Ansicht wird angepasst, damit der erste Schritt zentriert ist und der naechste Schritt teilweise sichtbar eingeblendet wird.

---

## Aktuelle Probleme

1. **Nicht zentriert**: Der negative Margin `-ml-2` auf CarouselContent verschiebt alles nach links
2. **Kein Peek-Effekt**: Der naechste Step ist nicht sichtbar, obwohl `basis-[85%]` gesetzt ist

---

## Loesung

### 1. Carousel-Optionen anpassen

```tsx
<Carousel 
  setApi={setApi}
  opts={{ 
    align: 'center',  // Zentriert den aktiven Slide
    loop: false,
    containScroll: false  // Erlaubt Overflow links/rechts
  }}
  className="w-full"
>
```

### 2. CarouselContent ohne negativen Margin

```tsx
<CarouselContent className="ml-0">  {/* Statt -ml-2 */}
```

### 3. CarouselItem mit Peek-Effekt

```tsx
<CarouselItem 
  key={step.number} 
  className="pl-4 basis-[75%]"  {/* 75% statt 85% = 12.5% Peek auf jeder Seite */}
>
```

### 4. Visueller Hinweis fuer Swipe

Nicht-aktive Slides werden leicht ausgegraut:

```tsx
<StepCard 
  step={step} 
  isActive={true} 
  isCurrent={step.number - 1 === current}  {/* Nur der aktive Slide ist "current" */}
/>
```

---

## Visuelles Ergebnis

```text
Vorher:   |  [Step 1]  | ● ○ ○
                        ↑ Nicht zentriert, kein Peek

Nachher:  [ ] [Step 1] [ ]  ● ○ ○
            ↑           ↑
       Step 3 Peek   Step 2 Peek (ausgegraut)
```

Der Nutzer sieht sofort:
- Links: Leerer Bereich (kein vorheriger Step bei Step 1)
- Mitte: Aktiver Step (voll sichtbar, hervorgehoben)
- Rechts: Naechster Step (teilweise sichtbar, leicht ausgegraut)

---

## Aenderungen

| Zeile | Aenderung |
|-------|-----------|
| 128 | `containScroll: false` hinzufuegen |
| 131 | `-ml-2` entfernen, durch `ml-0` ersetzen |
| 133 | `basis-[85%]` aendern zu `basis-[75%]` |
| 134-135 | `isCurrent` basierend auf `current` State berechnen |

---

## Datei

`src/components/ui/HorizontalTimeline.tsx` - MobileCarousel-Komponente (Zeilen 105-160)

