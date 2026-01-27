

# Sticky Barrierefreiheits-Widget Button

## Uebersicht

Implementierung eines permanenten, sticky Accessibility-Buttons unten links auf der Seite. Das Layout wird so angepasst, dass auf Tablet und Mobile die zwei Floating CTAs (Anrufen + WhatsApp) daneben erscheinen koennen, wenn der Nutzer scrollt.

---

## Aktuelles Layout

```text
Aktuell (Mobile/Tablet nach Scroll):
+----------------------------------------+
|                                        |
|   [Anrufen]         [WhatsApp]         |
|                                        |
+----------------------------------------+
```

Das Accessibility-Widget wird aktuell nur ueber einen Footer-Link geoeffnet.

---

## Neues Layout

```text
Desktop (immer sichtbar, unten links):
+----------------------------------------+
|                                        |
|  [A]                                   |   <- Sticky Accessibility Button
|                                        |
+----------------------------------------+

Mobile/Tablet (nach Scroll, Accessibility + CTAs):
+----------------------------------------+
|                                        |
|  [A]    [Anrufen]      [WhatsApp]      |
|                                        |
+----------------------------------------+

Legende:
[A] = Accessibility-Icon-Button (rund, subtil)
```

---

## Komponenten-Aenderungen

### 1. Neuer Floating Accessibility Button

Erstellen einer neuen Komponente fuer den sticky Button:

**Datei**: `src/components/accessibility/FloatingAccessibilityButton.tsx`

| Eigenschaft | Wert |
|-------------|------|
| Position | fixed, bottom-left |
| Groesse | 48x48px (touch-friendly) |
| Design | Dezenter Border, leichter Hintergrund |
| Sichtbarkeit | Immer sichtbar auf allen Geraeten |
| Z-Index | 50 (gleich wie FloatingCTAs) |

### 2. FloatingCTAs anpassen

Die bestehende Komponente wird erweitert:

| Aenderung | Beschreibung |
|-----------|--------------|
| Layout | Platz links fuer Accessibility-Button reservieren |
| Padding | `pl-16` um Button-Breite + Abstand zu beruecksichtigen |
| Keine Logik-Aenderung | Scroll-Verhalten bleibt gleich |

### 3. Integration in App.tsx

Der FloatingAccessibilityButton wird global eingebunden (wie FloatingCTAs).

---

## Technische Details

### FloatingAccessibilityButton.tsx

```text
Aufbau:
- Immer sichtbar (kein Scroll-Trigger)
- Oeffnet AccessibilityWidget als Modal
- Position: fixed bottom-4 left-4
- Responsiv: gleiche Position auf allen Breakpoints
- Dezentes Design mit Accessibility-Icon
```

### FloatingCTAs.tsx Anpassung

```text
Aktuelle Struktur:
<div className="fixed bottom-0 left-0 right-0 ...">
  <div className="flex gap-3">
    [Anrufen] [WhatsApp]
  </div>
</div>

Neue Struktur:
<div className="fixed bottom-0 left-0 right-0 ...">
  <div className="flex gap-3 ml-16">  <- Platz fuer Button links
    [Anrufen] [WhatsApp]
  </div>
</div>
```

---

## Button Design

| Aspekt | Desktop | Mobile/Tablet |
|--------|---------|---------------|
| Position | bottom-4 left-4 | bottom-4 left-3 |
| Groesse | 44x44px | 44x44px |
| Hintergrund | background mit border | background mit border |
| Icon | Accessibility (Lucide) | Accessibility (Lucide) |
| Hover | Leichte Skalierung | Active-State mit scale-95 |
| Schatten | shadow-lg | shadow-lg |

---

## Dateiaenderungen

| Datei | Aktion | Beschreibung |
|-------|--------|--------------|
| `src/components/accessibility/FloatingAccessibilityButton.tsx` | NEU | Sticky Button-Komponente |
| `src/components/layout/FloatingCTAs.tsx` | AENDERN | Linken Abstand hinzufuegen |
| `src/App.tsx` | AENDERN | FloatingAccessibilityButton importieren und einbinden |
| `src/pages/Index.tsx` | AENDERN | FloatingAccessibilityButton hinzufuegen |

---

## Zusaetzliche Ueberlegungen

### Z-Index Hierarchie

```text
z-50: FloatingCTAs, FloatingAccessibilityButton
z-[90]: AccessibilityWidget Modal, CookieConsentBanner
z-[100]: Header (falls sticky)
```

### Kollision vermeiden

- Der Accessibility-Button ist immer sichtbar
- Die CTAs schieben sich von unten hoch wenn sichtbar
- Der Button bleibt links, CTAs rechts daneben
- Genug Platz zwischen den Elementen (gap-3)

---

## Visual Representation

```text
Standard (vor Hero-Scroll):
+----------------------------------------+
|                                        |
|  [A]                                   |
|                                        |
+----------------------------------------+

Nach Scroll (Mobile/Tablet):
+----------------------------------------+
|                                        |
|  [A]   [Anrufen]      [WhatsApp]       |
|                                        |
+----------------------------------------+

Desktop (immer):
+----------------------------------------+
|                                        |
|  [A]                  (keine CTAs)     |
|                                        |
+----------------------------------------+
```

---

## Zusammenfassung

| Datei | Aktion | Zeilen (ca.) |
|-------|--------|--------------|
| `src/components/accessibility/FloatingAccessibilityButton.tsx` | NEU | ~60 |
| `src/components/layout/FloatingCTAs.tsx` | AENDERN | ~5 Zeilen |
| `src/App.tsx` | AENDERN | +3 Zeilen |
| `src/pages/Index.tsx` | AENDERN | +2 Zeilen |

**Gesamt: 4 Dateien (1 neu, 3 Aenderungen)**

