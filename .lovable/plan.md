
# Plan: StickyConversionBar entfernen & Mobile-Buttons direkt orange

## Übersicht

Zwei Änderungen:
1. **StickyConversionBar komplett entfernen** - diese erscheint beim Scrollen unter dem Header
2. **Mobile-Buttons direkt orange** - auf Touchscreens funktioniert Hover nicht, also muss der "Anruf"-Button auf Mobile sofort orange sein

---

## Teil 1: StickyConversionBar entfernen

### Dateien, die geändert werden:

| Datei | Aktion |
|-------|--------|
| `src/pages/ServicePage.tsx` | Import und Verwendung von `StickyConversionBar` entfernen |
| `src/components/services/StickyConversionBar.tsx` | Kann gelöscht werden (optional) |

### Änderung in ServicePage.tsx:

```tsx
// VORHER (Zeile 5 und 33)
import { StickyConversionBar } from '@/components/services/StickyConversionBar';
...
<StickyConversionBar />

// NACHHER
// Import und Komponente komplett entfernen
```

---

## Teil 2: Mobile-Buttons direkt orange

### Betroffene Komponenten und Buttons:

| Komponente | Button | Aktueller Zustand | Änderung |
|------------|--------|-------------------|----------|
| `HeroSection.tsx` | Anruf-Button | Grüner Rahmen, orange bei Hover | Mobile: direkt orange |
| `ServiceHero.tsx` | Anruf-Button | Grüner Rahmen, orange bei Hover | Mobile: direkt orange |
| `FloatingCTAs.tsx` | Anruf-Button | Grüner Rahmen, orange bei Hover | Mobile: direkt orange |
| `FinalCTASection.tsx` | Anruf-Button | Bereits solide orange | ✅ Passt bereits |
| `ServiceFinalCTA.tsx` | Anruf-Button | Bereits solide orange | ✅ Passt bereits |

### Styling-Strategie:

Responsive Classes verwenden - auf Mobile (`max-lg:`) direkt orange, auf Desktop Hover-Verhalten beibehalten:

```tsx
// VORHER
className="border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta"

// NACHHER
className="border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta max-lg:bg-cta max-lg:text-cta-foreground max-lg:border-cta"
```

### 1. HeroSection.tsx (Zeile 55-65)

```tsx
// VORHER
<Button
  asChild
  variant="outline"
  size="lg"
  className="gap-2 h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300 shrink-0"
>

// NACHHER
<Button
  asChild
  variant="outline"
  size="lg"
  className="gap-2 h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300 shrink-0 max-lg:bg-cta max-lg:text-cta-foreground max-lg:border-cta"
>
```

### 2. ServiceHero.tsx (Zeile 66-76)

```tsx
// VORHER
<Button
  asChild
  variant="outline"
  size="lg"
  className="gap-2.5 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300"
>

// NACHHER
<Button
  asChild
  variant="outline"
  size="lg"
  className="gap-2.5 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base border-2 border-primary hover:bg-cta hover:text-cta-foreground hover:border-cta transition-all duration-300 max-lg:bg-cta max-lg:text-cta-foreground max-lg:border-cta"
>
```

### 3. FloatingCTAs.tsx (Zeile 13-20)

Die FloatingCTAs sind **nur auf Mobile sichtbar** (`lg:hidden`), daher sollte der Anruf-Button hier immer direkt orange sein:

```tsx
// VORHER
<a
  href={PHONE_LINK}
  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-card border-2 border-primary rounded-xl shadow-medium text-foreground font-medium transition-all active:scale-95 hover:bg-cta hover:text-cta-foreground hover:border-cta"
>

// NACHHER (direkt orange, kein Hover nötig)
<a
  href={PHONE_LINK}
  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-cta border-2 border-cta rounded-xl shadow-medium text-cta-foreground font-medium transition-all active:scale-95"
>
```

---

## Visuelles Ergebnis

```text
DESKTOP (lg+):
┌─────────────────────────────────────────────────────┐
│  Anruf-Button:                                      │
│  Normal:    [📞 Anrufen]  ← Grüner Rahmen           │
│  Hover:     [📞 Anrufen]  ← Orange gefüllt          │
└─────────────────────────────────────────────────────┘

MOBILE (< lg):
┌─────────────────────────────────────────────────────┐
│  Anruf-Button:                                      │
│  Immer:     [📞 Anrufen]  ← Direkt orange           │
│             (kein Hover auf Touch-Geräten)          │
└─────────────────────────────────────────────────────┘

FLOATING CTAs (nur Mobile):
┌─────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌──────────────┐                 │
│  │ 📞 Anrufen   │  │ 💬 WhatsApp  │                 │
│  │   ORANGE     │  │    GRÜN      │                 │
│  └──────────────┘  └──────────────┘                 │
└─────────────────────────────────────────────────────┘
```

---

## Zusammenfassung der Änderungen

| Datei | Änderung |
|-------|----------|
| `src/pages/ServicePage.tsx` | StickyConversionBar Import + Komponente entfernen |
| `src/components/sections/HeroSection.tsx` | Mobile-Orange für Anruf-Button |
| `src/components/services/ServiceHero.tsx` | Mobile-Orange für Anruf-Button |
| `src/components/layout/FloatingCTAs.tsx` | Anruf-Button direkt orange (immer) |

**Optional:** `src/components/services/StickyConversionBar.tsx` löschen (wird nicht mehr verwendet)
