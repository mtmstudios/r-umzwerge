
## Anpassung: clip-path Werte reduzieren

Die aktuellen clip-path Werte schneiden echte Logo-Kanten ab. Wir reduzieren die Werte, um nur den transparenten Rand zu entfernen, ohne das Logo selbst zu beschädigen.

---

## Vergleich der Werte

| Einstellung | Aktuell (zu aggressiv) | Neu (konservativer) |
|-------------|------------------------|---------------------|
| **clip-path oben/unten** | `10%` | `6%` |
| **clip-path links/rechts** | `8%` | `4%` |
| **scale** | `1.25` | `1.25` (bleibt) |
| **Höhen** | `h-24 sm:h-28 lg:h-32` | bleibt |

---

## Technische Änderung

### Datei: `src/index.css`

```css
/* Vorher (schneidet echte Kanten ab) */
.logo-trim {
  clip-path: inset(10% 8% 10% 8%);
  transform: scale(1.25);
  transform-origin: center;
}

/* Nachher (nur transparenter Rand) */
.logo-trim {
  clip-path: inset(6% 4% 6% 4%);
  transform: scale(1.25);
  transform-origin: center;
}
```

---

## Erwartetes Ergebnis

- Echte Logo-Kanten bleiben vollständig sichtbar
- Transparenter Rand wird weiterhin (aber weniger aggressiv) entfernt
- Die Größe bleibt gleich (scale 1.25 + Höhenklassen unverändert)

Falls danach immer noch Kanten abgeschnitten werden, können wir die Werte weiter reduzieren (z.B. `inset(4% 2% 4% 2%)` oder komplett auf `inset(0)` setzen).
