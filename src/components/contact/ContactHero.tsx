import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/contact-hero.png"
          alt="Aufgeräumtes Wohnzimmer nach Entrümpelung"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 pt-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Wir sind für Sie da
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto">
            Wählen Sie Ihren Kontaktweg – wir melden uns schnell und unverbindlich zurück.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
