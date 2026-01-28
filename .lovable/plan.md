

## Neues Logo mit kleinerem transparenten Rand verwenden

Das hochgeladene Logo `LOGONEU.png` hat deutlich weniger transparenten Rand als das aktuelle `logo-transparent.png`. Dadurch wird das CSS-Trimming einfacher oder möglicherweise überflüssig.

---

## Vergleich

| Eigenschaft | Aktuelles Logo | Neues Logo |
|-------------|----------------|------------|
| Transparenter Rand | Gross (ca. 15-20%) | Klein (ca. 3-5%) |
| CSS-Trimming nötig | Ja (aggressiv) | Minimal oder gar nicht |

---

## Technische Umsetzung

### 1. Neues Logo kopieren

Das hochgeladene Logo wird nach `src/assets/` kopiert und ersetzt das aktuelle Logo in allen Komponenten.

### 2. CSS-Klasse vereinfachen

Da das neue Logo weniger Rand hat, können die `clip-path` und `scale` Werte reduziert werden:

```css
/* Vorher (für altes Logo) */
.logo-trim {
  clip-path: inset(12% 8% 12% 8%);
  transform: scale(1.35);
  transform-origin: center;
}

/* Nachher (für neues Logo) */
.logo-trim {
  clip-path: inset(3% 2% 3% 2%);
  transform: scale(1.08);
  transform-origin: center;
}
```

### 3. Logo-Import in Komponenten aktualisieren

Die folgenden Dateien verwenden das Logo und müssen auf das neue Asset verweisen:

| Datei | Aktueller Import | Neuer Import |
|-------|------------------|--------------|
| `src/components/layout/Header.tsx` | `logo-transparent.png` | `LOGONEU.png` |
| `src/components/sea/SEAMinimalHeader.tsx` | `logo-transparent.png` | `LOGONEU.png` |
| `src/components/city/CityComparison.tsx` | `logo-raeumzwerge.png` | `LOGONEU.png` |
| `src/components/services/ServiceComparison.tsx` | `logo-raeumzwerge.png` | `LOGONEU.png` |

---

## Dateien

| Datei | Änderung |
|-------|----------|
| `src/assets/LOGONEU.png` | Neues Logo hinzufügen |
| `src/index.css` | clip-path und scale Werte reduzieren |
| `src/components/layout/Header.tsx` | Logo-Import ändern |
| `src/components/sea/SEAMinimalHeader.tsx` | Logo-Import ändern |
| `src/components/city/CityComparison.tsx` | Logo-Import ändern |
| `src/components/services/ServiceComparison.tsx` | Logo-Import ändern |

---

## Ergebnis

Das neue Logo mit dem kleineren transparenten Rand wird auf der gesamten Website verwendet. Die CSS-Trimming-Werte werden entsprechend angepasst, sodass das Logo optimal dargestellt wird - ohne die aggressiven Werte, die für das alte Logo nötig waren.

