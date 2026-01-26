import { useParams, Navigate, Link } from 'react-router-dom';
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
import { ServiceFinalCTA } from '@/components/services/ServiceFinalCTA';
import { SERVICE_PAGES } from '@/lib/serviceData';
import { SectionDivider } from '@/components/ui/SectionDivider';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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
      
      {/* Breadcrumb Navigation */}
      <div className="bg-secondary/30 border-b border-border/50">
        <div className="container-custom py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Startseite</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/#leistungen">Leistungen</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageData.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <StickyConversionBar />
      
      <main>
        <ServiceHero
          h1={pageData.hero.h1}
          subline={pageData.hero.subline}
          trustPills={pageData.hero.trustPills}
        />
        
        <SectionDivider variant="curve" fillClassName="fill-secondary/30" />
        <ScenarioGrid scenarios={pageData.scenarios} />
        
        <SectionDivider variant="angle" direction="up" fillClassName="fill-background" />
        <ServiceScope
          included={pageData.scope.included}
          optional={pageData.scope.optional}
        />
        
        <SectionDivider variant="wave" fillClassName="fill-secondary/30" />
        <ServiceProcess steps={pageData.processSteps} />
        
        <SectionDivider variant="curve" direction="up" fillClassName="fill-background" />
        <ExtraModule
          title={pageData.extraModule.title}
          points={pageData.extraModule.points}
        />
        
        <SectionDivider variant="angle" fillClassName="fill-muted" />
        <ServicePricing />
        
        <SectionDivider variant="wave" direction="up" fillClassName="fill-background" />
        <ServiceFAQ items={pageData.faq} />
        
        <SectionDivider variant="angle" fillClassName="fill-primary" />
        <ServiceFinalCTA />
      </main>
      
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
