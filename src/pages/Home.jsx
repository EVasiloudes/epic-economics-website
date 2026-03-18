import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GsapHero from '../components/GsapHero';
import TitleHero from '../components/TitleHero';

gsap.registerPlugin(ScrollTrigger);
import './Home.css';

// Import selected images for homepage with lazy loading hints
import audienceImg from '../assets/images/press/_BOO9866.jpg';
import performanceImg from '../assets/images/press/_BOO9941.jpg';

function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const heroWrapperRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    // Add class to body to scope GSAP hero effects only to home page
    document.body.classList.add('home-with-gsap');

    // Preload critical images after initial paint
    const preloadImages = () => {
      const imagePromises = [audienceImg, performanceImg].map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        });
      });

      Promise.all(imagePromises).then(() => {
        if (isMounted) {
          setImagesLoaded(true);
        }
      });
    };

    // Use requestIdleCallback to defer image preloading
    if (window.requestIdleCallback) {
      window.requestIdleCallback(preloadImages, { timeout: 2000 });
    } else {
      setTimeout(preloadImages, 100);
    }

    const heroWrapper = heroWrapperRef.current;
    let scrollTrigger;
    
    if (heroWrapper) {
      scrollTrigger = gsap.to(heroWrapper, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: '.title-hero',
          start: "top 100%",
          end: "top 20%",
          scrub: true,
        }
      });
    }

    return () => {
      isMounted = false;
      if (scrollTrigger && scrollTrigger.scrollTrigger) {
        scrollTrigger.scrollTrigger.kill();
      }
      // Clean up: remove class and reset body height when leaving home page
      document.body.classList.remove('home-with-gsap');
      document.body.style.height = '';
    };
  }, []);

  return (
    <div className="home">
      <div ref={heroWrapperRef}>
        <GsapHero />
      </div>
      <div className="home-blur-wrapper" style={{
        position: 'relative',
        zIndex: 2
      }}>
        <TitleHero />
        <div className="home-content">
        <section className="synopsis">
          <div className="synopsis-paragraph first-paragraph">
            <p>
              Epic Economics is a theatrical work based on the words of distinguished economists from the 18th century to today, highlighting their contributions and contradictions. The theories are interwoven with stories from the performer's own personal and professional journey, and peppered with wicked humor and some songs. The show is accompanied by an original soundscape.
            </p>
          </div>

          <div className="home-image-item first-image">
            <img
              src={audienceImg}
              alt="Epic Economics - Audience participation during performance"
              loading="lazy"
              decoding="async"
              style={{
                opacity: imagesLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                contentVisibility: 'auto',
                contain: 'layout style'
              }}
              width="800"
              height="600"
            />
          </div>

          <div className="synopsis-paragraph second-paragraph">
            <p>
              How does your breakfast make its way to your table? Why might you own an imported car? Who creates value? Why do we have recessions? What's more important, growth or equality?
            </p>
          </div>

          <div className="synopsis-paragraph third-paragraph">
            <p>
              Markets. Value. Capital. Labour. Competition. Co-operation. Wealth. Trade. Innovation. Growth. Inequality. Crises.<br></br><br></br>
              <strong>What would you protest about today?</strong>
            </p>
          </div>

          <div className="synopsis-paragraph fourth-paragraph">
            <p>
              Economics is sometimes revered as a nebulous subject best left to "experts" and sometimes simplified to populist pseudo-science. This play promises to explore the nebulae and expose the pretenders.
            </p>
          </div>

          <div className="home-image-item second-image">
            <img
              src={performanceImg}
              alt="Epic Economics - Performance highlighting theatrical elements"
              loading="lazy"
              decoding="async"
              style={{
                opacity: imagesLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                contentVisibility: 'auto',
                contain: 'layout style'
              }}
              width="800"
              height="600"
            />
          </div>
        </section>
        <section className="teaser">
          <h2>Watch the Trailer</h2>
          <div className="teaser-video">
              <iframe
                src="https://www.youtube.com/embed/HaY26deh7nE?si=pv4RXJ4hGmY7GD99"
                title="Epic Economics Teaser"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                style={{
                  contentVisibility: 'auto',
                  contain: 'layout style'
                }}
              ></iframe>
          </div>
          {/* <p className="teaser-description">
            Get a sneak peek of the production with our exclusive preview trailer.
            Experience the drama, intensity, and artistry that defines Epic Economics.
          </p>*/}
        </section>
        <section className="team-bios">
          <h2>Meet the Creative Team</h2>

          <div className="bio-container">
            <div className="bio-card">
              <h3><a href="https://dimis.org" target="_blank" rel="noopener noreferrer">Dimis Michaelides</a></h3>
              <h4>Writer & Performer</h4>
              <p>
                Keynote speaker and author on innovation, creativity and leadership. He has extensive international experience as a business executive and as a speaker in corporate and public events. He also offers workshops and change management consulting for private businesses, NGOs and public organizations.
              </p>
            </div>

            <div className="bio-card">
              <h3><a href="https://liaharaki.com" target="_blank" rel="noopener noreferrer">Lia Haraki</a></h3>
              <h4>Director & Lighting Designer</h4>
              <p>
                Interdisciplinary artist with over 20 years of experience in performance, devised theatre, voice, and movement. Her work explores transformation and creation through the body as a medium, with performances presented locally and internationally. She mentors creatives and artists in developing their unique creative practice.
              </p>
            </div>

            <div className="bio-card">
              <h3><a href="https://elias.densetheory.cc" target="_blank" rel="noopener noreferrer">Elias Vasnic</a></h3>
              <h4>Producer, Composer & Technical Supervisor</h4>
              <p>
                Creative technologist and composer building soundscapes and interactive systems for live performance. For Epic Economics, he blended original music with historical audio, industrial noise, and ai-generated voices to bring the economists to life.
              </p>
            </div>
          </div>
        </section>

        <nav className="home-navigation">
          <ul>
            <li><Link to="/press">Press & Media</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
      </div>
    </div>
  );
}

export default Home;
