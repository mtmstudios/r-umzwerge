// City-specific SEO data for regional landing pages

export interface CityService {
  h2: string;
  description: string;
  link: string;
}

export interface CityFAQItem {
  question: string;
  answer: string;
}

export interface CityPageData {
  slug: string;
  name: string;
  region: string;
  bundesland: string;
  isHQ: boolean;
  metaTitle: string;
  metaDescription: string;
  hero: {
    h1: string;
    subline: string;
    trustPills: string[];
    imageAlt: string;
  };
  services: {
    entruempelung: CityService;
    haushaltsaufloesung: CityService;
    messie: CityService;
  };
  faq: CityFAQItem[];
  nearbyAreas: string[];
}

export const CITY_PAGES: Record<string, CityPageData> = {
  ulm: {
    slug: "ulm",
    name: "Ulm",
    region: "Alb-Donau-Kreis",
    bundesland: "Baden-Württemberg",
    isHQ: true,
    metaTitle: "Entrümpelung Ulm – Haushaltsauflösung & Messie-Hilfe | Räumzwerge",
    metaDescription: "Professionelle Entrümpelung in Ulm und Umgebung. Haushaltsauflösung, Wohnungsentrümpelung & diskrete Messie-Reinigung. ✓ Festpreis möglich ✓ Besenrein ✓ Antwort < 24h",
    hero: {
      h1: "Entrümpelung in Ulm – Ihr lokales Räumzwerge-Team",
      subline: "Von unserem Hauptsitz in Nersingen aus sind wir in Ulm und dem gesamten Alb-Donau-Kreis für Sie da. Schnell, diskret, besenrein.",
      trustPills: ["Hauptsitz in Nersingen", "Antwort < 24h", "Besenrein garantiert"],
      imageAlt: "Räumzwerge Entrümpelung Team in Ulm beim Verladen von Möbeln",
    },
    services: {
      entruempelung: {
        h2: "Wohnungsentrümpelung in Ulm",
        description: "Komplette Wohnungsentrümpelung in Ulm und Neu-Ulm. Von der Einschätzung bis zur besenreinen Übergabe – alles aus einer Hand. Wir kennen die lokalen Gegebenheiten und sind schnell vor Ort.",
        link: "/leistungen/wohnungsentruempelung",
      },
      haushaltsaufloesung: {
        h2: "Haushaltsauflösung in Ulm",
        description: "Respektvolle Haushaltsauflösung in Ulm bei Erbschaft, Umzug ins Pflegeheim oder Wohnungsverkauf. Wertgegenstände werden auf Wunsch angerechnet.",
        link: "/leistungen/haushaltsaufloesung",
      },
      messie: {
        h2: "Diskrete Messie-Hilfe in Ulm",
        description: "Sensible Situationen erfordern besonderes Fingerspitzengefühl. Wir arbeiten in Ulm absolut diskret mit neutralen Fahrzeugen – ohne Aufsehen in der Nachbarschaft.",
        link: "/leistungen/messie-wohnungen",
      },
    },
    faq: [
      {
        question: "Wie schnell seid ihr in Ulm vor Ort?",
        answer: "Als lokales Team mit Hauptsitz in Nersingen sind wir in der Regel innerhalb von 24-48 Stunden in Ulm vor Ort. Bei dringenden Fällen oft noch schneller.",
      },
      {
        question: "Arbeitet ihr auch im Alb-Donau-Kreis?",
        answer: "Ja, wir decken den gesamten Alb-Donau-Kreis ab – von Ehingen über Blaubeuren bis Langenau. Ulm und Neu-Ulm sind unser Kerngebiet.",
      },
      {
        question: "Gibt es einen Vor-Ort-Termin in Ulm?",
        answer: "Für größere Projekte bieten wir kostenlose Vor-Ort-Termine in Ulm an. Für kleinere Aufträge reicht oft eine Einschätzung per WhatsApp-Foto.",
      },
      {
        question: "Was kostet eine Entrümpelung in Ulm?",
        answer: "Die Kosten hängen von Umfang, Etage und Entsorgungsaufwand ab. Senden Sie uns Fotos per WhatsApp für eine unverbindliche Einschätzung innerhalb von 24 Stunden.",
      },
    ],
    nearbyAreas: ["Neu-Ulm", "Blaubeuren", "Ehingen", "Langenau", "Laupheim"],
  },

  augsburg: {
    slug: "augsburg",
    name: "Augsburg",
    region: "Schwaben",
    bundesland: "Bayern",
    isHQ: false,
    metaTitle: "Entrümpelung Augsburg – Haushaltsauflösung & Messie-Hilfe | Räumzwerge",
    metaDescription: "Professionelle Entrümpelung in Augsburg. Haushaltsauflösung, Wohnungsentrümpelung & diskrete Messie-Reinigung. ✓ Festpreis möglich ✓ Besenrein ✓ Antwort < 24h",
    hero: {
      h1: "Entrümpelung in Augsburg – Zuverlässig & Besenrein",
      subline: "Ihr Räumzwerge-Team für Augsburg und Schwaben. Professionelle Entrümpelung mit transparenten Preisen und schneller Umsetzung.",
      trustPills: ["Einsatz in ganz Schwaben", "Festpreis möglich", "Besenrein garantiert"],
      imageAlt: "Räumzwerge Entrümpelung Team in Augsburg beim Verladen von Möbeln",
    },
    services: {
      entruempelung: {
        h2: "Wohnungsentrümpelung in Augsburg",
        description: "Komplette Wohnungsentrümpelung in Augsburg und Umgebung. Wir kümmern uns um alles – von der Räumung bis zur besenreinen Übergabe. Auch in der Augsburger Altstadt mit engen Zugängen.",
        link: "/leistungen/wohnungsentruempelung",
      },
      haushaltsaufloesung: {
        h2: "Haushaltsauflösung in Augsburg",
        description: "Einfühlsame Haushaltsauflösung in Augsburg. Bei Erbschaft oder Umzug übernehmen wir die komplette Auflösung – respektvoll und ohne Zeitdruck.",
        link: "/leistungen/haushaltsaufloesung",
      },
      messie: {
        h2: "Diskrete Messie-Hilfe in Augsburg",
        description: "In Augsburg arbeiten wir bei sensiblen Situationen absolut diskret. Neutrale Fahrzeuge, geschultes Personal – ohne Aufsehen in der Nachbarschaft.",
        link: "/leistungen/messie-wohnungen",
      },
    },
    faq: [
      {
        question: "Wie schnell seid ihr in Augsburg vor Ort?",
        answer: "Von unserem Standort in Nersingen erreichen wir Augsburg in ca. 45 Minuten. Termine sind oft innerhalb von 48-72 Stunden möglich.",
      },
      {
        question: "Deckt ihr auch die Umgebung von Augsburg ab?",
        answer: "Ja, wir arbeiten in ganz Schwaben – von Friedberg über Königsbrunn bis Gersthofen und darüber hinaus.",
      },
      {
        question: "Wie läuft die Preiseinschätzung für Augsburg?",
        answer: "Senden Sie uns einfach Fotos per WhatsApp. Wir melden uns innerhalb von 24 Stunden mit einer unverbindlichen Einschätzung.",
      },
      {
        question: "Arbeitet ihr auch am Wochenende in Augsburg?",
        answer: "Ja, wir sind Montag bis Samstag von 8 bis 20 Uhr erreichbar und führen Entrümpelungen auch samstags durch.",
      },
    ],
    nearbyAreas: ["Friedberg", "Königsbrunn", "Gersthofen", "Neusäß", "Bobingen"],
  },

  heidenheim: {
    slug: "heidenheim",
    name: "Heidenheim",
    region: "Ostalb",
    bundesland: "Baden-Württemberg",
    isHQ: false,
    metaTitle: "Entrümpelung Heidenheim – Haushaltsauflösung & Messie-Hilfe | Räumzwerge",
    metaDescription: "Professionelle Entrümpelung in Heidenheim an der Brenz. Haushaltsauflösung, Wohnungsentrümpelung & diskrete Messie-Reinigung. ✓ Festpreis ✓ Besenrein ✓ < 24h",
    hero: {
      h1: "Entrümpelung in Heidenheim – Schnell & Zuverlässig",
      subline: "Ihr Räumzwerge-Team für Heidenheim an der Brenz und die Ostalb. Kurze Wege, faire Preise, besenreine Übergabe.",
      trustPills: ["Kurze Anfahrt", "Festpreis möglich", "Besenrein garantiert"],
      imageAlt: "Räumzwerge Entrümpelung Team in Heidenheim beim Verladen von Möbeln",
    },
    services: {
      entruempelung: {
        h2: "Wohnungsentrümpelung in Heidenheim",
        description: "Professionelle Wohnungsentrümpelung in Heidenheim und Umgebung. Von der Innenstadt bis zu den Außenbezirken – wir räumen schnell und gründlich.",
        link: "/leistungen/wohnungsentruempelung",
      },
      haushaltsaufloesung: {
        h2: "Haushaltsauflösung in Heidenheim",
        description: "Komplette Haushaltsauflösung in Heidenheim. Bei Erbschaft oder Wohnungsauflösung übernehmen wir alles – respektvoll und zum fairen Preis.",
        link: "/leistungen/haushaltsaufloesung",
      },
      messie: {
        h2: "Diskrete Messie-Hilfe in Heidenheim",
        description: "Auch in Heidenheim arbeiten wir bei sensiblen Fällen absolut diskret. Vertrauen Sie auf unsere Erfahrung und Diskretion.",
        link: "/leistungen/messie-wohnungen",
      },
    },
    faq: [
      {
        question: "Wie schnell seid ihr in Heidenheim vor Ort?",
        answer: "Heidenheim liegt nur ca. 30 Minuten von unserem Standort entfernt. Wir können oft kurzfristig Termine anbieten.",
      },
      {
        question: "Arbeitet ihr auch in Giengen und Herbrechtingen?",
        answer: "Ja, wir decken den gesamten Landkreis Heidenheim ab – von Giengen über Herbrechtingen bis Steinheim.",
      },
      {
        question: "Was kostet eine Entrümpelung in Heidenheim?",
        answer: "Die Kosten richten sich nach Umfang und Aufwand. Für eine Einschätzung senden Sie uns einfach Fotos per WhatsApp.",
      },
      {
        question: "Entsorgt ihr auch Sondermüll in Heidenheim?",
        answer: "Ja, wir kümmern uns auch um fachgerechte Entsorgung von Elektrogeräten, Farben und anderen Sonderabfällen.",
      },
    ],
    nearbyAreas: ["Giengen", "Herbrechtingen", "Steinheim", "Nattheim", "Königsbronn"],
  },

  muenchen: {
    slug: "muenchen",
    name: "München",
    region: "Oberbayern",
    bundesland: "Bayern",
    isHQ: false,
    metaTitle: "Entrümpelung München – Haushaltsauflösung & Messie-Hilfe | Räumzwerge",
    metaDescription: "Professionelle Entrümpelung in München. Haushaltsauflösung, Wohnungsentrümpelung & diskrete Messie-Reinigung. ✓ Festpreis möglich ✓ Besenrein ✓ Antwort < 24h",
    hero: {
      h1: "Entrümpelung in München – Professionell & Termingerecht",
      subline: "Ihr Räumzwerge-Team für München und Oberbayern. Auch in der Großstadt arbeiten wir effizient, diskret und besenrein.",
      trustPills: ["Erfahrung in der Großstadt", "Festpreis möglich", "Besenrein garantiert"],
      imageAlt: "Räumzwerge Entrümpelung Team in München beim Verladen von Möbeln",
    },
    services: {
      entruempelung: {
        h2: "Wohnungsentrümpelung in München",
        description: "Professionelle Wohnungsentrümpelung in allen Münchner Stadtteilen. Von Schwabing bis Sendling – wir kennen die Herausforderungen der Großstadt und meistern auch enge Treppenhäuser.",
        link: "/leistungen/wohnungsentruempelung",
      },
      haushaltsaufloesung: {
        h2: "Haushaltsauflösung in München",
        description: "Komplette Haushaltsauflösung in München. Bei Erbschaft, Umzug oder Wohnungsverkauf übernehmen wir alles – termingerecht und zuverlässig.",
        link: "/leistungen/haushaltsaufloesung",
      },
      messie: {
        h2: "Diskrete Messie-Hilfe in München",
        description: "In München arbeiten wir besonders diskret. Neutrale Fahrzeuge, flexible Termine und absolute Vertraulichkeit – auch in dicht besiedelten Vierteln.",
        link: "/leistungen/messie-wohnungen",
      },
    },
    faq: [
      {
        question: "Wie schnell seid ihr in München vor Ort?",
        answer: "München erreichen wir in ca. 1,5 Stunden. Termine sind in der Regel innerhalb von 3-5 Werktagen möglich.",
      },
      {
        question: "Arbeitet ihr in allen Münchner Stadtteilen?",
        answer: "Ja, wir arbeiten in ganz München – von der Innenstadt über Schwabing, Sendling, Bogenhausen bis zu den Außenbezirken.",
      },
      {
        question: "Wie funktioniert die Parkplatzfrage in München?",
        answer: "Wir kümmern uns bei Bedarf um Halteverbotszonen. Die Kosten werden transparent in der Einschätzung berücksichtigt.",
      },
      {
        question: "Kann ich auch am Wochenende einen Termin bekommen?",
        answer: "Ja, samstags sind Entrümpelungen möglich. Ideal für Berufstätige, die unter der Woche keine Zeit haben.",
      },
    ],
    nearbyAreas: ["Pasing", "Sendling", "Schwabing", "Bogenhausen", "Trudering"],
  },

  nuernberg: {
    slug: "nuernberg",
    name: "Nürnberg",
    region: "Mittelfranken",
    bundesland: "Bayern",
    isHQ: false,
    metaTitle: "Entrümpelung Nürnberg – Haushaltsauflösung & Messie-Hilfe | Räumzwerge",
    metaDescription: "Professionelle Entrümpelung in Nürnberg. Haushaltsauflösung, Wohnungsentrümpelung & diskrete Messie-Reinigung. ✓ Festpreis möglich ✓ Besenrein ✓ Antwort < 24h",
    hero: {
      h1: "Entrümpelung in Nürnberg – Zuverlässig & Fair",
      subline: "Ihr Räumzwerge-Team für Nürnberg und Mittelfranken. Professionelle Entrümpelung mit transparenten Preisen.",
      trustPills: ["Erfahrenes Team", "Festpreis möglich", "Besenrein garantiert"],
      imageAlt: "Räumzwerge Entrümpelung Team in Nürnberg beim Verladen von Möbeln",
    },
    services: {
      entruempelung: {
        h2: "Wohnungsentrümpelung in Nürnberg",
        description: "Komplette Wohnungsentrümpelung in Nürnberg und der Metropolregion. Von der Altstadt bis zu den Außenbezirken – wir räumen professionell und besenrein.",
        link: "/leistungen/wohnungsentruempelung",
      },
      haushaltsaufloesung: {
        h2: "Haushaltsauflösung in Nürnberg",
        description: "Respektvolle Haushaltsauflösung in Nürnberg. Bei Erbschaft oder Umzug übernehmen wir alles – inklusive Wertanrechnung auf Wunsch.",
        link: "/leistungen/haushaltsaufloesung",
      },
      messie: {
        h2: "Diskrete Messie-Hilfe in Nürnberg",
        description: "In Nürnberg arbeiten wir bei sensiblen Situationen absolut diskret. Vertrauen Sie auf unsere Erfahrung und Professionalität.",
        link: "/leistungen/messie-wohnungen",
      },
    },
    faq: [
      {
        question: "Wie schnell seid ihr in Nürnberg vor Ort?",
        answer: "Nürnberg liegt ca. 1,5-2 Stunden von unserem Standort entfernt. Termine sind in der Regel innerhalb weniger Tage möglich.",
      },
      {
        question: "Arbeitet ihr auch in Fürth und Erlangen?",
        answer: "Ja, wir decken die gesamte Metropolregion Nürnberg ab – von Fürth über Erlangen bis Schwabach.",
      },
      {
        question: "Was kostet eine Entrümpelung in Nürnberg?",
        answer: "Die Kosten hängen vom Umfang ab. Senden Sie uns Fotos per WhatsApp für eine schnelle, unverbindliche Einschätzung.",
      },
      {
        question: "Bietet ihr auch Kellerentrümpelung in Nürnberg an?",
        answer: "Ja, wir entrümpeln auch Keller, Dachböden und Garagen in Nürnberg und Umgebung.",
      },
    ],
    nearbyAreas: ["Fürth", "Erlangen", "Schwabach", "Zirndorf", "Roth"],
  },

  ravensburg: {
    slug: "ravensburg",
    name: "Ravensburg",
    region: "Oberschwaben",
    bundesland: "Baden-Württemberg",
    isHQ: false,
    metaTitle: "Entrümpelung Ravensburg – Haushaltsauflösung & Messie-Hilfe | Räumzwerge",
    metaDescription: "Professionelle Entrümpelung in Ravensburg und Oberschwaben. Haushaltsauflösung, Wohnungsentrümpelung & diskrete Messie-Reinigung. ✓ Festpreis ✓ Besenrein",
    hero: {
      h1: "Entrümpelung in Ravensburg – Ihr Team für Oberschwaben",
      subline: "Räumzwerge in Ravensburg und Umgebung. Professionelle Entrümpelung mit regionaler Nähe und fairen Preisen.",
      trustPills: ["Regional verwurzelt", "Festpreis möglich", "Besenrein garantiert"],
      imageAlt: "Räumzwerge Entrümpelung Team in Ravensburg beim Verladen von Möbeln",
    },
    services: {
      entruempelung: {
        h2: "Wohnungsentrümpelung in Ravensburg",
        description: "Komplette Wohnungsentrümpelung in Ravensburg und der Bodenseeregion. Von der historischen Altstadt bis zu modernen Wohngebieten.",
        link: "/leistungen/wohnungsentruempelung",
      },
      haushaltsaufloesung: {
        h2: "Haushaltsauflösung in Ravensburg",
        description: "Einfühlsame Haushaltsauflösung in Ravensburg. Bei Erbschaft oder Umzug sind wir Ihr zuverlässiger Partner.",
        link: "/leistungen/haushaltsaufloesung",
      },
      messie: {
        h2: "Diskrete Messie-Hilfe in Ravensburg",
        description: "Auch in der überschaubaren Stadt Ravensburg arbeiten wir absolut diskret. Vertraulichkeit ist für uns selbstverständlich.",
        link: "/leistungen/messie-wohnungen",
      },
    },
    faq: [
      {
        question: "Wie schnell seid ihr in Ravensburg vor Ort?",
        answer: "Ravensburg erreichen wir in ca. 45 Minuten. Termine sind oft kurzfristig innerhalb weniger Tage möglich.",
      },
      {
        question: "Arbeitet ihr auch am Bodensee?",
        answer: "Ja, wir sind in der gesamten Bodenseeregion tätig – von Friedrichshafen über Lindau bis Konstanz.",
      },
      {
        question: "Kann ich Wertgegenstände anrechnen lassen?",
        answer: "Ja, bei Haushaltsauflösungen können gut erhaltene Möbel und Wertgegenstände auf Wunsch angerechnet werden.",
      },
      {
        question: "Entsorgt ihr auch in Ravensburg fachgerecht?",
        answer: "Ja, wir kümmern uns um die fachgerechte Entsorgung aller Materialien gemäß den lokalen Vorschriften.",
      },
    ],
    nearbyAreas: ["Weingarten", "Friedrichshafen", "Wangen", "Leutkirch", "Lindau"],
  },

  reutlingen: {
    slug: "reutlingen",
    name: "Reutlingen",
    region: "Neckar-Alb",
    bundesland: "Baden-Württemberg",
    isHQ: false,
    metaTitle: "Entrümpelung Reutlingen – Haushaltsauflösung & Messie-Hilfe | Räumzwerge",
    metaDescription: "Professionelle Entrümpelung in Reutlingen. Haushaltsauflösung, Wohnungsentrümpelung & diskrete Messie-Reinigung. ✓ Festpreis möglich ✓ Besenrein ✓ Antwort < 24h",
    hero: {
      h1: "Entrümpelung in Reutlingen – Professionell & Regional",
      subline: "Ihr Räumzwerge-Team für Reutlingen und die Neckar-Alb-Region. Schnelle Reaktionszeit, faire Preise, besenreine Übergabe.",
      trustPills: ["Schnelle Anfahrt", "Festpreis möglich", "Besenrein garantiert"],
      imageAlt: "Räumzwerge Entrümpelung Team in Reutlingen beim Verladen von Möbeln",
    },
    services: {
      entruempelung: {
        h2: "Wohnungsentrümpelung in Reutlingen",
        description: "Professionelle Wohnungsentrümpelung in Reutlingen und Umgebung. Von der Innenstadt bis zu den Teilorten – wir räumen zuverlässig.",
        link: "/leistungen/wohnungsentruempelung",
      },
      haushaltsaufloesung: {
        h2: "Haushaltsauflösung in Reutlingen",
        description: "Komplette Haushaltsauflösung in Reutlingen. Respektvoll, strukturiert und zum fairen Preis.",
        link: "/leistungen/haushaltsaufloesung",
      },
      messie: {
        h2: "Diskrete Messie-Hilfe in Reutlingen",
        description: "In Reutlingen arbeiten wir bei sensiblen Fällen besonders diskret und einfühlsam. Vertrauen Sie auf unsere Erfahrung.",
        link: "/leistungen/messie-wohnungen",
      },
    },
    faq: [
      {
        question: "Wie schnell seid ihr in Reutlingen vor Ort?",
        answer: "Reutlingen erreichen wir in ca. 1 Stunde. Termine sind meist innerhalb von 2-4 Werktagen möglich.",
      },
      {
        question: "Arbeitet ihr auch in Tübingen?",
        answer: "Ja, wir sind in der gesamten Neckar-Alb-Region tätig – von Tübingen über Metzingen bis Pfullingen.",
      },
      {
        question: "Wie bekomme ich eine Preiseinschätzung?",
        answer: "Senden Sie uns einfach Fotos per WhatsApp. Innerhalb von 24 Stunden erhalten Sie eine unverbindliche Einschätzung.",
      },
      {
        question: "Kann ich auch kurzfristig einen Termin bekommen?",
        answer: "Bei Verfügbarkeit sind auch kurzfristige Termine möglich. Rufen Sie uns an oder schreiben Sie per WhatsApp.",
      },
    ],
    nearbyAreas: ["Tübingen", "Metzingen", "Pfullingen", "Eningen", "Bad Urach"],
  },

  stuttgart: {
    slug: "stuttgart",
    name: "Stuttgart",
    region: "Region Stuttgart",
    bundesland: "Baden-Württemberg",
    isHQ: false,
    metaTitle: "Entrümpelung Stuttgart – Haushaltsauflösung & Messie-Hilfe | Räumzwerge",
    metaDescription: "Professionelle Entrümpelung in Stuttgart. Haushaltsauflösung, Wohnungsentrümpelung & diskrete Messie-Reinigung. ✓ Festpreis möglich ✓ Besenrein ✓ Antwort < 24h",
    hero: {
      h1: "Entrümpelung in Stuttgart – Erfahren & Zuverlässig",
      subline: "Ihr Räumzwerge-Team für Stuttgart und die Region. Professionelle Entrümpelung in der Landeshauptstadt – effizient, diskret, besenrein.",
      trustPills: ["Großstadt-Erfahrung", "Festpreis möglich", "Besenrein garantiert"],
      imageAlt: "Räumzwerge Entrümpelung Team in Stuttgart beim Verladen von Möbeln",
    },
    services: {
      entruempelung: {
        h2: "Wohnungsentrümpelung in Stuttgart",
        description: "Komplette Wohnungsentrümpelung in allen Stuttgarter Stadtbezirken. Von der Innenstadt über Bad Cannstatt bis Degerloch – wir meistern auch schwierige Zugänge.",
        link: "/leistungen/wohnungsentruempelung",
      },
      haushaltsaufloesung: {
        h2: "Haushaltsauflösung in Stuttgart",
        description: "Professionelle Haushaltsauflösung in Stuttgart. Bei Erbschaft, Umzug oder Wohnungsverkauf übernehmen wir alles – termingerecht und zuverlässig.",
        link: "/leistungen/haushaltsaufloesung",
      },
      messie: {
        h2: "Diskrete Messie-Hilfe in Stuttgart",
        description: "In Stuttgart arbeiten wir bei sensiblen Situationen absolut diskret. Neutrale Fahrzeuge, flexible Termine – ohne Aufsehen in der Nachbarschaft.",
        link: "/leistungen/messie-wohnungen",
      },
    },
    faq: [
      {
        question: "Wie schnell seid ihr in Stuttgart vor Ort?",
        answer: "Stuttgart erreichen wir in ca. 1-1,5 Stunden. Termine sind in der Regel innerhalb von 3-5 Werktagen möglich.",
      },
      {
        question: "Arbeitet ihr in allen Stuttgarter Stadtbezirken?",
        answer: "Ja, wir sind in ganz Stuttgart tätig – von der Innenstadt über Bad Cannstatt, Degerloch, Vaihingen bis Feuerbach.",
      },
      {
        question: "Wie funktioniert das Parken in Stuttgart?",
        answer: "Bei Bedarf organisieren wir Halteverbotszonen. Die Kosten werden transparent im Angebot ausgewiesen.",
      },
      {
        question: "Bietet ihr auch Büro-Entrümpelungen in Stuttgart an?",
        answer: "Ja, wir entrümpeln auch Büros, Lager und Gewerbeflächen in Stuttgart – auch außerhalb der Geschäftszeiten.",
      },
    ],
    nearbyAreas: ["Esslingen", "Ludwigsburg", "Böblingen", "Sindelfingen", "Fellbach"],
  },
};

// Helper to get all city slugs for route validation
export const CITY_SLUGS = Object.keys(CITY_PAGES);

// Helper to check if a slug is a valid city
export const isValidCitySlug = (slug: string): boolean => {
  return CITY_SLUGS.includes(slug);
};
