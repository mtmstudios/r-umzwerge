

# Fix: GitHub Actions Workflow Version korrigieren

## Problem

Der Workflow schlägt fehl mit der Meldung:
```
Unable to resolve action `easingthemes/ssh-deploy@v5`, unable to find version `v5`
```

## Ursache

Die Version `v5` existiert nicht als Git-Tag. Die korrekte Versionsangabe ist `v5.1.0`.

---

## Loesung

Die Zeile im Workflow muss von:

```yaml
uses: easingthemes/ssh-deploy@v5
```

geaendert werden zu:

```yaml
uses: easingthemes/ssh-deploy@v5.1.0
```

---

## Dateiaenderung

**Datei:** `.github/workflows/deploy.yml`

| Zeile | Alt | Neu |
|-------|-----|-----|
| 28 | `uses: easingthemes/ssh-deploy@v5` | `uses: easingthemes/ssh-deploy@v5.1.0` |

---

## Alternative Optionen

| Option | Version | Beschreibung |
|--------|---------|--------------|
| **Empfohlen** | `@v5.1.0` | Stabile, getestete Version |
| Alternativ | `@main` | Immer die neueste Version (kann instabil sein) |

---

## Nach der Korrektur

1. Push den Fix zu GitHub
2. Der Workflow startet automatisch neu
3. Ueberpruefe den Actions-Tab auf gruenes Haekchen

