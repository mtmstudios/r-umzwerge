import { Link } from 'react-router-dom';
import { ArrowRight, Users, Warehouse, Building2, Lock, Trash2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { SERVICE_PAGES } from '@/lib/serviceData';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

const serviceIcons: Record<string, typeof Users> = {
  'entruempelung': Trash2,
  'haushaltsaufloesung': Users,
  'keller-dachboden-garage': Warehouse,
  'gewerbe-buero-lager': Building2,
  'messie-wohnungen': Lock,
};

export default function ServicesOverview() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const services = Object.values(SERVICE_PAGES);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container-custom">
          <div
            ref={ref}
            className={cn("scroll-reveal", isVisible && "visible")}
          >
            {/* Header */}
            <div className="text-center mb-12 lg:mb-16">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
                Unsere Leistungen
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professionelle Entrümpelung und Haushaltsauflösung in Süddeutschland – 
                transparent, diskret und zuverlässig.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = serviceIcons[service.slug] || Trash2;
                
                return (
                  <Link
                    key={service.slug}
                    to={`/leistungen/${service.slug}`}
                    className="group bg-card border border-border rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-all hover:-translate-y-1"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-2">
                      {service.hero.subline}
                    </p>
                    
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Mehr erfahren
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
