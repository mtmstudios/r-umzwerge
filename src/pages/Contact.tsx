import { useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTAs } from "@/components/layout/FloatingCTAs";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { ContactFunnel, ContactFunnelRef } from "@/components/contact/ContactFunnel";
import { ContactInfo } from "@/components/contact/ContactInfo";

const META_TITLE = "Kontakt – Räumzwerge | Jetzt unverbindlich anfragen";
const META_DESCRIPTION = "Kontaktieren Sie die Räumzwerge: Anruf, WhatsApp oder Kontaktformular. Preiseinschätzung innerhalb von 24 Stunden. Besenrein und transparent.";

export default function Contact() {
  const funnelRef = useRef<ContactFunnelRef>(null);

  // SEO: Dynamic title and meta description
  useEffect(() => {
    document.title = META_TITLE;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', META_DESCRIPTION);
    }
  }, []);

  const handleFormClick = () => {
    funnelRef.current?.scrollToFunnel();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ContactHero />
        <ContactOptions onFormClick={handleFormClick} />
        <ContactFunnel ref={funnelRef} />
        <ContactInfo />
      </main>
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
