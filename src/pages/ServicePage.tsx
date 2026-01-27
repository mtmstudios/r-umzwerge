import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceTrustBar } from '@/components/services/ServiceTrustBar';
import { ScenarioGrid } from '@/components/services/ScenarioGrid';
import { ServiceComparison } from '@/components/services/ServiceComparison';
import { ServiceProcess } from '@/components/services/ServiceProcess';
import { ExtraModule } from '@/components/services/ExtraModule';
import { ServicePricing } from '@/components/services/ServicePricing';
import { ServiceFAQ } from '@/components/services/ServiceFAQ';
import { ServiceFinalCTA } from '@/components/services/ServiceFinalCTA';
import { SERVICE_PAGES } from '@/lib/serviceData';
import { SectionDivider } from '@/components/ui/SectionDivider';

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Get page data
  const pageData = slug ? SERVICE_PAGES[slug] : null;
  
  // SEO: Dynamic title and meta description (must be before early return)
  useEffect(() => {
    if (pageData) {
      document.title = pageData.metaTitle;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', pageData.metaDescription);
      }

      // Scroll to top on mount
      window.scrollTo(0, 0);
    }
  }, [pageData]);

  // Redirect to 404 if not found
  if (!pageData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <ServiceHero
          h1={pageData.hero.h1}
          subline={pageData.hero.subline}
          trustPills={pageData.hero.trustPills}
          imageSrc={pageData.hero.imageSrc}
          imageAlt={pageData.hero.imageAlt}
          isDiscrete={pageData.isDiscrete}
          ctaText={pageData.ctaText}
        />
        
        {/* Trust Bar - social proof directly after hero */}
        <ServiceTrustBar />
        
        {/* Process - same bg as TrustBar, no divider needed */}
        <ServiceProcess steps={pageData.processSteps} />
        
        {/* Scenarios - emotional connection (same bg as Process, no divider needed) */}
        <ScenarioGrid scenarios={pageData.scenarios} />
        
        {/* Comparison - why us */}
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--secondary) / 0.3)" 
          toColor="hsl(var(--background))" 
        />
        <ServiceComparison comparison={pageData.comparison} />
        
        {/* Pricing */}
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--background))" 
          toColor="hsl(var(--secondary) / 0.3)" 
        />
        <ServicePricing />
        
        {/* Extra Module - transparency/sustainability info */}
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--secondary) / 0.3)" 
          toColor="hsl(var(--background))" 
        />
        <ExtraModule
          title={pageData.extraModule.title}
          subtitle={pageData.extraModule.subtitle}
          points={pageData.extraModule.points}
        />
        
        {/* FAQ (same bg as ExtraModule, no divider needed) */}
        <ServiceFAQ items={pageData.faq} />
        
        {/* Final CTA */}
        <SectionDivider variant="angle" fillClassName="fill-primary" />
        <ServiceFinalCTA />
      </main>
      
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
