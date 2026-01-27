
# Plan: Logo vergrößern durch Rand-Entfernung

## Problem
Das aktuelle Logo-Bild (`src/assets/logo-raeumzwerge-cropped.png`) enthält noch transparente Ränder. Dadurch erscheint das Logo klein, obwohl der Container bereits `h-20` bis `h-28` groß ist.

## Lösungsschritte

### 1. Logo-Asset mit AI bearbeiten
Ich werde das hochgeladene Logo (`user-uploads://eeee.png`) mit KI-Bildbearbeitung zuschneiden:
- Transparente/leere Bereiche oben und unten entfernen
- Nur den sichtbaren Logo-Inhalt behalten
- Das Ergebnis als neues Asset speichern

### 2. Header-Code anpassen
Nach dem Zuschneiden kann das Logo den verfügbaren Platz besser nutzen:

| Gerät | Aktuelle Höhe | Neue Höhe |
|-------|---------------|-----------|
| Mobil (390px) | h-20 (80px) | h-16 (64px) → Logo füllt mehr aus |
| Tablet (768px) | h-24 (96px) | h-20 (80px) → Logo füllt mehr aus |
| Desktop | h-28 (112px) | h-24 (96px) → Logo füllt mehr aus |

Der Header wird kompakter, aber das Logo erscheint **größer**, weil der gesamte Container-Platz genutzt wird.

### 3. Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/assets/logo-raeumzwerge-cropped.png` | Ersetzt durch zugeschnittene Version |
| `src/components/layout/Header.tsx` | Logo-Container-Höhen optimiert |

## Ergebnis
- Logo nutzt 100% des verfügbaren Platzes
- Keine "verschwendeten" Pixel durch transparente Ränder
- Header wirkt kompakter, Logo wirkt größer
