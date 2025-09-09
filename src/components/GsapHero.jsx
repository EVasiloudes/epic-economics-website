import { useEffect, useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GsapHero.css';

// Register ScrollTrigger plugin at module level
gsap.registerPlugin(ScrollTrigger);

function GsapHero() {
  const foldEffectRef = useRef(null);
  const centerContentRef = useRef(null);
  const centerFoldRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isGsapReady, setIsGsapReady] = useState(false);

  // Helper function to render marquee content
  const renderMarqueeSet = useCallback(() => (
    <>
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
          Theory.Theory.Theory.<span className="-focus">Theory.</span>Theory.Theory.Theory.Theory.
        </div>
      </div>
    </>
  ), []);

  // Throttle function for performance
  const throttle = useCallback((func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  // Initialize GSAP
  useEffect(() => {
    const initializeGsap = async () => {
      try {
        if (!gsap || !ScrollTrigger) {
          throw new Error('GSAP or ScrollTrigger not available');
        }

        setIsGsapReady(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize GSAP:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    initializeGsap();
  }, []);

  // Setup GSAP animations
  useEffect(() => {
    if (!isGsapReady || hasError || isLoading) return;

    const foldEffect = foldEffectRef.current;
    const centerContent = centerContentRef.current;
    const centerFold = centerFoldRef.current;

    if (!foldEffect || !centerContent || !centerFold) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    if (isReducedMotion) {
      return () => {};
    }

    let isAnimating = false;

    try {
      // Animate marquee elements
      gsap.utils.toArray('.marquee', foldEffect).forEach((el, index) => {
        const w = el.querySelector('.track');
        if (!w) return;

        const [x, xEnd] = (index % 2 === 0) ? [-500, -1500] : [-500, 0];
        const mobileMultiplier = isMobile ? 0.5 : 1;
        const adjustedXEnd = xEnd * mobileMultiplier;

        gsap.fromTo(w, { x }, {
          x: adjustedXEnd,
          scrollTrigger: {
            trigger: foldEffect,
            scrub: isMobile ? 2 : 1,
            invalidateOnRefresh: true
          }
        });
      });

      // Setup scroll-based fold content movement
      const foldsContent = Array.from(foldEffect.querySelectorAll('.fold-content'));
      let targetScroll = -(document.documentElement.scrollTop || document.body.scrollTop);
      let currentScroll = targetScroll;

      const tick = () => {
        if (!foldEffect || !centerContent || !centerFold || !isAnimating) {
          return;
        }

        try {
          const overflowHeight = centerContent.clientHeight - centerFold.clientHeight;
          document.body.style.height = `${Math.max(overflowHeight + window.innerHeight, window.innerHeight)}px`;

          targetScroll = -(document.documentElement.scrollTop || document.body.scrollTop);
          const easing = isMobile ? 0.05 : 0.1;
          currentScroll += (targetScroll - currentScroll) * easing;

          if (Math.abs(targetScroll - currentScroll) > 0.1) {
            foldsContent.forEach(content => {
              if (content && content.style) {
                content.style.transform = `translateY(${currentScroll}px)`;
              }
            });
          }

          animationFrameRef.current = requestAnimationFrame(tick);
        } catch (error) {
          console.warn('GSAP Hero animation error:', error);
          isAnimating = false;
        }
      };

      if (!isAnimating) {
        isAnimating = true;
        tick();
      }

      // Handle window resize
      const handleResize = throttle(() => {
        ScrollTrigger.refresh();
      }, 250);

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        isAnimating = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        window.removeEventListener('resize', handleResize);
        if (document.body.style.height) {
          document.body.style.height = '';
        }
      };
    } catch (error) {
      console.error('GSAP animation setup error:', error);
      setHasError(true);
    }
  }, [throttle, isGsapReady, hasError, isLoading]);

  // Loading state
  if (isLoading) {
    return (
      <div className="screen gsap-loading">
        <div className="wrapper-3d">
          <div className="fold fold-center">
            <div className="fold-align">
              <div className="fold-content">
                {renderMarqueeSet()}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-navigation-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Epic Economics</h1>
            <p className="hero-tagline">Loading experience...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state or normal state
  const containerClass = hasError ? "screen gsap-error-recovery" : "screen";

  return (
    <div className={containerClass} id="fold-effect" ref={foldEffectRef}>
      <div className="wrapper-3d">
        <div className="fold fold-top">
          <div className="fold-align">
            <div className="fold-content">
              {renderMarqueeSet()}
            </div>
          </div>
        </div>
        <div className="fold fold-center" id="center-fold" ref={centerFoldRef}>
          <div className="fold-align">
            <div className="fold-content" id="center-content" ref={centerContentRef}>
              {renderMarqueeSet()}
            </div>
          </div>
        </div>
        <div className="fold fold-bottom">
          <div className="fold-align">
            <div className="fold-content">
              {renderMarqueeSet()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Overlay */}
      <div className="hero-navigation-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Epic Economics</h1>
          <p className="hero-tagline">What would you protest about today?</p>
          <div className="hero-cta">
            <Link to="/preview" className="cta-button primary">
              Watch Preview
            </Link>
            <Link to="/technical" className="cta-button secondary">
              Technical Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GsapHero;
