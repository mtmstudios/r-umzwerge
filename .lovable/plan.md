
# Plan: Header-Button zu "Jetzt anrufen" ändern

## Ziel

Den Desktop-Header-Button von "WhatsApp" (grün) zu "Jetzt anrufen" (orange) ändern.

## Aktuelle Situation

Der Desktop-Button (Zeile 94-105):
- Text: "WhatsApp"
- Icon: WhatsAppIcon
- Farbe: `bg-whatsapp` (grün)
- Link: WhatsApp-Link

## Änderungen

### Datei: `src/components/layout/Header.tsx`

**1. Imports anpassen (Zeile 2 + 4):**

| Vorher | Nachher |
|--------|---------|
| `Menu, X, Home, ChevronDown` | `Menu, X, Home, ChevronDown, Phone` |
| `NAV_ITEMS, getWhatsAppLink` | `NAV_ITEMS, PHONE_LINK` |

**2. Desktop-Button ändern (Zeile 94-105):**

```tsx
{/* Desktop CTA - Jetzt anrufen */}
<div className="hidden lg:block">
  <Button
    asChild
    size="lg"
    className="gap-2.5 bg-cta hover:bg-cta-hover text-white font-semibold px-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
  >
    <a href={PHONE_LINK}>
      <Phone className="h-5 w-5" />
      Jetzt anrufen
    </a>
  </Button>
</div>
```

**Zusammenfassung der Änderungen:**

| Element | Vorher | Nachher |
|---------|--------|---------|
| Icon | `WhatsAppIcon` | `Phone` |
| Text | "WhatsApp" | "Jetzt anrufen" |
| Farbe | `bg-whatsapp` (grün) | `bg-cta` (orange) |
| Hover | `hover:bg-whatsapp-hover` | `hover:bg-cta-hover` |
| Textfarbe | `text-whatsapp-foreground` | `text-white` |
| Link | `getWhatsAppLink()` | `PHONE_LINK` |
| Target | `target="_blank"` | entfernt |

**3. Aufräumen (optional):**
- `WhatsAppIcon` Import kann entfernt werden, da er im Desktop-Bereich nicht mehr verwendet wird
- `getWhatsAppLink` Import bleibt, da er im Mobile-Menü noch gebraucht wird

## Ergebnis

Der Header-Button wird orange mit "Jetzt anrufen" und Phone-Icon statt grün mit WhatsApp.
