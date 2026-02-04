
# CTA-Button als Modal-Funnel in allen Hero-Sections

## Übersicht

Der "Foto senden · Preiseinschätzung erhalten" Button in den Hero-Sections soll nicht mehr zu WhatsApp führen, sondern stattdessen den 5-Schritt-Kontaktformular-Funnel in einem Modal-Fenster öffnen.

### Betroffene Seiten
- **Startseite** (`HeroSection.tsx`)
- **Service-Seiten** (`ServiceHero.tsx`) 
- **Regionale Seiten** (`CityHero.tsx`)

## Lösung

### Ansatz: Responsive Modal-Komponente

Da der Funnel komplex ist (5 Schritte mit Progress-Bar), wird ein responsiver Ansatz gewählt:
- **Desktop**: Dialog-Modal (zentriert)
- **Mobile**: Drawer von unten (touch-freundlicher)

Hierfür wird eine neue **ContactFunnelModal**-Komponente erstellt, die den bestehenden Funnel-Code adaptiert und in Dialog/Drawer einbettet.

## Änderungen

### 1. Neue Komponente: `ContactFunnelModal.tsx`

Eine eigenständige Modal-Komponente, die:
- Den kompletten 5-Schritt-Funnel enthält (kopiert aus `ContactFunnel.tsx`)
- Auf Desktop als Dialog, auf Mobile als Drawer erscheint
- Über `open` und `onOpenChange` Props gesteuert wird
- Nach erfolgreichem Absenden automatisch schließt

```text
ContactFunnelModal
├── Props: { open, onOpenChange }
├── Desktop (lg+): Dialog mit max-w-3xl
├── Mobile (<lg): Drawer mit max-height 90vh
├── Enthält alle 5 Funnel-Steps
└── Success-State schließt Modal nach 2s
```

### 2. Anpassungen der Hero-Komponenten

Jede Hero-Komponente erhält:
- `useState` für Modal-Steuerung (`isModalOpen`)
- Import der neuen `ContactFunnelModal`
- Button-Änderung: Statt `<a href={getWhatsAppLink()}>` wird `onClick={() => setIsModalOpen(true)}`
- CTA-Text bleibt gleich oder wird angepasst auf "Jetzt Anfrage starten"

### 3. Button-Text-Anpassung

| Vorher | Nachher |
|--------|---------|
| "Foto senden · Preiseinschätzung erhalten" | "Jetzt Anfrage starten" (oder bestehend) |
| "Foto senden · Preis erhalten" (mobil) | "Anfrage starten" (oder bestehend) |

Optional: Der Text kann bleiben, da er weiterhin zur Preiseinschätzung führt – nur der Weg ändert sich.

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/components/contact/ContactFunnelModal.tsx` | **NEU** – Modal-Version des Kontakt-Funnels |
| `src/components/sections/HeroSection.tsx` | Modal-State hinzufügen, Button-Handler ändern |
| `src/components/services/ServiceHero.tsx` | Modal-State hinzufügen, Button-Handler ändern |
| `src/components/city/CityHero.tsx` | Modal-State hinzufügen, Button-Handler ändern |

## Technische Details

### ContactFunnelModal-Struktur

Die Komponente nutzt den `useIsMobile` Hook für responsive Darstellung:

```typescript
// Pseudocode
function ContactFunnelModal({ open, onOpenChange }) {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  
  // Funnel-Logik (identisch zu ContactFunnel)
  
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          {/* Funnel-Inhalt mit Scroll */}
        </DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Funnel-Inhalt */}
      </DialogContent>
    </Dialog>
  );
}
```

### Hero-Button-Änderung

```typescript
// Vorher
<Button asChild>
  <a href={getWhatsAppLink()}>...</a>
</Button>

// Nachher
<Button onClick={() => setIsModalOpen(true)}>
  ...
</Button>

<ContactFunnelModal open={isModalOpen} onOpenChange={setIsModalOpen} />
```

### Success-Handling

Nach erfolgreichem Absenden:
1. Toast-Nachricht erscheint
2. Modal schließt nach 2 Sekunden automatisch
3. Formular wird zurückgesetzt für nächste Nutzung

## Visuelles Design im Modal

Das Modal behält das bestehende Funnel-Design:
- Gradient Progress-Bar
- 5 Step-Indikatoren
- Animierte Step-Übergänge
- Card-Container mit Border und Shadow
- Zurück/Weiter Buttons

Zusätzliche Anpassungen für Modal-Kontext:
- Kompakteres Padding auf Mobile
- Scroll-Container für lange Steps
- X-Button zum Schließen immer sichtbar
