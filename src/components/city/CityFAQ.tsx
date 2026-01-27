import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import type { CityFAQItem } from '@/lib/cityData';

interface CityFAQProps {
  cityName: string;
  items: CityFAQItem[];
}

export function CityFAQ({ cityName, items }: CityFAQProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
              FAQ
            </span>
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Häufige Fragen zur Entrümpelung in {cityName}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Antworten auf die wichtigsten Fragen zu unseren Leistungen in {cityName} und Umgebung.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
