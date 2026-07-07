// SEA Landing Page Data - Conversion-optimized content for Google Ads

export type SEAVariant = 'haushaltsaufloesung' | 'entruempelung' | 'messie-hilfe' | 'gewerbe';

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
    metaTitle: 'Einfühlsame Haushaltsauflösung | Räumzwerge',
    metaDescription: 'Respektvolle Haushaltsauflösung mit Festpreis. Pietätvoll, diskret, besenrein. Kostenlose Ersteinschätzung innerhalb von 24h.',
    headline: 'Einfühlsame Haushaltsauflösung – Respektvoll, Diskret, Besenrein.',
    subline: 'Beantworten Sie online wenige Fragen zum Objekt. Wir rufen Sie umgehend für eine kostenlose, pietätvolle Ersteinschätzung an.',
    trustPills: ['Pietätvoll & Diskret', 'Festpreis möglich', 'Besenrein & Übergabefertig'],
    painPoints: [
      {
        problem: 'Ein Angehöriger ist verstorben – und jetzt muss alles aufgelöst werden.',
        solution: 'Wir räumen respektvoll und einfühlsam, damit Sie Zeit zum Trauern haben.',
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
        { problem: 'Schnelles Abarbeiten ohne Rücksicht', solution: '100% Diskret & Pietätvoll' },
        { problem: 'Alles wird einfach entsorgt', solution: 'Wertanrechnung & Spenden möglich' },
        { problem: 'Wechselndes Personal', solution: 'Einfühlsames Team mit festem Ansprechpartner' },
        { problem: 'Nur grobe Räumung ohne Dokumentation', solution: 'Besenrein, dokumentiert & übergabefertig' },
        { problem: 'Unklare Kosten und Nachforderungen', solution: 'Festpreis-Garantie ohne versteckte Kosten' },
      ],
      badges: ['Pietätvoll', 'Festpreis-Garantie', 'Ein Ansprechpartner'],
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
    metaTitle: 'Diskrete Messie-Hilfe & Räumung | Räumzwerge',
    metaDescription: 'Diskrete und einfühlsame Messie-Hilfe ohne Vorurteile. 100% vertraulich, neutrale Fahrzeuge, sensibles Team. Kostenlose Ersteinschätzung.',
    headline: 'Diskrete Messie-Hilfe & Räumung – Einfühlsam, Schnell, Ohne Vorurteile.',
    subline: 'Wir kennen die Situation und helfen diskret. Beantworten Sie online wenige Fragen für eine kostenlose, streng vertrauliche Ersteinschätzung am Telefon.',
    trustPills: ['100% Diskret', 'Neutrale Fahrzeuge', 'Absolute Schweigepflicht'],
    painPoints: [
      {
        problem: 'Ich schäme mich so – niemand darf das sehen.',
        solution: 'Wir arbeiten diskret, ohne jede Wertung. Ihre Privatsphäre ist zu 100% geschützt.',
      },
      {
        problem: 'Was, wenn die Nachbarn etwas mitbekommen?',
        solution: 'Neutrale Kleidung, keine Logos auf Fahrzeugen. Niemand bemerkt etwas.',
      },
      {
        problem: 'Ich weiß nicht, wo ich anfangen soll – es ist einfach zu viel.',
        solution: 'Wir begleiten Sie Schritt für Schritt. Ein fester, vertrauter Ansprechpartner für alles.',
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
        answer: 'Ja, auf Wunsch übernehmen wir auch die Grundreinigung nach der Räumung. Fragen Sie einfach nach.',
      },
    ],
    ctaHeadline: 'Der erste Schritt ist der schwerste – wir gehen ihn mit Ihnen.',
    ctaSubline: 'Jetzt vertrauliche Anfrage starten – wir melden uns diskret innerhalb von 24h.',
    outcomeBadges: ['Diskret', 'Respektvoll', 'Ein neuer Anfang'],
    comparison: {
      headline: 'Warum Räumzwerge?',
      subline: 'Transparenter Vergleich',
      pairs: [
        { problem: 'Unverständnis & Vorurteile', solution: 'Ohne Vorurteile & 100% Diskret' },
        { problem: 'Fehlende Diskretion', solution: 'Absolute Schweigepflicht' },
        { problem: 'Auffällige Firmenfahrzeuge', solution: 'Neutrale Fahrzeuge auf Wunsch' },
        { problem: 'Versteckte Kosten & Nachforderungen', solution: 'Sensibles, geschultes Team mit Festpreis' },
      ],
      badges: ['100% Diskret', 'Ohne Wertung', 'Neutrale Fahrzeuge'],
    },
    tone: 'gentle',
  },
  'gewerbe': {
    slug: 'gewerbe',
    title: 'Gewerbeauflösung',
    metaTitle: 'Gewerbe-, Büro- & Lagerauflösung | Räumzwerge',
    metaDescription: 'Professionelle Gewerbe-, Büro- und Lagerräumung zum Festpreis. Diskret, schnell, besenrein & übergabefertig. Kostenloses Angebot innerhalb von 24h.',
    headline: 'Gewerbe, Büro & Lager professionell räumen – Schnell, Diskret, Übergabefertig.',
    subline: 'Ob Insolvenz, Umzug oder Mieterwechsel: Wir räumen Ihr Gewerbeobjekt zuverlässig – auch außerhalb der Geschäftszeiten. Angebot innerhalb von 24h.',
    trustPills: ['Auch am Wochenende', 'Festpreis möglich', 'Übergabefertig zum Stichtag'],
    painPoints: [
      {
        problem: 'Der Mietvertrag läuft aus – die Fläche muss termingerecht leer übergeben werden.',
        solution: 'Wir arbeiten strikt nach Ihrem Stichtag – auch nachts oder am Wochenende.',
      },
      {
        problem: 'Alte Büromöbel, Akten, IT-Geräte – wohin damit?',
        solution: 'Fachgerechte Entsorgung inkl. DSGVO-konformer Aktenvernichtung und Elektroschrott.',
      },
      {
        problem: 'Insolvenz oder Betriebsauflösung – alles muss schnell und diskret weg.',
        solution: 'Diskrete Abwicklung, Wertanrechnung von Inventar & Maschinen möglich.',
      },
    ],
    testimonial: {
      text: 'Wir mussten unser Büro innerhalb von 5 Tagen räumen. Die Räumzwerge haben alles organisiert – Möbel, Akten, IT. Absolut zuverlässig und pünktlich zur Übergabe.',
      author: 'Michael B., Geschäftsführer',
    },
    faqs: [
      {
        question: 'Räumt ihr auch außerhalb der Geschäftszeiten?',
        answer: 'Ja, auf Wunsch räumen wir auch abends, nachts oder am Wochenende – ohne Aufpreis-Überraschungen.',
      },
      {
        question: 'Was passiert mit alten Akten und Datenträgern?',
        answer: 'Wir sorgen für DSGVO-konforme Aktenvernichtung und fachgerechte Entsorgung von IT-Geräten inkl. Nachweis.',
      },
      {
        question: 'Könnt ihr auch Maschinen und Betriebsausstattung übernehmen?',
        answer: 'Ja. Verwertbares Inventar rechnen wir gerne an und reduzieren damit Ihren Räumpreis.',
      },
      {
        question: 'Ist ein Festpreis möglich?',
        answer: 'In den meisten Fällen ja. Nach einer kurzen Einschätzung erhalten Sie einen verbindlichen Festpreis ohne versteckte Kosten.',
      },
    ],
    ctaHeadline: 'Jetzt Festpreis für Ihre Gewerberäumung anfragen',
    ctaSubline: 'Anfrage starten – innerhalb von 24h haben Sie Ihr Angebot.',
    outcomeBadges: ['Übergabefertig', 'Fachgerecht entsorgt', 'Schnell erledigt'],
    comparison: {
      headline: 'Warum Räumzwerge für Ihre Gewerberäumung?',
      subline: 'Transparenter Vergleich',
      pairs: [
        { problem: 'Nur Standard-Arbeitszeiten', solution: 'Auch nachts & am Wochenende' },
        { problem: 'Akten landen im normalen Müll', solution: 'DSGVO-konforme Aktenvernichtung' },
        { problem: 'Alles wird pauschal entsorgt', solution: 'Wertanrechnung von Inventar & Maschinen' },
        { problem: 'Grobe Räumung ohne Übergabe', solution: 'Besenrein & übergabefertig zum Stichtag' },
        { problem: 'Unklare Kosten', solution: 'Festpreis-Garantie ohne versteckte Kosten' },
      ],
      badges: ['Termintreu', 'DSGVO-konform', 'Festpreis'],
    },
    tone: 'direct',
  },
};

export const getSeaData = (slug: string): SEAData | undefined => {
  return seaData[slug as SEAVariant];
};

export const isValidSeaSlug = (slug: string): slug is SEAVariant => {
  return ['haushaltsaufloesung', 'entruempelung', 'messie-hilfe', 'gewerbe'].includes(slug);
};
