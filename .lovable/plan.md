

## SEA Landingpage Hero vereinheitlichen

Die SEA Hero-Komponente wird an das Layout der ServiceHero-Komponente angepasst, sodass alle Landingpages ein einheitliches, fullscreen Hero-Design haben.

---

## Änderungen im Überblick

| Änderung | Beschreibung |
|----------|--------------|
| Neues Hero-Bild | Das hochgeladene Bild wird als gemeinsames Hero-Bild für alle drei LPs verwendet |
| Layout-Anpassung | Entfernung des Desktop Side-by-Side Layouts zugunsten eines einheitlichen Fullscreen-Layouts |
| Konsistenz | Angleichung an ServiceHero mit zentriertem Content auf allen Bildschirmgrößen |

---

## Umsetzungsschritte

### 1. Hero-Bild speichern

Das hochgeladene Bild (Räumzwerge-Team beim Beladen des Transporters) wird gespeichert als:

- `public/images/sea-hero-team.png`

Dieses Bild zeigt das professionelle Team bei der Arbeit und eignet sich ideal als vertrauensbildendes Hero-Bild für alle SEA-Landingpages.

### 2. SEAHero Komponente vereinfachen

**Datei:** `src/components/sea/SEAHero.tsx`

Die Komponente wird grundlegend vereinfacht:

- Entfernung des separaten Desktop-Layouts (Side-by-Side Grid)
- Einheitliches Fullscreen-Layout für ALLE Breakpoints (wie ServiceHero)
- Beibehaltung der dynamischen CTA-Texte basierend auf dem Tone

**Neues Layout (analog zu ServiceHero):**
```text
- Fullscreen Hintergrundbild mit Overlay
- Zentrierter Content (H1, Subline, CTAs, Trust Pills)
- Einheitliche Höhe: min-h-[85vh] auf Mobile, min-h-[75vh] auf Tablet, min-h-[70vh] auf Desktop
```

### 3. SEAData aktualisieren

**Datei:** `src/lib/seaData.ts`

Das heroImage für alle drei Varianten wird auf das neue gemeinsame Bild geändert:

```text
heroImage: '/images/sea-hero-team.png'
heroImageAlt: 'Räumzwerge-Team beim professionellen Beladen des Transporters'
```

---

## Vorher / Nachher Vergleich

| Aspekt | Vorher (SEAHero) | Nachher |
|--------|------------------|---------|
| Desktop-Layout | Side-by-Side (Text links, Bild rechts) | Fullscreen zentriert |
| Mobile-Layout | Fullscreen zentriert | Fullscreen zentriert (unverändert) |
| Hintergrund Desktop | Gradient ohne Bild | Fullscreen Bild mit Overlay |
| Hero-Bilder | Unterschiedliche pro LP | Ein gemeinsames Team-Bild |

---

## Erwartetes Ergebnis

- Alle drei SEA Landingpages (`/lp/haushaltsaufloesung`, `/lp/entruempelung`, `/lp/messie-hilfe`) haben einen einheitlichen, fullscreen Hero
- Das neue Team-Bild vermittelt Professionalität und Vertrauen
- Das Layout entspricht nun dem der ServicePages
- Die spezifischen CTA-Texte (z.B. "Unverbindlich schreiben" für Messie-Hilfe) bleiben erhalten

