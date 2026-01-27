
# Plan: Homepage-Texte lokalisieren

## Ziel
Klare Verankerung als lokales Unternehmen aus Ulm mit Teams in ganz Süddeutschland – weg vom "Portal-Gefühl", hin zu echtem Vertrauen.

---

## Änderungen

### 1. Hero-Section (`src/components/sections/HeroSection.tsx`)

**H1-Überschrift (Zeile 25):**
```
Vorher:  Entrümpelung ohne Stress – sauber, diskret, transparent.
Nachher: Entrümpelung ohne Stress – mit unseren Teams in ganz Süddeutschland.
```

**Untertitel (Zeile 28-29):**
```
Vorher:  Wohnung, Haus, Keller, Garage oder Gewerbe: Wir räumen fachgerecht 
         und besenrein. Preiseinschätzung per WhatsApp-Foto – innerhalb von 24 Stunden.

Nachher: Von Ulm aus koordinieren wir Entrümpelungen in ganz Baden-Württemberg 
         und Bayern. Preiseinschätzung per WhatsApp-Foto – innerhalb von 24 Stunden.
```

---

### 2. Trust Bar (`src/components/sections/TrustBar.tsx`)

**Neuen Trust-Pill hinzufügen (Zeile 5):**
```
{ icon: MapPin, text: "Hauptsitz Ulm · Teams vor Ort" }
```

Dieser erscheint dann im laufenden Marquee-Banner unter der Hero-Section.

---

## Vorher / Nachher Übersicht

| Element | Vorher | Nachher |
|---------|--------|---------|
| H1 | "...sauber, diskret, transparent" | "...mit unseren Teams in ganz Süddeutschland" |
| Subline | Allgemeine Leistungsbeschreibung | Ulm als Zentrale + regionale Präsenz |
| Trust Bar | Keine lokale Verankerung | Neuer Pill "Hauptsitz Ulm · Teams vor Ort" |

---

## Ergebnis

- Sofort klar: Lokales Unternehmen, kein anonymes Portal
- Ulm als Hauptsitz = Vertrauen und Greifbarkeit
- "Teams in ganz Süddeutschland" = Professionalität und Reichweite
- Trust Bar verstärkt die lokale Botschaft

---

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/components/sections/HeroSection.tsx` | H1 und Subline anpassen |
| `src/components/sections/TrustBar.tsx` | Neuen Trust-Pill mit MapPin hinzufügen |
