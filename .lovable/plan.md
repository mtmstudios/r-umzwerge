
# Plan: Breadcrumb-Navigation auf Service-Unterseiten

## Ziel

Hinzufügen einer Breadcrumb-Navigation auf allen Service-Unterseiten (z.B. `/leistungen/wohnungsentruempelung`) für bessere Benutzerorientierung und SEO.

## Vorhandene Komponenten

Die Breadcrumb-UI-Komponente existiert bereits unter `src/components/ui/breadcrumb.tsx` und muss nur eingebunden werden.

## Umsetzung

### Dateien die geändert werden

| Datei | Aktion | Beschreibung |
|-------|--------|--------------|
| `src/pages/ServicePage.tsx` | Bearbeiten | Breadcrumb-Navigation einbinden |

### Design der Breadcrumb

Die Breadcrumb wird direkt unter dem Header und vor der StickyConversionBar angezeigt:

```text
Startseite  >  Leistungen  >  [Aktueller Service-Name]
```

Beispiel für Wohnungsentrümpelung:
```text
Startseite  >  Leistungen  >  Wohnungsentrümpelung
```

### Styling

- Dezenter Hintergrund passend zum Design (`bg-secondary/30`)
- Responsive Abstände (`py-3 px-4`)
- Links klickbar zu Startseite und Leistungen-Anker
- Aktuelle Seite nicht klickbar (BreadcrumbPage)
- Container-Klasse für konsistente Breite

## Technische Details

**Imports hinzufügen (Zeile 1-15):**
```tsx
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
```

**Breadcrumb-Komponente einfügen (nach Header, vor StickyConversionBar):**
```tsx
{/* Breadcrumb Navigation */}
<div className="bg-secondary/30 border-b border-border/50">
  <div className="container-custom py-3">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Startseite</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/#leistungen">Leistungen</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{pageData.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</div>
```

## Vorteile

- **Bessere Orientierung**: Nutzer sehen sofort, wo sie sich befinden
- **Navigation**: Schneller Rückweg zur Startseite oder Leistungsübersicht
- **SEO**: Strukturierte Navigation verbessert die Indexierung
- **Konsistenz**: Nutzt vorhandene UI-Komponenten im bestehenden Design

## Ergebnis

Alle Service-Unterseiten zeigen eine dezente Breadcrumb-Leiste direkt unter dem Header, die den aktuellen Service-Namen dynamisch aus den Seitendaten lädt.
