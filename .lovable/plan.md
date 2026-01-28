
## Bildlade-Performance optimieren

---

### Problem-Analyse

Das Projekt hat drei Hauptprobleme mit Bildern:

1. **Kein Lazy Loading** - Alle Bilder werden sofort geladen, auch wenn sie nicht sichtbar sind
2. **SFTP-Sync-Probleme** - Bilder in `public/images/` werden nicht zuverlässig nach Mittwald synchronisiert (dokumentiertes Problem)
3. **Keine Priorisierung** - Hero-Bilder haben keine erhöhte Ladepriorität

---

### Lösung: 3-Stufen-Optimierung

#### Stufe 1: Lazy Loading hinzufügen

Alle Bilder unterhalb des sichtbaren Bereichs bekommen `loading="lazy"`:

```tsx
<img 
  src={image} 
  loading="lazy"  // NEU
  alt="..." 
/>
```

**Betroffene Komponenten:**
- BeforeAfterSection
- SEABeforeAfter
- ServiceComparison
- ReviewsSection

#### Stufe 2: Hero-Bilder priorisieren

Hero-Bilder bekommen `fetchpriority="high"` und explizit `loading="eager"`:

```tsx
<img 
  src={heroImage}
  fetchpriority="high"  // NEU
  loading="eager"        // NEU (explizit)
  alt="..."
/>
```

**Betroffene Komponenten:**
- HeroSection
- ServiceHero
- SEAHero
- CityHero
- ContactHero

#### Stufe 3: Kritische Bilder nach src/assets/ migrieren

Die Bilder in `public/images/` werden nach `src/assets/` verschoben und per ES6-Import geladen. Dies nutzt Vites Hashing und Bundling und verhindert 404-Fehler auf Mittwald.

**Zu migrierende Bilder:**
- `/images/contact-hero.png` → `src/assets/contact-hero.png`
- `/images/hero-team-raeumzwerge.png` → `src/assets/hero-team-raeumzwerge.png`
- `/images/service-*.png/jpg` → `src/assets/service-*.png/jpg`

**Neuer Import-Stil:**
```tsx
// Vorher (problematisch)
<img src="/images/contact-hero.png" />

// Nachher (zuverlässig)
import contactHero from '@/assets/contact-hero.png';
<img src={contactHero} />
```

---

### Technische Änderungen

| Datei | Änderung |
|-------|----------|
| `src/components/sections/HeroSection.tsx` | `fetchpriority="high"` hinzufügen |
| `src/components/services/ServiceHero.tsx` | `fetchpriority="high"` hinzufügen |
| `src/components/sea/SEAHero.tsx` | `fetchpriority="high"` hinzufügen |
| `src/components/city/CityHero.tsx` | Asset-Import + `fetchpriority="high"` |
| `src/components/contact/ContactHero.tsx` | Asset-Import + `fetchpriority="high"` |
| `src/components/sections/BeforeAfterSection.tsx` | `loading="lazy"` hinzufügen |
| `src/components/sea/SEABeforeAfter.tsx` | `loading="lazy"` hinzufügen |
| `src/lib/serviceData.ts` | imageSrc Pfade auf Imports umstellen |

**Neue Datei:** `src/lib/serviceImages.ts` - Zentralisierte Service-Bild-Imports (ähnlich zu `seaImages.ts`)

---

### Erwartetes Ergebnis

- Hero-Bilder laden sofort mit höchster Priorität
- Below-the-fold Bilder laden erst beim Scrollen
- Keine 404-Fehler mehr auf Mittwald durch Vite-Bundling
- Schnellerer First Contentful Paint (FCP)
- Deutlich reduzierte Ladezeit bei langsamen Verbindungen
