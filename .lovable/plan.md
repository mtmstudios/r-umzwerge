

# Plan: Redesign "So einfach geht's" Section + Bild-Fix für Messie

## Zwei Probleme identifiziert

### 1. Messie-Landingpage: Vorher/Nachher-Bilder vertauscht
In `SEABeforeAfter.tsx` (Zeile 84-102) ist die Logik falsch:
- Das "Vorher"-Bild liegt im Hintergrund (volle Breite)
- Das "Nachher"-Bild wird per `clipPath` darüber gelegt

**Problem:** Bei `clipPath: inset(0 ${100 - sliderPosition}% 0 0)` wird von LINKS aufgedeckt. D.h. das "Nachher"-Bild muss links erscheinen, nicht rechts. Aktuell sind die Labels aber umgekehrt positioniert.

**Fix:** Bilder tauschen ODER clipPath-Logik anpassen.

### 2. "So einfach geht's" Section – aktuelles Design

```text
Aktuell (SEAMidCTA.tsx):
┌─────────────────────────────────────────────┐
│              So einfach geht's              │
│                                             │
│   [○]          [○]          [○]            │
│    1            2            3              │
│  Foto        Einschätzung    Termin        │
│  senden      erhalten        machen         │
│                                             │
│         [WhatsApp Button]                   │
│         Lieber anrufen?                     │
└─────────────────────────────────────────────┘

Probleme:
- Alles auf primär-grünem Hintergrund verschmilzt
- Kreise (bg-white/20) heben sich kaum ab
- Nummern (orange) konkurrieren mit Icons
- Layout wirkt altbacken
```

---

## Vorschlag: Drei Design-Optionen

### Option A: Horizontale Timeline (wie Hauptseite)

Verwendet die bestehende `HorizontalTimeline`-Komponente mit scroll-triggered Animationen.

```text
┌─────────────────────────────────────────────┐
│ bg-background (hell)                        │
│              So einfach geht's              │
│                                             │
│   [1]────────────[2]────────────[3]         │
│   Foto          Einschätzung    Besenrein   │
│   senden        in 24h          übergeben   │
│                                             │
│         [WhatsApp Button]                   │
└─────────────────────────────────────────────┘
```

**Vorteile:**
- Konsistent mit Hauptseite
- Scroll-Progress-Animation
- Bereits getestet und optimiert

**Nachteile:**
- Könnte auf Landingpages "zu viel" sein (Scroll-Animation)

---

### Option B: Cards mit Icons (modern, clean)

Drei separate Cards mit subtilen Schatten und Hover-Effekten.

```text
┌─────────────────────────────────────────────┐
│ bg-secondary/30 (sanftes Grün)              │
│              So einfach geht's              │
│                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │    📷    │ │    ⏱️    │ │    ✨    │    │
│  │    1     │ │    2     │ │    3     │    │
│  │  Foto    │ │  Preis   │ │ Besenrein│    │
│  │  senden  │ │  in 24h  │ │ übergeben│    │
│  └──────────┘ └──────────┘ └──────────┘    │
│                                             │
│         [WhatsApp Button]                   │
└─────────────────────────────────────────────┘
```

**Vorteile:**
- Modern, "airy" Design
- Hover-States für Interaktivität
- Staggered Fade-In Animation möglich

**Nachteile:**
- Mehr vertikaler Platz auf Mobile

---

### Option C: Minimalistisch mit Pfeilen (empfohlen)

Inline-Flow mit dezenten Pfeilen, weniger visuelles Gewicht.

```text
┌─────────────────────────────────────────────┐
│ bg-card (weiß) + subtle border              │
│                                             │
│   1. Foto senden  →  2. Preis in 24h  →  3. Besenrein  │
│                                             │
│         [WhatsApp Button groß]              │
└─────────────────────────────────────────────┘
```

**Vorteile:**
- Super clean, schnell erfassbar
- Fokus auf CTA-Button
- Weniger Scroll nötig

