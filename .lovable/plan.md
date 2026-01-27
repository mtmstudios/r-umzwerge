
# Plan: Service-Hero auf Mobile wie Startseite gestalten

## Ziel

Die `ServiceHero`-Komponente auf allen Unterseiten (Wohnungsentrümpelung, Haushaltsauflösung, etc.) soll auf Mobile das gleiche moderne Vollbild-Overlay-Design wie die Startseite verwenden.

## Aktueller Zustand

| Aspekt | Startseite (HeroSection) | Unterseiten (ServiceHero) |
|--------|-------------------------|---------------------------|
| Mobile Layout | Vollbild-Hintergrund + Overlay | Grid mit Bild als separate Karte |
| Höhe | 85vh (fast Vollbild) | Auto (viel Scrollen nötig) |
| Hintergrund | hero-team.jpg + Gradient | Weißer Hintergrund |
| Text-Farben | Weiß auf dunklem Overlay | Dunkel auf hellem Hintergrund |
| CTAs | Stark hervorgehoben | Standard |

## Neue Designvision

```text
┌─────────────────────────┐
│  ▓▓▓ HEADER ▓▓▓▓▓▓▓▓▓▓ │
│░░░░░░░░░░░░░░░░░░░░░░░░│
│░░ SERVICE-SPEZIFISCHES ░│  ← z.B. service-wohnungsentruempelung.jpg
│░░ FOTO ALS HINTERGRUND ░│
│░░ MIT GRADIENT-OVERLAY ░│
│░░░░░░░░░░░░░░░░░░░░░░░░│
│                         │
│   ╔═══════════════╗     │
│   ║  {h1}         ║     │  ← Dynamischer Titel (weiß)
│   ╠═══════════════╣     │
│   ║  {subline}    ║     │  ← Dynamische Subline
│   ╠═══════════════╣     │
│   ║ [WhatsApp CTA]║     │  ← Grüner Button
│   ║ [Anrufen CTA] ║     │  ← Oranger Button
│   ╠═══════════════╣     │
│   ║ 💡 Photo Guide║     │
│   ╠═══════════════╣     │
│   ║ ✓ ✓ ✓ Pills   ║     │  ← Trust Pills (halbtransparent)
│   ╚═══════════════╝     │
└─────────────────────────┘
```

---

## Technische Umsetzung

### Datei: `src/components/services/ServiceHero.tsx`

Die Komponente wird nach dem Vorbild der `HeroSection.tsx` umgebaut:

**Neue Struktur:**

```tsx
<section className="relative overflow-hidden">
  {/* Mobile: Fullscreen background with overlay */}
  <div className="lg:hidden absolute inset-0">
    <img 
      src={imageSrc || fallbackImage}
      alt={imageAlt || h1}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
  </div>
  
  {/* Desktop: Standard background */}
  <div className="hidden lg:block absolute inset-0 bg-background" />
  
  <div className="container-custom relative">
    {/* Mobile Layout */}
    <div className="lg:hidden min-h-[85vh] flex flex-col justify-end pb-8 pt-24">
      {/* Mobile-optimierter Content mit weißem Text */}
    </div>
    
    {/* Desktop Layout: Original grid */}
    <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center py-20 lg:py-32">
      {/* Bestehender Desktop-Content */}
    </div>
  </div>
</section>
```

**Wichtige Änderungen:**

| Element | Aktuell (Mobile) | Neu (Mobile) |
|---------|------------------|--------------|
| Hintergrund | bg-background | Service-Bild + Gradient-Overlay |
| Höhe | Auto | min-h-[85vh] |
| Headline | text-foreground | text-white |
| Subline | text-muted-foreground | text-white/90 |
| Trust Pills | bg-secondary/50 | bg-white/15 backdrop-blur-sm |
| Photo Guide | text-muted-foreground | text-white/70 |
| Bild | Separate Karte unten | Vollbild-Hintergrund |
| CTAs | Standard | Optimiert für dunklen Hintergrund |

**Import-Ergänzung:**
```tsx
import { CheckCircle } from 'lucide-react';  // Statt Check für Konsistenz mit Startseite
```

---

## Code-Details

### Mobile Layout (neu):

```tsx
{/* Mobile Layout */}
<div className="lg:hidden min-h-[85vh] flex flex-col justify-end pb-8 pt-24">
  <h1 className="text-3xl font-bold text-white mb-4 text-balance leading-tight">
    {h1}
  </h1>
  
  <p className="text-base text-white/90 mb-6 max-w-xl">
    {subline}
  </p>

  {/* Mobile CTAs */}
  <div className="flex flex-col gap-3 mb-4">
    <Button ... className="bg-whatsapp ...">
      {/* WhatsApp CTA */}
    </Button>
    <Button ... className="bg-cta ...">
      {/* Anrufen CTA */}
    </Button>
  </div>

  {/* Photo Guide */}
  <p className="text-sm text-white/70 mb-6">
    💡 {PHOTO_GUIDE}
  </p>

  {/* Mobile Trust Pills */}
  <div className="flex flex-wrap gap-2">
    {trustPills.map((pill) => (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/10">
        <CheckCircle className="h-3.5 w-3.5 text-accent" />
        {pill}
      </div>
    ))}
  </div>
</div>
```

### Desktop Layout (unverändert):

Das bestehende Grid-Layout bleibt erhalten:
- Side-by-Side mit 2 Spalten
- Bild rechts als separate Karte
- Dunkle Textfarben
- Scroll-Reveal Animation

---

## Fallback für fehlende Bilder

Falls `imageSrc` nicht übergeben wird, verwenden wir einen Fallback mit Gradient:

```tsx
{imageSrc ? (
  <img src={imageSrc} alt={imageAlt || h1} className="w-full h-full object-cover" />
) : (
  <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10" />
)}
```

---

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/services/ServiceHero.tsx` | Kompletter Mobile-Redesign mit Vollbild-Overlay |

---

## Ergebnis

Nach dieser Änderung:

- **Konsistentes Mobile-Design**: Alle Hero-Bereiche (Startseite + Unterseiten) haben das gleiche moderne Vollbild-Layout
- **Service-spezifische Bilder**: Jede Unterseite zeigt ihr eigenes Bild (z.B. `service-wohnungsentruempelung.jpg`)
- **Professioneller Look**: Dunkles Overlay sorgt für Tiefe und Lesbarkeit
- **Dynamischer Content**: h1, subline und trustPills werden weiterhin als Props übergeben
- **Desktop unverändert**: Bewährtes Side-by-Side Layout bleibt erhalten
