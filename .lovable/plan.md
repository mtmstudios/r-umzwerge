

# Google Fonts lokal einbinden (DSGVO-konform)

## Uebersicht

Umstellung der Inter-Schriftart von externer Google Fonts CDN-Einbindung auf lokales Self-Hosting. Dies eliminiert die Datenuebermittlung an Google und macht die Website DSGVO-konform.

---

## Aktuelle Situation

Die Inter-Schriftart wird derzeit extern von Google geladen:

```text
index.html (Zeilen 29-31):
- <link rel="preconnect" href="https://fonts.googleapis.com" />
- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
- <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Problem**: Bei jedem Seitenaufruf wird die IP-Adresse des Besuchers an Google uebermittelt.

---

## Loesung: Lokale Font-Dateien

### Benoetigte Schriftschnitte

| Gewicht | Name | Verwendung |
|---------|------|------------|
| 400 | Regular | Fliesstext, normale Texte |
| 500 | Medium | Buttons, Labels |
| 600 | SemiBold | Ueberschriften (H3, H4) |
| 700 | Bold | Hero-Titel, wichtige Ueberschriften |

---

## Technische Umsetzung

### 1. Font-Dateien erstellen

Neue Dateien im Ordner `public/fonts/`:

```text
public/fonts/
  inter-regular.woff2
  inter-medium.woff2
  inter-semibold.woff2
  inter-bold.woff2
```

**Format**: WOFF2 (modernster, kompaktester Standard - ~30% kleiner als WOFF)

### 2. CSS @font-face Definitionen

Neue Datei oder Erweiterung von `src/index.css`:

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/inter-medium.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-semibold.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-bold.woff2') format('woff2');
}
```

### 3. index.html bereinigen

Entfernen der externen Google Fonts Links (Zeilen 28-31):

```text
ENTFERNEN:
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

---

## Dateiaenderungen

| Datei | Aktion | Beschreibung |
|-------|--------|--------------|
| `public/fonts/inter-regular.woff2` | NEU | Font-Datei (400) |
| `public/fonts/inter-medium.woff2` | NEU | Font-Datei (500) |
| `public/fonts/inter-semibold.woff2` | NEU | Font-Datei (600) |
| `public/fonts/inter-bold.woff2` | NEU | Font-Datei (700) |
| `src/index.css` | AENDERN | @font-face Regeln hinzufuegen |
| `index.html` | AENDERN | Google Fonts Links entfernen |

**Gesamt: 6 Dateien (4 neue Font-Dateien, 2 Aenderungen)**

---

## Vorteile der lokalen Einbindung

| Aspekt | Vorher (Google CDN) | Nachher (Lokal) |
|--------|---------------------|-----------------|
| DSGVO | Problematisch | Konform |
| IP-Uebermittlung | Ja, an Google | Nein |
| Ladezeit | Abhaengig von Google | Schneller (keine DNS-Aufloesung) |
| Verfuegbarkeit | Abhaengig von Google | Immer verfuegbar |
| Cookie-Banner | Erforderlich | Nicht erforderlich fuer Fonts |

---

## Performance-Optimierung

- **font-display: swap** - Text wird sofort mit Fallback-Font angezeigt, dann ersetzt
- **WOFF2-Format** - Beste Kompression, ~30% kleiner als WOFF
- **Nur benoetigte Gewichte** - 400, 500, 600, 700 (kein 100-900)
- **Preload optional** - Kann bei Bedarf fuer kritische Fonts ergaenzt werden

---

## Naechster Schritt

Nach der lokalen Font-Einbindung folgt die **Datenschutzerklaerung**, in der dokumentiert wird:
- Keine externe Einbindung von Google Fonts
- Fonts werden lokal vom eigenen Server geladen
- Keine Datenuebermittlung an Dritte fuer Schriftarten

