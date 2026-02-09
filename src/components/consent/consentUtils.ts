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

// Load etracker dynamically (TTDSG-compliant with data-block-cookies)
export const loadEtracker = (blockCookies: boolean = true): void => {
  const existing = document.getElementById('_etLoader');
  if (existing) {
    existing.setAttribute('data-block-cookies', String(blockCookies));
    return;
  }

  const script = document.createElement('script');
  script.id = '_etLoader';
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.setAttribute('data-block-cookies', String(blockCookies));
  script.setAttribute('data-secure-code', 'Knsu83');
  script.src = '//code.etracker.com/code/e.js';
  script.async = true;
  document.head.appendChild(script);
};

// Send SPA page_view to Google Ads on route change
export const trackPageView = (path: string): void => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.origin + path,
    });
  }

  // etracker handles SPA tracking automatically via its own API
  // but we can trigger a virtual pageview if the et_eC_Wrapper exists
  if (typeof (window as any).et_eC_Wrapper === 'function') {
    (window as any).et_eC_Wrapper({
      et_pagename: path,
    });
  }
};

// Apply consent-based loading
export const applyConsent = (consent: ConsentState): void => {
  // etracker - always load (data-block-cookies="true" = TTDSG-compliant)
  // With statistics consent: full cookie functionality
  loadEtracker(!consent.statistics);

  // Google Ads Remarketing - only with marketing consent
  if (consent.marketing) {
    loadGoogleAds('AW-17942249403');
  }
};
