import { MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { SEAData } from '@/lib/seaData';

interface SEAPainPointsProps {
  data: SEAData;
}

export function SEAPainPoints({ data }: SEAPainPointsProps) {
  const isGentle = data.tone === 'gentle';

  return (
    <section className={cn(
      "py-12 lg:py-20",
      isGentle ? "bg-muted/30" : "bg-muted/50"
    )}>
      <div className="container-custom">
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
            Wir verstehen Ihre Situation
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {isGentle
              ? 'Sie sind nicht allein. Wir helfen – ohne Druck, ohne Wertung.'
              : 'Egal, was Sie gerade beschäftigt – wir haben die Lösung.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.painPoints.map((point, index) => (
            <Card
              key={index}
              className={cn(
                "border-none shadow-lg transition-all duration-300 hover:shadow-xl",
                isGentle ? "bg-background" : "bg-card"
              )}
            >
              <CardContent className="p-6 lg:p-8">
                {/* Problem */}
                <div className="flex items-start gap-3 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-foreground/80 italic leading-relaxed pt-1.5">
                    „{point.problem}"
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center mb-6">
                  <ArrowRight className="h-6 w-6 text-accent rotate-90 lg:rotate-0" />
                </div>

                {/* Solution */}
                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-accent">
                  <p className="text-foreground font-medium leading-relaxed">
                    {point.solution}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
