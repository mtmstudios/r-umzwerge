
# Plan: Logo im Header vergrößern

## Aktueller Zustand

Das Logo hat derzeit folgende Größen:
- Mobile: `h-10` = 40px
- Desktop: `h-12` = 48px

## Änderung

**Datei: `src/components/layout/Header.tsx`**

Die Logo-Höhe wird verdoppelt bis verdreifacht:

| Breakpoint | Vorher | Nachher |
|------------|--------|---------|
| Mobile | h-10 (40px) | h-14 (56px) |
| Desktop (lg:) | h-12 (48px) | h-20 (80px) |

```tsx
// Vorher (Zeile 42):
className="h-10 lg:h-12 w-auto"

// Nachher:
className="h-14 lg:h-20 w-auto"
```

## Zusätzliche Anpassung

Da das Logo größer wird, muss auch der Header-Padding leicht angepasst werden:

```tsx
// Vorher (Zeile 27-30):
isScrolled
  ? "glass-strong shadow-lg py-3"
  : "bg-card py-4 lg:py-5"

// Nachher (etwas mehr Padding):
isScrolled
  ? "glass-strong shadow-lg py-2"
  : "bg-card py-3 lg:py-4"
```

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Logo von h-10/h-12 auf h-14/h-20 vergrößern |

## Ergebnis

- Logo deutlich sichtbarer und prominenter
- Bessere Markenwahrnehmung
- Proportional zum Header-Layout
