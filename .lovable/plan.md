
# Umstellung auf SFTP mit Passwort-Authentifizierung

## Warum ist das einfacher?

- Kein SSH-Key-Generieren nötig
- Kein Key-Format-Problem (das aktuelle `error in libcrypto`)
- Du verwendest einfach deinen SFTP-Benutzernamen und Passwort von Mittwald

---

## Änderungen

### 1. GitHub Secrets anpassen

Folgende Secrets werden benötigt (unter Repository → Settings → Secrets → Actions):

| Secret | Beschreibung | Beispiel |
|--------|--------------|----------|
| `SFTP_HOST` | Mittwald Server-Adresse | `sshXXX.mwld.net` |
| `SFTP_USER` | Dein SFTP-Benutzername | `p123456` |
| `SFTP_PASSWORD` | Dein SFTP-Passwort | `deinPasswort` |
| `SFTP_PATH` | Zielverzeichnis | `/html/raeumzwerge` |

Die alten SSH-Key-Secrets (`MITTWALD_SSH_KEY`) kannst du danach löschen.

---

### 2. Workflow-Datei aktualisieren

**Datei:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Mittwald

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

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
          include: '[ "*", "**/*" ]'
          exclude: '[]'
```

---

## Was ändert sich?

```text
VORHER (SSH-Key):                    NACHHER (SFTP-Passwort):
+---------------------------+        +---------------------------+
| easingthemes/ssh-deploy   |   →    | sand4rt/ftp-deployer      |
| SSH_PRIVATE_KEY (komplex) |   →    | username + password       |
| rsync über SSH            |   →    | SFTP-Protokoll            |
+---------------------------+        +---------------------------+
```

---

## Vorteile dieser Lösung

- **Einfacher**: Keine Key-Generierung oder Format-Probleme
- **Mittwald-kompatibel**: Funktioniert mit Standard-SFTP-Zugangsdaten
- **Cleanup-Option**: Löscht alte Dateien automatisch (wie `--delete` bei rsync)

---

## Nach der Umsetzung

1. Neuen Commit pushen
2. GitHub Actions läuft automatisch
3. Bei Erfolg: Die alten SSH-Secrets können gelöscht werden

---

## Technische Details

- Die Action `sand4rt/ftp-deployer` unterstützt sowohl FTP als auch SFTP
- Mit `sftp: true` wird explizit SFTP (SSH File Transfer Protocol) verwendet
- Port 22 ist der Standard-SSH/SFTP-Port bei Mittwald
- `cleanup: true` entfernt Dateien auf dem Server, die lokal nicht mehr existieren
