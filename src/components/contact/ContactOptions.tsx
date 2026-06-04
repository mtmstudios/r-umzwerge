import { motion } from "framer-motion";
import { Phone, FileText, ClipboardList } from "lucide-react";
import { PHONE_LINK } from "@/lib/constants";

interface ContactOptionsProps {
  onFormClick: () => void;
}

const options = [
  {
    id: "funnel",
    icon: ClipboardList,
    title: "Angebot berechnen",
    description: "Kostenloses Angebot in 5 Schritten",
    action: "Jetzt starten →",
    color: "bg-cta hover:bg-cta-hover",
    iconColor: "text-white",
    accentColor: "text-cta",
  },
  {
    id: "call",
    icon: Phone,
    title: "Anrufen",
    description: "Direkter Draht zu uns",
    action: "0176 22245161",
    href: PHONE_LINK,
    color: "bg-primary hover:bg-primary/90",
    iconColor: "text-primary-foreground",
    accentColor: "text-primary",
  },
  {
    id: "form",
    icon: FileText,
    title: "Formular",
    description: "In 5 Schritten zur Anfrage",
    action: "Zum Formular ↓",
    href: "#funnel",
    color: "bg-secondary hover:bg-secondary/80",
    iconColor: "text-secondary-foreground",
    accentColor: "text-primary",
  },
];

export function ContactOptions({ onFormClick }: ContactOptionsProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {option.id === "funnel" || option.id === "form" ? (
                <button
                  onClick={onFormClick}
                  className="w-full group relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8 text-left transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full ${option.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                      <option.icon className={`w-8 h-8 ${option.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {option.description}
                    </p>
                    <span className={`font-semibold ${option.accentColor}`}>
                      {option.action}
                    </span>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-300 group-hover:border-primary/20" />
                </button>
              ) : (
                <a
                  href={option.href}
                  className="block group relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full ${option.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                      <option.icon className={`w-8 h-8 ${option.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {option.description}
                    </p>
                    <span className={`font-semibold ${option.accentColor}`}>
                      {option.action}
                    </span>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-300 group-hover:border-primary/20" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
