

# CSS-Optimierung: Render-Blocking CSS reduzieren

## Problem-Analyse

Die CSS-Datei `/assets/index-*.css` (18,6 KiB) blockiert das erste Rendering und verzögert den LCP (Largest Contentful Paint) um 330ms.

**Warum passiert das?**
- Vite bündelt alle CSS-Imports in eine große Datei
- Diese wird im `<head>` als render-blocking `<link>` eingefügt
- Der Browser wartet mit dem Rendering, bis das gesamte CSS geladen ist
- Aber nur ~20% davon sind "above-the-fold" (Header + Hero) notwendig

## Lösungs-Strategie

### Ansatz 1: Critical CSS Inlining (Empfohlen)

Mit dem Vite-Plugin `vite-plugin-beasties` wird kritisches CSS automatisch:
1. Extrahiert (nur above-the-fold Styles)
2. Inline in den `<head>` geschrieben
3. Der Rest wird asynchron nachgeladen

| Vorher | Nachher |
|--------|---------|
| 18,6 KiB blockierend | ~3-4 KiB inline (kritisch) |
| 330ms Wartezeit | ~0ms (sofort verfügbar) |
| LCP verzögert | LCP verbessert |

### Ansatz 2: Font-Loading optimieren

Die 4 Inter-Font-Varianten werden aktuell erst geladen, wenn das CSS geparst ist. Mit `<link rel="preload">` können sie parallel geladen werden.

## Implementierung

### Schritt 1: Plugin installieren

```bash
npm install vite-plugin-beasties --save-dev
```

### Schritt 2: vite.config.ts anpassen

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { beasties } from "vite-plugin-beasties";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    beasties({
      options: {
        preload: 'swap',  // Restliches CSS asynchron laden
        pruneSource: false, // Original CSS behalten
        fonts: true, // Font-Preloads hinzufügen
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

### Schritt 3: Font-Preloads in index.html

```html
<head>
  <!-- Preload kritische Fonts -->
  <link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/inter-semibold.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- ... restliche meta-tags ... -->
</head>
```

## Änderungsliste

| Datei | Änderung |
|-------|----------|
| `package.json` | `vite-plugin-beasties` hinzufügen |
| `vite.config.ts` | Plugin importieren und konfigurieren |
| `index.html` | Font-Preload-Links hinzufügen |

## Erwartete Ergebnisse

| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Render-Blocking CSS | 18,6 KiB | ~3-4 KiB (inline) |
| First Contentful Paint | +330ms | ~0ms |
| LCP Verbesserung | Baseline | 200-400ms schneller |
| Lighthouse Score | - | +5-15 Punkte |

## Technische Details

### Wie funktioniert beasties?

```text
Build-Zeit:
1. Vite baut die App normal (mit CSS-Bundle)
2. beasties rendert die Seite in einem headless Browser
3. Analysiert welches CSS "above-the-fold" sichtbar ist
4. Schreibt kritisches CSS inline in <style> im <head>
5. Lädt Rest-CSS mit <link rel="preload" as="style">

Ergebnis:
<head>
  <style>/* kritisches CSS inline */</style>
  <link rel="preload" href="/assets/index-xxx.css" as="style" onload="this.rel='stylesheet'">
</head>
```

### Warum nur Inter Regular und Semibold preloaden?

- Regular (400): Fließtext, am häufigsten
- Semibold (600): Headlines, CTAs im Hero
- Medium (500) und Bold (700): Werden später benötigt, können nachladen

## Alternative: Manuelles Critical CSS

Falls das Plugin Probleme macht, kann kritisches CSS auch manuell extrahiert werden:

1. CSS für Header + Hero (~100 Zeilen) in `src/critical.css` extrahieren
2. In `index.html` als `<style>` inline einfügen
3. Rest-CSS per JavaScript nachladen

Dies ist aufwändiger zu pflegen, aber gibt volle Kontrolle.

