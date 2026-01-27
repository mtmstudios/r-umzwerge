
# Plan: Vorher/Nachher-Bilder in BeforeAfterSection einbinden

## Aufgabe
Die beiden hochgeladenen Bilder sollen als echte Vorher/Nachher-Bilder im Slider der Startseite verwendet werden.

## Bilder

| Bild | Dateiname | Verwendung |
|------|-----------|------------|
| Vorher | `Gemini_Generated_Image_mytcoqmytcoqmytc.png` | Volle Wohnung mit Kartons, Müllsäcken |
| Nachher | `Gemini_Generated_Image_xel2kcxel2kcxel2.png` | Saubere, leere Wohnung mit Holzboden |

## Implementierung

### 1. Bilder ins Projekt kopieren
Die Bilder werden in `public/images/` gespeichert:
- `public/images/before-after-vorher.png`
- `public/images/before-after-nachher.png`

### 2. BeforeAfterSection.tsx anpassen

**Aktuell:** Placeholder-Divs mit Gradient und Text
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20">
  <div className="text-center p-8">
    <p>VORHER</p>
    <p>Bild-Platzhalter</p>
  </div>
</div>
```

**Neu:** Echte Bilder
```tsx
<div className="absolute inset-0">
  <img 
    src="/images/before-after-vorher.png" 
    alt="Wohnung vor der Entrümpelung - voll mit Kartons und Müll"
    className="w-full h-full object-cover"
  />
</div>
```

### 3. Hinweistext entfernen
Der Platzhalter-Text wird entfernt:
```tsx
// ENTFERNEN:
<p className="text-center text-muted-foreground text-sm mb-6">
  Vorher/Nachher-Beispiele folgen in Kürze.
</p>
```

---

## Technische Details

### Dateiänderungen

| Datei | Aktion |
|-------|--------|
| `public/images/before-after-vorher.png` | Neu (Kopie von Upload) |
| `public/images/before-after-nachher.png` | Neu (Kopie von Upload) |
| `src/components/sections/BeforeAfterSection.tsx` | Anpassen |

### Vorher-Bild (Zeilen 80-89)
```tsx
// ALT: Gradient-Placeholder
<div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20">
  ...
</div>

// NEU: Echtes Bild
<div className="absolute inset-0">
  <img 
    src="/images/before-after-vorher.png" 
    alt="Wohnung vor der Entrümpelung"
    className="w-full h-full object-cover"
  />
</div>
```

### Nachher-Bild (Zeilen 92-104)
```tsx
// ALT: Gradient-Placeholder mit clipPath
<div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20"
  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
  ...
</div>

// NEU: Echtes Bild mit clipPath
<div className="absolute inset-0"
  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
  <img 
    src="/images/before-after-nachher.png" 
    alt="Wohnung nach der Entrümpelung - besenrein"
    className="w-full h-full object-cover"
  />
</div>
```

### Hinweistext entfernen (Zeilen 137-139)
Die Zeile "Vorher/Nachher-Beispiele folgen in Kürze." wird komplett entfernt.

---

## Ergebnis

Der Before/After-Slider zeigt:
- **Links (Vorher):** Volle, unordentliche Wohnung mit Kartons und Müllsäcken
- **Rechts (Nachher):** Saubere, leere Wohnung mit schönem Holzboden

Benutzer können den Slider ziehen, um den Unterschied zu sehen - ein starker visueller Beweis der Arbeit.
