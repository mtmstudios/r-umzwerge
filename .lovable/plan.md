
# Plan: Leistungsseiten mit Startseite verbinden und UI/UX optimieren

## Problemanalyse

### 1. Verbindungsproblem Startseite ↔ Unterseiten

Die Homepage-Kacheln und die Service-Unterseiten sind nicht korrekt verknüpft:

| Startseite (Kachel) | Slug in Link | Existiert in serviceData.ts? |
|---------------------|--------------|------------------------------|
| Featured Card "Wohnungsentrümpelung" | `/leistungen` (Übersicht) | Nein - fehlt als eigene Seite! |
| Haushaltsauflösung | `haushaltsaufloesung` | Ja |
| Keller/Dachboden/Garage | `keller-dachboden-garage` | Ja |
| Gewerbe/Büro/Lager | `gewerbe-buero-lager` | Ja |
| Diskrete Reinigung | `messie-wohnungen` | Ja |

**Problem:** Die Hauptleistung "Wohnungsentrümpelung" hat keine eigene Unterseite - sie verweist nur auf die Übersicht.

### 2. UI/UX-Schwächen der Unterseiten

Nach Analyse der Komponenten identifiziere ich folgende Probleme:

| Bereich | Problem | Auswirkung |
|---------|---------|------------|
| **Hero** | Placeholder-Bild ("Bild folgt") | Wirkt unprofessionell |
| **Szenario-Kacheln** | Zu schlicht, keine Icons | Wenig ansprechend |
| **Abschnitte** | Monotone Abwechslung (bg/bg-secondary) | Kein visueller Rhythmus |
| **Sticky Bar** | Konkurriert mit Header | Verwirrende Navigation |
| **Breadcrumbs** | Fehlen komplett | Schlechte Orientierung |
| **ExtraModule** | Zentriert, wenig Struktur | Geht unter |

---

## Lösungsplan

### Teil A: Verbindungen korrigieren

**A1: Neue Seite für "Wohnungsentrümpelung" hinzufügen**

In `src/lib/serviceData.ts` einen neuen Eintrag hinzufügen:

```typescript
'wohnungsentruempelung': {
  slug: 'wohnungsentruempelung',
  title: 'Wohnungsentrümpelung',
  hero: {
    h1: 'Wohnungsentrümpelung – sauber, diskret, transparent.',
    subline: 'Von der ersten Preiseinschätzung bis zur besenreinen Übergabe...',
    trustPills: ['Besenrein', 'Festpreis nach Einschätzung', 'Keine versteckten Kosten'],
  },
  // ... vollständige Daten
}
```

**A2: Featured Card Link anpassen**

In `ServicesSection.tsx` den "Mehr erfahren" Link ändern:

```tsx
// Alt:
href="/leistungen"

// Neu:
href="/leistungen/wohnungsentruempelung"
```

**A3: Übersichtsseite erweitern**

In `ServicesOverview.tsx` die Wohnungsentrümpelung als erste/featured Kachel anzeigen.

---

### Teil B: UI/UX-Optimierungen

**B1: Hero-Section verbessern**

- Gradient-Overlay statt leerer Placeholder
- Dezentes Muster oder abstraktes Visual
- Trust-Pills prominenter gestalten

```tsx
// Statt leerem Bild:
<div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
  <div className="w-full h-full flex items-center justify-center">
    {/* Dekoratives Icon-Pattern */}
  </div>
</div>
```

**B2: Breadcrumb-Navigation hinzufügen**

Neue Komponente für bessere Orientierung:

```tsx
// Unter dem Header:
<nav className="container-custom pt-20 pb-4">
  <ol className="flex items-center gap-2 text-sm text-muted-foreground">
    <li><a href="/" className="hover:text-foreground">Start</a></li>
    <li>/</li>
    <li><a href="/leistungen" className="hover:text-foreground">Leistungen</a></li>
    <li>/</li>
    <li className="text-foreground font-medium">{pageData.title}</li>
  </ol>
</nav>
```

**B3: Szenario-Kacheln aufwerten**

Icons und Hover-Effekte hinzufügen:

```tsx
<div className="bg-card border border-border rounded-xl p-6 
  hover:shadow-md hover:border-primary/30 hover:-translate-y-1 
  transition-all duration-200">
  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
    <Users className="h-5 w-5 text-primary" />
  </div>
  <h3 className="font-semibold">{scenario.title}</h3>
  <p className="text-sm text-muted-foreground">{scenario.description}</p>
</div>
```

**B4: Sticky Bar optimieren**

Die Bar nach unten verschieben (unter Header) oder als Bottom-Bar auf Mobile:

```tsx
// Option: Bottom-Bar auf Mobile, Top auf Desktop
<div className={cn(
  "fixed z-40 bg-background/95 backdrop-blur-sm border shadow-sm",
  // Desktop: Oben unter Header
  "hidden lg:block lg:top-16 lg:left-0 lg:right-0 lg:border-b",
  // Mobile: Unten
  "lg:hidden bottom-0 left-0 right-0 border-t"
)}>
```

**B5: Visuellen Rhythmus verbessern**

Sektionen mit unterschiedlichen Akzenten:

| Sektion | Hintergrund | Akzent |
|---------|-------------|--------|
| Hero | `bg-background` | - |
| Szenarien | `bg-secondary/30` | - |
| Leistungsumfang | `bg-background` | Grüne Akzentkante links |
| Ablauf | `bg-primary/5` | Primärfarbe |
| ExtraModule | `bg-gradient-to-br` | Volle Farbe |
| Preise | `bg-secondary/30` | - |
| FAQ | `bg-background` | - |
| Final CTA | `bg-primary` | Volle Farbe |

---

## Änderungen im Überblick

| Datei | Änderung |
|-------|----------|
| `src/lib/serviceData.ts` | Eintrag für "wohnungsentruempelung" hinzufügen + Icon-Mapping |
| `src/components/sections/ServicesSection.tsx` | Featured Card Link zu `/leistungen/wohnungsentruempelung` |
| `src/pages/ServicesOverview.tsx` | "Wohnungsentrümpelung" als Featured-Service anzeigen |
| `src/pages/ServicePage.tsx` | Breadcrumb-Navigation hinzufügen |
| `src/components/services/ServiceHero.tsx` | Gradient-Visual statt Placeholder |
| `src/components/services/ScenarioGrid.tsx` | Icons + Hover-Effekte für Kacheln |
| `src/components/services/StickyConversionBar.tsx` | Position optimieren (Mobile: Bottom) |
| `src/components/services/ServiceScope.tsx` | Dezente Akzentlinie hinzufügen |
| `src/components/services/ServiceProcess.tsx` | Hintergrund zu `bg-primary/5` |

---

## Erwartetes Ergebnis

1. **Nahtlose Navigation:** Alle Kacheln auf der Startseite führen zur korrekten Unterseite
2. **Professioneller Eindruck:** Keine Placeholder, konsistente Visuals
3. **Bessere Orientierung:** Breadcrumbs zeigen wo man ist
4. **Visueller Rhythmus:** Abwechslung ohne Überladung
5. **Mobile-Optimierung:** Sticky Bar als Bottom-Bar auf Mobile
