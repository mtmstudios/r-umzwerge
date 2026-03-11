import { useEffect } from 'react';

const BASE_URL = 'https://raeumzwerge.de';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const DEFAULT_TITLE = 'Räumzwerge – Entrümpelung in Süddeutschland | Sauber, Diskret, Transparent';
const DEFAULT_DESCRIPTION = 'Professionelle Entrümpelung in Bayern & Baden-Württemberg. Kostenlose Preiseinschätzung innerhalb von 24 Stunden. Besenrein & übergabefertig. Keine versteckten Kosten.';
const DEFAULT_OG_TITLE = 'Räumzwerge – Entrümpelung ohne Stress';
const DEFAULT_OG_DESCRIPTION = 'Professionelle Entrümpelung in Süddeutschland. Kostenlose Preiseinschätzung innerhalb von 24 Stunden. Besenrein, transparent, fair.';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface UseSeoOptions {
  title: string;
  description: string;
  /** Pfad ohne Domain, z.B. "/leistungen/haushaltsaufloesung" oder "/muenchen" */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  faqItems?: FaqItem[];
}

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOgMeta(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function injectFaqSchema(items: FaqItem[]) {
  const existing = document.getElementById('faq-schema');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'faq-schema';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });
  document.head.appendChild(script);
}

export function useSeo({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogImage,
  faqItems,
}: UseSeoOptions) {
  useEffect(() => {
    const canonical = `${BASE_URL}${path}`;
    const resolvedOgTitle = ogTitle ?? title;
    const resolvedOgDesc = ogDescription ?? description;
    const resolvedImage = ogImage ?? DEFAULT_OG_IMAGE;

    document.title = title;
    setMeta('description', description);
    setCanonical(canonical);

    setOgMeta('og:title', resolvedOgTitle);
    setOgMeta('og:description', resolvedOgDesc);
    setOgMeta('og:url', canonical);
    setOgMeta('og:image', resolvedImage);

    setMeta('twitter:title', resolvedOgTitle);
    setMeta('twitter:description', resolvedOgDesc);

    if (faqItems && faqItems.length > 0) {
      injectFaqSchema(faqItems);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('description', DEFAULT_DESCRIPTION);
      setCanonical(`${BASE_URL}/`);
      setOgMeta('og:title', DEFAULT_OG_TITLE);
      setOgMeta('og:description', DEFAULT_OG_DESCRIPTION);
      setOgMeta('og:url', `${BASE_URL}/`);
      setOgMeta('og:image', DEFAULT_OG_IMAGE);
      setMeta('twitter:title', DEFAULT_OG_TITLE);
      setMeta('twitter:description', DEFAULT_OG_DESCRIPTION);
      const faqScript = document.getElementById('faq-schema');
      if (faqScript) faqScript.remove();
    };
  }, [title, description, path, ogTitle, ogDescription, ogImage, faqItems]);
}
