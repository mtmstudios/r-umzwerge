import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceTrustBar } from '@/components/services/ServiceTrustBar';
import { ScenarioGrid } from '@/components/services/ScenarioGrid';
import { ServiceScope } from '@/components/services/ServiceScope';
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
        />
        
        {/* Trust Bar - social proof directly after hero */}
        <ServiceTrustBar />
        
        {/* Process first - builds trust by showing clear steps */}
        <SectionDivider variant="wave" fillClassName="fill-secondary/30" />
        <ServiceProcess steps={pageData.processSteps} />
        
        {/* Scenarios - emotional connection */}
        <SectionDivider variant="curve" direction="up" fillClassName="fill-background" />
        <ScenarioGrid scenarios={pageData.scenarios} />
        
        {/* Scope - what's included */}
        <SectionDivider variant="angle" direction="up" fillClassName="fill-background" />
        <ServiceScope
          included={pageData.scope.included}
          optional={pageData.scope.optional}
        />
        
        {/* Pricing */}
        <SectionDivider variant="wave" fillClassName="fill-muted" />
        <ServicePricing />
        
        {/* Extra Module - transparency/sustainability info */}
        <SectionDivider variant="curve" direction="up" fillClassName="fill-background" />
        <ExtraModule
          title={pageData.extraModule.title}
          subtitle={pageData.extraModule.subtitle}
          points={pageData.extraModule.points}
        />
        
        {/* FAQ */}
        <SectionDivider variant="angle" fillClassName="fill-secondary/30" />
        <ServiceFAQ items={pageData.faq} />
        
        {/* Final CTA */}
        <SectionDivider variant="wave" direction="up" fillClassName="fill-primary" />
        <ServiceFinalCTA />
      </main>
      
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
