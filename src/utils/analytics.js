const GA_MEASUREMENT_ID = 'G-6Y1JRSRMKN';
const CONSENT_KEY = 'ee_cookie_consent';

// The gtag.js snippet (with consent defaults set to "denied") lives statically
// in index.html <head>, satisfying Google Search Console verification.
// This module only applies the stored consent choice on top of those defaults.

function hasGtag() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

export function getConsent() {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === 'accepted' || value === 'declined' ? value : null;
}

function applyConsent(consent) {
  if (!hasGtag()) return;
  window.gtag('consent', 'update', {
    analytics_storage: consent === 'accepted' ? 'granted' : 'denied'
  });
}

export function setConsent(consent) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_KEY, consent);
  applyConsent(consent);
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  const consent = getConsent();
  if (consent !== null) {
    applyConsent(consent);
  }
}

export function trackPageView(path) {
  if (typeof window === 'undefined' || !hasGtag() || getConsent() !== 'accepted') return;
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: path });
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !hasGtag() || getConsent() !== 'accepted') return;
  window.gtag('event', name, params);
}
