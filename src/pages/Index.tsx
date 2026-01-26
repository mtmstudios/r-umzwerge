import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { RegionsSection } from '@/components/sections/RegionsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { SectionDivider } from '@/components/ui/SectionDivider';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        
        <SectionDivider variant="curve" fillClassName="fill-background" />
        <ProcessSection />
        
        <SectionDivider variant="angle" direction="down" fillClassName="fill-secondary/30" />
        <ServicesSection />
        
        <SectionDivider variant="wave" direction="up" fillClassName="fill-background" />
        <PricingSection />
        
        <SectionDivider variant="curve" fillClassName="fill-muted" />
        <BeforeAfterSection />
        
        <SectionDivider variant="angle" direction="down" fillClassName="fill-background" />
        <ReviewsSection />
        
        <SectionDivider variant="wave" fillClassName="fill-secondary/30" />
        <RegionsSection />
        
        <SectionDivider variant="curve" direction="up" fillClassName="fill-background" />
        <FAQSection />
        
        <SectionDivider variant="angle" fillClassName="fill-primary" />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingCTAs />
    </div>
  );
};

export default Index;
