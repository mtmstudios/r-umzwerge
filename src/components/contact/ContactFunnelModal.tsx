import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, CheckCircle, X } from "lucide-react";
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
  const isTabletOrMobile = useIsTabletOrMobile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      // Delay reset to allow close animation
      const timeout = setTimeout(() => {
        setCurrentStep(1);
        setFormData(initialFormData);
        setIsSubmitted(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Auto-close after successful submission
  useEffect(() => {
    if (isSubmitted) {
      const timeout = setTimeout(() => {
        onOpenChange(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSubmitted, onOpenChange]);

  const updateFormData = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.serviceType) {
          toast({ title: "Bitte wählen Sie eine Option", variant: "destructive" });
          return false;
        }
        return true;
      case 2:
        if (!formData.scope) {
          toast({ title: "Bitte wählen Sie den Umfang", variant: "destructive" });
          return false;
        }
        return true;
      case 3:
        if (!formData.postalCode || !formData.location) {
          toast({ title: "Bitte geben Sie PLZ und Ort an", variant: "destructive" });
          return false;
        }
        return true;
      case 4:
        if (!formData.timeline) {
          toast({ title: "Bitte wählen Sie einen Zeitraum", variant: "destructive" });
          return false;
        }
        return true;
      case 5:
        if (!formData.name || !formData.phone) {
          toast({ title: "Bitte geben Sie Name und Telefon an", variant: "destructive" });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep() && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    
    try {
      const payload = {
        quelle: 'hauptseite',
        funnel_typ: 'standard',
        objektart: formData.serviceType,
        umfang: formData.scope,
        plz: formData.postalCode,
        ort: formData.location,
        zeitrahmen: formData.timeline,
        name: formData.name,
        telefon: formData.phone,
        email: formData.email || '',
        nachricht: formData.message || '',
        timestamp: new Date().toISOString()
      };
      
      const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        toast({
          title: "Anfrage gesendet! ✓",
          description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
        });
      } else {
        throw new Error(data.error || 'Fehler beim Senden');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setIsSubmitting(false);
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es erneut oder rufen Sie uns an.",
        variant: "destructive"
      });
    }
  };

  const renderStep = () => {
    const stepProps = { formData, updateFormData };
    
    switch (currentStep) {
      case 1:
        return <Step1ServiceType {...stepProps} />;
      case 2:
        return <Step2Scope {...stepProps} />;
      case 3:
        return <Step3Location {...stepProps} />;
      case 4:
        return <Step4Timeline {...stepProps} />;
      case 5:
        return <Step5Contact {...stepProps} />;
      default:
        return null;
    }
  };

  const renderSuccessState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8 md:py-12"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
        <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-primary" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
        Vielen Dank für Ihre Anfrage!
      </h3>
      <p className="text-sm md:text-base text-muted-foreground">
        Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
      </p>
    </motion.div>
  );

  const renderFunnelContent = () => (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-4 lg:mb-8">
        <div className="flex justify-between items-center mb-2 lg:mb-4">
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <div key={index} className="flex items-center flex-1">
              <div
                className={`w-6 h-6 md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm lg:text-base transition-all duration-300 flex-shrink-0 ${
                  index + 1 < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index + 1 === currentStep
                    ? "bg-cta text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1 < currentStep ? (
                  <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < TOTAL_STEPS - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 lg:mx-2 rounded transition-colors duration-300 ${
                    index + 1 < currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
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
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4 lg:mt-8 pt-3 lg:pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-1.5 md:gap-2 text-sm md:text-base"
        >
          <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Zurück
        </Button>

        {currentStep === TOTAL_STEPS ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-1.5 md:gap-2 bg-cta hover:bg-cta-hover text-white text-sm md:text-base"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin rounded-full h-3.5 w-3.5 md:h-4 md:w-4 border-2 border-white border-t-transparent" />
                Wird gesendet...
              </>
            ) : (
              <>
                Anfrage senden
                <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </>
            )}
          </Button>
        ) : (
          <Button onClick={nextStep} className="gap-1.5 md:gap-2 text-sm md:text-base">
            Weiter
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
        )}
      </div>
    </div>
  );

  const content = isSubmitted ? renderSuccessState() : renderFunnelContent();

  // Mobile & Tablet: Drawer from bottom
  if (isTabletOrMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh] px-4 pb-4">
          {/* Header with drag handle and close button */}
          <div className="relative flex items-center justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted" />
            <button 
              onClick={() => onOpenChange(false)}
              className="absolute right-0 top-2 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Schließen"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="overflow-y-auto">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Dialog centered
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <VisuallyHidden>
          <DialogTitle>Anfrage starten</DialogTitle>
        </VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
}
