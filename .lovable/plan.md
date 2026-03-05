

# Favicon-Erkennung durch Google verbessern

## Problem
Die `robots.txt` ist korrekt und blockiert das Favicon nicht. Google zeigt das alte Lovable-Favicon wegen aggressivem Caching. Wir koennen das Update beschleunigen durch bessere Favicon-Konfiguration.

## Aenderungen

### 1. `public/manifest.json` erstellen (neue Datei)
Web App Manifest mit Icon-Referenzen in verschiedenen Groessen. Google nutzt das Manifest als primaere Quelle fuer Favicons.

```json
{
  "name": "Räumzwerge",
  "short_name": "Räumzwerge",
  "icons": [
    { "src": "/favicon.png", "sizes": "48x48", "type": "image/png" },
    { "src": "/favicon.png", "sizes": "192x192", "type": "image/png" }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1B3A4B",
  "background_color": "#ffffff"
}
```

### 2. `index.html` erweitern
- `<link rel="manifest">` hinzufuegen
- `<link rel="apple-touch-icon">` hinzufuegen
- `theme-color` Meta-Tag hinzufuegen

### Manuelle Schritte (durch dich)
- In der Google Search Console `https://raeumzwerge.de/` neu indexieren lassen
- Das dauert danach trotzdem 1-4 Wochen bis Google das Favicon aktualisiert

