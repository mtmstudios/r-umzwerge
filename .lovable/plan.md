

## Desktop-Logo 6x vergroessern

Das Logo wird auf Desktop signifikant vergroessert, waehrend Mobile/Tablet-Groessen beibehalten werden.

---

## Aktuelle Situation

| Viewport | Klasse | Groesse |
|----------|--------|---------|
| Mobile | `h-12` | 48px |
| Tablet | `sm:h-14` | 56px |
| Desktop | `lg:h-16` | 64px |

**Mathematisch 6x groesser**: 64px x 6 = 384px (`h-96`)

Das waere jedoch extrem gross fuer einen Header. Ich werde es trotzdem umsetzen, da du es explizit angefragt hast. Sollte es zu gross sein, kann die Groesse jederzeit angepasst werden.

---

## Geplante Aenderungen

### Neue Groessen

| Viewport | Vorher | Nachher |
|----------|--------|---------|
| Mobile | `h-12` (48px) | `h-12` (48px) - unveraendert |
| Tablet | `sm:h-14` (56px) | `sm:h-14` (56px) - unveraendert |
| Desktop | `lg:h-16` (64px) | `lg:h-96` (384px) - 6x groesser |

### Technische Umsetzung

Da ein 384px hohes Logo einen deutlich groesseren Header benoetigt, muss auch die Header-Hoehe angepasst werden:

**Header.tsx:**
```tsx
<img
  src={logoTransparent}
  alt="Räumzwerge - Entrümpelungen, Auflösungen, Service"
  className="h-12 sm:h-14 lg:h-96 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
/>
```

**SEAMinimalHeader.tsx:**
- Header-Container von `lg:h-20` auf `lg:h-[420px]` erhoehen
- Logo von `lg:h-16` auf `lg:h-96` erhoehen

```tsx
<div className="flex items-center justify-between h-16 lg:h-[420px]">
  ...
  <img
    src={logoTransparent}
    className="h-12 sm:h-14 lg:h-96 w-auto object-contain ..."
  />
```

---

## Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/layout/Header.tsx` | Logo-Hoehe auf `lg:h-96` setzen |
| `src/components/sea/SEAMinimalHeader.tsx` | Logo-Hoehe auf `lg:h-96`, Container-Hoehe anpassen |

---

## Hinweis

Ein 384px hohes Logo nimmt fast den halben Bildschirm ein und wird die Navigation stark beeinflussen. Falls dies nicht gewuenscht ist, kann ich alternativ eine gemaeessigtere Vergroesserung vorschlagen (z.B. `lg:h-32` = 128px, was etwa 2x so gross ist).

