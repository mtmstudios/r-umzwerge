

## Header deutlich verkleinern - Logo bleibt 120px

---

### Problem

Der Header ist bereits auf minimalem Padding (py-0). Das Logo mit 120px Höhe bestimmt aktuell die Header-Höhe. Um den Header kleiner zu machen aber das Logo bei 120px zu belassen, muss das Logo über den Header hinausragen.

---

### Lösung: Negative Margins

Das Logo bekommt negative vertikale Margins, sodass es über den Header-Container hinausragt. Der Header wird visuell kleiner, das Logo bleibt aber 120px groß.

---

### Technische Umsetzung

**Datei:** `src/components/layout/Header.tsx`

**Logo-Element (Zeile 52-56) anpassen:**

```tsx
<img
  src={logoNeu}
  alt="Räumzwerge – Entrümpelungen, Auflösungen, Service"
  style={{ height: 120, width: "auto", maxHeight: "none" }}
  className="object-contain logo-trim -my-6"
/>
```

Die Klasse `-my-6` (negative margin top/bottom von 24px) lässt das Logo 48px über den Header hinausragen, wodurch der Header visuell deutlich kompakter wird.

---

### Alternativen

Falls `-my-6` zu viel/wenig ist:
- `-my-4` = 32px weniger Header-Höhe
- `-my-8` = 64px weniger Header-Höhe  
- `-my-10` = 80px weniger Header-Höhe

---

### Ergebnis

- Header wird ~48px kleiner
- Logo bleibt exakt bei 120px
- Logo überlappt leicht mit dem Content darunter (wird durch z-50 überdeckt)

