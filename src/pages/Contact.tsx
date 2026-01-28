import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTAs } from "@/components/layout/FloatingCTAs";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactOptions } from "@/components/contact/ContactOptions";
import EntruempelungForm from "@/components/contact/EntruempelungForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

const META_TITLE = "Kontakt – Räumzwerge | Jetzt unverbindlich anfragen";
const META_DESCRIPTION = "Kontaktieren Sie die Räumzwerge: Anruf, WhatsApp oder Kontaktformular. Preiseinschätzung innerhalb von 24 Stunden. Besenrein und transparent.";

export default function Contact() {
  // SEO: Dynamic title and meta description
  useEffect(() => {
    document.title = META_TITLE;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', META_DESCRIPTION);
    }
  }, []);

  const handleFormClick = () => {
    document.getElementById('funnel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ContactHero />
        <ContactOptions onFormClick={handleFormClick} />
        <section id="funnel" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <EntruempelungForm />
          </div>
        </section>
        <ContactInfo />
      </main>
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
