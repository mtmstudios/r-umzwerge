import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  FormData,
  Step1ServiceType,
  Step2Scope,
  Step3Location,
  Step4Timeline,
  Step5Contact,
} from "./FunnelSteps";

const TOTAL_STEPS = 5;
const AUTO_ADVANCE_STEPS = new Set([1, 2, 4]);

const initialFormData: FormData = {
  serviceType: "",
  scope: "",
  postalCode: "",
  location: "",
  timeline: "",
  name: "",
  phone: "",
  email: "",
  message: "",
};

export interface ContactFunnelRef {
  scrollToFunnel: () => void;
}

export const ContactFunnel = forwardRef<ContactFunnelRef>((_, ref) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    scrollToFunnel: () => sectionRef.current?.scrollIntoView({ behavior: "smooth" }),
  }));

  const updateFormData = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const autoAdvance = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep((prev) => prev + 1);
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1: return !!formData.serviceType || (toast({ title: "Bitte wählen Sie eine Option", variant: "destructive" }), false);
      case 2: return !!formData.scope || (toast({ title: "Bitte wählen Sie den Umfang", variant: "destructive" }), false);
      case 3: return (!!formData.postalCode && !!formData.location) || (toast({ title: "Bitte geben Sie PLZ und Ort an", variant: "destructive" }), false);
      case 4: return !!formData.timeline || (toast({ title: "Bitte wählen Sie einen Zeitraum", variant: "destructive" }), false);
      case 5: return (!!formData.name && !!formData.phone) || (toast({ title: "Bitte geben Sie Name und Telefon an", variant: "destructive" }), false);
      default: return true;
    }
  };

  const nextStep = () => {
    if (validateStep() && currentStep < TOTAL_STEPS) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        quelle: 'kontaktseite', funnel_typ: 'standard',
        objektart: formData.serviceType, umfang: formData.scope,
        plz: formData.postalCode, ort: formData.location,
        zeitrahmen: formData.timeline, name: formData.name,
        telefon: formData.phone, email: formData.email || '',
        nachricht: formData.message || '',
        timestamp: new Date().toISOString()
      };
      const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({ title: "Anfrage gesendet! ✓", description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen." });
      } else {
        throw new Error(`HTTP Fehler: ${response.status}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setIsSubmitting(false);
      toast({ title: "Fehler beim Senden", description: "Bitte versuchen Sie es erneut oder rufen Sie uns an.", variant: "destructive" });
    }
  };

  const renderStep = () => {
    const stepProps = { formData, updateFormData, onAutoAdvance: autoAdvance };
    switch (currentStep) {
      case 1: return <Step1ServiceType {...stepProps} />;
      case 2: return <Step2Scope {...stepProps} />;
      case 3: return <Step3Location {...stepProps} />;
      case 4: return <Step4Timeline {...stepProps} />;
      case 5: return <Step5Contact {...stepProps} />;
      default: return null;
    }
  };

  const showNextButton = !AUTO_ADVANCE_STEPS.has(currentStep) && currentStep !== TOTAL_STEPS;
  const showSubmitButton = currentStep === TOTAL_STEPS;

  if (isSubmitted) {
    return (
      <section ref={sectionRef} id="funnel" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center py-16">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Vielen Dank für Ihre Anfrage!</h3>
            <p className="text-muted-foreground mb-8">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
            <Button onClick={() => { setIsSubmitted(false); setCurrentStep(1); setFormData(initialFormData); }} variant="outline">
              Neue Anfrage starten
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="funnel" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    index + 1 < currentStep ? "bg-primary text-primary-foreground"
                    : index + 1 === currentStep ? "bg-cta text-white"
                    : "bg-muted text-muted-foreground"
                  }`}>
                    {index + 1 < currentStep ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : index + 1}
                  </div>
                  {index < TOTAL_STEPS - 1 && (
                    <div className={`w-full h-1 mx-2 rounded transition-colors duration-300 hidden sm:block ${
                      index + 1 < currentStep ? "bg-primary" : "bg-muted"
                    }`} style={{ width: "60px" }} />
                  )}
                </div>
              ))}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-cta"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-lg">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            {/* Navigation */}
            <div className={`mt-10 pt-6 border-t border-border ${
              showSubmitButton ? "flex flex-col-reverse sm:flex-row sm:justify-between gap-3" : "flex justify-between items-center"
            }`}>
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Zurück
              </Button>

              {showSubmitButton && (
                <div className="flex flex-col items-center sm:items-end gap-1 w-full sm:w-auto">
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2 bg-cta hover:bg-cta-hover text-white min-h-[48px] px-6 w-full sm:w-auto">
                    {isSubmitting ? (
                      <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Wird gesendet...</>
                    ) : (
                      <><Phone className="w-4 h-4" /> Kostenlosen Rückruf anfordern</>
                    )}
                  </Button>
                  <span className="text-xs text-muted-foreground">Unverbindlich & 100% Kostenlos</span>
                </div>
              )}

              {showNextButton && (
                <Button onClick={nextStep} className="gap-2 min-h-[48px]">
                  Weiter <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              )}

              {AUTO_ADVANCE_STEPS.has(currentStep) && <div />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactFunnel.displayName = "ContactFunnel";
