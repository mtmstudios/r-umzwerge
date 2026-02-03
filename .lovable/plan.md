

# BentoCard Mobile-Optimierung

## Probleme

1. **Hover-Animationen auf Touch-Geräten**: Karten reagieren auf Maus-Hover mit Skalierung, Schatten und Glow-Effekten - diese sind auf Mobile/Tablet störend und unlogisch
2. **Abgeschnittene Texte**: Highlights werden mit `...` abgeschnitten (`truncate max-w-[100px]`)
3. **Arrow-Indikator nur bei Hover**: Der "Details" Pfeil ist auf Mobile unsichtbar

---

## Technische Umsetzung

### Datei: `src/components/ui/BentoCard.tsx`

#### 1. Hover-Animationen nur auf Desktop (Zeile 60-73)

```tsx
// Vorher:
'hover:scale-[1.03] hover:-translate-y-2 active:scale-[0.98]',
'bg-card border border-border hover:border-accent/60 hover:shadow-[...]',

// Nachher - nur auf lg: (Desktop) aktivieren:
'lg:hover:scale-[1.03] lg:hover:-translate-y-2 active:scale-[0.98]',
'bg-card border border-border lg:hover:border-accent/60 lg:hover:shadow-[...]',
```

#### 2. Glow-Effekt nur auf Desktop (Zeile 86-90)

```tsx
// Vorher:
className="absolute inset-0 opacity-0 group-hover:opacity-100 ..."

// Nachher:
className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 ..."
```

#### 3. Icon-Animation nur auf Desktop (Zeile 93-112)

```tsx
// Vorher:
'group-hover:scale-115 group-hover:rotate-3',
'group-hover:bg-accent/25 group-hover:shadow-[...]',
'group-hover:scale-110',
'text-primary group-hover:text-accent'

// Nachher:
'lg:group-hover:scale-115 lg:group-hover:rotate-3',
'lg:group-hover:bg-accent/25 lg:group-hover:shadow-[...]',
'lg:group-hover:scale-110',
'text-primary lg:group-hover:text-accent'
```

#### 4. Truncation entfernen + max-width erhöhen (Zeile 157-167)

```tsx
// Vorher:
<span className="truncate max-w-[100px]">{highlight}</span>

// Nachher - Text vollständig anzeigen:
<span className="whitespace-nowrap">{highlight}</span>
```

Außerdem die Highlight-Container anpassen für besseres Wrapping auf Mobile:

```tsx
// Vorher:
<div className={cn("flex flex-wrap justify-center mt-3", isLarge ? "gap-3" : "gap-2")}>

// Nachher - kleinere Gaps auf Mobile:
<div className={cn("flex flex-wrap justify-center mt-2 sm:mt-3", isLarge ? "gap-2 sm:gap-3" : "gap-1.5 sm:gap-2")}>
```

#### 5. Arrow-Indikator auf Mobile immer sichtbar (Zeile 174-189)

```tsx
// Vorher:
'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0',

// Nachher - auf Mobile sichtbar, auf Desktop nur bei Hover:
'opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0',
```

---

## Zusammenfassung der Änderungen

| Element | Mobile/Tablet | Desktop |
|---------|---------------|---------|
| Karten-Scale/Translate | Keine Animation | Hover-Animation aktiv |
| Glow-Effekt | Deaktiviert | Hover-Animation aktiv |
| Icon-Animation | Keine Animation | Hover-Animation aktiv |
| Highlight-Texte | Vollständig angezeigt | Vollständig angezeigt |
| "Details" Pfeil | Immer sichtbar | Erscheint bei Hover |

---

## Design-Verbesserungen

- **Cleaner Look auf Mobile**: Keine unbeabsichtigten Hover-States beim Scrollen
- **Bessere Lesbarkeit**: Alle Highlights vollständig lesbar
- **Klare Navigation**: "Details" Pfeil zeigt auf Mobile sofort, dass Karten klickbar sind

