

# Tracking-Codes einbinden: etracker + Google Ads Remarketing

## Uebersicht

Zwei Tracking-Codes muessen DSGVO-konform in die Website integriert werden:

1. **etracker** (Conversion Tracking) - Secure-Code: `Knsu83`
2. **Google Ads Remarketing** - ID: `AW-17942249403`

Zusaetzlich muss die Datenschutzerklaerung um den etracker-Abschnitt ergaenzt werden.

## Aenderungen

### 1. etracker einbinden (`consentUtils.ts`)

etracker wird mit `data-block-cookies="true"` geladen -- das bedeutet, etracker blockiert selbst Cookies ohne Einwilligung und arbeitet unter "berechtigtem Interesse" (Art. 6 Abs. 1 lit. f DSGVO). Das Script kann daher **immer** geladen werden (wie vom Anbieter vorgesehen).

- Neue Funktion `loadEtracker()` hinzufuegen
- In `applyConsent()` wird etracker immer geladen (da `data-block-cookies="true"`)
- Bei Statistik-Einwilligung wird etracker auf `data-block-cookies="false"` umgestellt (volle Funktionalitaet)

### 2. Google Ads Remarketing aktivieren (`consentUtils.ts`)

Der bestehende Platzhalter wird mit der echten ID `AW-17942249403` ersetzt:
- `loadGoogleAds('AW-17942249403')` wird bei Marketing-Einwilligung aufgerufen
- Die auskommentierte Zeile wird aktiviert

### 3. Cookie-Banner aktualisieren (`CookieConsentBanner.tsx`)

- Statistik-Beschreibung um "etracker" ergaenzen:
  "etracker & Google Analytics -- Hilft uns zu verstehen, wie Besucher unsere Website nutzen."

### 4. Datenschutzerklaerung erweitern (`Datenschutz.tsx`)

- Neuen Abschnitt "etracker" zwischen "WhatsApp" und "Google Analytics" einfuegen (wird neue Nr. 6)
- Den bereitgestellten Datenschutz-Text von etracker einfuegen
- Nummerierung der folgenden Abschnitte anpassen (Google Analytics wird 7, Google Ads wird 8, usw.)
- etracker-Cookies zur Cookie-Tabelle hinzufuegen
- Inhaltsverzeichnis aktualisieren

## Technische Details

### etracker-Ladelogik

```typescript
// etracker immer laden (data-block-cookies="true" = TTDSG-konform)
export const loadEtracker = (blockCookies: boolean = true): void => {
  const existing = document.getElementById('_etLoader');
  if (existing) {
    // Update block-cookies attribute
    existing.setAttribute('data-block-cookies', String(blockCookies));
    return;
  }

  const script = document.createElement('script');
  script.id = '_etLoader';
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.setAttribute('data-block-cookies', String(blockCookies));
  script.setAttribute('data-secure-code', 'Knsu83');
  script.src = '//code.etracker.com/code/e.js';
  script.async = true;
  document.head.appendChild(script);
};
```

### applyConsent-Aenderung

```typescript
export const applyConsent = (consent: ConsentState): void => {
  // etracker - immer laden, bei Statistik-Einwilligung volle Cookies
  loadEtracker(!consent.statistics);

  // Google Ads Remarketing - nur bei Marketing-Einwilligung
  if (consent.marketing) {
    loadGoogleAds('AW-17942249403');
  }
};
```

### Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/consent/consentUtils.ts` | etracker-Funktion + Google Ads ID aktivieren |
| `src/components/consent/CookieConsentBanner.tsx` | Statistik-Beschreibung aktualisieren |
| `src/pages/Datenschutz.tsx` | etracker-Abschnitt + Cookie-Tabelle + Nummerierung |

