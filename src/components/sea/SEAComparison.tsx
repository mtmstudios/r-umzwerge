import { useState } from 'react';
import { X, Check, Phone, ClipboardList, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_LINK } from '@/lib/constants';
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';
import { GewerbeFunnel } from '@/components/contact/sea/GewerbeFunnel';
import type { SEAData } from '@/lib/seaData';

interface SEAComparisonProps {
  data: SEAData;
}

export function SEAComparison({ data }: SEAComparisonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const comparison = data.comparison;

  if (!comparison) return null;

  return (
    <section className="py-14 lg:py-20 bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-10 lg:mb-14">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
            Vergleich
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {comparison.headline}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Transparenter Vergleich – damit Sie die richtige Entscheidung treffen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 lg:mb-14">
          {/* LEFT: Andere Anbieter */}
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-destructive/15 flex items-center justify-center">
                <X className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-foreground">
                Andere Anbieter
              </h3>
            </div>
            <ul className="space-y-4">
              {comparison.pairs.map((pair, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-destructive/15 flex items-center justify-center">
                    <X className="h-3.5 w-3.5 text-destructive" />
                  </div>
                  <span className="text-sm lg:text-base text-foreground/80 leading-relaxed">{pair.problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Räumzwerge */}
          <div className="rounded-2xl border border-accent/30 bg-card p-6 lg:p-8 relative shadow-xl shadow-accent/10">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-primary/10 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-foreground">
                  RÄUMZWERGE
                </h3>
              </div>
              <ul className="space-y-4">
                {comparison.pairs.map((pair, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="text-sm lg:text-base text-foreground font-medium leading-relaxed">{pair.solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Badges */}
        {comparison.badges && comparison.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 lg:mb-14">
            {comparison.badges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                <Check className="h-4 w-4" />
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Dual-CTA: Phone primary, Funnel secondary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="gap-3 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-2xl shadow-lg shadow-cta/25 w-full sm:w-auto"
            data-track="cta-phone-comparison"
          >
            <a href={PHONE_LINK}>
              <Phone className="h-6 w-6" />
              Jetzt anrufen
            </a>
          </Button>
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="gap-2 h-14 md:h-16 px-8 text-base md:text-lg bg-card hover:bg-secondary text-primary border-2 border-primary/30 font-semibold rounded-2xl w-full sm:w-auto"
            data-track="cta-funnel-comparison"
          >
            <ClipboardList className="h-5 w-5" />
            Angebot anfordern
          </Button>
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
      {data.slug === 'gewerbe' && (
        <GewerbeFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </section>
  );
}
