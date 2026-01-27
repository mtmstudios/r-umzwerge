
# Datenschutzerklaerung erstellen (DSGVO-konform)

## Uebersicht

Erstellung einer vollstaendigen, DSGVO-konformen Datenschutzerklaerung fuer raeumzwerge.de nach deutschem Recht. N8N Cloud wird als Auftragsverarbeiter fuer das Kontaktformular dokumentiert.

---

## Zu dokumentierende Dienste

| Dienst | Kategorie | Rechtsgrundlage |
|--------|-----------|-----------------|
| United Domains Hosting | Infrastruktur | Art. 6 Abs. 1 lit. f DSGVO |
| N8N Cloud | Auftragsverarbeitung (Kontaktformular) | Art. 6 Abs. 1 lit. b + Art. 28 DSGVO |
| Google Analytics 4 | Webanalyse | Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) |
| Google Ads Conversion Tracking | Marketing | Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) |
| WhatsApp Business | Kommunikation | Art. 6 Abs. 1 lit. b DSGVO |
| Lokale Schriftarten | Design | Keine Datenuebermittlung |

---

## Dateiaenderungen

| Datei | Aktion | Beschreibung |
|-------|--------|--------------|
| `src/pages/Datenschutz.tsx` | NEU | Vollstaendige Datenschutzerklaerung (~450 Zeilen) |
| `src/App.tsx` | AENDERN | Route `/datenschutz` + Import hinzufuegen |
| `public/sitemap.xml` | AENDERN | URL `/datenschutz` eintragen |

**Hinweis**: Der Footer-Link ist bereits vorhanden (Zeile 99-103).

---

## Seitenstruktur

Die Datenschutzerklaerung wird folgende Abschnitte enthalten:

### Inhaltsverzeichnis (mit Sprungmarken)

1. Verantwortlicher
2. Allgemeine Hinweise und Pflichtinformationen
3. Hosting
4. Kontaktformular (N8N Cloud)
5. WhatsApp-Kommunikation
6. Google Analytics 4
7. Google Ads Conversion Tracking
8. Schriftarten
9. Cookies
10. Betroffenenrechte

---

## Inhalt der Abschnitte

### 1. Verantwortlicher

```text
Raeumzwerge
Inhaber: Adem Kekec
Bibertalstrasse 1
89278 Nersingen
Deutschland

Telefon: +49 160 3080676
E-Mail: hallo@raeumzwerge.de
```

### 2. Allgemeine Hinweise

- SSL/TLS-Verschluesselung
- Hinweise zur Datenverarbeitung auf dieser Website
- Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)
- Beschwerderecht bei Aufsichtsbehoerde (BayLDA)
- Recht auf Datenuebertragbarkeit (Art. 20 DSGVO)

### 3. Hosting (United Domains)

```text
Anbieter: United Domains AG
Gautinger Str. 10, 82319 Starnberg, Deutschland

Erfasste Daten:
- IP-Adresse
- Browser-Typ und -Version
- Betriebssystem
- Referrer-URL
- Zeitpunkt des Zugriffs

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
Speicherdauer: Server-Logfiles werden nach 30 Tagen geloescht
```

### 4. Kontaktformular (N8N Cloud)

```text
Anbieter: n8n GmbH
Borsigstrasse 27, 10115 Berlin, Deutschland

Verarbeitung: Formulardaten werden ueber N8N Cloud 
              als Auftragsverarbeiter weitergeleitet
Erfasste Daten: Name, E-Mail, Nachricht, Telefonnummer (falls angegeben)
Zweck: Bearbeitung Ihrer Kontaktanfrage

Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)
Auftragsverarbeitung: Vertrag nach Art. 28 DSGVO mit n8n GmbH

Speicherdauer: Daten werden nach Abschluss der Anfrage 
               und Ablauf gesetzlicher Aufbewahrungsfristen geloescht
```

### 5. WhatsApp-Kommunikation

```text
Anbieter: WhatsApp Ireland Limited
4 Grand Canal Square, Dublin 2, Irland
(Muttergesellschaft: Meta Platforms, Inc., USA)

Erfasste Daten: Telefonnummer, Nachrichteninhalt, Zeitstempel
Datenuebermittlung: USA (EU-US Data Privacy Framework)

Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)
Hinweis: Bei Nutzung gelten die Datenschutzbestimmungen von Meta
```

### 6. Google Analytics 4

```text
Anbieter: Google Ireland Limited
Gordon House, Barrow Street, Dublin 4, Irland

Zweck: Analyse des Nutzerverhaltens zur Website-Optimierung
Erfasste Daten:
- Seitenaufrufe und Verweildauer
- Geraeteinformationen (Geraetetyp, Browser, Bildschirmaufloesung)
- Ungefaehrer Standort (Land/Stadt, keine genaue IP)
- Referrer (woher der Besucher kam)

IP-Anonymisierung: Aktiv (GA4 speichert keine vollstaendigen IP-Adressen)
Datenuebermittlung: USA (EU-US Data Privacy Framework)

Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung erforderlich)

Cookies:
- _ga: Unterscheidung von Nutzern (Laufzeit: 2 Jahre)
- _ga_*: Sitzungszustand (Laufzeit: 2 Jahre)

Opt-Out: Browser-Add-on unter tools.google.com/dlpage/gaoptout
Weitere Infos: policies.google.com/privacy
```

