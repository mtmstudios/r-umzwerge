// WhatsApp configuration
export const WHATSAPP_NUMBER = "4915XXXXXXXXX"; // Placeholder - replace with actual number
export const WHATSAPP_MESSAGE = "Hallo Räumzwerge, ich hätte gerne eine Preiseinschätzung. Ort: ____. Ich sende gleich Fotos.";

export const getWhatsAppLink = (customMessage?: string) => {
  const message = encodeURIComponent(customMessage || WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

// Phone configuration
export const PHONE_NUMBER = "+49 XXX XXXXXXX"; // Placeholder - replace with actual number
export const PHONE_LINK = "tel:+49XXXXXXXXX";

// Email
export const EMAIL = "kontakt@raeumzwerge.de";

// Service hours
export const SERVICE_HOURS = "Mo–Sa 8–20 Uhr";

// Navigation items
export const NAV_ITEMS = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Preise", href: "#preise" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "FAQ", href: "#faq" },
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
    description: "Schnell, sauber und übergabefertig.",
    slug: "wohnungsentruempelung",
  },
  {
    title: "Haushaltsauflösung",
    description: "Strukturiert, respektvoll und transparent.",
    slug: "haushaltsaufloesung",
  },
  {
    title: "Keller / Dachboden / Garage",
    description: "Freiraum schaffen – ohne Stress.",
    slug: "keller-dachboden-garage",
  },
  {
    title: "Gewerbe / Büro / Lager",
    description: "Zügig, diskret und planbar.",
    slug: "gewerbe-buero-lager",
  },
  {
    title: "Sperrmüll & Abtransport",
    description: "Fachgerecht entsorgt, sauber abgewickelt.",
    slug: "sperrmuell-abtransport",
  },
  {
    title: "Diskrete Reinigung & Entrümpelung",
    description: "Respektvoll, geschützt und ohne Aufsehen.",
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
