

# Plan: Leistungen-Dropdown im Header

## Problemanalyse

Aktuell verweist der "Leistungen"-Link im Header auf `#leistungen` (Scroll-Anker auf der Startseite). Nutzer können die einzelnen Leistungsseiten nicht direkt über die Navigation erreichen.

## Lösung: Dropdown-Menü mit allen Leistungen

### Visuelles Konzept

```text
┌─────────────────────────────────────────────────────────────────┐
│  Räumzwerge    │ Leistungen ▼ │ Preise │ Ablauf │ ... │  CTAs  │
└─────────────────────────────────────────────────────────────────┘
                       │
                       ▼
              ┌─────────────────────────────┐
              │ Alle Leistungen      →      │
              ├─────────────────────────────┤
              │ Wohnungsentrümpelung        │
              │ Haushaltsauflösung          │
              │ Keller / Dachboden / Garage │
              │ Gewerbe / Büro / Lager      │
              │ Diskrete Reinigung          │
              └─────────────────────────────┘
```

### Mobile: Accordion-Style im Hamburger-Menü

```text
┌──────────────────────────┐
│ Leistungen             ▼ │
│  └─ Wohnungsentrümpelung │
│  └─ Haushaltsauflösung   │
│  └─ ...                  │
│ Preise                   │
│ Ablauf                   │
└──────────────────────────┘
```

---

## Technische Umsetzung

### 1. constants.ts anpassen

Die Navigation erhält ein neues Format mit optionalen Sub-Items:

```typescript
export const NAV_ITEMS = [
  { 
    label: "Leistungen", 
    href: "/leistungen",
    children: [
      { label: "Alle Leistungen", href: "/leistungen" },
      { label: "Wohnungsentrümpelung", href: "/leistungen/wohnungsentruempelung" },
      { label: "Haushaltsauflösung", href: "/leistungen/haushaltsaufloesung" },
      { label: "Keller / Dachboden / Garage", href: "/leistungen/keller-dachboden-garage" },
      { label: "Gewerbe / Büro / Lager", href: "/leistungen/gewerbe-buero-lager" },
      { label: "Diskrete Reinigung", href: "/leistungen/messie-wohnungen" },
    ]
  },
  { label: "Preise", href: "#preise" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "FAQ", href: "#faq" },
];
```

### 2. Header.tsx erweitern

**Desktop: Dropdown mit Hover/Click**

- Radix UI `NavigationMenu` oder custom Popover
- Dezenter Hover-Effekt, keine wilde Animation
- Chevron-Icon zeigt Dropdown an

**Mobile: Collapsible im Menü**

- "Leistungen" wird klickbar
- Sub-Items eingerückt darunter
- Smooth Expand/Collapse

### 3. Code-Struktur

```tsx
// Desktop Navigation mit Dropdown
<nav className="hidden lg:flex items-center gap-6">
  {NAV_ITEMS.map((item) => (
    item.children ? (
      <DropdownMenu key={item.label}>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium">
          {item.label}
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {item.children.map((child) => (
            <DropdownMenuItem key={child.href} asChild>
              <a href={child.href}>{child.label}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <a key={item.href} href={item.href}>
        {item.label}
      </a>
    )
  ))}
</nav>
```

---

## Änderungen im Überblick

| Datei | Änderung |
|-------|----------|
| `src/lib/constants.ts` | `NAV_ITEMS` erweitern mit `children`-Array für Leistungen |
| `src/components/layout/Header.tsx` | Dropdown für Desktop + Collapsible für Mobile implementieren |

---

## Ergebnis

1. **Desktop**: Hover/Click auf "Leistungen" öffnet Dropdown mit allen Services
2. **Mobile**: "Leistungen" im Hamburger-Menü aufklappbar mit Sub-Links
3. **Direkte Verlinkung**: Jede Leistungsseite ist direkt über Navigation erreichbar
4. **SEO**: Interne Verlinkung verbessert

