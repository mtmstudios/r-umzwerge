import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { PHONE_NUMBER, EMAIL, ADDRESS } from '@/lib/constants';

const META_TITLE = "Impressum | Räumzwerge – Entrümpelung in Süddeutschland";
const META_DESCRIPTION = "Impressum der Räumzwerge. Angaben gemäß § 5 TMG. Entrümpelung und Haushaltsauflösung in Bayern und Baden-Württemberg.";

export default function Impressum() {
  // SEO: Dynamic title and meta description
  useEffect(() => {
    document.title = META_TITLE;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', META_DESCRIPTION);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom max-w-3xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Impressum
            </h1>
            <p className="text-muted-foreground">
              Angaben gemäß § 5 TMG / § 5 DDG
            </p>
          </div>

          {/* Company Information Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-1 text-foreground">
                <p className="font-semibold">Räumzwerge</p>
                <p>Inhaber: Adem Kekec</p>
              </div>
              <div className="mt-4 flex items-start gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p>Bibertalstraße 1</p>
                  <p>89278 Nersingen</p>
                  <p>Deutschland</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Kontakt
              </h2>
              <div className="space-y-3">
                <a 
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  {PHONE_NUMBER}
                </a>
                <a 
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  {EMAIL}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* USt-IdNr Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p className="text-muted-foreground">
              Eine Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz liegt nicht vor.
            </p>
          </section>

          {/* Responsible for Content */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <div className="text-foreground">
              <p>Adem Kekec</p>
              <p>Bibertalstraße 1</p>
              <p>89278 Nersingen</p>
            </div>
          </section>

          {/* EU Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              EU-Streitschlichtung
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              </p>
              <a 
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
              >
                https://ec.europa.eu/consumers/odr/
                <ExternalLink className="h-4 w-4" />
              </a>
              <p>
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>

          {/* Liability for Content */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Haftung für Inhalte
            </h2>
            <p className="text-muted-foreground">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
              Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von 
              Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche 
              Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung 
              möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte 
              umgehend entfernen.
            </p>
          </section>

          {/* Liability for Links */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Haftung für Links
            </h2>
            <p className="text-muted-foreground">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
              Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf 
              mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der 
              Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten 
              ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei 
              Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          {/* Copyright */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Urheberrecht
            </h2>
            <p className="text-muted-foreground">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
              Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
              nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf 
              dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter 
              beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie 
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen 
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
              Inhalte umgehend entfernen.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <FloatingCTAs />
    </div>
  );
}
