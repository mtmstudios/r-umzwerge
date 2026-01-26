
# Umsetzungsplan: 3 Redesigns

## 1. Pricing Section Redesign

**Problem:** Bild ist versteckt hinter Gradienten, CTA schwebt unprofessionell

**Lösung:** Split-Layout mit zwei Spalten
- **Links:** Headline + Preisfaktoren-Liste
- **Rechts:** Bild (abgerundet, sichtbar) + CTA-Card darunter

```text
┌─────────────────────────┐    ┌─────────────────────────┐
│  So entsteht der Preis  │    │   ┌─────────────────┐   │
│  ─────────────────────  │    │   │   Foto sichtbar │   │
│  ✓ Umfang               │    │   └─────────────────┘   │
│  ✓ Zugänglichkeit       │    │                         │
│  ✓ Entsorgung           │    │   ┌─────────────────┐   │
│  ✓ Zusatzleistungen     │    │   │ 📱 WhatsApp CTA │   │
│                         │    │   └─────────────────┘   │
└─────────────────────────┘    └─────────────────────────┘
```

---

## 2. Services-Grid Layout-Fix

**Problem:** Eine Karte doppelt so hoch, nicht zentriert, 4 Spalten auf Desktop

**Lösung:** Symmetrisches 2x2 Grid
- Alle Karten gleiche Größe (kein `row-span-2`)
- Zentriert mit `max-w-4xl mx-auto`
- Größere Abstände für Atmung

```text
          ┌───────────────┐    ┌───────────────┐
          │ Haushalts-    │    │ Keller/       │
          │ auflösung     │    │ Dachboden     │
          └───────────────┘    └───────────────┘
          
          ┌───────────────┐    ┌───────────────┐
          │ Gewerbe/      │    │ Diskrete      │
          │ Büro/Lager    │    │ Reinigung     │
          └───────────────┘    └───────────────┘
```

---

## 3. Footer Redesign (CTA-First)

**Problem:** Standard 4-Spalten-Grid, langweilig, keine Conversion-Chance

**Lösung:** CTA-Bereich oben, Links darunter

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  🏠 RÄUMZWERGE                     Jetzt Preiseinschätzung erhalten  │  │
│  │     Entrümpelung in Süddeutschland       [📱 WhatsApp schreiben]     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   Leistungen     │   Kontakt        │   Rechtliches   │   Einsatzgebiet    │
│   ───────────    │   ────────       │   ───────────   │   ─────────────    │
│   Haushalts...   │   📞 Telefon     │   Impressum     │   Ulm (HQ)         │
│   Keller...      │   📱 WhatsApp    │   Datenschutz   │   München          │
│   Gewerbe...     │   ✉️  E-Mail      │                 │   Stuttgart        │
│   Diskret...     │   📍 Ulm         │                 │   Augsburg...      │
│                                                                             │
│   ────────────────────────────────────────────────────────────────────────  │
│   © 2026 Räumzwerge. Alle Rechte vorbehalten.           Mo–Sa 8–20 Uhr     │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Elemente:**
- CTA-Banner oben mit Glassmorphism-Hintergrund (Accent-Farbe)
- Logo + Tagline links, WhatsApp-Button rechts
- 4 Link-Spalten darunter (wie bisher, aber mit Regionen statt Servicezeiten)
- Bottom-Bar mit Copyright und Öffnungszeiten

---

## Technische Details

### Datei 1: `src/components/sections/PricingSection.tsx`

Komplette Umstrukturierung:
- `grid lg:grid-cols-2` statt Hintergrundbild
- Bild als `<img>` mit `rounded-2xl shadow-lg`
- CTA-Card mit `glass` Klasse

### Datei 2: `src/components/sections/ServicesSection.tsx`

Grid-Änderungen:
- `grid md:grid-cols-2` statt `lg:grid-cols-4`
- `max-w-4xl mx-auto` für Zentrierung
- Entfernen der `isTall`-Logik und `row-span-2`

### Datei 3: `src/components/ui/BentoCard.tsx`

Optionale Anpassung:
- `min-h-[180px]` für konsistente Kartenhöhe

### Datei 4: `src/components/layout/Footer.tsx`

Neue Struktur:
- CTA-Banner-Section oben (neues Element)
- Link-Grid bleibt ähnlich, aber "Servicezeiten" wird zu "Einsatzgebiet" mit Regionsliste
- Bottom-Bar mit Servicezeiten rechts

---

## Zusammenfassung

| Änderung | Datei | Aufwand |
|----------|-------|---------|
| Pricing Section Split-Layout | PricingSection.tsx | Mittel |
| Services 2x2 Grid | ServicesSection.tsx, BentoCard.tsx | Klein |
| CTA-First Footer | Footer.tsx | Mittel |

**Ergebnis:**
- Professionellere Pricing-Section mit sichtbarem Bild
- Ausgewogenes Services-Grid ohne asymmetrische Karten
- Conversion-optimierter Footer mit letzter CTA-Chance
