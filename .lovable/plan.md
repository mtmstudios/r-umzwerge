

# Plan: Logo-Ränder per CSS abschneiden

## Aktuelles Problem

Das Logo-Bild (`logo-raeumzwerge.png`) enthält große transparente Ränder um den eigentlichen Logo-Inhalt. Auch bei starker Skalierung (`h-[28rem]`) bleibt das sichtbare Logo klein, weil die transparenten Bereiche den Platz einnehmen.

## Lösung: CSS clip-path

Mit `clip-path: inset()` schneiden wir die transparenten Ränder ab, sodass nur der eigentliche Logo-Inhalt sichtbar ist. Dies funktioniert ohne neue Datei.

## Visuelle Darstellung

```text
Vorher (mit transparenten Rändern):
┌─────────────────────────────────┐
│                                 │
│    ┌───────────────────┐        │
│    │   RÄUMZWERGE      │        │
│    │   [Logo-Grafik]   │        │
│    └───────────────────┘        │
│                                 │
└─────────────────────────────────┘

Nachher (mit clip-path):
┌───────────────────┐
│   RÄUMZWERGE      │
│   [Logo-Grafik]   │
└───────────────────┘
```

## Technische Änderungen

### Datei: `src/components/layout/Header.tsx`

**Zeile 55-62 - Logo-Container anpassen:**

```tsx
// Von:
<a href="/" className="flex items-center justify-center lg:justify-start group shrink-0 lg:-ml-12">
  <div className="h-24 lg:h-24 overflow-hidden flex items-center">
    <img 
      src={logoRaeumzwerge} 
      alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
      className="h-[28rem] lg:h-80 w-auto object-contain object-center lg:object-left transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
    />
  </div>
</a>

// Zu:
<a href="/" className="flex items-center justify-center lg:justify-start group shrink-0 lg:-ml-4">
  <div className="h-16 flex items-center">
    <img 
      src={logoRaeumzwerge} 
      alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
      className="h-40 w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
      style={{ clipPath: 'inset(32% 5% 32% 5%)' }}
    />
  </div>
</a>
```

### Änderungen im Detail

| Element | Vorher | Nachher | Begründung |
|---------|--------|---------|------------|
| Container-Höhe | `h-24` | `h-16` (64px) | Kompakter, da Logo nach Crop weniger Platz braucht |
| `overflow-hidden` | Ja | Entfernt | Nicht mehr nötig, clip-path übernimmt das |
| Bild-Höhe | `h-[28rem]` | `h-40` (160px) | Echte Größe statt Überskalierung |
| `object-center/left` | Ja | Entfernt | Crop macht das Bild symmetrisch |
| `clip-path` | - | `inset(32% 5% 32% 5%)` | Schneidet 32% oben/unten, 5% links/rechts |
| Desktop-Margin | `lg:-ml-12` | `lg:-ml-4` | Weniger Ausgleich nötig |

### clip-path Werte erklärt

```text
clip-path: inset(32% 5% 32% 5%)
                  ↑   ↑   ↑   ↑
                  │   │   │   └── 5% von links
                  │   │   └────── 32% von unten
                  │   └────────── 5% von rechts  
                  └────────────── 32% von oben

Die Werte sind moderat gewählt, damit nichts vom
eigentlichen Logo-Inhalt verloren geht.
```

## Ergebnis

- Logo erscheint deutlich größer und prominenter
- Transparente Ränder werden unsichtbar
- Gilt für alle Geräte (Mobil, Tablet, Desktop)
- Keine neue Logo-Datei erforderlich
- Header-Höhe bleibt kompakt

## Feinabstimmung

Falls das Logo nach der Implementierung zu stark oder zu wenig beschnitten ist, können die `inset()`-Werte leicht angepasst werden:
- **Weniger Crop:** `inset(28% 3% 28% 3%)`
- **Mehr Crop:** `inset(36% 8% 36% 8%)`

