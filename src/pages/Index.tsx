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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <ProcessSection />
        <ServicesSection />
        <PricingSection />
        <BeforeAfterSection />
        <ReviewsSection />
        <RegionsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingCTAs />
    </div>
  );
};

export default Index;
