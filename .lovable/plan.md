

# Webhook-Fehlerbehandlung korrigieren

## Problem

Der aktuelle Code in allen 5 Funnel-Dateien erwartet eine spezifische JSON-Antwort:

```typescript
const data = await response.json();
if (response.ok && data.success) { ... }
```

n8n Webhooks antworten aber oft nur mit HTTP 200 ohne spezifischen Body.

## Lösung

Alle 5 Dateien werden so geändert, dass nur `response.ok` geprüft wird:

```typescript
const response = await fetch(WEBHOOK_URL, { ... });

if (response.ok) {
  // HTTP 200-299 = Erfolg
  setIsSubmitting(false);
  setIsSubmitted(true);
  toast({ title: "Anfrage gesendet! ✓", ... });
} else {
  throw new Error(`HTTP ${response.status}`);
}
```

## Änderungen pro Datei

| Datei | Zeilen | Änderung |
|-------|--------|----------|
| `HaushaltsaufloesungFunnel.tsx` | ~188-210 | `response.json()` entfernen |
| `EntruempelungFunnel.tsx` | ~180-202 | `response.json()` entfernen |
| `MessieFunnel.tsx` | ~186-208 | `response.json()` entfernen |
| `ContactFunnelModal.tsx` | ~153-175 | `response.json()` entfernen |
| `ContactFunnel.tsx` | ~122-144 | `response.json()` entfernen |

## Neuer Code (für alle 5 Dateien gleich)

```typescript
const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/...', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload)
});

if (response.ok) {
  setIsSubmitting(false);
  setIsSubmitted(true);
  
  toast({
    title: "Anfrage gesendet! ✓",
    description: "Wir melden uns innerhalb von 24 Stunden.",
  });
} else {
  throw new Error(`HTTP Fehler: ${response.status}`);
}
```

