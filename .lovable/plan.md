
# 3 Maßgeschneiderte Funnels für SEA-Landingpages

## Übersicht

Statt eines generischen Funnels mit Varianten erstelle ich **3 komplett separate Funnel-Komponenten**, die thematisch auf die jeweilige Landingpage zugeschnitten sind.

## Aktuelle Struktur

```text
ContactFunnelModal.tsx (universal)
└── FunnelSteps.tsx
    ├── Step 1: Was möchten Sie räumen? (6 generische Optionen)
    ├── Step 2: Umfang (Klein/Mittel/Groß)
    ├── Step 3: Standort (PLZ/Ort)
    ├── Step 4: Zeitrahmen
    └── Step 5: Kontaktdaten
```

## Neue Struktur

```text
src/components/contact/
├── ContactFunnelModal.tsx      ← Bleibt: Hauptseite, Services, Regionale
├── FunnelSteps.tsx             ← Bleibt: Generische Steps
│
├── sea/                        ← NEU: SEA-spezifische Funnels
│   ├── HaushaltsaufloesungFunnel.tsx
│   ├── EntruempelungFunnel.tsx
│   └── MessieFunnel.tsx
```

---

## Funnel 1: Haushaltsauflösung

**Kontext:** Trauerfall, Pflegeheim-Umzug, Nachlass

| Step | Frage | Optionen |
|------|-------|----------|
| 1 | Was wird aufgelöst? | Wohnung, Haus, Wohngemeinschaft |
| 2 | Grund der Auflösung | Trauerfall, Pflegeheim, Verkauf, Sonstiges |
| 3 | Umfang | Komplett, Teilweise, Nur Entrümpelung |
| 4 | Standort + Zeitrahmen | PLZ/Ort + Wann soll es stattfinden? |
| 5 | Kontaktdaten | Name, Telefon, Email, Nachricht |

**Besondere Anpassungen:**
- Einfühlsamer Ton ("Wir begleiten Sie")
- "Grund der Auflösung" für bessere Vorbereitung des Teams
- Option "Komplett" vs "Teilweise" statt Raumanzahl

---

## Funnel 2: Entrümpelung

**Kontext:** Schnell, direkt, Festpreis

| Step | Frage | Optionen |
|------|-------|----------|
| 1 | Was wird entrümpelt? | Wohnung, Haus, Keller/Dachboden, Garage, Gewerbe/Büro |
| 2 | Wie voll ist es? | Wenig (1-2 Räume), Normal (3-4 Räume), Viel (5+ Räume / Komplett) |
| 3 | Standort | PLZ/Ort |
| 4 | Wann soll es losgehen? | Schnellstmöglich, In 1-2 Wochen, In 1 Monat+, Flexibel |
| 5 | Kontaktdaten | Name, Telefon, Email, Nachricht |

**Besondere Anpassungen:**
- Direkter Ton
- "Wie voll ist es?" statt "Umfang"
- Garage als eigene Option (häufiger Anwendungsfall)

---

## Funnel 3: Messie-Hilfe

**Kontext:** Sensibel, diskret, einfühlsam

| Step | Frage | Optionen |
|------|-------|----------|
| 1 | Wer braucht Hilfe? | Ich selbst, Ein Angehöriger, Ich bin Betreuer/Verwalter |
| 2 | Wie ist die Situation? | Einzelne Räume betroffen, Mehrere Räume, Gesamte Wohnung/Haus |
| 3 | Was ist Ihnen wichtig? | Diskrete Anfahrt, Schrittweises Vorgehen, Begleitung vor Ort, Reinigung nach Räumung |
| 4 | Standort + Kontakt | PLZ/Ort (kombiniert mit Zeitrahmen) |
| 5 | Ihre Nachricht | Name, Telefon, Freitextfeld für persönliche Situation |

**Besondere Anpassungen:**
- Sehr einfühlsamer, nicht wertender Ton
- "Wer braucht Hilfe?" - wichtig für Kommunikation
- "Was ist Ihnen wichtig?" - Multiselect für Wünsche
- Größeres Nachrichtenfeld für persönliche Situation
- Keine Zeitdruck-Optionen

---

## Technische Umsetzung

### Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/components/contact/sea/HaushaltsaufloesungFunnel.tsx` | 5-Step Funnel für Haushaltsauflösung |
| `src/components/contact/sea/EntruempelungFunnel.tsx` | 5-Step Funnel für Entrümpelung |
| `src/components/contact/sea/MessieFunnel.tsx` | 5-Step Funnel für Messie-Hilfe |

### Gemeinsame Elemente (werden wiederverwendet)

- **Modal/Drawer-Logik:** Wird aus `ContactFunnelModal.tsx` kopiert
- **Styling:** Gleiche Kompakt-Optimierungen für Mobile/Tablet
- **Webhook:** Gleicher Endpunkt, aber angepasste Feldnamen
- **Progress Bar:** Gleiche Komponente
- **Animation:** Framer Motion Transitions

### Angepasste Payloads

