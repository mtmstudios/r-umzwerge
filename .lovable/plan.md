
## Header verkleinern - Logo bleibt gleich

---

### Aktuelle Situation

Der Header hat folgende Padding-Werte:
- **Nicht gescrollt:** `py-1 lg:py-1.5`
- **Gescrollt:** `py-0.5 lg:py-1`

Das Logo hat eine feste Höhe von `120px` und wird beibehalten.

---

### Änderungen

**Datei:** `src/components/layout/Header.tsx`

Die Padding-Werte werden reduziert:

| Zustand | Vorher | Nachher |
|---------|--------|---------|
| Nicht gescrollt | `py-1 lg:py-1.5` | `py-0 lg:py-0.5` |
| Gescrollt | `py-0.5 lg:py-1` | `py-0 lg:py-0` |

---

### Technische Umsetzung

**Zeilen 28-30 ändern:**

```tsx
isScrolled
  ? "glass-strong shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.12)] py-0 lg:py-0 border-b border-border/30"
  : "bg-card py-0 lg:py-0.5 shadow-none border-b border-transparent",
```

---

### Ergebnis

- Header wird kompakter durch entferntes/reduziertes Padding
- Logo bleibt exakt bei 120px Höhe
- Glassmorphism-Effekt und alle anderen Funktionen bleiben erhalten
