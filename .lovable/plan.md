

## Bild-Änderungen auf der Startseite

Es werden zwei Anpassungen vorgenommen: Ein neues Bild für die Pricing-Section und eine Positionsanpassung des Hero-Bildes auf Mobilgeräten.

---

## Änderung 1: Neues Bild für "So entsteht der Preis"

Das hochgeladene Bild (zwei Mitarbeiter beim Kartons-Verladen) ersetzt das aktuelle Bild in der Pricing-Section.

**Schritte:**
1. Bild in `src/assets/` speichern als `pricing-team.jpg`
2. In `PricingSection.tsx` das Bild als ES6-Import einbinden
3. Bildpfad und Alt-Text aktualisieren

**Vorher:**
```tsx
<img 
  src="/images/messiewohnung-bg.jpg"
  alt="Entrümpelung einer vollen Wohnung"
/>
```

**Nachher:**
```tsx
import pricingTeamImage from '@/assets/pricing-team.jpg';
// ...
<img 
  src={pricingTeamImage}
  alt="Räumzwerge-Mitarbeiter beim Verladen von Umzugskartons"
/>
```

---

## Änderung 2: Hero-Bild nach rechts verschieben (Mobile)

Das Problem: Auf Mobilgeräten wird das Räumzwerge-Logo auf dem LKW (links im Bild) abgeschnitten, weil `object-cover` das Bild zentriert.

**Lösung:** Mit `object-position` das Bild auf Mobilgeräten nach links verschieben, sodass der rechte Teil (mit dem LKW-Logo) sichtbar wird.

**Anpassung in `HeroSection.tsx`:**

```tsx
<img 
  src={heroTeamImage} 
  alt="..."
  className="w-full h-full object-cover object-[25%_center] md:object-center"
/>
```

- `object-[25%_center]`: Auf Mobile wird das Bild so positioniert, dass 25% von links (also mehr vom linken Bereich mit dem LKW) sichtbar ist
- `md:object-center`: Ab Tablet wieder zentriert

---

## Zusammenfassung der Dateiänderungen

| Datei | Änderung |
|-------|----------|
| `src/assets/pricing-team.jpg` | Neues Bild hinzufügen |
| `src/components/sections/PricingSection.tsx` | Bild-Import und -Referenz ändern |
| `src/components/sections/HeroSection.tsx` | `object-position` für Mobile anpassen |

---

## Erwartetes Ergebnis

- Die Pricing-Section zeigt das neue Team-Bild mit den Kartons
- Das Hero-Bild zeigt auf Mobilgeräten den LKW mit dem Räumzwerge-Logo
- Beide Bilder werden über ES6-Imports eingebunden für zuverlässiges Deployment

