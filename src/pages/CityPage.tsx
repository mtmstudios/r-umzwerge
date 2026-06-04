import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
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

const BASE_URL = 'https://raeumzwerge.de';

// Standard process steps (same for all cities)
const CITY_PROCESS_STEPS = [
  {
    title: "Anfrage starten",
    description: "Starten Sie Ihre kostenlose Angebots-Berechnung in nur 5 Schritten.",
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

  // City-specific schema: BreadcrumbList + Service
  useEffect(() => {
    if (!cityData) return;

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: `Entrümpelung ${cityData.name}`, item: `${BASE_URL}/${cityData.slug}` },
      ],
    };

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Entrümpelung ${cityData.name}`,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Räumzwerge',
        url: BASE_URL,
        telephone: '+49 176 22245161',
      },
      areaServed: { '@type': 'City', name: cityData.name },
      serviceType: 'Entrümpelung',
      description: cityData.metaDescription,
    };

    const inject = (id: string, data: object) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      el.text = JSON.stringify(data);
      document.head.appendChild(el);
    };

    inject('city-breadcrumb-schema', breadcrumbSchema);
    inject('city-service-schema', serviceSchema);

    return () => {
      document.getElementById('city-breadcrumb-schema')?.remove();
      document.getElementById('city-service-schema')?.remove();
    };
  }, [cityData]);

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

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-secondary/20 border-b border-border/20">
          <div className="container-custom py-3">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" className="hover:text-foreground transition-colors" itemProp="item">
                  <span itemProp="name">Startseite</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li aria-hidden="true" className="text-border">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-foreground font-medium" itemProp="name">
                  Entrümpelung {cityData.name}
                </span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </div>
        </nav>

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

        {/* Einzugsgebiet / Nearby Areas */}
        {cityData.nearbyAreas.length > 0 && (
          <section className="py-14 bg-secondary/10">
            <div className="container-custom text-center">
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
                Einzugsgebiet
              </span>
              <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-3">
                Wir entrümpeln auch rund um {cityData.name}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Unser Team ist nicht nur in {cityData.name} aktiv – wir decken die gesamte Region ab.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {cityData.nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground"
                  >
                    Entrümpelung {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <SectionDivider variant="angle" fillClassName="fill-primary" />
        <ServiceFinalCTA />
      </main>
      
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
