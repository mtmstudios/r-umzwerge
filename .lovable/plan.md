

# Hero-CTAs & Header-Anpassung

## Übersicht

1. **Hero-Sections**: Den "Jetzt anrufen" Button durch den WhatsApp-Button ersetzen (wie vorher)
2. **Header**: Anruf-Button mit grünem Hörer für Tablet/Mobile hinzufügen (rechts oben)

## Änderungen im Detail

### 1. Hero-Sections: WhatsApp-Button wiederherstellen

Der zweite CTA-Button wird von "Jetzt anrufen" zurück zu WhatsApp geändert:

| Vorher | Nachher |
|--------|---------|
| Phone-Icon + "Jetzt anrufen" | WhatsApp-Icon + "Foto senden · Preis erhalten" |
| `bg-cta` orange Styling | `bg-whatsapp` grünes Styling |
| Link zu `PHONE_LINK` | Link zu `getWhatsAppLink()` |

**Betroffene Dateien:**
- `src/components/sections/HeroSection.tsx`
- `src/components/services/ServiceHero.tsx`
- `src/components/city/CityHero.tsx`

### 2. Header: Anruf-Button für Mobile/Tablet

Ein neuer Anruf-Button ersetzt den leeren Platzhalter rechts im Header-Grid:

**Position:** Rechts im 3-Spalten-Grid (wo aktuell `<div className="lg:hidden" />` steht)

**Design:**
- Grüner Hörer (Primary-Farbe `#1F4D3A`)
- Icon-Only Button für kompaktes Design
- Runder Button mit dezenter Hover-Animation
- Nur sichtbar auf Tablet/Mobile (`lg:hidden`)

```text
Header Layout (Mobile/Tablet):
┌─────────────────────────────────────────────────┐
│  [≡]          [LOGO]               [📞 grün]   │
│ links        zentriert              rechts     │
└─────────────────────────────────────────────────┘
```

## Technische Umsetzung

### Header.tsx - Neuer Anruf-Button

```typescript
// Aktuell (Platzhalter):
<div className="lg:hidden" />

// Neu (Anruf-Button):
<div className="lg:hidden flex justify-end">
  <a
    href={PHONE_LINK}
    className="p-2 -mr-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
    aria-label="Jetzt anrufen"
  >
    <Phone className="h-6 w-6 text-primary" />
  </a>
</div>
```

### Hero-Sections - WhatsApp-Button

```typescript
// Vorher:
<Button asChild className="bg-cta hover:bg-cta-hover">
  <a href={PHONE_LINK}>
    <Phone /> Jetzt anrufen
  </a>
</Button>

// Nachher:
<Button asChild className="bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground">
  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
    <WhatsAppIcon />
    <span className="hidden sm:inline">Foto senden · Preis erhalten</span>
    <span className="sm:hidden">WhatsApp</span>
  </a>
</Button>
```

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Platzhalter durch Anruf-Button ersetzen |
| `src/components/sections/HeroSection.tsx` | Anruf-Button → WhatsApp-Button |
| `src/components/services/ServiceHero.tsx` | Anruf-Button → WhatsApp-Button |
| `src/components/city/CityHero.tsx` | Anruf-Button → WhatsApp-Button |

## Visuelles Ergebnis

**Header (Mobile/Tablet):**
- Links: Hamburger-Menü
- Mitte: Logo (zentriert)
- Rechts: Grüner Hörer-Button (neu)

**Hero-Sections:**
- Button 1: "Jetzt Anfrage starten" (Modal öffnen)
- Button 2: "Foto senden · Preis erhalten" (WhatsApp)

