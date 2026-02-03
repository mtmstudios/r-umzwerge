

# Neue Preis-Section: Interaktiv & Eindrucksvoll

## Aktuelles Problem

Die bestehende Pricing-Section ist:
- Standard 2-Spalten Layout (Text links, Bild rechts)
- Statische Checkmark-Liste
- Kein visuelles Highlight
- Langweiliges, vorhersehbares Design

---

## Neues Konzept: "Preis-Kalkulator-Feeling"

Ein visuell ansprechendes, interaktives Design das Transparenz durch Animation vermittelt:

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         "So entsteht der Preis – transparent & fair"            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │    ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐      │    │
│  │    │ 📦     │  │ 🏢     │  │ 🔧     │  │ ⚡     │      │    │
│  │    │Umfang  │──│ Etage  │──│Demontage│──│ Sonder │      │    │
│  │    │        │  │        │  │        │  │  müll  │      │    │
│  │    └────────┘  └────────┘  └────────┘  └────────┘      │    │
│  │         │           │           │           │          │    │
│  │         ▼           ▼           ▼           ▼          │    │
│  │    ════════════════════════════════════════════        │    │
│  │                    FESTPREIS                           │    │
│  │    ════════════════════════════════════════════        │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ┌──────────────────┐     ┌─────────────────────────────┐│  │
│  │  │                  │     │ 📱 Schnelle Preiseinschätzung││  │
│  │  │   Team-Foto      │     │                             ││  │
│  │  │                  │     │ WhatsApp-Foto reicht        ││  │
│  │  │                  │     │ Antwort innerhalb 24h       ││  │
│  │  │                  │     │                             ││  │
│  │  └──────────────────┘     │ [🟢 Foto senden - Preis]    ││  │
│  │                           └─────────────────────────────┘│  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│    ⭐ 4.9 Rating    |    ⏱️ <24h    |    ✅ 85% Festpreis      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Design-Elemente

### 1. Animierte Preis-Faktoren Pipeline

Interaktive Karten die sich verbinden und in einen "Festpreis" münden:

| Faktor | Icon | Hover-Effekt |
|--------|------|--------------|
| Umfang/Menge | Package | Glow + Scale |
| Etage & Zugang | Building2 | Glow + Scale |
| Demontage | Wrench | Glow + Scale |
| Sondermüll | Zap | Glow + Scale |
| Termindruck | Clock | Glow + Scale |

- Verbindungslinien zwischen den Karten (animiert beim Scrollen)
- Alle Linien führen zu einem zentralen "Festpreis" Badge

### 2. Split-Card unten

**Links:** Team-Foto mit Parallax-Overlay
**Rechts:** WhatsApp CTA Card mit Glassmorphism

### 3. Trust-Stats Strip

Drei Key-Metrics am Ende:
- 4.9 Google Bewertung
- <24h Antwortzeit
- 85% Festpreis-Quote

---

## Technische Umsetzung

### Datei: `src/components/sections/PricingSection.tsx`

```tsx
// Neue Struktur
<section id="preise">
  <div className="container-custom">
    
    {/* Header */}
    <h2>So entsteht der Preis – transparent & fair</h2>
    
    {/* Preis-Faktoren Pipeline */}
    <div className="pricing-pipeline">
      {PRICE_FACTOR_CARDS.map((factor, i) => (
        <PriceFactorCard 
          key={factor.label}
          icon={factor.icon}
          label={factor.label}
          description={factor.description}
          index={i}
        />
      ))}
      
      {/* Verbindungslinien (animiert) */}
      <div className="connecting-lines" />
      
      {/* Festpreis Badge */}
      <div className="festpreis-badge">
        = Festpreis
      </div>
    </div>
    
    {/* Split Card: Bild + CTA */}
    <div className="grid lg:grid-cols-2">
      <div className="team-image" />
      <div className="whatsapp-cta-card glass" />
    </div>
    
    {/* Trust Stats */}
    <div className="trust-stats-strip" />
    
  </div>
</section>
```

### Neue Konstanten für erweiterte Faktoren

```tsx
const PRICE_FACTOR_CARDS = [
  { 
    icon: Package, 
    label: "Umfang", 
    description: "Menge & Raumgröße" 
  },
  { 
    icon: Building2, 
    label: "Etage", 
    description: "Zugang & Stockwerk" 
  },
  { 
    icon: Wrench, 
    label: "Demontage", 
    description: "Möbel-Abbau" 
  },
  { 
    icon: Zap, 
    label: "Sondermüll", 
    description: "Elektro & Sperrgut" 
  },
  { 
    icon: Clock, 
    label: "Termin", 
    description: "Zeitdruck-Faktor" 
  },
];
```

---

## Animationen

### Scroll-getriggerte Einblendung

```css
/* Faktoren erscheinen gestaffelt */
.price-factor-card {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

.price-factor-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delay */
.price-factor-card:nth-child(1) { transition-delay: 0ms; }
.price-factor-card:nth-child(2) { transition-delay: 100ms; }
.price-factor-card:nth-child(3) { transition-delay: 200ms; }
.price-factor-card:nth-child(4) { transition-delay: 300ms; }
.price-factor-card:nth-child(5) { transition-delay: 400ms; }
```

### Hover-Effekte

```css
.price-factor-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 30px -8px hsl(var(--accent) / 0.3);
  border-color: hsl(var(--accent) / 0.6);
}

.price-factor-card:hover .icon-container {
  transform: scale(1.1) rotate(3deg);
  background: hsl(var(--accent) / 0.2);
}
```

### Verbindungslinie Animation

```css
.connecting-line {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw-line 1s ease-out forwards;
}

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}
```

---

## Mobile Optimierung

| Desktop | Mobile |
|---------|--------|
| 5 Karten in einer Reihe | 2x2 Grid + 1 zentriert |
| SVG-Verbindungslinien | Keine Linien, nur Pfeile unten |
| Großes Team-Bild | Kleineres Bild über CTA |

---

## Betroffene Dateien

| Datei | Aktion |
|-------|--------|
| `src/components/sections/PricingSection.tsx` | Komplettes Redesign |
| `src/index.css` | Neue Animationen für Pipeline (optional) |

---

## Visuelles Ergebnis

- **Dynamisch**: Animierte Pipeline zeigt Preis-Entstehung
- **Interaktiv**: Hover-Effekte auf allen Faktoren
- **Vertrauensbildend**: Team-Foto + Trust-Stats
- **Klar strukturiert**: Faktoren → Festpreis → CTA
- **Premium-Feel**: Glassmorphism + Glow-Effekte

