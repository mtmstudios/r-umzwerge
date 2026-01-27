
# Fix: Timeline-Linie geht durch die Karten

## Problem-Analyse

Die horizontale Verbindungslinie im Prozess-Abschnitt ("In 3 Schritten zum freien Raum") schneidet visuell durch die Ecken der Karten, anstatt dahinter zu verlaufen. Dies betrifft die `HorizontalTimeline`-Komponente, die auf folgenden Seiten verwendet wird:

- **Startseite** (`ProcessSection.tsx`)
- **Service-Seiten** (`ServiceProcess.tsx`)
- **Städte-Seiten** (`CityPage.tsx` via `ServiceProcess`)

## Ursache

In `src/components/ui/HorizontalTimeline.tsx`:
- Die Progress-Linie (Zeile 27-32) hat keinen `z-index` definiert
- Die Step-Circles haben `z-10` (Zeile 53)
- Da die Linie absolut positioniert ist (`absolute top-[60px]`), wird sie manchmal visuell vor den Karten gerendert
- Der `border-radius` der Karten (`rounded-2xl/3xl`) lässt die Linie an den Ecken durchscheinen

## Loesung

Die Progress-Linie bekommt `z-0`, damit sie definitiv **hinter** den Karten mit `z-10` liegt.

---

## Technische Umsetzung

### Datei: `src/components/ui/HorizontalTimeline.tsx`

**Zeile 27** - z-index zur Progress-Linie hinzufuegen:

```tsx
// VORHER:
<div className="hidden md:block absolute top-[60px] left-0 right-0 h-1 bg-border rounded-full mx-auto max-w-3xl">

// NACHHER:
<div className="hidden md:block absolute top-[60px] left-0 right-0 z-0 h-1 bg-border rounded-full mx-auto max-w-3xl">
```

Diese minimale Aenderung stellt sicher, dass die Linie (z-0) immer hinter den Karten (z-10) gerendert wird.

---

## Betroffene Seiten (automatisch gefixt)

Da alle Timeline-Sections die zentrale `HorizontalTimeline`-Komponente verwenden, wird dieser Fix global wirksam:

1. Startseite - Ablauf-Section
2. Alle 5 Service-Seiten (Wohnungsentruempelung, Haushaltsaufloesung, etc.)
3. Alle 8 Staedte-Seiten (Ulm, Muenchen, Stuttgart, etc.)
4. SEA-Landingpages (verwenden eigene Card-Variante ohne Linie - nicht betroffen)

---

## Zusammenfassung

| Aenderung | Datei | Zeile |
|-----------|-------|-------|
| `z-0` hinzufuegen zur Progress-Linie | `HorizontalTimeline.tsx` | 27 |

**1 Datei, 1 Zeile geaendert** - minimaler Eingriff mit maximalem Effekt.
