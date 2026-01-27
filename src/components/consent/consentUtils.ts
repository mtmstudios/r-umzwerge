// Cookie Consent Utilities
// TTDSG § 25 compliant consent management

export interface ConsentState {
  necessary: boolean; // Always true
  statistics: boolean; // Google Analytics
  marketing: boolean; // Google Ads
  timestamp: string;
}

const CONSENT_KEY = 'raeumzwerge_cookie_consent';

// Default consent state (only necessary cookies)
export const getDefaultConsent = (): ConsentState => ({
  necessary: true,
  statistics: false,
  marketing: false,
  timestamp: '',
});

// Get consent from localStorage
export const getStoredConsent = (): ConsentState | null => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading consent from localStorage:', e);
  }
  return null;
};

// Save consent to localStorage
export const saveConsent = (consent: ConsentState): void => {
  try {
    const consentWithTimestamp = {
      ...consent,
      necessary: true, // Always enforce necessary
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentWithTimestamp));
  } catch (e) {
    console.error('Error saving consent to localStorage:', e);
  }
};

// Reset consent (remove from localStorage)
export const resetConsent = (): void => {
  try {
    localStorage.removeItem(CONSENT_KEY);
    // Also remove any Google cookies
    document.cookie.split(';').forEach((cookie) => {
      const [name] = cookie.split('=');
      const trimmedName = name.trim();
      if (trimmedName.startsWith('_ga') || trimmedName.startsWith('_gcl')) {
        document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  } catch (e) {
    console.error('Error resetting consent:', e);
  }
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Load Google Analytics dynamically
export const loadGoogleAnalytics = (measurementId: string): void => {
  // Check if already loaded
  if (document.querySelector(`script[src*="gtag/js?id=${measurementId}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
  });
};

// Load Google Ads Conversion Tracking dynamically
export const loadGoogleAds = (conversionId: string): void => {
  // Check if already loaded
  if (document.querySelector(`script[src*="gtag/js?id=${conversionId}"]`)) {
    return;
  }

  // If gtag is not initialized yet, initialize it
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
  }

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${conversionId}`;
  script.async = true;
  document.head.appendChild(script);

  window.gtag('config', conversionId);
};

// Apply consent-based loading
export const applyConsent = (consent: ConsentState): void => {
  // Google Analytics - Replace with actual measurement ID when available
  if (consent.statistics) {
    // Placeholder - replace GA_MEASUREMENT_ID with actual ID
    // loadGoogleAnalytics('G-XXXXXXXXXX');
    console.log('Statistics consent granted - Google Analytics would load here');
  }

  // Google Ads - Replace with actual conversion ID when available
  if (consent.marketing) {
    // Placeholder - replace AW_CONVERSION_ID with actual ID
    // loadGoogleAds('AW-XXXXXXXXX');
    console.log('Marketing consent granted - Google Ads would load here');
  }
};
