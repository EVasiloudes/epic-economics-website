import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageContainerRef = useRef(null);

  // Apply home-with-gsap class for GSAP hero scroll animation
  useEffect(() => {
    document.body.classList.add('home-with-gsap');
    return () => {
      document.body.classList.remove('home-with-gsap');
    };
  }, []);

  // Preload critical images
  useEffect(() => {
    let isMounted = true;

    const preloadImages = () => {
      const images = [audienceImg];
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
            embedUrl: 'https://www.youtube.com/embed/HaY26deh7nE',
            thumbnailUrl: 'https://img.youtube.com/vi/HaY26deh7nE/maxresdefault.jpg',
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
A World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for.</p>
              <p>
                              Epic Economics is a theatrical work based on the words of distinguished economists
                  from the 18th century to today, highlighting their contributions and contradictions.
                  The theories are interwoven with stories from the performer's own personal and
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
                <figure className={`image-wrapper ${imagesLoaded ? 'loaded' : ''}`}>
                  <img
                    src={audienceImg}
                    alt="Audience participation during Epic Economics performance"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                {/* <figure className={`image-wrapper ${imagesLoaded ? 'loaded' : ''}`}>
                  <img
                    src={performanceImg}
                    alt="Epic Economics theatrical performance"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>*/}
              </aside>
            </div>
          </section>

          {/* Trailer Section */}
          {/* <section className="teaser" aria-labelledby="trailer-heading">
            <h2 id="trailer-heading">Watch the Trailer</h2>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/HaY26deh7nE?si=pv4RXJ4hGmY7GD99"
                title="Epic Economics Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>*/}

          {/* Navigation */}
          <nav className="home-navigation" aria-label="Page navigation">
            <ul>
              <li><Link to="/press">Press & Media</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Home;