### 7. Google Ads Conversion Tracking

```text
Anbieter: Google Ireland Limited
Gordon House, Barrow Street, Dublin 4, Irland

Zweck: Messung der Werbewirksamkeit, Conversion-Erfassung
Erfasste Daten: Aktionen nach Klick auf Google-Werbeanzeige
                (z.B. Formular-Absendung, Anruf-Klick)

Datenuebermittlung: USA (EU-US Data Privacy Framework)
Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung erforderlich)

Cookies:
- _gcl_au: Conversion-Linker (Laufzeit: 90 Tage)

Opt-Out: Personalisierte Werbung unter adssettings.google.com
Weitere Infos: policies.google.com/privacy
```

### 8. Schriftarten (Lokal gehostet)

```text
Schriftart: Inter (Open Font License)
Hosting: Lokal auf unserem Server

Datenuebermittlung: Keine
Hinweis: Es werden KEINE externen Schriftarten-Dienste 
         wie Google Fonts verwendet. Die Schriften sind 
         vollstaendig auf unserem Server gespeichert.
```

### 9. Cookies

| Cookie | Anbieter | Zweck | Laufzeit | Einwilligung |
|--------|----------|-------|----------|--------------|
| _ga | Google | Analytics - Nutzerunterscheidung | 2 Jahre | Ja |
| _ga_* | Google | Analytics - Sitzungsstatus | 2 Jahre | Ja |
| _gcl_au | Google | Ads - Conversion-Tracking | 90 Tage | Ja |

### 10. Betroffenenrechte (DSGVO Art. 15-21)

- **Auskunftsrecht (Art. 15)**: Sie haben das Recht, eine Bestaetigung darueber zu verlangen, ob personenbezogene Daten verarbeitet werden.

- **Recht auf Berichtigung (Art. 16)**: Sie haben das Recht, die Berichtigung unrichtiger Daten zu verlangen.

- **Recht auf Loeschung (Art. 17)**: Sie haben das Recht, die Loeschung Ihrer Daten zu verlangen ("Recht auf Vergessenwerden").

- **Recht auf Einschraenkung (Art. 18)**: Sie haben das Recht, die Einschraenkung der Verarbeitung zu verlangen.

- **Recht auf Datenuebertragbarkeit (Art. 20)**: Sie haben das Recht, Ihre Daten in einem maschinenlesbaren Format zu erhalten.

- **Widerspruchsrecht (Art. 21)**: Sie haben das Recht, aus Gruenden, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Widerspruch einzulegen.

### Aufsichtsbehoerde

```text
Bayerisches Landesamt fuer Datenschutzaufsicht (BayLDA)
Promenade 18
91522 Ansbach
Deutschland

E-Mail: poststelle@lda.bayern.de
Web: www.lda.bayern.de
```

---

## Design der Seite

- Gleiches Layout wie Impressum-Seite
- Header + Footer + FloatingCTAs
- Card-Komponenten fuer Verantwortlichen und Kontakt
- Inhaltsverzeichnis mit klickbaren Sprungmarken (Anchor-Links)
- Tabellen fuer Cookie-Uebersicht
- Stand-Datum: Januar 2026
- Responsive fuer Mobile und Desktop

---

## Technische Details

### src/pages/Datenschutz.tsx

```text
Aufbau:
1. Imports (Header, Footer, FloatingCTAs, Card, Icons)
2. Inhaltsverzeichnis mit Sprungmarken
3. Abschnitte mit IDs fuer Anchor-Navigation
4. Konsistentes Styling mit Impressum-Seite
```

### src/App.tsx

```text
Aenderungen:
- Import: import Datenschutz from "./pages/Datenschutz";
- Route: <Route path="/datenschutz" element={<Datenschutz />} />
```

### public/sitemap.xml

```text
Neue URL:
<url>
  <loc>https://raeumzwerge.de/datenschutz</loc>
  <changefreq>yearly</changefreq>
  <priority>0.3</priority>
</url>
```

---

## Zusammenfassung

| Datei | Aktion | Zeilen |
|-------|--------|--------|
| `src/pages/Datenschutz.tsx` | NEU | ~450 |
| `src/App.tsx` | +2 Zeilen | Import + Route |
| `public/sitemap.xml` | +6 Zeilen | URL-Eintrag |

**Gesamt: 3 Dateien (1 neu, 2 Aenderungen)**

---

## Naechster Schritt nach Implementierung

Optional: **Cookie-Consent-Banner** implementieren, der vor dem Laden von Google Analytics 4 und Google Ads Conversion Tracking die Einwilligung des Nutzers einholt (TTDSG § 25).
