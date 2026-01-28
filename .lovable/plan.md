

## Logo-Schrift an Navigation anpassen

Die Navigation verwendet `text-base` (16px) Schriftgröße. Um die Logo-Schrift mindestens genauso groß erscheinen zu lassen, werden die clip-path Werte erhöht, um mehr vom transparenten Rand zu entfernen.

---

## Aktuelle vs. neue Werte

| Einstellung | Aktuell | Neu |
|-------------|---------|-----|
| clip-path | `inset(8% 5% 8% 5%)` | `inset(12% 8% 12% 8%)` |
| scale | `1.2` | `1.35` |

Die höheren Werte schneiden mehr vom unsichtbaren Rand ab und vergrößern das sichtbare Logo stärker.

---

## Technische Änderung

### src/index.css

```css
/* Vorher */
.logo-trim {
  clip-path: inset(8% 5% 8% 5%);
  transform: scale(1.2);
  transform-origin: center;
}

/* Nachher */
.logo-trim {
  clip-path: inset(12% 8% 12% 8%);
  transform: scale(1.35);
  transform-origin: center;
}
```

---

## Ergebnis

Die Schrift "Räumzwerge" im Logo wird durch das aggressivere Trimming und die höhere Skalierung deutlich größer dargestellt - mindestens auf dem Niveau der 16px Navigation.

---

## Dateien

| Datei | Änderung |
|-------|----------|
| `src/index.css` | clip-path und scale Werte erhöhen |

