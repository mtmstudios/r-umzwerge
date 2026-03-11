import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, X, Home, Building2, Warehouse, Car, Store, MapPin, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useIsTabletOrMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const TOTAL_STEPS = 5;
const AUTO_ADVANCE_STEPS = new Set([1, 2, 4]);

interface FormData {
  objektart: string;
  fuellgrad: string;
  plz: string;
  ort: string;
  zeitrahmen: string;
  name: string;
  telefon: string;
  email: string;
  nachricht: string;
}

const initialFormData: FormData = {
  objektart: "", fuellgrad: "", plz: "", ort: "", zeitrahmen: "",
  name: "", telefon: "", email: "", nachricht: "",
};

const objektarten = [
  { id: "wohnung", label: "Wohnung", icon: Home },
  { id: "haus", label: "Haus", icon: Building2 },
  { id: "keller", label: "Keller / Dachboden", icon: Warehouse },
  { id: "garage", label: "Garage", icon: Car },
  { id: "gewerbe", label: "Gewerbe / Büro", icon: Store },
];

const fuellgrade = [
  { id: "wenig", label: "Wenig", description: "1-2 Räume, überschaubare Menge", icon: "📦" },
  { id: "normal", label: "Normal", description: "3-4 Räume, normale Menge", icon: "📦📦" },
  { id: "viel", label: "Viel", description: "5+ Räume oder komplett voll", icon: "📦📦📦" },
];

const zeitrahmenOptionen = [
  { id: "schnell", label: "Schnellstmöglich", icon: "🚀" },
  { id: "2wochen", label: "In 1-2 Wochen", icon: "📅" },
  { id: "monat", label: "In 1 Monat+", icon: "🗓️" },
  { id: "flexibel", label: "Flexibel", icon: "✓" },
];

interface EntruempelungFunnelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EntruempelungFunnel({ open, onOpenChange }: EntruempelungFunnelProps) {
  const navigate = useNavigate();
  const isTabletOrMobile = useIsTabletOrMobile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => { setCurrentStep(1); setFormData(initialFormData); }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (isSubmitted) {
      const timeout = setTimeout(() => onOpenChange(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSubmitted, onOpenChange]);

  const updateFormData = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const autoAdvance = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep((prev) => prev + 1);
  };

