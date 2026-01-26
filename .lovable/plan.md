
# Plan: Gradient-Fade Divider auf allen Seiten konsistent anpassen

## Übersicht der Änderung

Die `ServicePage.tsx` verwendet aktuell noch die alten SVG-basierten Divider (wave, curve, angle). Diese werden durch die neuen `gradient`-Varianten ersetzt, um das gleiche Design wie auf der Homepage zu erreichen.

## Sektions-Hintergründe auf Service-Seiten

| Sektion | Hintergrund |
|---------|-------------|
| ServiceHero | bg-primary |
| ServiceTrustBar | transparent/background |
| ServiceProcess | bg-secondary/30 |
| ScenarioGrid | bg-secondary/30 |
| ServiceScope | bg-background |
| ServicePricing | bg-secondary/30 |
| ExtraModule | bg-background |
| ServiceFAQ | bg-background |
| ServiceFinalCTA | bg-primary |

## Divider-Mapping (Vorher → Nachher)

| Position | Vorher | Nachher |
|----------|--------|---------|
| TrustBar → Process | `wave, fill-secondary/30` | `gradient` (background → secondary/30) |
| Process → Scenarios | `curve, direction="up", fill-background` | Entfernen (beide haben gleiche bg-secondary/30) |
| Scenarios → Scope | `angle, direction="up", fill-background` | `gradient` (secondary/30 → background) |
| Scope → Pricing | `wave, fill-muted` | `gradient` (background → secondary/30) |
| Pricing → ExtraModule | `curve, direction="up", fill-background` | `gradient` (secondary/30 → background) |
| ExtraModule → FAQ | `angle, fill-secondary/30` | Entfernen oder beibehalten (beide background) |
| FAQ → FinalCTA | `wave, direction="up", fill-primary` | `angle, fill-primary` (beibehalten - starker Kontrast) |

## Implementierung in ServicePage.tsx

```text
ServiceHero (bg-primary)
    ↓
ServiceTrustBar
    ↓
SectionDivider variant="gradient" 
  fromColor="hsl(var(--background))" 
  toColor="hsl(var(--secondary) / 0.3)"
    ↓
ServiceProcess (bg-secondary/30)
    ↓
[KEIN DIVIDER - gleiche Farbe]
    ↓
ScenarioGrid (bg-secondary/30)
    ↓
SectionDivider variant="gradient"
  fromColor="hsl(var(--secondary) / 0.3)"
  toColor="hsl(var(--background))"
    ↓
ServiceScope (bg-background)
    ↓
SectionDivider variant="gradient"
  fromColor="hsl(var(--background))"
  toColor="hsl(var(--secondary) / 0.3)"
    ↓
ServicePricing (bg-secondary/30)
    ↓
SectionDivider variant="gradient"
  fromColor="hsl(var(--secondary) / 0.3)"
  toColor="hsl(var(--background))"
    ↓
ExtraModule (bg-background)
    ↓
[KEIN DIVIDER - gleiche Farbe]
    ↓
ServiceFAQ (bg-background)
    ↓
SectionDivider variant="angle" fillClassName="fill-primary"
    ↓
ServiceFinalCTA (bg-primary)
```

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `src/pages/ServicePage.tsx` | 7 Divider durch 5 Gradient-Divider + 1 Angle-Divider ersetzen |

## Ergebnis

- Einheitliches Divider-Design auf Homepage und allen Service-Seiten
- Sanfte Gradient-Übergänge zwischen verschiedenfarbigen Sektionen
- Keine unsichtbaren Divider mehr
- Unnötige Divider zwischen gleichfarbigen Sektionen entfernt
