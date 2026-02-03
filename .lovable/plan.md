
# SFTP Deployment-Fehler beheben

## Problem-Analyse

Der Fehler `no such file ***/images/entruempelung-nachher.png` tritt beim SFTP-Upload auf. Das Problem ist wahrscheinlich:

1. **`cleanup: true`** löscht erst alle Remote-Dateien, dann lädt neue hoch
2. Bei großen Bilddateien kann es zu Timing-/Netzwerk-Problemen kommen
3. Die `sand4rt/ftp-deployer` Action ist veraltet (DeprecationWarning zeigt das auch)

## Lösung

### Option A: Robusterer Deployer (Empfohlen)

Wechsel zu einem moderneren SFTP-Deployer wie `SamKirkland/FTP-Deploy-Action@v4.3.5`:

```yaml
- name: Deploy via SFTP
  uses: SamKirkland/FTP-Deploy-Action@v4.3.5
  with:
    server: ${{ secrets.SFTP_HOST }}
    username: ${{ secrets.SFTP_USER }}
    password: ${{ secrets.SFTP_PASSWORD }}
    port: 22
    protocol: sftp
    local-dir: ./dist/
    server-dir: ${{ secrets.SFTP_PATH }}/
    dangerous-clean-slate: true
```

### Option B: Cleanup deaktivieren (Schnelle Lösung)

Ändere in `.github/workflows/deploy.yml`:

```yaml
cleanup: false  # statt true
```

Das verhindert das Löschen von Dateien vor dem Upload, kann aber "verwaiste" Dateien auf dem Server hinterlassen.

### Option C: Retry-Logik hinzufügen

```yaml
- name: Deploy via SFTP
  uses: sand4rt/ftp-deployer@v1.8
  with:
    # ... existing config ...
    cleanup: false
  continue-on-error: true
  id: deploy1

- name: Retry Deploy if failed
  if: steps.deploy1.outcome == 'failure'
  uses: sand4rt/ftp-deployer@v1.8
  with:
    # ... same config ...
```

---

## Zusätzlich: Aufräumen der Bild-Referenzen

Die Bildpfade in `seaData.ts` (Zeilen 93-98, 149-154, 205-210) werden nicht mehr benötigt, da `SEABeforeAfter.tsx` die Bilder aus `seaImages.ts` lädt. Diese können entfernt werden, um Verwirrung zu vermeiden.

---

## Empfohlene Vorgehensweise

1. **Sofort**: `cleanup: false` setzen und erneut deployen
2. **Langfristig**: Auf `SamKirkland/FTP-Deploy-Action` wechseln (moderner, stabiler)
3. **Optional**: Ungenutzte Bildpfade in `seaData.ts` entfernen

