

# "Warum Räumzwerge" Section für SEA-Landingpages

## Übersicht

Die interaktive "Warum Räumzwerge?" Flip-Card-Section soll auf alle SEA-Landingpages übertragen und themenspezifisch angepasst werden.

### Wichtiger Unterschied zu SEAPainPoints:
- **SEAPainPoints**: Zeigt emotionale Probleme des Kunden → Räumzwerge-Lösung
- **SEAComparison (neu)**: Zeigt Probleme bei anderen Anbietern → Räumzwerge-Vorteil

Die Sections ergänzen sich – eine spricht emotionale Situationen an, die andere differenziert vom Wettbewerb.

## Neue Section: SEAComparison

### Platzierung
Nach `SEAMidCTA` und vor `SEAMiniFAQ` – als zusätzlicher Vertrauensbildner kurz vor dem FAQ.

### Themenspezifische Inhalte

| Variante | Headline | Vergleichspunkte |
|----------|----------|------------------|
| **Haushaltsauflösung** | "Warum Räumzwerge für Ihre Haushaltsauflösung?" | Einfühlsam vs. unpersönlich, Wertanrechnung vs. alles entsorgt, fester Ansprechpartner vs. wechselndes Personal |
| **Entrümpelung** | "Warum Räumzwerge für Ihre Entrümpelung?" | Schnelle WhatsApp-Einschätzung vs. nur Vorort-Termin, Festpreis vs. versteckte Kosten, Besenrein vs. grob geräumt |
| **Messie-Hilfe** | "Warum Räumzwerge?" | 100% Diskretion vs. auffällige Fahrzeuge, ohne Wertung vs. vorschnelle Urteile, fester Ansprechpartner vs. wechselndes Team |

### Badges pro Variante

| Variante | Badges |
|----------|--------|
| **Haushaltsauflösung** | "Respektvoll", "Wertanrechnung möglich", "Ein Ansprechpartner" |
| **Entrümpelung** | "Festpreis möglich", "Besenrein", "Schnelle Termine" |
| **Messie-Hilfe** | "100% Diskret", "Ohne Wertung", "Neutrale Fahrzeuge" |

## Änderungen

### 1. Neue Komponente: `src/components/sea/SEAComparison.tsx`

Nutzt die bestehende `UnifiedComparison`-Komponente mit themenspezifischen Daten:

```text
SEAComparison
├── Props: { data: SEAData }
├── Wählt Vergleichsdaten basierend auf data.slug
├── Passt Headline/Subline an data.tone an
└── Verwendet UnifiedComparison mit angepassten Badges
```

### 2. Daten in `src/lib/seaData.ts` erweitern

Neue optionale `comparison`-Property im `SEAData` Interface:

```typescript
comparison?: {
  headline: string;
  subline: string;
  pairs: Array<{ problem: string; solution: string }>;
  badges: string[];
};
```

Daten für alle drei Varianten hinzufügen.

### 3. SEA-Landingpage einbinden

In `SEALandingPage.tsx` die neue Section nach `SEAMidCTA` einfügen:

```text
<SEAHero />
<SEAPainPoints />
<SEASocialProof />
<SEABeforeAfter />
<SEAMidCTA />
<SEAComparison />  ← NEU
<SEAMiniFAQ />
<SEAFinalCTA />
```

## Themenspezifische Vergleichspunkte (Details)

### Haushaltsauflösung (tone: "warm")

| Andere Anbieter | Räumzwerge |
|-----------------|------------|
| Schnelles Abarbeiten ohne Rücksicht | Einfühlsame Begleitung in schweren Zeiten |
| Alles wird entsorgt | Wertanrechnung und Spenden möglich |
| Wechselndes Personal | Ein fester Ansprechpartner für alles |
| Nur grobe Räumung | Besenrein und dokumentiert |

### Entrümpelung (tone: "direct")

| Andere Anbieter | Räumzwerge |
|-----------------|------------|
| Preisschätzung nur vor Ort | Einschätzung per WhatsApp < 24h |
| Versteckte Zusatzkosten | Transparenter Festpreis möglich |
| Grob geräumt | Besenrein garantiert |
| Lange Wartezeiten | Schnelle Terminvergabe |

### Messie-Hilfe (tone: "gentle")

| Andere Anbieter | Räumzwerge |
|-----------------|------------|
| Auffällige Firmenfahrzeuge | Neutrale Fahrzeuge auf Wunsch |
| Schnelle Urteile, Druck | Keine Wertung, kein Zeitdruck |
| Wechselndes Team | Ein vertrauter Ansprechpartner |
| Unpersönliche Abwicklung | Respektvolle Begleitung Schritt für Schritt |

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/lib/seaData.ts` | Interface erweitern, Comparison-Daten für alle 3 Varianten hinzufügen |
| `src/components/sea/SEAComparison.tsx` | **NEU** – Wrapper für UnifiedComparison mit SEA-Daten |
| `src/pages/SEALandingPage.tsx` | SEAComparison importieren und einbinden |

## Visueller Stil

Die Section übernimmt das Design der `UnifiedComparison`:
- Flip-Cards mit Problem/Lösung
- Fortschrittsanzeige "Entdeckt X von Y"
- Staggered Scroll-Animations
- Badges am Ende
- Konsistent mit dem "premium" Look der SEA-Landingpages

