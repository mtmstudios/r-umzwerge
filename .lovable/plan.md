

# Cookie-Consent-Banner und Barrierefreiheit

## Uebersicht

Implementierung eines TTDSG-konformen Cookie-Consent-Banners sowie einer Barrierefreiheitserklaerung nach deutschem Recht (BFSG/BITV 2.0) mit integriertem Barrierefreiheits-Widget zur Anpassung von Schriftgroesse, Kontrast und weiteren Einstellungen.

---

## Teil 1: Cookie-Consent-Banner (TTDSG § 25)

### Rechtliche Anforderungen

| Anforderung | Umsetzung |
|-------------|-----------|
| Opt-in vor Tracking | Google Analytics und Ads werden erst nach Einwilligung geladen |
| Granulare Auswahl | Getrennte Kategorien: Notwendig, Statistik, Marketing |
| Widerrufbarkeit | Jederzeit ueber Footer-Link oder erneutes Oeffnen des Banners |
| Dokumentation | Consent-Status wird in localStorage gespeichert |
| Gleichwertige Buttons | "Alle akzeptieren" und "Nur Notwendige" gleich prominent |

### Cookie-Kategorien

| Kategorie | Cookies | Erforderlich |
|-----------|---------|--------------|
| Notwendig | consent_status, accessibility_settings | Immer aktiv |
| Statistik | Google Analytics (_ga, _ga_*) | Einwilligung |
| Marketing | Google Ads (_gcl_au) | Einwilligung |

### Komponenten-Architektur

```text
src/components/consent/
  CookieConsentBanner.tsx    # Haupt-Banner mit Kategorien
  CookieConsentContext.tsx   # React Context fuer globalen Consent-Status
  consentUtils.ts            # Hilfsfunktionen (localStorage, gtag-Integration)
```

### Funktionsweise

1. **Beim ersten Besuch**: Banner wird angezeigt
2. **Nutzer waehlt**: "Alle akzeptieren", "Nur Notwendige" oder individuelle Auswahl
3. **Nach Einwilligung**: 
   - Consent wird in localStorage gespeichert
   - Bei Statistik/Marketing: Google-Scripts werden dynamisch geladen
4. **Widerruf**: Ueber Footer-Link oder Barrierefreiheits-Widget

### Banner-Design

```text
+--------------------------------------------------+
|  Cookie-Einstellungen                            |
|                                                  |
|  Wir nutzen Cookies, um unsere Website zu        |
|  verbessern und Ihnen relevante Inhalte          |
|  anzuzeigen.                                     |
|                                                  |
|  [v] Notwendig (immer aktiv)                     |
|  [ ] Statistik (Google Analytics)                |
|  [ ] Marketing (Google Ads)                      |
|                                                  |
|  [Nur Notwendige]  [Auswahl speichern]  [Alle]   |
|                                                  |
|  Mehr in unserer Datenschutzerklaerung           |
+--------------------------------------------------+
```

---

## Teil 2: Barrierefreiheitserklaerung (BFSG/BITV 2.0)

### Rechtliche Anforderungen nach BFSG

Das Barrierefreiheitsstaerkungsgesetz (BFSG) tritt am 28.06.2025 in Kraft. Fuer B2C-Webshops und Dienstleistungswebsites gelten folgende Anforderungen:

| Anforderung | Standard |
|-------------|----------|
| Technische Basis | WCAG 2.1 Level AA |
| Barrierefreiheitserklaerung | Pflicht (nach EU-Richtlinie) |
| Feedback-Mechanismus | Kontaktmoeglichkeit fuer Barrieren melden |
| Durchsetzungsstelle | Angabe der zustaendigen Behoerde |

### Inhalt der Erklaerung

1. **Stand der Barrierefreiheit**: Selbstbewertung (teilweise/vollstaendig konform)
2. **Bekannte Einschraenkungen**: Dokumentierte Barrieren
3. **Feedback-Moeglichkeit**: E-Mail/Telefon fuer Meldungen
4. **Durchsetzungsverfahren**: Link zur Schlichtungsstelle
5. **Technische Informationen**: Unterstuetzte Browser, assistive Technologien

### Neue Seite: /barrierefreiheit

Struktur analog zu Impressum/Datenschutz mit folgenden Abschnitten:

```text
1. Geltungsbereich
2. Stand der Barrierefreiheit
3. Bekannte Einschraenkungen
4. Erstellung dieser Erklaerung
5. Feedback und Kontakt
6. Durchsetzungsverfahren
7. Technische Anforderungen
```

---

## Teil 3: Barrierefreiheits-Widget

### Funktionen

| Einstellung | Optionen | Speicherung |
|-------------|----------|-------------|
| Schriftgroesse | Normal / Gross / Sehr gross | localStorage |
| Kontrast | Normal / Hoch | localStorage |
| Animationen | An / Reduziert | localStorage |
| Cookie-Einstellungen | Button zum erneuten Oeffnen | - |

