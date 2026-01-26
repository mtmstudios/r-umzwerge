
# Plan: Neues Services-Layout (2 große + 3 kleine Karten)

## Ziel

Umgestaltung der Leistungen-Sektion zu einem ausgewogenen Layout mit:
- **2 größere Karten** (obere Reihe): Wohnungsentrümpelung & Haushaltsauflösung
- **3 kleinere Karten** (untere Reihe): Keller/Dachboden, Gewerbe/Büro, Diskrete Reinigung

## Visuelles Layout

```text
Desktop:
┌─────────────────────────┐ ┌─────────────────────────┐
│                         │ │                         │
│   Wohnungsentrümpelung  │ │   Haushaltsauflösung    │
│   (groß, mit Badge)     │ │   (groß)                │
│                         │ │                         │
└─────────────────────────┘ └─────────────────────────┘

┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Keller/       │ │ Gewerbe/      │ │ Diskrete      │
│ Dachboden     │ │ Büro/Lager    │ │ Reinigung     │
└───────────────┘ └───────────────┘ └───────────────┘

Mobile:
Alle Karten vertikal gestapelt, große Karten zuerst
```

## Technische Umsetzung

### Dateien die geändert werden

| Datei | Aktion |
|-------|--------|
| `src/lib/constants.ts` | Wohnungsentrümpelung zu SERVICES Array hinzufügen |
| `src/components/sections/ServicesSection.tsx` | Komplettes Redesign der Grid-Struktur |
| `src/components/ui/BentoCard.tsx` | Neue `size` Prop hinzufügen (large/small) |

### 1. constants.ts - Wohnungsentrümpelung hinzufügen

Wohnungsentrümpelung als erstes Element in das SERVICES Array einfügen:

```typescript
export const SERVICES = [
  {
    title: "Wohnungsentrümpelung",
    description: "Transparent, zuverlässig und respektvoll.",
    longDescription: "Von der ersten Preiseinschätzung bis zur besenreinen Übergabe...",
    highlights: ["Besenrein", "Festpreis möglich", "Antwort < 24h"],
    slug: "wohnungsentruempelung",
    featured: true, // Markierung für Badge
  },
  // ... bestehende Services
];
```

### 2. BentoCard.tsx - Size Variante

Neue `size` Prop für unterschiedliche Kartengrößen:

```typescript
interface BentoCardProps {
  // ... bestehende Props
  size?: 'default' | 'large';
  featured?: boolean; // Für Kernkompetenz-Badge
}
```

**Große Karten:**
- Höhere min-height (220px statt 160px)
- Größeres Icon (64px statt 48px)
- Mehr Padding
- Optional: Kernkompetenz-Badge

**Kleine Karten:**
- Kompakter (140px min-height)
- Standard Icon-Größe
- Weniger Padding

### 3. ServicesSection.tsx - Neues Grid

Entfernung der aktuellen Featured Card, stattdessen ein einheitliches Grid:

```tsx
{/* Obere Reihe: 2 große Karten */}
<div className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-5 lg:mb-6">
  {SERVICES.slice(0, 2).map((service, index) => (
    <BentoCard
      size="large"
      featured={service.featured}
      // ... Props
    />
  ))}
</div>

{/* Untere Reihe: 3 kleine Karten */}
<div className="grid md:grid-cols-3 gap-5 lg:gap-6">
  {SERVICES.slice(2, 5).map((service, index) => (
    <BentoCard
      size="default"
      // ... Props
    />
  ))}
</div>
```

### Styling Details

**Große Karten (Wohnungsentrümpelung & Haushaltsauflösung):**
- `min-h-[200px] sm:min-h-[220px]`
- Icon: `w-16 h-16` 
- Padding: `p-6 sm:p-8`
- Wohnungsentrümpelung erhält "★ Kernkompetenz" Badge

**Kleine Karten (restliche 3):**
- `min-h-[140px] sm:min-h-[160px]`
- Icon: `w-12 h-12`
- Padding: `p-4 sm:p-5`
- Kompaktere Texte

### Responsive Verhalten

| Viewport | Obere Reihe | Untere Reihe |
|----------|-------------|--------------|
| Mobile   | 1 Spalte    | 1 Spalte     |
| Tablet   | 2 Spalten   | 3 Spalten    |
| Desktop  | 2 Spalten   | 3 Spalten    |

## Vorteile

- **Symmetrisches Layout**: 2+3 Karten = keine alleinstehende Karte
- **Visuelle Hierarchie**: Hauptleistungen sind größer und prominenter
- **Einheitlicher Code**: Alle Services im gleichen Array, BentoCard handhabt Größen
- **Mobile-optimiert**: Saubere Stapelreihenfolge auf kleinen Bildschirmen
