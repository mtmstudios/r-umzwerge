

# Plan: Hero-Bild-Pfade korrigieren

## Problem

| Service | Aktueller Pfad | Richtiger Pfad | Status |
|---------|----------------|----------------|--------|
| Entruempelung | `/images/service-entruempelung-hero.png` | `/images/service-entruempelung-hero.png` | Korrekt |
| Haushaltsaufloesung | `/images/service-haushaltsaufloesung.jpg` | `/images/service-haushaltsaufloesung-hero.png` | Falsch |

Das Entruempelung-Bild sollte eigentlich korrekt angezeigt werden, da der Pfad stimmt. Das Haushaltsaufloesung-Bild hat jedoch noch den falschen Pfad.

---

## Loesung

### Datei: `src/lib/serviceData.ts`

**Zeile 232 aendern:**

```
Vorher:  imageSrc: '/images/service-haushaltsaufloesung.jpg',
Nachher: imageSrc: '/images/service-haushaltsaufloesung-hero.png',
```

---

## Zusammenfassung

| Datei | Aenderung |
|-------|-----------|
| `src/lib/serviceData.ts` | Zeile 232: Pfad von `.jpg` auf `-hero.png` aendern |

---

## Hinweis

Falls das Entruempelung-Bild trotz korrektem Pfad nicht angezeigt wird, koennte es sich um ein Browser-Caching-Problem handeln. Nach der Aenderung bitte einmal die Seite neu laden (Strg+F5 / Cmd+Shift+R).

