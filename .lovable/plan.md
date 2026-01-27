
# Plan: SEA-Landingpages 1:1 an Hauptseiten-Design anpassen

## Zusammenfassung der Probleme

1. **Logo zu klein** - Container `h-16` statt `h-20`, Logo `h-28` statt `h-64`
2. **Buttons unterschiedlich** - Styles weichen von Hauptseiten ab
3. **Bewertungen viel zu wenig** - Nur 1 Zitat statt 3 Review-Karten + Google-Link
4. **Keine Hero-Bilder** - Service-Seiten haben Bilder, SEA-Seiten nicht
5. **Zwei CTA-Sections fast identisch** - SEAMidCTA und SEAFinalCTA sind zu ähnlich

---

## Teil 1: Header-Fix (`SEAMinimalHeader.tsx`)

### Aktuell (falsch):
```tsx
<div className="h-16 lg:h-20 overflow-hidden flex items-center">
  <img className="h-28 lg:h-36 w-auto object-contain object-center" />
</div>

<Button size="sm" className="gap-2 bg-cta hover:bg-cta-hover text-white h-10 px-4">
```

### Neu (wie Hauptseite):
```tsx
<div className="h-20 lg:h-24 overflow-hidden flex items-center -ml-8 lg:-ml-12">
  <img className="h-64 lg:h-80 w-auto object-contain object-left" />
</div>

<Button size="lg" className="gap-2.5 bg-cta hover:bg-cta-hover text-white font-semibold px-6 h-11 lg:h-12 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
```

---

## Teil 2: Hero mit Bild (`SEAHero.tsx`)

### Neue Struktur wie ServiceHero:
- Mobile/Tablet: Fullscreen-Hintergrundbild mit Overlay
- Desktop: Side-by-side Layout mit Bild rechts

### Bilder pro Variante:
| Variante | Bild |
|----------|------|
| `haushaltsaufloesung` | `/images/service-haushaltsaufloesung.jpg` |
| `entruempelung` | `/images/service-entruempelung.jpg` |
| `messie-hilfe` | `/images/service-messie.jpg` |

### Neue Datenstruktur (`seaData.ts`):
```tsx
export interface SEAData {
  // ... bestehende Felder
  heroImage: string;
  heroImageAlt: string;
}
```

### Button-Styling (wie HeroSection):
```tsx
// Mobile: Solid orange Call-Button
// Desktop: Outline mit orange hover
<Button className="gap-3 h-14 sm:h-16 px-6 sm:px-8 
  bg-cta text-cta-foreground 
  sm:bg-transparent sm:border-2 sm:border-primary sm:text-foreground
  sm:hover:bg-cta sm:hover:text-cta-foreground sm:hover:border-cta 
  transition-all duration-300">
```

---

## Teil 3: Social Proof komplett neu (`SEASocialProof.tsx`)

### Aktuell:
- Nur 1 Zitat
- Kein Google-Icon
- Kein Link zu Google Reviews
- Keine Review-Karten

### Neu (wie ReviewsSection):

```text
+-------------------------------------------------------+
|           Was unsere Kunden sagen                     |
|                                                       |
|    [G] ★★★★★ 5.0 · 12 Bewertungen                    |
+-------------------------------------------------------+
|                                                       |
|  +-------------+  +-------------+  +-------------+    |
|  | ★★★★★       |  | ★★★★★       |  | ★★★★★       |    |
|  | "Sehr pro-  |  | "Schnelle   |  | "Top Ser-   |    |
|  |  fessionell |  |  Termine,   |  |  vice!..."  |    |
|  |  ..."       |  |  ..."       |  |             |    |
|  |             |  |             |  |             |    |
|  | (M) Max M.  |  | (A) Anna K. |  | (S) Stefan  |    |
|  | vor 2 Wo.   |  | vor 1 Mon.  |  | vor 1 Mon.  |    |
|  +-------------+  +-------------+  +-------------+    |
|                                                       |
|        -> Alle Bewertungen auf Google [extern]        |
+-------------------------------------------------------+
```

### Imports hinzufugen:
```tsx
import { Star, ExternalLink } from 'lucide-react';
import { GOOGLE_RATING, GOOGLE_REVIEWS_LINK, FEATURED_REVIEWS } from '@/lib/constants';
```

### Komponenten:
- GoogleIcon SVG (farbig, wie in ReviewsSection)
- ReviewCard-Komponente mit Sterne, Text, Avatar, Datum
- Link zu Google Reviews mit ExternalLink-Icon

---

## Teil 4: CTA-Sections differenzieren

### Problem:
SEAMidCTA und SEAFinalCTA sind nahezu identisch - beide zeigen:
- "Preiseinschatzung in unter 24h"
- Gleiche Headline (`data.ctaHeadline`)
- Gleiche Buttons (WhatsApp + Anrufen)

