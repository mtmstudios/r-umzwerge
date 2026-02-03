// Service page data for all Leistungsseiten
import { Users, Warehouse, Building2, Lock, Trash2 } from 'lucide-react';

export interface ServiceScenario {
  title: string;
  description: string;
  emotionalHook: string;
  badges?: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ComparisonData {
  others: string[];
  raeumzwerge: string[];
}

export interface ExtraModulePoint {
  problem: string;
  solution: string;
}

export interface ServicePricingData {
  headline: string;
  subline: string;
}

export interface ServicePageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    h1: string;
    subline: string;
    trustPills: string[];
    imageSrc?: string;
    imageAlt?: string;
  };
  scenarios: ServiceScenario[];
  comparison: ComparisonData;
  extraModule: {
    title: string;
    subtitle?: string;
    points: ExtraModulePoint[];
  };
  faq: ServiceFAQ[];
  processSteps: {
    title: string;
    description: string;
  }[];
  pricing?: ServicePricingData;
  // For discrete services like Messie
  isDiscrete?: boolean;
  ctaText?: {
    whatsapp: string;
    whatsappShort: string;
  };
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  'wohnungsentruempelung': {
    slug: 'wohnungsentruempelung',
    title: 'Wohnungsentrümpelung',
    metaTitle: 'Wohnungsentrümpelung – sauber, diskret, transparent | Räumzwerge',
    metaDescription: 'Professionelle Wohnungsentrümpelung in Süddeutschland. Von der Preiseinschätzung bis zur besenreinen Übergabe. Festpreis nach Einschätzung möglich.',
    hero: {
      h1: 'Wohnungsentrümpelung – sauber, diskret, transparent.',
      subline: 'Von der ersten Preiseinschätzung bis zur besenreinen Übergabe – transparent, zuverlässig und respektvoll.',
      trustPills: ['Besenrein', 'Festpreis nach Einschätzung', 'Keine versteckten Kosten'],
      imageSrc: '/images/service-entruempelung-hero.png',
      imageAlt: 'Professionelles Räumzwerge-Team bei der Wohnungsentrümpelung',
    },
    scenarios: [
      { 
        title: 'Wohnungswechsel / Auszug', 
        emotionalHook: '"Alles muss raus – und zwar schnell."',
        description: 'Schnelle Räumung zum Festpreis, besenrein übergeben.',
        badges: ['Express möglich', 'Festpreis']
      },
      { 
        title: 'Nachlass / Erbschaft', 
        emotionalHook: '"So viel zu tun – und so wenig Zeit zum Trauern."',
        description: 'Respektvolle Auflösung, damit du dich auf das Wesentliche konzentrieren kannst.',
        badges: ['Einfühlsam', 'Diskret']
      },
      { 
        title: 'Renovierung / Umbau', 
        emotionalHook: '"Bevor es losgehen kann, muss erst mal Platz her."',
        description: 'Schnelles Räumen für einen pünktlichen Baustart.',
        badges: ['Termingerecht']
      },
      { 
        title: 'Mietwohnung übergeben', 
        emotionalHook: '"Der Vermieter wartet – die Kaution auch."',
        description: 'Besenrein übergeben, keine bösen Überraschungen.',
        badges: ['Besenrein garantiert']
      },
      { 
        title: 'Eigentumswechsel', 
        emotionalHook: '"Der Käufer will einziehen – aber die Wohnung ist noch voll."',
        description: 'Wohnung verkaufsfertig räumen, reibungslose Übergabe.',
        badges: ['Übergabeprotokoll']
      },
    ],
    comparison: {
      others: [
        'Unklare Preisgestaltung',
        'Lange Wartezeiten auf Angebot',
        'Keine Garantie auf besenrein',
        'Versteckte Zusatzkosten',
      ],
      raeumzwerge: [
        'Festpreis nach Foto-Einschätzung',
        'Antwort innerhalb 24h',
        'Besenrein garantiert',
        'Transparente Kommunikation',
      ],
    },
    extraModule: {
      title: 'Typische Stolpersteine',
      subtitle: 'Und wie wir sie für Sie lösen',
      points: [
        { problem: 'Zeitdruck durch Vermieter', solution: 'Express-Termine möglich, wir schaffen das!' },
        { problem: 'Was passiert mit meinen Sachen?', solution: 'Recycling, Spende oder Entsorgung – transparent dokumentiert.' },
        { problem: 'Zugang schwierig (Etage, Aufzug)', solution: 'Unser Team ist darauf spezialisiert.' },
      ],
    },
    faq: [
      { question: 'Wie viele Fotos braucht ihr?', answer: 'Am besten 3–6 Fotos: Gesamtübersicht plus Details. Dazu Ort und Etage/Zugang.' },
      { question: 'Kann ich auch ohne Vor-Ort-Termin einen Festpreis bekommen?', answer: 'Häufig ja – nach Einschätzung der Fotos ist oft ein Festpreis möglich.' },
      { question: 'Was ist besenrein genau?', answer: 'Grober Schmutz entfernt, Böden gefegt, alle Gegenstände entfernt. Keine Grundreinigung.' },
      { question: 'Wie schnell könnt ihr einen Termin machen?', answer: 'Oft innerhalb weniger Tage – abhängig von Umfang und Auslastung.' },
      { question: 'Muss ich beim Termin dabei sein?', answer: 'Nicht unbedingt – nach Absprache auch per Schlüsselübergabe möglich.' },
      { question: 'Gibt es versteckte Kosten?', answer: 'Nein. Wir kommunizieren transparent. Was im Angebot steht, gilt.' },
    ],
    processSteps: [
      { title: 'Foto senden', description: 'WhatsApp-Foto mit Ort und kurzer Beschreibung.' },
      { title: 'Einschätzung < 24h', description: 'Wir melden uns mit einer Preiseinschätzung.' },
      { title: 'Termin & besenrein', description: 'Durchführung zum Wunschtermin, besenreine Übergabe.' },
    ],
    pricing: {
      headline: 'Kosten Ihrer Wohnungsentrümpelung',
      subline: 'Transparent berechnet – nach Einschätzung oft Festpreis möglich.',
    },
  },

  'entruempelung': {
    slug: 'entruempelung',
    title: 'Entrümpelung',
    metaTitle: 'Entrümpelung – sauber, diskret, transparent | Räumzwerge',
    metaDescription: 'Professionelle Entrümpelung in Süddeutschland. Preiseinschätzung per WhatsApp-Foto innerhalb von 24h. Besenrein, Festpreis möglich.',
    hero: {
      h1: 'Entrümpelung – sauber, diskret, transparent.',
      subline: 'Preiseinschätzung per WhatsApp-Foto – innerhalb von 24 Stunden (oft schneller).',
      trustPills: ['Besenrein', 'Festpreis nach Einschätzung', 'Keine versteckten Kosten'],
      imageSrc: '/images/service-entruempelung-hero.png',
      imageAlt: 'Raeumzwerge-Team beim Demontieren von Moebeln und Sortieren in einem Wohnraum',
    },
    scenarios: [
      { 
        title: 'Wohnungswechsel / Auszug', 
        emotionalHook: '"Die neue Wohnung wartet – aber die alte ist noch voll."',
        description: 'Schnelle Räumung für einen stressfreien Umzug.',
        badges: ['Express möglich']
      },
      { 
        title: 'Nachlass / Erbschaft', 
        emotionalHook: '"Jetzt auch noch das Haus auflösen – wer soll das schaffen?"',
        description: 'Wir übernehmen das für dich, respektvoll und gründlich.',
        badges: ['Einfühlsam']
      },
      { 
        title: 'Renovierung / Umbau', 
        emotionalHook: '"Erst mal muss der ganze Krempel raus."',
        description: 'Platz schaffen für dein Projekt.',
        badges: ['Termingerecht']
      },
      { 
        title: 'Keller / Garage voll', 
        emotionalHook: '"Da kommt man ja nicht mal mehr durch!"',
        description: 'Endlich wieder nutzbar machen.',
        badges: ['Auch sperrige Teile']
      },
      { 
        title: 'Gewerbe-Auflösung', 
        emotionalHook: '"Das Geschäft ist zu – aber die Einrichtung noch da."',
        description: 'Effiziente Räumung, minimale Betriebsstörung.',
        badges: ['B2B-erfahren']
      },
    ],
    comparison: {
      others: [
        'Pauschale ohne Besichtigung',
        'Termine oft verschoben',
        'Müll bleibt zurück',
        'Keine Entsorgungsnachweise',
      ],
      raeumzwerge: [
        'Individuelle Einschätzung per Foto',
        'Zuverlässige Terminplanung',
        'Fachgerechte Entsorgung',
        'Dokumentation auf Wunsch',
      ],
    },
    extraModule: {
      title: 'Typische Stolpersteine',
      subtitle: 'Und wie wir sie für Sie lösen',
      points: [
        { problem: 'Menge schwer einzuschätzen', solution: '3-6 Fotos reichen für eine gute Einschätzung.' },
        { problem: 'Sondermüll vorhanden', solution: 'Elektro, Farben, Chemie – wir entsorgen fachgerecht.' },
        { problem: 'Enger Zugang / Treppen', solution: 'Kein Problem für unser erfahrenes Team.' },
      ],
    },
    faq: [
      { question: 'Wie viele Fotos braucht ihr?', answer: 'Am besten 3–6 Fotos: Gesamtübersicht plus Details. Dazu Ort und Etage/Zugang.' },
      { question: 'Kann ich auch ohne Vor-Ort-Termin einen Festpreis bekommen?', answer: 'Häufig ja – nach Einschätzung der Fotos ist oft ein Festpreis möglich.' },
      { question: 'Was ist besenrein genau?', answer: 'Grober Schmutz entfernt, Böden gefegt, alle Gegenstände entfernt. Keine Grundreinigung.' },
      { question: 'Wie schnell könnt ihr einen Termin machen?', answer: 'Oft innerhalb weniger Tage – abhängig von Umfang und Auslastung.' },
      { question: 'Muss ich beim Termin dabei sein?', answer: 'Nicht unbedingt – nach Absprache auch per Schlüsselübergabe möglich.' },
      { question: 'Gibt es versteckte Kosten?', answer: 'Nein. Wir kommunizieren transparent. Was im Angebot steht, gilt.' },
    ],
    processSteps: [
      { title: 'Foto senden', description: 'WhatsApp-Foto mit Ort und kurzer Beschreibung.' },
      { title: 'Einschätzung < 24h', description: 'Wir melden uns mit einer Preiseinschätzung.' },
      { title: 'Termin & besenrein', description: 'Durchführung zum Wunschtermin, besenreine Übergabe.' },
    ],
    pricing: {
      headline: 'So entsteht Ihr Entrümpelungspreis',
      subline: '5 Faktoren bestimmen den Preis – transparent und nachvollziehbar.',
    },
  },

  'haushaltsaufloesung': {
    slug: 'haushaltsaufloesung',
    title: 'Haushaltsauflösung',
    metaTitle: 'Haushaltsauflösung – respektvoll und zuverlässig | Räumzwerge',
    metaDescription: 'Haushaltsauflösung bei Nachlass, Umzug ins Pflegeheim oder Immobilienverkauf. Diskret, transparent, besenrein. Preiseinschätzung < 24h.',
    hero: {
      h1: 'Haushaltsauflösung – respektvoll und zuverlässig.',
      subline: 'Wir nehmen dir die Organisation ab – transparent, diskret, besenrein.',
      trustPills: ['Keine versteckten Kosten', 'Planbar', 'Diskret'],
      imageSrc: '/images/service-haushaltsaufloesung-hero.png',
      imageAlt: 'Raeumzwerge-Team beim Sortieren und Packen in einem hellen Wohnzimmer',
    },
    scenarios: [
      { 
        title: 'Nachlass / Todesfall', 
        emotionalHook: '"Oma ist gestorben – und jetzt muss alles aufgelöst werden."',
        description: 'Einfühlsame Auflösung, damit du Zeit zum Trauern hast.',
        badges: ['Einfühlsam', 'Diskret']
      },
      { 
        title: 'Umzug ins Pflegeheim', 
        emotionalHook: '"Papa zieht ins Heim – aber wer räumt die Wohnung?"',
        description: 'Strukturierte Auflösung ohne Zeitdruck.',
        badges: ['Planbar']
      },
      { 
        title: 'Verkauf / Übergabe', 
        emotionalHook: '"Das Haus ist verkauft – aber noch komplett eingerichtet."',
        description: 'Immobilie übergabefertig räumen.',
        badges: ['Termingerecht']
      },
      { 
        title: 'Auflösung nach Trennung', 
        emotionalHook: '"Einer muss gehen – und die Sachen auch."',
        description: 'Diskret und unkompliziert, ohne Drama.',
        badges: ['Diskret']
      },
    ],
    comparison: {
      others: [
        'Respektloser Umgang',
        'Zeitdruck und Hektik',
        'Wertgegenstände werden übersehen',
        'Aufsehen bei Nachbarn',
      ],
      raeumzwerge: [
        'Einfühlsame Vorgehensweise',
        'Flexible Terminplanung',
        'Wertanrechnung möglich',
        'Diskret und respektvoll',
      ],
    },
    extraModule: {
      title: 'Typische Stolpersteine',
      subtitle: 'Und wie wir sie für Sie lösen',
      points: [
        { problem: 'Emotionale Belastung', solution: 'Wir arbeiten einfühlsam und geben Ihnen Zeit.' },
        { problem: 'Wertgegenstände sortieren', solution: 'Wir helfen beim Identifizieren – Wertanrechnung möglich.' },
        { problem: 'Nachbarn sollen nichts merken', solution: 'Diskrete Kleidung, neutrale Fahrzeuge.' },
      ],
    },
    faq: [
      { question: 'Wie diskret arbeitet ihr?', answer: 'Sehr diskret. Neutrale Kleidung, keine auffälligen Beschriftungen, respektvoller Umgang.' },
      { question: 'Wie schnell ist ein Termin möglich?', answer: 'Oft innerhalb weniger Tage – wir versuchen, flexibel auf eure Situation einzugehen.' },
      { question: 'Kann ich nicht vor Ort sein?', answer: 'Kein Problem – Schlüsselübergabe und Abnahme per Foto/Protokoll möglich.' },
      { question: 'Was passiert mit Wertgegenständen?', answer: 'Nach Absprache: Wertanrechnung, Weitergabe oder ihr nehmt sie vorher mit.' },
      { question: 'Wie wird der Preis berechnet?', answer: 'Nach Umfang, Etage, Zugang und Sondermüll. Festpreis nach Einschätzung möglich.' },
      { question: 'Arbeitet ihr auch am Wochenende?', answer: 'Nach Absprache auch samstags möglich.' },
    ],
    processSteps: [
      { title: 'Kontakt aufnehmen', description: 'WhatsApp-Foto oder Anruf – wir melden uns schnell.' },
      { title: 'Einschätzung & Planung', description: 'Preiseinschätzung und Terminabstimmung.' },
      { title: 'Durchführung & Übergabe', description: 'Räumung, besenrein, Schlüsselübergabe.' },
    ],
    pricing: {
      headline: 'Kosten Ihrer Haushaltsauflösung',
      subline: 'Respektvoll kalkuliert – Wertanrechnung möglich.',
    },
  },

  'keller-dachboden-garage': {
    slug: 'keller-dachboden-garage',
    title: 'Keller / Dachboden / Garage',
    metaTitle: 'Keller, Dachboden oder Garage entrümpeln | Räumzwerge',
    metaDescription: 'Keller voll? Dachboden zugestellt? Wir schaffen Platz – schnell und unkompliziert. Preiseinschätzung < 24h, besenrein.',
    hero: {
      h1: 'Keller, Dachboden oder Garage entrümpeln – schnell wieder Platz.',
      subline: 'Foto senden, Preiseinschätzung < 24h, Termin – fertig.',
      trustPills: ['Auch enge Zugänge', 'Entsorgung inklusive', 'Besenrein'],
      imageSrc: '/images/service-keller.jpg',
      imageAlt: 'Räumzwerge-Team beim Sortieren und Verladen von Kartons in einer Garage',
    },
    scenarios: [
      { 
        title: 'Keller voll mit Sperrmüll', 
        emotionalHook: '"Da stapelt sich seit Jahren alles – man kommt nicht mehr durch."',
        description: 'Endlich wieder nutzbar machen.',
        badges: ['Auch Schwerlast']
      },
      { 
        title: 'Dachboden seit Jahren unberührt', 
        emotionalHook: '"Wer weiß, was da oben alles liegt..."',
        description: 'Platz schaffen, Überblick gewinnen.',
        badges: ['Enge Zugänge kein Problem']
      },
      { 
        title: 'Garage nicht mehr nutzbar', 
        emotionalHook: '"Das Auto steht draußen – die Garage ist voll."',
        description: 'Wieder Stellplatz oder Werkstatt.',
        badges: ['Schnell']
      },
      { 
        title: 'Baustellenreste', 
        emotionalHook: '"Die Renovierung ist durch – aber der Schutt noch da."',
        description: 'Schnell und sauber entsorgen.',
        badges: ['Baumaterial inklusive']
      },
    ],
    comparison: {
      others: [
        'Enge Zugänge werden abgelehnt',
        'Schwere Gegenstände kosten extra',
        'Sondermüll wird nicht mitgenommen',
        'Grober, schneller Umgang',
      ],
      raeumzwerge: [
        'Auch enge Treppen kein Problem',
        'Schwerlast inklusive',
        'Elektro und Sondermüll dabei',
        'Sorgfältige Arbeit',
      ],
    },
    extraModule: {
      title: 'Typische Stolpersteine',
      subtitle: 'Und wie wir sie für Sie lösen',
      points: [
        { problem: 'Enge Treppen, kein Aufzug', solution: 'Unser Team ist darauf spezialisiert – wir schaffen das!' },
        { problem: 'Parken/Zugang schwierig', solution: 'Wir finden immer eine Lösung – Halteverbot, Seitenstraße, etc.' },
        { problem: 'Schwere Gegenstände', solution: 'Wir haben die Ausrüstung und Erfahrung dafür.' },
      ],
    },
    faq: [
      { question: 'Muss ich vorher sortieren?', answer: 'Nein – sag uns nur, was bleiben soll. Den Rest erledigen wir.' },
      { question: 'Wie läuft das mit schweren Sachen?', answer: 'Wir haben die Ausrüstung und Erfahrung – auch für sperrige Gegenstände.' },
      { question: 'Kann das an einem Tag erledigt werden?', answer: 'Oft ja – abhängig vom Umfang. Wir schätzen das vorher ein.' },
      { question: 'Was kostet das ungefähr?', answer: 'Abhängig von Menge, Etage und Zugang. Festpreis nach Einschätzung möglich.' },
      { question: 'Nehmt ihr auch Elektrogeräte mit?', answer: 'Ja – Elektro und Sondermüll entsorgen wir fachgerecht.' },
      { question: 'Wie schnell könnt ihr kommen?', answer: 'Oft innerhalb weniger Tage – je nach Auslastung.' },
    ],
    processSteps: [
      { title: 'Fotos senden', description: '3–6 Fotos vom Keller/Dachboden/Garage + Ort.' },
      { title: 'Einschätzung < 24h', description: 'Schnelle Rückmeldung mit Preiseinschätzung.' },
      { title: 'Räumung & fertig', description: 'Termin, Räumung, besenrein – fertig.' },
    ],
    pricing: {
      headline: 'Preis für Ihre Kellerentrümpelung',
      subline: 'Schnell berechnet – auch bei schwierigem Zugang.',
    },
  },

  'gewerbe-buero-lager': {
    slug: 'gewerbe-buero-lager',
    title: 'Gewerbe / Büro / Lager',
    metaTitle: 'Gewerbe, Büro oder Lager räumen – planbar und effizient | Räumzwerge',
    metaDescription: 'Büroauflösung, Lagerräumung, Geschäftsauflösung. Zügig, diskret, auch außerhalb der Geschäftszeiten. Festpreis nach Einschätzung.',
    hero: {
      h1: 'Gewerbe, Büro oder Lager räumen – planbar und effizient.',
      subline: 'Klare Abstimmung, transparente Preise, termintreu – auch außerhalb der Geschäftszeiten.',
      trustPills: ['Minimale Betriebsstörung', 'Termintreu', 'Transparent'],
      imageSrc: '/images/service-gewerbe.jpg',
      imageAlt: 'Räumzwerge-Team bei der Büroauflösung mit Aktenkartons',
    },
    scenarios: [
      { 
        title: 'Büroauflösung / Umzug', 
        emotionalHook: '"Das neue Büro ist fertig – aber das alte noch voller Möbel."',
        description: 'Effiziente Räumung ohne Unterbrechung des Betriebs.',
        badges: ['Außerhalb Geschäftszeiten']
      },
      { 
        title: 'Lager bereinigen', 
        emotionalHook: '"Das Lager quillt über – niemand weiß mehr, was wo ist."',
        description: 'Platz schaffen, Ordnung wiederherstellen.',
        badges: ['Inventur-Hilfe']
      },
      { 
        title: 'Geschäftsauflösung', 
        emotionalHook: '"Der Laden schließt – aber wer räumt alles aus?"',
        description: 'Komplette Räumung bis besenrein.',
        badges: ['Alles aus einer Hand']
      },
      { 
        title: 'Flächenreduktion', 
        emotionalHook: '"Wir brauchen weniger Fläche – aber die alte ist noch voll."',
        description: 'Schnell räumen für den neuen Mietvertrag.',
        badges: ['Termingerecht']
      },
    ],
    comparison: {
      others: [
        'Nur während Geschäftszeiten',
        'Störung des laufenden Betriebs',
        'Keine Termingarantie',
        'Unflexibel bei Änderungen',
      ],
      raeumzwerge: [
        'Auch abends und am Wochenende',
        'Minimale Betriebsstörung',
        'Termintreue Abwicklung',
        'Flexible Anpassung',
      ],
    },
    extraModule: {
      title: 'Typische Stolpersteine',
      subtitle: 'Und wie wir sie für Sie lösen',
      points: [
        { problem: 'Betrieb darf nicht gestört werden', solution: 'Wir arbeiten außerhalb Ihrer Geschäftszeiten.' },
        { problem: 'Enge Zeitfenster', solution: 'Wir stimmen exakte Slots ab und halten sie ein.' },
        { problem: 'IT-Geräte und Datenträger', solution: 'Fachgerechte Entsorgung – Datenvernichtung obliegt Ihnen.' },
      ],
    },
    faq: [
      { question: 'Könnt ihr außerhalb der Geschäftszeiten arbeiten?', answer: 'Ja – nach Absprache auch abends oder am Wochenende.' },
      { question: 'Wie schnell könnt ihr starten?', answer: 'Oft kurzfristig möglich – abhängig von Umfang und Planung.' },
      { question: 'Gibt es Nachweise zur Entsorgung?', answer: 'Auf Wunsch stellen wir Entsorgungsnachweise aus.' },
      { question: 'Wie läuft die Terminplanung?', answer: 'Wir stimmen Zeitfenster genau ab – minimale Betriebsstörung.' },
      { question: 'Können auch IT-Geräte entsorgt werden?', answer: 'Ja – Elektrogeräte entsorgen wir fachgerecht. Datenvernichtung obliegt euch.' },
      { question: 'Bekomme ich einen festen Preis?', answer: 'Nach Einschätzung ist häufig ein Festpreis möglich.' },
    ],
    processSteps: [
      { title: 'Anfrage stellen', description: 'Fotos oder Begehungstermin vereinbaren.' },
      { title: 'Angebot erhalten', description: 'Klare Preiseinschätzung, oft Festpreis.' },
      { title: 'Umsetzung & Übergabe', description: 'Termingerechte Räumung, besenrein.' },
    ],
    pricing: {
      headline: 'Kosten Ihrer Gewerberäumung',
      subline: 'Planbar und transparent – Festpreis nach Einschätzung.',
    },
  },

  'messie-wohnungen': {
    slug: 'messie-wohnungen',
    title: 'Diskrete Reinigung & Entrümpelung',
    metaTitle: 'Diskrete Reinigung & Entrümpelung – respektvoll und geschützt | Räumzwerge',
    metaDescription: 'Diskrete Entrümpelung und Reinigung bei sensiblen Situationen. Respektvoll, ohne Aufsehen, mit klarer Kommunikation. Preiseinschätzung < 24h.',
    isDiscrete: true,
    ctaText: {
      whatsapp: 'Unverbindlich anfragen',
      whatsappShort: 'Anfragen',
    },
    hero: {
      h1: 'Diskrete Reinigung & Entrümpelung – respektvoll und geschützt.',
      subline: 'Wir arbeiten diskret, strukturiert und ohne Aufsehen. Preiseinschätzung per Foto möglich – innerhalb von 24 Stunden.',
      trustPills: ['Absolute Diskretion', 'Respektvoll', 'Geschütztes Vorgehen'],
      imageSrc: '/images/service-messie.jpg',
      imageAlt: 'Diskretes Team bei der sorgfältigen Arbeit',
    },
    scenarios: [
      { 
        title: 'Wohnung wieder bewohnbar machen', 
        emotionalHook: '"Es ist mir so peinlich – aber ich schaffe es nicht alleine."',
        description: 'Strukturierte Räumung ohne Wertung, mit Respekt.',
        badges: ['Ohne Wertung', 'Diskret']
      },
      { 
        title: 'Unterstützung für Angehörige', 
        emotionalHook: '"Mein Vater braucht Hilfe – aber er lässt niemanden rein."',
        description: 'Wir helfen einfühlsam und bauen Vertrauen auf.',
        badges: ['Einfühlsam']
      },
      { 
        title: 'Akute Übergabe / Zeitdruck', 
        emotionalHook: '"Der Vermieter hat eine Frist gesetzt – und die Zeit läuft."',
        description: 'Schnelle, diskrete Hilfe bei Zeitdruck.',
        badges: ['Express möglich']
      },
      { 
        title: 'Übergabefähig machen', 
        emotionalHook: '"Die Wohnung muss geräumt werden – aber niemand darf es sehen."',
        description: 'Besenrein für Vermieter/Käufer, ohne Aufsehen.',
        badges: ['Neutrale Fahrzeuge']
      },
    ],
    comparison: {
      others: [
        'Wertender, unsensibeler Umgang',
        'Keine Diskretion',
        'Aufsehen erregen',
        'Druck und Hektik',
      ],
      raeumzwerge: [
        'Ohne Wertung und mit Respekt',
        'Absolute Diskretion',
        'Neutrale Fahrzeuge und Kleidung',
        'Ihr Tempo zählt',
      ],
    },
    extraModule: {
      title: 'Typische Stolpersteine',
      subtitle: 'Und wie wir sie für Sie lösen',
      points: [
        { problem: 'Scham und Angst vor Verurteilung', solution: 'Wir arbeiten wertfrei und respektvoll – garantiert.' },
        { problem: 'Nachbarn könnten etwas merken', solution: 'Neutrale Kleidung, keine Logos, leises Arbeiten.' },
        { problem: 'Überforderung mit dem Ausmaß', solution: 'Wir begleiten Schritt für Schritt, in Ihrem Tempo.' },
      ],
    },
    faq: [
      { question: 'Wie diskret ist das wirklich?', answer: 'Maximal diskret. Neutrale Fahrzeuge, keine Beschriftungen, respektvolles Auftreten.' },
      { question: 'Muss die betroffene Person anwesend sein?', answer: 'Nicht unbedingt – wir können auch mit Angehörigen oder Betreuern arbeiten.' },
      { question: 'Wie wird der Umfang eingeschätzt?', answer: 'Per Fotos oder diskrete Begehung – je nach Situation.' },
      { question: 'Wie schnell könnt ihr helfen?', answer: 'Bei akuten Situationen versuchen wir, schnell zu reagieren.' },
      { question: 'Bietet ihr auch Reinigung an?', answer: 'Ja – Intensivreinigung und Desinfektion optional möglich.' },
      { question: 'Wie läuft die Kommunikation?', answer: 'Klar, respektvoll, ohne Druck. Wir hören zu und planen gemeinsam.' },
    ],
    processSteps: [
      { title: 'Erstkontakt', description: 'Diskreter Kontakt per WhatsApp oder Telefon.' },
      { title: 'Einschätzung', description: 'Fotos oder Begehung – vertraulich und respektvoll.' },
      { title: 'Umsetzung', description: 'Strukturierte Räumung, diskret, besenrein.' },
    ],
    pricing: {
      headline: 'Diskrete Preisgestaltung',
      subline: 'Vertraulich, ohne Druck – Einschätzung per Foto möglich.',
    },
  },
};

// Common badges for all service pages
export const COMMON_BADGES = [
  'Besenrein',
  'Festpreis möglich',
  'Keine versteckten Kosten',
  'Antwort < 24h',
];

// Photo guide message
export const PHOTO_GUIDE = 'Für eine gute Einschätzung brauchen wir 3–6 Fotos: Übersicht + Details, dazu Ort und Etage/Zugang.';
