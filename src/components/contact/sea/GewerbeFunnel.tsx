import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Building2, Warehouse, Store, Factory, Briefcase, Phone, User, MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useIsTabletOrMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface FormData {
  objektart: string;
  name: string;
  telefon: string;
  plz: string;
}

const initialFormData: FormData = {
  objektart: "", name: "", telefon: "", plz: "",
};

const objektarten = [
  { id: "buero", label: "Büro", icon: Briefcase },
  { id: "lager", label: "Lager", icon: Warehouse },
  { id: "ladenlokal", label: "Ladenlokal", icon: Store },
  { id: "gewerbehalle", label: "Gewerbehalle", icon: Factory },
  { id: "sonstiges", label: "Sonstiges", icon: Building2 },
];

interface GewerbeFunnelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GewerbeFunnel({ open, onOpenChange }: GewerbeFunnelProps) {
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

  const updateFormData = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleObjektSelect = (id: string) => {
    updateFormData("objektart", id);
    setTimeout(() => setCurrentStep(2), 350);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.telefon) {
      toast({ title: "Bitte geben Sie Name und Telefon an", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        quelle: 'gewerbe', funnel_typ: 'gewerbe-micro',
        objektart: formData.objektart,
        plz: formData.plz || '', ort: '',
        name: formData.name, telefon: formData.telefon,
        email: '', nachricht: '',
        timestamp: new Date().toISOString()
      };
      const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (response.ok) {
        setIsSubmitting(false);
        onOpenChange(false);
        navigate('/danke');
      } else { throw new Error(`HTTP Fehler: ${response.status}`); }
    } catch (error) {
      console.error('Submit error:', error); setIsSubmitting(false);
      toast({ title: "Fehler beim Senden", description: "Bitte versuchen Sie es erneut oder rufen Sie uns an.", variant: "destructive" });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1">Um welche Gewerbefläche geht es?</h3>
        <p className="text-sm text-muted-foreground">Wählen Sie die Art des Objekts</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {objektarten.map((type) => (
          <button
            key={type.id}
            onClick={() => handleObjektSelect(type.id)}
            className={`group relative p-4 lg:p-5 rounded-xl border-2 transition-all duration-200 min-h-[80px] hover:border-primary/50 ${
              formData.objektart === type.id ? "border-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            <div className="flex flex-col items-center gap-2 lg:gap-3">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-colors ${
                formData.objektart === type.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              }`}>
                <type.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="font-medium text-foreground text-xs lg:text-sm text-center">{type.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-1">Wie können wir Sie erreichen?</h3>
        <p className="text-sm text-muted-foreground">Wir melden uns diskret & schnell bei Ihnen</p>
      </div>
      <div className="max-w-sm mx-auto space-y-3">
        <div>
          <Label htmlFor="name" className="text-sm flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Name / Firma *</Label>
          <Input id="name" type="text" placeholder="Max Mustermann / Muster GmbH" value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)} className="mt-1 h-12 text-base" />
        </div>
        <div>
          <Label htmlFor="telefon" className="text-sm flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Telefonnummer *</Label>
          <Input id="telefon" type="tel" inputMode="tel" placeholder="0160 1234567" value={formData.telefon}
            onChange={(e) => updateFormData("telefon", e.target.value)} className="mt-1 h-12 text-base" />
        </div>
        <div>
          <Label htmlFor="plz" className="text-sm flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Postleitzahl</Label>
          <Input id="plz" type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="89278" value={formData.plz}
            onChange={(e) => updateFormData("plz", e.target.value)} maxLength={5} className="mt-1 h-12 text-base" />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full gap-2 bg-cta hover:bg-cta-hover text-cta-foreground text-base font-bold min-h-[52px] rounded-xl mt-2"
        >
          {isSubmitting ? (
            <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Wird gesendet...</>
          ) : (
            <><Phone className="w-5 h-5" /> Jetzt Angebot anfordern</>
          )}
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-2">
          <Lock className="w-3.5 h-3.5" />
          <span>100% kostenlos & unverbindlich. Ihre Daten sind sicher.</span>
        </div>
      </div>
    </div>
  );

  const renderFunnelContent = () => (
    <div className="w-full">
      {currentStep === 1 ? renderStep1() : renderStep2()}
      {currentStep === 2 && (
        <div className="mt-4 pt-3 border-t border-border">
          <button
            onClick={() => setCurrentStep(1)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Zurück zur Objektauswahl
          </button>
        </div>
      )}
    </div>
  );

  const content = renderFunnelContent();

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <VisuallyHidden><DialogTitle>Gewerbe-Räumung anfragen</DialogTitle></VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
}
