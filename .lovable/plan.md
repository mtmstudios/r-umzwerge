

## Header auf 'Normal' Größe anpassen

Eine einfache Änderung, um den Header kompakter zu machen.

---

## Aktuelle Größe vs. Neue Größe

| Breakpoint | Aktuell | Neu | Reduzierung |
|------------|---------|-----|-------------|
| Mobile | h-28 (112px) | h-20 (80px) | -32px |
| Tablet (sm) | h-32 (128px) | h-22 (88px) | -40px |
| Desktop (lg) | h-36 (144px) | h-24 (96px) | -48px |

---

## Technische Änderung

### Datei: `src/components/layout/Header.tsx`

**Zeile 61 ändern:**

```text
Vorher:
className="logo-trim h-28 sm:h-32 lg:h-36 w-auto ..."

Nachher:
className="logo-trim h-20 sm:h-22 lg:h-24 w-auto ..."
```

---

## Erwartetes Ergebnis

- Header ist ca. 30-35% kompakter
- Logo bleibt gut sichtbar und lesbar
- Mehr Platz für den eigentlichen Seiteninhalt
- Proportionen bleiben auf allen Geräten ausgewogen

