

## Logo zentrieren im Header

---

### Problem

Das Logo erscheint nicht perfekt zentriert, weil:
1. Die `.logo-trim` Klasse eine `scale(1.6)` Transformation anwendet
2. Die negativen Margins `-my-6` die vertikale Position beeinflussen
3. Das Zusammenspiel dieser Effekte kann zu einer leichten Verschiebung führen

---

### Lösung

Das `<img>`-Element bekommt `block` hinzugefügt, um sicherzustellen dass es als Block-Element behandelt wird und sich korrekt innerhalb des Flex-Containers zentriert.

---

### Technische Umsetzung

**Datei:** `src/components/layout/Header.tsx`

**Zeile 52 ändern:**

```tsx
className="object-contain logo-trim -my-6 block"
```

Falls das nicht ausreicht, alternativ die Flex-Ausrichtung des übergeordneten `<a>`-Tags verstärken:

**Zeile 47 ändern:**

```tsx
<a href="/" className="flex items-center justify-center lg:justify-start group shrink-0 h-full">
```

---

### Ergebnis

- Logo wird perfekt vertikal und horizontal zentriert
- Negative Margins und Skalierung bleiben erhalten
- Header-Höhe bleibt kompakt

