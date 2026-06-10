import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IntroSequence.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * IntroSequence — Two full-screen fixed cards that fade in/out on scroll
 * as the GSAP hero animates in the background.
 *
 * Card 1 is visible on load. Card 2 fades in, then fades out gradually
 * across 400vh of scroll. The container background fades to transparent
 * in parallel, allowing the hero to gradually emerge.
 */
function IntroSequence() {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    if (!trigger || !container || !card1 || !card2) return;

    // Card timeline proportions (stretched across 600vh of scroll):
    //   Card 1 visible + hold:             0–60vh  (3 units)
    //   Card 1 fade-out:                   60–100vh (2 units)
    //   Card 2 fade-in:                    85–130vh (2.25 units, overlaps)
    //   Card 2 hold:                       130–200vh (3.5 units)
    //   Card 2 gradual fade-out:           200–600vh (20 units) = 400vh
    //   Container fades to transparent:    200–600vh (20 units, parallel)
    //
    // Duration values are relative — scrub spreads them across the scroll range.

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onLeave: () => {
          if (container) {
            container.style.visibility = 'hidden';
            container.style.pointerEvents = 'none';
          }
        },
        onEnterBack: () => {
          if (container) {
            container.style.visibility = 'visible';
            container.style.pointerEvents = 'auto';
          }
        },
      },
    });

    // Card 1 — visible on load, holds, fades out
    tl.set(card1, { opacity: 1, scale: 1 })
      .to(card1, { opacity: 1, duration: 3 })
      .to(card1, { opacity: 0, scale: 0.98, duration: 2, ease: 'power1.in' });

    // Card 2 — fades in, holds, then fades out over 400vh
    // Container fades to transparent in parallel so the hero gradually emerges
    tl.fromTo(
      card2,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 2.25, ease: 'power1.out' },
      '-=1'
    )
      .to(card2, { opacity: 1, duration: 3.5 })
      .to(card2, { opacity: 0, scale: 0.97, duration: 20, ease: 'power1.in' }, 'fadeContainer')
      .to(container, { opacity: 0, duration: 20, ease: 'power1.in' }, 'fadeContainer');

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === trigger) st.kill();
      });
      tl.kill();
    };
  }, []);

  return (
    <>
      <div ref={triggerRef} className="intro-trigger" aria-hidden="true" />

      <div ref={containerRef} className="intro-sequence" aria-label="Introduction">
        {/* Card 1 — Tagline */}
        <div ref={card1Ref} className="intro-card intro-card--tagline">
          <div className="intro-card__content">
            <p className="intro-card__text">
              The system's on stage,<br />
              are you in the audience?
            </p>
          </div>
        </div>

        {/* Card 2 — Quote */}
        <div ref={card2Ref} className="intro-card intro-card--quote">
          <div className="intro-card__content">
            <blockquote className="intro-card__quote">
              <p>Brilliant wit, music and performance. Yes, economics can be funny!</p>
            </blockquote>
            <cite className="intro-card__cite">
              — Michael Sarris, former World Bank Director <br></br> & Finance Minister of Cyprus
            </cite>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntroSequence;
