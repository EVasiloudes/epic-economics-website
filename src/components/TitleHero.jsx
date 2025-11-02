import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TitleHero.css';
import backdropImage from '../assets/images/press/_BOO0058.jpg';

gsap.registerPlugin(ScrollTrigger);

function TitleHero() {
  const titleEpicRef = useRef(null);
  const titleEconomicsRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);
  const backdropImageRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Intersection Observer for lazy initialization
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const titleEpic = titleEpicRef.current;
    const titleEconomics = titleEconomicsRef.current;
    const subtitle = subtitleRef.current;
    const container = containerRef.current;
    const backdropImage = backdropImageRef.current;

    if (!titleEpic || !titleEconomics || !subtitle || !container || !backdropImage) return;

    // Use requestIdleCallback for non-critical animations
    const initializeAnimation = () => {
      // Initial setup - hide elements and ensure font rendering
      gsap.set([titleEpic, titleEconomics, subtitle], {
        opacity: 0,
        y: 50,
        force3D: false,
        willChange: "transform, opacity"
      });

      // Create timeline for entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
          refreshPriority: -1
        }
      });

      // Animate in the title elements
      tl.to(titleEpic, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        force3D: false,
        onComplete: () => {
          gsap.set(titleEpic, { clearProps: "transform" });
        }
      })
      .to(titleEconomics, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        force3D: false,
        onComplete: () => {
          gsap.set(titleEconomics, { clearProps: "transform" });
        }
      }, "-=0.6")
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        force3D: false,
        onComplete: () => {
          gsap.set(subtitle, { clearProps: "transform" });
        }
      }, "-=0.4");

      // Add the wobble animation classes after entrance
      tl.call(() => {
        titleEpic.classList.add('animate');
        titleEconomics.classList.add('animate');
      }, null, "+=0.3");

      // Simplified parallax scroll animation for backdrop image
      const isMobile = window.innerWidth <= 768;
      
      if (!isMobile && imageLoaded) {
        gsap.to(backdropImage, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            refreshPriority: -1
          }
        });
      }

      // Cleanup function
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    // Use requestIdleCallback to defer animation setup
    if (window.requestIdleCallback) {
      window.requestIdleCallback(initializeAnimation, { timeout: 1000 });
    } else {
      setTimeout(initializeAnimation, 100);
    }

  }, [isInView, imageLoaded]);

  return (
    <div className="title-hero" ref={containerRef}>
      <div className="title-hero-backdrop">
        <img 
          src={backdropImage} 
          alt="" 
          className="title-hero-backdrop-image" 
          ref={backdropImageRef}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          style={{
            contentVisibility: 'auto',
            contain: 'layout style'
          }}
        />
      </div>
      <div className="title-hero-content">
        <h1 style={{ fontFamily: '"Avenir Next", "Century Gothic", "Helvetica Neue", Arial, sans-serif', fontStyle: 'italic', fontWeight: 700 }}>
          <span className="title-epic" ref={titleEpicRef}>Epic</span>
          <span className="title-economics" ref={titleEconomicsRef}>Economics</span>
        </h1>
        <p className="title-subtitle" ref={subtitleRef}>
          WHAT WOULD YOU PROTEST ABOUT TODAY?
        </p>
      </div>
    </div>
  );
}

export default TitleHero;