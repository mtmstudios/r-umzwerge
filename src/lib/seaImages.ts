// SEA Landing Page Images - Centralized imports for Vite bundling

// Hero Images
import seaHeroTeam from '@/assets/sea-hero-team.png';

// Haushaltsauflösung Before/After
import haushaltsaufloesungVorher from '@/assets/haushaltsaufloesung-vorher.png';
import haushaltsaufloesungNachher from '@/assets/haushaltsaufloesung-nachher.png';

// Entrümpelung Before/After
import entruempelungVorher from '@/assets/entruempelung-vorher.png';
import entruempelungNachher from '@/assets/entruempelung-nachher.png';

// Messie Before/After
import messieVorher from '@/assets/messie-vorher.png';
import messieNachher from '@/assets/messie-nachher.png';

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
};
