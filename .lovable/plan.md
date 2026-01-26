
# Plan: Logo größer und lesbarer machen + Website-Link hinzufügen

## Problem

Das hochgeladene Logo hat sehr viel transparenten Freiraum um den eigentlichen "MTM STUDIOS" Text. Bei der aktuellen Höhe von `h-6` (24px) ist das Logo deshalb kaum lesbar.

## Lösung

### 1. Logo deutlich größer machen

Die Logo-Höhe von `h-6` (24px) auf `h-8` (32px) erhöhen. Das macht das Logo proportional zum umgebenden Text sichtbar.

### 2. Website-Link hinzufügen

Das Logo wird als klickbarer Link zur Website www.mtmstudios.de umgewandelt.

## Datei die geändert wird

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Footer.tsx` | Logo größer machen + Link hinzufügen |

## Technische Details

**Bottom Bar (Zeilen 172-179) ändern:**

Vorher:
```tsx
<p className="flex items-center gap-1.5">
  Mit <Heart className="h-4 w-4 text-red-400 fill-red-400" /> erstellt von
  <img 
    src={logoWhite} 
    alt="Logo" 
    className="h-6 ml-1 object-contain" 
  />
</p>
```

Nachher:
```tsx
<p className="flex items-center gap-1.5">
  Mit <Heart className="h-4 w-4 text-red-400 fill-red-400" /> erstellt von
  <a href="https://www.mtmstudios.de" target="_blank" rel="noopener noreferrer">
    <img 
      src={logoWhite} 
      alt="MTM Studios Logo" 
      className="h-8 ml-1 object-contain" 
    />
  </a>
</p>
```

**Änderungen im Detail:**
- `h-6` → `h-8` (von 24px auf 32px Höhe) - macht das Logo deutlich größer
- Logo wird in einen `<a>`-Tag gewrappt mit:
  - `href="https://www.mtmstudios.de"` - Link zur Website
  - `target="_blank"` - öffnet in neuem Tab
  - `rel="noopener noreferrer"` - Sicherheitsattribut für externe Links
- Alt-Text verbessert zu "MTM Studios Logo"

## Ergebnis

- Das Logo ist jetzt größer und besser lesbar (32px statt 24px)
- Ein Klick auf das Logo öffnet www.mtmstudios.de in einem neuen Tab
- Der Text "Mit ❤️ erstellt von [LOGO]" bleibt optisch ausgewogen
