import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { ServiceScenario } from '@/lib/serviceData';

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
            {scenarios.map((scenario, index) => (
              <div
                key={scenario.title}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <h3 className="font-semibold text-foreground mb-2">
                  {scenario.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
