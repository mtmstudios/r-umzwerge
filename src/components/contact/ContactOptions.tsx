import { motion } from "framer-motion";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { PHONE_LINK, getWhatsAppLink } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface ContactOptionsProps {
  onFormClick: () => void;
}

const options = [
  {
    id: "call",
    icon: Phone,
    title: "Anrufen",
    description: "Direkter Draht zu uns",
    action: "0160 3080676",
    href: PHONE_LINK,
    color: "bg-cta hover:bg-cta-hover",
    iconColor: "text-white",
  },
  {
    id: "whatsapp",
    icon: WhatsAppIcon,
    title: "WhatsApp",
    description: "Foto senden, Preis in 24h",
    action: "Chat öffnen →",
    href: getWhatsAppLink(),
    color: "bg-[#25D366] hover:bg-[#20BD5A]",
    iconColor: "text-white",
  },
  {
    id: "form",
    icon: FileText,
    title: "Formular",
    description: "In 5 Schritten zur Anfrage",
    action: "Zum Formular ↓",
    href: "#funnel",
    color: "bg-primary hover:bg-primary/90",
    iconColor: "text-primary-foreground",
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
              {option.id === "form" ? (
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
                    <span className="font-semibold text-primary">
                      {option.action}
                    </span>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-300 group-hover:border-primary/20" />
                </button>
              ) : (
                <a
                  href={option.href}
                  target={option.id === "whatsapp" ? "_blank" : undefined}
                  rel={option.id === "whatsapp" ? "noopener noreferrer" : undefined}
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
                    <span className={`font-semibold ${option.id === "call" ? "text-cta" : option.id === "whatsapp" ? "text-[#25D366]" : "text-primary"}`}>
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
