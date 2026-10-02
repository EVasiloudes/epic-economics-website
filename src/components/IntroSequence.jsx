import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRESS_STAR_RATINGS } from '../constants/show';
import './IntroSequence.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * IntroSequence — Full-screen fixed cards that fade in/out on scroll
 * as the GSAP hero animates in the background.
 *
 * Sequence: Tagline → Body A → Quote + press star ratings
 *
 * Card 1 is visible on load. Each subsequent card fades in as the previous
 * fades out. The final card (Quote) holds, then fades out gradually over a
 * long scroll window while the container fades to transparent, allowing the
 * hero to gradually emerge.
 *
 * The press ratings ride in on the quote's hold: each badge slides in from its
 * own edge of the screen, and its four stars pop in one after another. They
 * live inside the quote card so they fade out with it.
 */
function IntroSequence() {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const ratingRefs = useRef([]);

  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean);
    const ratings = ratingRefs.current.filter(Boolean);

    if (!trigger || !container || cards.length === 0) return;

    // Timeline proportions (relative — scrub spreads them across the scroll range):
    //   Card 1 (Tagline):  hold 3 → fade out 2
    //   Card 2 (Body A):   fade in 2.25 → hold 3 → fade out 2
    //   Card 3 (Quote):    fade in 2.25 → hold 3.5 → ratings → long fade out 20
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
      .to(cards[lastIndex], { opacity: 1, duration: 3.5 }, 'quoteHold');

    // Press ratings — each badge enters from its own edge of the screen while
    // the quote holds, then its stars pop in left to right.
    ratings.forEach((badge, index) => {
      const fromLeft = badge.dataset.side !== 'right';
      const at = `quoteHold+=${0.3 + index * 0.5}`;

      tl.fromTo(
        badge,
        { opacity: 0, x: fromLeft ? -36 : 36, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 1.5, ease: 'power3.out' },
        at
      );

      tl.fromTo(
        badge.querySelectorAll('.intro-rating__star'),
        { opacity: 0, scale: 0.3, rotate: -35 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.55,
          ease: 'back.out(3)',
          stagger: 0.14,
        },
        `${at}+=0.15`
      );
    });

    tl.to(cards[lastIndex], { opacity: 0, scale: 0.97, duration: 20, ease: 'power1.in' }, 'fadeContainer')
      .to(container, { opacity: 0, duration: 20, ease: 'power1.in' }, 'fadeContainer');

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === trigger) st.kill();
      });
      tl.kill();
    };
  }, []);

  // Both rails render from the same array, so a badge's ref slot is its index
  // in PRESS_STAR_RATINGS — stable across re-renders, unlike a push. The badge
  // on the shorter rail is enlarged so the two sides carry equal visual weight.
  const renderRatings = (side) => {
    const onSide = PRESS_STAR_RATINGS.filter((rating) => rating.side === side);
    const isShortRail = onSide.length < PRESS_STAR_RATINGS.length - onSide.length;

    return onSide.map((rating) => (
      <li
        key={rating.outlet}
        className={`intro-rating${isShortRail ? ' intro-rating--feature' : ''}`}
        data-side={rating.side}
        ref={(el) => { ratingRefs.current[PRESS_STAR_RATINGS.indexOf(rating)] = el; }}
      >
        <a
          className="intro-rating__link"
          href={rating.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${rating.outlet} rated Epic Economics ${rating.stars} out of 5 (opens in new tab)`}
        >
          <span className="intro-rating__stars" aria-hidden="true">
            {Array.from({ length: rating.stars }, (_, starIndex) => (
              <span key={starIndex} className="intro-rating__star">★</span>
            ))}
          </span>
          <span className="intro-rating__outlet">{rating.outlet}</span>
        </a>
      </li>
    ));
  };

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

        {/* Card 3 — Quote, flanked by the press star ratings */}
        <div ref={(el) => { cardRefs.current[2] = el; }} className="intro-card intro-card--quote">
          <div className="intro-card__content intro-card__content--quote">
            <ul className="intro-ratings intro-ratings--left">
              {renderRatings('left')}
            </ul>

            <div className="intro-quote">
              <blockquote className="intro-card__quote">
                <p>Brilliant wit, music and performance. Yes, economics can be funny!</p>
              </blockquote>
              <cite className="intro-card__cite">
                — Michael Sarris, former World Bank Director <br /> & Finance Minister of Cyprus
              </cite>
            </div>

            <ul className="intro-ratings intro-ratings--right">
              {renderRatings('right')}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntroSequence;
