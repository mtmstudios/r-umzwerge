
# Plan: Karte komplett entfernen

## Übersicht

Die interaktive Karte von Süddeutschland wird aus der gesamten Anwendung entfernt. Die Regionen-Section bleibt bestehen, zeigt aber nur noch die Stadt-Liste (CityList) ohne Karte.

---

## Änderungen

### 1. RegionsSection.tsx umbauen

Die Section wird vereinfacht: Nur noch die CityList, zentriert, ohne Two-Column Grid.

**Vorher:**
- Two-Column Layout (Karte links, Liste rechts)
- State für `activeCity` (für Hover-Synchronisation mit Karte)
- Import von `InteractiveMap`

**Nachher:**
- Einspaltige, zentrierte Liste
- Kein State mehr nötig (keine Hover-Synchronisation)
- Kein Import von `InteractiveMap`

```tsx
// Vereinfachte RegionsSection ohne Karte
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { CityList } from '@/components/regions/CityList';

export function RegionsSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-secondary/30">
      <div className="container-custom">
        <div ref={ref} className={cn("text-center mb-6", "scroll-reveal", isVisible && "visible")}>
          <h2 className="text-section-mobile lg:text-section text-foreground mb-2">
            Unsere Regionen in Süddeutschland
          </h2>
          <p className="text-muted-foreground">
            Baden-Württemberg & Bayern – schnell vor Ort
          </p>
        </div>

        {/* Zentrierte Stadt-Liste */}
        <div className="max-w-xl mx-auto">
          <CityList />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Weitere Orte auf Anfrage – wir sind regional flexibel.
        </p>
      </div>
    </section>
  );
}
```

### 2. CityList.tsx anpassen

Die Hover-Props werden optional oder entfernt, da keine Karten-Synchronisation mehr nötig ist.

**Änderungen:**
- `activeCity` und `onCityHover` Props entfernen
- Hover-Effekte vereinfachen (nur noch für lokale Interaktion)

### 3. InteractiveMap.tsx löschen

Die Komponente wird nicht mehr benötigt und kann komplett entfernt werden.

**Datei:** `src/components/regions/InteractiveMap.tsx` → **Löschen**

### 4. SVG-Asset löschen

Das Karten-Bild wird nicht mehr verwendet.

**Datei:** `public/images/sueddeutschland-map.svg` → **Löschen**

---

## Betroffene Dateien

| Datei | Aktion |
|-------|--------|
| `src/components/sections/RegionsSection.tsx` | Umbauen (Karte entfernen, Layout vereinfachen) |
| `src/components/regions/CityList.tsx` | Anpassen (Hover-Props vereinfachen) |
| `src/components/regions/InteractiveMap.tsx` | **Löschen** |
| `public/images/sueddeutschland-map.svg` | **Löschen** |

---

## Ergebnis

- Keine Karte mehr auf der Homepage
- Saubere, zentrierte Liste der Regionen
- Weniger Code, bessere Performance
- Einfachere Wartung
