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
  // Variant-specific styling
  tone: 'warm' | 'direct' | 'gentle';
  // Hero image
  heroImage: string;
  heroImageAlt: string;
  // Before/After images (optional)
  beforeImage?: string;
  beforeImageAlt?: string;
  afterImage?: string;
  afterImageAlt?: string;
}

export const seaData: Record<SEAVariant, SEAData> = {
  'haushaltsaufloesung': {
    slug: 'haushaltsaufloesung',
    title: 'Haushaltsauflösung',
    metaTitle: 'Haushaltsauflösung komplett | Räumzwerge',
    metaDescription: 'Einfühlsame Haushaltsauflösung mit Festpreis. Besenrein, respektvoll, schnelle Preiseinschätzung per WhatsApp.',
    headline: 'Haushaltsauflösung komplett – wir nehmen Ihnen alles ab.',
    subline: 'Einfühlsam, respektvoll und besenrein. Preiseinschätzung per WhatsApp-Foto innerhalb von 24 Stunden.',
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
    ctaSubline: 'Foto senden – Preiseinschätzung innerhalb von 24h.',
    outcomeBadges: ['Besenrein', 'Übergabefertig', 'Respektvoll geräumt'],
    tone: 'warm',
    heroImage: '/images/sea-hero-team.png',
    heroImageAlt: 'Räumzwerge-Team beim professionellen Beladen des Transporters',
    beforeImage: '/images/haushaltsaufloesung-vorher.png',
    beforeImageAlt: 'Wohnung vor der Haushaltsauflösung - voller Kartons und Gegenstände',
    afterImage: '/images/haushaltsaufloesung-nachher.png',
    afterImageAlt: 'Wohnung nach der Haushaltsauflösung - besenrein und übergabefertig',
  },

  'entruempelung': {
    slug: 'entruempelung',
    title: 'Entrümpelung',
    metaTitle: 'Entrümpelung zum Festpreis | Räumzwerge',
    metaDescription: 'Schnelle Entrümpelung zum transparenten Festpreis. Foto senden, Preis erhalten, besenrein garantiert.',
    headline: 'Entrümpelung zum Festpreis – schnell, sauber, transparent.',
    subline: 'Foto senden, Preis erhalten, Termin machen. Besenrein garantiert.',
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
        solution: 'Transparenter Festpreis nach Foto-Einschätzung. Keine versteckten Kosten.',
      },
    ],
    testimonial: {
      text: 'Schnelle Terminvergabe, faire Preise und super nettes Team. Alles perfekt gelaufen!',
      author: 'Anna K.',
    },
    faqs: [
      {
        question: 'Wie läuft die Preiseinschätzung ab?',
        answer: 'Einfach: Senden Sie uns Fotos per WhatsApp. Wir melden uns innerhalb von 24 Stunden mit einer Einschätzung.',
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
    ctaSubline: 'Foto senden – in 24h wissen Sie, was es kostet.',
    outcomeBadges: ['Besenrein', 'Schnell erledigt', 'Fachgerecht entsorgt'],
    tone: 'direct',
    heroImage: '/images/sea-hero-team.png',
    heroImageAlt: 'Räumzwerge-Team beim professionellen Beladen des Transporters',
    beforeImage: '/images/entruempelung-vorher.png',
    beforeImageAlt: 'Wohnung vor der Entrümpelung - voll mit Kartons und Müllsäcken',
    afterImage: '/images/entruempelung-nachher.png',
    afterImageAlt: 'Wohnung nach der Entrümpelung - besenrein und leer',
  },

  'messie-hilfe': {
    slug: 'messie-hilfe',
    title: 'Diskrete Hilfe',
    metaTitle: 'Diskrete Messie-Hilfe | Räumzwerge',
    metaDescription: 'Diskrete und respektvolle Hilfe bei Messie-Situationen. Ohne Vorurteile, 100% vertraulich, neutrale Fahrzeuge.',
    headline: 'Diskrete Hilfe bei Messie-Situationen – ohne Vorurteile.',
    subline: 'Wir verstehen. Keine Verurteilung, keine neugierigen Blicke. 100% diskret und respektvoll.',
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
    ctaSubline: 'Wir hören zu. Kein Druck, keine Wertung.',
    outcomeBadges: ['Diskret', 'Respektvoll', 'Ein neuer Anfang'],
    tone: 'gentle',
    heroImage: '/images/sea-hero-team.png',
    heroImageAlt: 'Räumzwerge-Team beim professionellen Beladen des Transporters',
    beforeImage: '/images/messie-vorher.png',
    beforeImageAlt: 'Zimmer vor der Messie-Räumung - voll mit Gegenständen',
    afterImage: '/images/messie-nachher.png',
    afterImageAlt: 'Zimmer nach der Messie-Räumung - sauber und besenrein',
  },
};

export const getSeaData = (slug: string): SEAData | undefined => {
  return seaData[slug as SEAVariant];
};

export const isValidSeaSlug = (slug: string): slug is SEAVariant => {
  return ['haushaltsaufloesung', 'entruempelung', 'messie-hilfe'].includes(slug);
};
