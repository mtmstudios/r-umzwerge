

## Favicon und Bildproblem beheben

Es gibt zwei separate Aufgaben:
1. **Favicon aktualisieren** mit dem hochgeladenen Logo
2. **Bilder auf Mittwald funktionieren nicht** - Root-Cause-Analyse und Lösung

---

## Problem-Analyse: Warum Bilder auf Mittwald nicht laden

### Aktuelle Situation

Die Website verwendet zwei verschiedene Methoden, Bilder einzubinden:

| Methode | Ordner | Beispiel | Vite-Verhalten |
|---------|--------|----------|----------------|
| ES6-Import | `src/assets/` | `import heroTeam from '@/assets/hero-team.jpg'` | Wird gehasht und in `dist/assets/` gebündelt |
| Direkte URL | `public/images/` | `src="/images/sea-hero-team.png"` | Wird 1:1 nach `dist/images/` kopiert |

### Vermutete Ursachen

1. **SFTP-Sync-Problem**: Das FTP-Deployer-Tool könnte Probleme haben mit:
   - Großen PNG-Dateien (die neuen Team-Bilder sind mehrere MB)
   - Sonderzeichen in Dateinamen
   - Timeout bei großen Dateien

2. **Cleanup-Flag**: Im Deploy-Workflow ist `cleanup: true` gesetzt - das löscht den Remote-Ordner vor dem Upload. Wenn der Upload abbricht, fehlen die Bilder.

3. **Dateiformat**: PNG-Dateien sind deutlich größer als WebP und können zu Upload-Problemen führen.

---

## Lösungsplan

### Schritt 1: Favicon hinzufügen

Das hochgeladene Logo wird als Favicon gespeichert:

- Kopieren nach `public/favicon.png`
- Aktualisierung der `index.html`:
  ```html
  <link rel="icon" type="image/png" href="/favicon.png" />
  ```

### Schritt 2: Bilder in src/assets verschieben (EMPFOHLEN)

Für eine robustere Lösung werden alle Bilder konsistent über ES6-Imports eingebunden:

**Betroffene Bilder verschieben:**
- `public/images/sea-hero-team.png` -> `src/assets/sea-hero-team.png`
- `public/images/before-after-*.png` -> `src/assets/before-after-*.png`
- Alle neuen `.png` Bilder die nicht laden

**Komponenten anpassen:**
- `SEAHero.tsx` - Import statt URL-String
- `SEABeforeAfter.tsx` - Import statt URL-String
- `BeforeAfterSection.tsx` - Import statt URL-String
- `seaData.ts` und `serviceData.ts` - Imports verwenden

**Vorteile:**
- Vite bündelt und optimiert die Bilder
- Keine Abhängigkeit vom korrekten SFTP-Upload
- Build-Fehler wenn Bild fehlt (statt 404 auf Produktion)

### Schritt 3: Alternative - WebP-Konvertierung

Falls Schritt 2 zu aufwändig erscheint, können die großen PNG-Dateien zu WebP konvertiert werden:

- Geringere Dateigröße (80% kleiner)
- Schnellerer Upload via SFTP
- Bessere Performance auf der Website

---

## Technische Umsetzung

### Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `public/favicon.png` | Neues Favicon-Bild (Logo) |
| `index.html` | Favicon-Referenz aktualisieren |
| `src/components/sections/HeroSection.tsx` | Bereits korrekt mit Import |
| `src/components/sections/BeforeAfterSection.tsx` | Import statt URL |
| `src/components/sea/SEAHero.tsx` | Import statt URL |
| `src/components/sea/SEABeforeAfter.tsx` | Import statt URL |
| `src/lib/seaData.ts` | Bilder als Imports |

### Empfohlene Reihenfolge

1. Favicon hinzufügen
2. Bilder nach `src/assets/` verschieben
3. Imports in Komponenten und Data-Dateien anpassen
4. Testen im Preview
5. Deployment erneut durchführen

---

## Erwartetes Ergebnis

- Favicon wird korrekt im Browser-Tab angezeigt
- Alle Bilder laden zuverlässig auf raeumzwerge.de
- Konsistente Bildeinbindung im gesamten Projekt
- Kein Risiko mehr durch SFTP-Upload-Probleme

