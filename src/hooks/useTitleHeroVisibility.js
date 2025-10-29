import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to detect when the TitleHero element is scrolled into view
 * @param {number} threshold - The threshold in pixels from the bottom of the viewport
 * @returns {boolean} - Whether the TitleHero element has been scrolled into view
 */
export function useTitleHeroVisibility(threshold = 100) {
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);

  const checkTitleHeroVisibility = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const titleHeroElement = document.querySelector('.title-hero');
        
        if (titleHeroElement) {
          const rect = titleHeroElement.getBoundingClientRect();
          const elementIsVisible = rect.top <= window.innerHeight - threshold;
          
          if (elementIsVisible !== isVisible) {
            setIsVisible(elementIsVisible);
          }
        }
        
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [threshold, isVisible]);

  useEffect(() => {
    // Initial check
    checkTitleHeroVisibility();

    // Listen for scroll and resize events with passive options for performance
    window.addEventListener('scroll', checkTitleHeroVisibility, { passive: true });
    window.addEventListener('resize', checkTitleHeroVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkTitleHeroVisibility);
      window.removeEventListener('resize', checkTitleHeroVisibility);
    };
  }, [checkTitleHeroVisibility]);

  return isVisible;
}