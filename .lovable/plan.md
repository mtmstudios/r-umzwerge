

# Pricing Section: Tablet & Mobile Optimierung

## Erkannte Probleme

### 1. Faktor-Karten Grid (Zeile 89)
**Problem:** `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`
- Auf Tablet (768-1024px) werden 3 Karten in einer Reihe gezeigt, dann 2 darunter - sieht unbalanciert aus
- Die 5. Karte steht alleine und nicht zentriert

### 2. Split-Card Layout (Zeile 122)
**Problem:** `grid lg:grid-cols-2` - kein `md:` Breakpoint
- Auf Tablet (768-1024px) stackt alles vertikal obwohl genug Platz wäre
- Das Bild ist zu hoch (`h-64`) auf Mobile

### 3. WhatsApp CTA Card (Zeile 142)
**Problem:** Feste Padding-Werte `p-6 lg:p-8`
- Kein Tablet-optimiertes Padding
- Icon + Text Layout kann auf kleinen Tablets brechen

### 4. Trust Stats (Zeile 185)
**Problem:** `gap-8 sm:gap-12 lg:gap-20`
- Auf kleinen Mobiles können die Stats umbrechen und unsymmetrisch aussehen

### 5. Arrow-Pfeile (Zeile 56-58)
**Problem:** `lg:hidden` zeigt Pfeile auf Tablet - aber im Grid-Layout machen sie keinen Sinn bei 3 Spalten

---

## Optimierungen

### A. Faktor-Karten Grid verbessern

```tsx
// Vorher (Zeile 89):
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-4 justify-items-center">

// Nachher - Bessere Breakpoints:
<div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 lg:gap-4 justify-items-center">
```

**Effekt:**
- Mobile (< 768px): 2 Spalten (2+2+1 zentriert)
- Tablet & Desktop (>= 768px): 5 Spalten in einer Reihe

### B. 5. Karte auf Mobile zentrieren

```tsx
// Neue Klasse für die letzte Karte:
className={cn(
  'group relative flex flex-col items-center text-center',
  index === 4 && 'col-span-2 md:col-span-1 justify-self-center'
)}
```

### C. Split-Card für Tablet optimieren

```tsx
// Vorher (Zeile 122):
<div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

// Nachher - Tablet-Layout hinzufügen:
<div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-stretch">
```

### D. Bild-Höhe responsive machen

```tsx
// Vorher (Zeile 126):
<div className="relative rounded-2xl overflow-hidden shadow-xl h-64 lg:h-80">

// Nachher - Mehr Flexibilität:
<div className="relative rounded-2xl overflow-hidden shadow-xl h-48 sm:h-56 md:h-64 lg:h-80">
```

### E. Pfeile nur auf echtem Mobile zeigen

```tsx
// Vorher (Zeile 56):
<div className="mt-3 lg:hidden">

// Nachher - Nur auf Mobile:
<div className="mt-3 md:hidden">
```

### F. Trust Stats kompakter auf Mobile

```tsx
// Vorher (Zeile 185):
<div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-20">

// Nachher - Bessere Gaps:
<div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-20">
```

### G. WhatsApp Icon + Text auf kleinen Screens

```tsx
// Zeile 147-158 - Kompakteres Layout auf Mobile:
<div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6 text-center sm:text-left">
```

---

## Visuelle Darstellung der Änderungen

### Mobile (< 640px)
```text
┌─────────────────┐
│   ┌───┐ ┌───┐   │
│   │ 1 │ │ 2 │   │
│   └───┘ └───┘   │
│   ┌───┐ ┌───┐   │
│   │ 3 │ │ 4 │   │
│   └───┘ └───┘   │
│      ┌───┐      │
│      │ 5 │      │  ← Zentriert
│      └───┘      │
│                 │
│   [FESTPREIS]   │
│                 │
│  ┌───────────┐  │
│  │   Bild    │  │  ← Kleiner (h-48)
│  └───────────┘  │
│  ┌───────────┐  │
│  │   CTA     │  │  ← Zentrierter Text
│  └───────────┘  │
└─────────────────┘
```

### Tablet (768px - 1024px)
```text
┌───────────────────────────────────────────┐
│                                           │
│   ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐          │  ← 5 in einer Reihe
│   │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │          │
│   └───┘ └───┘ └───┘ └───┘ └───┘          │
│                                           │
│          [FESTPREIS BADGE]                │
│                                           │
│   ┌─────────────┐  ┌─────────────────┐    │
│   │             │  │  WhatsApp CTA   │    │  ← Side-by-side
│   │    Bild     │  │                 │    │
│   │             │  │  [Button]       │    │
│   └─────────────┘  └─────────────────┘    │
│                                           │
└───────────────────────────────────────────┘
```

---

## Zusammenfassung der Änderungen

| Zeile | Element | Änderung |
|-------|---------|----------|
| 37-38 | PriceFactorCard | `col-span-2 md:col-span-1` für 5. Karte |
| 56 | Arrow | `lg:hidden` → `md:hidden` |
| 89 | Grid | `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` → `grid-cols-2 md:grid-cols-5` |
| 122 | Split Card | `lg:grid-cols-2` → `md:grid-cols-2` |
| 126 | Bild Container | `h-64 lg:h-80` → `h-48 sm:h-56 md:h-64 lg:h-80` |
| 147 | CTA Header | Zentriertes Layout für Mobile |
| 185 | Trust Stats | `gap-8` → `gap-6` für Mobile |

---

## Betroffene Datei

| Datei | Aktion |
|-------|--------|
| `src/components/sections/PricingSection.tsx` | Responsive Breakpoints optimieren |

