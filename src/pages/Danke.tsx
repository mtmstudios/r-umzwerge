import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Search, PhoneCall, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FEATURED_REVIEWS } from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const nextSteps = [
  {
    icon: Search,
    title: 'Prüfung',
    description: 'Wir werten Ihre Objektdaten aus und bereiten eine erste Einschätzung vor.',
  },
  {
    icon: PhoneCall,
    title: 'Rückruf',
    description: 'Unser Teamleiter ruft Sie für eine kostenlose Ersteinschätzung an. Bitte halten Sie Ihr Telefon bereit.',
  },
];

export default function Danke() {
  useEffect(() => {
    document.title = 'Vielen Dank! | Räumzwerge';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 lg:py-32 bg-background">
          <div className="container-custom text-center px-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6 md:mb-8">
              <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-accent" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-5 leading-tight">
              Vielen Dank! Ihre Anfrage war erfolgreich.
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-14">
              Wir haben Ihre Daten erhalten und melden uns in Kürze bei Ihnen.
            </p>

            {/* Next Steps */}
            <div className="max-w-2xl mx-auto mb-12 md:mb-16">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-6 md:mb-8">
                Was passiert als Nächstes?
              </h2>

              <div className="space-y-4 md:space-y-5">
                {nextSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 md:gap-5 p-5 md:p-6 rounded-2xl border border-border bg-card text-left shadow-sm"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-base md:text-lg mb-1">
                        Schritt {index + 1}: {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Reviews */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-custom px-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground text-center mb-8 md:mb-10">
              Sie sind in besten Händen
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-10">
              {FEATURED_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="bg-card rounded-xl border border-border p-5 md:p-6 shadow-sm"
                >
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-foreground/90 mb-3 leading-relaxed italic">
                    „{review.text}"
                  </p>
                  <p className="text-sm font-semibold text-muted-foreground">
                    – {review.author}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" className="gap-2 h-12 md:h-14 px-6 md:px-8 text-sm md:text-base rounded-xl">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Startseite
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
