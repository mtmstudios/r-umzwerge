import { useState } from 'react';
import { Phone, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink, PHONE_LINK, SERVICE_HOURS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HaushaltsaufloesungFunnel } from '@/components/contact/sea/HaushaltsaufloesungFunnel';
import { EntruempelungFunnel } from '@/components/contact/sea/EntruempelungFunnel';
import { MessieFunnel } from '@/components/contact/sea/MessieFunnel';
import type { SEAData, SEAVariant } from '@/lib/seaData';

interface SEAFinalCTAProps {
  data: SEAData;
}

const trustBadges = ['Unverbindlich', 'Keine versteckten Kosten', 'Besenrein'];

export function SEAFinalCTA({ data }: SEAFinalCTAProps) {
  const isGentle = data.tone === 'gentle';
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic CTA text
  const ctaText = isGentle
    ? { long: 'Unverbindlich schreiben', short: 'Schreiben' }
    : { long: 'Foto senden · Preis erhalten', short: 'Foto senden' };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary animate-gradient-slow" />
      
      {/* Floating decorative shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float-slow pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cta/10 rounded-full blur-2xl animate-float-slow pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Dynamic Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-primary-foreground mb-4">
            {data.ctaHeadline}
          </h2>
          <p className="text-primary-foreground/80 mb-10 text-base lg:text-lg">
            {data.ctaSubline}
          </p>

          {/* CTAs with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className={cn(
                "gap-3 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground",
                "h-14 sm:h-16 px-8 text-base sm:text-lg",
                "btn-lift shadow-xl shadow-black/20",
                "hover:shadow-2xl hover:shadow-whatsapp/30",
                "transition-all duration-300"
              )}
              data-track="cta-funnel-final"
            >
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="hidden sm:inline">{ctaText.long}</span>
              <span className="sm:hidden">{ctaText.short}</span>
            </Button>

            <Button
              asChild
              size="lg"
              className={cn(
                "gap-3 h-14 sm:h-16 px-8 text-base sm:text-lg",
                "bg-cta hover:bg-cta-hover text-cta-foreground",
                "btn-lift shadow-xl shadow-black/20",
                "hover:shadow-2xl hover:shadow-cta/30",
                "transition-all duration-300"
              )}
              data-track="cta-phone-final"
            >
              <a href={PHONE_LINK}>
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                Jetzt anrufen
              </a>
            </Button>
          </div>

          {/* Trust Badges with Glassmorphism */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className={cn(
                  "flex items-center gap-2",
                  "px-4 py-2 rounded-full",
                  "bg-white/10 backdrop-blur-sm",
                  "border border-white/10",
                  "text-primary-foreground/90"
                )}
              >
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>

          {/* Service Hours */}
          <div className="inline-flex items-center gap-2 text-primary-foreground/70 text-sm">
            <Clock className="h-4 w-4" />
            <span>Öffnungszeiten: {SERVICE_HOURS}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Funnel based on page slug */}
      {data.slug === 'haushaltsaufloesung' && (
        <HaushaltsaufloesungFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
      {data.slug === 'entruempelung' && (
        <EntruempelungFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
      {data.slug === 'messie-hilfe' && (
        <MessieFunnel open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </section>
  );
}
