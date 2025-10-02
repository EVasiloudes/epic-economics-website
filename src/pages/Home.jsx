import React from 'react';
import { Link } from 'react-router-dom';
import GsapHero from '../components/GsapHero';
import TitleHero from '../components/TitleHero';
import './Home.css';

// Import selected images for homepage
import audienceImg from '../assets/images/press/_BOO9866.jpg';
import performanceImg from '../assets/images/press/_BOO9941.jpg';

function Home() {
  return (
    <div className="home">
      <GsapHero />
      <TitleHero />

      <div className="home-content">
        <section className="synopsis">
          <p>
            Epic Economics is a theatrical work based on the words of distinguished economists from the 18th century to today, highlighting their contributions and contradictions. The theories are interwoven with stories from the performer's own personal and professional journey, and peppered with wicked humor and some songs. The show is accompanied by an original soundscape.
          </p>
          <p>
            How does your breakfast make its way to your table? Why might you own an imported car? Who creates value? Why do we have recessions? What's more important, growth or equality?
          </p>
          <p>
            Markets. Value. Capital. Labour. Competition. Co-operation. Wealth. Trade. Innovation. Growth. Inequality. Crises.<br></br><br></br>
            <strong>What would you protest about today?</strong>
          </p>
          <p>
            Economics is sometimes revered as a nebulous subject best left to "experts" and sometimes simplified to populist pseudo-science. This play promises to explore the nebulae and expose the pretenders.
          </p>
        </section>

        <section className="home-images">
          <div className="image-gallery-home">
            <div className="home-image-item">
              <img
                src={audienceImg}
                alt="Epic Economics - Audience participation during performance"
                loading="lazy"
              />
              <p className="image-caption">Engaging audiences in economic discourse</p>
            </div>
            <div className="home-image-item">
              <img
                src={performanceImg}
                alt="Epic Economics - Performance highlighting theatrical elements"
                loading="lazy"
              />
              <p className="image-caption">Where economics meets theatrical performance</p>
            </div>
          </div>
          <div className="photo-credit-home">
            Photography by <a href="https://www.instagram.com/blessthismess_photography/" target="_blank" rel="noopener noreferrer">Boyana Loizou</a>
          </div>
        </section>

        <section className="teaser">
          <h2>Watch the Trailer</h2>
          <div className="teaser-video">
              <iframe width="800" height="400" src="https://www.youtube.com/embed/HaY26deh7nE?si=pv4RXJ4hGmY7GD99" title="Epic Economics Teaser" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
            <li><Link to="/technical">Technical Information</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;
