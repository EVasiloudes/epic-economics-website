import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TitleHero.css';
import backdropImage from '../assets/images/press/_BOO0058.jpg';

gsap.registerPlugin(ScrollTrigger);

function TitleHero() {
  const titleEpicRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);
  const backdropImageRef = useRef(null);

  useEffect(() => {
    const titleEpic = titleEpicRef.current;
    const subtitle = subtitleRef.current;
    const container = containerRef.current;
    const backdropImage = backdropImageRef.current;

    if (!titleEpic || !subtitle || !container || !backdropImage) return;

    // Initial setup - hide elements and ensure font rendering
    gsap.set([titleEpic, subtitle], {
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
        once: true
      }
    });

    // Animate in the title elements
    tl.to(titleEpic, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      force3D: false,
      onComplete: () => {
        gsap.set(titleEpic, { clearProps: "transform" });
      }
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power3.out",
      force3D: false,
      onComplete: () => {
        gsap.set(subtitle, { clearProps: "transform" });
      }
    }, "-=0.6");

    // Add the wobble animation classes after entrance
    tl.call(() => {
      titleEpic.classList.add('animate');
    }, null, "+=0.5");

    // Parallax scroll animation for backdrop image
    const isMobile = window.innerWidth <= 768;
    const scale = isMobile ? 1.2 : 1;

    gsap.to(backdropImage, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const yMovement = progress * -100;
          backdropImage.style.transform = `scale(${scale}) translateY(${yMovement}px)`;
        }
      }
    });

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="title-hero" ref={containerRef}>
      <div className="title-hero-backdrop">
        <img src={backdropImage} alt="" className="title-hero-backdrop-image" ref={backdropImageRef} />
      </div>
      <div className="title-hero-content">
        <h1 ref={titleEpicRef}>Epic Economics: What would you protest about today?</h1>
        <br />
        <h2 className="title-subtitle" ref={subtitleRef}>
          What would you protest about today?
        </h2>
      </div>
    </div>
  );
}

export default TitleHero;
