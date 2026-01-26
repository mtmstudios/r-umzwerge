import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';
import { ServiceFAQ as ServiceFAQType } from '@/lib/serviceData';

interface ServiceFAQProps {
  items: ServiceFAQType[];
}

export function ServiceFAQ({ items }: ServiceFAQProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-12 lg:py-24 bg-background">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 lg:mb-4 text-center">
            Häufige Fragen
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground text-center mb-8 lg:mb-12 max-w-2xl mx-auto px-4">
            Antworten auf die wichtigsten Fragen zu dieser Leistung.
          </p>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-4 sm:px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 sm:py-5">
                    <span className="font-medium text-foreground pr-2 sm:pr-4 text-sm sm:text-base">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground">
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
