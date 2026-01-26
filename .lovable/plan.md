
# Plan: Moderner & Bold Header-Redesign

## Aktuelle Probleme

1. **Zu viel Inhalt**: Utility-Bar + Trust-Line + CTAs = Überladen
2. **Zu einfaches Design**: Standard-Template-Look ohne Charakter
3. **Navigation zu klein**: Links sind dezent und unauffällig

## Neues Header-Konzept

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   🏠 RÄUMZWERGE        Leistungen ▼   Preise   Ablauf   FAQ      [WhatsApp] │
│       Logo/Icon           ↑ Bold, größer                          ↑ Nur 1   │
│                                                                    Haupt-CTA│
└─────────────────────────────────────────────────────────────────────────────┘
                    ↓ Beim Scrollen: Glassmorphism + Shadow
```

## Änderungen im Detail

### 1. Utility-Bar entfernen
Die obere graue Leiste mit "Mo–Sa 8–20 Uhr" und "Preiseinschätzung per Foto" wird entfernt. Diese Informationen sind bereits im Content der Seite vorhanden.

### 2. Trust-Line entfernen  
Die unterste Zeile mit "✓ Keine versteckten Kosten" etc. wird entfernt – sie macht den Header zu hoch und die Infos sind redundant (bereits in der TrustBar-Section).

### 3. Logo mit Icon aufwerten
Statt nur "Räumzwerge" als Text:
- Ein einfaches Haus/Besen-Icon vor dem Namen
- Größerer, bolderer Font
- Subtle Accent-Farbe für das Icon

### 4. Navigation größer und auffälliger
- Font-Größe von `text-sm` auf `text-base` erhöhen
- Mehr Spacing zwischen Items
- Hover-Effekt mit Underline-Animation (wie `.story-link`)
- Active-State mit Accent-Farbe

### 5. Nur ein CTA-Button (WhatsApp)
- "Anrufen" Button entfernen (bleibt im Footer und als Floating-Button)
- WhatsApp-Button größer und prominenter
- Subtle Glow-Animation für Aufmerksamkeit

### 6. Scroll-Effekt: Glassmorphism
Beim Scrollen wird der Header nicht nur transparent/blurred, sondern bekommt:
- Glassmorphism-Effekt (`glass-strong` Klasse)
- Sanfte Animation für den Übergang
- Header wird etwas kompakter (weniger Padding)

## Visueller Vergleich

**Vorher (3 Ebenen, überladen):**
```text
┌──────────────────────────────────────────────┐
│ Mo-Sa 8-20 Uhr    │    Preiseinschätzung...  │  ← Utility Bar
├──────────────────────────────────────────────┤
│ Räumzwerge  │ Links │  [Anrufen] [WhatsApp]  │  ← Main Header
├──────────────────────────────────────────────┤
│ ✓ Keine Kosten  ·  ✓ Festpreis  ·  ✓ Sauber │  ← Trust Line
└──────────────────────────────────────────────┘
```

**Nachher (1 Ebene, clean & bold):**
```text
┌──────────────────────────────────────────────────────┐
│ 🏠 RÄUMZWERGE    Leistungen  Preise  Ablauf  FAQ   [📱 WhatsApp] │
└──────────────────────────────────────────────────────┘
```

## Technische Umsetzung

### Header.tsx Änderungen

```tsx
// Neuer Header - vereinfacht und bold
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // ... scroll effect logic bleibt

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "glass-strong shadow-lg py-3" 
        : "bg-card py-4 lg:py-5"
    )}>
      <div className="container-custom">
        <div className="flex items-center justify-between gap-8">
          {/* Logo mit Icon */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <span className="text-2xl lg:text-3xl font-bold text-foreground">
              Räumzwerge
            </span>
          </a>

          {/* Navigation - größer und mit Underline-Animation */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              // Links mit text-base, story-link Underline, bolderer Hover
            ))}
          </nav>

          {/* Nur WhatsApp CTA - größer und prominenter */}
          <div className="hidden lg:block">
            <Button 
              size="lg" 
              className="gap-3 bg-whatsapp hover:bg-whatsapp-hover text-lg font-semibold px-6 glow-hover"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

### Neue CSS-Klassen für Navigation

```css
/* Navigation Link Animation */
.nav-link {
  position: relative;
  padding-bottom: 4px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: hsl(var(--accent));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

## Dateien zu ändern

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Komplettes Redesign |
| `src/index.css` | Neue `.nav-link` Animation |

## Mobile Header

Der mobile Header bleibt funktional ähnlich, aber:
- Logo mit Icon
- Größeres WhatsApp-Button in der ausgeklappten Navigation
- Cleaner Hamburger-Menü-Style

## Ergebnis

1. **Kompakter**: Von 3 Ebenen auf 1 Ebene
2. **Bolder**: Größeres Logo, größere Navigation
3. **Fokussierter**: Nur 1 CTA (WhatsApp) statt 2
4. **Moderner**: Glassmorphism beim Scrollen, Underline-Animationen
5. **Professioneller**: Icon im Logo, mehr Whitespace
