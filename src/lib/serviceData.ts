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
  scope: {
    included: string[];
    optional: string[];
  };
  extraModule: {
    title: string;
    subtitle?: string;
    points: string[];
  };
  faq: ServiceFAQ[];
  processSteps: {
    title: string;
    description: string;
  }[];
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
      imageSrc: '/images/service-wohnungsentruempelung.jpg',
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
    scope: {
      included: [
        'Sortieren, Tragen, Abtransport',
        'Fachgerechte Entsorgung',
        'Besenreine Übergabe',
        'Terminabstimmung',
      ],
      optional: [
        'Demontage von Möbeln/Einbauten',
        'Sondermüll / Elektrogeräte',
        'Dokumentation (Fotos)',
        'Express-Termin',
      ],
    },
    extraModule: {
      title: 'Was passiert mit den Sachen?',
      subtitle: 'Transparenz ist uns wichtig. Deshalb zeigen wir dir genau, was mit jedem Gegenstand passiert.',
      points: [
        'Recyclingfähiges wird fachgerecht getrennt',
        'Brauchbares kann nach Absprache gespendet werden',
        'Rest wird über zertifizierte Partner entsorgt',
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
      imageSrc: '/images/service-entruempelung.jpg',
      imageAlt: 'Professionelles Team beim Verladen von Kartons in einen Transporter',
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
    scope: {
      included: [
        'Sortieren, Tragen, Abtransport',
        'Fachgerechte Entsorgung',
        'Besenreine Übergabe',
        'Terminabstimmung',
      ],
      optional: [
        'Demontage von Möbeln/Einbauten',
        'Sondermüll / Elektrogeräte',
        'Dokumentation (Fotos)',
        'Express-Termin',
      ],
    },
    extraModule: {
      title: 'Was passiert mit den Sachen?',
      subtitle: 'Transparenz ist uns wichtig.',
      points: [
        'Recyclingfähiges wird fachgerecht getrennt',
        'Brauchbares kann nach Absprache gespendet werden',
        'Rest wird über zertifizierte Partner entsorgt',
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
      imageSrc: '/images/service-haushaltsaufloesung.jpg',
      imageAlt: 'Wohnzimmer wird sorgfältig für die Haushaltsauflösung vorbereitet',
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
    scope: {
      included: [
        'Terminplanung nach deinen Wünschen',
        'Sorgfältiges, respektvolles Vorgehen',
        'Abtransport und Entsorgung',
        'Besenreine Übergabe',
      ],
      optional: [
        'Wertanrechnung / Weitergabe',
        'Schlüsselübergabe ohne Anwesenheit',
        'Enge Zeitfenster / Express',
        'Dokumentation',
      ],
    },
    extraModule: {
      title: 'So läuft die Übergabe',
      subtitle: 'Klar strukturiert, ohne Überraschungen.',
      points: [
        'Abnahme gemeinsam oder per Schlüssel (nach Absprache)',
        'Besenrein-Standard garantiert',
        'Transparente Auflistung aller Leistungen',
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
    scope: {
      included: [
        'Tragen und Abtransport',
        'Fachgerechte Entsorgung',
        'Besenreine Übergabe',
        'Terminabstimmung',
      ],
      optional: [
        'Demontage von Regalen/Einbauten',
        'Sortierhilfe (Behalten/Kann weg)',
        'Sondermüll / Elektro',
        'Express-Termin',
      ],
    },
    extraModule: {
      title: 'Typische Stolpersteine – und wie wir sie lösen',
      subtitle: 'Wir haben für alles eine Lösung.',
      points: [
        'Enge Treppen, kein Aufzug – kein Problem für unser Team',
        'Parken/Zugang schwierig – wir finden eine Lösung',
        'Schwere Gegenstände – wir haben die Ausrüstung',
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
      imageAlt: 'Leeres Büro nach professioneller Gewerberäumung',
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
    scope: {
      included: [
        'Terminfensterplanung nach Bedarf',
        'Zügige, professionelle Abwicklung',
        'Abtransport und Entsorgung',
        'Besenreine Übergabe',
      ],
      optional: [
        'Arbeiten außerhalb der Geschäftszeiten',
        'Datenträger-Hinweise (organisatorisch)',
        'Dokumentation / Protokoll',
        'Teilräumung in Etappen',
      ],
    },
    extraModule: {
      title: 'Ablauf für Unternehmen',
      subtitle: 'Professionell und planbar.',
      points: [
        'Fotos/Begehung zur Einschätzung',
        'Angebot / Festpreis nach Einschätzung',
        'Durchführung in abgestimmten Slots',
        'Übergabe mit Protokoll (optional)',
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
  },

  'messie-wohnungen': {
    slug: 'messie-wohnungen',
    title: 'Diskrete Reinigung & Entrümpelung',
    metaTitle: 'Diskrete Reinigung & Entrümpelung – respektvoll und geschützt | Räumzwerge',
    metaDescription: 'Diskrete Entrümpelung und Reinigung bei sensiblen Situationen. Respektvoll, ohne Aufsehen, mit klarer Kommunikation. Preiseinschätzung < 24h.',
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
    scope: {
      included: [
        'Absolute Diskretion',
        'Strukturierte Vorgehensweise',
        'Abtransport und Entsorgung',
        'Besenreine Übergabe',
      ],
      optional: [
        'Intensivreinigung',
        'Geruchsneutralisierung / Desinfektion',
        'Etappenplan (mehrere Termine)',
        'Begleitung durch Fachpersonal',
      ],
    },
    extraModule: {
      title: 'Diskret heißt bei uns',
      subtitle: 'Deine Privatsphäre hat höchste Priorität.',
      points: [
        'Neutrale Kleidung und Fahrzeuge – kein Aufsehen',
        'Leise, respektvolle Kommunikation',
        'Klare Absprachen, keine Überraschungen',
        'Schutz der Privatsphäre hat höchste Priorität',
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
