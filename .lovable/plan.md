
# Plan: CTA-Button Orange + Footer-CTA aufräumen

## Änderungen

### 1. FinalCTASection.tsx - Anrufen-Button orange machen

**Zeile 31-36:** Button-Styling ändern von Outline zu Orange

| Vorher | Nachher |
|--------|---------|
| `variant="outline"` | entfernen |
| `border-2 border-primary-foreground/50` | entfernen |
| `text-primary-foreground` | `text-white` |
| `hover:bg-cta hover:text-cta-foreground hover:border-cta` | `bg-cta hover:bg-cta-hover` |

**Neuer Code:**
```tsx
<Button asChild size="lg" className="gap-2 h-12 sm:h-14 px-5 sm:px-8 bg-cta hover:bg-cta-hover text-white transition-all duration-300 text-sm sm:text-base">
  <a href={PHONE_LINK}>
    <Phone className="h-5 w-5 flex-shrink-0" />
    Anrufen
  </a>
</Button>
```

### 2. Footer.tsx - CTA-Banner vereinfachen

**Zeilen 15-39 entfernen/vereinfachen:** Die "Räumzwerge" + "Jetzt Preiseinschätzung erhalten" Zeile löschen

Der CTA-Banner-Bereich (Zeilen 13-42) wird entfernt, da die FinalCTASection direkt darüber bereits die gleiche Funktion erfüllt.

**Vorher:**
```
┌─────────────────────────────────────────────┐
│ FinalCTASection (grün, WhatsApp + Anrufen)  │
├─────────────────────────────────────────────┤
│ Footer CTA Banner (Räumzwerge + WhatsApp)   │ ← Doppelt, wird entfernt
├─────────────────────────────────────────────┤
│ Footer Links (Leistungen, Kontakt, etc.)    │
└─────────────────────────────────────────────┘
```

**Nachher:**
```
┌─────────────────────────────────────────────┐
│ FinalCTASection (grün, WhatsApp + Anrufen)  │
├─────────────────────────────────────────────┤
│ Footer Links (Leistungen, Kontakt, etc.)    │
└─────────────────────────────────────────────┘
```

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/components/sections/FinalCTASection.tsx` | Button-Styling: outline → orange |
| `src/components/layout/Footer.tsx` | CTA-Banner komplett entfernen (Zeilen 12-42) |

## Ergebnis

- Der Anrufen-Button ist jetzt orange (#FF8A3D) statt weiß
- Keine doppelte CTA-Sektion mehr zwischen FinalCTASection und Footer
- Saubererer, weniger redundanter Aufbau
