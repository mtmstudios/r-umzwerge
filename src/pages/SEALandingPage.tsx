import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { getSeaData, isValidSeaSlug } from '@/lib/seaData';
import { PHONE_LINK } from '@/lib/constants';
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
        <SEAHero data={data} />
        <SEASocialProof data={data} />
        <SEAPainPoints data={data} />
        <SEABeforeAfter data={data} />
        <SEAMidCTA data={data} />
        <SEAComparison data={data} />
        <SEAMiniFAQ data={data} />
        <SEAFinalCTA data={data} />
      </main>

      <SEAMinimalFooter />
      
      {/* Mobile Sticky Call Bar - always visible */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={PHONE_LINK}
          className="flex items-center justify-center gap-3 w-full py-4 bg-cta hover:bg-cta-hover text-cta-foreground rounded-2xl shadow-2xl shadow-cta/40 font-bold text-lg transition-all duration-200 active:scale-95"
          data-track="cta-phone-sticky"
        >
          <Phone className="h-6 w-6" />
          Jetzt anrufen
        </a>
      </div>

      {/* Desktop floating CTAs (hidden on mobile since we have sticky bar) */}
      <div className="hidden md:block lg:hidden">
        <FloatingCTAs onFunnelOpen={() => setIsFunnelOpen(true)} />
      </div>

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
