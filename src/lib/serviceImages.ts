// Service Page Images - Centralized imports for Vite bundling

// Hero Images for Service Pages
import entruempelungHero from '@/assets/service-entruempelung-hero.webp';
import haushaltsaufloesungHero from '@/assets/service-haushaltsaufloesung-hero.webp';
import kellerHero from '@/assets/service-keller.webp';
import gewerbeHero from '@/assets/service-gewerbe.webp';
import messieHero from '@/assets/messiewohnung-bg.jpg';

// City/Contact Hero Images
import heroTeamRaeumzwerge from '@/assets/hero-team-raeumzwerge.webp';
import contactHero from '@/assets/contact-hero.webp';

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
