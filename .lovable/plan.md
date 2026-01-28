

## Logo-Trimming auf der kompletten Website

Die CSS-Loesung mit `clip-path` und `scale` wird auf alle 4 Logo-Stellen angewendet, damit das sichtbare Logo ueberall einheitlich und ohne transparente Raender dargestellt wird.

---

## Betroffene Dateien

| Datei | Logo-Asset | Verwendung |
|-------|------------|------------|
| `src/components/layout/Header.tsx` | logo-transparent.png | Hauptnavigation (alle Seiten) |
| `src/components/sea/SEAMinimalHeader.tsx` | logo-transparent.png | SEA Landing Pages |
| `src/components/city/CityComparison.tsx` | logo-raeumzwerge.png | Regionale Unterseiten (Vergleich) |
| `src/components/services/ServiceComparison.tsx` | logo-raeumzwerge.png | Service-Seiten (Vergleich) |
| `src/index.css` | - | Neue CSS-Klasse |

---

## Technische Umsetzung

### 1. Neue CSS-Klasse in index.css

```css
/* Logo Trimming - entfernt transparente Raender */
.logo-trim {
  clip-path: inset(8% 5% 8% 5%);
  transform: scale(1.2);
  transform-origin: center;
}
```

### 2. Header.tsx (Zeile 56-60)

**Vorher:**
```tsx
className="h-8 sm:h-9 lg:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
```

**Nachher:**
```tsx
className="h-10 sm:h-12 lg:h-14 w-auto object-contain logo-trim transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
```

Logo-Hoehe erhoeht (h-10/h-12/h-14), damit nach dem Trimming das Logo visuell groesser erscheint.

### 3. SEAMinimalHeader.tsx (Zeile 18-21)

**Vorher:**
```tsx
className="h-8 sm:h-9 lg:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
```

**Nachher:**
```tsx
className="h-10 sm:h-12 lg:h-14 w-auto object-contain logo-trim transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
```

### 4. CityComparison.tsx (Zeile 75-79)

**Vorher:**
```tsx
<img 
  src={logoRaeumzwerge} 
  alt="Räumzwerge" 
  className="h-10 sm:h-12 lg:h-14 w-auto"
/>
```

**Nachher:**
```tsx
<img 
  src={logoRaeumzwerge} 
  alt="Räumzwerge" 
  className="h-12 sm:h-14 lg:h-16 w-auto logo-trim"
/>
```

### 5. ServiceComparison.tsx (Zeile 58-62)

**Vorher:**
```tsx
<img 
  src={logoRaeumzwerge} 
  alt="Räumzwerge" 
  className="h-10 sm:h-12 lg:h-14 w-auto"
/>
```

**Nachher:**
```tsx
<img 
  src={logoRaeumzwerge} 
  alt="Räumzwerge" 
  className="h-12 sm:h-14 lg:h-16 w-auto logo-trim"
/>
```

---

## Viewport-Uebersicht

Nach der Aenderung sind die effektiven Logo-Groessen (visuell, nach Trim+Scale):

| Komponente | Mobile | Tablet | Desktop |
|------------|--------|--------|---------|
| Header | h-10 (40px) | h-12 (48px) | h-14 (56px) |
| SEA Header | h-10 (40px) | h-12 (48px) | h-14 (56px) |
| City Comparison | h-12 (48px) | h-14 (56px) | h-16 (64px) |
| Service Comparison | h-12 (48px) | h-14 (56px) | h-16 (64px) |

---

## Hinweis

Die `clip-path`-Werte (8% oben/unten, 5% links/rechts) sind Schaetzwerte basierend auf typischen Logo-Assets. Nach der Implementierung kann das Ergebnis visuell geprueft und bei Bedarf angepasst werden.

