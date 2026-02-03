import { UnifiedComparison, ComparisonPair } from '@/components/comparison/UnifiedComparison';

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    problem: "Preiseinschätzung nur vor Ort",
    solution: "Einschätzung per WhatsApp < 24h",
  },
  {
    problem: "Oft versteckte Kosten",
    solution: "Festpreis nach Einschätzung möglich",
  },
  {
    problem: "Nur grob geräumt",
    solution: "Besenrein garantiert",
  },
  {
    problem: "Auffällig beschriftete Fahrzeuge",
    solution: "Neutrale Fahrzeuge auf Wunsch",
  },
];

const BADGES = ["Keine versteckten Kosten", "Besenrein", "Diskret"];

interface CityComparisonProps {
  cityName?: string;
}

export function CityComparison({ cityName }: CityComparisonProps) {
  const headline = cityName 
    ? `Warum Räumzwerge in ${cityName}?`
    : "Warum Räumzwerge?";

  return (
    <UnifiedComparison
      headline={headline}
      subline="Transparent, zuverlässig und regional verwurzelt."
      pairs={COMPARISON_PAIRS}
      badges={BADGES}
    />
  );
}
