import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IntroSequence.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * IntroSequence — Full-screen fixed cards that fade in/out on scroll
 * as the GSAP hero animates in the background.
 *
 * Sequence: Tagline → Body A → Quote
 *
 * Card 1 is visible on load. Each subsequent card fades in as the previous
 * fades out. The final card (Quote) holds, then fades out gradually over a
 * long scroll window while the container fades to transparent, allowing the
 * hero to gradually emerge.
 */
function IntroSequence() {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!trigger || !container || cards.length === 0) return;

    // Timeline proportions (relative — scrub spreads them across the scroll range):
    //   Card 1 (Tagline):  hold 3 → fade out 2
    //   Card 2 (Body A):   fade in 2.25 → hold 3 → fade out 2
    //   Card 3 (Quote):    fade in 2.25 → hold 3.5 → long fade out 20
    //   Container fades to transparent in parallel with the last card's fade-out.

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
    tl.set(cards[0], { opacity: 1, scale: 1 })
      .to(cards[0], { opacity: 1, duration: 3 })
      .to(cards[0], { opacity: 0, scale: 0.98, duration: 2, ease: 'power1.in' });

    // Middle cards — fade in, hold, fade out
    for (let i = 1; i < cards.length - 1; i++) {
      tl.fromTo(
        cards[i],
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 2.25, ease: 'power1.out' },
        '-=1'
      )
        .to(cards[i], { opacity: 1, duration: 3 })
        .to(cards[i], { opacity: 0, scale: 0.97, duration: 2, ease: 'power1.in' });
    }

    // Last card — fade in, hold, long fade out + container fade
    const lastIndex = cards.length - 1;
    tl.fromTo(
      cards[lastIndex],
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 2.25, ease: 'power1.out' },
      '-=1'
    )
      .to(cards[lastIndex], { opacity: 1, duration: 3.5 })
      .to(cards[lastIndex], { opacity: 0, scale: 0.97, duration: 20, ease: 'power1.in' }, 'fadeContainer')
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
        <div ref={(el) => { cardRefs.current[0] = el; }} className="intro-card intro-card--tagline">
          <div className="intro-card__content">
            <p className="intro-card__text">
              The system's on stage,<br />
              are you in the audience?
            </p>
          </div>
        </div>

        {/* Card 2 — Body A */}
        <div ref={(el) => { cardRefs.current[1] = el; }} className="intro-card intro-card--body">
          <div className="intro-card__content">
            <p className="intro-card__body-text">
              Discover how the economy shapes everything — who gets rich, who struggles, and what we fight about. This irreverent play puts the economists who shaped our world on trial — with humour, mischief and a damn good time along the way.
            </p>
          </div>
        </div>

        {/* Card 3 — Quote */}
        <div ref={(el) => { cardRefs.current[2] = el; }} className="intro-card intro-card--quote">
          <div className="intro-card__content">
            <blockquote className="intro-card__quote">
              <p>Brilliant wit, music and performance. Yes, economics can be funny!</p>
            </blockquote>
            <cite className="intro-card__cite">
              — Michael Sarris, former World Bank Director <br /> & Finance Minister of Cyprus
            </cite>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntroSequence;
