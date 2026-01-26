import { Home, Heart, Paintbrush, Key, Building, Warehouse, Wrench, HardHat, Users, Lock, ShieldCheck, Clock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { ServiceScenario } from '@/lib/serviceData';
import { LucideIcon } from 'lucide-react';

// Icon mapping based on scenario keywords
const getScenarioIcon = (title: string): LucideIcon => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('auszug') || lowerTitle.includes('wohnungswechsel') || lowerTitle.includes('mietwohnung')) return Home;
  if (lowerTitle.includes('nachlass') || lowerTitle.includes('todesfall')) return Heart;
  if (lowerTitle.includes('renovierung') || lowerTitle.includes('umbau')) return Paintbrush;
  if (lowerTitle.includes('übergabe') || lowerTitle.includes('eigentum') || lowerTitle.includes('verkauf')) return Key;
  if (lowerTitle.includes('büro') || lowerTitle.includes('geschäft') || lowerTitle.includes('gewerbe')) return Building;
  if (lowerTitle.includes('keller') || lowerTitle.includes('dachboden') || lowerTitle.includes('garage') || lowerTitle.includes('lager')) return Warehouse;
  if (lowerTitle.includes('baustelle') || lowerTitle.includes('reste')) return HardHat;
  if (lowerTitle.includes('pflegeheim') || lowerTitle.includes('angehörige') || lowerTitle.includes('unterstützung')) return Users;
  if (lowerTitle.includes('diskret') || lowerTitle.includes('bewohnbar')) return Lock;
  if (lowerTitle.includes('trennung')) return ShieldCheck;
  if (lowerTitle.includes('akut') || lowerTitle.includes('schnell')) return Clock;
  return Wrench;
};

interface ScenarioGridProps {
  scenarios: ServiceScenario[];
}

export function ScenarioGrid({ scenarios }: ScenarioGridProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4 text-center">
            Für wen ist das?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Typische Situationen, in denen wir helfen können.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {scenarios.map((scenario, index) => {
              const Icon = getScenarioIcon(scenario.title);
              
              return (
                <div
                  key={scenario.title}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-200"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {scenario.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
