

## Vorher/Nachher-Bilder für Haushaltsauflösung LP einbauen

Die hochgeladenen Bilder werden in den interaktiven Slider auf der SEA Landingpage `/lp/haushaltsaufloesung` eingebaut.

---

## Bilderzuordnung

| Bild | Verwendung | Beschreibung |
|------|------------|--------------|
| Gemini_Generated_Image_mytcoqmytcoqmytc-2.png | **VORHER** | Unordentliche Wohnung mit Kartons, Müllsäcken |
| Gemini_Generated_Image_xel2kcxel2kcxel2-2.png | **NACHHER** | Leere, aufgeräumte Räume mit Holzboden |

---

## Umsetzungsschritte

### 1. Bilder in public/images/ kopieren

Die hochgeladenen Bilder werden mit aussagekräftigen Namen gespeichert:

- `public/images/haushaltsaufloesung-vorher.png` (unordentlich)
- `public/images/haushaltsaufloesung-nachher.png` (aufgeräumt)

### 2. SEAData Interface erweitern

**Datei:** `src/lib/seaData.ts`

Neue optionale Felder zum Interface hinzufügen:

```text
export interface SEAData {
  // ... bestehende Felder ...
  beforeImage?: string;
  beforeImageAlt?: string;
  afterImage?: string;
  afterImageAlt?: string;
}
```

### 3. Haushaltsauflösung-Daten aktualisieren

**Datei:** `src/lib/seaData.ts`

Bildpfade für haushaltsaufloesung hinzufügen:

```text
'haushaltsaufloesung': {
  // ... bestehende Daten ...
  beforeImage: '/images/haushaltsaufloesung-vorher.png',
  beforeImageAlt: 'Wohnung vor der Haushaltsauflösung - voller Kartons und Gegenstände',
  afterImage: '/images/haushaltsaufloesung-nachher.png',
  afterImageAlt: 'Wohnung nach der Haushaltsauflösung - besenrein und übergabefertig',
}
```

### 4. SEABeforeAfter Komponente anpassen

**Datei:** `src/components/sea/SEABeforeAfter.tsx`

Die Komponente wird so geändert, dass sie:
- Prüft ob `data.beforeImage` und `data.afterImage` vorhanden sind
- Falls ja: echte Bilder im Slider anzeigt
- Falls nein: weiterhin Platzhalter verwendet

```text
// Statt nur auf isGentleMode zu prüfen:
const hasRealImages = data.beforeImage && data.afterImage;

{hasRealImages ? (
  // Echter Before/After Slider mit data.beforeImage und data.afterImage
) : (
  // Platzhalter-Slider wie bisher
)}
```

---

## Erwartetes Ergebnis

- Die Landingpage `/lp/haushaltsaufloesung` zeigt echte Vorher/Nachher-Bilder
- Der interaktive Slider funktioniert wie bei der Messie-Seite
- Andere Landingpages (entruempelung) zeigen weiterhin Platzhalter bis Bilder hinzugefügt werden
- Bestehende Messie-Bilder bleiben unverändert

