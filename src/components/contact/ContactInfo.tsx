import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { PHONE_NUMBER, EMAIL, ADDRESS, SERVICE_HOURS } from "@/lib/constants";

const infoItems = [
  {
    icon: MapPin,
    title: "Standort",
    content: ADDRESS,
  },
  {
    icon: Phone,
    title: "Telefon",
    content: PHONE_NUMBER,
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: EMAIL,
  },
  {
    icon: Clock,
    title: "Erreichbarkeit",
    content: SERVICE_HOURS,
  },
];

export function ContactInfo() {
  return (
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Weitere Kontaktmöglichkeiten
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Sie erreichen uns auch direkt – wir freuen uns auf Ihre Nachricht.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {infoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
            >
              <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-cta" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-primary-foreground/80 text-sm">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
