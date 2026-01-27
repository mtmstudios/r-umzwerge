import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, ExternalLink, Accessibility, CheckCircle2, AlertCircle, MessageSquare, Scale, Monitor, Users } from 'lucide-react';
import { PHONE_NUMBER, EMAIL } from '@/lib/constants';

export default function Barrierefreiheit() {
  const tocItems = [
    { id: 'geltungsbereich', label: '1. Geltungsbereich' },
    { id: 'stand', label: '2. Stand der Barrierefreiheit' },
    { id: 'einschraenkungen', label: '3. Bekannte Einschränkungen' },
    { id: 'erstellung', label: '4. Erstellung dieser Erklärung' },
    { id: 'feedback', label: '5. Feedback und Kontakt' },
    { id: 'durchsetzung', label: '6. Durchsetzungsverfahren' },
    { id: 'technisch', label: '7. Technische Anforderungen' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom max-w-3xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Erklärung zur Barrierefreiheit
            </h1>
            <p className="text-muted-foreground">
              Stand: Januar 2026 | Gemäß BFSG und BITV 2.0
            </p>
          </div>

          {/* Table of Contents */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-primary" />
                Inhaltsverzeichnis
              </h2>
              <nav>
                <ul className="space-y-2">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>

          {/* 1. Geltungsbereich */}
          <section id="geltungsbereich" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              1. Geltungsbereich
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Diese Erklärung zur Barrierefreiheit gilt für die Website{' '}
                <strong className="text-foreground">raeumzwerge.de</strong>, betrieben von:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-foreground">
                <p className="font-medium">Räumzwerge</p>
                <p>Inhaber: Adem Kekec</p>
                <p>Bibertalstraße 1</p>
                <p>89278 Nersingen</p>
              </div>
              <p>
                Wir sind bestrebt, unsere Website im Einklang mit dem Barrierefreiheitsstärkungsgesetz 
                (BFSG) sowie der Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) barrierefrei 
                zugänglich zu machen.
              </p>
            </div>
          </section>

          {/* 2. Stand der Barrierefreiheit */}
          <section id="stand" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              2. Stand der Barrierefreiheit
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Diese Website ist <strong className="text-foreground">teilweise barrierefrei</strong>. 
                Wir arbeiten kontinuierlich daran, die Barrierefreiheit unserer Website zu verbessern 
                und die Anforderungen der WCAG 2.1 Level AA zu erfüllen.
              </p>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Umgesetzte Maßnahmen</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Semantisch korrekte HTML-Struktur mit Überschriftenhierarchie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Tastaturnavigation für alle interaktiven Elemente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Ausreichende Farbkontraste gemäß WCAG 2.1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Alternative Texte für alle informativen Bilder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Skalierbare Schriftgrößen ohne Funktionsverlust</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Barrierefreiheits-Widget zur Anpassung von Schriftgröße, Kontrast und Animationen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Unterstützung für reduzierte Bewegung (prefers-reduced-motion)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Fokus-Indikatoren für alle interaktiven Elemente</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Bekannte Einschränkungen */}
          <section id="einschraenkungen" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              3. Bekannte Einschränkungen
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Trotz unserer Bemühungen können folgende Bereiche Barrieren aufweisen:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-cta flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Vorher-Nachher-Bilder:</strong>
                    <p className="text-sm mt-1">
                      Die interaktiven Bildvergleiche sind möglicherweise nicht vollständig mit 
                      Screenreadern kompatibel. Alternative Beschreibungen werden bereitgestellt.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-cta flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Externe Dienste:</strong>
                    <p className="text-sm mt-1">
                      WhatsApp und andere externe Dienste unterliegen deren eigenen 
                      Barrierefreiheitsstandards.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-cta flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">PDF-Dokumente:</strong>
                    <p className="text-sm mt-1">
                      Ältere PDF-Dokumente sind möglicherweise nicht vollständig barrierefrei. 
                      Bei Bedarf stellen wir Inhalte in alternativen Formaten bereit.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Erstellung dieser Erklärung */}
          <section id="erstellung" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              4. Erstellung dieser Erklärung
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Diese Erklärung wurde am <strong className="text-foreground">15. Januar 2026</strong> erstellt.
              </p>
              <p>
                <strong className="text-foreground">Methodik der Bewertung:</strong> Selbstbewertung 
                auf Grundlage der Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
              </p>
              <p>
                <strong className="text-foreground">Letzte Überprüfung:</strong> Januar 2026
              </p>
              <p>
                Wir überprüfen diese Erklärung regelmäßig und aktualisieren sie bei wesentlichen 
                Änderungen an unserer Website.
              </p>
            </div>
          </section>

          {/* 5. Feedback und Kontakt */}
          <section id="feedback" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              5. Feedback und Kontakt
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Wir sind bestrebt, Barrieren zu beseitigen und unsere Website kontinuierlich zu 
                verbessern. Wenn Sie auf Barrieren stoßen oder Informationen in einem anderen 
                Format benötigen, kontaktieren Sie uns bitte:
              </p>
              <Card>
                <CardContent className="pt-6">
                  <p className="font-medium text-foreground mb-4">
                    Ansprechpartner für Barrierefreiheit:
                  </p>
                  <div className="space-y-3">
                    <a 
                      href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      {PHONE_NUMBER}
                    </a>
                    <a 
                      href={`mailto:${EMAIL}?subject=Barrierefreiheit`}
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      {EMAIL}
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Wir bemühen uns, auf Ihre Anfrage innerhalb von 2 Wochen zu antworten.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 6. Durchsetzungsverfahren */}
          <section id="durchsetzung" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              6. Durchsetzungsverfahren
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Sollten Sie mit unserer Antwort auf Ihre Anfrage nicht zufrieden sein oder 
                innerhalb einer angemessenen Frist keine Antwort erhalten haben, können Sie 
                sich an die zuständige Durchsetzungsstelle wenden.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-foreground">
                <p className="font-medium">Schlichtungsstelle nach § 16 BGG</p>
                <p className="mt-2">Beauftragter der Bundesregierung für die Belange von Menschen mit Behinderungen</p>
                <p>Mauerstraße 53</p>
                <p>10117 Berlin</p>
                <p className="mt-3">
                  <a 
                    href="mailto:info@schlichtungsstelle-bgg.de"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    info@schlichtungsstelle-bgg.de
                  </a>
                </p>
                <p>
                  <a 
                    href="https://www.schlichtungsstelle-bgg.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                  >
                    www.schlichtungsstelle-bgg.de
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>
              <p>
                Das Schlichtungsverfahren ist kostenlos und ermöglicht eine außergerichtliche 
                Streitbeilegung.
              </p>
            </div>
          </section>

          {/* 7. Technische Anforderungen */}
          <section id="technisch" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              7. Technische Anforderungen
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Für eine optimale barrierefreie Nutzung unserer Website empfehlen wir:
              </p>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Unterstützte Browser</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Google Chrome (aktuelle Version)</li>
                  <li>Mozilla Firefox (aktuelle Version)</li>
                  <li>Safari (aktuelle Version)</li>
                  <li>Microsoft Edge (aktuelle Version)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Assistive Technologien</h3>
                <p>
                  Unsere Website wurde mit folgenden assistiven Technologien getestet:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>NVDA (Windows)</li>
                  <li>VoiceOver (macOS/iOS)</li>
                  <li>Tastaturnavigation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Barrierefreiheits-Funktionen</h3>
                <p>
                  Nutzen Sie das Barrierefreiheits-Widget im Footer, um:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Die Schriftgröße anzupassen (Normal, Groß, Sehr groß)</li>
                  <li>Den Kontrast zu erhöhen</li>
                  <li>Animationen zu reduzieren</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
