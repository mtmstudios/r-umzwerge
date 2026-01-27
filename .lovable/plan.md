

# SEO-Optimierung - Title Tags und Meta Descriptions

## Uebersicht

Nach der Analyse wurden kritische SEO-Probleme identifiziert: Service-Seiten und statische Seiten (Kontakt, Impressum, Datenschutz, Barrierefreiheit) haben keine dynamischen Title Tags und Meta Descriptions. Das fuehrt dazu, dass Google den Standard-Title der Startseite fuer alle Unterseiten anzeigt.

---

## Identifizierte Probleme

| Seite | Title Tag | Meta Description |
|-------|-----------|------------------|
| `/leistungen/wohnungsentruempelung` | Fehlt (Standard-Title) | Fehlt |
| `/leistungen/haushaltsaufloesung` | Fehlt | Fehlt |
| `/leistungen/keller-dachboden-garage` | Fehlt | Fehlt |
| `/leistungen/gewerbe-buero-lager` | Fehlt | Fehlt |
| `/leistungen/messie-wohnungen` | Fehlt | Fehlt |
| `/kontakt` | Fehlt | Fehlt |
| `/impressum` | Fehlt | Fehlt |
| `/datenschutz` | Fehlt | Fehlt |
| `/barrierefreiheit` | Fehlt | Fehlt |

---

## Loesung

### 1. Service-Seiten (ServicePage.tsx)

useEffect-Hook hinzufuegen, der `document.title` und die Meta Description dynamisch setzt:

```text
useEffect:
- document.title = pageData.metaTitle
- Meta Description aus pageData.metaDescription
- Cleanup: Standard-Title wiederherstellen
```

### 2. Kontakt-Seite (Contact.tsx)

Neue SEO-Daten:
- **Title**: "Kontakt – Räumzwerge | Jetzt unverbindlich anfragen"
- **Meta Description**: "Kontaktieren Sie die Räumzwerge: Anruf, WhatsApp oder Kontaktformular. Preiseinschätzung innerhalb von 24 Stunden. Besenrein und transparent."

### 3. Impressum (Impressum.tsx)

Neue SEO-Daten:
- **Title**: "Impressum | Räumzwerge – Entrümpelung in Süddeutschland"
- **Meta Description**: "Impressum der Räumzwerge. Angaben gemäß § 5 TMG. Entrümpelung und Haushaltsauflösung in Bayern und Baden-Württemberg."

### 4. Datenschutz (Datenschutz.tsx)

Neue SEO-Daten:
- **Title**: "Datenschutzerklärung | Räumzwerge"
- **Meta Description**: "Datenschutzerklärung der Räumzwerge. Informationen zur Datenverarbeitung, Cookies, Google Analytics und Ihren Rechten nach DSGVO."

### 5. Barrierefreiheit (Barrierefreiheit.tsx)

Neue SEO-Daten:
- **Title**: "Erklärung zur Barrierefreiheit | Räumzwerge"
- **Meta Description**: "Barrierefreiheitserklärung der Räumzwerge gemäß BFSG und BITV 2.0. Informationen zu Zugänglichkeit und Kontaktmöglichkeiten."

### 6. 404-Seite (NotFound.tsx)

- **Title**: "Seite nicht gefunden | Räumzwerge"
- Deutsche Texte statt Englisch

---

## Performance-Hinweise

Die Website laeuft gut mit folgenden Optimierungspotenzialen:

| Bereich | Status | Empfehlung |
|---------|--------|------------|
| Bildformate | Teilweise JPG | WebP-Versionen nutzen wo vorhanden |
| Lazy Loading | Nicht implementiert | Fuer Below-the-fold Bilder aktivieren |
| Font Loading | OK | Self-hosted Fonts sind gut |

---

## Dateiaenderungen

| Datei | Aenderung |
|-------|-----------|
| `src/pages/ServicePage.tsx` | useEffect fuer Title + Meta |
| `src/pages/Contact.tsx` | useEffect fuer Title + Meta |
| `src/pages/Impressum.tsx` | useEffect fuer Title + Meta |
| `src/pages/Datenschutz.tsx` | useEffect fuer Title + Meta |
| `src/pages/Barrierefreiheit.tsx` | useEffect fuer Title + Meta |
| `src/pages/NotFound.tsx` | useEffect fuer Title + Deutsche Texte |

---

## Zusammenfassung

6 Dateien werden angepasst, um dynamische Title Tags und Meta Descriptions auf allen Unterseiten zu setzen. Das ist kritisch fuer SEO, da Google sonst den falschen Title in den Suchergebnissen anzeigt.

