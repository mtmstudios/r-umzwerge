
# Plan: Alle 3 offenen Aufgaben umsetzen

## Übersicht

Dieses Update behebt das Logo-Problem und fügt zwei neue Features hinzu:

1. Logo-Transparenz wiederherstellen (PNG statt WebP)
2. Logo auf SEA-Landingpages zur Hauptseite verlinken
3. Interaktiver Vorher/Nachher-Slider für Messie SEA-Landingpage

---

## Aufgabe 1: Logo-Transparenz wiederherstellen

### Problem
Die WebP-Konvertierung hat die Alpha-Transparenz der Logos nicht korrekt übertragen, wodurch ein schwarzer Hintergrund erscheint.

### Lösung
Logo-Importe zurück auf PNG ändern (originale Dateien existieren noch).

### Änderungen

| Datei | Zeile | Änderung |
|-------|-------|----------|
| `src/components/layout/Header.tsx` | 3 | `logo-raeumzwerge.webp` → `logo-raeumzwerge.png` |
| `src/components/layout/Footer.tsx` | 4 | `logo-white.webp` → `logo-white.png` |
| `src/components/sea/SEAMinimalHeader.tsx` | 4 | `logo-raeumzwerge.webp` → `logo-raeumzwerge.png` |

---

## Aufgabe 2: Logo-Link auf SEA-Landingpages

### Aktueller Zustand
Das Logo ist ein `<div>` ohne Link (Zeile 12-18 in SEAMinimalHeader.tsx).

### Neue Struktur
Das `<div>` wird durch einen `<a>`-Tag ersetzt:

```tsx
<a 
  href="https://www.raeumzwerge.de" 
  target="_blank" 
  rel="noopener noreferrer"
  className="h-20 lg:h-24 overflow-hidden flex items-center -ml-8 lg:-ml-12 group"
>
  <img
    src={logoImage}
    alt="Räumzwerge"
    className="h-64 lg:h-80 w-auto object-contain object-left transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
  />
</a>
```

| Attribut | Zweck |
|----------|-------|
| `target="_blank"` | Öffnet in neuem Tab, Landingpage bleibt offen |
| `rel="noopener noreferrer"` | Sicherheit bei externen Links |
| `group-hover` Effekte | Visuelles Feedback wie im Haupt-Header |

---

## Aufgabe 3: Vorher/Nachher-Slider für Messie-Seite

### Hochgeladene Bilder

| Datei | Beschreibung | Verwendung |
|-------|--------------|------------|
| `Gemini_Generated_Image_4r6zkr4r6zkr4r6z-2.png` | Überladenes Zimmer mit Kartons, Kleidung | **Vorher** |
| `Gemini_Generated_Image_12l94a12l94a12l9-2.png` | Dasselbe Zimmer - leer, besenrein | **Nachher** |

### Neue Bilder erstellen

| Quelle | Ziel |
|--------|------|
| `user-uploads://Gemini_Generated_Image_4r6zkr4r6zkr4r6z-2.png` | `public/images/messie-vorher.webp` |
| `user-uploads://Gemini_Generated_Image_12l94a12l94a12l9-2.png` | `public/images/messie-nachher.webp` |

### Komponenten-Änderung

**Datei:** `src/components/sea/SEABeforeAfter.tsx`

Der "Gentle Mode" Block (Zeile 73-85) zeigt aktuell nur einen statischen Platzhalter. Dieser wird durch einen echten interaktiven Slider mit den Messie-Bildern ersetzt:

```tsx
{isGentleMode ? (
  // Gentle Mode: Real Before/After Slider for Messie
  <div
    ref={containerRef}
    className="relative max-w-2xl mx-auto aspect-[4/3] md:aspect-video bg-muted rounded-xl overflow-hidden cursor-ew-resize select-none mb-6"
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    onTouchMove={handleTouchMove}
    onMouseLeave={handleMouseUp}
  >
    {/* Before Image */}
    <div className="absolute inset-0">
      <img 
        src="/images/messie-vorher.webp" 
        alt="Zimmer vor der Räumung"
        className="w-full h-full object-cover"
      />
    </div>

    {/* After Image (Clipped) */}
    <div
      className="absolute inset-0"
      style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
    >
      <img 
        src="/images/messie-nachher.webp" 
        alt="Zimmer nach der Räumung"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Slider Handle + Labels (identisch zum Standard-Modus) */}
    ...
  </div>
) : (
  // Standard Mode: Placeholder slider
  ...
)}
```

---

## Zusammenfassung aller Änderungen

| Kategorie | Dateien | Aktion |
|-----------|---------|--------|
| **Logo-Import** | Header.tsx, Footer.tsx, SEAMinimalHeader.tsx | `.webp` → `.png` |
| **Logo-Link** | SEAMinimalHeader.tsx | `<div>` → `<a href="...">` |
| **Neue Bilder** | public/images/messie-vorher.webp, messie-nachher.webp | Erstellen |
| **Slider-Logik** | SEABeforeAfter.tsx | Gentle-Mode mit echten Bildern |

**Gesamt: 4 Dateien ändern + 2 neue Bilder erstellen**

---

## Erwartetes Ergebnis

- Logos zeigen wieder transparenten Hintergrund auf allen Seiten
- Das Logo auf SEA-Landingpages verlinkt zur Hauptwebsite (neuer Tab)
- Die Messie SEA-Landingpage zeigt einen interaktiven Vorher/Nachher-Slider mit emotionalem Beweis der Transformation
