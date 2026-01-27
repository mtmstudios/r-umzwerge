
# Plan: Startseiten-Hero auf Fullscreen-Layout umstellen

## Problem

Die HeroSection der Startseite zeigt auf Desktop (`xl:` Breakpoint) ein **2-Spalten-Grid** mit Text links und Bild rechts. Dies passt nicht zum restlichen Design und wurde bei den Service-Seiten bereits auf ein einheitliches Fullscreen-Hintergrund-Layout umgestellt.

---

## Aktuelle Struktur (vereinfacht)

```text
+---------------------------+
| Mobile/Tablet:            |
| Fullscreen BG + Overlay   |
| Zentrierter weisser Text  |
+---------------------------+

+---------------------------+
| Desktop (xl:):            |
|  Text    |    Bild        |
|  links   |    rechts      |
|  (50%)   |    (50%)       |
+---------------------------+
```

---

## Neue Struktur (wie ServiceHero)

```text
+---------------------------+
| ALLE Breakpoints:         |
| Fullscreen Hintergrund    |
| Dunkler Overlay           |
| Zentrierter weisser Text  |
| Responsive Schriftgroessen|
+---------------------------+
```

---

## Technische Aenderungen

### Datei: `src/components/sections/HeroSection.tsx`

| Zeile | Aenderung |
|-------|-----------|
| 21-28 | `xl:hidden` entfernen - Hintergrund-Bild fuer ALLE Breakpoints |
| 30-31 | Desktop-Gradient-Hintergrund ENTFERNEN |
| 35-91 | `xl:hidden` entfernen - einheitliches Layout fuer alle Breakpoints |
| 42 | Textgroessen anpassen: `xl:text-5xl 2xl:text-6xl` hinzufuegen |
| 46 | Subline anpassen: `xl:text-xl` hinzufuegen |
| 37 | Min-Hoehe: `xl:min-h-[70vh]` hinzufuegen |
| 93-168 | Desktop 2-Spalten-Grid KOMPLETT ENTFERNEN |

### Detaillierte Code-Aenderungen

**1. Hintergrund-Bild fuer alle Breakpoints (Zeilen 20-31):**

Vorher:
```tsx
{/* Mobile & Tablet: Fullscreen background with overlay */}
<div className="xl:hidden absolute inset-0">
  ...
</div>

{/* Desktop: Standard background */}
<div className="hidden xl:block absolute inset-0 bg-gradient-to-br ..." />
```

Nachher:
```tsx
{/* Fullscreen background for ALL breakpoints */}
<div className="absolute inset-0">
  <img 
    src={heroTeamImage} 
    alt="..."
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
</div>
```

**2. Einheitliches Content-Layout (Zeilen 34-91):**

Vorher:
```tsx
<div className="xl:hidden min-h-[85vh] md:min-h-[75vh] flex flex-col ...">
```

Nachher:
```tsx
<div className="min-h-[85vh] md:min-h-[75vh] xl:min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-16 md:py-20 xl:py-24">
```

**3. Responsive Textgroessen:**

| Element | Alt | Neu |
|---------|-----|-----|
| H1 | `text-3xl md:text-4xl` | `text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl` |
| Subline | `text-base md:text-lg` | `text-base md:text-lg xl:text-xl` |
| CTAs | `h-12 md:h-14` | `h-12 md:h-14 xl:h-16` |
| Trust Pills | `text-xs` | `text-xs xl:text-sm` |

**4. Desktop-Grid entfernen (Zeilen 93-168):**

Der gesamte Block mit `hidden xl:grid xl:grid-cols-2` wird geloescht.

---

## Vorher / Nachher Vergleich

| Aspekt | Vorher (Desktop) | Nachher (Desktop) |
|--------|------------------|-------------------|
| Bild-Position | Rechts neben Text (50%) | Fullscreen-Hintergrund |
| Text-Farbe | Dunkel (foreground) | Weiss mit Overlay |
| Layout | 2-Spalten Grid | Zentriert |
| Min-Hoehe | py-20 | min-h-[70vh] |
| Dekorative Elemente | Ecken-Dekoration | Keine (cleaner Look) |

---

## Dateien-Uebersicht

| Datei | Aenderung |
|-------|-----------|
| `src/components/sections/HeroSection.tsx` | Layout vereinheitlichen, Desktop-Grid entfernen |

---

## Ergebnis

Die Startseite zeigt das Hero-Bild auf **allen Geraeten** als immersiven Fullscreen-Hintergrund mit zentriertem Text-Overlay - konsistent mit den Service-Seiten, modern und emotional ansprechend.
