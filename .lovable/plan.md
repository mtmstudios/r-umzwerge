
# Plan: Hero-Bilder für Haushaltsauflösung und SEA Entrümpelung aktualisieren

## Aufgabe
Zwei neue Hero-Bilder für die Haushaltsauflösung-Seite und die SEA Entrümpelung-Landingpage einsetzen.

## Neue Bilder

### Bild 1: Haushaltsauflösung
**Motiv:** 3-köpfiges Team mit Transporter vor einem Wohnhaus
- Gebrandeter Räumzwerge-Transporter mit Rampe
- Kartons beschriftet mit "SPENDE" und "MÜLL"
- Teamarbeit beim Verladen von Möbeln und Kartons
- Professionelle Arbeitskleidung

### Bild 2: SEA Entrümpelung
**Motiv:** 3-köpfiges Team beim Sortieren in einem hellen Wohnraum
- Kartons beschriftet mit "RECYCLING" und "SPENDE"
- Team beim Verpacken und Sortieren
- Heller, freundlicher Innenraum mit großem Fenster
- Transparente Arbeitsweise sichtbar

## Änderungen

### 1. Bilder speichern
| Hochgeladenes Bild | Zielpfad |
|--------------------|----------|
| `Gemini_Generated_Image_khiqiskhiqiskhiq-2.png` | `public/images/service-haushaltsaufloesung.jpg` |
| `Gemini_Generated_Image_r21iwmr21iwmr21i-2.png` | `public/images/service-entruempelung.jpg` |

### 2. Alt-Texte aktualisieren

**Service-Seite Haushaltsauflösung** (`src/lib/serviceData.ts`):
- Zeile 238 (ca.): `imageAlt` für haushaltsaufloesung
- Neu: `"Räumzwerge-Team beim Verladen von Spende- und Müll-Kartons vor einem Wohnhaus"`

**SEA Landingpage Entrümpelung** (`src/lib/seaData.ts`):
- Zeile 139: `heroImageAlt` für entruempelung
- Neu: `"Räumzwerge-Team beim Sortieren von Recycling- und Spende-Kartons im Wohnraum"`

## Technische Details

| Datei | Aktion |
|-------|--------|
| `public/images/service-haushaltsaufloesung.jpg` | Überschreiben mit neuem Bild |
| `public/images/service-entruempelung.jpg` | Überschreiben mit neuem Bild |
| `src/lib/serviceData.ts` | Alt-Text für Haushaltsauflösung anpassen |
| `src/lib/seaData.ts` | Alt-Text für SEA Entrümpelung anpassen |

## Ergebnis
- Die Service-Seite "Haushaltsauflösung" zeigt das neue Teambild mit Transporter
- Die SEA-Landingpage "Entrümpelung" zeigt das Team beim Sortieren im Wohnraum
- Beide Bilder kommunizieren Professionalität und die nachhaltige Arbeitsweise (Spende/Recycling-Trennung)
