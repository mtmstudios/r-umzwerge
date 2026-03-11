import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CookieConsentProvider } from "@/components/consent/CookieConsentContext";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityContext";
import { FloatingAccessibilityButton } from "@/components/accessibility/FloatingAccessibilityButton";
import { usePageTracking } from "@/hooks/usePageTracking";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Barrierefreiheit from "./pages/Barrierefreiheit";
import ServicePage from "./pages/ServicePage";
import SEALandingPage from "./pages/SEALandingPage";
import Contact from "./pages/Contact";
import CityPage from "./pages/CityPage";
import Danke from "./pages/Danke";

function PageTracker() {
  usePageTracking();
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <CookieConsentProvider>
        <TooltipProvider>
          <ScrollProgress />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageTracker />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/barrierefreiheit" element={<Barrierefreiheit />} />
              <Route path="/leistungen/:slug" element={<ServicePage />} />
              <Route path="/lp/:slug" element={<SEALandingPage />} />
              <Route path="/danke" element={<Danke />} />
              {/* City landing pages - must be before catch-all */}
              <Route path="/:citySlug" element={<CityPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <FloatingAccessibilityButton />
          <CookieConsentBanner />
        </TooltipProvider>
      </CookieConsentProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
