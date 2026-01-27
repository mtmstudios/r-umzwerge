
# Plan: Hero-Bild auf der Startseite austauschen

## Aufgabe
Das aktuelle Hero-Bild durch das neue Teambild mit dem Räumzwerge-Transporter ersetzen.

## Neues Bild
Zeigt ein professionelles 3-Personen-Team mit:
- Gebrandetem Räumzwerge-Transporter mit Rampe
- Kartons beschriftet mit "SPENDE" und "MÜLL"
- Teamarbeit beim Verladen vor einem Wohnhaus
- Professionelle Arbeitskleidung mit Firmenlogo

## Änderungen

### 1. Bild speichern
Das hochgeladene Bild wird nach `src/assets/hero-team.jpg` kopiert (überschreibt das alte Bild).

### 2. Alt-Text anpassen
Der Alt-Text in `HeroSection.tsx` wird aktualisiert um das neue Bild korrekt zu beschreiben:

| Stelle | Alt | Neu |
|--------|-----|-----|
| Zeile 24 | "Räumzwerge Team bei der Entrümpelung" | "Räumzwerge Team mit Transporter beim Verladen von Kartons" |
| Zeile 160 | "Räumzwerge Team bei der Entrümpelung – Mitarbeiter verladen Kartons in einen Transporter" | "Räumzwerge Team mit gebrandetem Transporter beim Verladen von Spende- und Müllkartons" |

## Dateien

| Datei | Aktion |
|-------|--------|
| `src/assets/hero-team.jpg` | Überschreiben mit neuem Bild |
| `src/components/sections/HeroSection.tsx` | Alt-Texte anpassen (Zeilen 24 & 160) |

## Ergebnis
Die Startseite zeigt im Hero ein neues Teambild mit dem gebrandeten Transporter, das Professionalität und die nachhaltige Arbeitsweise (Spende/Müll-Trennung) kommuniziert.
