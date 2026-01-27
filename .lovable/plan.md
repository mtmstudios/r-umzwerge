

# Website-Vorbereitung fuer Mittwald Hosting

## Uebersicht

Die Website wird fuer das Hosting auf Mittwald vorbereitet. Das beinhaltet: Sitemap-Korrektur, fehlende Dateien erstellen, und SPA-Routing konfigurieren.

---

## 1. Sitemap-Korrekturen

### Fehlende Seite hinzufuegen

Die Service-Seite `/leistungen/entruempelung` existiert im Code (serviceData.ts), fehlt aber in der Sitemap.

**Aktuelle Sitemap:**
- `/` (Startseite)
- `/kontakt`
- `/impressum`, `/datenschutz`, `/barrierefreiheit`
- 5 Leistungsseiten (wohnungsentruempelung, haushaltsaufloesung, keller-dachboden-garage, gewerbe-buero-lager, messie-wohnungen)
- 8 Staedte-Seiten

**Zu ergaenzen:**
- `/leistungen/entruempelung` (priority 0.9)

### lastmod hinzufuegen

Google bevorzugt Sitemaps mit `<lastmod>`-Datumsangaben. Aktuelle Datuemer werden fuer alle URLs ergaenzt.

---

## 2. index.html Korrekturen

### Telefonnummer ersetzen

```text
Zeile 39: "telephone": "+49-XXX-XXXXXXX"
Ersetzen durch: "telephone": "+49 160 3080676"
```

### OG-Image erstellen

Die `og-image.jpg` wird in den Social Media Tags referenziert, existiert aber nicht. Optionen:
- Bild erstellen und hochladen (empfohlen: 1200x630px)
- Oder auf ein bestehendes Bild verweisen

---

## 3. .htaccess fuer SPA-Routing

Fuer React Router auf Apache-Servern (Mittwald) muss eine `.htaccess` Datei erstellt werden.

**Datei:** `public/.htaccess`

```text
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Kompression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

---

## 4. Vollstaendige Seiten-Uebersicht fuer Google

Nach der Korrektur werden alle Seiten korrekt indexiert:

| Seite | URL | Priority |
|-------|-----|----------|
| Startseite | `/` | 1.0 |
| Kontakt | `/kontakt` | 0.8 |
| Wohnungsentruempelung | `/leistungen/wohnungsentruempelung` | 0.9 |
| **Entruempelung (NEU)** | `/leistungen/entruempelung` | 0.9 |
| Haushaltsaufloesung | `/leistungen/haushaltsaufloesung` | 0.9 |
| Keller/Dachboden/Garage | `/leistungen/keller-dachboden-garage` | 0.8 |
| Gewerbe/Buero/Lager | `/leistungen/gewerbe-buero-lager` | 0.8 |
| Messie-Wohnungen | `/leistungen/messie-wohnungen` | 0.8 |
| Ulm | `/ulm` | 0.9 |
| Augsburg | `/augsburg` | 0.8 |
| Heidenheim | `/heidenheim` | 0.8 |
| Muenchen | `/muenchen` | 0.8 |
| Nuernberg | `/nuernberg` | 0.8 |
| Ravensburg | `/ravensburg` | 0.8 |
| Reutlingen | `/reutlingen` | 0.8 |
| Stuttgart | `/stuttgart` | 0.8 |
| Impressum | `/impressum` | 0.3 |
| Datenschutz | `/datenschutz` | 0.3 |
| Barrierefreiheit | `/barrierefreiheit` | 0.3 |

**Hinweis:** Die SEA-Landingpages (`/lp/*`) sind bewusst NICHT in der Sitemap, da sie in robots.txt fuer Crawler gesperrt sind.

---

## Dateiaenderungen

| Datei | Aenderung |
|-------|-----------|
| `public/sitemap.xml` | `/leistungen/entruempelung` hinzufuegen, lastmod ergaenzen |
| `public/.htaccess` | Neue Datei fuer SPA-Routing und Caching |
| `index.html` | Telefonnummer im Schema korrigieren |

---

## Nach dem Deployment pruefen

1. **Alle URLs manuell testen** - Jede URL aus der Sitemap aufrufen
2. **Google Search Console** - Sitemap einreichen
3. **Lighthouse-Test** - Performance und SEO pruefen
4. **Mobile-Test** - Responsive Design verifizieren

