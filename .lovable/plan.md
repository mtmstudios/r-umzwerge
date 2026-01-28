

## Logo vertikal zentrieren - Korrektur der Verschiebung nach oben

---

### Problem

Das Logo erscheint nach oben versetzt. Die Ursache ist die `.logo-trim` CSS-Klasse:

```css
.logo-trim {
  clip-path: inset(5% 3% 5% 3%);
  transform: scale(1.6);
  transform-origin: center;
}
```

Obwohl `clip-path` symmetrisch ist (5% oben/unten), kann das Ursprungsbild selbst asymmetrisch sein - der Inhalt sitzt nicht exakt mittig im PNG.

---

### Lösung

Den negativen Margin oben/unten asymmetrisch machen, um das Logo nach unten zu korrigieren:

**Datei:** `src/components/layout/Header.tsx`

**Zeile 52 ändern von:**
```tsx
className="object-contain logo-trim -my-6 block"
```

**zu:**
```tsx
className="object-contain logo-trim -mt-4 -mb-8 block"
```

Alternativ mit feinerer Kontrolle über inline style:
```tsx
style={{ height: 120, width: "auto", maxHeight: "none", marginTop: "-20px", marginBottom: "-28px" }}
```

---

### Erklärung

- `-mt-4` = -16px oben (weniger negativ = Logo rutscht nach unten)
- `-mb-8` = -32px unten (mehr negativ = kompensiert)
- Gesamte Header-Höhenersparnis bleibt bei ~48px

---

### Ergebnis

- Logo wird visuell perfekt zentriert
- Header-Höhe bleibt kompakt
- Falls nötig, können die Werte feinjustiert werden (-mt-3/-mb-9, etc.)

