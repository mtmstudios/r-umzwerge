

# Plan: Mobile/Tablet Menü zentrieren

## Aktuelle Situation

Das Mobile-Menü ist derzeit **linksbündig** ausgerichtet:
- Menüpunkte haben `px-4` Padding aber keinen `text-center`
- Der CTA-Button ist zwar `w-full`, aber der Container ist nicht zentriert

## Lösung

Das gesamte Mobile-Menü zentrieren – sowohl die Navigationslinks als auch den CTA-Button.

---

## Technische Umsetzung

### Datei: `src/components/layout/Header.tsx`

**Änderung 1: Navigation Container zentrieren (Zeile 127)**

```tsx
// ALT
<nav className="container-custom py-4 flex flex-col gap-1">

// NEU - items-center für zentrierte Ausrichtung
<nav className="container-custom py-4 flex flex-col items-center gap-1">
```

**Änderung 2: Collapsible Trigger zentrieren (Zeile 135)**

```tsx
// ALT
<CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-base font-medium ...">

// NEU - justify-center für zentrierten Text, ChevronDown daneben
<CollapsibleTrigger className="flex items-center justify-center gap-2 w-full py-3 px-4 text-base font-medium ...">
```

**Änderung 3: Submenu-Einträge zentrieren (Zeile 143-154)**

```tsx
// ALT
<div className="pl-4 flex flex-col gap-1 mt-1">
  <a ... className="py-2.5 px-4 text-sm font-medium ...">

// NEU - pl-4 entfernen, text-center hinzufügen
<div className="flex flex-col items-center gap-1 mt-1">
  <a ... className="py-2.5 px-4 text-sm font-medium text-center ...">
```

**Änderung 4: Normale Menüpunkte zentrieren (Zeile 158-165)**

```tsx
// ALT
<a ... className="py-3 px-4 text-base font-medium ...">

// NEU - text-center hinzufügen
<a ... className="py-3 px-4 text-base font-medium text-center ...">
```

**Änderung 5: CTA-Container zentrieren (Zeile 170)**

```tsx
// ALT
<div className="mt-4 pt-4 border-t border-border/50">

// NEU - w-full für volle Breite des zentrierten Containers
<div className="mt-4 pt-4 border-t border-border/50 w-full max-w-xs">
```

---

## Vorher/Nachher

| Element | Vorher | Nachher |
|---------|--------|---------|
| Menüpunkte | Linksbündig | Zentriert |
| Submenu-Einträge | Links eingerückt | Zentriert |
| Leistungen + Chevron | justify-between | justify-center mit gap |
| CTA-Button | Volle Breite | Zentriert, max-w-xs |

---

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/components/layout/Header.tsx` | Mobile Menü zentrieren (5 Stellen) |

---

## Ergebnis

- Alle Menüpunkte **zentriert** auf Mobile/Tablet
- Submenu-Einträge ebenfalls zentriert
- CTA-Button kompakter und zentriert
- Professionelleres, ausgewogenes Erscheinungsbild

