

## Problem: Weißer Rand auf Mobile

### Ursache

In `src/App.css` befindet sich alter Vite-Template-Code:

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;     /* <- Das erzeugt den weißen Rand */
  text-align: center;
}
```

Diese Styles begrenzen die App-Breite und fuegen 2rem Padding hinzu - dadurch entsteht der sichtbare Rand auf Mobile.

---

## Loesung

Die gesamte `App.css` Datei wird bereinigt. Die darin enthaltenen Styles sind Ueberreste vom Vite-Starter-Template und werden nicht mehr benoetigt, da das Projekt Tailwind CSS verwendet.

### Aenderungen

| Datei | Aktion |
|-------|--------|
| `src/App.css` | Alle Styles entfernen (Datei leeren oder loeschen) |

### Neue App.css (minimal)

```css
/* App.css - Reset for full-width layout */
#root {
  width: 100%;
  min-height: 100vh;
}
```

---

## Visuelles Ergebnis

```text
Vorher:   [  |  Hero-Bild  |  ]   <- Weißer Rand links/rechts
                              ↑
                         2rem padding

Nachher:  [     Hero-Bild     ]   <- Volle Breite
```

---

## Weitere Optimierung (optional)

Da kein Code aus `App.css` tatsaechlich verwendet wird, kann die Datei komplett geleert werden. Die relevanten Styles sind bereits in `src/index.css` definiert.

