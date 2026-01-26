import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    // Initial call
    updateProgress();

    // Throttle scroll events for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent pointer-events-none',
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-cta transition-[width] duration-75 ease-out"
        style={{ 
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 0 10px hsl(var(--accent) / 0.5)' : 'none'
        }}
      />
    </div>
  );
}
