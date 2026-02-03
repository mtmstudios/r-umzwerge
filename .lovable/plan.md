
# Implementierung: Tablet-Carousel + Einblende-Animation + Verschiedene Icons

## Übersicht der 3 Aufgaben

| # | Aufgabe | Betroffene Datei |
|---|---------|------------------|
| 1 | Carousel auch auf Tablet anzeigen (< 1024px) | `use-mobile.tsx`, `SEAPainPoints.tsx` |
| 2 | Sanfte Einblende-Animation beim Laden | `SEAPainPoints.tsx` |
| 3 | 3 verschiedene Icons statt 2x "Persönlich" | `FlipCard.tsx` |

---

## Aufgabe 1: Tablet-Carousel

### Änderungen in `src/hooks/use-mobile.tsx`

Neuen Hook `useIsTabletOrMobile` hinzufügen:

```typescript
const TABLET_BREAKPOINT = 1024;

export function useIsTabletOrMobile() {
  const [isTabletOrMobile, setIsTabletOrMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsTabletOrMobile(window.innerWidth < TABLET_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsTabletOrMobile(window.innerWidth < TABLET_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isTabletOrMobile;
}
```

### Änderungen in `SEAPainPoints.tsx`

| Element | Vorher | Nachher |
|---------|--------|---------|
| Hook | `useIsMobile()` | `useIsTabletOrMobile()` |
| Carousel max-width | `max-w-sm` | `max-w-sm md:max-w-md` |
| Card Basis | `basis-[85%]` | `basis-[85%] md:basis-[65%]` |
| Hinweistext | Nur Mobile-Check | Auch Tablet berücksichtigen |

---

## Aufgabe 2: Einblende-Animation

### Änderungen in `SEAPainPoints.tsx`

Neuer State für sanftes Einblenden:

```typescript
const [hasLoaded, setHasLoaded] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => setHasLoaded(true), 100);
  return () => clearTimeout(timer);
}, []);
```

Animation-Wrapper um das Carousel:

```jsx
<div className={cn(
  "flex flex-col items-center space-y-6",
  "transition-all duration-700 ease-out",
  hasLoaded 
    ? "opacity-100 translate-y-0" 
    : "opacity-0 translate-y-8"
)}>
  <Carousel ... />
</div>
```

---

## Aufgabe 3: Verschiedene Icons für alle LPs

### Änderungen in `src/components/sea/FlipCard.tsx`

**Neue Icons importieren:**
```typescript
import { ..., Package, Euro } from 'lucide-react';
```

**Erweiterte Keyword-Zuordnung:**

| Kategorie | Keywords | Icon | Label |
|-----------|----------|------|-------|
| Trauerfall | verstorben, tod, trauer | `Feather` | Trauerfall |
| Wohnung | pflege, heim, umzug, immobilie, verkauft | `Home` | Wohnung |
| Zeitdruck | zeit, schnell, dringend | `Clock` | Zeitdruck |
| **NEU: Platzmangel** | platz, voll, keller, dachboden | `Package` | Platzmangel |
| **NEU: Kosten** | kostet, preis, geld, überraschung | `Euro` | Kosten |
| Diskret | diskret, messie, scham, schäm | `Shield` | Diskret |
| Überforderung | überfordert, allein, weiß nicht, anfangen | `AlertCircle` | Überforderung |
| Fallback | - | `Heart` | Persönlich |

---

## Ergebnis pro Landing Page

### `/lp/entruempelung` (direct)

| Karte | Problem-Keywords | Icon | Label |
|-------|------------------|------|-------|
| 1 | "Kein **Platz** mehr – alles **voll**..." | Package | Platzmangel |
| 2 | "Keine **Zeit**..." | Clock | Zeitdruck |
| 3 | "Was **kostet** das... **Überraschung**..." | Euro | Kosten |

### `/lp/haushaltsaufloesung` (warm)

| Karte | Problem-Keywords | Icon | Label |
|-------|------------------|------|-------|
| 1 | "Angehöriger ist **verstorben**..." | Feather | Trauerfall |
| 2 | "**Umzug** ins **Pflegeheim**..." | Home | Wohnung |
| 3 | "**Immobilie** muss **verkauft** werden..." | Home | Wohnung |

### `/lp/messie-hilfe` (gentle)

| Karte | Problem-Keywords | Icon | Label |
|-------|------------------|------|-------|
| 1 | "Ich **schäme** mich..." | Shield | Diskret |
| 2 | "...Nachbarn etwas **mitbekommen**..." | Shield | Diskret |
| 3 | "...weiß nicht, wo ich **anfangen** soll" | AlertCircle | Überforderung |

---

## Zusammenfassung der Dateien

| Datei | Änderungen |
|-------|------------|
| `src/hooks/use-mobile.tsx` | Neuer Export `useIsTabletOrMobile()` mit 1024px Breakpoint |
| `src/components/sea/SEAPainPoints.tsx` | Hook wechseln, Animation-State, größere Carousel-Cards auf Tablet |
| `src/components/sea/FlipCard.tsx` | 2 neue Icons (Package, Euro), erweiterte Keyword-Zuordnung |

---

## Visuelles Ergebnis

### Tablet (768px - 1024px):
```text
+------------------------------------------------+
|                                                |
|         ┌────────────────────┐                 |
|         │   📦 Platzmangel   │                 |
|         │                    │    ← swipebar   |
|         │  "Kein Platz..."   │      & größer   |
|         │                    │                 |
|         └────────────────────┘                 |
|              ↑ fade-in + slide-up              |
|              ● ○ ○                             |
+------------------------------------------------+
```

### Desktop (>= 1024px):
```text
+------------------------------------------------+
| ┌──────────┐  ┌──────────┐  ┌──────────┐       |
| │📦 Platz  │  │⏰ Zeit   │  │💶 Kosten │       |
| └──────────┘  └──────────┘  └──────────┘       |
+------------------------------------------------+
```
