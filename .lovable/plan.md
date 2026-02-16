

# Conversion-Optimierung der SEA Landing Pages

Analyse der aktuellen Seiten und 5 gezielte Verbesserungen fuer alle 3 LPs (`/lp/entruempelung`, `/lp/haushaltsaufloesung`, `/lp/messie-hilfe`).

---

## 1. Hero: Urgency-Badge + Scroll-Indikator

**Problem:** Kein Dringlichkeits-Signal. Nutzer von Google Ads brauchen einen Grund, JETZT zu handeln.

**Loesung:**
- Animiertes Urgency-Badge ueber der Headline: "Noch diese Woche Termine frei" (mit pulsierendem gruenen Punkt)
- Subtiler animierter Scroll-Pfeil am unteren Rand des Heroes (bounce-Animation)

**Datei:** `src/components/sea/SEAHero.tsx`

```
Vor der H1:
[Pulsierender gruener Punkt] Noch diese Woche Termine frei

Am unteren Rand:
[Animierter Chevron-Down Pfeil]
```

---

## 2. SocialProof: Varianten-spezifisches Testimonial hervorheben

**Problem:** Jede SEA-Variante hat ein eigenes Testimonial in `seaData` (z.B. "Nach dem Tod meiner Mutter..." fuer Haushaltsaufloesung), das wird aber NIRGENDS angezeigt. Stattdessen werden nur die 3 generischen Google-Reviews gezeigt.

**Loesung:** Ueber den Review-Cards ein grosses, hervorgehobenes Zitat-Element mit dem varianten-spezifischen Testimonial einbauen. Glassmorphism-Karte mit Anfuehrungszeichen-Icon.

**Datei:** `src/components/sea/SEASocialProof.tsx`

```
Zwischen Section-Header und Review-Grid:
[Grosses Anfuehrungszeichen-Icon]
"Nach dem Tod meiner Mutter wusste ich nicht..."
- Sabine R.
```

---

## 3. BeforeAfter: Inline-CTA nach dem Slider

**Problem:** Die Before/After-Section ist emotional sehr stark, aber es fehlt ein direkter Conversion-Punkt. Der Nutzer sieht das Ergebnis und muss dann weiter scrollen bis zum naechsten CTA.

**Loesung:** Direkt unter den Outcome-Badges einen kompakten CTA-Block mit Funnel-Button einbauen.

**Datei:** `src/components/sea/SEABeforeAfter.tsx`

```
Nach den Outcome-Badges:
[Funnel-Button: "So soll es bei mir auch aussehen"]
Unverbindlich. Antwort innerhalb von 24h.
```

---

## 4. MidCTA: Button-Hierarchie korrigieren

**Problem:** Der primaere CTA-Button im MidCTA-Bereich ist aktuell WhatsApp-gruen gestylt, oeffnet aber den Anfrage-Funnel. Das ist verwirrend - der Nutzer erwartet WhatsApp, bekommt aber ein Formular.

**Loesung:** 
- Primaerer Button: Orange (CTA-Farbe) mit MessageSquare-Icon fuer den Funnel
- Sekundaerer Button: WhatsApp-gruen fuer den direkten WhatsApp-Link
- Beide Buttons nebeneinander statt untereinander

**Datei:** `src/components/sea/SEAMidCTA.tsx`

---

## 5. FAQ: Micro-CTA am Ende

**Problem:** Die FAQ-Section endet abrupt. Nutzer, die bis hierhin gescrollt haben, sind hochqualifiziert - aber es gibt keinen direkten CTA.

**Loesung:** Unterhalb des letzten FAQ-Items einen dezenten CTA-Hinweis: "Ihre Frage war nicht dabei?" mit WhatsApp-Link.

**Datei:** `src/components/sea/SEAMiniFAQ.tsx`

---

## Technische Details

### Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/sea/SEAHero.tsx` | Urgency-Badge + Scroll-Indikator |
| `src/components/sea/SEASocialProof.tsx` | Varianten-Testimonial hervorheben |
| `src/components/sea/SEABeforeAfter.tsx` | Inline-CTA nach Slider |
| `src/components/sea/SEAMidCTA.tsx` | Button-Hierarchie korrigieren (Funnel=Orange, WhatsApp=Gruen) |
| `src/components/sea/SEAMiniFAQ.tsx` | Micro-CTA am Ende |

### Keine neuen Dateien noetig

Alle Aenderungen sind Erweiterungen bestehender Komponenten. Der Funnel wird jeweils ueber den bestehenden State (`isModalOpen`) gesteuert, der bereits in `SEAHero` existiert. Fuer `SEABeforeAfter` wird ein neuer State + Funnel-Import hinzugefuegt.

### Animations-Details

- Urgency-Badge: `animate-pulse` auf dem gruenen Punkt
- Scroll-Indikator: CSS `bounce`-Animation auf Chevron-Down
- Testimonial: `animate-fade-in` mit Delay
- BeforeAfter-CTA: `scroll-reveal` wie bestehende Elemente

