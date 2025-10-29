import { useState, useEffect } from 'react';

/**
 * Custom hook to detect when an element with a specific class is scrolled into view
 * @param {string} elementClass - The class name of the element to monitor
 * @param {number} threshold - The threshold in pixels from the bottom of the viewport
 * @returns {boolean} - Whether the element has been scrolled into view
 */
export function useElementVisibility(elementClass, threshold = 100) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkElementVisibility = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const element = document.querySelector(`.${elementClass}`);
          
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementIsVisible = rect.top <= window.innerHeight - threshold;
            
            if (elementIsVisible !== isVisible) {
              setIsVisible(elementIsVisible);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    checkElementVisibility();

    // Listen for scroll events
    window.addEventListener('scroll', checkElementVisibility, { passive: true });
    window.addEventListener('resize', checkElementVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkElementVisibility);
      window.removeEventListener('resize', checkElementVisibility);
    };
  }, [elementClass, threshold, isVisible]);

  return isVisible;
}

/**
 * Custom hook to detect scroll direction and manage navbar visibility
 * @param {number} threshold - Minimum scroll distance to trigger direction change
 * @returns {object} - Object containing scroll direction and visibility state
 */
export function useScrollDirection(threshold = 3) {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId = null;

    const updateScrollDirection = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const scrollY = window.scrollY;
        const scrollDifference = Math.abs(scrollY - lastScrollY);

        if (scrollDifference > threshold) {
          const direction = scrollY > lastScrollY ? 'down' : 'up';
          
          if (direction !== scrollDirection) {
            setScrollDirection(direction);
            setIsVisible(direction === 'up' || scrollY < 50);
          }
          
          setLastScrollY(scrollY);
        }
      }, 10);
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [scrollDirection, lastScrollY, threshold]);

  return {
    scrollDirection,
    isVisible,
    lastScrollY
  };
}