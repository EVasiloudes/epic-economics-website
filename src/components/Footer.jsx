import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="liquid-glass-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <img src="/favicon-32x32.png" alt="Epic Economics logo" className="footer-logo-img" />
              <h2 className="footer-title">Epic Economics</h2>
            </div>
            <p className="footer-tagline">
              What would you protest about today?
            </p>
          </div>

          <nav className="footer-section footer-navigation" aria-label="Footer navigation">
            <h3>Navigation</h3>
            <ul className="footer-nav-list">
              <li><Link to="/" aria-label="Go to home page">Home</Link></li>
              <li><Link to="/press" aria-label="Go to press and media page">Press & Media</Link></li>
              <li><Link to="/technical" aria-label="View technical details page">View Technical Details</Link></li>
              <li><Link to="/contact" aria-label="Go to contact page">Contact</Link></li>
            </ul>
          </nav>

          <div className="footer-section footer-team">
            <h3>Creative Team</h3>
            <ul className="footer-team-list">
              <li>
                <a href="https://dimis.org" target="_blank" rel="noopener noreferrer" aria-label="Visit Dimis Michaelides website - Writer and Performer">
                  Dimis Michaelides
                </a>
                <span className="team-role">Writer & Performer</span>
              </li>
              <li>
                <a href="https://liaharaki.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Lia Haraki website - Director">
                  Lia Haraki
                </a>
                <span className="team-role">Director</span>
              </li>
              <li>
                <a href="https://elias.densetheory.cc" target="_blank" rel="noopener noreferrer" aria-label="Visit Elias Vasnic website - Producer and Composer">
                  Elias Vasnic
                </a>
                <span className="team-role">Producer & Composer</span>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-social">
            <h3>Follow the Production</h3>
            <div className="social-links" role="list">
              <a
                href="https://www.youtube.com/@EpicEconomics"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link youtube"
                aria-label="Watch Epic Economics trailer on YouTube (opens in new tab)"
              >
                <img src="/favicon-32x32.png" alt="" className="social-link-icon" aria-hidden="true" />
                <span>YouTube</span>
              </a>
            </div>
            <p className="footer-description">
              A theatrical exploration of economic theory and human experience.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              <span aria-label={`Copyright ${currentYear} Epic Economics. All rights reserved.`}>© {currentYear} Epic Economics. All rights reserved.</span>
            </p>
            <p className="credits">
              Photography by <a href="https://www.instagram.com/blessthismess_photography/" target="_blank" rel="noopener noreferrer" aria-label="Visit Boyana Loizou's Instagram (opens in new tab)">Boyana Loizou</a>
            </p>
          </div>
        </div>

        {/* Liquid effect background elements */}
        <div className="footer-liquid-bg" aria-hidden="true">
          <div className="footer-liquid-blob blob-1"></div>
          <div className="footer-liquid-blob blob-2"></div>
          <div className="footer-liquid-blob blob-3"></div>
          <div className="footer-liquid-blob blob-4"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
