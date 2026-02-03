

## Logo im SEA Landing Page Header anpassen

---

### Problem

Das Logo im SEAMinimalHeader unterscheidet sich vom Hauptseiten-Header:

| Eigenschaft | Hauptseite | SEA Landing Page |
|-------------|------------|------------------|
| Logo-Höhe | 120px (fix) | 40-56px (responsiv) |
| Margins | -mt-4 -mb-8 | keine |
| Header-Höhe | Variabel (Logo überlappt) | h-12 lg:h-14 (klein) |

---

### Lösung

Den SEAMinimalHeader an das Hauptseiten-Styling anpassen:

**Datei:** `src/components/sea/SEAMinimalHeader.tsx`

**Änderungen:**

1. **Logo-Styling angleichen:**
```tsx
// Vorher (Zeile 18-21)
<img
  src={logoNeu}
  alt="Räumzwerge"
  className="h-10 sm:h-12 lg:h-14 w-auto object-contain logo-trim ..."
/>

// Nachher
<img
  src={logoNeu}
  alt="Räumzwerge – Entrümpelungen, Auflösungen, Service"
  style={{ height: 100, width: "auto", maxHeight: "none" }}
  className="object-contain logo-trim -mt-3 -mb-6 block ..."
/>
```

2. **Header-Container anpassen:**
```tsx
// Vorher (Zeile 10)
<div className="flex items-center justify-between h-12 lg:h-14">

// Nachher - Höhe entfernen, da Logo mit Margins überlappt
<div className="flex items-center justify-between py-1">
```

---

### Technische Details

- **Logo-Höhe**: 100px (etwas kleiner als Hauptseite mit 120px, passend zum kompakteren SEA-Header)
- **Negative Margins**: `-mt-3 -mb-6` (proportional skaliert)
- **Inline Style**: Notwendig für feste Höhe ohne Tailwind-Limitierungen
- **Alt-Text**: Vollständiger Text wie auf der Hauptseite

---

### Erwartetes Ergebnis

- Logo erscheint in gleicher Proportion und Position wie auf der Hauptseite
- Header bleibt kompakt, Logo überlappt dezent
- Konsistentes Branding über alle Seiten hinweg

