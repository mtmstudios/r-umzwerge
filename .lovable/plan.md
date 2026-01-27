
# Impressum-Seite erstellen (DSGVO & TMG konform)

## Rechtliche Grundlagen

Das Impressum muss folgenden deutschen Gesetzen entsprechen:

- **TMG § 5** (Telemediengesetz) - Allgemeine Informationspflichten
- **DDG § 5** (Digitale-Dienste-Gesetz, ersetzt teilweise TMG seit 2024)
- **DSGVO Art. 13/14** - Informationspflichten bei Datenerhebung
- **RStV § 55 Abs. 2** - Verantwortlicher fuer journalistisch-redaktionelle Inhalte

---

## Pflichtangaben fuer Einzelunternehmen

| Angabe | Wert | Rechtsgrundlage |
|--------|------|-----------------|
| Unternehmensname | Raeumzwerge | TMG § 5 Abs. 1 Nr. 1 |
| Inhaber (vollstaendiger Name) | Adem Kekec | TMG § 5 Abs. 1 Nr. 1 |
| Anschrift (keine Postfach) | Bibertalstrasse 1, 89278 Nersingen | TMG § 5 Abs. 1 Nr. 1 |
| E-Mail-Adresse | hallo@raeumzwerge.de | TMG § 5 Abs. 1 Nr. 2 |
| Telefonnummer | +49 160 3080676 | TMG § 5 Abs. 1 Nr. 2 |
| USt-IdNr. | Entfaellt (keine vorhanden) | TMG § 5 Abs. 1 Nr. 6 |
| Handelsregister | Nicht eingetragen (Kleingewerbe) | TMG § 5 Abs. 1 Nr. 4 |
| Verantwortlich (Inhalt) | Adem Kekec, gleiche Anschrift | RStV § 55 Abs. 2 |

---

## Inhalt der Impressum-Seite

### 1. Angaben gemaess § 5 TMG / § 5 DDG

```text
Raeumzwerge
Inhaber: Adem Kekec

Bibertalstrasse 1
89278 Nersingen
Deutschland
```

### 2. Kontakt

```text
Telefon: +49 160 3080676
E-Mail: hallo@raeumzwerge.de
```

### 3. Umsatzsteuer-Identifikationsnummer

```text
Eine Umsatzsteuer-Identifikationsnummer gemaess § 27a 
Umsatzsteuergesetz liegt nicht vor.
```

### 4. Verantwortlich fuer den Inhalt nach § 55 Abs. 2 RStV

```text
Adem Kekec
Bibertalstrasse 1
89278 Nersingen
```

### 5. EU-Streitschlichtung (Pflicht seit 2016)

```text
Die Europaeische Kommission stellt eine Plattform zur 
Online-Streitbeilegung (OS) bereit: 
https://ec.europa.eu/consumers/odr/

Unsere E-Mail-Adresse finden Sie oben im Impressum.

Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren 
vor einer Verbraucherschlichtungsstelle teilzunehmen.
```

### 6. Haftung fuer Inhalte (Disclaimer)

- Haftungsausschluss fuer eigene Inhalte nach § 7 Abs. 1 TMG
- Haftungsausschluss fuer Links nach § 7 Abs. 2 TMG
- Urheberrechtshinweis

---

## Technische Umsetzung

### Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/pages/Impressum.tsx` | Komplette Impressum-Seite mit allen Pflichtangaben |

### Zu aendernde Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/App.tsx` | Route `/impressum` hinzufuegen |
| `src/components/layout/Footer.tsx` | Link zum Impressum hinzufuegen |
| `public/sitemap.xml` | URL `/impressum` eintragen |

---

## Seitenstruktur

```text
+------------------------------------------+
|              Header                       |
+------------------------------------------+
|                                          |
|  Impressum                               |
|  =========                               |
|                                          |
|  [Card: Angaben gemaess § 5 TMG]         |
|    - Firmenname                          |
|    - Inhaber                             |
|    - Anschrift                           |
|                                          |
|  [Card: Kontakt]                         |
|    - Telefon                             |
|    - E-Mail                              |
|                                          |
|  [Abschnitt: Umsatzsteuer-ID]            |
|                                          |
|  [Abschnitt: Verantwortlich nach RStV]   |
|                                          |
|  [Abschnitt: EU-Streitschlichtung]       |
|                                          |
|  [Abschnitt: Haftungsausschluss]         |
|    - Haftung fuer Inhalte                |
|    - Haftung fuer Links                  |
|    - Urheberrecht                        |
|                                          |
+------------------------------------------+
|              Footer                       |
|  (mit Link zu Impressum & Datenschutz)   |
+------------------------------------------+
```

---

## Design

- Verwendet bestehendes Layout (Header, Footer, FloatingCTAs)
- Saubere Typografie mit klaren Abschnitten
- Responsive fuer Mobile und Desktop
- Card-Design fuer wichtige Kontaktdaten
- Konsistent mit dem restlichen Website-Design

---

## Zusammenfassung der Dateiaenderungen

| Datei | Aktion | Zeilen (ca.) |
|-------|--------|--------------|
| `src/pages/Impressum.tsx` | NEU | ~150 |
| `src/App.tsx` | Route hinzufuegen | +2 |
| `src/components/layout/Footer.tsx` | Link hinzufuegen | +5 |
| `public/sitemap.xml` | URL hinzufuegen | +5 |

**Gesamt: 4 Dateien, davon 1 neu**

---

## Naechster Schritt

Nach dem Impressum folgt die **Datenschutzerklaerung** mit:
- Google Analytics / Google Ads Tracking
- Cookie-Hinweise
- Kontaktformular-Datenverarbeitung
- WhatsApp-Nutzung
- Hosting-Informationen
- Betroffenenrechte (DSGVO Art. 15-21)
