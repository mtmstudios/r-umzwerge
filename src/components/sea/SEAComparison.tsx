import { SEAData } from '@/lib/seaData';
import { UnifiedComparison } from '@/components/comparison/UnifiedComparison';

interface SEAComparisonProps {
  data: SEAData;
}

export function SEAComparison({ data }: SEAComparisonProps) {
  // Return null if no comparison data
  if (!data.comparison) {
    return null;
  }

  return (
    <UnifiedComparison
      headline={data.comparison.headline}
      subline={data.comparison.subline}
      pairs={data.comparison.pairs}
      badges={data.comparison.badges}
    />
  );
}
