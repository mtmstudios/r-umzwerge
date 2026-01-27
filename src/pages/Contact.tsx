import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTAs } from "@/components/layout/FloatingCTAs";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { ContactFunnel, ContactFunnelRef } from "@/components/contact/ContactFunnel";
import { ContactInfo } from "@/components/contact/ContactInfo";

export default function Contact() {
  const funnelRef = useRef<ContactFunnelRef>(null);

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
