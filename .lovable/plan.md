
## Problem-Analyse

Das Logo erscheint auf Mobile (375px) kleiner als auf Tablet (768px), **obwohl die CSS-Werte identisch sind**:

| Eigenschaft | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Container   | `h-24` (96px) | `sm:h-24` (96px) | `lg:h-28` (112px) |
| Bild-Höhe   | `h-[312px]` | `sm:h-[312px]` | `lg:h-[318px]` |
| Margin-Top  | `mt-8` | `sm:mt-8` | `lg:mt-8` |

### Ursache
Das Problem ist **nicht** die Höhe, sondern die **Breite**:
- Das Bild hat `w-auto` - die Breite wird proportional zur Höhe berechnet
- Auf Mobile (375px) ist der verfügbare horizontale Platz begrenzt
- Wenn das Bild breiter wäre als der Container, wird es proportional herunterskaliert
- Dadurch wird auch die **Höhe** reduziert, obwohl CSS `h-[312px]` sagt

### Beweis
- Mobile-Bildschirm: 375px breit
- Logo-Bild hat vermutlich ein bestimmtes Seitenverhältnis
- Bei `h-[312px]` und dem Seitenverhältnis des Bildes wäre die resultierende Breite größer als 375px
- Browser skaliert das Bild proportional runter, um es in den Container einzupassen

---

## Lösung

Um das Logo auf Mobile genauso groß wie auf Tablet zu zeigen, müssen wir verhindern, dass das Bild durch die Container-Breite beschränkt wird.

### Option 1: `min-w-[...]` setzen (Empfohlen)
Eine Mindestbreite für das Bild erzwingen, damit es nicht schrumpft:

```tsx
// Vorher:
className="h-[312px] sm:h-[312px] lg:h-[318px] w-auto ..."

// Nachher - Mindestbreite hinzufügen:
className="h-[312px] sm:h-[312px] lg:h-[318px] w-auto min-w-[200px] ..."
```

### Option 2: `object-fit` anpassen
Das Bild im Container zentrieren und nicht schrumpfen lassen:

```tsx
// Vorher:
className="... object-contain ..."

// Nachher:
className="... object-cover ..." // oder object-none
```

### Option 3: Feste Breite statt auto
Eine feste Breite für alle Breakpoints definieren:

```tsx
// Vorher:
className="h-[312px] sm:h-[312px] lg:h-[318px] w-auto ..."

// Nachher:
className="h-[312px] sm:h-[312px] lg:h-[318px] w-[200px] sm:w-auto ..."
```

---

## Empfohlene Änderung

### Datei: `src/components/layout/Header.tsx` (Zeile 61)

Ich empfehle **Option 1** mit einer Mindestbreite, die verhindert, dass das Bild auf Mobile schrumpft:

**Vorher:**
```tsx
<img
  src={logoRaeumzwerge}
  alt="Räumzwerge - Entrümpelungen, Auflösungen, Service"
  className="h-[312px] sm:h-[312px] lg:h-[318px] w-auto object-contain object-center mt-8 sm:mt-8 lg:mt-8 transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
/>
```

**Nachher:**
```tsx
<img
  src={logoRaeumzwerge}
  alt="Räumzwerge - Entrümpelungen, Auflösungen, Service"
  className="h-[312px] sm:h-[312px] lg:h-[318px] min-w-[220px] w-auto object-contain object-center mt-8 sm:mt-8 lg:mt-8 transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
/>
```

---

## Ergebnis
- Das Logo behält seine volle Höhe auf allen Bildschirmgrößen
- `min-w-[220px]` stellt sicher, dass das Bild nicht unter diese Breite schrumpft
- Mobile und Tablet zeigen das Logo in exakt der gleichen Größe
- Der überstehende Teil wird durch `overflow-hidden` im Container abgeschnitten
