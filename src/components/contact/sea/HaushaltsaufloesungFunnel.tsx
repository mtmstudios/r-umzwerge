import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, X, Home, Building2, Users, Heart, ShieldCheck, Package, MapPin, Calendar, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useIsTabletOrMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const TOTAL_STEPS = 5;
// Steps 1, 2, 3 auto-advance (objektart, grund, umfang). Step 4 has inputs. Step 5 is contact.
const AUTO_ADVANCE_STEPS = new Set([1, 2, 3]);

interface FormData {
  objektart: string; grund: string; umfang: string;
  plz: string; ort: string; zeitrahmen: string;
  name: string; telefon: string; email: string; nachricht: string;
}

const initialFormData: FormData = {
  objektart: "", grund: "", umfang: "", plz: "", ort: "", zeitrahmen: "",
  name: "", telefon: "", email: "", nachricht: "",
};

const objektarten = [
  { id: "wohnung", label: "Wohnung", icon: Home },
  { id: "haus", label: "Haus", icon: Building2 },
  { id: "wg", label: "Wohngemeinschaft", icon: Users },
];

const gruende = [
  { id: "trauerfall", label: "Trauerfall", description: "Wir gehen besonders einfühlsam vor", icon: Heart },
  { id: "pflegeheim", label: "Umzug ins Pflegeheim", description: "Strukturierte Auflösung ohne Zeitdruck", icon: ShieldCheck },
  { id: "verkauf", label: "Verkauf der Immobilie", description: "Übergabefertig in wenigen Tagen", icon: Building2 },
  { id: "sonstiges", label: "Sonstiges", description: "Wir besprechen Ihre Situation", icon: Package },
];

const umfaenge = [
  { id: "komplett", label: "Komplett", description: "Gesamte Einrichtung inkl. aller Gegenstände" },
  { id: "teilweise", label: "Teilweise", description: "Nur bestimmte Bereiche oder Räume" },
  { id: "nur_entruempelung", label: "Nur Entrümpelung", description: "Einrichtung bleibt, nur Überflüssiges weg" },
];

const zeitrahmenOptionen = [
  { id: "schnell", label: "So schnell wie möglich" },
  { id: "2wochen", label: "In 1-2 Wochen" },
  { id: "monat", label: "In 1 Monat+" },
  { id: "flexibel", label: "Flexibel / nach Absprache" },
];

interface HaushaltsaufloesungFunnelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HaushaltsaufloesungFunnel({ open, onOpenChange }: HaushaltsaufloesungFunnelProps) {
  const isTabletOrMobile = useIsTabletOrMobile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => { setCurrentStep(1); setFormData(initialFormData); setIsSubmitted(false); }, 300);
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
      case 2: return !!formData.grund || (toast({ title: "Bitte wählen Sie den Grund", variant: "destructive" }), false);
      case 3: return !!formData.umfang || (toast({ title: "Bitte wählen Sie den Umfang", variant: "destructive" }), false);
      case 4: return (!!formData.plz && !!formData.ort && !!formData.zeitrahmen) || (toast({ title: "Bitte füllen Sie alle Felder aus", variant: "destructive" }), false);
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
        quelle: 'haushaltsaufloesung', funnel_typ: 'haushaltsaufloesung',
        objektart: formData.objektart, grund: formData.grund, umfang: formData.umfang,
        plz: formData.plz, ort: formData.ort, zeitrahmen: formData.zeitrahmen,
        name: formData.name, telefon: formData.telefon, email: formData.email || '',
        nachricht: formData.nachricht || '', timestamp: new Date().toISOString()
      };
      const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (response.ok) {
        setIsSubmitting(false); setIsSubmitted(true);
        toast({ title: "Anfrage gesendet! ✓", description: "Wir melden uns einfühlsam und zeitnah bei Ihnen." });
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
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Was wird aufgelöst?</h3>
              <p className="text-sm lg:text-base text-muted-foreground">Wir begleiten Sie einfühlsam durch diesen Prozess</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
              {objektarten.map((type) => (
                <button key={type.id} onClick={() => handleAutoSelect("objektart", type.id)}
                  className={`group relative p-4 lg:p-6 rounded-xl border-2 transition-all duration-300 min-h-[80px] ${
                    formData.objektart === type.id ? "border-primary bg-primary/5 scale-[0.97]" : "border-border hover:border-primary/50 bg-card"
                  }`}>
                  <div className="flex flex-col items-center gap-2 lg:gap-3">
                    <div className={`w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors ${
                      formData.objektart === type.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }`}><type.icon className="w-5 h-5 lg:w-7 lg:h-7" /></div>
                    <span className="font-medium text-foreground text-sm lg:text-base">{type.label}</span>
                  </div>
                  {formData.objektart === type.id && (
                    <motion.div layoutId="objektCheck" className="absolute top-1.5 right-1.5 lg:top-2 lg:right-2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-primary-foreground" />
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
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Was ist der Grund?</h3>
              <p className="text-sm lg:text-base text-muted-foreground">Damit wir uns optimal auf Ihre Situation einstellen können</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {gruende.map((grund) => (
                <button key={grund.id} onClick={() => handleAutoSelect("grund", grund.id)}
                  className={`group relative p-4 lg:p-5 rounded-xl border-2 transition-all duration-300 text-left min-h-[64px] ${
                    formData.grund === grund.id ? "border-primary bg-primary/5 scale-[0.97]" : "border-border hover:border-primary/50 bg-card"
                  }`}>
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      formData.grund === grund.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}><grund.icon className="w-5 h-5 lg:w-6 lg:h-6" /></div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-foreground text-sm lg:text-base block">{grund.label}</span>
                      <span className="text-xs lg:text-sm text-muted-foreground">{grund.description}</span>
                    </div>
                  </div>
                  {formData.grund === grund.id && (
                    <motion.div layoutId="grundCheck" className="absolute top-2 right-2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-primary-foreground" />
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
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Welchen Umfang hat die Auflösung?</h3>
              <p className="text-sm lg:text-base text-muted-foreground">Eine grobe Einschätzung genügt</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {umfaenge.map((umfang) => (
                <button key={umfang.id} onClick={() => handleAutoSelect("umfang", umfang.id)}
                  className={`group relative p-4 lg:p-5 rounded-xl border-2 transition-all duration-300 text-left min-h-[64px] ${
                    formData.umfang === umfang.id ? "border-primary bg-primary/5 scale-[0.97]" : "border-border hover:border-primary/50 bg-card"
                  }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      formData.umfang === umfang.id ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {formData.umfang === umfang.id && <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-foreground text-sm lg:text-base">{umfang.label}</span>
                      <span className="text-xs lg:text-sm text-muted-foreground ml-2">{umfang.description}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 lg:space-y-6">
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Standort & Zeitrahmen</h3>
              <p className="text-sm lg:text-base text-muted-foreground">Den genauen Termin besprechen wir später – ganz ohne Druck</p>
            </div>
            <div className="max-w-md mx-auto space-y-4">
              <div className="grid grid-cols-3 gap-3">
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
              <div>
                <Label className="text-sm flex items-center gap-1.5 mb-2"><Calendar className="w-3.5 h-3.5" /> Wann soll es stattfinden? *</Label>
                <div className="flex flex-wrap gap-2">
                  {zeitrahmenOptionen.map((option) => (
                    <button key={option.id} onClick={() => updateFormData("zeitrahmen", option.id)}
                      className={`px-3 py-2 rounded-full border-2 font-medium transition-all duration-300 text-sm min-h-[40px] ${
                        formData.zeitrahmen === option.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50 bg-card text-foreground"
                      }`}>{option.label}</button>
                  ))}
                </div>
              </div>
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
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">Vielen Dank für Ihre Anfrage</h3>
      <p className="text-sm md:text-base text-muted-foreground">Wir melden uns einfühlsam und zeitnah bei Ihnen – in der Regel innerhalb von 24 Stunden.</p>
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

      <div className="flex justify-between items-center mt-4 lg:mt-8 pt-3 lg:pt-6 border-t border-border">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-1.5 md:gap-2 text-sm md:text-base">
          <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" /> Zurück
        </Button>

        {showSubmitButton && (
          <div className="flex flex-col items-end gap-1">
            <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2 bg-cta hover:bg-cta-hover text-white text-sm md:text-base min-h-[48px] px-5">
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
        <VisuallyHidden><DialogTitle>Haushaltsauflösung anfragen</DialogTitle></VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
}
