// SEA Landing Page Images - Centralized imports for Vite bundling

// Hero Images
import seaHeroTeam from '@/assets/sea-hero-team.webp';

// Haushaltsauflösung Before/After
import haushaltsaufloesungVorher from '@/assets/haushaltsaufloesung-vorher.webp';
import haushaltsaufloesungNachher from '@/assets/haushaltsaufloesung-nachher.webp';

// Entrümpelung Before/After
import entruempelungVorher from '@/assets/entruempelung-vorher.webp';
import entruempelungNachher from '@/assets/entruempelung-nachher.webp';

// Messie Before/After
import messieVorher from '@/assets/messie-vorher.webp';
import messieNachher from '@/assets/messie-nachher.webp';

// Gewerbe Before/After
import gewerbeVorher from '@/assets/gewerbe-vorher.jpg';
import gewerbeNachher from '@/assets/gewerbe-nachher.jpg';

export const seaImages = {
  heroTeam: seaHeroTeam,
  haushaltsaufloesung: {
    before: haushaltsaufloesungVorher,
    after: haushaltsaufloesungNachher,
  },
  entruempelung: {
    before: entruempelungVorher,
    after: entruempelungNachher,
  },
  messie: {
    before: messieVorher,
    after: messieNachher,
  },
  gewerbe: {
    before: gewerbeVorher,
    after: gewerbeNachher,
  },
};
