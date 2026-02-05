import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, CheckCircle, X, User, Users, Briefcase, DoorOpen, Home as HomeIcon, Building2, Eye, Footprints, Heart, Sparkles, MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const TOTAL_STEPS = 5;

interface FormData {
  betroffener: string;
  situation: string;
  wuensche: string[];
  plz: string;
  ort: string;
  name: string;
  telefon: string;
  email: string;
  nachricht: string;
}

const initialFormData: FormData = {
  betroffener: "",
  situation: "",
  wuensche: [],
  plz: "",
  ort: "",
  name: "",
  telefon: "",
  email: "",
  nachricht: "",
};

// Step 1: Wer braucht Hilfe?
const betroffene = [
  { id: "selbst", label: "Ich selbst", description: "Sie möchten Unterstützung für sich", icon: User },
  { id: "angehoeriger", label: "Ein Angehöriger", description: "Sie helfen einem Familienmitglied", icon: Users },
  { id: "betreuer", label: "Ich bin Betreuer/Verwalter", description: "Sie sind professionell verantwortlich", icon: Briefcase },
];

// Step 2: Wie ist die Situation?
const situationen = [
  { id: "einzelne_raeume", label: "Einzelne Räume betroffen", description: "Küche, Bad oder 1-2 Zimmer", icon: DoorOpen },
  { id: "mehrere_raeume", label: "Mehrere Räume", description: "Großer Teil der Wohnung betroffen", icon: HomeIcon },
  { id: "komplett", label: "Gesamte Wohnung/Haus", description: "Alle Bereiche benötigen Hilfe", icon: Building2 },
];

// Step 3: Was ist Ihnen wichtig? (Multiselect)
const wuenscheOptionen = [
  { id: "diskret", label: "Diskrete Anfahrt", description: "Neutrale Fahrzeuge ohne Logo", icon: Eye },
  { id: "schrittweise", label: "Schrittweises Vorgehen", description: "Kein Zeitdruck, gemeinsam entscheiden", icon: Footprints },
  { id: "begleitung", label: "Begleitung vor Ort", description: "Wir arbeiten zusammen, nicht alleine", icon: Heart },
  { id: "reinigung", label: "Reinigung nach Räumung", description: "Alles sauber hinterlassen", icon: Sparkles },
];

interface MessieFunnelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessieFunnel({ open, onOpenChange }: MessieFunnelProps) {
  const isTabletOrMobile = useIsTabletOrMobile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
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

