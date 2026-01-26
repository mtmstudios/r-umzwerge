
# Plan: Gradient-Divider Farben korrigieren

## Problem

Der Screenshot zeigt, dass der Gradient-Divider zwischen ServiceTrustBar und ServiceProcess kaum sichtbar ist. Die Analyse zeigt:

| Sektion | Tatsächlicher Hintergrund |
|---------|---------------------------|
| ServiceTrustBar | `bg-secondary/30` |
| Gradient-Divider | `background` → `secondary/30` |
| ServiceProcess | `bg-secondary/30` |

Der Divider startet mit `background` (Off-White), aber die TrustBar darüber hat schon `bg-secondary/30` - das erzeugt einen unnatürlichen Sprung.

## Lösung

Da beide Sektionen (TrustBar und Process) den gleichen Hintergrund `bg-secondary/30` haben, wird der Divider zwischen ihnen entfernt.

## Technische Umsetzung

**Datei: `src/pages/ServicePage.tsx`**

```text
Vorher (Zeilen 41-50):
-----------------------------------------
{/* Trust Bar */}
<ServiceTrustBar />

{/* Process */}
<SectionDivider 
  variant="gradient" 
  fromColor="hsl(var(--background))" 
  toColor="hsl(var(--secondary) / 0.3)" 
/>
<ServiceProcess steps={pageData.processSteps} />
-----------------------------------------

Nachher:
-----------------------------------------
{/* Trust Bar */}
<ServiceTrustBar />

{/* Process - same bg as TrustBar, no divider needed */}
<ServiceProcess steps={pageData.processSteps} />
-----------------------------------------
```

## Zusammenfassung

| Änderung | Datei |
|----------|-------|
| Gradient-Divider zwischen TrustBar und Process entfernen | `src/pages/ServicePage.tsx` |

## Ergebnis

- Kein unnatürlicher Farbsprung mehr
- Sauberer, konsistenter Übergang zwischen gleichfarbigen Sektionen
