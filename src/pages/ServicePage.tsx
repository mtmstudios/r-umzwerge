import { useParams, Navigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { StickyConversionBar } from '@/components/services/StickyConversionBar';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ScenarioGrid } from '@/components/services/ScenarioGrid';
import { ServiceScope } from '@/components/services/ServiceScope';
import { ServiceProcess } from '@/components/services/ServiceProcess';
import { ExtraModule } from '@/components/services/ExtraModule';
import { ServicePricing } from '@/components/services/ServicePricing';
import { ServiceFAQ } from '@/components/services/ServiceFAQ';
import { ServiceRegions } from '@/components/services/ServiceRegions';
import { ServiceFinalCTA } from '@/components/services/ServiceFinalCTA';
import { SERVICE_PAGES } from '@/lib/serviceData';

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Get page data
  const pageData = slug ? SERVICE_PAGES[slug] : null;
  
  // Redirect to 404 if not found
  if (!pageData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StickyConversionBar />
      
      <main className="pt-16">
        <ServiceHero
          h1={pageData.hero.h1}
          subline={pageData.hero.subline}
          trustPills={pageData.hero.trustPills}
        />
        
        <ScenarioGrid scenarios={pageData.scenarios} />
        
        <ServiceScope
          included={pageData.scope.included}
          optional={pageData.scope.optional}
        />
        
        <ServiceProcess steps={pageData.processSteps} />
        
        <ExtraModule
          title={pageData.extraModule.title}
          points={pageData.extraModule.points}
        />
        
        <ServicePricing />
        
        <ServiceFAQ items={pageData.faq} />
        
        <ServiceRegions />
        
        <ServiceFinalCTA />
      </main>
      
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
