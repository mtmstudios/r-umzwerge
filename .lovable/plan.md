

# Themenspezifische Preis-Section für Service- und City-Seiten

## Übersicht

Aktuell verwendet `ServicePricing` auf allen Leistungs- und City-Seiten eine generische Version ohne themenspezifische Inhalte. Die Hauptseite (`Index.tsx`) hat hingegen die vollständige `PricingSection` mit der interaktiven "Pricing Pipeline" (5 Faktor-Karten, Festpreis-Badge, Split-Layout mit Bild und WhatsApp-CTA).

## Ziel

Die Preis-Section auf allen Unterseiten soll:
1. Das gleiche Design wie die Hauptseite nutzen (Pricing Pipeline mit 5 Faktoren)
2. Themenspezifische Überschriften und Beschreibungen erhalten
3. Für City-Seiten den Stadtnamen einbinden

## Änderungen

### 1. ServicePricing erweitern mit Props

Die Komponente `src/components/services/ServicePricing.tsx` wird erweitert, um optionale Props für themenspezifische Inhalte zu akzeptieren:

```text
interface ServicePricingProps {
  headline?: string;      // z.B. "Preise für Ihre Wohnungsentrümpelung"
  subline?: string;       // z.B. "Transparent kalkuliert – oft Festpreis möglich"
  cityName?: string;      // z.B. "München" für City-Seiten
}
```

Die Komponente übernimmt dann das vollständige Layout der Hauptseiten-PricingSection:
- 5 Preisfaktor-Karten (Umfang, Etage, Demontage, Sondermüll, Termin)
- Verbindungslinien auf Desktop
- Zentrales "Festpreis"-Badge
- Split-Layout mit Tablet-Bild und WhatsApp-CTA
- Trust-Stats am Ende

### 2. Daten in serviceData.ts ergänzen

Für jede Leistungsseite werden themenspezifische Pricing-Texte hinzugefügt:

| Service | Headline | Subline |
|---------|----------|---------|
| Wohnungsentrümpelung | "Kosten Ihrer Wohnungsentrümpelung" | "Transparent berechnet – nach Einschätzung oft Festpreis möglich." |
| Entrümpelung | "So entsteht Ihr Entrümpelungspreis" | "5 Faktoren bestimmen den Preis – transparent und nachvollziehbar." |
| Haushaltsauflösung | "Kosten Ihrer Haushaltsauflösung" | "Respektvoll kalkuliert – Wertanrechnung möglich." |
| Keller/Dachboden/Garage | "Preis für Ihre Kellerentrümpelung" | "Schnell berechnet – auch bei schwierigem Zugang." |
| Gewerbe/Büro/Lager | "Kosten Ihrer Gewerberäumung" | "Planbar und transparent – Festpreis nach Einschätzung." |
| Messie-Wohnungen | "Diskrete Preisgestaltung" | "Vertraulich, ohne Druck – Einschätzung per Foto möglich." |

### 3. City-Seiten: Dynamischer Stadtname

Für City-Seiten wird der Stadtname in die Headline eingebunden:
- "Entrümpelung in {Stadt} – Transparente Preise"
- "Keine versteckten Kosten. Festpreis nach Einschätzung möglich."

### 4. ServicePage.tsx und CityPage.tsx anpassen

Die Props werden beim Aufruf von `ServicePricing` übergeben.

## Technische Details

### Datei: `src/lib/serviceData.ts`

Erweiterung des `ServicePageData` Interface um ein optionales `pricing`-Objekt:

```typescript
pricing?: {
  headline: string;
  subline: string;
};
```

Für jede der 6 Leistungsseiten werden die passenden Texte ergänzt.

### Datei: `src/components/services/ServicePricing.tsx`

Komplette Überarbeitung: Das Layout wird vom aktuellen Icon-Cluster-Design auf das Pricing-Pipeline-Design der Hauptseite umgestellt. Die Komponente erhält Props für themenspezifische Texte und verwendet das bereits importierte Tablet-Bild.

Neue Struktur:
1. Header mit dynamischer Headline/Subline
2. 5 Preisfaktor-Karten in Grid (2x2 + 1 auf Mobile, 5 Spalten auf Desktop)
3. Festpreis-Badge darunter
4. Split-Layout: Tablet-Bild links, WhatsApp-CTA rechts
5. Trust-Stats Footer

### Datei: `src/pages/ServicePage.tsx`

Übergabe der Pricing-Daten an die Komponente:

```tsx
<ServicePricing 
  headline={pageData.pricing?.headline}
  subline={pageData.pricing?.subline}
/>
```

### Datei: `src/pages/CityPage.tsx`

Übergabe mit dynamischem Stadtnamen:

```tsx
<ServicePricing 
  headline={`Entrümpelung in ${cityData.name} – Transparente Preise`}
  subline="Keine versteckten Kosten. Festpreis nach Einschätzung möglich."
  cityName={cityData.name}
/>
```

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/lib/serviceData.ts` | Interface erweitern, Pricing-Daten für alle 6 Services hinzufügen |
| `src/components/services/ServicePricing.tsx` | Komplett überarbeiten mit Pricing-Pipeline-Layout und Props |
| `src/pages/ServicePage.tsx` | Pricing-Props übergeben |
| `src/pages/CityPage.tsx` | Pricing-Props mit Stadtname übergeben |

