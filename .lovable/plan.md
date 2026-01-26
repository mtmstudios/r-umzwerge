
# Plan: 4 High-Impact UI/UX Changes auf allen Seiten

## Übersicht der Änderungen

| Komponente | Beschreibung | Betroffene Seiten |
|------------|--------------|-------------------|
| 1. Marquee Trust Bar | Infinite-Scroll Animation der Trust-Badges | Startseite + alle Service-Seiten |
| 2. Bento-Grid Services | Asymmetrisches Grid mit Glassmorphism | Startseite |
| 3. Horizontal Timeline | Scroll-triggered Prozess-Anzeige | Startseite + alle Service-Seiten |
| 4. Diagonal Section-Dividers | SVG-Trenner zwischen Sections | Alle Seiten |

---

## 1. Marquee Trust Bar (Infinite Scroll)

### Neue Komponente: `src/components/ui/Marquee.tsx`

```text
┌────────────────────────────────────────────────────────────────────────┐
│ ← Keine versteckten Kosten · Preiseinschätzung < 24h · Festpreis möglich · Diskret & respektvoll · Besenrein · Keine versteckten Kosten · ... →
└────────────────────────────────────────────────────────────────────────┘
```

**Technische Details:**
- CSS-basierte Animation (`@keyframes scroll`) für Performance
- Doppelte Content-Duplizierung für nahtlose Schleife
- Pause bei Hover (optional)
- Konfigurierbare Geschwindigkeit und Richtung
- Responsiv: Etwas langsamer auf Mobile

**Zu erstellende Dateien:**
- `src/components/ui/Marquee.tsx` - Wiederverwendbare Komponente

**Zu ändernde Dateien:**
- `src/components/sections/TrustBar.tsx` - Marquee statt statischer Flex-Container
- `src/index.css` - Keyframes für Scroll-Animation

---

## 2. Bento-Grid Services

### Neues Layout für ServicesSection

```text
┌─────────────────────────────────────────────────────────────┐
│              🏠 Wohnungsentrümpelung (Featured)             │
│                 Glassmorphism + Hover-Glow                  │
└─────────────────────────────────────────────────────────────┘
┌──────────────────────────┐  ┌──────────────────────────────┐
│   Haushaltsauflösung     │  │                              │
│        (Normal)          │  │    Keller/Dachboden/Garage   │
│                          │  │         (Tall Card)          │
├──────────────────────────┤  │                              │
│   Gewerbe/Büro/Lager     │  │                              │
│        (Normal)          │  ├──────────────────────────────┤
├──────────────────────────┤  │   Diskrete Reinigung         │
│   (Glassmorphism Grid)   │  │        (With Icon)           │
└──────────────────────────┘  └──────────────────────────────┘
```

**Technische Details:**
- Asymmetrisches CSS Grid (`grid-template-columns`, `grid-template-rows`)
- Glassmorphism: `backdrop-blur-xl`, `bg-white/10`, subtile Borders
- Micro-Interactions: Hover-Scale, Glow-Effect, Icon-Animation
- Staggered Reveal: Karten erscheinen nacheinander

**Zu erstellende Dateien:**
- `src/components/ui/BentoCard.tsx` - Einzelne Karte mit Glassmorphism

**Zu ändernde Dateien:**
- `src/components/sections/ServicesSection.tsx` - Komplett neues Bento-Layout
- `src/index.css` - Glassmorphism-Utilities, Glow-Keyframes

---

## 3. Horizontal Timeline (Scroll-Triggered)

### Neues Prozess-Design

```text
                    Scroll Progress Bar
    ════════════════════════════════════════════════

    ┌─────────┐      ┌─────────┐      ┌─────────┐
    │    1    │ ──── │    2    │ ──── │    3    │
    │ 📸      │      │ ⏱️      │      │ ✨      │
    │ Foto    │      │ Preis   │      │ Wir     │
    │ senden  │      │ in 24h  │      │ räumen  │
    └─────────┘      └─────────┘      └─────────┘
       ▲ aktiv         inaktiv          inaktiv
```

**Technische Details:**
- IntersectionObserver für Scroll-Detection
- Aktiver Step wird hervorgehoben (Scale, Farbe)
- Progress-Bar füllt sich mit Scroll
- Connector-Lines animieren sich zwischen Steps
- Mobile: Vertikales Layout mit gleicher Animation

**Zu erstellende Dateien:**
- `src/components/ui/HorizontalTimeline.tsx` - Wiederverwendbare Komponente

**Zu ändernde Dateien:**
- `src/components/sections/ProcessSection.tsx` - Timeline statt Grid
- `src/components/services/ServiceProcess.tsx` - Gleiche Timeline für Unterseiten
- `src/hooks/useAnimations.ts` - Neuer Hook `useTimelineProgress`

---

## 4. Diagonal Section-Dividers

### SVG-Trenner zwischen Sections

```text
 Section A (hell)
────────────────────────────────────
            ╲                    ╲
              ╲                    ╲
                ╲                    ╲
────────────────────────────────────
 Section B (dunkel)
```

