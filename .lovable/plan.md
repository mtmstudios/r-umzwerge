
# Fix: Hero-Header Überlappung auf Landing Pages

## Problem-Analyse

Der Hero-Text überlappt mit dem Header auf bestimmten Laptops, weil:

1. **Header ist fixed auf Desktop** (`lg:fixed`) und überlagert den Content
2. **Hero hat nur `pt-24` (96px)** Padding, aber der Header ist visuell ~120-140px hoch
3. **Bei niedrigeren Bildschirmhöhen** (z.B. 1366x768 Laptops) ist `min-h-[75vh]` = 576px, was zusammen mit dem zu kleinen Padding zu Überlappungen führt

## Betroffene Komponenten

| Komponente | Datei | Problem |
|------------|-------|---------|
| SEA Hero | `src/components/sea/SEAHero.tsx` | `pt-24` reicht nicht |
| Service Hero | `src/components/services/ServiceHero.tsx` | Gleiches Problem |
| City Hero | `src/components/city/CityHero.tsx` | Gleiches Problem |
| Haupt Hero | `src/components/sections/HeroSection.tsx` | Prüfen |

## Lösung

### Schritt 1: Header-Höhe als CSS-Variable definieren

In `src/index.css`:
```css
:root {
  --header-height-mobile: 80px;
  --header-height-desktop: 100px;
}
```

### Schritt 2: Hero-Komponenten mit korrektem Padding

Alle Hero-Komponenten erhalten:
```tsx
// Vorher:
<div className="... pt-24">

// Nachher:
<div className="... pt-28 lg:pt-32">
```

Das ergibt:
- Mobile: `pt-28` = 112px (ausreichend für 80-100px Header)
- Desktop: `pt-32` = 128px (ausreichend für den fixed 100-140px Header)

### Schritt 3: Min-Height anpassen für kleine Viewports

```tsx
// Vorher:
min-h-[85vh] md:min-h-[75vh] xl:min-h-[70vh]

// Nachher:
min-h-[90vh] md:min-h-[80vh] xl:min-h-[75vh]
```

Etwas mehr Höhe gibt dem Content mehr Platz.

## Änderungen

| Datei | Änderung |
|-------|----------|
| `src/components/sea/SEAHero.tsx` | `pt-24` → `pt-28 lg:pt-32`, Min-Height anpassen |
| `src/components/services/ServiceHero.tsx` | `pt-24` → `pt-28 lg:pt-32`, Min-Height anpassen |
| `src/components/city/CityHero.tsx` | Padding prüfen und anpassen |
| `src/components/sections/HeroSection.tsx` | Padding prüfen (falls nötig) |

## Technische Details

### Warum passiert das nur auf bestimmten Laptops?

Typische Laptop-Auflösungen:
- **1366 x 768**: `75vh` = 576px → Header-Konflikt wahrscheinlich
- **1920 x 1080**: `75vh` = 810px → Genug Platz
- **1440 x 900**: `75vh` = 675px → Grenzfall

Die Lösung mit mehr Padding und etwas größerer min-height löst das Problem für alle Viewport-Größen.

### Visuelle Darstellung

```text
Vorher (Problem):
┌─────────────────────────────┐
│  ████  HEADER  ████  [CTA] │ ← Fixed, z-50
├─────────────────────────────┤
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ← Hero-Text beginnt zu früh
│  HERO HEADLINE  ← Overlap! │   (pt-24 = 96px)
│                             │
└─────────────────────────────┘

Nachher (Fix):
┌─────────────────────────────┐
│  ████  HEADER  ████  [CTA] │ ← Fixed, z-50
├─────────────────────────────┤
│                             │ ← Mehr Abstand (pt-32 = 128px)
│  HERO HEADLINE              │   
│  Subtext hier...            │
└─────────────────────────────┘
```
