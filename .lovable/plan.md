

# Plan: Leistungen-Dropdown auf Hover umstellen und Übersichtsseite entfernen

## Gewünschte Änderungen

1. Das Dropdown soll bei **Hover** aufklappen (nicht bei Click)
2. Der Eintrag **"Alle Leistungen"** soll aus dem Dropdown entfernt werden
3. Die **Route `/leistungen`** (Übersichtsseite) soll entfernt werden

## Visuelles Konzept

```text
┌─────────────────────────────────────────────────────────────────┐
│  Räumzwerge    │ Leistungen ▼ │ Preise │ Ablauf │ ... │  CTAs  │
└─────────────────────────────────────────────────────────────────┘
                       │
              (öffnet bei Hover)
                       ▼
              ┌─────────────────────────────┐
              │ Wohnungsentrümpelung        │
              │ Haushaltsauflösung          │
              │ Keller / Dachboden / Garage │
              │ Gewerbe / Büro / Lager      │
              │ Diskrete Reinigung          │
              └─────────────────────────────┘
```

---

## Technische Umsetzung

### 1. constants.ts - "Alle Leistungen" entfernen

```typescript
// Vorher:
children: [
  { label: "Alle Leistungen", href: "/leistungen" },  // ← entfernen
  { label: "Wohnungsentrümpelung", href: "/leistungen/wohnungsentruempelung" },
  ...
]

// Nachher:
children: [
  { label: "Wohnungsentrümpelung", href: "/leistungen/wohnungsentruempelung" },
  { label: "Haushaltsauflösung", href: "/leistungen/haushaltsaufloesung" },
  { label: "Keller / Dachboden / Garage", href: "/leistungen/keller-dachboden-garage" },
  { label: "Gewerbe / Büro / Lager", href: "/leistungen/gewerbe-buero-lager" },
  { label: "Diskrete Reinigung", href: "/leistungen/messie-wohnungen" },
]
```

### 2. Header.tsx - Hover-Dropdown implementieren

Das aktuelle Radix `DropdownMenu` öffnet auf Click. Für Hover-Verhalten verwende ich eine Custom-Lösung mit State:

```tsx
// Hover-State für Desktop
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// Desktop Navigation mit Hover
<div 
  className="relative"
  onMouseEnter={() => setIsDropdownOpen(true)}
  onMouseLeave={() => setIsDropdownOpen(false)}
>
  <button className="flex items-center gap-1 text-sm font-medium">
    Leistungen
    <ChevronDown className={cn("h-4 w-4 transition-transform", isDropdownOpen && "rotate-180")} />
  </button>
  
  {isDropdownOpen && (
    <div className="absolute top-full left-0 mt-2 w-56 bg-popover border rounded-lg shadow-lg">
      {item.children.map((child) => (
        <a href={child.href} className="block px-4 py-2 hover:bg-secondary">
          {child.label}
        </a>
      ))}
    </div>
  )}
</div>
```

### 3. App.tsx - Route entfernen

```typescript
// Vorher:
<Route path="/leistungen" element={<ServicesOverview />} />

// Nachher: Diese Zeile entfernen
```

### 4. ServicesOverview.tsx - Datei löschen (optional)

Die Datei `src/pages/ServicesOverview.tsx` wird nicht mehr benötigt und kann gelöscht werden.

---

## Änderungen im Überblick

| Datei | Änderung |
|-------|----------|
| `src/lib/constants.ts` | "Alle Leistungen" aus `children` Array entfernen |
| `src/components/layout/Header.tsx` | Hover-Dropdown statt Click-Dropdown (Desktop) |
| `src/App.tsx` | Route `/leistungen` entfernen |
| `src/pages/ServicesOverview.tsx` | Datei löschen |

---

## Ergebnis

1. **Desktop**: Hover über "Leistungen" öffnet Dropdown mit 5 Services (ohne Übersichtslink)
2. **Mobile**: Accordion bleibt gleich, aber ohne "Alle Leistungen" Eintrag
3. **Keine Übersichtsseite**: `/leistungen` existiert nicht mehr, nur die einzelnen Unterseiten

