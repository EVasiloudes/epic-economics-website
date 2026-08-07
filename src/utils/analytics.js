const GA_MEASUREMENT_ID = 'G-6Y1JRSRMKN';
const CONSENT_KEY = 'ee_cookie_consent';

let analyticsLoaded = false;

function loadGtagScript() {
  return new Promise((resolve) => {
    if (document.querySelector('script[data-gtag]')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.gtag = 'true';
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

function initGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
  analyticsLoaded = true;
}

export function getConsent() {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === 'accepted' || value === 'declined' ? value : null;
}

export function setConsent(consent) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_KEY, consent);

  if (consent === 'accepted' && !analyticsLoaded) {
    loadGtagScript().then(initGtag);
  }
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  if (getConsent() === 'accepted') {
    loadGtagScript().then(initGtag);
  }
}

export function trackPageView(path) {
  if (typeof window === 'undefined' || !window.gtag || !analyticsLoaded) return;
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: path });
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !window.gtag || !analyticsLoaded) return;
  window.gtag('event', name, params);
}
