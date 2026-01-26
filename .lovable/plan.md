
# Plan: Mobile Header-Button zu "Jetzt anrufen" ändern

## Ziel

Den mobilen Header-Button von "WhatsApp" (grün) zu "Jetzt anrufen" (orange) ändern, für Konsistenz mit dem Desktop-Button.

## Aktuelle Situation

Der mobile Button im ausgeklappten Menü (Zeilen 167-179):
- Text: "Foto per WhatsApp senden"
- Icon: WhatsAppIcon
- Farbe: `bg-whatsapp` (grün)
- Link: WhatsApp-Link

## Änderungen

### Datei: `src/components/layout/Header.tsx`

**Mobile CTA-Button ändern (Zeilen 167-179):**

| Element | Vorher | Nachher |
|---------|--------|---------|
| Kommentar | `Mobile WhatsApp CTA` | `Mobile CTA - Jetzt anrufen` |
| Icon | `WhatsAppIcon` | `Phone` |
| Text | "Foto per WhatsApp senden" | "Jetzt anrufen" |
| Farbe | `bg-whatsapp` | `bg-cta` |
| Hover | `hover:bg-whatsapp-hover` | `hover:bg-cta-hover` |
| Textfarbe | `text-whatsapp-foreground` | `text-white` |
| Link | `getWhatsAppLink()` | `PHONE_LINK` |
| Target | `target="_blank"` | entfernt |

**Neuer Code (Zeilen 167-179):**

```tsx
{/* Mobile CTA - Jetzt anrufen */}
<div className="mt-4 pt-4 border-t border-border/50">
  <Button
    asChild
    size="lg"
    className="w-full gap-2.5 bg-cta hover:bg-cta-hover text-white font-semibold"
  >
    <a href={PHONE_LINK}>
      <Phone className="h-5 w-5" />
      Jetzt anrufen
    </a>
  </Button>
</div>
```

**Aufräumen (optional):**
- `WhatsAppIcon` Import kann komplett entfernt werden (Zeile 6)
- `getWhatsAppLink` Import kann entfernt werden (Zeile 4)

## Ergebnis

Beide Header-Buttons (Desktop und Mobile) zeigen jetzt einheitlich "Jetzt anrufen" mit orangenem Styling.

```
Desktop Header:  [📞 Jetzt anrufen] (orange)
Mobile Menü:     [📞 Jetzt anrufen] (orange, volle Breite)
```
