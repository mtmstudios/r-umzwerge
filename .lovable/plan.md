
# Fix: Funnel-Eingabeprobleme auf Handy und Tablet

## Problem

Auf Mobilgeraeten und Tablets gibt es zwei Probleme mit dem Funnel-Drawer:

1. **Keyboard-Dismiss-Bug**: Wenn die virtuelle Tastatur sich oeffnet (beim Tippen in Eingabefelder), interpretiert die Vaul-Drawer-Bibliothek die Aenderung der Viewport-Groesse als Wisch-Geste und schliesst den Drawer oder der Fokus geht verloren.
2. **Doppelter Drag-Handle**: Die `DrawerContent`-Komponente erzeugt automatisch einen Drag-Handle (Balken oben). Jeder Funnel fuegt aber nochmal einen eigenen hinzu -- das ergibt zwei sichtbare Balken.

## Loesung

### 1. Drawer-Komponente absichern (`src/components/ui/drawer.tsx`)

- Den eingebauten automatischen Drag-Handle aus `DrawerContent` entfernen (wird von den Funnels selbst gerendert)

### 2. Alle 4 Funnel-Komponenten anpassen

Betrifft:
- `src/components/contact/ContactFunnelModal.tsx`
- `src/components/contact/sea/EntruempelungFunnel.tsx`
- `src/components/contact/sea/HaushaltsaufloesungFunnel.tsx`
- `src/components/contact/sea/MessieFunnel.tsx`

Aenderungen pro Datei:
- `handleOnly` auf dem Drawer setzen -- damit kann der Drawer **nur** ueber den Drag-Handle geschlossen werden, nicht durch Wischen im Content-Bereich (verhindert versehentliches Schliessen beim Tippen)
- Dem Drag-Handle-Element ein `data-vaul-handle` Attribut geben, damit Vaul es als offiziellen Handle erkennt
- `repositionInputs={false}` setzen, damit Vaul die Inputs nicht bei Keyboard-Oeffnung verschiebt (verhindert Fokus-Verlust)

## Technische Details

### drawer.tsx -- Handle entfernen

```tsx
// Vorher (Zeile 39):
<div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />

// Nachher: Entfernt (kein automatischer Handle mehr)
```

### Funnel-Drawer-Aenderung (Beispiel ContactFunnelModal.tsx)

```tsx
// Vorher:
<Drawer open={open} onOpenChange={onOpenChange}>
  <DrawerContent className="max-h-[85vh] px-4 pb-4">
    <div className="relative flex items-center justify-center pt-3 pb-2">
      <div className="w-12 h-1.5 rounded-full bg-muted" />

// Nachher:
<Drawer open={open} onOpenChange={onOpenChange} handleOnly repositionInputs={false}>
  <DrawerContent className="max-h-[85vh] px-4 pb-4">
    <div className="relative flex items-center justify-center pt-3 pb-2">
      <div data-vaul-handle="" aria-label="Drag handle" className="w-12 h-1.5 rounded-full bg-muted cursor-grab active:cursor-grabbing" />
```

### Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/ui/drawer.tsx` | Automatischen Handle entfernen |
| `src/components/contact/ContactFunnelModal.tsx` | handleOnly + repositionInputs + data-vaul-handle |
| `src/components/contact/sea/EntruempelungFunnel.tsx` | handleOnly + repositionInputs + data-vaul-handle |
| `src/components/contact/sea/HaushaltsaufloesungFunnel.tsx` | handleOnly + repositionInputs + data-vaul-handle |
| `src/components/contact/sea/MessieFunnel.tsx` | handleOnly + repositionInputs + data-vaul-handle |
