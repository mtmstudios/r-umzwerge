// WhatsApp configuration
export const WHATSAPP_NUMBER = "491603080676";
export const WHATSAPP_MESSAGE = "Hallo liebes Räumzwerge-Team, ich komme von euerer Website.";

export const getWhatsAppLink = (customMessage?: string) => {
  const message = encodeURIComponent(customMessage || WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

// Phone configuration
export const PHONE_NUMBER = "+49 160 3080676";
export const PHONE_LINK = "tel:+491603080676";

// Email
export const EMAIL = "hallo@raeumzwerge.de";

// Address
export const ADDRESS = "Bibertalstraße 1, 89278 Nersingen";

// Service hours
export const SERVICE_HOURS = "Mo–Sa 8–20 Uhr";

// Navigation items
export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { 
    label: "Leistungen", 
    href: "#",
    children: [
      { label: "Wohnungsentrümpelung", href: "/leistungen/wohnungsentruempelung" },
      { label: "Haushaltsauflösung", href: "/leistungen/haushaltsaufloesung" },
      { label: "Keller / Dachboden / Garage", href: "/leistungen/keller-dachboden-garage" },
      { label: "Gewerbe / Büro / Lager", href: "/leistungen/gewerbe-buero-lager" },
      { label: "Diskrete Reinigung", href: "/leistungen/messie-wohnungen" },
    ]
  },
  { label: "Preise", href: "#preise" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "FAQ", href: "#faq" },
  // Temporary: SEA Landing Pages for testing
  { 
    label: "🔧 SEA-Test", 
    href: "#",
    children: [
      { label: "LP Haushaltsauflösung", href: "/lp/haushaltsaufloesung" },
      { label: "LP Entrümpelung", href: "/lp/entruempelung" },
      { label: "LP Messie-Hilfe", href: "/lp/messie-hilfe" },
    ]
  },
];

// Regions
export const REGIONS = [
  { name: "Ulm", slug: "ulm", isHQ: true },
  { name: "München", slug: "muenchen", isHQ: false },
  { name: "Stuttgart", slug: "stuttgart", isHQ: false },
  { name: "Augsburg", slug: "augsburg", isHQ: false },
  { name: "Heidenheim", slug: "heidenheim", isHQ: false },
  { name: "Aalen", slug: "aalen", isHQ: false },
  { name: "Reutlingen", slug: "reutlingen", isHQ: false },
  { name: "Ravensburg", slug: "ravensburg", isHQ: false },
];

// Services
export const SERVICES = [
  {
    title: "Wohnungsentrümpelung",
    description: "Transparent, zuverlässig und respektvoll.",
    longDescription: "Von der ersten Preiseinschätzung bis zur besenreinen Übergabe – wir kümmern uns um alles. Komplette Räumung, fachgerechte Entsorgung und besenreine Übergabe aus einer Hand.",
    highlights: ["Besenrein", "Festpreis möglich", "Antwort < 24h"],
    slug: "wohnungsentruempelung",
    featured: true,
  },
  {
    title: "Haushaltsauflösung",
    description: "Strukturiert, respektvoll und transparent.",
    longDescription: "Bei Erbschaft oder Umzug ins Pflegeheim übernehmen wir die komplette Auflösung – respektvoll und ohne Zeitdruck. Wertgegenstände werden auf Wunsch angerechnet.",
    highlights: [
      "Wertanrechnung möglich",
      "Respektvoller Umgang",
      "Komplettservice aus einer Hand"
    ],
    slug: "haushaltsaufloesung",
  },
  {
    title: "Keller / Dachboden / Garage",
    description: "Freiraum schaffen – ohne Stress.",
    longDescription: "Keller voll? Dachboden zugestellt? Wir schaffen Platz – schnell und unkompliziert. Perfekt für Frühjahrsputz, Umzug oder Renovierung.",
    highlights: [
      "Auch enge Zugänge kein Problem",
      "Entsorgung inklusive",
      "Kurzfristige Termine möglich"
    ],
    slug: "keller-dachboden-garage",
  },
  {
    title: "Gewerbe / Büro / Lager",
    description: "Zügig, diskret und planbar.",
    longDescription: "Büroauflösung, Lagerräumung oder Geschäftsaufgabe – wir arbeiten effizient und diskret, auch außerhalb der Geschäftszeiten. Minimale Unterbrechung für Ihren Betrieb.",
    highlights: [
      "Arbeiten außerhalb der Geschäftszeiten",
      "Dokumentenvernichtung möglich",
      "Feste Terminplanung"
    ],
    slug: "gewerbe-buero-lager",
  },
  {
    title: "Diskrete Reinigung & Entrümpelung",
    description: "Respektvoll, geschützt und ohne Aufsehen.",
    longDescription: "Bei sensiblen Situationen arbeiten wir besonders diskret und respektvoll. Neutrale Fahrzeuge, geschultes Personal und absolute Vertraulichkeit – ohne Aufsehen in der Nachbarschaft.",
    highlights: [
      "Neutrale Fahrzeuge",
      "Absolute Diskretion garantiert",
      "Geschultes, einfühlsames Team"
    ],
    slug: "messie-wohnungen",
    subtitle: "(Messie-Wohnungen)",
  },
];

// FAQ Items
export const FAQ_ITEMS = [
  {
    question: "Wie läuft die Preiseinschätzung per WhatsApp ab?",
    answer: "Du sendest uns ein paar Fotos und den Ort. Wir melden uns mit einer Preiseinschätzung – innerhalb von 24 Stunden (oft schneller).",
  },
  {
    question: "Wie schnell bekomme ich eine Rückmeldung?",
    answer: "In der Regel innerhalb von 24 Stunden – häufig schneller.",
  },
  {
    question: "Gibt es versteckte Kosten?",
    answer: "Nein. Wir kommunizieren transparent und nachvollziehbar. Keine versteckten Posten.",
  },
  {
    question: "Bekomme ich einen Festpreis?",
    answer: "Nach der Einschätzung ist häufig ein Festpreis möglich. Wir sagen dir klar, was enthalten ist.",
  },
  {
    question: "Ist die Übergabe besenrein?",
    answer: "Ja. Wir übergeben in der Regel besenrein und übergabefertig – nach Absprache.",
  },
  {
    question: "Wie diskret ist die Entrümpelung (Messie-Wohnungen)?",
    answer: "Sehr diskret und respektvoll. Wir arbeiten geschützt, ohne Aufsehen und mit klarer Kommunikation.",
  },
  {
    question: "Wie groß ist euer Einsatzgebiet?",
    answer: "Wir arbeiten in Süddeutschland. Die wichtigsten Regionen findest du auf der Karte.",
  },
];

// Trust items
export const TRUST_ITEMS = [
  { icon: "shield-check", text: "Keine versteckten Kosten" },
  { icon: "clock", text: "Preiseinschätzung < 24h" },
  { icon: "badge-check", text: "Festpreis nach Einschätzung" },
  { icon: "heart-handshake", text: "Diskret & respektvoll" },
  { icon: "sparkles", text: "Besenrein" },
];

// Price factors
export const PRICE_FACTORS = [
  "Umfang / Menge",
  "Etage & Zugang",
  "Demontage",
  "Sondermüll / Elektro",
  "Termindruck",
];

// Google Reviews
export const GOOGLE_REVIEWS_LINK = "https://www.google.com/maps/place/Entr%C3%BCmpelungszauberer/@48.4271,10.1283,17z";

export const GOOGLE_RATING = {
  score: 5.0,
  count: 12,
};

export const FEATURED_REVIEWS = [
  {
    id: 1,
    author: "Max M.",
    rating: 5,
    text: "Sehr professionell und zuverlässig. Die Wohnung wurde besenrein übergeben. Absolute Empfehlung!",
    date: "vor 2 Wochen",
  },
  {
    id: 2,
    author: "Anna K.",
    rating: 5,
    text: "Schnelle Terminvergabe, faire Preise und super nettes Team. Alles perfekt gelaufen!",
    date: "vor 1 Monat",
  },
  {
    id: 3,
    author: "Stefan B.",
    rating: 5,
    text: "Top Service! Kellerentrümpelung war in wenigen Stunden erledigt. Sehr empfehlenswert.",
    date: "vor 1 Monat",
  },
];
