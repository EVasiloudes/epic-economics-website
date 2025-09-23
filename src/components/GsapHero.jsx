import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PerformanceMonitor, detectBrowserCapabilities } from '../utils/performanceUtils';
import './GsapHero.css';

gsap.registerPlugin(ScrollTrigger);

function GsapHero() {
  const foldEffectRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollTriggerRefs = useRef([]);
  const performanceMonitorRef = useRef(null);

  const setupScrollAnimation = useCallback(() => {
    const foldEffect = foldEffectRef.current;
    if (!foldEffect) return;

    // Kill existing ScrollTriggers
    scrollTriggerRefs.current.forEach(trigger => trigger.kill());
    scrollTriggerRefs.current = [];

    // Optimize marquee animations with better performance settings
    gsap.utils.toArray('.marquee', foldEffect).forEach((el, index) => {
      const track = el.querySelector('.track');
      if (!track) return;

      // Use transform3d for hardware acceleration
      const [x, xEnd] = (index % 2 === 0) ? [-500, -1500] : [-500, 0];
      
      const scrollTrigger = gsap.fromTo(track, 
        { 
          x,
          force3D: true // Force hardware acceleration
        }, 
        {
          x: xEnd,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: foldEffect,
            scrub: true, // Use boolean for better performance than number
            invalidateOnRefresh: true,
            fastScrollEnd: true
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

    // Optimized animation function with requestAnimationFrame throttling
    const updateTransforms = () => {
      foldsContent.forEach(content => {
        if (content && content.style) {
          // Use transform3d for better performance
          content.style.transform = `translate3d(0, ${currentScroll}px, 0)`;
        }
      });
      ticking = false;
    };

    const tick = () => {
      // Calculate target scroll position
      targetScroll = -(
        document.documentElement.scrollTop || document.body.scrollTop
      );

      // Smooth interpolation with optimized easing
      const diff = targetScroll - currentScroll;
      if (Math.abs(diff) < 0.1) {
        currentScroll = targetScroll;
      } else {
        currentScroll += diff * 0.1;
      }

      // Throttle DOM updates using requestAnimationFrame
      if (!ticking) {
        requestAnimationFrame(updateTransforms);
        ticking = true;
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    // Set initial body height
    const overflowHeight = centerContent.clientHeight - centerFold.clientHeight;
    document.body.style.height = `${overflowHeight + window.innerHeight}px`;

    // Start animation loop
    tick();

    // Return cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Initialize performance monitoring
    const capabilities = detectBrowserCapabilities();
    
    // Log browser capabilities in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🔍 Browser Capabilities');
      console.table(capabilities);
      console.groupEnd();
    }
    
    // Initialize performance monitor
    performanceMonitorRef.current = new PerformanceMonitor();
    if (process.env.NODE_ENV === 'development') {
      performanceMonitorRef.current.startMonitoring();
    }

    // Debounce setup to avoid multiple rapid calls
    const timeoutId = setTimeout(() => {
      setupScrollAnimation();
      const cleanupScroll = setupSmoothScroll();

      // Handle resize events with better debouncing for different browsers
      const resizeDelay = capabilities.isMobile ? 250 : 150;
      const handleResize = gsap.utils.debounce(() => {
        ScrollTrigger.refresh();
        setupSmoothScroll();
      }, resizeDelay);

      window.addEventListener('resize', handleResize);

      // Return cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (cleanupScroll) cleanupScroll();
      };
    }, 16); // Single frame delay

    return () => {
      clearTimeout(timeoutId);
      
      // Stop performance monitoring
      if (performanceMonitorRef.current && process.env.NODE_ENV === 'development') {
        performanceMonitorRef.current.stopMonitoring();
      }
      
      // Cleanup ScrollTriggers
      scrollTriggerRefs.current.forEach(trigger => trigger.kill());
      scrollTriggerRefs.current = [];
      
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Reset body height
      if (document.body.style.height) {
        document.body.style.height = '';
      }
    };
  }, [setupScrollAnimation, setupSmoothScroll]);

  return (
    <div className="screen" id="fold-effect" ref={foldEffectRef}>
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
                  Capital.Capital.<span className="-focus">Capital.</span>Capital.Capital.Capital.Capital.Capital.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Labor.Labor.<span className="-focus">Labor.</span>Labor.Labor.Labor.Labor.Labor.
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
                  Labor.Labor.<span className="-focus">Labor.</span>Labor.Labor.Labor.Labor.Labor.
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
                  Labor.Labor.<span className="-focus">Labor.</span>Labor.Labor.Labor.Labor.Labor.
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