  const handleAutoSelect = (key: keyof FormData, value: string) => {
    updateFormData(key, value);
    setTimeout(() => autoAdvance(), 350);
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1: return !!formData.objektart || (toast({ title: "Bitte wählen Sie eine Option", variant: "destructive" }), false);
      case 2: return !!formData.fuellgrad || (toast({ title: "Bitte wählen Sie den Füllgrad", variant: "destructive" }), false);
      case 3: return (!!formData.plz && !!formData.ort) || (toast({ title: "Bitte geben Sie PLZ und Ort an", variant: "destructive" }), false);
      case 4: return !!formData.zeitrahmen || (toast({ title: "Bitte wählen Sie einen Zeitrahmen", variant: "destructive" }), false);
      case 5: return (!!formData.name && !!formData.telefon) || (toast({ title: "Bitte geben Sie Name und Telefon an", variant: "destructive" }), false);
      default: return true;
    }
  };

  const nextStep = () => { if (validateStep() && currentStep < TOTAL_STEPS) setCurrentStep((prev) => prev + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep((prev) => prev - 1); };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        quelle: 'entruempelung', funnel_typ: 'entruempelung',
        objektart: formData.objektart, fuellgrad: formData.fuellgrad,
        plz: formData.plz, ort: formData.ort, zeitrahmen: formData.zeitrahmen,
        name: formData.name, telefon: formData.telefon, email: formData.email || '',
        nachricht: formData.nachricht || '', timestamp: new Date().toISOString()
      };
      const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (response.ok) {
        setIsSubmitting(false); setIsSubmitted(true);
        toast({ title: "Anfrage gesendet! ✓", description: "Wir melden uns innerhalb von 24 Stunden mit einer Preiseinschätzung." });
      } else { throw new Error(`HTTP Fehler: ${response.status}`); }
    } catch (error) {
      console.error('Submit error:', error); setIsSubmitting(false);
      toast({ title: "Fehler beim Senden", description: "Bitte versuchen Sie es erneut oder rufen Sie uns an.", variant: "destructive" });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 lg:space-y-6">
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Was wird entrümpelt?</h3>
              <p className="text-sm lg:text-base text-muted-foreground">Wählen Sie die Art des Objekts</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {objektarten.map((type) => (
                <button key={type.id} onClick={() => handleAutoSelect("objektart", type.id)}
                  className={`group relative p-3 lg:p-5 rounded-xl border-2 transition-all duration-300 min-h-[80px] ${
                    formData.objektart === type.id ? "border-primary bg-primary/5 scale-[0.97]" : "border-border hover:border-primary/50 bg-card"
                  }`}>
                  <div className="flex flex-col items-center gap-2 lg:gap-3">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-colors ${
                      formData.objektart === type.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }`}><type.icon className="w-5 h-5 lg:w-6 lg:h-6" /></div>
                    <span className="font-medium text-foreground text-xs lg:text-sm text-center">{type.label}</span>
                  </div>
                  {formData.objektart === type.id && (
                    <motion.div layoutId="objektCheck" className="absolute top-1.5 right-1.5 lg:top-2 lg:right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 lg:space-y-6">
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Wie voll ist es?</h3>
              <p className="text-sm lg:text-base text-muted-foreground">Eine grobe Einschätzung genügt</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
              {fuellgrade.map((grad) => (
                <button key={grad.id} onClick={() => handleAutoSelect("fuellgrad", grad.id)}
                  className={`group relative p-4 lg:p-6 rounded-xl border-2 transition-all duration-300 min-h-[80px] ${
                    formData.fuellgrad === grad.id ? "border-primary bg-primary/5 scale-[0.97]" : "border-border hover:border-primary/50 bg-card"
                  }`}>
                  <div className="flex lg:flex-col items-center lg:items-center gap-3 lg:gap-4">
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center transition-colors text-2xl lg:text-3xl ${
                      formData.fuellgrad === grad.id ? "bg-primary/10" : "bg-muted"
                    }`}>{grad.icon}</div>
                    <div className="flex-1 lg:text-center">
                      <span className="font-bold text-foreground text-base lg:text-lg block">{grad.label}</span>
                      <span className="text-xs lg:text-sm text-muted-foreground">{grad.description}</span>
                    </div>
                  </div>
                  {formData.fuellgrad === grad.id && (
                    <motion.div layoutId="fuellgradCheck" className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 lg:space-y-6">
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Wo befindet sich das Objekt?</h3>
              <p className="text-sm lg:text-base text-muted-foreground">Damit wir prüfen können, ob wir in Ihrer Nähe arbeiten</p>
            </div>
            <div className="max-w-md mx-auto space-y-3 lg:space-y-4">
              <div className="grid grid-cols-3 gap-3 lg:gap-4">
                <div className="col-span-1">
                  <Label htmlFor="plz" className="text-sm flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> PLZ *</Label>
                  <Input id="plz" type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="89278" value={formData.plz}
                    onChange={(e) => updateFormData("plz", e.target.value)} maxLength={5} className="mt-1 h-11 lg:h-12 text-base" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="ort" className="text-sm">Ort *</Label>
                  <Input id="ort" type="text" placeholder="Nersingen" value={formData.ort}
                    onChange={(e) => updateFormData("ort", e.target.value)} className="mt-1 h-11 lg:h-12 text-base" />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 lg:space-y-6">
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Wann soll es losgehen?</h3>
              <p className="text-sm lg:text-base text-muted-foreground">Den genauen Termin besprechen wir später</p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
              {zeitrahmenOptionen.map((option) => (
                <button key={option.id} onClick={() => handleAutoSelect("zeitrahmen", option.id)}
                  className={`group relative p-4 lg:p-5 rounded-xl border-2 transition-all duration-300 min-h-[48px] ${
                    formData.zeitrahmen === option.id ? "border-primary bg-primary/5 scale-[0.97]" : "border-border hover:border-primary/50 bg-card"
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl lg:text-2xl">{option.icon}</span>
                    <span className="font-medium text-foreground text-sm lg:text-base">{option.label}</span>
                  </div>
                  {formData.zeitrahmen === option.id && (
                    <motion.div layoutId="zeitCheck" className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 lg:space-y-6">
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Fast geschafft!</h3>
              <p className="text-sm lg:text-base text-muted-foreground">Hinterlassen Sie Ihre Nummer für unsere kostenlose, telefonische Ersteinschätzung.</p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              <div>
                <Label htmlFor="name" className="text-sm flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Name *</Label>
                <Input id="name" type="text" placeholder="Max Mustermann" value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)} className="mt-1 h-11 lg:h-12 text-base" />
              </div>
              <div>
                <Label htmlFor="telefon" className="text-sm flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Telefon *</Label>
                <Input id="telefon" type="tel" inputMode="tel" placeholder="0160 1234567" value={formData.telefon}
                  onChange={(e) => updateFormData("telefon", e.target.value)} className="mt-1 h-11 lg:h-12 text-base" />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> E-Mail (optional)</Label>
                <Input id="email" type="email" placeholder="max@beispiel.de" value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)} className="mt-1 h-11 lg:h-12 text-base" />
              </div>
            </div>
          </motion.div>
        );

      default: return null;
    }
  };

  const showNextButton = !AUTO_ADVANCE_STEPS.has(currentStep) && currentStep !== TOTAL_STEPS;
  const showSubmitButton = currentStep === TOTAL_STEPS;

  const renderSuccessState = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 md:py-12">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
        <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-primary" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">Anfrage gesendet!</h3>
      <p className="text-sm md:text-base text-muted-foreground">Wir melden uns innerhalb von 24 Stunden mit einer Preiseinschätzung.</p>
    </motion.div>
  );

  const renderFunnelContent = () => (
    <div className="w-full">
      <div className="mb-4 lg:mb-8">
        <div className="flex justify-between items-center mb-2 lg:mb-4">
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className={`w-7 h-7 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold text-xs lg:text-base transition-all duration-300 flex-shrink-0 ${
                index + 1 < currentStep ? "bg-primary text-primary-foreground"
                : index + 1 === currentStep ? "bg-cta text-white" : "bg-muted text-muted-foreground"
              }`}>
                {index + 1 < currentStep ? <CheckCircle className="w-3.5 h-3.5 lg:w-5 lg:h-5" /> : index + 1}
              </div>
              {index < TOTAL_STEPS - 1 && (
                <div className={`flex-1 h-0.5 mx-1 lg:mx-2 rounded transition-colors duration-300 ${index + 1 < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="h-1 lg:h-2 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-primary to-cta" initial={{ width: 0 }}
            animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <div className="lg:min-h-[280px]">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>

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
        <VisuallyHidden><DialogTitle>Entrümpelung anfragen</DialogTitle></VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
}
