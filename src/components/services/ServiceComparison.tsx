import { COMMON_BADGES, ComparisonData } from '@/lib/serviceData';
import { UnifiedComparison, ComparisonPair } from '@/components/comparison/UnifiedComparison';

interface ServiceComparisonProps {
  comparison: ComparisonData;
  headline?: string;
  subline?: string;
}

// Convert legacy comparison data to pairs format
function convertToPairs(comparison: ComparisonData): ComparisonPair[] {
  const pairs: ComparisonPair[] = [];
  const maxLength = Math.max(comparison.others.length, comparison.raeumzwerge.length);
  
  for (let i = 0; i < maxLength; i++) {
    pairs.push({
      problem: comparison.others[i] || '',
      solution: comparison.raeumzwerge[i] || '',
    });
  }
  
  return pairs;
}

export function ServiceComparison({ 
  comparison, 
  headline = "Der Unterschied macht's",
  subline = "Klicken Sie auf eine Karte für unsere Lösung"
}: ServiceComparisonProps) {
  const pairs = convertToPairs(comparison);

  return (
    <UnifiedComparison
      headline={headline}
      subline={subline}
      pairs={pairs}
      badges={COMMON_BADGES}
    />
  );
}
