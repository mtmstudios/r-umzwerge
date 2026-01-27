
# Plan: Hero-Bild fuer Entruempelung-Seite aendern

## Aufgabe

Das Hero-Bild auf der Entruempelung-Seite (`/entruempelung`) soll durch das neu hochgeladene Bild ersetzt werden. Das Bild zeigt drei Teammitglieder in Raeumzwerge-Shirts beim Demontieren von Moebeln, Sortieren von Buechern und Tragen von Spendenkartons in einem sonnendurchfluteten Wohnraum.

---

## Technische Umsetzung

### Schritt 1: Bild in das Projekt kopieren

| Quelle | Ziel |
|--------|------|
| `user-uploads://Gemini_Generated_Image_vinitvinitvinitv-2.png` | `public/images/service-entruempelung-hero.png` |

Das Bild wird im public-Ordner gespeichert, da es ueber einen URL-Pfad in der serviceData.ts referenziert wird.

### Schritt 2: serviceData.ts aktualisieren

In der Datei `src/lib/serviceData.ts` wird der Eintrag fuer `entruempelung` angepasst:

**Zeilen 150-151:**

| Eigenschaft | Alt | Neu |
|-------------|-----|-----|
| `imageSrc` | `/images/service-entruempelung.jpg` | `/images/service-entruempelung-hero.png` |
| `imageAlt` | "Professionelles Team beim Verladen von Kartons in einen Transporter" | "Raeumzwerge-Team beim Demontieren von Moebeln und Sortieren in einem Wohnraum" |

---

## Dateien-Uebersicht

| Datei | Aenderung |
|-------|-----------|
| `public/images/service-entruempelung-hero.png` | Neues Bild hinzufuegen |
| `src/lib/serviceData.ts` | Zeilen 150-151: imageSrc und imageAlt aktualisieren |

---

## Ergebnis

Die Entruempelung-Seite zeigt im Hero-Bereich das neue Bild mit dem professionellen Raeumzwerge-Team bei der Arbeit - authentisch, vertrauenswuerdig und passend zum Entruempelungs-Service.
