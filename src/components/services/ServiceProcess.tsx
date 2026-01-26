import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { Camera, Clock, Sparkles } from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
}

interface ServiceProcessProps {
  steps: ProcessStep[];
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  // Map the incoming steps to the timeline format with icons
  const icons = [Camera, Clock, Sparkles];
  const timelineSteps = steps.map((step, index) => ({
    number: index + 1,
    icon: icons[index] || Sparkles,
    title: step.title,
    description: step.description,
  }));

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="text-center mb-16">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
              Ablauf
            </span>
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              So läuft's ab
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In drei einfachen Schritten zur besenreinen Übergabe.
            </p>
          </div>

          <HorizontalTimeline steps={timelineSteps} />
        </div>
      </div>
    </section>
  );
}
