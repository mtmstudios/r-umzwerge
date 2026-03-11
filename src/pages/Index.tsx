import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { RegionsSection } from '@/components/sections/RegionsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { FAQ_ITEMS } from '@/lib/constants';

const Index = () => {
  const location = useLocation();

  // Scroll to anchor when navigating from another page
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // FAQ Schema.org für Startseite
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema-home';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById('faq-schema-home')?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--primary))" 
          toColor="hsl(var(--background))" 
        />
        <ProcessSection />
        
        <SectionDivider variant="angle" direction="down" fillClassName="fill-secondary/30" />
        <ServicesSection />
        
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--secondary) / 0.3)" 
          toColor="hsl(var(--background))" 
        />
        <PricingSection />
        
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--background))" 
          toColor="hsl(var(--secondary) / 0.3)" 
        />
        <BeforeAfterSection />
        
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--secondary) / 0.3)" 
          toColor="hsl(var(--background))" 
        />
        <ReviewsSection />
        
        <SectionDivider variant="wave" fillClassName="fill-secondary/30" svgHeightClassName="h-8 md:h-10 lg:h-12" />
        <RegionsSection />
        
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--secondary) / 0.3)" 
          toColor="hsl(var(--background))"
          height={32}
        />
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
