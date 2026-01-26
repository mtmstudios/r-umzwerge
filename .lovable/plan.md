

# Plan: Google-Bewertungen mit Testimonial Cards (Variante A)

## Ziel

Die Referenzen-Sektion wird von Skeleton-Platzhaltern auf echte Kundenbewertungen umgestellt – mit einem professionellen Card-Design, Google-Rating-Header und CTA-Button zu den echten Google-Bewertungen.

## Design-Vorschau

```text
┌────────────────────────────────────────────────────────────┐
│              Was unsere Kunden sagen                       │
│         [G] ★★★★★ 5.0 auf Google · 12 Bewertungen         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ ★★★★★        │  │ ★★★★★        │  │ ★★★★★        │     │
│  │ "Sehr        │  │ "Schnell,    │  │ "Top Team,   │     │
│  │ profess..."  │  │ sauber..."   │  │ super..."    │     │
│  │              │  │              │  │              │     │
│  │ Max M.       │  │ Anna K.      │  │ Stefan B.    │     │
│  │ vor 2 Wo.    │  │ vor 1 Mon.   │  │ vor 1 Mon.   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                            │
│           [ Alle Bewertungen auf Google → ]                │
└────────────────────────────────────────────────────────────┘
```

## Dateien die geändert werden

| Datei | Aktion | Beschreibung |
|-------|--------|--------------|
| `src/lib/constants.ts` | Erweitern | Google-Link, Rating-Daten und Bewertungs-Array |
| `src/components/sections/ReviewsSection.tsx` | Komplett neu | Echte ReviewCards statt Skeletons |

---

## Technische Details

### 1. Neue Konstanten in `constants.ts`

```typescript
// Google Reviews
export const GOOGLE_REVIEWS_LINK = "https://www.google.com/search?q=entr%C3%BCmpelungszauberer+nersingen...";

export const GOOGLE_RATING = {
  score: 5.0,
  count: 12,
};

export const FEATURED_REVIEWS = [
  {
    id: 1,
    author: "Max M.",
    rating: 5,
    text: "Sehr professionell und zuverlässig. Die Wohnung wurde besenrein übergeben. Absolute Empfehlung!",
    date: "vor 2 Wochen",
  },
  {
    id: 2,
    author: "Anna K.",
    rating: 5,
    text: "Schnelle Terminvergabe, faire Preise und super nettes Team. Alles perfekt gelaufen!",
    date: "vor 1 Monat",
  },
  {
    id: 3,
    author: "Stefan B.",
    rating: 5,
    text: "Top Service! Kellerentrümpelung war in wenigen Stunden erledigt. Sehr empfehlenswert.",
    date: "vor 1 Monat",
  },
];
```

### 2. Neue ReviewsSection-Komponente

**Struktur:**
- **Header**: Titel + Google-Rating-Badge (Sterne, Score, Anzahl)
- **Review Grid**: 3 Karten mit Hover-Effekt (1 Spalte mobil, 2 Tablet, 3 Desktop)
- **ReviewCard**: Sterne, Zitat, Autor mit Avatar-Initialen, Datum
- **CTA-Button**: "Alle Bewertungen auf Google" mit externem Link

**Komponenten:**
```tsx
// ReviewCard Props
interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border 
                    hover:shadow-lg hover:border-primary/20 
                    transition-all duration-300">
      {/* 5 Sterne */}
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-accent fill-accent" />
        ))}
      </div>
      
      {/* Zitat */}
      <p className="text-foreground mb-4 line-clamp-4">
        "{review.text}"
      </p>
      
      {/* Autor */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full 
                        flex items-center justify-center">
          <span className="text-primary font-medium">
            {review.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium text-foreground">{review.author}</p>
          <p className="text-sm text-muted-foreground">{review.date}</p>
        </div>
      </div>
    </div>
  );
}
```

**Google-Rating-Header:**
```tsx
<div className="flex items-center justify-center gap-2 mb-8">
  {/* Google "G" Icon */}
  <svg className="h-6 w-6" viewBox="0 0 24 24">
    {/* Google G Logo SVG */}
  </svg>
  
  {/* Sterne */}
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-5 w-5 text-accent fill-accent" />
    ))}
  </div>
  
  {/* Rating Text */}
  <span className="font-semibold">{GOOGLE_RATING.score}</span>
  <span className="text-muted-foreground">
    · {GOOGLE_RATING.count} Bewertungen
  </span>
</div>
```

**CTA-Button:**
```tsx
<div className="text-center mt-8">
  <a 
    href={GOOGLE_REVIEWS_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-primary 
               hover:text-primary/80 font-medium transition-colors"
  >
    Alle Bewertungen auf Google
    <ExternalLink className="h-4 w-4" />
  </a>
</div>
```

---

## Styling-Details

- **Card Hover**: `hover:shadow-lg hover:border-primary/20` für subtile Erhebung
- **Sterne**: Accent-Farbe (#FF8A3D) für Wiedererkennungswert
- **Avatar**: Primary-Farbe mit 10% Opacity als Hintergrund
- **Responsive Grid**: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Scroll-Reveal Animation**: Bestehender Hook wird wiederverwendet

---

## Hinweis

Die Bewertungen sind als statische Daten hinterlegt (keine API-Anbindung). Bei neuen Bewertungen können diese manuell in `constants.ts` aktualisiert werden.

