
## Build-Fehler beheben und Logo aus Vergleichssections entfernen

---

## 1. Build-Fehler in Header.tsx beheben

Das `<a>`-Tag auf Zeile 47 hat kein schließendes `</a>` Tag. Nach dem `<img>`-Element (Zeile 53) fehlt das schließende Tag.

**Änderung:**
```tsx
// Zeile 53-54 ändern von:
/>


// zu:
/>
</a>
```

---

## 2. Logo aus Vergleichssections entfernen

Das Logo wird in beiden Comparison-Komponenten durch einen Text-Header "Räumzwerge" ersetzt.

### ServiceComparison.tsx (Zeilen 56-63)

**Vorher:**
```tsx
{/* Logo Header */}
<div className="flex items-center justify-center mb-4 sm:mb-6">
  <img 
    src={logoNeu} 
    alt="Räumzwerge" 
    className="h-12 sm:h-14 lg:h-16 w-auto logo-trim"
  />
</div>
```

**Nachher:**
```tsx
<h3 className="font-semibold text-foreground mb-4 sm:mb-6 text-center text-sm sm:text-base">
  Räumzwerge
</h3>
```

### CityComparison.tsx (Zeilen 73-80)

Gleiche Änderung wie oben.

---

## 3. Ungenutzten Import entfernen

Nach dem Entfernen des Logos kann der Import `import logoNeu from '@/assets/logo-neu.png';` aus beiden Dateien entfernt werden.

---

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Schließendes `</a>` Tag hinzufügen |
| `src/components/services/ServiceComparison.tsx` | Logo durch Text-Header ersetzen, Import entfernen |
| `src/components/city/CityComparison.tsx` | Logo durch Text-Header ersetzen, Import entfernen |

---

## Ergebnis

- Build-Fehler behoben
- Kein Logo mehr in den Vergleichssections
- Einheitlicher Text-Header "Räumzwerge" in beiden Spalten des Vergleichs
