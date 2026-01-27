

# Fix: Stabileres Deployment mit Retry-Logik und Dependency-Fix

## Problem-Analyse

### Problem 1: Netzwerk-Timeouts
GitHub Runner hatte temporäre Verbindungsprobleme zur npm Registry. Das ist ein bekanntes Problem und kann mit Retry-Logik gelöst werden.

### Problem 2: Fehlende Peer-Dependency
`@testing-library/react@16` erwartet `@testing-library/dom@^10.0.0`, aber diese ist nicht installiert.

---

## Lösungen

### Änderung 1: Retry-Logik im Workflow

**Datei:** `.github/workflows/deploy.yml`

```yaml
- name: Install dependencies
  run: npm install
  env:
    npm_config_retry: 3
  timeout-minutes: 10
```

Alternativ mit explizitem Retry:

```yaml
- name: Install dependencies
  run: |
    for i in 1 2 3; do
      npm install && break
      echo "Retry $i failed, waiting 10s..."
      sleep 10
    done
```

---

### Änderung 2: Fehlende Dependency hinzufügen

**Datei:** `package.json`

In `devDependencies` hinzufügen:

```json
"@testing-library/dom": "^10.4.0",
```

---

### Änderung 3 (Alternative): Testing-Libraries für Prod-Build entfernen

Falls Tests im Deployment nicht benötigt werden, könnte man `npm install --omit=dev` verwenden, um devDependencies zu überspringen. Das würde den Build beschleunigen und die Testing-Library-Probleme umgehen.

---

## Empfohlene Gesamtlösung

### `.github/workflows/deploy.yml`

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
        run: npm install --omit=dev
        timeout-minutes: 10

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

**Wichtig:** `--omit=dev` funktioniert hier NICHT, da Vite und TypeScript in devDependencies sind und für den Build benötigt werden.

---

## Finale Empfehlung

### Option A: Retry + DOM-Dependency (robuster)

1. Retry-Logik zum Workflow hinzufügen
2. `@testing-library/dom` zur package.json hinzufügen

### Option B: Einfach nochmal laufen lassen

Da es ein temporäres Netzwerkproblem war, könnte ein erneuter Push oder manueller Workflow-Trigger ausreichen.

---

## Technische Änderungen

### Datei 1: `.github/workflows/deploy.yml` (Zeile 23-24)

```yaml
# Vorher
- name: Install dependencies
  run: npm install

# Nachher
- name: Install dependencies
  run: |
    for i in 1 2 3; do
      npm install && break
      echo "Attempt $i failed, retrying in 15s..."
      sleep 15
    done
  timeout-minutes: 15
```

### Datei 2: `package.json` (Zeile 70, in devDependencies)

```json
"@testing-library/dom": "^10.4.0",
"@testing-library/jest-dom": "^6.6.0",
```

---

## Zusammenfassung

```text
+--------------------------------------------+
| 1. Retry-Logik für npm install             |
|    (3 Versuche mit 15s Pause)              |
+--------------------------------------------+
            |
            v
+--------------------------------------------+
| 2. @testing-library/dom hinzufügen         |
|    (behebt Peer-Dependency-Warnung)        |
+--------------------------------------------+
            |
            v
+--------------------------------------------+
| 3. Commit + Push → Workflow läuft erneut   |
+--------------------------------------------+
```

