import { useEffect, useState } from 'react';
import videoAsset from '@/assets/raeumzwerge-mobile.mp4.asset.json';
import posterAsset from '@/assets/raeumzwerge-mobile.webp.asset.json';

export function MobileHeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 1023px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => {
      setEnabled(mobile.matches && !reducedMotion.matches && !connection?.saveData);
      setPlaying(false);
    };
    // Give the eager poster and primary content priority over the video download.
    const timer = window.setTimeout(update, 800);
    mobile.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      window.clearTimeout(timer);
      mobile.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <video
      src={videoAsset.url}
      poster={posterAsset.url}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      onError={() => setEnabled(false)}
      className={`absolute inset-0 h-full w-full object-cover object-center lg:hidden ${playing ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}