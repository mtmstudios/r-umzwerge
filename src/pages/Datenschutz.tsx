import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, ExternalLink, Shield, Lock, Cookie, Users, Server, MessageSquare, BarChart3, Megaphone, Settings } from 'lucide-react';
import { PHONE_NUMBER, EMAIL } from '@/lib/constants';
import { useCookieConsent } from '@/components/consent/CookieConsentContext';

function CookieSettingsButton() {
  const { openBanner } = useCookieConsent();
  return (
    <Button onClick={openBanner} variant="outline" className="gap-2">
      <Cookie className="h-4 w-4" />
      Cookie-Einstellungen öffnen
    </Button>
  );
}

export default function Datenschutz() {
  const tocItems = [
    { id: 'verantwortlicher', label: '1. Verantwortlicher' },
    { id: 'allgemeine-hinweise', label: '2. Allgemeine Hinweise' },
    { id: 'hosting', label: '3. Hosting' },
    { id: 'kontaktformular', label: '4. Kontaktformular' },
    { id: 'whatsapp', label: '5. WhatsApp' },
    { id: 'google-analytics', label: '6. Google Analytics 4' },
    { id: 'google-ads', label: '7. Google Ads' },
    { id: 'schriftarten', label: '8. Schriftarten' },
    { id: 'cookies', label: '9. Cookies' },
    { id: 'betroffenenrechte', label: '10. Betroffenenrechte' },
    { id: 'cookie-einstellungen', label: '11. Cookie-Einstellungen ändern' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom max-w-3xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-muted-foreground">
              Stand: Januar 2026
            </p>
          </div>

          {/* Table of Contents */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
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

          {/* 1. Verantwortlicher */}
          <section id="verantwortlicher" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              1. Verantwortlicher
            </h2>
            <Card>
              <CardContent className="pt-6">
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
                <div className="mt-4 space-y-2">
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
          </section>

          {/* 2. Allgemeine Hinweise */}
          <section id="allgemeine-hinweise" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              2. Allgemeine Hinweise und Pflichtinformationen
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Datenschutz</h3>
                <p className="text-muted-foreground">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
                  Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">SSL- bzw. TLS-Verschlüsselung</h3>
                <p className="text-muted-foreground">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                  Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie 
                  daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem 
                  Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p className="text-muted-foreground">
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. 
                  Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit 
                  der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
                <p className="text-muted-foreground mb-3">
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei 
                  einer Aufsichtsbehörde zu. Die für uns zuständige Aufsichtsbehörde ist:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg text-foreground">
                  <p className="font-medium">Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</p>
                  <p>Promenade 18</p>
                  <p>91522 Ansbach</p>
                  <p className="mt-2">
                    <a 
                      href="mailto:poststelle@lda.bayern.de"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      poststelle@lda.bayern.de
                    </a>
                  </p>
                  <p>
                    <a 
                      href="https://www.lda.bayern.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                    >
                      www.lda.bayern.de
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Recht auf Datenübertragbarkeit</h3>
                <p className="text-muted-foreground">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung 
                  eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, 
                  maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der 
                  Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch 
                  machbar ist.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Hosting */}
          <section id="hosting" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              3. Hosting
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Unsere Website wird bei United Domains AG gehostet.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-foreground">
                <p className="font-medium">United Domains AG</p>
                <p>Gautinger Str. 10</p>
                <p>82319 Starnberg, Deutschland</p>
              </div>
              <p>
                Wenn Sie unsere Website besuchen, werden automatisch Informationen in sogenannten 
                Server-Logfiles gespeichert, die Ihr Browser automatisch an uns übermittelt:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>IP-Adresse</li>
                <li>Browser-Typ und -Version</li>
                <li>Betriebssystem</li>
                <li>Referrer-URL (zuvor besuchte Seite)</li>
                <li>Zeitpunkt des Zugriffs</li>
              </ul>
              <p>
                <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO 
                (berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung unserer Website).
              </p>
              <p>
                <strong className="text-foreground">Speicherdauer:</strong> Server-Logfiles werden nach 
                30 Tagen automatisch gelöscht.
              </p>
            </div>
          </section>

          {/* 4. Kontaktformular */}
          <section id="kontaktformular" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              4. Kontaktformular (N8N Cloud)
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                Anfrageformular zur Bearbeitung der Anfrage bei uns verarbeitet.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-foreground">
                <p className="font-medium">Auftragsverarbeiter: n8n GmbH</p>
                <p>Borsigstraße 27</p>
                <p>10115 Berlin, Deutschland</p>
              </div>
              <p>
                Die Formulardaten werden über den Automatisierungsdienst N8N Cloud als Auftragsverarbeiter 
                gemäß Art. 28 DSGVO an uns weitergeleitet.
              </p>
              <p>
                <strong className="text-foreground">Erfasste Daten:</strong> Name, E-Mail-Adresse, 
                Telefonnummer (falls angegeben), Ihre Nachricht
              </p>
              <p>
                <strong className="text-foreground">Zweck:</strong> Bearbeitung Ihrer Kontaktanfrage
              </p>
              <p>
                <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO 
                (Vertragsanbahnung) und Art. 28 DSGVO (Auftragsverarbeitung)
              </p>
              <p>
                <strong className="text-foreground">Speicherdauer:</strong> Ihre Daten werden nach 
                abschließender Bearbeitung Ihrer Anfrage und Ablauf etwaiger gesetzlicher 
                Aufbewahrungsfristen gelöscht.
              </p>
            </div>
          </section>

          {/* 5. WhatsApp */}
          <section id="whatsapp" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              5. WhatsApp-Kommunikation
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Für die Kommunikation mit unseren Kunden nutzen wir WhatsApp Business.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-foreground">
                <p className="font-medium">WhatsApp Ireland Limited</p>
                <p>4 Grand Canal Square</p>
                <p>Dublin 2, Irland</p>
                <p className="text-sm text-muted-foreground mt-2">
                  (Muttergesellschaft: Meta Platforms, Inc., USA)
                </p>
              </div>
              <p>
                <strong className="text-foreground">Erfasste Daten:</strong> Telefonnummer, 
                Nachrichteninhalte, Zeitstempel
              </p>
              <p>
                <strong className="text-foreground">Datenübermittlung:</strong> USA 
                (EU-US Data Privacy Framework)
              </p>
              <p>
                <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO 
                (Vertragsanbahnung bzw. -erfüllung)
              </p>
              <p>
                <strong className="text-foreground">Hinweis:</strong> Bei Nutzung von WhatsApp gelten 
                zusätzlich die{' '}
                <a 
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  Datenschutzbestimmungen von Meta
                  <ExternalLink className="h-3 w-3" />
                </a>.
              </p>
            </div>
          </section>

          {/* 6. Google Analytics 4 */}
          <section id="google-analytics" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              6. Google Analytics 4
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Diese Website nutzt Google Analytics 4, einen Webanalysedienst der Google Ireland Limited.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-foreground">
                <p className="font-medium">Google Ireland Limited</p>
                <p>Gordon House, Barrow Street</p>
                <p>Dublin 4, Irland</p>
              </div>
              <p>
                <strong className="text-foreground">Zweck:</strong> Analyse des Nutzerverhaltens zur 
                Optimierung unserer Website
              </p>
              <p>
                <strong className="text-foreground">Erfasste Daten:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Seitenaufrufe und Verweildauer</li>
                <li>Geräteinformationen (Gerätetyp, Browser, Bildschirmauflösung)</li>
                <li>Ungefährer Standort (Land/Stadt, keine genaue IP-Adresse)</li>
                <li>Referrer (woher der Besucher kam)</li>
              </ul>
              <p>
                <strong className="text-foreground">IP-Anonymisierung:</strong> Aktiv – Google Analytics 4 
                speichert keine vollständigen IP-Adressen.
              </p>
              <p>
                <strong className="text-foreground">Datenübermittlung:</strong> USA 
                (EU-US Data Privacy Framework)
              </p>
              <p>
                <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO 
                (Einwilligung erforderlich)
              </p>
              <p>
                <strong className="text-foreground">Cookies:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>_ga: Unterscheidung von Nutzern (Laufzeit: 2 Jahre)</li>
                <li>_ga_*: Sitzungszustand (Laufzeit: 2 Jahre)</li>
              </ul>
              <p>
                <strong className="text-foreground">Opt-Out:</strong> Sie können die Erfassung durch 
                Google Analytics verhindern, indem Sie das Browser-Add-on zur Deaktivierung installieren:{' '}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  tools.google.com/dlpage/gaoptout
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
              <p>
                Weitere Informationen:{' '}
                <a 
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  Google Datenschutzerklärung
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
          </section>

          {/* 7. Google Ads */}
          <section id="google-ads" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-primary" />
              7. Google Ads Conversion Tracking
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Diese Website nutzt Google Ads Conversion Tracking zur Messung der Werbewirksamkeit.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-foreground">
                <p className="font-medium">Google Ireland Limited</p>
                <p>Gordon House, Barrow Street</p>
                <p>Dublin 4, Irland</p>
              </div>
              <p>
                <strong className="text-foreground">Zweck:</strong> Messung der Werbewirksamkeit und 
                Conversion-Erfassung
              </p>
              <p>
                <strong className="text-foreground">Erfasste Daten:</strong> Aktionen nach Klick auf 
                eine Google-Werbeanzeige (z.B. Formular-Absendung, Anruf-Klick)
              </p>
              <p>
                <strong className="text-foreground">Datenübermittlung:</strong> USA 
                (EU-US Data Privacy Framework)
              </p>
              <p>
                <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO 
                (Einwilligung erforderlich)
              </p>
              <p>
                <strong className="text-foreground">Cookies:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>_gcl_au: Conversion-Linker (Laufzeit: 90 Tage)</li>
              </ul>
              <p>
                <strong className="text-foreground">Opt-Out:</strong> Sie können personalisierte Werbung 
                deaktivieren unter:{' '}
                <a 
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  adssettings.google.com
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
          </section>

          {/* 8. Schriftarten */}
          <section id="schriftarten" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              8. Schriftarten (Lokal gehostet)
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Diese Website verwendet die Schriftart „Inter" (Open Font License).
              </p>
              <p>
                <strong className="text-foreground">Hosting:</strong> Lokal auf unserem Server
              </p>
              <p>
                <strong className="text-foreground">Datenübermittlung:</strong> Keine
              </p>
              <p className="bg-accent/20 p-4 rounded-lg border border-accent/40">
                <strong className="text-foreground">Hinweis:</strong>{' '}
                <span className="text-muted-foreground">
                  Es werden KEINE externen Schriftarten-Dienste wie Google Fonts verwendet. Die Schriften 
                  sind vollständig auf unserem Server gespeichert, sodass keine Daten an Dritte übermittelt werden.
                </span>
              </p>
            </div>
          </section>

          {/* 9. Cookies */}
          <section id="cookies" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              9. Cookies
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät 
                gespeichert werden und die Ihr Browser speichert.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left font-semibold text-foreground">Cookie</th>
                      <th className="border border-border p-3 text-left font-semibold text-foreground">Anbieter</th>
                      <th className="border border-border p-3 text-left font-semibold text-foreground">Zweck</th>
                      <th className="border border-border p-3 text-left font-semibold text-foreground">Laufzeit</th>
                      <th className="border border-border p-3 text-left font-semibold text-foreground">Einwilligung</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3 font-mono text-foreground">_ga</td>
                      <td className="border border-border p-3">Google</td>
                      <td className="border border-border p-3">Analytics – Nutzerunterscheidung</td>
                      <td className="border border-border p-3">2 Jahre</td>
                      <td className="border border-border p-3">Ja</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="border border-border p-3 font-mono text-foreground">_ga_*</td>
                      <td className="border border-border p-3">Google</td>
                      <td className="border border-border p-3">Analytics – Sitzungsstatus</td>
                      <td className="border border-border p-3">2 Jahre</td>
                      <td className="border border-border p-3">Ja</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 font-mono text-foreground">_gcl_au</td>
                      <td className="border border-border p-3">Google</td>
                      <td className="border border-border p-3">Ads – Conversion-Tracking</td>
                      <td className="border border-border p-3">90 Tage</td>
                      <td className="border border-border p-3">Ja</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Die mit „Ja" gekennzeichneten Cookies werden erst nach Ihrer ausdrücklichen Einwilligung gesetzt.
              </p>
            </div>
          </section>

          {/* 10. Betroffenenrechte */}
          <section id="betroffenenrechte" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              10. Ihre Rechte als betroffene Person
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Nach der DSGVO stehen Ihnen folgende Rechte zu:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground">Auskunftsrecht (Art. 15 DSGVO)</h3>
                  <p>
                    Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob personenbezogene Daten 
                    verarbeitet werden, und auf Auskunft über diese Daten sowie auf weitere Informationen.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">Recht auf Berichtigung (Art. 16 DSGVO)</h3>
                  <p>
                    Sie haben das Recht, die Berichtigung unrichtiger personenbezogener Daten sowie die 
                    Vervollständigung unvollständiger Daten zu verlangen.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">Recht auf Löschung (Art. 17 DSGVO)</h3>
                  <p>
                    Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen 
                    („Recht auf Vergessenwerden"), sofern die gesetzlichen Voraussetzungen erfüllt sind.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
                  <p>
                    Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten 
                    zu verlangen, wenn bestimmte Voraussetzungen vorliegen.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
                  <p>
                    Sie haben das Recht, Ihre personenbezogenen Daten in einem strukturierten, gängigen 
                    und maschinenlesbaren Format zu erhalten und diese Daten einem anderen Verantwortlichen 
                    zu übermitteln.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">Widerspruchsrecht (Art. 21 DSGVO)</h3>
                  <p>
                    Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, 
                    jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch 
                    einzulegen.
                  </p>
                </div>
              </div>

              <p className="mt-6">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
                <a 
                  href={`mailto:${EMAIL}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {EMAIL}
                </a>
              </p>
            </div>
          </section>

          {/* 11. Cookie-Einstellungen ändern */}
          <section id="cookie-einstellungen" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              11. Cookie-Einstellungen ändern
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Sie können Ihre Cookie-Einstellungen jederzeit ändern oder widerrufen. 
                Klicken Sie auf die Schaltfläche unten, um das Cookie-Banner erneut zu öffnen 
                und Ihre Präferenzen anzupassen.
              </p>
              <CookieSettingsButton />
              <p className="text-sm">
                Ihre aktuellen Einstellungen werden in Ihrem Browser gespeichert und bleiben 
                auch nach dem Schließen des Browsers erhalten, bis Sie sie ändern oder die 
                Browserdaten löschen.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <FloatingCTAs />
    </div>
  );
}
