import { Home, Heart, Paintbrush, Key, Building, Warehouse, Wrench, HardHat, Users, Lock, ShieldCheck, Clock, Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { ServiceScenario } from '@/lib/serviceData';
import { LucideIcon } from 'lucide-react';

// Icon mapping based on scenario keywords
const getScenarioIcon = (title: string): LucideIcon => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('auszug') || lowerTitle.includes('wohnungswechsel') || lowerTitle.includes('mietwohnung')) return Home;
  if (lowerTitle.includes('nachlass') || lowerTitle.includes('todesfall') || lowerTitle.includes('erbschaft')) return Heart;
  if (lowerTitle.includes('renovierung') || lowerTitle.includes('umbau')) return Paintbrush;
  if (lowerTitle.includes('übergabe') || lowerTitle.includes('eigentum') || lowerTitle.includes('verkauf')) return Key;
  if (lowerTitle.includes('büro') || lowerTitle.includes('geschäft') || lowerTitle.includes('gewerbe') || lowerTitle.includes('lager') || lowerTitle.includes('flächen')) return Building;
  if (lowerTitle.includes('keller') || lowerTitle.includes('dachboden') || lowerTitle.includes('garage')) return Warehouse;
  if (lowerTitle.includes('baustelle') || lowerTitle.includes('reste')) return HardHat;
  if (lowerTitle.includes('pflegeheim') || lowerTitle.includes('angehörige') || lowerTitle.includes('unterstützung')) return Users;
  if (lowerTitle.includes('diskret') || lowerTitle.includes('bewohnbar') || lowerTitle.includes('peinlich')) return Lock;
  if (lowerTitle.includes('trennung')) return ShieldCheck;
  if (lowerTitle.includes('akut') || lowerTitle.includes('schnell') || lowerTitle.includes('zeitdruck')) return Clock;
  return Wrench;
};

interface ScenarioGridProps {
  scenarios: ServiceScenario[];
}

export function ScenarioGrid({ scenarios }: ScenarioGridProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-12 lg:py-24 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 lg:mb-4 text-center">
            Für diese Situationen sind wir da
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground text-center mb-8 lg:mb-12 max-w-2xl mx-auto px-4">
            Wir verstehen, dass jede Situation anders ist – und handeln entsprechend.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {scenarios.map((scenario, index) => {
              const Icon = getScenarioIcon(scenario.title);
              
              return (
                <div
                  key={scenario.title}
                  className="group relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-5 sm:p-6 lg:p-8 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  
                  <div className="relative z-10 text-center lg:text-left">
                    {/* Header with icon and title */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">
                          {scenario.title}
                        </h3>
                        {/* Badges */}
                        {scenario.badges && scenario.badges.length > 0 && (
                          <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
                            {scenario.badges.map((badge) => (
                              <span 
                                key={badge}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Emotional hook - the "pain point" quote */}
                    <div className="mb-4 lg:pl-4 lg:border-l-2 border-primary/30">
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        {scenario.emotionalHook}
                      </p>
                    </div>

                    {/* Solution description */}
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
