import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LazyVideo from '../components/LazyVideo';
import {
  generateOrganizationSchema,
  generateTeamPersonSchemas,
  generateEventSchema,
  generateVideoSchema,
  generateBreadcrumbSchema,
} from '../utils/structuredData';
import './Home.css';

// Lazy load heavy components
const IntroSequence = lazy(() => import('../components/IntroSequence'));
const GsapHero = lazy(() => import('../components/GsapHero'));

// Import images with explicit dimensions for CLS prevention
import audienceImg from '../assets/images/press/_BOO9866.jpg';
import performanceImg1 from '../assets/images/press/_BOO0058.jpg';
import performanceImg2 from '../assets/images/press/_BOO9941.jpg';
import performanceImg3 from '../assets/images/press/_BOO9809.jpg';

function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageContainerRef = useRef(null);
  const revealRefs = useRef([]);

  // Apply home-with-gsap class for GSAP hero scroll animation
  useEffect(() => {
    document.body.classList.add('home-with-gsap');
    return () => {
      document.body.classList.remove('home-with-gsap');
    };
  }, []);

  // Scroll-driven reveal for synopsis images using IntersectionObserver.
  // Replaces the previous load-based `.loaded` fade, which fired once on
  // preload and never reacted to scrolling.
  useEffect(() => {
    const targets = revealRefs.current.filter(Boolean);
    if (targets.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: just reveal everything immediately.
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [imagesLoaded]);

  // Preload critical images
useEffect(() => {
  let isMounted = true;

  const preloadImages = () => {
    const images = [audienceImg, performanceImg1, performanceImg2, performanceImg3];
    const promises = images.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    });

    Promise.all(promises).then(() => {
      if (isMounted) setImagesLoaded(true);
    });
  };

    // Use requestIdleCallback for non-critical image loading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadImages, { timeout: 2000 });
    } else {
      setTimeout(preloadImages, 100);
    }

    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <Helmet>
        <title>Epic Economics: What would you protest about today?</title>
        <meta name="description" content="Confused by the economy? Come witness an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for." />
        <link rel="canonical" href="https://epic-economics.dimis.org/" />
        <meta property="og:title" content="Epic Economics: What would you protest about today?" />
        <meta property="og:description" content="The system's on stage. Are you in the audience? Edinburgh Fringe 2026  •  Tickets at edfringe.com" />
        <meta property="og:image" content="https://epic-economics.dimis.org/og-image.png" />
        <meta property="og:image:alt" content="Epic Economics promotional image" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://epic-economics.dimis.org/" />
        <meta property="og:site_name" content="Epic Economics" />
        <meta property="og:locale" content="en_US" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Epic Economics: What would you protest about today?" />
        <meta property="twitter:description" content="Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for." />
        <meta property="twitter:image" content="https://epic-economics.dimis.org/og-image.png" />
        <meta property="twitter:image:alt" content="Epic Economics promotional image" />
        <script type="application/ld+json">
          {JSON.stringify(generateOrganizationSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateEventSchema())}
        </script>
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

        {/* Intro Sequence — card overlay on top of the hero */}
        <Suspense fallback={null}>
          <IntroSequence />
        </Suspense>

        <div className="home-content" ref={imageContainerRef}>
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
                <figure
                  className="image-wrapper"
                  ref={(el) => { revealRefs.current[0] = el; }}
                >
                  <img
                    src={audienceImg}
                    alt="Audience participation during Epic Economics performance"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <figure
                  className="image-wrapper"
                  ref={(el) => { revealRefs.current[1] = el; }}
                >
                  <img
                    src={performanceImg1}
                    alt="Epic Economics theatrical performance"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </aside>
            </div>

            {/* Tiled pair below synopsis text — full width of synopsis container */}
            <div className="synopsis-images-below" aria-hidden="false">
              <figure
                className="image-wrapper image-wrapper--tile-left"
                ref={(el) => { revealRefs.current[2] = el; }}
              >
                <img
                  src={performanceImg2}
                  alt="Dimis Michaelides performing Epic Economics"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure
                className="image-wrapper image-wrapper--tile-right"
                ref={(el) => { revealRefs.current[3] = el; }}
              >
                <img
                  src={performanceImg3}
                  alt="Epic Economics on stage"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </section>

          {/* Trailer Card */}
          <section className="teaser-card" aria-labelledby="trailer-heading">
            <h2 id="trailer-heading">Watch the Teaser</h2>
            <div className="video-cards">
              <div className="video-card">
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

          {/* Ticket CTA */}
          <section className="ticket-cta" aria-label="Get tickets">
            <div className="ticket-cta-content">
              <a
                href="https://www.edfringe.com/tickets/whats-on/epic-economics-what-would-you-protest-about-today"
                target="_blank"
                rel="noopener noreferrer"
                className="ticket-cta-btn"
                aria-label="Get tickets for Epic Economics at Edinburgh Fringe (opens in new tab)"
              >
                GET TICKETS NOW
              </a>
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
