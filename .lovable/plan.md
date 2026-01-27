
# Plan: Logo auf Tablet und Mobil zentrieren

## Aktuelle Situation

Der Header verwendet ein einfaches Flexbox-Layout mit `justify-between`:
- Logo links (`-ml-8`)
- Navigation in der Mitte (nur Desktop sichtbar)
- CTA-Button rechts (nur Desktop sichtbar)
- Menü-Button rechts (nur Mobil/Tablet sichtbar)

## Lösungsansatz

Das Layout wird auf Mobil/Tablet in ein 3-Spalten-Grid umgewandelt, bei dem das Logo in der Mitte zentriert wird:

```text
Desktop (ab lg):     [Logo] [Navigation] [CTA-Button]
Tablet/Mobil:        [Menü-Button] [Logo zentriert] [Platzhalter]
```

## Technische Änderungen

### Datei: `src/components/layout/Header.tsx`

1. **Container-Layout ändern** (Zeile 38):
   - Von: `flex items-center justify-between`
   - Zu: Grid-basiertes Layout für Mobil/Tablet, Flex für Desktop

2. **Menü-Button nach links verschieben** (Zeile 109-120):
   - Position: erste Spalte (links)
   - Nur auf Mobil/Tablet sichtbar (`lg:hidden`)

3. **Logo zentrieren** (Zeile 39-48):
   - Entfernen des negativen Margins auf Mobil (`-ml-8`)
   - Zentrierte Ausrichtung in der mittleren Spalte

4. **Platzhalter für rechte Spalte** (nur Mobil/Tablet):
   - Leerer Bereich für symmetrisches Layout

### Code-Struktur (vereinfacht):

```tsx
<div className="grid grid-cols-3 lg:flex lg:justify-between items-center">
  {/* Links: Menü-Button (nur mobil) */}
  <div className="lg:hidden flex justify-start">
    <button>...</button>
  </div>
  
  {/* Mitte: Logo (zentriert auf mobil, links auf desktop) */}
  <a className="flex justify-center lg:justify-start">
    <img src={logo} />
  </a>
  
  {/* Rechts: Navigation + CTA (desktop) oder Platzhalter (mobil) */}
  <div className="hidden lg:flex">...</div>
  <div className="lg:hidden" /> {/* Platzhalter für Symmetrie */}
</div>
```

## Visuelles Ergebnis

| Gerät | Layout |
|-------|--------|
| Desktop (1024px+) | Logo links, Navigation Mitte, CTA rechts |
| Tablet (768px-1023px) | Menü links, Logo zentriert, - |
| Mobil (unter 768px) | Menü links, Logo zentriert, - |

## Zusammenfassung

Eine Umstrukturierung des Header-Layouts von reinem Flexbox zu einem responsiven Grid/Flex-Hybrid ermöglicht die Zentrierung des Logos auf kleineren Bildschirmen, während das Desktop-Layout unverändert bleibt.
