

# Plan: Dezenter Logo-Hover-Effekt

## Ziel

Dem Logo einen subtilen Hover-Effekt hinzufügen, der die Interaktivität signalisiert, ohne die Premium-Ästhetik zu stören. Der Effekt soll dezent sein und gut zum bestehenden Design passen.

## Gewählter Effekt

Eine Kombination aus **leichter Skalierung (1.03)** und **Opacity-Übergang** für einen sanften, professionellen Effekt.

## Technische Umsetzung

**Datei: `src/components/layout/Header.tsx`**

### Logo-Bild mit Hover-Transition (Zeile 42-46)

```tsx
// Vorher:
<img 
  src={logoRaeumzwerge} 
  alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
  className="h-64 lg:h-80 w-auto object-contain object-left"
/>

// Nachher:
<img 
  src={logoRaeumzwerge} 
  alt="Räumzwerge - Entrümpelungen, Auflösungen, Service" 
  className="h-64 lg:h-80 w-auto object-contain object-left transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
/>
```

## Erklärung der Klassen

| Klasse | Wirkung |
|--------|---------|
| `transition-all duration-300` | Sanfte 300ms Animation für alle Eigenschaften |
| `group-hover:scale-[1.03]` | Logo wächst bei Hover um 3% (dezent) |
| `group-hover:opacity-90` | Leichte Opacity-Änderung für visuelles Feedback |

**Hinweis:** Die `group`-Klasse ist bereits auf dem umgebenden `<a>`-Tag vorhanden, daher funktioniert `group-hover` automatisch.

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Hover-Transition-Klassen zum Logo-Bild hinzufügen |

## Ergebnis

- Dezenter Skalierungseffekt (3%) bei Hover
- Sanfte 300ms Animation
- Nutzt bereits vorhandene `group`-Klasse
- Konsistent mit anderen Hover-Effekten auf der Seite (z.B. CTA-Button)

