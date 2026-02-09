import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/components/consent/consentUtils';

/**
 * SPA page view tracking hook.
 * Sends a page_view event to Google Ads & etracker on every route change.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
}