  const updateFormData = (key: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleWunsch = (id: string) => {
    setFormData((prev) => {
      const current = prev.wuensche;
      if (current.includes(id)) {
        return { ...prev, wuensche: current.filter((w) => w !== id) };
      }
      return { ...prev, wuensche: [...current, id] };
    });
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.betroffener) {
          toast({ title: "Bitte wählen Sie eine Option", variant: "destructive" });
          return false;
        }
        return true;
      case 2:
        if (!formData.situation) {
          toast({ title: "Bitte beschreiben Sie die Situation", variant: "destructive" });
          return false;
        }
        return true;
      case 3:
        // Wünsche sind optional
        return true;
      case 4:
        if (!formData.plz || !formData.ort) {
          toast({ title: "Bitte geben Sie PLZ und Ort an", variant: "destructive" });
          return false;
        }
        return true;
      case 5:
        if (!formData.name || !formData.telefon) {
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
        quelle: 'messie-hilfe',
        funnel_typ: 'messie',
        betroffener: formData.betroffener,
        situation: formData.situation,
        wuensche: formData.wuensche,
        plz: formData.plz,
        ort: formData.ort,
        name: formData.name,
        telefon: formData.telefon,
        email: formData.email || '',
        nachricht: formData.nachricht || '',
        timestamp: new Date().toISOString()
      };
      
      const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        toast({
          title: "Nachricht gesendet ✓",
          description: "Wir melden uns diskret und einfühlsam bei Ihnen.",
        });
      } else {
        throw new Error(`HTTP Fehler: ${response.status}`);
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
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3 lg:space-y-6"
          >
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">
                Wer braucht Hilfe?
              </h3>
              <p className="text-sm lg:text-base text-muted-foreground">
                Keine Sorge – wir sind ohne jede Wertung für Sie da
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {betroffene.map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData("betroffener", option.id)}
                  className={`group relative p-4 lg:p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                    formData.betroffener === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      formData.betroffener === option.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <option.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-foreground text-base lg:text-lg block">{option.label}</span>
                      <span className="text-sm text-muted-foreground">{option.description}</span>
                    </div>
                  </div>
                  {formData.betroffener === option.id && (
                    <motion.div
                      layoutId="betroffenerCheck"
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3 lg:space-y-6"
          >
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">
                Wie ist die Situation?
              </h3>
              <p className="text-sm lg:text-base text-muted-foreground">
                Eine grobe Einschätzung genügt – wir besprechen alles in Ruhe
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {situationen.map((situation) => (
                <button
                  key={situation.id}
                  onClick={() => updateFormData("situation", situation.id)}
                  className={`group relative p-4 lg:p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                    formData.situation === situation.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      formData.situation === situation.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <situation.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-foreground text-base lg:text-lg block">{situation.label}</span>
                      <span className="text-sm text-muted-foreground">{situation.description}</span>
                    </div>
                  </div>
                  {formData.situation === situation.id && (
                    <motion.div
                      layoutId="situationCheck"
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3 lg:space-y-6"
          >
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">
                Was ist Ihnen besonders wichtig?
              </h3>
              <p className="text-sm lg:text-base text-muted-foreground">
                Wählen Sie alles aus, was Ihnen am Herzen liegt (optional)
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {wuenscheOptionen.map((wunsch) => {
                const isSelected = formData.wuensche.includes(wunsch.id);
                return (
                  <button
                    key={wunsch.id}
                    onClick={() => toggleWunsch(wunsch.id)}
                    className={`group relative p-4 lg:p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}>
                        {isSelected && <CheckCircle className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        <wunsch.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-foreground text-sm lg:text-base block">{wunsch.label}</span>
                        <span className="text-xs lg:text-sm text-muted-foreground">{wunsch.description}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3 lg:space-y-6"
          >
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">
                Wo ist der Standort?
              </h3>
              <p className="text-sm lg:text-base text-muted-foreground">
                Damit wir prüfen können, ob wir helfen können
              </p>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <Label htmlFor="plz" className="text-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> PLZ *
                  </Label>
                  <Input
                    id="plz"
                    type="text"
                    placeholder="89278"
                    value={formData.plz}
                    onChange={(e) => updateFormData("plz", e.target.value)}
                    maxLength={5}
                    className="mt-1 h-10 lg:h-11"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="ort" className="text-sm">Ort *</Label>
                  <Input
                    id="ort"
                    type="text"
                    placeholder="Nersingen"
                    value={formData.ort}
                    onChange={(e) => updateFormData("ort", e.target.value)}
                    className="mt-1 h-10 lg:h-11"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3 lg:space-y-6"
          >
            <div className="text-center mb-3 lg:mb-8">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">
                Ihre Kontaktdaten
              </h3>
              <p className="text-sm lg:text-base text-muted-foreground">
                Wir melden uns diskret und ohne Druck bei Ihnen
              </p>
            </div>
            
            <div className="max-w-md mx-auto space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name" className="text-sm flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Max Mustermann"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="mt-1 h-10 lg:h-11"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefon" className="text-sm flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Telefon *
                  </Label>
                  <Input
                    id="telefon"
                    type="tel"
                    placeholder="0160 1234567"
                    value={formData.telefon}
                    onChange={(e) => updateFormData("telefon", e.target.value)}
                    className="mt-1 h-10 lg:h-11"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> E-Mail (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="max@beispiel.de"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="mt-1 h-10 lg:h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="nachricht" className="text-sm flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Erzählen Sie uns mehr (optional)
                </Label>
                <Textarea
                  id="nachricht"
                  placeholder="Was sollten wir vorab wissen? Sie können uns alles anvertrauen – vertraulich und ohne Wertung."
                  value={formData.nachricht}
                  onChange={(e) => updateFormData("nachricht", e.target.value)}
                  className="mt-1 min-h-[80px] lg:min-h-[100px]"
                />
              </div>
            </div>
          </motion.div>
        );

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
        <Heart className="w-8 h-8 md:w-10 md:h-10 text-primary" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
        Vielen Dank für Ihr Vertrauen
      </h3>
      <p className="text-sm md:text-base text-muted-foreground">
        Wir melden uns diskret und einfühlsam bei Ihnen – ganz ohne Druck.
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
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
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
      <div className="lg:min-h-[320px]">
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
                Nachricht senden
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
          <DialogTitle>Diskrete Hilfe anfragen</DialogTitle>
        </VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
}
