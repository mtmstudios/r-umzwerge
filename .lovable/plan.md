

# Plan: ServiceRegions entfernen & Übergang zur CTA-Section korrigieren

## Problem

1. Die "Wir sind in Süddeutschland für dich da" Section (`ServiceRegions`) soll von allen Leistungsseiten entfernt werden
2. Der Übergang von der FAQ-Section zur CTA-Section stimmt farblich nicht

## Aktuelle Struktur

```text
┌─────────────────────────────────┐
│      ServiceFAQ                 │  bg-background
└─────────────────────────────────┘
         ╲ SectionDivider fill-secondary/30
┌─────────────────────────────────┐
│    ServiceRegions (ENTFERNEN)   │  bg-secondary/30
└─────────────────────────────────┘
         ╱ SectionDivider fill-primary direction="up"
┌─────────────────────────────────┐
│      ServiceFinalCTA            │  bg-primary
└─────────────────────────────────┘
```

## Neue Struktur

```text
┌─────────────────────────────────┐
│      ServiceFAQ                 │  bg-background
└─────────────────────────────────┘
         ╲ SectionDivider fill-primary direction="down"
┌─────────────────────────────────┐
│      ServiceFinalCTA            │  bg-primary
└─────────────────────────────────┘
```

## Dateien die geändert werden

| Datei | Aktion |
|-------|--------|
| `src/pages/ServicePage.tsx` | ServiceRegions + zugehörigen Divider entfernen, verbleibenden Divider korrigieren |

## Technische Details

In `src/pages/ServicePage.tsx` werden folgende Zeilen entfernt und angepasst:

**Zeilen 63-68 (aktuell):**
```tsx
<SectionDivider variant="wave" direction="up" fillClassName="fill-background" />
<ServiceFAQ items={pageData.faq} />

<SectionDivider variant="curve" fillClassName="fill-secondary/30" />
<ServiceRegions />

<SectionDivider variant="angle" direction="up" fillClassName="fill-primary" />
<ServiceFinalCTA />
```

**Wird zu:**
```tsx
<SectionDivider variant="wave" direction="up" fillClassName="fill-background" />
<ServiceFAQ items={pageData.faq} />

<SectionDivider variant="angle" fillClassName="fill-primary" />
<ServiceFinalCTA />
```

**Änderungen im Detail:**
1. `ServiceRegions`-Komponente und den Import entfernen
2. Den SectionDivider vor `ServiceRegions` entfernen (Zeile 65)
3. Den verbleibenden SectionDivider anpassen:
   - `variant="angle"` beibehalten
   - `direction="up"` entfernen (default ist `"down"`)
   - `fillClassName="fill-primary"` beibehalten

## Zusätzlich: Mobile Padding für ServiceFinalCTA

Wie bei der FinalCTASection auf der Startseite muss auch hier extra Padding für Mobile hinzugefügt werden, damit der "Anrufen"-Button nicht von den FloatingCTAs verdeckt wird.

**In `src/components/services/ServiceFinalCTA.tsx` Zeile 12:**
```tsx
// Vorher:
<section className="py-16 lg:py-24 bg-primary">

// Nachher:
<section className="py-16 pb-28 lg:py-24 lg:pb-24 bg-primary">
```

## Ergebnis

- Die "Wir sind in Süddeutschland für dich da" Section ist von allen Leistungsseiten entfernt
- Der Übergang von FAQ zu CTA ist sauber: weißer Hintergrund geht direkt in grünen Primary-Bereich über
- Der "Anrufen"-Button ist auf Mobile nicht mehr von den FloatingCTAs verdeckt

