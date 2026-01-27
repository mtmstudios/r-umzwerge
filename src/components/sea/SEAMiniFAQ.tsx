import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { SEAData } from '@/lib/seaData';

interface SEAMiniFAQProps {
  data: SEAData;
}

export function SEAMiniFAQ({ data }: SEAMiniFAQProps) {
  const isGentle = data.tone === 'gentle';

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Häufige Fragen
            </h2>
            <p className="text-muted-foreground">
              {isGentle
                ? 'Hier finden Sie Antworten auf wichtige Fragen.'
                : 'Schnell beantwortet.'}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {data.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className={cn(
                  "border rounded-xl px-5 transition-all",
                  isGentle
                    ? "bg-background border-border/50 data-[state=open]:border-primary/30"
                    : "bg-card border-transparent data-[state=open]:border-primary/40"
                )}
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
