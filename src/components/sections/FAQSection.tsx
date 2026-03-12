import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQ_ITEMS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const half = Math.ceil(FAQ_ITEMS.length / 2);

  return (
    <section id="faq" className="py-12 md:py-14 lg:py-16 bg-background">
      <div className="container-custom">
        <div ref={ref} className={cn("text-center mb-8 md:mb-10", "scroll-reveal", isVisible && "visible")}>
          <h2 className="text-section-mobile lg:text-section text-foreground mb-4">Die Räumzwerge antworten (FAQ)</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.slice(0, half).map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-xl border border-border px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.slice(half).map((item, index) => (
              <AccordionItem key={index} value={`item-${index + half}`} className="bg-card rounded-xl border border-border px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
