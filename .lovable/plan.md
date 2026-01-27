

# SEA-Landingpages: Conversion-optimiertes Design

## Strategie

Die SEA-Landingpages folgen bewährten Conversion-Prinzipien:
- **Minimale Ablenkung**: Kein vollständiges Menü, keine Footer-Links
- **Ein Ziel**: WhatsApp-Lead oder Anruf
- **Above-the-fold CTA**: Sofort sichtbar
- **Trust-Elemente**: Früh und oft wiederholt
- **Mobile-First**: 70%+ der SEA-Klicks kommen von Mobilgeräten

---

## Technische Architektur

### Routing

```text
/lp/haushaltsaufloesung  -> Haushaltsauflösung
/lp/entruempelung        -> Schnelle Entrümpelung  
/lp/messie-hilfe         -> Diskrete Messie-Hilfe
```

### Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/pages/SEALandingPage.tsx` | Hauptseite mit Slug-Routing |
| `src/lib/seaData.ts` | Daten für alle 3 Varianten |
| `src/components/sea/SEAMinimalHeader.tsx` | Nur Logo, kein Menü |
| `src/components/sea/SEAHero.tsx` | Fullscreen Hero mit CTA |
| `src/components/sea/SEAPainPoints.tsx` | 3 emotionale Problem->Lösung Karten |
| `src/components/sea/SEASocialProof.tsx` | Google-Rating + Kundenzitat |
| `src/components/sea/SEAMidCTA.tsx` | Preis-Teaser + CTA |
| `src/components/sea/SEAMiniFAQ.tsx` | 3-4 Fragen Accordion |
| `src/components/sea/SEAFinalCTA.tsx` | Full-Width Abschluss |
| `src/components/sea/SEAMinimalFooter.tsx` | Nur Impressum/Datenschutz |

---

## Seitenaufbau (alle 3 Varianten)

```text
+-------------------------------------------+
|  MINIMAL HEADER (60px)                    |
|  [Logo links] .............. [CTA rechts] |
+-------------------------------------------+
|                                           |
|  HERO (90vh mobile / 70vh desktop)        |
|  ---------------------------------------- |
|  "Headline mit Keyword + Nutzen"          |
|  Subline (1-2 Sätze)                      |
|                                           |
|  [WhatsApp CTA - gross, grün]             |
|  [Telefon CTA - sekundär]                 |
|                                           |
|  Trust-Pills: ✓ ✓ ✓                       |
+-------------------------------------------+
|                                           |
|  PAIN POINTS (3 Karten)                   |
|  ---------------------------------------- |
|  💭 "Dein Problem"                        |
|  → "Unsere Lösung"                        |
|                                           |
+-------------------------------------------+
|                                           |
|  SOCIAL PROOF                             |
|  ---------------------------------------- |
|  ⭐ 5.0 auf Google (12 Bewertungen)       |
|  "Kundenzitat hier..."                    |
|  — Max M.                                 |
|                                           |
+-------------------------------------------+
|                                           |
|  MID-PAGE CTA                             |
|  ---------------------------------------- |
|  "Preiseinschätzung in unter 24h"         |
|  [WhatsApp] [Anrufen]                     |
|                                           |
+-------------------------------------------+
|                                           |
|  MINI-FAQ (3-4 Fragen)                    |
|  ---------------------------------------- |
|  ▼ Wie läuft das ab?                      |
|  ▼ Was kostet das?                        |
|  ▼ Gibt es versteckte Kosten?             |
|                                           |
+-------------------------------------------+
|                                           |
|  FINAL CTA (Primary BG)                   |
|  ---------------------------------------- |
|  "Jetzt unverbindlich anfragen"           |
|  [WhatsApp] [Telefon]                     |
|                                           |
+-------------------------------------------+
|  MINIMAL FOOTER                           |
|  Impressum | Datenschutz | ©2025          |
+-------------------------------------------+
```

---

## Variante 1: Haushaltsauflösung

**Zielgruppe**: Angehörige nach Todesfall, Pflegeheim-Umzug

**Headline**: 
> "Haushaltsauflösung komplett – wir nehmen Ihnen alles ab."

**Subline**: 
> "Einfühlsam, respektvoll und besenrein. Preiseinschätzung per WhatsApp-Foto innerhalb von 24 Stunden."

**Trust-Pills**: `Einfühlsam` | `Festpreis möglich` | `Besenrein`

**Pain Points**:
1. 💭 "Ein Angehöriger ist verstorben – und jetzt muss alles aufgelöst werden."  
   → Wir räumen respektvoll, damit Sie Zeit zum Trauern haben.

2. 💭 "Umzug ins Pflegeheim – aber wer kümmert sich um die Wohnung?"  
   → Strukturierte Auflösung ohne Zeitdruck, alles aus einer Hand.

3. 💭 "Die Immobilie muss verkauft werden – aber sie ist noch voll."  
   → Übergabefertig in wenigen Tagen, besenrein und dokumentiert.

