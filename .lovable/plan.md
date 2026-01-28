

## Logo-Austausch mit optimierter Groessenanpassung

Das neue Logo wird eingebunden und fuer alle Geraeteklassen (Desktop, Tablet, Mobile) perfekt dimensioniert.

---

## Aktuelle Situation

- **Header.tsx**: Verwendet `logo-raeumzwerge-cropped.png` mit `.logo-trim` CSS (clip-path + scale)
- **SEAMinimalHeader.tsx**: Verwendet `logo-raeumzwerge.png` mit Overflow-Clipping
- Das neue Logo hat ein horizontales Layout (Icon + Text nebeneinander)

---

## Loesung

### 1. Neues Logo als Asset speichern

Das hochgeladene Bild wird in `src/assets/` kopiert:

```
user-uploads://Entrümpelungszauberer-03.jpg  →  src/assets/logo-new.jpg
```

### 2. CSS-Klasse .logo-trim entfernen

Die aktuelle `.logo-trim` Klasse in `src/index.css` verwendet `clip-path` und `scale`, was fuer das alte Logo optimiert war. Fuer das neue Logo wird diese Klasse nicht mehr benoetigt.

### 3. Header.tsx anpassen

Neue responsive Groessen ohne Container-Tricks:

```text
Mobile (< 640px):   h-10 (40px) - kompakt aber lesbar
Tablet (640-1024px): h-12 (48px) - ausgewogen
Desktop (> 1024px):  h-14 (56px) - prominent
```

```tsx
<img
  src={logoNew}
  alt="Räumzwerge - Entrümpelungen, Auflösungen, Service"
  className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
/>
```

### 4. SEAMinimalHeader.tsx anpassen

Gleiche Logik, leicht groessere Variante:

```tsx
<img
  src={logoNew}
  alt="Räumzwerge"
  className="h-10 sm:h-12 lg:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
/>
```

---

## Visuelles Ergebnis

```text
Mobile:
┌─────────────────────────────────┐
│ ☰   [🏠🧙 RÄUMZWERGE]          │  h-10 (40px)
└─────────────────────────────────┘

Tablet:
┌─────────────────────────────────────────┐
│ ☰   [🏠🧙 RÄUMZWERGE Text]             │  h-12 (48px)
└─────────────────────────────────────────┘

Desktop:
┌─────────────────────────────────────────────────────────┐
│ [🏠🧙 RÄUMZWERGE - ENTRUEMPELUNGEN - SERVICE]   [CTA]  │  h-14 (56px)
└─────────────────────────────────────────────────────────┘
```

---

## Technische Aenderungen

| Datei | Aktion |
|-------|--------|
| `src/assets/logo-new.jpg` | Neues Logo kopieren |
| `src/index.css` | `.logo-trim` Klasse entfernen (Zeilen 65-69) |
| `src/components/layout/Header.tsx` | Logo-Import aendern, Klassen vereinfachen |
| `src/components/sea/SEAMinimalHeader.tsx` | Logo-Import aendern, Klassen vereinfachen |

---

## Vorteile der neuen Loesung

1. **Kein Clipping/Scaling**: Das Logo wird direkt in der richtigen Groesse angezeigt
2. **Responsive**: Skaliert fliessend ueber alle Breakpoints
3. **Konsistent**: Beide Header verwenden die gleiche Strategie
4. **Performant**: Keine zusaetzlichen CSS-Transformationen noetig

