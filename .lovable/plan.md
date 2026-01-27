
Ziel
- Das Logo soll auf allen Geräten deutlich größer wirken, ohne dass es wieder „abgeschnitten“ wird.
- Vermutung „unsichtbarer Rand“ (transparentes Padding im PNG) gezielt beheben, statt nur die Höhe hoch- und runterzuschrauben.

Was gerade passiert (Ist-Stand)
- In `src/components/layout/Header.tsx` wird das Logo aktuell nur über `h-16 sm:h-20 lg:h-24` skaliert.
- Wenn die Logo-Datei selbst transparenten Rand/Whitespace hat, wirkt das Logo trotz größerer Höhe „klein“, weil ein Teil der Fläche nur „leerer Rand“ ist.
- Früherer „Crop“ kam durch `overflow-hidden` + zu großes Bild. Das haben wir entfernt, daher ist jetzt nichts mehr abgeschnitten – aber das Logo wirkt zu klein.

Lösungsidee (robust gegen „unsichtbaren Rand“)
Wir lösen das in zwei Schritten, damit es endlich stabil ist:

1) „Unsichtbaren Rand“ per CSS wegschneiden (ohne Bilddatei anfassen)
- Wir geben dem Logo eine CSS-Klasse, die mittels `clip-path: inset(...)` einen kleinen Prozentanteil an allen Seiten abschneidet.
- Vorteil: Entfernt transparentes Padding/Whitespace zuverlässig, ohne dass echte Logo-Kanten abgeschnitten werden müssen (Werte sind fein justierbar).
- Das ist der wichtigste Teil, weil er die eigentliche Ursache adressiert.

2) Logo sichtbar größer machen (ohne Seitencrop)
- Danach erhöhen wir die sichtbare Größe moderat und konsistent über Breakpoints, z. B.:
  - Mobile: `h-18`/`h-20`
  - Tablet: `sm:h-22`/`sm:h-24`
  - Desktop: `lg:h-28` (oder `lg:h-32`, wenn gewünscht)
- Gleichzeitig sorgen wir dafür, dass das Logo nicht durch Containerbreiten „gedrückt“ wird (z. B. `max-w-none`) und sauber zentriert bleibt.

Konkrete Änderungen (Implementation Steps)

A) CSS: neue Utility-Klasse für das Logo anlegen
Datei: `src/index.css`
- Neue Klasse z. B. `.logo-trim` hinzufügen:
  - `clip-path: inset(8% 6% 8% 6%);` (Startwerte)
  - Optional: `transform: scale(1.05); transform-origin: center;` (falls es trotz Trim noch minimal zu klein wirkt)
- Hinweis: Diese Prozentwerte sind bewusst konservativ. Wenn danach noch zu viel Rand sichtbar ist, können wir z. B. auf `inset(10% 8% 10% 8%)` erhöhen. Wenn echte Kanten abgeschnitten werden, reduzieren wir wieder.

B) Header: Logo-Klasse anwenden + Größe anheben
Datei: `src/components/layout/Header.tsx`
- Dem `<img>` die neue Klasse `logo-trim` geben.
- Logo-Höhen-Klassen erhöhen (ohne `overflow-hidden` zurückzubringen), z. B.:
  - von `h-16 sm:h-20 lg:h-24`
  - auf `h-18 sm:h-22 lg:h-28` (oder `h-20 sm:h-24 lg:h-28`, je nachdem wie groß du es willst)
- Zusätzlich optional:
  - `max-w-none` am `<img>`, damit der Browser es nicht „zusammendrückt“, wenn die Breite knapp wird.
  - `shrink-0` am Link/Wrapper, damit das Logo nicht kleiner gerechnet wird, wenn der Grid/Flex-Druck steigt.

C) Feintuning (1 kurzer Iterationsschritt)
- Nach Umsetzung prüfen wir 3 Viewports (Lovable Device Toggle):
  - 375px (Mobile)
  - ~768px (Tablet)
  - ≥1024px (Desktop)
- Wenn das Logo noch „klein“ wirkt: Höhe 1 Stufe hoch.
- Wenn echte Kanten beschnitten sind: `clip-path` Inset reduzieren (z. B. 8% → 6%).
- Wenn nur oben/unten zu viel Rand bleibt: Inset-Werte pro Seite getrennt anpassen (z. B. `inset(10% 6% 6% 6%)`).

Warum diese Lösung besser ist als „nur Höhe ändern“
- Wenn der PNG/WebP-Datei-Rand das Problem ist, ändert reines Hochskalieren nur die Gesamtfläche, aber der Anteil „leer“ bleibt – das Logo wirkt weiterhin kleiner als es sein müsste.
- `clip-path` entfernt genau diesen Anteil und macht das Logo optisch größer, ohne dass es wieder seitlich abgeschnitten wird.

Akzeptanzkriterien (damit wir endlich „fertig“ sind)
- Auf Mobile, Tablet und Desktop wirkt das Logo sichtbar prominent (kein „zu klein“ Eindruck).
- Das Logo ist nicht seitlich abgeschnitten (keine echten Logo-Teile fehlen).
- Header bleibt optisch sauber: kein übergroßer Balken, keine Sprünge beim Scrollen.

Risiken / Edge Cases
- Wenn das transparente Padding extrem ungleichmäßig ist (z. B. nur links viel), müssen wir `clip-path` asymmetrisch setzen.
- Falls `clip-path` in seltenen Browsern Probleme macht (sehr unwahrscheinlich heute), können wir als Fallback stattdessen `transform: scale()` + feste Containerbreite einsetzen, aber das ist Plan B.

Umsetzung in Default Mode
- Ich setze die CSS-Klasse in `src/index.css`, passe `Header.tsx` an, und danach testen wir einmal kurz Mobile/Tablet/Desktop.
