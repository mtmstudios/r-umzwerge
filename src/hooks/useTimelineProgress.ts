import { useEffect, useRef, useState, useCallback } from 'react';

export function useTimelineProgress(stepsCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [justActivated, setJustActivated] = useState<number | null>(null);
  const previousActiveStep = useRef(-1);
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch handler for mobile - navigate to specific step
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= stepsCount) return;
    
    // Trigger bounce animation if different step
    if (stepIndex !== activeStep) {
      setJustActivated(stepIndex);
      setTimeout(() => setJustActivated(null), 500);
    }
    
    setActiveStep(stepIndex);
    setProgress((stepIndex + 1) / stepsCount);
    previousActiveStep.current = stepIndex;
  }, [stepsCount, activeStep]);

  // Scroll-based logic only on desktop
  useEffect(() => {
    if (isMobile) return;
    
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the section we've scrolled
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Start when section enters viewport, complete before leaving
      const scrollStart = windowHeight * 0.8;
      const scrollEnd = sectionHeight * 0.6;
      
      const scrollRange = scrollStart - scrollEnd;
      const currentScroll = scrollStart - sectionTop;
      
      // Calculate progress (0 to 1)
      const rawProgress = Math.min(Math.max(currentScroll / scrollRange, 0), 1);
      setProgress(rawProgress);
      
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
  }, [stepsCount, isMobile]);

  // On mobile, activate first step immediately
  useEffect(() => {
    if (isMobile && activeStep === -1) {
      goToStep(0);
    }
  }, [isMobile, activeStep, goToStep]);

  return { 
    containerRef, 
    activeStep, 
    progress, 
    justActivated,
    isMobile,
    goToStep
  };
}