**Technische Details:**
- SVG mit `preserveAspectRatio="none"` für Responsivität
- Variants: `top`, `bottom`, `wave`, `angle`
- Farbe passt sich automatisch an Section-Hintergrund an
- Höhe konfigurierbar (60-120px empfohlen)

**Zu erstellende Dateien:**
- `src/components/ui/SectionDivider.tsx` - Wiederverwendbare SVG-Komponente

**Zu ändernde Dateien:**
- `src/pages/Index.tsx` - Dividers zwischen Sections einfügen
- `src/pages/ServicePage.tsx` - Dividers für Unterseiten
- `src/index.css` - Utility-Klassen für Divider-Platzierung

---

## Implementierungsreihenfolge

### Phase 1: Basis-Komponenten erstellen

| Datei | Beschreibung |
|-------|--------------|
| `src/components/ui/Marquee.tsx` | Infinite-Scroll Komponente |
| `src/components/ui/SectionDivider.tsx` | SVG-Divider mit Varianten |
| `src/components/ui/BentoCard.tsx` | Glassmorphism-Karte |
| `src/components/ui/HorizontalTimeline.tsx` | Timeline-Komponente |

### Phase 2: CSS-Erweiterungen

**`src/index.css` Ergänzungen:**
```css
/* Marquee Animation */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Glassmorphism */
.glass {
  background: hsl(var(--card) / 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border) / 0.5);
}

/* Glow Effect */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px hsl(var(--accent) / 0.3); }
  50% { box-shadow: 0 0 40px hsl(var(--accent) / 0.5); }
}
```

**`tailwind.config.ts` Ergänzungen:**
```typescript
animation: {
  'marquee': 'marquee-scroll 30s linear infinite',
  'glow': 'glow-pulse 2s ease-in-out infinite',
}
```

### Phase 3: Seiten aktualisieren

**Startseite (`src/pages/Index.tsx`):**
```tsx
<HeroSection />
<SectionDivider variant="angle" direction="down" />
<TrustBar />  {/* Mit Marquee */}
<SectionDivider variant="wave" direction="down" />
<ProcessSection />  {/* Mit Timeline */}
<SectionDivider variant="angle" direction="up" />
<ServicesSection />  {/* Mit Bento-Grid */}
<SectionDivider variant="wave" direction="down" />
{/* ... */}
```

**Service-Seiten (`src/pages/ServicePage.tsx`):**
```tsx
<ServiceHero />
<SectionDivider variant="angle" />
<ScenarioGrid />
<SectionDivider variant="wave" />
<ServiceScope />
<SectionDivider variant="angle" />
<ServiceProcess />  {/* Mit Timeline */}
{/* ... */}
```

### Phase 4: Breadcrumb entfernen

In `src/pages/ServicePage.tsx`:
- Breadcrumb-Imports entfernen (Zeilen 16-23)
- `<nav>` Block entfernen (Zeilen 41-62)
- `pt-4` vom `<main>` Tag entfernen

---

## Neue Hooks

### `src/hooks/useTimelineProgress.ts`

```typescript
// Hook für scroll-basierte Timeline-Aktivierung
export function useTimelineProgress(stepsCount: number) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // IntersectionObserver + Scroll-Listener
  // Berechnet welcher Step aktiv ist basierend auf Scroll-Position
  
  return { containerRef, activeStep, progress };
}
```

---

## Dateiübersicht: Neu erstellen

| Datei | Zweck |
|-------|-------|
| `src/components/ui/Marquee.tsx` | Infinite-Scroll Container |
| `src/components/ui/SectionDivider.tsx` | SVG-Trenner |
| `src/components/ui/BentoCard.tsx` | Glassmorphism-Karte |
| `src/components/ui/HorizontalTimeline.tsx` | Scroll-Timeline |
| `src/hooks/useTimelineProgress.ts` | Timeline-State Hook |

## Dateiübersicht: Ändern

| Datei | Änderung |
|-------|----------|
| `src/index.css` | Neue Keyframes + Utilities |
| `tailwind.config.ts` | Neue Animations-Definitionen |
| `src/components/sections/TrustBar.tsx` | Marquee integrieren |
| `src/components/sections/ProcessSection.tsx` | Timeline-Layout |
| `src/components/sections/ServicesSection.tsx` | Bento-Grid statt Flip-Cards |
| `src/components/services/ServiceProcess.tsx` | Timeline-Layout |
| `src/pages/Index.tsx` | Dividers einfügen |
| `src/pages/ServicePage.tsx` | Breadcrumb entfernen + Dividers |

---

## Ergebnis

Nach der Implementierung:

1. **Marquee Trust Bar**: Dynamische, professionelle Badge-Leiste die Aufmerksamkeit erzeugt
2. **Bento-Grid**: Modernes, asymmetrisches Layout mit Premium-Glassmorphism-Effekt
3. **Horizontal Timeline**: Interaktive Prozess-Visualisierung die den User "führt"
4. **Diagonal Dividers**: Visuell ansprechende Trennung die die Seite weniger "blockhaft" erscheinen lässt

Alle Änderungen sind:
- Performant (CSS-basiert wo möglich)
- Accessible (keine wichtigen Inhalte in Animationen versteckt)
- Responsive (Mobile-optimiert)
- Konsistent (gleiche Patterns auf allen Seiten)
