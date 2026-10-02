import { useCallback, useEffect, useRef } from 'react';

/**
 * useScrollReveal — reveals elements the first time they scroll into view.
 *
 * Returns a ref callback meant for `ref={...}`. Every element it is attached to
 * gets `is-visible` once, and is then unobserved, so scrolling back up never
 * replays the animation.
 *
 * Pair it with the `.reveal` / `.media` classes in a page stylesheet:
 *   .reveal        starts hidden and offset
 *   .reveal.is-visible  settles it
 *   .media.is-loaded    cross-fades the decoded frame in over a shimmer
 *
 * The observer is created lazily on first registration rather than in an
 * effect, so elements that mount later (lazy chunks, Suspense boundaries) are
 * picked up without a re-run.
 */
export function useScrollReveal() {
  const observerRef = useRef(null);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  return useCallback((element) => {
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-visible');
      return;
    }

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observerRef.current.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
    }

    observerRef.current.observe(element);
  }, []);
}

export default useScrollReveal;
