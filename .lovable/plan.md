

# GitHub Actions Workflow fuer Mittwald Deployment

## Uebersicht

Eine GitHub Actions Workflow-Datei wird erstellt, die bei jedem Push zum `main`-Branch automatisch die Website baut und zu Mittwald deployed.

---

## Workflow-Datei

**Neue Datei:** `.github/workflows/deploy.yml`

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
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to Mittwald via SSH
        uses: easingthemes/ssh-deploy@v5
        with:
          SSH_PRIVATE_KEY: ${{ secrets.MITTWALD_SSH_KEY }}
          REMOTE_HOST: ${{ secrets.MITTWALD_SSH_HOST }}
          REMOTE_USER: ${{ secrets.MITTWALD_SSH_USER }}
          SOURCE: "dist/"
          TARGET: ${{ secrets.MITTWALD_DEPLOY_PATH }}
          ARGS: "-avz --delete"
```

---

## Workflow-Funktionen

| Feature | Beschreibung |
|---------|--------------|
| **Trigger** | Push zu `main` oder manueller Start |
| **Node.js** | Version 20 mit npm-Caching |
| **Build** | `npm ci` + `npm run build` |
| **Deploy** | rsync via SSH mit `--delete` Flag |

---

## Erforderliche GitHub Secrets

Diese muessen im GitHub Repository unter **Settings → Secrets → Actions** angelegt werden:

| Secret | Beschreibung | Beispielwert |
|--------|--------------|--------------|
| `MITTWALD_SSH_HOST` | SSH-Server | `ssh123.mittwaldserver.info` |
| `MITTWALD_SSH_USER` | Benutzername | `p123456` |
| `MITTWALD_SSH_KEY` | Privater SSH-Key | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `MITTWALD_DEPLOY_PATH` | Zielverzeichnis | `/html` |

---

## Was wird deployed?

Der `dist/`-Ordner nach dem Build enthaelt:

- `index.html` - Einstiegspunkt
- `.htaccess` - SPA-Routing + Caching
- `sitemap.xml` - 19 indexierbare Seiten
- `robots.txt` - Blockiert `/lp/` Landingpages
- `assets/` - JS, CSS, Bilder, Fonts
- Alle Routen (organisch + SEA-Landingpages)

---

## Ablauf

```text
Push zu main → Checkout → Node.js Setup → npm ci → npm run build → rsync zu Mittwald
```

---

## Dateiaenderung

| Datei | Aenderung |
|-------|-----------|
| `.github/workflows/deploy.yml` | Neue Datei erstellen |

