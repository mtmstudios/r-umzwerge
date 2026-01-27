
# Plan: Diskrete CTA-Texte für Messie-Seiten

## Problemstellung
Bei Messie-Situationen ist "Foto senden" zu direkt und kann Betroffene abschrecken. Die psychologische Barriere, Fotos der eigenen Wohnung zu senden, ist enorm. Wir brauchen sanftere, einladendere Formulierungen.

## Neue CTA-Texte für `gentle` Tone

| Aktuell | Neu (diskret) |
|---------|---------------|
| "Foto senden" | "Schreiben Sie uns" |
| "Foto senden · Preis erhalten" | "Unverbindlich schreiben" |
| "Foto senden · Preiseinschätzung erhalten" | "Unverbindlich anfragen" |
| Prozess-Schritt "Foto senden" | "Kontakt aufnehmen" |
| PHOTO_GUIDE Hinweis | Komplett ausblenden für Messie |

## Technische Umsetzung

### 1. SEAHero.tsx – Dynamische Button-Texte

**Aktuelle Zeilen 61-62 und 127:**
```tsx
<span className="hidden sm:inline">Foto senden · Preis erhalten</span>
<span className="sm:hidden">Foto senden</span>
```

**Änderung:**
```tsx
// Neue Hilfsfunktion am Anfang der Komponente:
const getWhatsAppCTAText = () => {
  if (isGentle) return { long: 'Unverbindlich schreiben', short: 'Schreiben' };
  return { long: 'Foto senden · Preis erhalten', short: 'Foto senden' };
};

// Im Button:
<span className="hidden sm:inline">{getWhatsAppCTAText().long}</span>
<span className="sm:hidden">{getWhatsAppCTAText().short}</span>
```

### 2. SEAMidCTA.tsx – Dynamische Prozess-Schritte

**Aktuelle Zeilen 12-16:**
```tsx
const processSteps = [
  { num: '1', label: 'Foto senden', icon: Camera },
  { num: '2', label: 'Einschätzung erhalten', icon: MessageCircle },
  { num: '3', label: 'Termin machen', icon: Calendar },
];
```

**Änderung:**
Die `processSteps` werden dynamisch basierend auf `data.tone`:

```tsx
const getProcessSteps = () => {
  if (data.tone === 'gentle') {
    return [
      { num: '1', label: 'Kontakt aufnehmen', icon: MessageCircle },
      { num: '2', label: 'Gemeinsam besprechen', icon: MessageCircle },
      { num: '3', label: 'Termin nach Wunsch', icon: Calendar },
    ];
  }
  return [
    { num: '1', label: 'Foto senden', icon: Camera },
    { num: '2', label: 'Einschätzung erhalten', icon: MessageCircle },
    { num: '3', label: 'Termin machen', icon: Calendar },
  ];
};
```

Auch der Button-Text wird angepasst:
```tsx
<span className="hidden sm:inline">
  {isGentle ? 'Unverbindlich schreiben' : 'Foto senden · Preis erhalten'}
</span>
<span className="sm:hidden">
  {isGentle ? 'Schreiben' : 'Foto senden'}
</span>
```

### 3. SEAFinalCTA.tsx – Bereits korrekt!
Diese Komponente nutzt bereits `data.ctaHeadline` und `data.ctaSubline` aus seaData.ts, die für Messie bereits korrekt sind:
- Headline: "Unverbindlich Kontakt aufnehmen"
- Subline: "Wir hören zu. Kein Druck, keine Wertung."

Nur der Button-Text muss angepasst werden (Zeilen 42-43):
```tsx
<span className="hidden sm:inline">
  {isGentle ? 'Unverbindlich schreiben' : 'Foto senden · Preis erhalten'}
</span>
<span className="sm:hidden">
  {isGentle ? 'Schreiben' : 'Foto senden'}
</span>
```

### 4. ServiceHero.tsx – Für Messie-Leistungsseite

Die Komponente benötigt eine neue Prop `isDiscrete` oder `hidePhotoGuide`, um:
1. Den PHOTO_GUIDE Hinweis auszublenden
2. Alternative Button-Texte anzuzeigen

**Option A: Prop-basiert**
```tsx
interface ServiceHeroProps {
  // ... existing props
  isDiscrete?: boolean; // Für Messie-Seiten
}

// Im Button:
<span className="hidden sm:inline">
  {isDiscrete ? 'Unverbindlich anfragen' : 'Foto senden · Preiseinschätzung erhalten'}
</span>

// Photo Guide ausblenden:
{!isDiscrete && (
  <p className="text-sm text-white/70 mb-6">
    💡 {PHOTO_GUIDE}
  </p>
)}
```

**Option B: Über serviceData.ts konfigurieren (empfohlen)**
Neue Felder in `ServicePageData`:
```tsx
interface ServicePageData {
  // ... existing fields
  isDiscrete?: boolean;
  ctaText?: {
    whatsapp: string;
    whatsappShort: string;
  };
}
```

Dann in `messie-wohnungen`:
```tsx
isDiscrete: true,
ctaText: {
  whatsapp: 'Unverbindlich anfragen',
  whatsappShort: 'Anfragen',
},
```

### 5. ServiceProcess.tsx (indirekt via serviceData.ts)

Die Process-Steps für Messie in `serviceData.ts` (Zeile 509-513) sind bereits gut:
```tsx
processSteps: [
  { title: 'Erstkontakt', description: 'Diskreter Kontakt per WhatsApp oder Telefon.' },
  { title: 'Einschätzung', description: 'Fotos oder Begehung – vertraulich und respektvoll.' },
  { title: 'Umsetzung', description: 'Strukturierte Räumung, diskret, besenrein.' },
],
```
Hier steht "Erstkontakt" statt "Foto senden" – das ist bereits korrekt! ✅

## Zusammenfassung der Änderungen

| Datei | Änderung |
|-------|----------|
| `src/components/sea/SEAHero.tsx` | Dynamische CTA-Texte basierend auf `tone` |
| `src/components/sea/SEAMidCTA.tsx` | Dynamische Prozess-Schritte + CTA-Texte für `gentle` |
| `src/components/sea/SEAFinalCTA.tsx` | Dynamische Button-Texte für `gentle` |
| `src/lib/serviceData.ts` | Neue Felder `isDiscrete` und `ctaText` für messie-wohnungen |
| `src/components/services/ServiceHero.tsx` | Prop `isDiscrete` + konditionaler PHOTO_GUIDE |
| `src/pages/ServicePage.tsx` | `isDiscrete` Prop an ServiceHero weitergeben |

## Erwartetes Ergebnis

### SEA Messie-Landingpage:
- Hero-Button: "Unverbindlich schreiben" statt "Foto senden"
- Prozess-Schritte: "Kontakt aufnehmen → Gemeinsam besprechen → Termin nach Wunsch"
- Kein Druck auf Fotos – aber sie können natürlich später freiwillig gesendet werden

### Leistungsseite Messie:
- Hero-Button: "Unverbindlich anfragen" statt "Foto senden"
- PHOTO_GUIDE Hinweis wird nicht angezeigt
- Prozess-Schritte bleiben wie sie sind (bereits "Erstkontakt")

## Psychologische Begründung

Bei Messie-Situationen:
1. **Scham ist enorm** – Fotos zu senden fühlt sich wie eine Entblößung an
2. **Erster Schritt ist schwierig** – "Schreiben" ist niedrigschwelliger als "Foto senden"
3. **Vertrauen muss aufgebaut werden** – Erst Kontakt, dann Details
4. **Keine Vorurteile** – Der Prozess kommuniziert: "Wir hören zuerst zu"
