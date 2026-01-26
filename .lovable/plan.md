

# Plan: "Anrufen"-Button in der letzten Section sichtbar machen

## Problem

Der "Anrufen"-Button in der FinalCTASection wird auf Mobile von der FloatingCTAs-Bar verdeckt. Diese ist am unteren Bildschirmrand fixiert (`fixed bottom-4`) und überlagert den Button.

```text
┌─────────────────────────────────┐
│     FinalCTASection             │
│                                 │
│  ┌─────────────────────────┐    │
│  │  WhatsApp Button        │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │  ← Wird verdeckt!
│  │  Anrufen Button         │    │
│  └─────────────────────────┘    │
├─────────────────────────────────┤
│  ┌────────┐    ┌────────────┐   │  ← FloatingCTAs (fixed)
│  │Anrufen │    │  WhatsApp  │   │
│  └────────┘    └────────────┘   │
└─────────────────────────────────┘
```

## Lösung

**Option A (empfohlen):** Extra Padding am unteren Rand der FinalCTASection auf Mobile hinzufügen, damit der Inhalt oberhalb der FloatingCTAs bleibt.

**Option B:** Die Buttons in der FinalCTASection auf Mobile ausblenden, da die FloatingCTAs bereits dieselbe Funktion erfüllen.

Ich empfehle **Option A**, da manche Nutzer die Section sehen wollen bevor sie scrollen und die FloatingCTAs erscheinen.

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/components/sections/FinalCTASection.tsx` | Extra `pb-24` Padding auf Mobile hinzufügen |

## Technische Details

Zeile 14 ändern:

```tsx
// Vorher:
<section className="py-16 lg:py-24 bg-primary">

// Nachher:
<section className="py-16 pb-28 lg:py-24 lg:pb-24 bg-primary">
```

**Erklärung:**
- `py-16`: Standard vertikales Padding (4rem = 64px)
- `pb-28`: Überschreibt bottom-padding auf Mobile (7rem = 112px) → genug Platz für die FloatingCTAs
- `lg:py-24`: Desktop vertikales Padding (6rem = 96px)
- `lg:pb-24`: Stellt auf Desktop das normale bottom-padding wieder her

## Berechnung

Die FloatingCTAs haben:
- `bottom-4` (16px vom unteren Rand)
- `py-4` (16px Padding oben/unten) 
- Plus Button-Höhe (~56px)
- Gesamt: ~90px vom unteren Viewport-Rand

Mit `pb-28` (112px) gibt es genug Abstand, damit der "Anrufen"-Button in der Section nicht verdeckt wird.

## Ergebnis

Der "Anrufen"-Button ist auf Mobile vollständig sichtbar und wird nicht mehr von den FloatingCTAs verdeckt.

