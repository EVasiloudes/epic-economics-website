import React from 'react';
import { Link } from 'react-router-dom';
import GsapHero from '../components/GsapHero';
import TitleHero from '../components/TitleHero';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <GsapHero />
      <TitleHero />

      <div className="home-content">
        <section className="synopsis">
          {/* <h2>About the Show</h2>*/}
          <p>
              Epic Economics is a theatrical work based on the words of distinguished economists from the 18th century to today, highlighting their contributions and contradictions. The theories are interwoven with stories from the performer's own personal and professional journey, and peppered with wicked humor and some songs. The show is accompanied by an original soundscape.
            </p>
            <p>
              How does your breakfast make its way to your table? <br />
              Why do you have an imported car? <br />
              Who creates value? Why do we have recessions? <br />
              What's more important: growth of the economy or equality?
            </p>
            <p>
              Economics is sometimes revered as a nebulous subject best left to "experts" and sometimes simplified to populist pseudo-science. This play promises to explore the nebulae and expose the pretenders.
            </p>
          {/* <blockquote>
            <p>"The purpose of studying economics is not to acquire a set of ready-made answers to economic questions, but to learn how to avoid being deceived by economists." — Joan Robinson</p>
          </blockquote>
          <blockquote>
            <p>"The only function of economic forecasting is to make astrology look respectable." — JK Galbraith</p>
          </blockquote>*/}
        </section>

        <section className="teaser">
          <h2>Watch the Preview</h2>
          <div className="teaser-video">
            <Link to="/preview" className="teaser-link">
              <div className="play-button">
                ▶ Play Preview
              </div>
            </Link>
          </div>
          {/* <p className="teaser-description">
            Get a sneak peek of the production with our exclusive preview trailer.
            Experience the drama, intensity, and artistry that defines Epic Economics.
          </p>*/}
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
