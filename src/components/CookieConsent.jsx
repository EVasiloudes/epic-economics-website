import { useState, useEffect, useRef, useCallback } from 'react';
import { getConsent, setConsent } from '../utils/analytics';
import './CookieConsent.css';

const BANNER_HEIGHT_VAR = '--cookie-banner-height';

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef(null);

  const syncBannerHeight = useCallback(() => {
    const height = bannerRef.current ? bannerRef.current.offsetHeight : 0;
    document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, `${height}px`);
  }, []);

  useEffect(() => {
    if (getConsent() === null) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    syncBannerHeight();

    const resizeObserver = new ResizeObserver(syncBannerHeight);
    if (bannerRef.current) {
      resizeObserver.observe(bannerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, '0px');
    };
  }, [visible, syncBannerHeight]);

  const handleChoice = (consent) => {
    setConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="cookie-consent"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <p className="cookie-consent__text">
        We use cookies to understand how visitors use this site and to improve your experience.
      </p>
      <div className="cookie-consent__actions">
        <button
          type="button"
          className="cookie-consent__button cookie-consent__button--accept"
          onClick={() => handleChoice('accepted')}
        >
          Accept
        </button>
        <button
          type="button"
          className="cookie-consent__button cookie-consent__button--decline"
          onClick={() => handleChoice('declined')}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;
