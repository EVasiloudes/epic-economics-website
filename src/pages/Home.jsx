import { useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LazyVideo from '../components/LazyVideo';
import IntroSequence from '../components/IntroSequence';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  generateOrganizationSchema,
  generateTeamPersonSchemas,
  generateEventSchemas,
  generateVideoSchema,
  generateBreadcrumbSchema,
} from '../utils/structuredData';
import {
  ATHENS,
  PHOTO_CREDIT,
  TICKETS_URL,
  SHOW_SUMMARY,
  SHOW_SOCIAL_DESCRIPTION,
  SHOW_TITLE,
} from '../constants/show';
import './Home.css';

// Lazy load heavy components
const GsapHero = lazy(() => import('../components/GsapHero'));

// Import images with explicit dimensions for CLS prevention
import audienceImg from '../assets/images/press/_BOO9866.jpg';
import performanceImg1 from '../assets/images/press/_BOO0058.jpg';
import performanceImg2 from '../assets/images/press/_BOO9941.jpg';
import performanceImg3 from '../assets/images/press/_BOO9809.jpg';
import athensStill from '../assets/images/press/epic-economics-press-24.jpg';

function Home() {
  const imageContainerRef = useRef(null);
  const reveal = useScrollReveal();

  // Apply home-with-gsap class for GSAP hero scroll animation. It also gates the
  // footer's entrance in Footer.css, so it has to be set for as long as Home is
  // mounted — the footer must never be gated by a class that Home already took
  // down.
  useEffect(() => {
    document.body.classList.add('home-with-gsap');
    return () => {
      document.body.classList.remove('home-with-gsap');
    };
  }, []);

  // Marks the surrounding `.media` frame as decoded. Doubles as a ref callback
  // because a cached image can finish loading before React attaches onLoad,
  // which would otherwise leave the frame stuck behind its shimmer.
  const markMediaLoaded = useCallback((node) => {
    const image = node instanceof HTMLImageElement ? node : node?.currentTarget;
    if (image?.complete) {
      image.closest('.media')?.classList.add('is-loaded');
    }
  }, []);

  // Warm the cache for the frames further down the page while the browser is
  // idle, so their lazy <img> lands instantly instead of showing a shimmer.
  useEffect(() => {
    const preloadImages = () => {
      [audienceImg, performanceImg1, performanceImg2, performanceImg3].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadImages, { timeout: 2000 });
    } else {
      setTimeout(preloadImages, 100);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{SHOW_TITLE} — Athens, 4 December 2026</title>
        <meta name="description" content={SHOW_SUMMARY} />
        <link rel="canonical" href="https://epic-economics.dimis.org/" />
        <meta property="og:title" content={SHOW_TITLE} />
        <meta property="og:description" content={SHOW_SOCIAL_DESCRIPTION} />
        <meta property="og:image" content="https://epic-economics.dimis.org/og-image.png" />
        <meta property="og:image:alt" content="Epic Economics promotional image" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://epic-economics.dimis.org/" />
        <meta property="og:site_name" content="Epic Economics" />
        <meta property="og:locale" content="en_GB" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={SHOW_TITLE} />
        <meta property="twitter:description" content={SHOW_SOCIAL_DESCRIPTION} />
        <meta property="twitter:image" content="https://epic-economics.dimis.org/og-image.png" />
        <meta property="twitter:image:alt" content="Epic Economics promotional image" />
        <script type="application/ld+json">
          {JSON.stringify(generateOrganizationSchema())}
        </script>
        {generateEventSchemas().map((event, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(event)}
          </script>
        ))}
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', url: 'https://epic-economics.dimis.org/' },
          ]))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateVideoSchema({
            name: 'Epic Economics Trailer',
            description: 'Official trailer for Epic Economics: What would you protest about today? A play by Dimis Michaelides.',
            embedUrl: 'https://epic-economics.dimis.org/videos/epic-economics-teaser.mp4',
            thumbnailUrl: 'https://epic-economics.dimis.org/videos/epic-economics-teaser-poster.jpg',
            uploadDate: '2025-07-01',
          }))}
        </script>
        {generateTeamPersonSchemas().map((person, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(person)}
          </script>
        ))}
      </Helmet>

      <div className="home">
        {/* GSAP Hero — animates immediately in the background */}
        <Suspense fallback={<div className="hero-placeholder" />}>
          <GsapHero />
        </Suspense>

        {/* Intro Sequence — card overlay on top of the hero. Not lazy: its
            scroll trigger contributes four viewports of page height, and
            landing that in a later chunk shoved the rest of the page down
            while the reader was already looking at it. */}
        <IntroSequence />

        <div className="home-content" ref={imageContainerRef}>
          {/* Athens — the next night. Date, venue and price are real text, not
              baked into the image, so they are readable, translatable and
              crawlable. */}
          <section className="ticket-cta" aria-labelledby="athens-heading">
            <div className="ticket-cta-content">
              <h2 id="athens-heading" className="athens-date">
                {ATHENS.dateLabel} · {ATHENS.timeLabel}
              </h2>
              <p className="athens-venue">
                <a
                  href={ATHENS.venueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ATHENS.venueName}
                </a>
                <br />
                {ATHENS.venueAddressLine}
              </p>
              <p className="athens-format">{ATHENS.format}</p>

              {TICKETS_URL ? (
                <a
                  href={TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ticket-cta-btn"
                  aria-label={`Get tickets for Epic Economics in Athens on ${ATHENS.dateLabel} (opens in new tab)`}
                >
                  GET TICKETS NOW
                </a>
              ) : (
                <p className="athens-tickets-pending">
                  Tickets via {ATHENS.ticketProvider} go on sale shortly. The
                  box office is the fastest way in —{' '}
                  <a
                    href={ATHENS.venueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    mcf.gr
                  </a>{' '}
                  or{' '}
                  <Link to="/contact">write to us</Link>.
                </p>
              )}

              <p className="ticket-cta-sub">
                {ATHENS.price} · {ATHENS.concessionPrice} for {ATHENS.concessionNote}
              </p>
            </div>

            <figure className="athens-still reveal" ref={reveal}>
              <div className="athens-still__frame media">
                <img
                  src={athensStill}
                  alt="Dimis Michaelides inviting the audience to write protest slogans during Epic Economics"
                  width="1600"
                  height="1065"
                  loading="lazy"
                  decoding="async"
                  ref={markMediaLoaded}
                  onLoad={markMediaLoaded}
                />
              </div>
              <figcaption>{PHOTO_CREDIT}</figcaption>
            </figure>
          </section>

          {/* Synopsis Section */}
          <section className="synopsis" aria-labelledby="synopsis-heading">
            <h1 id="synopsis-heading" className="visually-hidden">About Epic Economics</h1>

            <div className="synopsis-grid">
                          <div className="synopsis-text">
                              <p className="tagline">
                                <strong>What would you protest about today?</strong>
                              </p>

                <p className="lead">
                    An LSE/World Bank veteran exposes the system.
                </p>
                <p>
                    Epic Economics is a theatrical work based on the words of distinguished economists
                  from the 18th century to today, highlighting their contributions and contradictions.
                  The theories are interwoven with stories from his personal and
                  professional journey, and peppered with wicked humor and some songs. The show is
                  accompanied by an original soundscape.
                </p>

                <blockquote>
                  <p>How does your breakfast make its way to your table? Why might you own an imported car?
                  Who creates value? Why do we have recessions? What's more important, growth or equality?</p>
                </blockquote>



                {/* <p className="closing">
                  Economics is sometimes revered as a nebulous subject best left to "experts"
                  and sometimes simplified to populist pseudo-science. This play promises to
                  explore the nebulae and expose the pretenders.
                </p>*/}
              </div>

              <aside className="synopsis-images">
                <figure className="image-wrapper media reveal" ref={reveal}>
                  <img
                    src={audienceImg}
                    alt="Audience participation during Epic Economics performance"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    ref={markMediaLoaded}
                    onLoad={markMediaLoaded}
                  />
                </figure>
                <figure className="image-wrapper media reveal" ref={reveal}>
                  <img
                    src={performanceImg1}
                    alt="Epic Economics theatrical performance"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    ref={markMediaLoaded}
                    onLoad={markMediaLoaded}
                  />
                </figure>
              </aside>
            </div>

            {/* Tiled pair below synopsis text — full width of synopsis container */}
            <div className="synopsis-images-below" aria-hidden="false">
              <figure
                className="image-wrapper image-wrapper--tile-left media reveal"
                ref={reveal}
              >
                <img
                  src={performanceImg2}
                  alt="Dimis Michaelides performing Epic Economics"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  ref={markMediaLoaded}
                  onLoad={markMediaLoaded}
                />
              </figure>
              <figure
                className="image-wrapper image-wrapper--tile-right media reveal"
                ref={reveal}
              >
                <img
                  src={performanceImg3}
                  alt="Epic Economics on stage"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  ref={markMediaLoaded}
                  onLoad={markMediaLoaded}
                />
              </figure>
            </div>
          </section>

          {/* Trailer Card */}
          <section className="teaser-card" aria-labelledby="trailer-heading">
            <h2 id="trailer-heading">Watch the Teaser</h2>
            <div className="video-cards">
              <div className="video-card reveal" ref={reveal}>
                <div className="video-thumbnail">
                  <LazyVideo
                    src="/videos/epic-economics-teaser.mp4"
                    poster="/videos/epic-economics-teaser-poster.jpg"
                    title="Epic Economics Trailer"
                    controls={true}
                    muted={false}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <nav className="home-navigation" aria-label="Page navigation">
            <ul>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Home;
