import { MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { cn } from '@/lib/utils';
import { getWhatsAppLink } from '@/lib/constants';
import type { SEAData } from '@/lib/seaData';

interface SEAPainPointsProps {
  data: SEAData;
}

export function SEAPainPoints({ data }: SEAPainPointsProps) {
  const isGentle = data.tone === 'gentle';
  const isDirect = data.tone === 'direct';

  // CTA-Text je nach Ton
  const getCtaText = () => {
    if (isGentle) return 'Unverbindlich schreiben';
    if (isDirect) return 'Preis anfragen';
    return 'Jetzt Hilfe anfragen';
  };

  // WhatsApp-Nachricht mit Kontext
  const getWhatsAppMessage = (problem: string) => {
    return `Hallo Räumzwerge, ${isGentle ? 'ich brauche diskret Hilfe' : 'ich hätte gerne eine Preiseinschätzung'}. Meine Situation: ${problem.substring(0, 50)}... Ort: ____.`;
  };

  return (
    <section className={cn(
      "py-12 lg:py-20",
      isGentle ? "bg-muted/30" : "bg-muted/50"
    )}>
      <div className="container-custom">
        {/* Header mit angepasstem Text */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
            {isGentle ? 'Wir verstehen, wie Sie sich fühlen' : 'Kennen Sie das?'}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {isGentle
              ? 'Sie sind nicht allein. Wir helfen – ohne Druck, ohne Wertung.'
              : 'Diese Situationen kennen wir. Und wir haben die Lösung.'}
          </p>
        </div>

        {/* Dialog-Karten Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.painPoints.map((point, index) => (
            <Card
              key={index}
              className={cn(
                "border-none shadow-lg transition-all duration-300",
                "hover:shadow-xl hover:-translate-y-1",
                "hover:shadow-primary/10",
                isGentle ? "bg-background" : "bg-card"
              )}
            >
              <CardContent className="p-6 lg:p-8 flex flex-col h-full">
                {/* Problem: Emotionales Zitat */}
                <div className="flex-grow mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                      isGentle ? "bg-primary/10" : "bg-accent/10"
                    )}>
                      <MessageCircle className={cn(
                        "h-5 w-5",
                        isGentle ? "text-primary/70" : "text-accent"
                      )} />
                    </div>
                    <span className="text-sm text-muted-foreground pt-2.5">
                      Was wir oft hören:
                    </span>
                  </div>
                  <blockquote className="text-lg lg:text-xl text-foreground/90 italic leading-relaxed pl-4 border-l-2 border-muted">
                    „{point.problem}"
                  </blockquote>
                </div>

                {/* Lösung mit grünem Akzent */}
                <div className={cn(
                  "rounded-xl p-4 mb-4",
                  "bg-gradient-to-r from-primary/10 to-primary/5",
                  "border-l-4 border-primary"
                )}>
                  <p className="text-sm font-medium text-primary/70 mb-1">
                    Unsere Lösung:
                  </p>
                  <p className="text-foreground font-medium leading-relaxed">
                    {point.solution}
                  </p>
                </div>

                {/* WhatsApp Mini-CTA */}
                <a
                  href={getWhatsAppLink(getWhatsAppMessage(point.problem))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "w-full justify-between",
                      "border-primary/30 text-primary",
                      "hover:bg-primary hover:text-primary-foreground",
                      "transition-all duration-300",
                      "group-hover:border-primary"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <WhatsAppIcon className="h-4 w-4" />
                      {getCtaText()}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
