
## Anpassung: Logo auf allen Geräten vergrößern

Das Logo soll auf Mobile, Tablet und Desktop größer dargestellt werden. Aktuell sind die Werte zu konservativ.

---

## Aktuelle Werte

| Einstellung | Aktuell |
|-------------|---------|
| **clip-path** | `inset(8% 6% 8% 6%)` |
| **scale** | `1.18` |
| **Höhe Mobile** | `h-20` (80px) |
| **Höhe Tablet** | `sm:h-24` (96px) |
| **Höhe Desktop** | `lg:h-28` (112px) |

---

## Neue Werte (deutlich größer)

| Einstellung | Neu | Änderung |
|-------------|-----|----------|
| **clip-path** | `inset(10% 8% 10% 8%)` | Mehr Rand entfernen |
| **scale** | `1.25` | Stärker skalieren |
| **Höhe Mobile** | `h-24` (96px) | +16px |
| **Höhe Tablet** | `sm:h-28` (112px) | +16px |
| **Höhe Desktop** | `lg:h-32` (128px) | +16px |

---

## Technische Änderungen

### 1. Datei: `src/index.css`

```css
/* Vorher */
.logo-trim {
  clip-path: inset(8% 6% 8% 6%);
  transform: scale(1.18);
  transform-origin: center;
}

/* Nachher */
.logo-trim {
  clip-path: inset(10% 8% 10% 8%);
  transform: scale(1.25);
  transform-origin: center;
}
```

### 2. Datei: `src/components/layout/Header.tsx`

```tsx
// Vorher
className="logo-trim h-20 sm:h-24 lg:h-28 w-auto max-w-none ..."

// Nachher
className="logo-trim h-24 sm:h-28 lg:h-32 w-auto max-w-none ..."
```

---

## Erwartetes Ergebnis

- **Mobile**: Logo ca. 20% größer als vorher
- **Tablet**: Logo ca. 17% größer als vorher
- **Desktop**: Logo ca. 14% größer als vorher
- Mehr transparenter Rand wird entfernt (clip-path aggressiver)
- Zusätzliche Skalierung (1.25 statt 1.18) verstärkt den Effekt

Falls das Logo danach immer noch zu klein wirkt, können wir die Werte weiter erhöhen (z.B. `h-28 sm:h-32 lg:h-36`).
