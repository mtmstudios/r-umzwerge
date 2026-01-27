
## Problem: 404-Fehler auf regionalen Seiten und Landingpages

Die Seiten wie `/ulm`, `/muenchen` oder `/lp/haushaltsaufloesung` zeigen "Not Found" auf der Mittwald-Domain, weil die `.htaccess`-Datei nicht korrekt deployed wird.

---

## Ursache

1. **SPA-Routing benötigt Server-Konfiguration**: Bei einer Single Page Application muss der Apache-Server alle Anfragen zu `index.html` umleiten
2. **Die `.htaccess` existiert** in `public/` und enthält die korrekten Rewrite-Regeln
3. **Aber**: Der SFTP-Deployer (`sand4rt/ftp-deployer`) ignoriert möglicherweise versteckte Dateien (Dateien die mit `.` beginnen)

---

## Lösungsansatz

### Option A: Include-Pattern für .htaccess explizit setzen

```yaml
# .github/workflows/deploy.yml
- name: Deploy via SFTP
  uses: sand4rt/ftp-deployer@v1.8
  with:
    sftp: true
    host: ${{ secrets.SFTP_HOST }}
    port: 22
    username: ${{ secrets.SFTP_USER }}
    password: ${{ secrets.SFTP_PASSWORD }}
    remote_folder: ${{ secrets.SFTP_PATH }}
    local_folder: './dist'
    cleanup: true
    include: '[ "*", "**/*", ".*" ]'  # ← Versteckte Dateien hinzufügen
    exclude: '[]'
```

### Option B: .htaccess manuell kopieren (Fallback)

Falls Option A nicht funktioniert, fügen wir einen zusätzlichen Schritt hinzu:

```yaml
- name: Ensure .htaccess is in dist
  run: cp public/.htaccess dist/.htaccess || true

- name: Deploy via SFTP
  # ... rest bleibt gleich
```

### Option C: Zu einem anderen SFTP-Action wechseln

Der `SamKirkland/FTP-Deploy-Action` hat explizite Unterstützung für versteckte Dateien:

```yaml
- name: Deploy to Mittwald
  uses: SamKirkland/FTP-Deploy-Action@v4.3.4
  with:
    server: ${{ secrets.SFTP_HOST }}
    username: ${{ secrets.SFTP_USER }}
    password: ${{ secrets.SFTP_PASSWORD }}
    local-dir: ./dist/
    server-dir: ${{ secrets.SFTP_PATH }}/
    protocol: sftp
```

---

## Empfohlene Reihenfolge

1. **Zuerst Option A testen** (einfachste Änderung)
2. **Falls nicht klappt: Option B** (garantiert .htaccess im dist)
3. **Falls beides nicht klappt: Option C** (anderer Deployer)

---

## Technische Änderungen

### Datei: `.github/workflows/deploy.yml`

**Vorher:**
```yaml
include: '[ "*", "**/*" ]'
```

**Nachher (Option A + B kombiniert für maximale Sicherheit):**
```yaml
- name: Ensure .htaccess is in dist
  run: |
    cp public/.htaccess dist/.htaccess 2>/dev/null || echo ".htaccess already in dist"

- name: Deploy via SFTP
  uses: sand4rt/ftp-deployer@v1.8
  with:
    sftp: true
    host: ${{ secrets.SFTP_HOST }}
    port: 22
    username: ${{ secrets.SFTP_USER }}
    password: ${{ secrets.SFTP_PASSWORD }}
    remote_folder: ${{ secrets.SFTP_PATH }}
    local_folder: './dist'
    cleanup: true
    include: '[ "*", "**/*", ".*" ]'
    exclude: '[]'
```

---

## Erwartetes Ergebnis nach Deploy

- `/ulm`, `/muenchen`, `/nuernberg` etc. funktionieren
- `/lp/haushaltsaufloesung`, `/lp/messiewohnung` etc. funktionieren
- Alle Deep-Links und direktes Aufrufen von URLs funktionieren
- Browser-Caching und GZIP-Kompression sind aktiv
