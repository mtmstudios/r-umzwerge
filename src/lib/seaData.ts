// SEA Landing Page Data - Conversion-optimized content for Google Ads

export type SEAVariant = 'haushaltsaufloesung' | 'entruempelung' | 'messie-hilfe';

export interface SEAPainPoint {
  problem: string;
  solution: string;
}

export interface SEAFaqItem {
  question: string;
  answer: string;
}

export interface SEAComparisonData {
  headline: string;
  subline: string;
  pairs: Array<{ problem: string; solution: string }>;
  badges: string[];
}

export interface SEAData {
  slug: SEAVariant;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subline: string;
  trustPills: string[];
  painPoints: SEAPainPoint[];
  testimonial: {
    text: string;
    author: string;
  };
  faqs: SEAFaqItem[];
  ctaHeadline: string;
  ctaSubline: string;
  outcomeBadges: string[];
  comparison?: SEAComparisonData;
  // Variant-specific styling
  tone: 'warm' | 'direct' | 'gentle';
}

export const seaData: Record<SEAVariant, SEAData> = {
  'haushaltsaufloesung': {
    slug: 'haushaltsaufloesung',
    title: 'Haushaltsauflösung',
    metaTitle: 'Haushaltsauflösung komplett | Räumzwerge',
    metaDescription: 'Einfühlsame Haushaltsauflösung mit Festpreis. Besenrein, respektvoll, schnelle Preiseinschätzung innerhalb von 24h.',
    headline: 'Haushaltsauflösung komplett – wir nehmen Ihnen alles ab.',
    subline: 'Beantworten Sie online wenige Fragen und erhalten Sie in unter 24h Ihr Festpreis-Angebot.',
    trustPills: ['Einfühlsam', 'Festpreis möglich', 'Besenrein'],
    painPoints: [
      {
        problem: 'Ein Angehöriger ist verstorben – und jetzt muss alles aufgelöst werden.',
        solution: 'Wir räumen respektvoll, damit Sie Zeit zum Trauern haben.',
      },
      {
        problem: 'Umzug ins Pflegeheim – aber wer kümmert sich um die Wohnung?',
        solution: 'Strukturierte Auflösung ohne Zeitdruck, alles aus einer Hand.',
      },
      {
        problem: 'Die Immobilie muss verkauft werden – aber sie ist noch voll.',
        solution: 'Übergabefertig in wenigen Tagen, besenrein und dokumentiert.',
      },
    ],
    testimonial: {
      text: 'Nach dem Tod meiner Mutter wusste ich nicht, wie ich das alles schaffen soll. Die Räumzwerge haben mir wirklich alles abgenommen – respektvoll und professionell.',
      author: 'Sabine R.',
    },
    faqs: [
      {
        question: 'Wie schnell bekomme ich einen Termin?',
        answer: 'In der Regel innerhalb weniger Tage. Bei dringenden Fällen oft noch schneller – sprechen Sie uns einfach an.',
      },
      {
        question: 'Gibt es versteckte Kosten?',
        answer: 'Nein. Sie erhalten eine transparente Preiseinschätzung. Häufig ist ein Festpreis möglich, der alle Leistungen abdeckt.',
      },
      {
        question: 'Was passiert mit Wertgegenständen?',
        answer: 'Wertgegenstände können auf Wunsch angerechnet werden. Wir gehen respektvoll und transparent mit allem um.',
      },
      {
        question: 'Muss ich dabei sein?',
        answer: 'Nein, das ist nicht notwendig. Viele Kunden übergeben uns die Schlüssel und wir erledigen alles eigenständig.',
      },
    ],
    ctaHeadline: 'Jetzt unverbindlich anfragen',
    ctaSubline: 'Jetzt online Anfrage starten – in 24h wissen Sie, was es kostet.',
    outcomeBadges: ['Besenrein', 'Übergabefertig', 'Respektvoll geräumt'],
    comparison: {
      headline: 'Warum Räumzwerge für Ihre Haushaltsauflösung?',
      subline: 'Transparenter Vergleich',
      pairs: [
        { problem: 'Schnelles Abarbeiten ohne Rücksicht', solution: 'Einfühlsame Begleitung in schweren Zeiten' },
        { problem: 'Alles wird einfach entsorgt', solution: 'Wertanrechnung und Spenden möglich' },
        { problem: 'Wechselndes Personal', solution: 'Ein fester Ansprechpartner für alles' },
        { problem: 'Nur grobe Räumung', solution: 'Besenrein und dokumentiert' },
      ],
      badges: ['Respektvoll', 'Wertanrechnung möglich', 'Ein Ansprechpartner'],
    },
    tone: 'warm',
  },

  'entruempelung': {
    slug: 'entruempelung',
    title: 'Entrümpelung',
    metaTitle: 'Entrümpelung zum Festpreis | Räumzwerge',
    metaDescription: 'Schnelle Entrümpelung zum transparenten Festpreis. Online anfragen, Preis erhalten, besenrein garantiert.',
    headline: 'Stressfreie Entrümpelung – Sauber, Diskret, Besenrein.',
    subline: 'Beantworten Sie online wenige Fragen und erhalten Sie in unter 24h Ihr Festpreis-Angebot.',
    trustPills: ['Antwort < 24h', 'Besenrein', 'Keine versteckten Kosten'],
    painPoints: [
      {
        problem: 'Kein Platz mehr – alles voll, man kommt kaum noch durch.',
        solution: 'Wir schaffen Ordnung – oft an nur einem Tag.',
      },
      {
        problem: 'Keine Zeit, das alles selbst zu machen.',
        solution: 'Wir übernehmen alles: Sortieren, Tragen, Entsorgen.',
      },
      {
        problem: 'Was kostet das überhaupt? Keine Lust auf böse Überraschungen.',
        solution: 'Transparenter Festpreis nach Einschätzung. Keine versteckten Kosten.',
      },
    ],
    testimonial: {
      text: 'Schnelle Terminvergabe, faire Preise und super nettes Team. Alles perfekt gelaufen!',
      author: 'Anna K.',
    },
    faqs: [
      {
        question: 'Wie läuft die Preiseinschätzung ab?',
        answer: 'Starten Sie einfach unsere kostenlose Angebots-Berechnung online. Wir melden uns innerhalb von 24 Stunden mit einer Einschätzung.',
      },
      {
        question: 'Wie schnell könnt ihr kommen?',
        answer: 'Oft innerhalb weniger Tage. Bei dringenden Fällen sprechen Sie uns an – wir finden eine Lösung.',
      },
      {
        question: 'Was ist im Preis enthalten?',
        answer: 'Räumung, Transport, fachgerechte Entsorgung und besenreine Übergabe – alles aus einer Hand.',
      },
      {
        question: 'Gibt es versteckte Kosten?',
        answer: 'Nein. Der genannte Preis ist verbindlich. Keine Überraschungen.',
      },
    ],
    ctaHeadline: 'Jetzt Festpreis anfragen',
    ctaSubline: 'Jetzt online Anfrage starten – in 24h wissen Sie, was es kostet.',
    outcomeBadges: ['Besenrein', 'Schnell erledigt', 'Fachgerecht entsorgt'],
    comparison: {
      headline: 'Warum Räumzwerge für Ihre Entrümpelung?',
      subline: 'Transparenter Vergleich',
      pairs: [
        { problem: 'Preisschätzung nur vor Ort', solution: 'Online-Einschätzung in unter 24h' },
        { problem: 'Versteckte Zusatzkosten', solution: 'Transparenter Festpreis möglich' },
        { problem: 'Grob geräumt', solution: 'Besenrein garantiert' },
        { problem: 'Lange Wartezeiten', solution: 'Schnelle Terminvergabe' },
      ],
      badges: ['Festpreis möglich', 'Besenrein', 'Schnelle Termine'],
    },
    tone: 'direct',
  },

  'messie-hilfe': {
    slug: 'messie-hilfe',
    title: 'Diskrete Hilfe',
    metaTitle: 'Diskrete Messie-Hilfe | Räumzwerge',
    metaDescription: 'Diskrete und respektvolle Hilfe bei Messie-Situationen. Ohne Vorurteile, 100% vertraulich, neutrale Fahrzeuge.',
    headline: 'Diskrete Hilfe bei Messie-Situationen – ohne Vorurteile.',
    subline: 'Beantworten Sie online wenige Fragen und erhalten Sie in unter 24h Ihr Festpreis-Angebot.',
    trustPills: ['100% Diskret', 'Neutrale Fahrzeuge', 'Ein Ansprechpartner'],
    painPoints: [
      {
        problem: 'Ich schäme mich so – niemand darf das sehen.',
        solution: 'Wir arbeiten diskret und ohne jede Wertung. Ihre Privatsphäre ist geschützt.',
      },
      {
        problem: 'Was, wenn die Nachbarn etwas mitbekommen?',
        solution: 'Neutrale Kleidung, keine Firmenlogos auf Fahrzeugen. Kein Aufsehen.',
      },
      {
        problem: 'Ich weiß nicht, wo ich anfangen soll.',
        solution: 'Wir begleiten Sie Schritt für Schritt. Ein fester Ansprechpartner für alles.',
      },
    ],
    testimonial: {
      text: 'Ich hatte so große Angst vor diesem Schritt. Aber das Team war so verständnisvoll und hat mir wirklich geholfen. Danke.',
      author: 'Anonym',
    },
    faqs: [
      {
        question: 'Wie diskret arbeitet ihr wirklich?',
        answer: 'Absolut diskret. Neutrale Fahrzeuge ohne Firmenlogo, normale Kleidung, keine Aufmerksamkeit in der Nachbarschaft.',
      },
      {
        question: 'Muss die betroffene Person dabei sein?',
        answer: 'Nein, nicht zwingend. Wir können auch mit Angehörigen oder Betreuern zusammenarbeiten.',
      },
      {
        question: 'Wie schnell könnt ihr helfen?',
        answer: 'Wir melden uns innerhalb von 24 Stunden. Den Zeitrahmen besprechen wir gemeinsam – ganz ohne Druck.',
      },
      {
        question: 'Bietet ihr auch Reinigung an?',
        answer: 'Ja, auf Wunsch übernehmen wir auch die Reinigung nach der Räumung. Fragen Sie einfach nach.',
      },
    ],
    ctaHeadline: 'Unverbindlich Kontakt aufnehmen',
    ctaSubline: 'Jetzt online Anfrage starten – in 24h wissen Sie, was es kostet.',
    outcomeBadges: ['Diskret', 'Respektvoll', 'Ein neuer Anfang'],
    comparison: {
      headline: 'Warum Räumzwerge?',
      subline: 'Transparenter Vergleich',
      pairs: [
        { problem: 'Auffällige Firmenfahrzeuge', solution: 'Neutrale Fahrzeuge auf Wunsch' },
        { problem: 'Schnelle Urteile, Druck', solution: 'Keine Wertung, kein Zeitdruck' },
        { problem: 'Wechselndes Team', solution: 'Ein vertrauter Ansprechpartner' },
        { problem: 'Unpersönliche Abwicklung', solution: 'Respektvolle Begleitung Schritt für Schritt' },
      ],
      badges: ['100% Diskret', 'Ohne Wertung', 'Neutrale Fahrzeuge'],
    },
    tone: 'gentle',
  },
};

export const getSeaData = (slug: string): SEAData | undefined => {
  return seaData[slug as SEAVariant];
};

export const isValidSeaSlug = (slug: string): slug is SEAVariant => {
  return ['haushaltsaufloesung', 'entruempelung', 'messie-hilfe'].includes(slug);
};
