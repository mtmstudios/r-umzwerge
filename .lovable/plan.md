
# Plan: TrustBar & Services-Kacheln Anpassungen

## Übersicht der Änderungen

1. **TrustBar**: Orange Akzente entfernen, Trenner von "." zu "-" ändern
2. **Services-Section**: Wohnungsentrümpelung-Karte verkleinern, andere Karten zentrieren

---

## 1. TrustBar Änderungen

### Aktuelle Probleme
- Icons haben alternierende Farben (orange `text-cta` und grün `text-accent`)
- Trenner ist ein Punkt "•" statt einem Strich "-"

### Lösung

**Datei: `src/components/sections/TrustBar.tsx`**

```typescript
// VORHER: Alternierende Farben
{ icon: ShieldCheck, text: "Keine versteckten Kosten", color: 'text-accent' },
{ icon: Clock, text: "Preiseinschätzung < 24h", color: 'text-cta' },  // Orange
...

// NACHHER: Alle grün (text-accent)
{ icon: ShieldCheck, text: "Keine versteckten Kosten" },
{ icon: Clock, text: "Preiseinschätzung < 24h" },
...
// Farbe entfernen, Icon-Klasse zurück auf text-accent
```

**Trenner ändern (Zeile 32-34):**
```tsx
// VORHER
<span className="text-accent text-lg">•</span>

// NACHHER
<span className="text-accent text-lg">–</span>
```

---

## 2. Services-Section Anpassungen

### Aktuelle Probleme
- Wohnungsentrümpelung-Karte dominiert zu stark (großer grüner Block mit viel Text)
- Andere Service-Karten wirken im Vergleich klein
- Icons und Text nicht zentriert

### Lösung: Kompaktere Featured-Card + Zentrierte BentoCards

**A) Wohnungsentrümpelung-Card verkleinern**

Änderungen in `ServicesSection.tsx`:
- Padding reduzieren: `p-8 lg:p-12` → `p-6 lg:p-8`
- Kleinere Headline: `text-2xl lg:text-4xl` → `text-xl lg:text-2xl`
- USP-Pills kompakter machen
- Weniger vertikalen Abstand

**B) BentoCards zentrieren**

Änderungen in `BentoCard.tsx`:
- Icon und Text zentrieren mit `text-center` und `items-center`
- Icon-Container zentriert: `mx-auto`
- Inhalt zentriert: `text-center`

---

## Technische Details

### TrustBar.tsx - Komplette Änderungen

```tsx
const trustItems = [
  { icon: ShieldCheck, text: "Keine versteckten Kosten" },
  { icon: Clock, text: "Preiseinschätzung < 24h" },
  { icon: BadgeCheck, text: "Festpreis nach Einschätzung" },
  { icon: HeartHandshake, text: "Diskret & respektvoll" },
  { icon: Sparkles, text: "Besenrein" },
];

// Icon-Klasse ändern von {color} auf statisch text-accent
<Icon className="h-5 w-5 text-accent flex-shrink-0" />

// Trenner ändern
<span className="text-accent text-lg">–</span>
```

### ServicesSection.tsx - Featured Card kompakter

```tsx
// Zeile 51: Weniger Padding
className="... p-6 lg:p-8 mb-8 ..."  // vorher: p-8 lg:p-12 mb-10

// Zeile 60: Kleinerer Badge
className="... text-xs ... px-4 py-1.5 ... mb-4"  // vorher: text-sm, mb-6

// Zeile 64: Kleinere Headline
className="text-xl lg:text-2xl ..."  // vorher: text-2xl lg:text-4xl

// Zeile 68: Kürzerer Beschreibungstext
className="... text-base mb-6"  // vorher: text-lg mb-8

// Zeile 74: Kompaktere USP-Pills
className="... gap-3 mb-6"  // vorher: gap-4 mb-10
```

### BentoCard.tsx - Zentriertes Layout

```tsx
// Zeile 29: Karte zentriert ausrichten
className="... flex flex-col items-center text-center ..."

// Zeile 47-54: Icon zentrieren
<div className="... mx-auto mb-4 ...">

// Zeile 65: Content zentrieren
<div className="relative space-y-2 text-center">

// Zeile 98-108: Arrow-Indikator anpassen (zentriert unten)
className="... bottom-4 left-1/2 -translate-x-1/2 right-auto ..."
```

---

## Visuelles Ergebnis

```text
┌─────────────────────────────────────────────────────────────┐
│  ⭐ Unsere Kernkompetenz                                    │
│  Wohnungsentrümpelung                                       │
│  Kurze Beschreibung                                         │
│  [✓ USP 1] [✓ USP 2] [✓ USP 3]                             │
│  [📱 WhatsApp CTA]  Mehr erfahren →                        │
└─────────────────────────────────────────────────────────────┘
         ↑ Kompakter, weniger dominant

     ┌─────────────────┐    ┌─────────────────┐
     │      [Icon]     │    │      [Icon]     │
     │   Haushalts-    │    │   Keller/       │
     │   auflösung     │    │   Dachboden     │
     │   Subtitle      │    │   Subtitle      │
     └─────────────────┘    └─────────────────┘
     
     ┌─────────────────┐    ┌─────────────────┐
     │      [Icon]     │    │      [Icon]     │
     │   Gewerbe/      │    │   Diskrete      │
     │   Büro/Lager    │    │   Reinigung     │
     │   Subtitle      │    │   Subtitle      │
     └─────────────────┘    └─────────────────┘
              ↑ Icons und Text zentriert
```

---

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `TrustBar.tsx` | Orange `text-cta` entfernen → alle `text-accent`, Trenner "•" → "–" |
| `ServicesSection.tsx` | Featured Card kompakter (weniger Padding, kleinere Texte) |
| `BentoCard.tsx` | Layout zentrieren (Icon + Text mittig) |

**Ergebnis:**
- Einheitlich grüne Icons in der TrustBar (keine Orange-Akzente)
- Strich-Trenner statt Punkt
- Wohnungsentrümpelung-Karte ist erkennbar als Hauptleistung, aber nicht überwältigend
- Service-Kacheln haben zentrierte Icons und Texte für ein aufgeräumtes Design
