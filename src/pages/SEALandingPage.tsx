import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSeaData, isValidSeaSlug } from '@/lib/seaData';
import { SEAMinimalHeader } from '@/components/sea/SEAMinimalHeader';
import { SEAHero } from '@/components/sea/SEAHero';
import { SEASocialProof } from '@/components/sea/SEASocialProof';
import { SEAPainPoints } from '@/components/sea/SEAPainPoints';
import { SEABeforeAfter } from '@/components/sea/SEABeforeAfter';
import { SEAMidCTA } from '@/components/sea/SEAMidCTA';
import { SEAComparison } from '@/components/sea/SEAComparison';
import { SEAMiniFAQ } from '@/components/sea/SEAMiniFAQ';
import { SEAFinalCTA } from '@/components/sea/SEAFinalCTA';
import { SEAMinimalFooter } from '@/components/sea/SEAMinimalFooter';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';

export default function SEALandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const [isFunnelOpen, setIsFunnelOpen] = useState(false);
  
  const data = slug && isValidSeaSlug(slug) ? getSeaData(slug) : undefined;

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', data.metaDescription);
      }
    }
    window.scrollTo(0, 0);
  }, [data]);

  if (!slug || !isValidSeaSlug(slug) || !data) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEAMinimalHeader />
      
      <main className="flex-1">
        {/* 1. Hero */}
        <SEAHero data={data} />
        {/* 2. Reviews – instant trust right below the fold */}
        <SEASocialProof data={data} />
        {/* 3. Problem agitation */}
        <SEAPainPoints data={data} />
        {/* 4. Result / Before-After proof */}
        <SEABeforeAfter data={data} />
        {/* 5. Process – how easy it is */}
        <SEAMidCTA data={data} />
        {/* 6. Comparison – why us */}
        <SEAComparison data={data} />
        {/* 7. FAQ */}
        <SEAMiniFAQ data={data} />
        {/* 8. Final CTA */}
        <SEAFinalCTA data={data} />
      </main>

      <SEAMinimalFooter />
      
      {/* Mobile Sticky Dual-CTAs */}
      <FloatingCTAs onFunnelOpen={() => setIsFunnelOpen(true)} />

      {/* Shared funnel for sticky bar */}
      {data.slug === 'haushaltsaufloesung' && (
        <HaushaltsaufloesungFunnel open={isFunnelOpen} onOpenChange={setIsFunnelOpen} />
      )}
      {data.slug === 'entruempelung' && (
        <EntruempelungFunnel open={isFunnelOpen} onOpenChange={setIsFunnelOpen} />
      )}
      {data.slug === 'messie-hilfe' && (
        <MessieFunnel open={isFunnelOpen} onOpenChange={setIsFunnelOpen} />
      )}
    </div>
  );
}
