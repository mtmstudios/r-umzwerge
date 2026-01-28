

## EntruempelungForm auf der Kontaktseite einbinden

Das neue N8N-verbundene Formular ersetzt den aktuellen Multi-Step ContactFunnel auf der Kontaktseite.

---

## Notwendige Anpassungen

### 1. Contact.tsx anpassen

Die Kontaktseite wird aktualisiert, um das neue `EntruempelungForm` zu verwenden:

**Vorher:**
```tsx
import { ContactFunnel, ContactFunnelRef } from "@/components/contact/ContactFunnel";
// ...
<ContactFunnel ref={funnelRef} />
```

**Nachher:**
```tsx
import EntruempelungForm from "@/components/contact/EntruempelungForm";
// ...
<section id="funnel" className="py-16 md:py-24 bg-muted/30">
  <div className="container mx-auto px-4 md:px-6">
    <EntruempelungForm />
  </div>
</section>
```

### 2. Scroll-Funktion beibehalten

Da das `EntruempelungForm` keine `ref`-Unterstützung hat, wird die Scroll-Logik vereinfacht:

```tsx
const handleFormClick = () => {
  document.getElementById('funnel')?.scrollIntoView({ behavior: 'smooth' });
};
```

### 3. Sicherheitsverbesserung (optional aber empfohlen)

Das `console.log` im `EntruempelungForm.jsx` sollte entfernt werden, da es sensible Formulardaten loggt:

```jsx
// Diese Zeilen entfernen:
console.log('Sending data:', payload);
console.log('Response:', data);
```

---

## Zusammenfassung der Dateiänderungen

| Datei | Änderung |
|-------|----------|
| `src/pages/Contact.tsx` | Import und Verwendung von EntruempelungForm statt ContactFunnel |
| `src/components/contact/EntruempelungForm.jsx` | Console.log-Statements entfernen (Sicherheit) |

---

## Erwartetes Ergebnis

- Das Kontaktformular auf `/kontakt` verwendet das neue N8N-verbundene Formular
- Anfragen werden direkt an den N8N-Webhook gesendet
- Die "Zum Formular"-Funktion scrollt weiterhin zum Formular
- Keine sensiblen Daten werden in der Browser-Konsole geloggt

