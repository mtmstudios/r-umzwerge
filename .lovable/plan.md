

# Implementierungsplan: FloatingCTAs Scroll-Visibility + Hero-Bilder

## Teil 1: FloatingCTAs erst nach Hero-Scroll anzeigen

### Änderung in `src/components/layout/FloatingCTAs.tsx`

Die Komponente wird erweitert um:
- `useState` für Sichtbarkeitsstatus
- `useEffect` mit Intersection Observer
- Animation-Classes für sanftes Ein-/Ausblenden

```tsx
import { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
// ... restliche imports

export const FloatingCTAs = forwardRef<HTMLDivElement>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector('main > section:first-of-type');
    if (!heroSection) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
    );
    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={cn(
        "lg:hidden fixed bottom-0 ... ",
        "transition-all duration-300",
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      {/* Buttons bleiben unverändert */}
    </div>
  );
});
```

---

## Teil 2: Hero-Bilder für Service-Seiten

### 2.1 Datenstruktur erweitern (`serviceData.ts`)

Interface erweitern:

```typescript
hero: {
  h1: string;
  subline: string;
  trustPills: string[];
  imageSrc?: string;   // NEU
  imageAlt?: string;   // NEU
}
```

### 2.2 Bilder generieren (6 Stück)

| Service | Bildmotiv | Dateiname |
|---------|-----------|-----------|
| Wohnungsentrümpelung | Leere, helle Wohnung nach Räumung, sauber, Sonnenlicht | `service-wohnungsentruempelung.jpg` |
| Entrümpelung | Team beim Verladen von Kartons in Transporter | `service-entruempelung.jpg` |
| Haushaltsauflösung | Aufgeräumtes Wohnzimmer, warme Atmosphäre | `service-haushaltsaufloesung.jpg` |
| Keller/Dachboden/Garage | Leerer, ordentlicher Kellerraum | `service-keller.jpg` |
| Gewerbe/Büro/Lager | Leeres Büro, professionelle Atmosphäre | `service-gewerbe.jpg` |
| Messie-Wohnung | Team in neutraler Kleidung, diskrete Arbeit | `service-messie.jpg` |

Stil: Professionell, sauber, vertrauenswürdig, warme Töne

### 2.3 Bilder in serviceData.ts eintragen

Jeder Service bekommt die passenden Bild-Referenzen:

```typescript
'wohnungsentruempelung': {
  hero: {
    h1: '...',
    subline: '...',
    trustPills: [...],
    imageSrc: '/images/service-wohnungsentruempelung.jpg',
    imageAlt: 'Leere, saubere Wohnung nach professioneller Entrümpelung'
  },
  // ...
}
```

### 2.4 ServicePage.tsx anpassen

Bild-Props an ServiceHero übergeben:

```tsx
<ServiceHero
  h1={pageData.hero.h1}
  subline={pageData.hero.subline}
  trustPills={pageData.hero.trustPills}
  imageSrc={pageData.hero.imageSrc}
  imageAlt={pageData.hero.imageAlt}
/>
```

---

## Zusammenfassung der Änderungen

| Datei | Änderung |
|-------|----------|
| `src/components/layout/FloatingCTAs.tsx` | Intersection Observer + Visibility-State + Animation |
| `src/lib/serviceData.ts` | Interface erweitern + imageSrc/imageAlt für alle 6 Services |
| `src/pages/ServicePage.tsx` | imageSrc und imageAlt Props übergeben |
| `public/images/` | 6 neue AI-generierte Bilder |

## Reihenfolge

1. FloatingCTAs mit Scroll-Visibility erweitern
2. 6 Service-Bilder mit AI generieren und speichern
3. serviceData.ts erweitern
4. ServicePage.tsx anpassen

