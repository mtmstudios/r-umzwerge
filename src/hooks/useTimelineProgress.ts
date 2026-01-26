import { useEffect, useRef, useState } from 'react';

export function useTimelineProgress(stepsCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the section we've scrolled
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Start when section enters viewport, complete before leaving
      const scrollStart = windowHeight * 0.8; // Start animation when section is 80% visible
      const scrollEnd = sectionHeight * 0.6; // End when section is still 60% visible (animation completes earlier)
      
      const scrollRange = scrollStart - scrollEnd;
      const currentScroll = scrollStart - sectionTop;
      
      // Calculate progress (0 to 1)
      const rawProgress = Math.min(Math.max(currentScroll / scrollRange, 0), 1);
      setProgress(rawProgress);
      
      // Calculate which step is active
      const stepProgress = rawProgress * stepsCount;
      const currentStep = Math.min(Math.floor(stepProgress), stepsCount - 1);
      setActiveStep(currentStep);
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

  return { containerRef, activeStep, progress };
}
