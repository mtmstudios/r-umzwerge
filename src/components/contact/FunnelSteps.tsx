import { motion } from "framer-motion";
import { Home, Building2, Warehouse, Store, Sparkles, HelpCircle, Ruler, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface FormData {
  serviceType: string;
  scope: string;
  postalCode: string;
  location: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface StepProps {
  formData: FormData;
  updateFormData: (key: keyof FormData, value: string) => void;
}

const serviceTypes = [
  { id: "wohnung", label: "Wohnung", icon: Home },
  { id: "haus", label: "Haus", icon: Building2 },
  { id: "keller", label: "Keller / Dachboden", icon: Warehouse },
  { id: "gewerbe", label: "Gewerbe / Büro", icon: Store },
  { id: "messie", label: "Diskrete Räumung", icon: Sparkles },
  { id: "sonstiges", label: "Sonstiges", icon: HelpCircle },
];

const scopeOptions = [
  { id: "klein", label: "Klein", description: "1-2 Räume, wenig Gegenstände" },
  { id: "mittel", label: "Mittel", description: "3-4 Räume, normale Menge" },
  { id: "gross", label: "Groß", description: "5+ Räume oder voller Haushalt" },
];

const timelineOptions = [
  { id: "schnell", label: "So schnell wie möglich" },
  { id: "2wochen", label: "In 1-2 Wochen" },
  { id: "monat", label: "In 1 Monat+" },
  { id: "flexibel", label: "Flexibel" },
];

// Step 1: Service Type
export function Step1ServiceType({ formData, updateFormData }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Was möchten Sie räumen lassen?
        </h3>
        <p className="text-muted-foreground">
          Wählen Sie die Art des Objekts
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {serviceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => updateFormData("serviceType", type.id)}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ${
              formData.serviceType === type.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 bg-card"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                formData.serviceType === type.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              }`}>
                <type.icon className="w-6 h-6" />
              </div>
              <span className="font-medium text-foreground">{type.label}</span>
            </div>
            {formData.serviceType === type.id && (
              <motion.div
                layoutId="serviceCheck"
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Step 2: Scope
export function Step2Scope({ formData, updateFormData }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Wie groß ist der Umfang?
        </h3>
        <p className="text-muted-foreground">
          Eine grobe Einschätzung genügt
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {scopeOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => updateFormData("scope", option.id)}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              formData.scope === option.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 bg-card"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                formData.scope === option.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}>
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-foreground block mb-1">{option.label}</span>
                <span className="text-sm text-muted-foreground">{option.description}</span>
              </div>
            </div>
            {formData.scope === option.id && (
              <motion.div
                layoutId="scopeCheck"
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Step 3: Location
export function Step3Location({ formData, updateFormData }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Wo befindet sich das Objekt?
        </h3>
        <p className="text-muted-foreground">
          Damit wir prüfen können, ob wir in Ihrer Nähe arbeiten
        </p>
      </div>
      
      <div className="max-w-md mx-auto space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Label htmlFor="postalCode">PLZ *</Label>
            <Input
              id="postalCode"
              type="text"
              placeholder="89278"
              value={formData.postalCode}
              onChange={(e) => updateFormData("postalCode", e.target.value)}
              maxLength={5}
              className="mt-1"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="location">Ort *</Label>
            <Input
              id="location"
              type="text"
              placeholder="Nersingen"
              value={formData.location}
              onChange={(e) => updateFormData("location", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Step 4: Timeline
export function Step4Timeline({ formData, updateFormData }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Wann soll es stattfinden?
        </h3>
        <p className="text-muted-foreground">
          Keine Sorge – wir stimmen den genauen Termin später ab
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
        {timelineOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => updateFormData("timeline", option.id)}
            className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 flex items-center gap-2 ${
              formData.timeline === option.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/50 bg-card text-foreground"
            }`}
          >
            <Clock className="w-4 h-4" />
            {option.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Step 5: Contact Details
export function Step5Contact({ formData, updateFormData }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Ihre Kontaktdaten
        </h3>
        <p className="text-muted-foreground">
          Wie können wir Sie erreichen?
        </p>
      </div>
      
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            type="text"
            placeholder="Max Mustermann"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Telefon *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="0160 1234567"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email">E-Mail (optional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="max@beispiel.de"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="message">Nachricht (optional)</Label>
          <Textarea
            id="message"
            placeholder="Gibt es etwas, das wir vorab wissen sollten?"
            value={formData.message}
            onChange={(e) => updateFormData("message", e.target.value)}
            className="mt-1 min-h-[100px]"
          />
        </div>
      </div>
    </motion.div>
  );
}