**FAQ**:
- Wie schnell bekomme ich einen Termin?
- Gibt es versteckte Kosten?
- Was passiert mit Wertgegenständen?
- Muss ich dabei sein?

---

## Variante 2: Entrümpelung

**Zielgruppe**: Schnelle Lösung, preisbewusst

**Headline**: 
> "Entrümpelung zum Festpreis – schnell, sauber, transparent."

**Subline**: 
> "Foto senden, Preis erhalten, Termin machen. Besenrein garantiert."

**Trust-Pills**: `Antwort < 24h` | `Besenrein` | `Keine versteckten Kosten`

**Pain Points**:
1. 💭 "Kein Platz mehr – alles voll, man kommt kaum noch durch."  
   → Wir schaffen Ordnung – oft an nur einem Tag.

2. 💭 "Keine Zeit, das alles selbst zu machen."  
   → Wir übernehmen alles: Sortieren, Tragen, Entsorgen.

3. 💭 "Was kostet das überhaupt? Keine Lust auf böse Überraschungen."  
   → Transparenter Festpreis nach Foto-Einschätzung. Keine versteckten Kosten.

**FAQ**:
- Wie läuft die Preiseinschätzung ab?
- Wie schnell könnt ihr kommen?
- Was ist im Preis enthalten?
- Gibt es versteckte Kosten?

---

## Variante 3: Messie-Hilfe (Diskret)

**Zielgruppe**: Betroffene oder Angehörige, extrem sensibel

**Headline**: 
> "Diskrete Hilfe bei Messie-Situationen – ohne Vorurteile."

**Subline**: 
> "Wir verstehen. Keine Verurteilung, keine neugierigen Blicke. 100% diskret und respektvoll."

**Trust-Pills**: `100% Diskret` | `Neutrale Fahrzeuge` | `Ein Ansprechpartner`

**Pain Points**:
1. 💭 "Ich schäme mich so – niemand darf das sehen."  
   → Wir arbeiten diskret und ohne jede Wertung. Ihre Privatsphäre ist geschützt.

2. 💭 "Was, wenn die Nachbarn etwas mitbekommen?"  
   → Neutrale Kleidung, keine Firmenlogos auf Fahrzeugen. Kein Aufsehen.

3. 💭 "Ich weiß nicht, wo ich anfangen soll."  
   → Wir begleiten Sie Schritt für Schritt. Ein fester Ansprechpartner für alles.

**Besonderheiten dieser Variante**:
- Wärmere, sanftere Farbgebung (weniger kontrastreich)
- Keine Bilder von "Vorher"-Zuständen
- Längere, einfühlsame Texte
- Empathische Sprache durchgehend

**FAQ**:
- Wie diskret arbeitet ihr wirklich?
- Muss die betroffene Person dabei sein?
- Wie schnell könnt ihr helfen?
- Bietet ihr auch Reinigung an?

---

## Design-Entscheidungen

### Mobile-First (70%+ Traffic)

| Element | Mobile | Desktop |
|---------|--------|---------|
| Hero-Höhe | 90vh | 70vh |
| CTA-Buttons | Full-Width, gestapelt | Nebeneinander |
| Pain-Points | 1 Spalte | 3 Spalten |
| Font-Size H1 | 28px | 48px |
| WhatsApp-CTA | Sticky am Bottom | Im Content |

### CTA-Design

- **WhatsApp (primär)**: Grün (#25D366), gross, mit Icon, Lift-Animation
- **Telefon (sekundär)**: Orange (#FF8A3D), kleiner
- **Button-Text optimiert**:
  - Mobile: "Foto senden"
  - Desktop: "Foto senden · Preiseinschätzung erhalten"

### Keine Ablenkungen

- Kein Hamburger-Menü
- Keine Footer-Navigation
- Keine Scroll-Progress-Bar
- Keine Floating CTAs (bereits im Content)

---

## SEA/Tracking-Vorbereitung

### robots.txt (optional)
```text
# Landingpages aus organischer Suche ausschließen
Disallow: /lp/
```

### UTM-ready Links
Die WhatsApp-Links können mit UTM-Parametern erweitert werden:
```text
?utm_source=google&utm_medium=cpc&utm_campaign=haushaltsaufloesung
```

### Event-Tracking (Vorbereitung)
Alle CTA-Buttons erhalten `data-track` Attribute für späteres Analytics-Setup:
- `data-track="cta-whatsapp-hero"`
- `data-track="cta-phone-hero"`
- `data-track="cta-whatsapp-mid"`
- `data-track="cta-whatsapp-final"`

---

## Zusammenfassung

3 fokussierte, schnelle Landingpages:

| Route | Fokus | Ton |
|-------|-------|-----|
| `/lp/haushaltsaufloesung` | Einfühlsam, respektvoll | Warm, verständnisvoll |
| `/lp/entruempelung` | Schnell, transparent | Direkt, preisbewusst |
| `/lp/messie-hilfe` | Extrem diskret | Sanft, ohne Wertung |

Wiederverwendbare Komponenten, eine Datenstruktur, drei emotionale Varianten.

