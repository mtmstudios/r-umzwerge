
# Plan: Mobiler Hero-Bereich - Vollbild-Design mit Overlay

## Ziel

Den mobilen Hero-Bereich von einem gestapelten Grid-Layout in ein modernes Vollbild-Hintergrundbild mit dunklem Overlay und zentriertem Content transformieren. Das Desktop-Layout bleibt unverändert (Side-by-Side).

## Aktuelles Problem

| Aspekt | Aktuell | Problem |
|--------|---------|---------|
| Layout | Bild oben, Text darunter | Wirkt langweilig, typisches "Template"-Design |
| Bild | Kleine Karte (aspect-4/3) | Verschenktes visuelles Potenzial |
| Höhe | ~100vh+ mit Scrollen | CTAs nicht sofort sichtbar |
| Stil | Standardmäßig, keine Tiefe | Nicht emotional genug |

## Neue Designvision

```text
┌─────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Header (transparent/glassmorphism)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░ VOLLBILD-FOTO ░░░░░░│  ← Hero-Team.jpg als Hintergrund
│░░░ MIT DUNKLEM ░░░░░░░░│
│░░░ GRADIENT-OVERLAY ░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░│
│                         │
│   ╔═══════════════╗     │
│   ║  HEADLINE     ║     │  ← Weißer Text, zentriert
│   ║  (weiß)       ║     │
│   ╠═══════════════╣     │
│   ║  Subline      ║     │
│   ╠═══════════════╣     │
│   ║ [WhatsApp CTA]║     │  ← Grüner Button
│   ║ [Anrufen CTA] ║     │  ← Oranger Button
│   ╠═══════════════╣     │
│   ║ ✓ ✓ ✓ Pills   ║     │  ← Trust-Badges (halbtransparent)
│   ╚═══════════════╝     │
│                         │
│▓▓▓▓▓ Gradient fade ▓▓▓▓│  ← Sanfter Übergang zur nächsten Section
└─────────────────────────┘
```

## Technische Umsetzung

### Datei: `src/components/sections/HeroSection.tsx`

Die Komponente wird so umgebaut, dass sie **responsiv** zwischen zwei Layouts wechselt:
- **Mobile (< lg)**: Vollbild-Hintergrund mit Overlay
- **Desktop (lg+)**: Bestehendes Side-by-Side Layout (unverändert)

**Struktur-Änderung:**

```tsx
// Vorher: Grid mit Bild und Content nebeneinander
<section className="relative bg-background overflow-hidden">
  <div className="container-custom relative">
    <div className="grid lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
      <div className="order-2 lg:order-1">{/* Content */}</div>
      <div className="order-1 lg:order-2">{/* Image */}</div>
    </div>
  </div>
</section>

// Nachher: Mobile = Fullscreen, Desktop = Grid
<section className="relative overflow-hidden">
  {/* Mobile: Fullscreen background */}
  <div className="lg:hidden absolute inset-0">
    <img src={heroTeamImage} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
  </div>
  
  {/* Desktop: Standard background */}
  <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-background" />
  
  <div className="container-custom relative">
    {/* Mobile: Centered content */}
    <div className="lg:hidden min-h-[85vh] flex flex-col justify-end pb-8 pt-20">
      {/* Mobile-optimierter Content */}
    </div>
    
    {/* Desktop: Original grid layout */}
    <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center py-20">
      {/* Original content + image */}
    </div>
  </div>
</section>
```

### Wichtige Mobile-Anpassungen

**1. Hero-Höhe:**
```tsx
min-h-[85vh]  // Füllt fast den gesamten Viewport
```

**2. Gradient-Overlay (von unten nach oben, dunkler unten):**
```tsx
bg-gradient-to-t from-black/80 via-black/50 to-black/30
```

**3. Text-Farben für Overlay:**
```tsx
// Headline
text-white

// Subline
text-white/90

// Trust Pills
bg-white/20 text-white backdrop-blur-sm border border-white/10
```

**4. CTA-Buttons auf dunklem Hintergrund:**
```tsx
// WhatsApp - bleibt grün
bg-whatsapp hover:bg-whatsapp-hover

// Anrufen - solid orange (bereits so für Mobile)
bg-cta hover:bg-cta-hover text-white
```

**5. Dezente Hinweis-Zeile:**
```tsx
text-white/70 text-sm
```

### Vollständige Änderungen

| Element | Aktuell (Mobile) | Neu (Mobile) |
|---------|------------------|--------------|
| Layout | Grid, Bild oben | Vollbild-Hintergrund |
| Höhe | Auto (~100vh+) | 85vh (ohne viel Scrollen) |
| Hintergrund | Keine | Hero-Team.jpg + Gradient |
| Text-Farben | Dunkel (foreground) | Weiß (white) |
| Trust Pills | bg-secondary | bg-white/20 + backdrop-blur |
| Bild | Separate Karte | Hintergrund |
| Content-Position | Oben links | Unten zentriert |

### Desktop bleibt unverändert

Das bestehende Desktop-Layout (lg:) bleibt vollständig erhalten:
- Side-by-Side Grid mit 2 Spalten
- Bild rechts als separate Karte
- Dunkle Textfarben
- Standard-Background

---

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/sections/HeroSection.tsx` | Kompletter Mobile-Redesign mit Vollbild-Overlay |

## Ergebnis

Nach dieser Änderung:

- **Mobile**: Modernes, emotionales Vollbild-Design mit Hero-Team-Foto als Hintergrund
- **Text sofort sichtbar**: Keine Notwendigkeit nach unten zu scrollen
- **Professioneller Look**: Dunkles Overlay sorgt für Tiefe und Lesbarkeit
- **Starke CTAs**: WhatsApp (grün) und Anrufen (orange) stechen hervor
- **Desktop unverändert**: Bewährtes Side-by-Side Layout bleibt
- **Konsistent mit Brand**: Verwendet existierendes Hero-Team-Bild
