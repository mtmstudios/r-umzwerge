
# Plan: Regionale Seiten-Links Korrektur

## Problem-Analyse

Es wurden zwei Probleme identifiziert, die dazu führen, dass regionale Seiten auf der Mittwald-Domain als "Not Found" angezeigt werden:

### Problem 1: Inkonsistenter Link-Pfad
Die Komponente `ServiceRegions.tsx` verwendet einen falschen Pfad:
- **Aktuell:** `/region/${region.slug}` (z.B. `/region/augsburg`)
- **Korrekt:** `/${region.slug}` (z.B. `/augsburg`)

Die Route in `App.tsx` ist als `/:citySlug` definiert, daher führen Links zu `/region/augsburg` zu einer 404-Seite.

### Problem 2: SPA-Routing Bestätigung
Die `.htaccess`-Datei ist korrekt konfiguriert und befindet sich im `public/`-Ordner. Vite kopiert diese automatisch in den `dist/`-Ordner beim Build. Das SPA-Routing sollte also serverseitig funktionieren.

---

## Lösung

### Schritt 1: Link-Pfad in ServiceRegions.tsx korrigieren

Die Datei `src/components/services/ServiceRegions.tsx` wird angepasst:

```text
Zeile 35 ändern von:
  href={`/region/${region.slug}`}

zu:
  href={`/${region.slug}`}
```

### Betroffene Komponenten

| Komponente | Aktueller Pfad | Status |
|------------|----------------|--------|
| `Footer.tsx` | `/${region.slug}` | Korrekt |
| `CityList.tsx` | `/${region.slug}` | Korrekt |
| `ServiceRegions.tsx` | `/region/${region.slug}` | Muss korrigiert werden |

---

## Technische Details

### Routing-Struktur
Die regionale Seiten-Route in `App.tsx`:
```tsx
<Route path="/:citySlug" element={<CityPage />} />
```

Dies erwartet direkte Slugs wie `/ulm`, `/augsburg`, `/muenchen` usw.

### Verfügbare City-Slugs
Definiert in `cityData.ts`:
- ulm (HQ)
- augsburg
- heidenheim
- muenchen
- nuernberg
- ravensburg
- reutlingen
- stuttgart

### Nach der Korrektur
Nach dem nächsten Deployment werden alle regionalen Links auf der Mittwald-Domain korrekt funktionieren:
- `https://deine-domain.de/ulm`
- `https://deine-domain.de/augsburg`
- `https://deine-domain.de/muenchen`
- usw.

---

## Zusammenfassung

Eine einzeilige Änderung in `ServiceRegions.tsx` (Zeile 35) behebt das Problem. Nach dem automatischen GitHub-Sync und Deployment via GitHub Actions werden die Links funktionieren.
