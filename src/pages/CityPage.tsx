import { useParams, Navigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { CityHero } from '@/components/city/CityHero';
import { CityServices } from '@/components/city/CityServices';
import { CityFAQ } from '@/components/city/CityFAQ';
import { CityComparison } from '@/components/city/CityComparison';
import { ServiceTrustBar } from '@/components/services/ServiceTrustBar';
import { ServiceProcess } from '@/components/services/ServiceProcess';
import { ServicePricing } from '@/components/services/ServicePricing';
import { ServiceFinalCTA } from '@/components/services/ServiceFinalCTA';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { CITY_PAGES, isValidCitySlug } from '@/lib/cityData';
import { useSeo } from '@/hooks/useSeo';

// Standard process steps (same for all cities)
const CITY_PROCESS_STEPS = [
  {
    title: "Fotos senden",
    description: "Senden Sie uns Fotos per WhatsApp für eine schnelle Einschätzung.",
  },
  {
    title: "Angebot erhalten",
    description: "Innerhalb von 24 Stunden erhalten Sie eine unverbindliche Preiseinschätzung.",
  },
  {
    title: "Besenrein übergeben",
    description: "Wir räumen, entsorgen und übergeben besenrein – alles aus einer Hand.",
  },
];

export default function CityPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  
  // Get city data (returns undefined if invalid)
  const cityData = citySlug ? CITY_PAGES[citySlug] : undefined;
  
  useSeo({
    title: cityData?.metaTitle ?? 'Räumzwerge – Entrümpelung in Süddeutschland',
    description: cityData?.metaDescription ?? '',
    path: `/${citySlug ?? ''}`,
    faqItems: cityData?.faq,
  });

  // Check if this is a valid city slug - after hooks
  if (!citySlug || !isValidCitySlug(citySlug) || !cityData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <CityHero
          h1={cityData.hero.h1}
          subline={cityData.hero.subline}
          trustPills={cityData.hero.trustPills}
          imageAlt={cityData.hero.imageAlt}
        />
        
        {/* Trust Bar */}
        <ServiceTrustBar />
        
        {/* Process */}
        <ServiceProcess steps={CITY_PROCESS_STEPS} />
        
        {/* City-specific Services */}
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--secondary) / 0.3)" 
          toColor="hsl(var(--background))" 
        />
        <CityServices cityName={cityData.name} services={cityData.services} />
        
        {/* Comparison */}
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--background))" 
          toColor="hsl(var(--secondary) / 0.3)" 
        />
        <CityComparison cityName={cityData.name} />
        
        {/* Pricing */}
        <SectionDivider 
          variant="gradient" 
          fromColor="hsl(var(--secondary) / 0.3)" 
          toColor="hsl(var(--background))" 
        />
        <ServicePricing 
          headline={`Entrümpelung in ${cityData.name} – Transparente Preise`}
          subline="Keine versteckten Kosten. Festpreis nach Einschätzung möglich."
        />
        
        {/* City-specific FAQ */}
        <CityFAQ cityName={cityData.name} items={cityData.faq} />
        
        {/* Final CTA */}
        <SectionDivider variant="angle" fillClassName="fill-primary" />
        <ServiceFinalCTA />
      </main>
      
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
