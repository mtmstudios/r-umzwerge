

# Plan: "Wir verstehen" Section zentrieren

## Aktuelles Problem

Das Grid mit den Pain-Point-Karten nimmt die volle Container-Breite ein und ist nicht optimal zentriert. Auf sehr breiten Bildschirmen kann das Layout zu breit wirken.

```text
Aktuell:
┌─────────────────────────────────────────────────────────────┐
│                    Container-Custom                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │   Card 1    │ │   Card 2    │ │   Card 3    │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
│  <── Grid nimmt volle Breite ──────────────────>            │
└─────────────────────────────────────────────────────────────┘

Gewünscht:
┌─────────────────────────────────────────────────────────────┐
│                    Container-Custom                          │
│       ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│       │  Card 1  │ │  Card 2  │ │  Card 3  │                │
│       └──────────┘ └──────────┘ └──────────┘                │
│       <── max-w-5xl mx-auto ──>                             │
└─────────────────────────────────────────────────────────────┘
```

## Lösung

Füge dem Grid-Container eine maximale Breite und `mx-auto` hinzu, um die Cards zu zentrieren.

## Technische Umsetzung

### Datei: `src/components/sea/SEAPainPoints.tsx`

**Zeile 50-53 ändern:**

Von:
```tsx
<div 
  ref={sectionRef}
  className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
>
```

Zu:
```tsx
<div 
  ref={sectionRef}
  className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
>
```

## Änderung

| Datei | Änderung |
|-------|----------|
| `src/components/sea/SEAPainPoints.tsx` | Zeile 52: `max-w-5xl mx-auto` zum Grid hinzufügen |

## Erwartetes Ergebnis

- Die Pain-Point-Cards sind auf allen 3 Landingpages horizontal zentriert
- Auf sehr breiten Bildschirmen bleiben die Cards in einer angenehmen Lesebreite
- Auf Mobile und Tablet ändert sich nichts (volle Breite innerhalb des Paddings)

