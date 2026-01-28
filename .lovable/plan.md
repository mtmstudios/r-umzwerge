
## Vorher/Nachher Bilder einzoomen um Wasserzeichen zu entfernen

### Problemanalyse
Das Gemini-Wasserzeichen ist in den Bilddateien eingebrannt und befindet sich vermutlich in einer Ecke (typischerweise unten rechts). Durch CSS-Zoom können wir die Ränder abschneiden.

---

### Lösung: CSS Scale Transform

Die Bilder in beiden Vorher/Nachher-Komponenten werden mit `transform: scale(1.15)` eingezoomt. Da der Container bereits `overflow: hidden` hat, werden die Ränder automatisch abgeschnitten.

---

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/components/sections/BeforeAfterSection.tsx` | Beide `<img>` Tags: `scale(1.15)` hinzufügen |
| `src/components/sea/SEABeforeAfter.tsx` | Beide `<img>` Tags: `scale(1.15)` hinzufügen |

---

### Technische Umsetzung

**BeforeAfterSection.tsx (Zeilen 86-89 und 97-101):**

Vorher:
```tsx
className="w-full h-full object-cover"
```

Nachher:
```tsx
className="w-full h-full object-cover scale-[1.15]"
```

**SEABeforeAfter.tsx (Zeilen 113-116 und 124-128):**

Gleiche Änderung für beide Bilder.

---

### Ergebnis

- ~15% Zoom schneidet die Ränder ab wo das Wasserzeichen sitzt
- Falls das Wasserzeichen noch sichtbar ist, kann der Scale-Wert erhöht werden (z.B. 1.2 oder 1.25)
- Die Bildkomposition bleibt erhalten da `object-cover` das Bild zentriert
