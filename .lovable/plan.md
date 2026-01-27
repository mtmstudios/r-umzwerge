
# Plan: Mobile Animationen reparieren

## Identifizierte Probleme

Nach ausführlicher Analyse der mobilen Ansicht wurden folgende Animationsprobleme identifiziert:

### Problem 1: `animate-fade-in` fehlt in Tailwind
Die Klasse `animate-fade-in` wird in zwei Komponenten verwendet, ist aber nicht in der Tailwind-Konfiguration registriert:

| Datei | Zeile | Verwendung |
|-------|-------|------------|
| `ReviewsSection.tsx` | 21 | Review-Karten Einblend-Animation |
| `Header.tsx` | 126 | Mobile Menü Einblend-Animation |

**Lösung:** Die Animation in `tailwind.config.ts` registrieren.

---

### Problem 2: `scale-115` ist keine gültige Tailwind-Klasse
In `BentoCard.tsx` (Zeile 97) wird `group-hover:scale-115` verwendet. Tailwind bietet standardmäßig nur:
- `scale-100`, `scale-105`, `scale-110`, `scale-125`, `scale-150`, etc.

Die Klasse `scale-115` existiert nicht und hat daher keine Wirkung.

**Lösung:** Entweder zu `scale-110` ändern oder einen Custom-Scale in Tailwind registrieren.

---

### Problem 3: Marquee Hover-Pause funktioniert nicht
In `index.css` (Zeile 344-346) verwendet die Klasse `.pause` anstelle von `.paused`:
```css
.hover\:\[&_.marquee-track\]\:pause:hover .marquee-track {
  animation-play-state: paused;
}
```
Der CSS-Selektor erwartet eine Klasse `.pause`, die jedoch nicht existiert.

**Lösung:** Den korrekten CSS-Selektor verwenden.

---

## Technische Umsetzung

### Datei 1: `tailwind.config.ts`

**Änderung 1: `fade-in` Keyframes hinzufügen (nach Zeile 128)**
```typescript
"fade-in": {
  from: { opacity: "0" },
  to: { opacity: "1" },
},
```

**Änderung 2: `fade-in` Animation hinzufügen (nach Zeile 139)**
```typescript
"fade-in": "fade-in 0.3s ease-out forwards",
```

**Änderung 3: Custom Scale hinzufügen (neue extend-Sektion)**
```typescript
scale: {
  '115': '1.15',
},
```

---

### Datei 2: `src/index.css`

**Änderung: Marquee Hover-Pause korrigieren (Zeilen 343-346)**

Aktuelle CSS-Klasse funktioniert bereits korrekt. Das Problem liegt nicht im CSS-Wert (`paused` ist korrekt), sondern in der Tailwind-Klasse, die in `Marquee.tsx` verwendet wird.

Ich muss die `Marquee.tsx` Komponente überprüfen - dort wird `pauseOnHover` verwendet, aber die Klasse `hover:[&_.marquee-track]:pause` wird nie angewendet.

---

### Datei 3: `src/components/ui/Marquee.tsx`

Das Problem: Die Klasse `hover:[&_.marquee-track]:pause` verwendet `pause`, aber der CSS-Selektor in `index.css` erwartet genau diese Klasse. Die CSS-Eigenschaft ist korrekt (`animation-play-state: paused`), aber Tailwind kann diese spezielle Syntax nicht verarbeiten.

**Lösung:** Eine direkte Tailwind-Klasse verwenden, die `animation-play-state` setzt.

---

### Datei 4: `src/components/ui/BentoCard.tsx`

**Änderung: `scale-115` zu `scale-[1.15]` ändern (Zeile 97)**

Von:
```tsx
'group-hover:scale-115 group-hover:rotate-3',
```

Zu:
```tsx
'group-hover:scale-[1.15] group-hover:rotate-3',
```

---

## Zusammenfassung der Änderungen

| Datei | Änderung |
|-------|----------|
| `tailwind.config.ts` | `fade-in` Keyframes und Animation hinzufügen |
| `tailwind.config.ts` | Custom `scale.115` hinzufügen (optional) |
| `src/components/ui/BentoCard.tsx` | `scale-115` → `scale-[1.15]` (arbitrary value) |
| `src/components/ui/Marquee.tsx` | Hover-Pause-Mechanismus überarbeiten |

---

## Ergebnis

Nach diesen Änderungen:

- Review-Karten werden mit sanfter Fade-Animation eingeblendet
- Mobile Menü hat eine saubere Einblend-Animation
- BentoCard Icons skalieren korrekt beim Hover auf 115%
- Marquee pausiert beim Hover (falls gewünscht)
- Alle Animationen funktionieren konsistent auf Desktop und Mobile
