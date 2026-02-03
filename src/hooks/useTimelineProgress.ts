import { useEffect, useRef, useState } from 'react';

export function useTimelineProgress(stepsCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [justActivated, setJustActivated] = useState<number | null>(null);
  const previousActiveStep = useRef(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress so timeline reaches 100% when section center is in viewport center
      const sectionTop = rect.top;
      
      // Längerer, sanfterer Scroll-Bereich (40% statt 20%)
      const scrollStart = windowHeight * 0.85;  // Früher starten
      const scrollEnd = windowHeight * 0.45;    // Später enden
      
      const scrollRange = scrollStart - scrollEnd;
      const currentScroll = scrollStart - sectionTop;
      
      // Calculate raw progress (0 to 1)
      const rawProgress = Math.min(Math.max(currentScroll / scrollRange, 0), 1);
      
      // Smooth ease-in-out-quad für natürlichere Bewegung
      const easedProgress = rawProgress < 0.5
        ? 2 * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
      
      setProgress(easedProgress);
      
      // Calculate which step is active
      const stepProgress = rawProgress * stepsCount;
      const newActiveStep = Math.min(Math.floor(stepProgress), stepsCount - 1);
      
      // Check if a new step was just activated
      if (newActiveStep > previousActiveStep.current && newActiveStep >= 0) {
        setJustActivated(newActiveStep);
        previousActiveStep.current = newActiveStep;
        
        // Remove animation class after 500ms
        setTimeout(() => {
          setJustActivated(null);
        }, 500);
      }
      
      setActiveStep(newActiveStep);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [stepsCount]);

  return { 
    containerRef, 
    activeStep, 
    progress, 
    justActivated
  };
}
