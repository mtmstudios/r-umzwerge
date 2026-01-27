

# Fix: package-lock.json Synchronisation und Workflow-Stabilisierung

## Problem

Der Workflow schlaegt beim Schritt `npm ci` fehl:

```
npm ci can only install packages when your package.json and package-lock.json are in sync.
Missing: @testing-library/dom@10.4.1 from lock file
Invalid: lock file's picomatch@2.3.1 does not satisfy picomatch@4.0.3
...
```

Die `package-lock.json` ist nicht mehr synchron mit der `package.json`. Das passiert haeufig, wenn Lovable Pakete aktualisiert, aber die Lockfile nicht vollstaendig neu generiert wird.

---

## Loesung in zwei Schritten

### Schritt 1: Workflow temporaer auf `npm install` umstellen

Damit der Build sofort funktioniert, wird `npm ci` durch `npm install` ersetzt.

**Datei:** `.github/workflows/deploy.yml`

| Zeile | Alt | Neu |
|-------|-----|-----|
| 24 | `run: npm ci` | `run: npm install` |

---

### Schritt 2: package-lock.json neu generieren

Die `package-lock.json` muss lokal oder per Workflow neu erstellt werden.

**Option A - Lokal (empfohlen):**
```bash
rm package-lock.json node_modules -rf
npm install
git add package-lock.json
git commit -m "fix: regenerate package-lock.json"
git push
```

**Option B - Per Workflow (Einmal-Fix):**
Ein temporaerer Workflow-Step kann die Lockfile auch im CI generieren. Allerdings ist Option A sauberer.

---

### Schritt 3: Zurueck auf `npm ci` (nach erfolgreichem Fix)

Nachdem die Lockfile synchron ist, wird `npm install` wieder zu `npm ci` geaendert fuer schnellere, deterministische Builds.

---

## Aenderungsdetails

### Sofortige Aenderung (Schritt 1)

```yaml
# .github/workflows/deploy.yml - Zeile 23-24

# Vorher
- name: Install dependencies
  run: npm ci

# Nachher
- name: Install dependencies
  run: npm install
```

---

## Zusammenfassung der Schritte

```text
+-------------------------------------------+
| 1. deploy.yml: npm ci -> npm install      |
|    (sofort, per Lovable)                  |
+-------------------------------------------+
            |
            v
+-------------------------------------------+
| 2. Lokal: rm -rf node_modules             |
|           rm package-lock.json            |
|           npm install                     |
|           git push                        |
+-------------------------------------------+
            |
            v
+-------------------------------------------+
| 3. deploy.yml: npm install -> npm ci      |
|    (nachdem Lockfile gepusht ist)         |
+-------------------------------------------+
```

---

## Technische Hinweise

- `npm ci` ist strenger als `npm install` - es erfordert eine exakt synchrone Lockfile
- Nach dem Regenerieren der Lockfile sollte `npm ci` wieder aktiviert werden, da es schneller und reproduzierbarer ist
- Die Lockfile ist ca. 8000 Zeilen lang und wird vollstaendig von npm verwaltet

