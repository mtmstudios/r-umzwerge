

## N8N-Integration für ContactFunnel

Die simulierte API-Funktion wird durch einen echten API-Call an den N8N-Webhook ersetzt.

---

## Änderung

Die `handleSubmit`-Funktion (Zeilen 99-114) wird ersetzt, um Formulardaten an den N8N-Webhook zu senden.

**Aktuell (Simulation):**
```tsx
const handleSubmit = async () => {
  if (!validateStep()) return;
  setIsSubmitting(true);
  
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  setIsSubmitting(false);
  setIsSubmitted(true);
  
  toast({
    title: "Anfrage gesendet! ✓",
    description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
  });
};
```

**Neu (Echte N8N-Integration):**
```tsx
const handleSubmit = async () => {
  if (!validateStep()) return;

  setIsSubmitting(true);
  
  try {
    const payload = {
      objektart: formData.serviceType,
      umfang: formData.scope,
      plz: formData.postalCode,
      ort: formData.location,
      zeitrahmen: formData.timeline,
      name: formData.name,
      telefon: formData.phone,
      email: formData.email || '',
      nachricht: formData.message || '',
      timestamp: new Date().toISOString()
    };
    
    const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/entruempelung', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Anfrage gesendet! ✓",
        description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });
    } else {
      throw new Error(data.error || 'Fehler beim Senden');
    }
  } catch (error) {
    console.error('Submit error:', error);
    setIsSubmitting(false);
    toast({
      title: "Fehler beim Senden",
      description: "Bitte versuchen Sie es erneut oder rufen Sie uns an.",
      variant: "destructive"
    });
  }
};
```

---

## Was ändert sich

| Aspekt | Vorher | Nachher |
|--------|--------|---------|
| API-Call | Simuliert (setTimeout) | Echter POST an N8N |
| Payload | Keiner | Alle Formulardaten mit deutschem Mapping |
| Fehlerbehandlung | Keine | Try-Catch mit Toast-Fehlermeldung |
| Timestamp | Keiner | Wird mitgesendet |

---

## Feld-Mapping

| Formular-Feld | N8N-Payload |
|---------------|-------------|
| serviceType | objektart |
| scope | umfang |
| postalCode | plz |
| location | ort |
| timeline | zeitrahmen |
| name | name |
| phone | telefon |
| email | email |
| message | nachricht |

---

## Dateiänderung

| Datei | Änderung |
|-------|----------|
| `src/components/contact/ContactFunnel.tsx` | handleSubmit-Funktion (Zeilen 99-114) ersetzen |

