
# Plan: Abstände in der RegionsSection reduzieren

## Problem

Zwischen dem Header ("Unsere Regionen in Süddeutschland" + Subtext) und dem Karten-Grid ist ein zu großer Abstand. Die aktuellen Werte:

| Element | Aktuell |
|---------|---------|
| Header margin-bottom | `mb-8` (32px) / `lg:mb-12` (48px) |
| Section padding | `py-12` (48px) / `lg:py-16` (64px) |
| Grid gap | `gap-8` (32px) / `lg:gap-12` (48px) |

## Lösung

Abstände deutlich reduzieren für ein kompakteres Layout.

---

## Technische Umsetzung

### Datei: `src/components/sections/RegionsSection.tsx`

**Änderung 1: Section Padding reduzieren (Zeile 12)**

```tsx
// ALT
<section className="py-12 lg:py-16 bg-secondary/30">

// NEU - kompakter
<section className="py-8 lg:py-12 bg-secondary/30">
```

**Änderung 2: Header Margin reduzieren (Zeile 17)**

```tsx
// ALT
"text-center mb-8 lg:mb-12",

// NEU - viel näher am Content
"text-center mb-4 lg:mb-6",
```

**Änderung 3: Grid Gap reduzieren (Zeile 31)**

```tsx
// ALT
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

// NEU - kompakter
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
```

---

## Vorher/Nachher

| Element | Vorher | Nachher | Ersparnis |
|---------|--------|---------|-----------|
| Section padding (mobile) | 48px | 32px | -16px |
| Section padding (desktop) | 64px | 48px | -16px |
| Header margin (mobile) | 32px | 16px | -16px |
| Header margin (desktop) | 48px | 24px | -24px |
| Grid gap (mobile) | 32px | 24px | -8px |
| Grid gap (desktop) | 48px | 32px | -16px |

---

## Ergebnis

- Deutlich kompakteres Layout
- Karte näher am Titel
- Bessere visuelle Verbindung zwischen Header und Inhalt
- Konsistent auf Desktop, Tablet und Mobile