**Nachteile:**
- Weniger visuell ansprechend

---

## Empfehlung: Option B (Cards)

Cards passen zum bestehenden Design-System (Glassmorphism, Hover-Effects) und bieten die beste Balance aus visuellem Appeal und Conversion-Fokus.

---

## Technische Umsetzung

### 1. Bild-Fix in SEABeforeAfter.tsx

**Zeile 84-102 ändern:**

```tsx
{/* Before Image (LINKS = wird aufgedeckt) */}
<div className="absolute inset-0">
  <img 
    src="/images/messie-nachher.webp"   // ← TAUSCHEN: Nachher zuerst
    alt="Zimmer nach der Räumung"
    className="w-full h-full object-cover"
  />
</div>

{/* After Image (RECHTS = Basis-Layer) */}
<div
  className="absolute inset-0"
  style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}  // ← ANPASSEN
>
  <img 
    src="/images/messie-vorher.webp"   // ← TAUSCHEN: Vorher als Overlay
    alt="Zimmer vor der Räumung"
    className="w-full h-full object-cover"
  />
</div>
```

**Alternative (einfacher):** Nur die Bild-URLs tauschen.

### 2. SEAMidCTA.tsx Redesign (Option B)

```tsx
// Neues Design mit Cards
<section className="py-12 lg:py-16 bg-secondary/30">
  <div className="container-custom">
    <div className="max-w-4xl mx-auto">
      {/* Headline */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center mb-8 lg:mb-10">
        So einfach geht's
      </h2>

      {/* Process Cards */}
      <div 
        ref={sectionRef}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-10"
      >
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={cn(
                "relative bg-card rounded-2xl p-6 text-center",
                "border border-border shadow-sm",
                "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
                "opacity-0 translate-y-4",
                isVisible && "opacity-100 translate-y-0"
              )}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Number Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
                {step.num}
              </div>
              
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 mt-2 rounded-xl bg-secondary/50 flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              
              {/* Label */}
              <p className="font-semibold text-foreground">{step.label}</p>
            </div>
          );
        })}
      </div>

      {/* CTA Centered */}
      <div className="text-center">
        <Button ... />
        <a href={PHONE_LINK} ...>Lieber anrufen?</a>
      </div>
    </div>
  </div>
</section>
```

---

## Datei-Änderungen

| Datei | Änderung |
|-------|----------|
| `src/components/sea/SEABeforeAfter.tsx` | Zeile 86-102: Bilder tauschen oder clipPath anpassen |
| `src/components/sea/SEAMidCTA.tsx` | Komplett-Redesign mit Card-Layout |

---

## Vorher vs. Nachher Visualisierung

```text
VORHER (SEAMidCTA):
┌───────────────────────────────────┐
│  bg-primary (dunkles Grün)        │
│                                   │
│   (○)    (○)    (○)  ← Kaum      │
│    1      2      3     sichtbar   │
│                                   │
└───────────────────────────────────┘

NACHHER (mit Cards):
┌───────────────────────────────────┐
│  bg-secondary/30 (helles Grün)    │
│                                   │
│  ┌─────┐ ┌─────┐ ┌─────┐         │
│  │ (1) │ │ (2) │ │ (3) │ ← Klar  │
│  │ 📷  │ │ ⏱️  │ │ ✨  │   ab-   │
│  │     │ │     │ │     │   ge-   │
│  └─────┘ └─────┘ └─────┘   setzt │
│                                   │
│      [  WhatsApp Button  ]        │
└───────────────────────────────────┘
```

---

## Erwartetes Ergebnis

1. **Messie-Slider:** Vorher (links) zeigt den unaufgeräumten Zustand, Nachher (rechts) den sauberen Raum
2. **"So einfach geht's":** Moderne Card-basierte Darstellung mit:
   - Hellem Hintergrund für bessere Lesbarkeit
   - Staggered Fade-In Animation
   - Hover-Effekte für Interaktivität
   - Klare visuelle Hierarchie