**Haushaltsauflösung:**
```javascript
{
  funnel_typ: 'haushaltsaufloesung',
  objektart: 'wohnung' | 'haus' | 'wg',
  grund: 'trauerfall' | 'pflegeheim' | 'verkauf' | 'sonstiges',
  umfang: 'komplett' | 'teilweise' | 'nur_entruempelung',
  plz: '...',
  ort: '...',
  zeitrahmen: '...',
  name: '...',
  telefon: '...',
  email: '...',
  nachricht: '...'
}
```

**Entrümpelung:**
```javascript
{
  funnel_typ: 'entruempelung',
  objektart: 'wohnung' | 'haus' | 'keller' | 'garage' | 'gewerbe',
  fuellgrad: 'wenig' | 'normal' | 'viel',
  plz: '...',
  ort: '...',
  zeitrahmen: 'schnell' | '2wochen' | 'monat' | 'flexibel',
  name: '...',
  telefon: '...',
  email: '...',
  nachricht: '...'
}
```

**Messie-Hilfe:**
```javascript
{
  funnel_typ: 'messie',
  betroffener: 'selbst' | 'angehoeriger' | 'betreuer',
  situation: 'einzelne_raeume' | 'mehrere_raeume' | 'komplett',
  wuensche: ['diskret', 'schrittweise', 'begleitung', 'reinigung'], // Array
  plz: '...',
  ort: '...',
  name: '...',
  telefon: '...',
  nachricht: '...' // Größeres Feld
}
```

---

## SEAHero.tsx Anpassung

```tsx
// Import der 3 spezifischen Funnels
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';

// Dynamische Auswahl basierend auf data.slug
const renderFunnel = () => {
  switch (data.slug) {
    case 'haushaltsaufloesung':
      return <HaushaltsaufloesungFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />;
    case 'entruempelung':
      return <EntruempelungFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />;
    case 'messie-hilfe':
      return <MessieFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />;
  }
};
```

---

## Visuelle Darstellung der 3 Funnels

### Haushaltsauflösung (warm, einfühlsam)
```text
┌────────────────────────────────────┐
│ Was wird aufgelöst?                │
│ ┌──────┐ ┌──────┐ ┌──────┐        │
│ │Wohnng│ │ Haus │ │  WG  │        │
│ └──────┘ └──────┘ └──────┘        │
├────────────────────────────────────┤
│ Was ist der Grund?                 │
│ ○ Trauerfall                       │
│ ○ Umzug ins Pflegeheim            │
│ ○ Verkauf der Immobilie           │
│ ○ Sonstiges                        │
└────────────────────────────────────┘
```

### Entrümpelung (direkt, effizient)
```text
┌────────────────────────────────────┐
│ Was wird entrümpelt?               │
│ ┌────┐┌────┐┌────┐┌────┐┌────┐   │
│ │Wohn││Haus││Kell││Gara││Gewe│   │
│ └────┘└────┘└────┘└────┘└────┘   │
├────────────────────────────────────┤
│ Wie voll ist es?                   │
│ ┌──────────┐                       │
│ │ Wenig    │ 1-2 Räume             │
│ ├──────────┤                       │
│ │ Normal   │ 3-4 Räume             │
│ ├──────────┤                       │
│ │ Viel     │ 5+ Räume              │
│ └──────────┘                       │
└────────────────────────────────────┘
```

### Messie-Hilfe (sanft, ohne Druck)
```text
┌────────────────────────────────────┐
│ Wer braucht Hilfe?                 │
│ ○ Ich selbst                       │
│ ○ Ein Angehöriger                  │
│ ○ Ich bin Betreuer/Verwalter       │
├────────────────────────────────────┤
│ Was ist Ihnen besonders wichtig?   │
│ ☑ Diskrete Anfahrt (neutrale Fzg.) │
│ ☑ Schrittweises Vorgehen           │
│ ☐ Begleitung vor Ort               │
│ ☐ Reinigung nach Räumung           │
├────────────────────────────────────┤
│ Erzählen Sie uns mehr (optional)   │
│ ┌──────────────────────────────┐   │
│ │                              │   │
│ │ [Größeres Textfeld]          │   │
│ │                              │   │
│ └──────────────────────────────┘   │
└────────────────────────────────────┘
```

---

## Zusammenfassung

| Seite | Funnel | Steps | Besonderheit |
|-------|--------|-------|--------------|
| Hauptseite, Services, Regional | Standard | 5 | Generisch, alle Optionen |
| /lp/haushaltsaufloesung | Haushaltsauflösung | 5 | Grund-Frage, einfühlsam |
| /lp/entruempelung | Entrümpelung | 5 | Füllgrad-Frage, direkt |
| /lp/messie-hilfe | Messie | 5 | Betroffener-Frage, Multiselect, sanft |

## Änderungen nach Datei

| Datei | Aktion |
|-------|--------|
| `src/components/contact/sea/HaushaltsaufloesungFunnel.tsx` | NEU erstellen |
| `src/components/contact/sea/EntruempelungFunnel.tsx` | NEU erstellen |
| `src/components/contact/sea/MessieFunnel.tsx` | NEU erstellen |
| `src/components/sea/SEAHero.tsx` | Anpassen: richtige Funnel-Komponente importieren |
| `src/components/sea/SEAFinalCTA.tsx` | Anpassen: richtige Funnel-Komponente verwenden |
| `src/components/sea/SEAMidCTA.tsx` | Anpassen: richtige Funnel-Komponente verwenden |
