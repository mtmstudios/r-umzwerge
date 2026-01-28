// Service Page Images - Centralized imports for Vite bundling

// Hero Images for Service Pages
import entruempelungHero from '@/assets/service-entruempelung-hero.png';
import haushaltsaufloesungHero from '@/assets/service-haushaltsaufloesung-hero.png';
import kellerHero from '@/assets/service-keller.jpg';
import gewerbeHero from '@/assets/service-gewerbe.jpg';
import messieHero from '@/assets/messiewohnung-bg.jpg';

// City/Contact Hero Images
import heroTeamRaeumzwerge from '@/assets/hero-team-raeumzwerge.png';
import contactHero from '@/assets/contact-hero.png';

export const serviceImages: Record<string, string> = {
  // Service-specific hero images
  wohnungsentruempelung: entruempelungHero,
  entruempelung: entruempelungHero,
  haushaltsaufloesung: haushaltsaufloesungHero,
  'keller-dachboden-garage': kellerHero,
  'gewerbe-buero-lager': gewerbeHero,
  'messie-wohnungen': messieHero,
  
  // Shared hero images
  heroTeamRaeumzwerge,
  contactHero,
};

// Type for service slugs
export type ServiceImageSlug = keyof typeof serviceImages;
