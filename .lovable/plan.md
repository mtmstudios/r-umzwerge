
## Logo-Größe auf Mobile und Tablet angleichen

### Problem
Das Logo erscheint auf Mobile kleiner als auf Tablet, weil der umgebende Container (`overflow-hidden`) unterschiedliche Höhen hat:
- Mobile: `h-20` (80px) 
- Tablet: `sm:h-24` (96px)
- Desktop: `lg:h-28` (112px)

Da das Bild durch `overflow-hidden` abgeschnitten wird, zeigt Mobile weniger vom Logo.

### Lösung
Den Container auf Mobile ebenfalls auf `h-24` (96px) erhöhen, damit Mobile und Tablet die gleiche sichtbare Logo-Größe haben.

---

## Änderungen

### Datei: `src/components/layout/Header.tsx`

**Container-Höhe anpassen (Zeile 57):**

| Breakpoint | Vorher | Nachher |
|------------|--------|---------|
| Mobile     | `h-20` (80px) | `h-24` (96px) |
| Tablet     | `sm:h-24` (96px) | `sm:h-24` (96px) |
| Desktop    | `lg:h-28` (112px) | `lg:h-28` (112px) |

**Codeänderung:**
```tsx
// Vorher:
<div className="h-20 sm:h-24 lg:h-28 flex items-center justify-center overflow-hidden">

// Nachher:
<div className="h-24 sm:h-24 lg:h-28 flex items-center justify-center overflow-hidden">
```

---

## Ergebnis
- Mobile und Tablet zeigen das Logo in der gleichen Größe
- Desktop bleibt etwas größer mit 112px Container-Höhe
- Der Header auf Mobile wird etwas höher (von 80px auf 96px), was zu einer konsistenteren Logo-Darstellung führt
