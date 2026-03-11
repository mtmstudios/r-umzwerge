import { useState } from 'react';
import { ClipboardList, Phone } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { PHONE_LINK } from '@/lib/constants';
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';
import type { SEAData } from '@/lib/seaData';

interface SEAMiniFAQProps {
  data: SEAData;
}

export function SEAMiniFAQ({ data }: SEAMiniFAQProps) {
  const isGentle = data.tone === 'gentle';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12 lg:py-20 bg-secondary/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Häufige Fragen
            </h2>
            <p className="text-muted-foreground">
              {isGentle ? 'Hier finden Sie Antworten auf wichtige Fragen.' : 'Schnell beantwortet.'}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {data.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className={cn(
                  "glass rounded-xl px-5 overflow-hidden border border-border/30",
                  "data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5",
                  isGentle ? "data-[state=open]:border-primary/30" : "data-[state=open]:border-accent/30",
                  "hover:bg-card/80 transition-all duration-300"
                )}
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:no-underline py-5 transition-colors duration-200 data-[state=open]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center glass rounded-xl p-5 border border-border/30">
            <p className="text-sm text-muted-foreground mb-3">
              {isGentle ? 'Ihre Frage war nicht dabei? Wir helfen Ihnen gerne persönlich.' : 'Ihre Frage war nicht dabei?'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cta hover:text-cta-hover transition-colors"
                data-track="cta-funnel-faq"
              >
                <ClipboardList className="h-4 w-4" />
                Kostenloses Angebot berechnen
              </button>
              <span className="hidden sm:inline text-border">|</span>
              <a
                href={PHONE_LINK}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                data-track="cta-phone-faq"
              >
                <Phone className="h-4 w-4" />
                Jetzt anrufen
              </a>
            </div>
          </div>
        </div>
      </div>

      {data.slug === 'haushaltsaufloesung' && (
        <HaushaltsaufloesungFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
      {data.slug === 'entruempelung' && (
        <EntruempelungFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
      {data.slug === 'messie-hilfe' && (
        <MessieFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </section>
  );
}
