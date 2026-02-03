

# Alle 3 Aufgaben implementieren

## Übersicht

Ich werde jetzt alle drei ausstehenden Aufgaben gleichzeitig umsetzen:

1. **Header-Anpassungen** (Mobile/Tablet)
2. **Carousel-Zentrierung** (Flip-Cards auf Mobile)
3. **Glow-Animationen** (Premium-Effekt beim Hover)

---

## 1. SEAMinimalHeader.tsx

### Änderungen

| Element | Vorher | Nachher |
|---------|--------|---------|
| Header-Position | `fixed top-0` | `relative lg:fixed lg:top-0` |
| Backdrop-Blur | `backdrop-blur-sm` | `lg:backdrop-blur-sm` |
| Layout | `justify-between` | `justify-center lg:justify-between` |
| Logo-Container | `justify-start` | `justify-center lg:justify-start` |
| CTA-Button | Immer sichtbar | `hidden lg:flex` |

### Visuelles Ergebnis

**Mobile/Tablet:**
```text
+------------------------------------------+
|              [LOGO zentriert]            |  ← nicht sticky, kein Button
+------------------------------------------+
```

**Desktop:**
```text
+------------------------------------------+
| [LOGO links]            [Jetzt anrufen]  |  ← sticky, Button sichtbar
+------------------------------------------+
```

---

## 2. SEAPainPoints.tsx

### Änderungen am Carousel

| Element | Vorher | Nachher |
|---------|--------|---------|
| Container | `space-y-6` | `flex flex-col items-center space-y-6` |
| Carousel align | `start` | `center` |
| Carousel Breite | `w-full` | `w-full max-w-sm mx-auto` |
| Content Margin | `-ml-4` | `-ml-2` |
| Item Padding | `pl-4` | `pl-2` |
| Card Basis | `90%` | `85%` |

### Visuelles Ergebnis

```text
+------------------------------------------+
|                                          |
|           ┌──────────────┐               |
|           │  FLIP-CARD   │               |  ← zentriert
|           │   (aktiv)    │               |
|           └──────────────┘               |
|                                          |
|               ● ○ ○ ○ ○ ○                |  ← Dots zentriert
+------------------------------------------+
```

---

## 3. index.css - Premium Glow-Animationen

### Neue Hover-Effekte

**Vorderseite (Problem) - Orange Glow:**
```css
.flip-card:not(.flipped):hover .flip-card-front {
  box-shadow: 
    0 16px 36px -12px hsl(var(--foreground) / 0.15),
    0 0 30px -5px hsl(var(--cta) / 0.25),      /* Orange Glow */
    0 0 60px -10px hsl(var(--cta) / 0.15);     /* Äußerer Schein */
}
```

**Rückseite (Lösung) - Grüner Glow:**
```css
.flip-card.flipped:hover .flip-card-back {
  box-shadow: 
    0 24px 48px -12px hsl(var(--accent) / 0.4),
    0 0 40px -5px hsl(var(--accent) / 0.35),   /* Grüner Glow */
    0 0 80px -10px hsl(var(--accent) / 0.25);  /* Äußerer Schein */
}
```

**Zusätzlich: Lift-Animation für geflippte Karten:**
```css
.flip-card.flipped:hover {
  transform: translateY(-6px);  /* Stärkerer Lift als vorher */
}
```

### Visueller Effekt

```text
Normal:                      Hover (nicht geflippt):
┌──────────────┐            ╔══════════════╗
│   PROBLEM    │            ║░░ PROBLEM ░░ ║  ← Orange Glow
└──────────────┘            ╚══════════════╝

Normal (geflippt):           Hover (geflippt):
┌──────────────┐            ╔══════════════╗
│   LÖSUNG     │            ║░░ LÖSUNG ░░ ║   ← Grüner Glow
└──────────────┘            ╚══════════════╝
```

---

## Zusammenfassung aller Änderungen

| Datei | Änderungen |
|-------|------------|
| `src/components/sea/SEAMinimalHeader.tsx` | Responsive Header: Position, Zentrierung, Button-Visibility |
| `src/components/sea/SEAPainPoints.tsx` | Carousel-Zentrierung: align, max-width, margins |
| `src/index.css` | Premium Glow: Orange für Vorderseite, Grün für Rückseite, verstärkter Hover-Lift |

---

## Erwartetes Ergebnis

- **Header**: Sauberes, zentriertes Logo auf Mobile ohne störenden Button
- **Flip-Cards**: Perfekt zentriert im Viewport auf Mobile
- **Premium-Gefühl**: Subtiler farbiger Glow beim Hover verstärkt die Interaktivität

