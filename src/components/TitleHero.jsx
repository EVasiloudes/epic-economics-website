import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TitleHero.css';

gsap.registerPlugin(ScrollTrigger);

function TitleHero() {
  const titleEpicRef = useRef(null);
  const titleEconomicsRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const titleEpic = titleEpicRef.current;
    const titleEconomics = titleEconomicsRef.current;
    const subtitle = subtitleRef.current;
    const container = containerRef.current;

    if (!titleEpic || !titleEconomics || !subtitle || !container) return;

    // Initial setup - hide elements
    gsap.set([titleEpic, titleEconomics, subtitle], {
      opacity: 0,
      y: 50
    });

    // Create timeline for entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true
      }
    });

    // Animate in the title elements
    tl.to(titleEpic, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(titleEconomics, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.8")
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power3.out"
    }, "-=0.6");

    // Add the wobble animation classes after entrance
    tl.call(() => {
      titleEpic.classList.add('animate');
      titleEconomics.classList.add('animate');
    }, null, "+=0.5");

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="title-hero" ref={containerRef}>
      <div className="title-hero-content">
        <h1>
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