### Losung: Unterschiedliche Fokuspunkte

#### SEAMidCTA - "Prozess-fokussiert" (nach Social Proof)
**Fokus:** Wie es funktioniert - einfacher nachster Schritt

```text
+-------------------------------------------------------+
|      So einfach geht's: Foto senden, Preis erhalten   |
|                                                       |
|   [1] Foto senden  [2] Einschatzung  [3] Termin      |
|                                                       |
|   [WhatsApp: Foto senden]  [Lieber anrufen?]         |
+-------------------------------------------------------+
```

**Anderungen:**
- Headline: "So einfach geht's" (statisch)
- 3 Mini-Prozess-Steps inline anzeigen
- WhatsApp primar, Anruf sekundar (Text-Link statt Button)

#### SEAFinalCTA - "Vertrauen-fokussiert" (am Ende)
**Fokus:** Letzte Uberzeugung, alle Bedenken ausraumen

```text
+-------------------------------------------------------+
|        {data.ctaHeadline}                             |
|        {data.ctaSubline}                              |
|                                                       |
|   [WhatsApp CTA groS]      [Anrufen CTA groS]        |
|                                                       |
|   [Unverbindlich] [Keine versteckten Kosten] [Besenrein] |
|                                                       |
|   Offnungszeiten: Mo-Sa 8-20 Uhr                     |
+-------------------------------------------------------+
```

**Anderungen:**
- Dynamische Headline aus data
- Beide Buttons gleich gros
- Trust-Badges bleiben
- Offnungszeiten hinzufugen fur extra Vertrauen

---

## Teil 5: Button-Texte vereinheitlichen

| Komponente | Aktuell | Neu |
|------------|---------|-----|
| SEAMidCTA | "Anrufen" | "Lieber anrufen?" (Text-Link) |
| SEAFinalCTA | "Anrufen" | "Jetzt anrufen" |

---

## Zusammenfassung der Dateiänderungen

| Datei | Anderung |
|-------|----------|
| `SEAMinimalHeader.tsx` | Logo groser (h-64/h-80), Button groser mit shadow + hover |
| `SEAHero.tsx` | Kompletter Umbau: Hero-Bild wie ServiceHero, Button-Styling |
| `seaData.ts` | `heroImage` + `heroImageAlt` Felder hinzufugen |
| `SEASocialProof.tsx` | Komplett neu: 3 Review-Karten, Google-Icon, Google-Link |
| `SEAMidCTA.tsx` | Prozess-fokussiert, Mini-Steps, WhatsApp primar |
| `SEAFinalCTA.tsx` | Trust-fokussiert, Offnungszeiten, gleich groBe Buttons |

---

## Visuelle Zusammenfassung der Seitenstruktur

```text
+-------------------------------------------+
| [Logo gross]            [Jetzt anrufen]   |  <- Header fix
+-------------------------------------------+
|                                           |
|   [HERO BILD als Hintergrund]             |  <- NEU: Bild
|                                           |
|   Headline                                |
|   Subline                                 |
|   [WhatsApp] [Anrufen]                   |
|   Trust Pills                             |
|                                           |
+-------------------------------------------+
|                                           |
|   Schmerzpunkte-Section                   |  <- bleibt
|                                           |
+-------------------------------------------+
|                                           |
|   Was unsere Kunden sagen                 |  <- NEU: 3 Karten
|   [G] 5.0 Sterne                          |
|   [Karte 1] [Karte 2] [Karte 3]          |
|   -> Alle auf Google                      |
|                                           |
+-------------------------------------------+
|                                           |
|   Before/After Slider                     |  <- bleibt
|                                           |
+-------------------------------------------+
|                                           |
|   So einfach geht's                       |  <- NEU: Prozess-fokus
|   [1] [2] [3]                            |
|   [WhatsApp]  Lieber anrufen?            |
|                                           |
+-------------------------------------------+
|                                           |
|   FAQ Accordion                           |  <- bleibt
|                                           |
+-------------------------------------------+
|                                           |
|   {ctaHeadline}                          |  <- NEU: Trust-fokus
|   {ctaSubline}                           |
|   [WhatsApp groB] [Anrufen groB]         |
|   Trust Badges                            |
|   Mo-Sa 8-20 Uhr                         |
|                                           |
+-------------------------------------------+
```

---

## Technische Details

### Hero-Bild Responsive Verhalten:
- **Mobile/Tablet (<xl):** Fullscreen-Hintergrund mit `bg-gradient-to-t from-black/80`
- **Desktop (xl+):** Side-by-side Grid mit Bild rechts, dekorative Elemente

### Review-Karten Animation:
```tsx
style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
```

### Prozess-Steps in MidCTA:
```tsx
const steps = [
  { num: '1', label: 'Foto senden' },
  { num: '2', label: 'Einschatzung erhalten' },
  { num: '3', label: 'Termin machen' },
];
```
