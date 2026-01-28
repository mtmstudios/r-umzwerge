
## Horizontales Scrollen auf Mobile entfernen

### Problem
Auf Mobilgeräten kann man horizontal scrollen und einen weißen Rand sehen. Dies passiert, weil bestimmte Elemente (möglicherweise durch padding, margins, oder die scale-Transforms) minimal breiter als der Viewport sind.

---

### Lösung

Die einfachste und zuverlässigste Lösung ist `overflow-x: hidden` auf `html` und `body` zu setzen. Das verhindert horizontales Scrollen komplett.

---

### Technische Umsetzung

**Datei:** `src/index.css`

In der `@layer base` Sektion (ca. Zeile 211-225) werden die html/body Styles erweitert:

```css
@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: calc(1rem * var(--font-scale));
    overflow-x: hidden;
  }
}
```

---

### Ergebnis

- Horizontales Scrollen wird komplett deaktiviert
- Der weiße Rand rechts kann nicht mehr erreicht werden
- Alle bestehenden Funktionen bleiben erhalten
