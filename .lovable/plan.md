

# Plan: Mobile Animationen reparieren

## Identifizierte Probleme

Nach ausführlichem Testen auf Mobile (390x844) wurden folgende Probleme gefunden:

### 1. Timeline-Animation - Bounce-Animation fehlt in Tailwind Config
Die CSS-Klasse `animate-bounce-in` ist in `src/index.css` definiert (Zeilen 410-431), aber **nicht** in der Tailwind-Konfiguration registriert. Dadurch kann Tailwind die Animation nicht korrekt verarbeiten.

### 2. Mobile Swipe-Interaktion funktioniert, aber kein visuelles Feedback
Die Swipe-Logik im `HorizontalTimeline` ist korrekt implementiert, aber der `animate-bounce-in` Effekt wird nicht angewendet, da er nicht in Tailwind registriert ist.

### 3. Service-Seiten Timeline - Gleiche Konfiguration fehlt
Die `ServiceProcess`-Komponente nutzt dieselbe `HorizontalTimeline`, daher ist das Problem identisch.

---

## Technische Umsetzung

### Datei: `tailwind.config.ts`

**Änderung 1: Bounce-In Animation zu Keyframes hinzufügen (nach Zeile 122)**

```typescript
"bounce-in": {
  "0%": { transform: "scale(1)" },
  "40%": { transform: "scale(1.15)" },
  "60%": { transform: "scale(1.05)" },
  "80%": { transform: "scale(1.12)" },
  "100%": { transform: "scale(1.1)" },
},
```

**Änderung 2: Animation-Utility hinzufügen (nach Zeile 131)**

```typescript
"bounce-in": "bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
```

---

### Datei: `src/index.css`

**Änderung: Redundanten CSS-Code entfernen (Zeilen 410-431)**

Die `@keyframes bounce-in` und `.animate-bounce-in` Definitionen können entfernt werden, da sie nun in Tailwind registriert sind. Dies vermeidet Duplikation.

---

## Zusammenfassung

| Datei | Änderung |
|-------|----------|
| `tailwind.config.ts` | `bounce-in` Keyframe und Animation hinzufügen |
| `src/index.css` | Redundante CSS-Definition entfernen (optional, zur Bereinigung) |

## Ergebnis

- Timeline-Bounce-Animation funktioniert auf Mobile beim Tippen/Wischen
- Konsistente Animation auf Desktop (Scroll-triggered) und Mobile (Touch-triggered)
- Sauberere Code-Struktur ohne CSS-Duplikation