### Widget-Design

```text
+----------------------------------+
|  Barrierefreiheit         [X]   |
|                                  |
|  Schriftgroesse                  |
|  [Normal] [Gross] [Sehr gross]   |
|                                  |
|  Kontrast                        |
|  [Normal] [Hoch]                 |
|                                  |
|  Animationen                     |
|  [An] [Reduziert]                |
|                                  |
|  [Cookie-Einstellungen aendern]  |
+----------------------------------+
```

### Technische Umsetzung

- **Trigger-Button**: Im Footer, evtl. auch als kleine Schaltflaeche (Accessibility-Icon) am Seitenrand
- **CSS-Variablen**: Schriftgroesse und Kontrast werden ueber CSS Custom Properties gesteuert
- **prefers-reduced-motion**: Respektiert Systemeinstellungen

### CSS-Implementierung fuer Schriftgroesse

```css
:root {
  --font-scale: 1;
}

:root.font-large {
  --font-scale: 1.15;
}

:root.font-xlarge {
  --font-scale: 1.3;
}

body {
  font-size: calc(1rem * var(--font-scale));
}
```

---

## Dateiaenderungen

### Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/components/consent/CookieConsentBanner.tsx` | Cookie-Banner mit Kategorien-Auswahl |
| `src/components/consent/CookieConsentContext.tsx` | React Context fuer Consent-Status |
| `src/components/consent/consentUtils.ts` | localStorage-Funktionen, gtag-Integration |
| `src/components/accessibility/AccessibilityWidget.tsx` | Barrierefreiheits-Widget |
| `src/components/accessibility/AccessibilityContext.tsx` | React Context fuer Einstellungen |
| `src/pages/Barrierefreiheit.tsx` | Barrierefreiheitserklaerung (~250 Zeilen) |

### Zu aendernde Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/App.tsx` | Context-Provider einbinden, Route hinzufuegen |
| `src/index.css` | CSS-Variablen fuer Schriftgroesse/Kontrast |
| `src/components/layout/Footer.tsx` | Links fuer Cookie-Einstellungen und Barrierefreiheit |
| `public/sitemap.xml` | URL `/barrierefreiheit` hinzufuegen |
| `src/pages/Datenschutz.tsx` | Abschnitt "11. Cookie-Einstellungen aendern" hinzufuegen |

---

## Technische Details

### CookieConsentContext

```typescript
interface ConsentState {
  necessary: boolean;    // immer true
  statistics: boolean;   // Google Analytics
  marketing: boolean;    // Google Ads
  timestamp: string;     // Zeitpunkt der Einwilligung
}

// Funktionen
- getConsent(): ConsentState
- setConsent(consent: ConsentState): void
- resetConsent(): void  // Loescht und zeigt Banner erneut
```

### Google Analytics/Ads Integration

```typescript
// Wird nur geladen wenn consent.statistics === true
const loadGoogleAnalytics = (measurementId: string) => {
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', measurementId, { anonymize_ip: true });
};
```

### AccessibilityContext

```typescript
interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedMotion: boolean;
}

// Wird beim Start aus localStorage geladen
// Aenderungen werden sofort auf document.documentElement angewendet
```

---

## Footer-Ergaenzungen

Neuer Abschnitt im Footer "Rechtliches":

```text
- Impressum
- Datenschutz
- Barrierefreiheit (NEU)
- Cookie-Einstellungen (NEU - oeffnet Banner)
```

---

## Zusammenfassung

| Datei | Aktion | Zeilen (ca.) |
|-------|--------|--------------|
| `src/components/consent/CookieConsentBanner.tsx` | NEU | ~180 |
| `src/components/consent/CookieConsentContext.tsx` | NEU | ~80 |
| `src/components/consent/consentUtils.ts` | NEU | ~60 |
| `src/components/accessibility/AccessibilityWidget.tsx` | NEU | ~150 |
| `src/components/accessibility/AccessibilityContext.tsx` | NEU | ~70 |
| `src/pages/Barrierefreiheit.tsx` | NEU | ~280 |
| `src/App.tsx` | AENDERN | +15 |
| `src/index.css` | AENDERN | +40 |
| `src/components/layout/Footer.tsx` | AENDERN | +20 |
| `public/sitemap.xml` | AENDERN | +6 |
| `src/pages/Datenschutz.tsx` | AENDERN | +30 |

**Gesamt: 11 Dateien (6 neue, 5 Aenderungen)**

---

## Reihenfolge der Implementierung

1. **Consent-System**: Context, Utils, Banner
2. **App.tsx**: Provider einbinden
3. **Accessibility-System**: Context, Widget
4. **CSS-Variablen**: index.css erweitern
5. **Barrierefreiheitserklaerung**: Neue Seite erstellen
6. **Footer**: Links ergaenzen
7. **Datenschutz**: Cookie-Abschnitt aktualisieren
8. **Sitemap**: URL hinzufuegen

