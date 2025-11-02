import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EnhancedPerformanceMonitor, detectBrowserCapabilities } from '../utils/performanceUtils';
import { initWebVitals } from '../utils/webVitals';
import './GsapHero.css';

gsap.registerPlugin(ScrollTrigger);

function GsapHero() {
  const foldEffectRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollTriggerRefs = useRef([]);
  const performanceMonitorRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);

  const setupScrollAnimation = useCallback(() => {
    const foldEffect = foldEffectRef.current;
    if (!foldEffect || !shouldStartAnimation) return;

    // Kill existing ScrollTriggers
    scrollTriggerRefs.current.forEach(trigger => trigger.kill());
    scrollTriggerRefs.current = [];

    // Use requestIdleCallback for non-critical animations
    const scheduleAnimation = () => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          setupMarqueeAnimations(foldEffect);
        }, { timeout: 100 });
      } else {
        setTimeout(() => setupMarqueeAnimations(foldEffect), 0);
      }
    };

    scheduleAnimation();
  }, [shouldStartAnimation]);

  const setupMarqueeAnimations = useCallback((foldEffect) => {
    // Optimize marquee animations with better performance settings
    gsap.utils.toArray('.marquee', foldEffect).forEach((el, index) => {
      const track = el.querySelector('.track');
      if (!track) return;

      // Use transform3d for hardware acceleration
      const [x, xEnd] = (index % 2 === 0) ? [-500, -1500] : [-500, 0];

      const scrollTrigger = gsap.fromTo(track,
        {
          x,
          force3D: true
        },
        {
          x: xEnd,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: foldEffect,
            scrub: 0.5,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            refreshPriority: -1
          }
        }
      );

      scrollTriggerRefs.current.push(scrollTrigger.scrollTrigger);
    });
  }, []);

  const setupSmoothScroll = useCallback(() => {
    const centerContent = document.getElementById('center-content');
    const centerFold = document.getElementById('center-fold');
    const foldsContent = Array.from(document.querySelectorAll('.fold-content'));

    if (!centerContent || !centerFold || foldsContent.length === 0) return;

    let targetScroll = 0;
    let currentScroll = 0;
    let ticking = false;
    let isHomePage = window.location.pathname === '/';

    // Only run smooth scroll on home page
    if (!isHomePage) return;

    // Optimized animation function with requestAnimationFrame throttling
    const updateTransforms = () => {
      foldsContent.forEach(content => {
        if (content && content.style && content.parentElement) {
          const transformValue = Math.round(currentScroll * 100) / 100;
          content.style.transform = `translate3d(0, ${transformValue}px, 0)`;
        }
      });
      ticking = false;
    };

    const tick = () => {
      // Early exit if not on home page
      if (window.location.pathname !== '/') {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        return;
      }

      const currentScrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      
      if (!centerContent || !centerFold || foldsContent.length === 0) {
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      targetScroll = -currentScrollPos;

      const diff = targetScroll - currentScroll;
      if (Math.abs(diff) < 0.1) {
        currentScroll = targetScroll;
      } else {
        currentScroll += diff * 0.08;
      }

      if (Math.abs(diff) > 0.5) {
        if (!ticking) {
          requestAnimationFrame(updateTransforms);
          ticking = true;
        }
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    // Only modify body height on home page and store original height
    const originalBodyHeight = document.body.style.height;
    const centerContentHeight = centerContent.clientHeight;
    const centerFoldHeight = centerFold.clientHeight;
    
    if (isHomePage && centerContentHeight > 0 && centerFoldHeight > 0) {
      const overflowHeight = centerContentHeight - centerFoldHeight;
      if (overflowHeight > 0) {
        document.body.style.height = `${overflowHeight + window.innerHeight}px`;
      }
    }

    if (isHomePage && centerContent && centerFold && foldsContent.length > 0) {
      tick();
    }

    // Return cleanup function that restores original state
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Restore original body height
      document.body.style.height = originalBodyHeight;
    };
  }, []);

  // Intersection Observer for lazy initialization
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          // Delay animation start to prioritize critical content
          setTimeout(() => setShouldStartAnimation(true), 500);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (foldEffectRef.current) {
      observer.observe(foldEffectRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Only initialize on home page
    const isHomePage = window.location.pathname === '/';
    
    if (!isHomePage || !shouldStartAnimation) {
      return;
    }

    // Initialize performance monitoring
    const capabilities = detectBrowserCapabilities();

    // Log browser capabilities in development
    if (import.meta.env.DEV) {
      console.group('🔍 Browser Capabilities');
      console.table(capabilities);
      console.groupEnd();
    }

    // Initialize enhanced performance monitor with Core Web Vitals
    performanceMonitorRef.current = new EnhancedPerformanceMonitor();
    if (import.meta.env.DEV) {
      performanceMonitorRef.current.startMonitoring();
      initWebVitals();
    }

    // Use requestIdleCallback to defer non-critical setup
    const initializeHero = () => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          setupScrollAnimation();
          const cleanupScroll = setupSmoothScroll();
          
          // Store cleanup function
          return cleanupScroll;
        }, { timeout: 2000 });
      } else {
        setTimeout(() => {
          setupScrollAnimation();
          setupSmoothScroll();
        }, 100);
      }
    };

    const cleanupScroll = initializeHero();

    // Handle resize events with debounce
    const resizeDelay = capabilities.isMobile ? 500 : 300;
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (document.visibilityState === 'visible' && window.location.pathname === '/') {
          ScrollTrigger.refresh();
        }
      }, resizeDelay);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);

      // Stop enhanced performance monitoring and generate report
      if (performanceMonitorRef.current && import.meta.env.DEV) {
        performanceMonitorRef.current.stopMonitoring();
        performanceMonitorRef.current.generateEnhancedReport();
      }

      // Cleanup ScrollTriggers
      scrollTriggerRefs.current.forEach(trigger => trigger.kill());
      scrollTriggerRefs.current = [];

      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Reset body height only if we're leaving the home page
      if (window.location.pathname !== '/' && document.body.style.height) {
        document.body.style.height = '';
      }

      if (cleanupScroll) cleanupScroll();
    };
  }, [setupScrollAnimation, setupSmoothScroll, shouldStartAnimation]);

  return (
    <div 
      className={`screen ${isInView ? 'in-view' : ''}`} 
      id="fold-effect" 
      ref={foldEffectRef}
      style={{ 
        opacity: isInView ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <div className="wrapper-3d">
        <div className="fold fold-top">
          <div className="fold-align">
            <div className="fold-content">
              <div className="marquee">
                <div className="track">
                  Economics.Economics.<span className="-focus">Economics.</span>Economics.Economics.Economics.Economics.Economics.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Markets.Markets.<span className="-focus">Markets.</span>Markets.Markets.Markets.Markets.Markets.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Value.Value.<span className="-focus">Value.</span>Value.Value.Value.Value.Value.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Capital.Capital.Capital.Capital.Capital.<span className="-focus">Capital.</span>Capital.Capital.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Labour.Labour.Labour.<span className="-focus">Labour.</span>Labour.Labour.Labour.Labour.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Power.Power.<span className="-focus">Power.</span>Power.Power.Power.Power.Power.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Crisis.Crisis.Crisis.Crisis.<span className="-focus">Crisis.</span>Crisis.Crisis.Crisis.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fold fold-center" id="center-fold">
          <div className="fold-align">
            <div className="fold-content" id="center-content">
              <div className="marquee">
                <div className="track">
                  Economics.Economics.<span className="-focus">Economics.</span>Economics.Economics.Economics.Economics.Economics.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Markets.Markets.<span className="-focus">Markets.</span>Markets.Markets.Markets.Markets.Markets.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Value.Value.<span className="-focus">Value.</span>Value.Value.Value.Value.Value.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Capital.Capital.<span className="-focus">Capital.</span>Capital.Capital.Capital.Capital.Capital.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Labour.Labour.<span className="-focus">Labour.</span>Labour.Labour.Labour.Labour.Labour.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Power.Power.<span className="-focus">Power.</span>Power.Power.Power.Power.Power.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Crisis.Crisis.<span className="-focus">Crisis.</span>Crisis.Crisis.Crisis.Crisis.Crisis.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fold fold-bottom">
          <div className="fold-align">
            <div className="fold-content">
              <div className="marquee">
                <div className="track">
                  Economics.Economics.<span className="-focus">Economics.</span>Economics.Economics.Economics.Economics.Economics.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Markets.Markets.<span className="-focus">Markets.</span>Markets.Markets.Markets.Markets.Markets.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Value.Value.<span className="-focus">Value.</span>Value.Value.Value.Value.Value.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Capital.Capital.<span className="-focus">Capital.</span>Capital.Capital.Capital.Capital.Capital.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Labour.Labour.<span className="-focus">Labour.</span>Labour.Labour.Labour.Labour.Labour.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Power.Power.<span className="-focus">Power.</span>Power.Power.Power.Power.Power.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Crisis.Crisis.<span className="-focus">Crisis.</span>Crisis.Crisis.Crisis.Crisis.Crisis.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GsapHero;
