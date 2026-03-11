import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Phone, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { useIsTabletOrMobile } from "@/hooks/use-mobile";
import {
  FormData,
  Step1ServiceType,
  Step2Scope,
  Step3Location,
  Step4Timeline,
  Step5Contact,
} from "./FunnelSteps";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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

interface ContactFunnelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactFunnelModal({ open, onOpenChange }: ContactFunnelModalProps) {
  const navigate = useNavigate();
  const isTabletOrMobile = useIsTabletOrMobile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setCurrentStep(1);
        setFormData(initialFormData);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);


  const updateFormData = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const autoAdvance = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
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
        quelle: 'hauptseite', funnel_typ: 'standard',
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
        onOpenChange(false);
        navigate('/danke');
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


  const renderFunnelContent = () => (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-4 lg:mb-8">
        <div className="flex justify-between items-center mb-2 lg:mb-4">
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className={`w-7 h-7 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold text-xs lg:text-base transition-all duration-300 flex-shrink-0 ${
                index + 1 < currentStep ? "bg-primary text-primary-foreground"
                : index + 1 === currentStep ? "bg-cta text-white"
                : "bg-muted text-muted-foreground"
              }`}>
                {index + 1 < currentStep ? (
                  <svg className="w-3.5 h-3.5 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : index + 1}
              </div>
              {index < TOTAL_STEPS - 1 && (
                <div className={`flex-1 h-0.5 mx-1 lg:mx-2 rounded transition-colors duration-300 ${
                  index + 1 < currentStep ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="h-1 lg:h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-cta"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="lg:min-h-[280px]">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>

      {/* Navigation */}
      <div className={`mt-4 lg:mt-8 pt-3 lg:pt-6 border-t border-border ${
        showSubmitButton ? "flex flex-col-reverse sm:flex-row sm:justify-between gap-3" : "flex justify-between items-center"
      }`}>
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-1.5 md:gap-2 text-sm md:text-base">
          <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" /> Zurück
        </Button>

        {showSubmitButton && (
          <div className="flex flex-col items-center sm:items-end gap-1 w-full sm:w-auto">
            <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2 bg-cta hover:bg-cta-hover text-white text-sm md:text-base min-h-[48px] px-5 w-full sm:w-auto">
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
          <Button onClick={nextStep} className="gap-1.5 md:gap-2 text-sm md:text-base min-h-[48px]">
            Weiter <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-180" />
          </Button>
        )}

        {AUTO_ADVANCE_STEPS.has(currentStep) && <div />}
      </div>
    </div>
  );

  const content = isSubmitted ? renderSuccessState() : renderFunnelContent();

  if (isTabletOrMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} handleOnly repositionInputs={false}>
        <DrawerContent className="max-h-[92vh] px-4 pb-6">
          <div className="relative flex items-center justify-center pt-3 pb-2">
            <div data-vaul-handle="" aria-label="Drag handle" className="w-12 h-1.5 rounded-full bg-muted cursor-grab active:cursor-grabbing" />
            <button onClick={() => onOpenChange(false)} className="absolute right-0 top-2 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors" aria-label="Schließen">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="overflow-y-auto pb-8">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <VisuallyHidden><DialogTitle>Anfrage starten</DialogTitle></VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
}
