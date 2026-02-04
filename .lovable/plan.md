

# SFTP-Deployment Fix: Shell-Befehl-Problem

## Problem

Der Fehler **"exec request failed on channel 0"** tritt auf, weil:
- Mittwald nur **reinen SFTP-Zugang** erlaubt (kein SSH/Shell)
- Die Option `delete_remote_files: true` versucht Shell-Befehle (`rm -rf`) auszuführen
- Das ist bei SFTP-only Accounts nicht möglich

## Lösung

Die Option `delete_remote_files` muss deaktiviert werden. Die Dateien werden dann überschrieben statt vorher gelöscht.

## Änderung

| Datei | Änderung |
|-------|----------|
| `.github/workflows/deploy.yml` | `delete_remote_files: true` → `delete_remote_files: false` |

## Neue Konfiguration

```yaml
- name: Deploy via SFTP
  uses: wlixcc/SFTP-Deploy-Action@v1.2.4
  with:
    server: ${{ secrets.SFTP_HOST }}
    username: ${{ secrets.SFTP_USER }}
    password: ${{ secrets.SFTP_PASSWORD }}
    port: 22
    local_path: './dist/*'
    remote_path: ${{ secrets.SFTP_PATH }}
    sftp_only: true
    delete_remote_files: false
```

## Was bedeutet das?

**Vorher (mit delete):**
1. Alle Dateien auf Server löschen
2. Neue Dateien hochladen

**Nachher (ohne delete):**
1. Neue Dateien hochladen (überschreiben bestehende)

### Konsequenz
- Alte Dateien, die nicht mehr im Build sind, bleiben auf dem Server
- Bei größeren Änderungen (z.B. neue Asset-Hashes) kann sich "Müll" ansammeln
- **Empfehlung:** Ab und zu manuell alte Dateien im Mittwald-Panel löschen

## Alternative: Manuelle Bereinigung vor Upload

Falls gewünscht, kann vor dem SFTP-Upload ein separater Schritt hinzugefügt werden, der per SFTP (nicht Shell) alte Dateien entfernt. Das wäre aber komplexer.

