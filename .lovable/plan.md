
# Plan: Hero-Bild für Wohnungsentrümpelung austauschen

## Aufgabe
Das aktuelle Hero-Bild der Wohnungsentrümpelung-Seite durch das neue Teambild ersetzen.

## Neues Bild
Zeigt ein professionelles 3-Personen-Team in einheitlichen dunkelblauen Polo-Shirts mit Firmenlogo beim:
- Tragen von Umzugskartons (beschriftet mit "SPENDE", "RECYCLING")
- Sortieren von Gegenständen
- Professionelle Arbeitsumgebung mit Sackkarre

## Änderungen

### 1. Bild speichern
Das hochgeladene Bild wird nach `public/images/service-wohnungsentruempelung.jpg` kopiert (überschreibt das alte Bild).

### 2. Alt-Text anpassen (serviceData.ts)
Der Alt-Text wird aktualisiert um das neue Bild zu beschreiben:

| Feld | Alt | Neu |
|------|-----|-----|
| `imageAlt` | "Leere, saubere Wohnung nach professioneller Entrümpelung" | "Professionelles Räumzwerge-Team bei der Wohnungsentrümpelung" |

## Dateien

| Datei | Aktion |
|-------|--------|
| `public/images/service-wohnungsentruempelung.jpg` | Überschreiben mit neuem Bild |
| `src/lib/serviceData.ts` | Alt-Text in Zeile 56 anpassen |

## Ergebnis
Die Wohnungsentrümpelung-Seite zeigt im Hero ein authentisches Teambild, das Professionalität und Vertrauen vermittelt.
