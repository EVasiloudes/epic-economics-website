import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Home.css';

// Lazy load heavy components
const GsapHero = lazy(() => import('../components/GsapHero'));

// Import images with explicit dimensions for CLS prevention
import audienceImg from '../assets/images/press/_BOO9866.jpg';
import performanceImg from '../assets/images/press/_BOO9941.jpg';

// Bio data - extracted for maintainability
const TEAM_BIOS = [
  {
    name: 'Dimis Michaelides',
    role: 'Writer & Performer',
    url: 'https://dimis.org',
    description: 'Keynote speaker and author on innovation, creativity and leadership. He has extensive international experience as a business executive and as a speaker in corporate and public events. He also offers workshops and change management consulting for private businesses, NGOs and public organizations.'
  },
  {
    name: 'Lia Haraki',
    role: 'Director & Lighting Designer',
    url: 'https://liaharaki.com',
    description: 'Interdisciplinary artist with over 20 years of experience in performance, devised theatre, voice, and movement. Her work explores transformation and creation through the body as a medium, with performances presented locally and internationally. She mentors creatives and artists in developing their unique creative practice.'
  },
  {
    name: 'Elias Vasnic',
    role: 'Producer, Composer & Technical Supervisor',
    url: 'https://elias.densetheory.cc',
    description: 'Creative technologist and composer building soundscapes and interactive systems for live performance. For Epic Economics, he blended original music with historical audio, industrial noise, and ai-generated voices to bring the economists to life.'
  }
];

function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
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
      const images = [audienceImg, performanceImg];
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
        <meta name="description" content="Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for." />
        <link rel="canonical" href="https://epic-economics.dimis.org/" />
      </Helmet>

      <div className="home">
        {/* Hero Section - Lazy loaded */}
        <Suspense fallback={<div className="hero-placeholder" />}>
          <GsapHero onLoad={() => setHeroLoaded(true)} />
        </Suspense>

        <div className="home-content" ref={imageContainerRef}>
          {/* Synopsis Section */}
          <section className="synopsis" aria-labelledby="synopsis-heading">
            <h1 id="synopsis-heading" className="visually-hidden">About Epic Economics</h1>

            <div className="synopsis-grid">
              <div className="synopsis-text">
                <p className="lead">
                    Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for.</p>
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

                <p className="keywords">
                  Markets. Value. Capital. Labour. Competition. Co-operation. Wealth. Trade.
                  Innovation. Growth. Inequality. Crises.
                </p>

                <p className="tagline">
                  <strong>What would you protest about today?</strong>
                </p>

                <p className="closing">
                  Economics is sometimes revered as a nebulous subject best left to "experts"
                  and sometimes simplified to populist pseudo-science. This play promises to
                  explore the nebulae and expose the pretenders.
                </p>
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
                <figure className={`image-wrapper ${imagesLoaded ? 'loaded' : ''}`}>
                  <img
                    src={performanceImg}
                    alt="Epic Economics theatrical performance"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </aside>
            </div>
          </section>

          {/* Trailer Section */}
          <section className="teaser" aria-labelledby="trailer-heading">
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
          </section>

          {/* Team Section */}
          <section className="team-bios" aria-labelledby="team-heading">
            <h2 id="team-heading">Meet the Creative Team</h2>
            <div className="bio-grid">
              {TEAM_BIOS.map((bio) => (
                <article key={bio.name} className="bio-card">
                  <h3>
                    <a href={bio.url} target="_blank" rel="noopener noreferrer">
                      {bio.name}
                    </a>
                  </h3>
                  <p className="bio-role">{bio.role}</p>
                  <p>{bio.description}</p>
                </article>
              ))}
            </div>
          </section>

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
