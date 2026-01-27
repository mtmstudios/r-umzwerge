

# Plan: Alle Website-Bilder auf WebP optimieren

## Übersicht

Konvertierung aller Bilder von JPG/PNG zu WebP für deutlich schnellere Ladezeiten (30-50% kleinere Dateigrößen bei gleicher Qualität).

## Betroffene Bilder

### public/images/ (9 Bilder)
| Aktuell | Neu |
|---------|-----|
| `service-wohnungsentruempelung.jpg` | `service-wohnungsentruempelung.webp` |
| `service-entruempelung.jpg` | `service-entruempelung.webp` |
| `service-haushaltsaufloesung.jpg` | `service-haushaltsaufloesung.webp` |
| `service-keller.jpg` | `service-keller.webp` |
| `service-gewerbe.jpg` | `service-gewerbe.webp` |
| `service-messie.jpg` | `service-messie.webp` |
| `messiewohnung-bg.jpg` | `messiewohnung-bg.webp` |
| `before-after-vorher.png` | `before-after-vorher.webp` |
| `before-after-nachher.png` | `before-after-nachher.webp` |

### src/assets/ (3 Bilder)
| Aktuell | Neu |
|---------|-----|
| `hero-team.jpg` | `hero-team.webp` |
| `logo-raeumzwerge.png` | `logo-raeumzwerge.webp` |
| `logo-white.png` | `logo-white.webp` |

**Gesamt: 12 Bilder**

---

## Technische Umsetzung

### Schritt 1: Bilder konvertieren

Alle 12 Bilder werden als WebP-Versionen mit optimierter Komprimierung erstellt.

### Schritt 2: Pfad-Referenzen aktualisieren

#### Datei: `src/lib/serviceData.ts`
6 Änderungen:
```text
Zeile 55:  imageSrc: '/images/service-wohnungsentruempelung.webp'
Zeile 137: imageSrc: '/images/service-entruempelung.webp'
Zeile 219: imageSrc: '/images/service-haushaltsaufloesung.webp'
Zeile 295: imageSrc: '/images/service-keller.webp'
Zeile 371: imageSrc: '/images/service-gewerbe.webp'
Zeile 448: imageSrc: '/images/service-messie.webp'
```

#### Datei: `src/lib/seaData.ts`
3 Änderungen:
```text
Zeile 88:  heroImage: '/images/service-haushaltsaufloesung.webp'
Zeile 140: heroImage: '/images/service-entruempelung.webp'
Zeile 192: heroImage: '/images/service-messie.webp'
```

#### Datei: `src/components/sections/BeforeAfterSection.tsx`
2 Änderungen:
```text
Zeile 82: src="/images/before-after-vorher.webp"
Zeile 94: src="/images/before-after-nachher.webp"
```

#### Datei: `src/components/sections/PricingSection.tsx`
1 Änderung:
```text
Zeile 49: src="/images/messiewohnung-bg.webp"
```

#### Datei: `src/components/sections/HeroSection.tsx`
1 Änderung:
```text
Zeile 7: import heroTeamImage from '@/assets/hero-team.webp'
```

#### Datei: `src/components/layout/Header.tsx`
1 Änderung:
```text
Logo-Import auf .webp ändern
```

#### Datei: `src/components/layout/Footer.tsx`
1 Änderung:
```text
Logo-Import auf .webp ändern
```

#### Datei: `src/components/sea/SEAMinimalHeader.tsx`
1 Änderung:
```text
Logo-Import auf .webp ändern
```

---

## Zusammenfassung der Änderungen

| Kategorie | Dateien | Änderungen |
|-----------|---------|------------|
| Neue WebP-Bilder | 12 Dateien | Konvertiert aus JPG/PNG |
| Daten-Dateien | 2 Dateien | serviceData.ts, seaData.ts |
| Komponenten | 6 Dateien | HeroSection, BeforeAfter, Pricing, Header, Footer, SEAMinimalHeader |

**Gesamt: 20 Dateioperationen**

---

## Erwartetes Ergebnis

- **Dateigröße**: 30-50% kleiner bei gleicher visueller Qualität
- **Ladezeit**: Deutlich schnellere Seitenladezeiten
- **SEO**: Bessere Core Web Vitals (LCP, FCP)
- **Kompatibilität**: WebP wird von allen modernen Browsern unterstützt (Chrome, Firefox, Safari 14+, Edge)

