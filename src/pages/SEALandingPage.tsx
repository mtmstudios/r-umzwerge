import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getSeaData, isValidSeaSlug } from '@/lib/seaData';
import { SEAMinimalHeader } from '@/components/sea/SEAMinimalHeader';
import { SEAHero } from '@/components/sea/SEAHero';
import { SEAPainPoints } from '@/components/sea/SEAPainPoints';
import { SEASocialProof } from '@/components/sea/SEASocialProof';
import { SEABeforeAfter } from '@/components/sea/SEABeforeAfter';
import { SEAMidCTA } from '@/components/sea/SEAMidCTA';
import { SEAComparison } from '@/components/sea/SEAComparison';
import { SEAMiniFAQ } from '@/components/sea/SEAMiniFAQ';
import { SEAFinalCTA } from '@/components/sea/SEAFinalCTA';
import { SEAMinimalFooter } from '@/components/sea/SEAMinimalFooter';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';

export default function SEALandingPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Get data first (before any hooks that depend on it)
  const data = slug && isValidSeaSlug(slug) ? getSeaData(slug) : undefined;

  // Update document title and meta - hook must be called unconditionally
  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', data.metaDescription);
      }
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [data]);

  // Validate and redirect after hooks
  if (!slug || !isValidSeaSlug(slug) || !data) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEAMinimalHeader />
      
      <main className="flex-1">
        <SEAHero data={data} />
        <SEAPainPoints data={data} />
        <SEASocialProof data={data} />
        <SEABeforeAfter data={data} />
        <SEAMidCTA data={data} />
        <SEAComparison data={data} />
        <SEAMiniFAQ data={data} />
        <SEAFinalCTA data={data} />
      </main>

      <SEAMinimalFooter />
      
      {/* Mobile Sticky CTAs */}
      <FloatingCTAs />
    </div>
  );
}
