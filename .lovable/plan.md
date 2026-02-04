
# Webhook-URL Update für beide Formulare

## Übersicht

Beide Formulare verwenden noch den alten Webhook-Endpunkt. Ich werde diese auf den neuen Webhook aktualisieren.

## Änderungen

| Datei | Zeile | Alt | Neu |
|-------|-------|-----|-----|
| `EntruempelungForm.jsx` | 105 | `webhook/entruempelung` | `webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915` |
| `ContactFunnelModal.tsx` | 147 | `webhook/entruempelung` | `webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915` |

## Technische Details

Beide Dateien enthalten einen `fetch`-Aufruf an die alte URL:

```javascript
// Vorher:
const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/entruempelung', {

// Nachher:
const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915', {
```

Das Payload-Format bleibt unverändert - beide senden die gleichen Felder:
- `objektart`, `umfang`, `plz`, `ort`, `zeitrahmen`
- `name`, `telefon`, `email`, `nachricht`
- `timestamp`

## Nach der Änderung

Alle drei Kontaktformulare (`ContactFunnel.tsx`, `ContactFunnelModal.tsx`, `EntruempelungForm.jsx`) werden dann einheitlich den neuen Webhook nutzen.
