import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  ConsentState, 
  getDefaultConsent, 
  getStoredConsent, 
  saveConsent, 
  resetConsent as resetStoredConsent,
  applyConsent 
} from './consentUtils';

interface CookieConsentContextType {
  consent: ConsentState;
  showBanner: boolean;
  updateConsent: (consent: Partial<ConsentState>) => void;
  acceptAll: () => void;
  acceptNecessary: () => void;
  resetConsent: () => void;
  openBanner: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(getDefaultConsent());
  const [showBanner, setShowBanner] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize consent on mount
  useEffect(() => {
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      setConsent(storedConsent);
      applyConsent(storedConsent);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
    setIsInitialized(true);
  }, []);

  const updateConsent = useCallback((newConsent: Partial<ConsentState>) => {
    const updatedConsent: ConsentState = {
      ...consent,
      ...newConsent,
      necessary: true, // Always true
      timestamp: new Date().toISOString(),
    };
    setConsent(updatedConsent);
    saveConsent(updatedConsent);
    applyConsent(updatedConsent);
    setShowBanner(false);
  }, [consent]);

  const acceptAll = useCallback(() => {
    updateConsent({
      necessary: true,
      statistics: true,
      marketing: true,
    });
  }, [updateConsent]);

  const acceptNecessary = useCallback(() => {
    updateConsent({
      necessary: true,
      statistics: false,
      marketing: false,
    });
  }, [updateConsent]);

  const resetConsent = useCallback(() => {
    resetStoredConsent();
    setConsent(getDefaultConsent());
    setShowBanner(true);
  }, []);

  const openBanner = useCallback(() => {
    setShowBanner(true);
  }, []);

  // Don't render children until initialized to prevent flash
  if (!isInitialized) {
    return null;
  }

  return (
    <CookieConsentContext.Provider 
      value={{ 
        consent, 
        showBanner, 
        updateConsent, 
        acceptAll, 
        acceptNecessary, 
        resetConsent,
        openBanner 
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
