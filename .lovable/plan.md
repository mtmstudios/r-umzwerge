
# Plan: Zwei-Spalten-Layout für Regionen-Sektion

## Ziel

Die aktuelle zentrierte Vollbild-Karte in ein modernes Zwei-Spalten-Layout umwandeln:
- **Links**: Interaktive SVG-Karte von Süddeutschland
- **Rechts**: Übersichtliche Städteliste mit Hover-Synchronisation

## Aktuelle Situation

Die `RegionsSection` zeigt die Karte mittig (`max-w-4xl mx-auto`) mit den Städtenamen direkt in der SVG. Das funktioniert, bietet aber wenig Interaktivität und die Labels auf der Karte sind auf Mobile schwer lesbar.

## Geplante Änderungen

### 1. Neue Komponente: `CityList.tsx`

**Datei**: `src/components/regions/CityList.tsx`

Eine neue Komponente für die Städteliste auf der rechten Seite:

```text
┌─────────────────────────────────┐
│  📍 Ulm (Hauptsitz)        →   │  ← Primärfarbe, Badge
├─────────────────────────────────┤
│  München                    →   │
├─────────────────────────────────┤
│  Stuttgart                  →   │
├─────────────────────────────────┤
│  Augsburg                   →   │
├─────────────────────────────────┤
│  ...weitere Städte...           │
└─────────────────────────────────┘
```

**Funktionen**:
- Listet alle Regionen aus `REGIONS` constant
- Ulm als Hauptsitz visuell hervorgehoben (Badge + Icon)
- Hover-State übergibt `activeCity` an Parent
- Klick führt zu `/region/[slug]`
- Pfeil-Icon für Interaktivität

### 2. Anpassung: `InteractiveMap.tsx`

**Datei**: `src/components/regions/InteractiveMap.tsx`

**Änderungen**:
- Neue Props: `activeCity?: string` und `onCityHover?: (slug: string | null) => void`
- Städte-Labels aus der SVG entfernen (werden jetzt in der Liste angezeigt)
- Nur noch Punkte auf der Karte
- Aktiver Stadt-Punkt: größer (r="12") + Glow-Effekt + Pulsier-Animation
- Inaktive Punkte: dezenter

**Vorher** (Punkt mit Label):
```tsx
<circle ... />
<text>{region.name}</text>  // Wird entfernt
```

**Nachher** (nur Punkt mit Hover-Sync):
```tsx
<circle 
  cx={coords.x}
  cy={coords.y}
  r={activeCity === region.slug ? 12 : 8}
  className={cn(
    "fill-primary transition-all duration-300",
    activeCity === region.slug && "fill-accent drop-shadow-glow"
  )}
  onMouseEnter={() => onCityHover?.(region.slug)}
  onMouseLeave={() => onCityHover?.(null)}
/>
```

### 3. Anpassung: `RegionsSection.tsx`

**Datei**: `src/components/sections/RegionsSection.tsx`

**Neues Layout**:

```text
Desktop (lg+):
┌────────────────────────────────────────────────────────┐
│           Unsere Regionen in Süddeutschland            │
│      Baden-Württemberg & Bayern – schnell vor Ort      │
├──────────────────────────┬─────────────────────────────┤
│                          │                             │
│     [SVG KARTE]          │     [STÄDTELISTE]           │
│     Süddeutschland       │     • Ulm (Hauptsitz)       │
│     mit Punkten          │     • München               │
│                          │     • Stuttgart             │
│                          │     • Augsburg              │
│                          │     • Heidenheim            │
│                          │     • Aalen                 │
│                          │     • Reutlingen            │
│                          │     • Ravensburg            │
│                          │                             │
├──────────────────────────┴─────────────────────────────┤
│    Weitere Orte auf Anfrage – wir sind flexibel.       │
└────────────────────────────────────────────────────────┘

Mobile:
┌─────────────────────────┐
│     [ÜBERSCHRIFT]       │
├─────────────────────────┤
│     [SVG KARTE]         │
│     (kompakter)         │
├─────────────────────────┤
│     [STÄDTELISTE]       │
│     (volle Breite)      │
└─────────────────────────┘
```

**Code-Struktur**:
```tsx
export function RegionsSection() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  
  return (
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2>Unsere Regionen in Süddeutschland</h2>
          <p>Baden-Württemberg & Bayern – schnell vor Ort</p>
        </div>
        
        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Map */}
          <div className="lg:sticky lg:top-24">
            <InteractiveMap 
              activeCity={activeCity}
              onCityHover={setActiveCity}
            />
          </div>
          
          {/* Right: City List */}
          <CityList 
            activeCity={activeCity}
            onCityHover={setActiveCity}
          />
        </div>
        
        {/* Footer */}
        <p className="text-center text-sm mt-8">
          Weitere Orte auf Anfrage...
        </p>
      </div>
    </section>
  );
}
```

### 4. Hover-Synchronisation

**State-Management in RegionsSection**:
```tsx
const [activeCity, setActiveCity] = useState<string | null>(null);
```

**Bidirektionale Synchronisation**:
1. Hover auf Karten-Punkt → Liste-Eintrag wird hervorgehoben
2. Hover auf Listen-Eintrag → Karten-Punkt wird hervorgehoben

### 5. Styling-Details

**CityList-Einträge**:
| Zustand | Styling |
|---------|---------|
| Normal | `bg-card border-border` |
| Hover/Aktiv | `bg-primary/10 border-primary` |
| Ulm (HQ) | Badge: `bg-primary text-primary-foreground` |

**Karten-Punkte**:
| Zustand | Styling |
|---------|---------|
| Normal | `r="8" fill-primary` |
| Hover/Aktiv | `r="12" fill-accent drop-shadow-glow scale-110` |
| Ulm (HQ) | Zusätzlich: Pulsier-Animation |

**Neuer CSS-Glow** (in `index.css`):
```css
.drop-shadow-glow {
  filter: drop-shadow(0 0 8px hsl(var(--accent)));
}
```

## Technische Details

### Dateien, die geändert werden:

| Datei | Aktion |
|-------|--------|
| `src/components/regions/CityList.tsx` | Neu erstellen |
| `src/components/regions/InteractiveMap.tsx` | Anpassen (Props, Labels entfernen) |
| `src/components/sections/RegionsSection.tsx` | Neues Layout + State |
| `src/index.css` | Glow-Utility hinzufügen |

### Props-Interface:

```typescript
// InteractiveMap.tsx
interface InteractiveMapProps {
  activeCity?: string | null;
  onCityHover?: (slug: string | null) => void;
}

// CityList.tsx
interface CityListProps {
  activeCity?: string | null;
  onCityHover?: (slug: string | null) => void;
}
```

### Imports benötigt:

```tsx
// CityList.tsx
import { MapPin, ArrowRight } from 'lucide-react';
import { REGIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
```

## Mobile-Optimierung

- Karte und Liste stapeln sich vertikal
- Liste zeigt kompaktere Einträge
- Karte behält volle Breite für gute Lesbarkeit
- Sticky-Verhalten nur auf Desktop (lg+)

## Ergebnis

Ein modernes, interaktives Zwei-Spalten-Layout, das:
- Geografischen Kontext (Karte) mit detaillierten Infos (Liste) kombiniert
- Synchronisierte Hover-Effekte für intuitive Interaktion bietet
- Auf allen Bildschirmgrößen gut funktioniert
- Die bestehende Markenidentität beibehält
