import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="liquid-glass-footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <img src="/favicon-32x32.png" alt="Epic Economics" className="footer-logo-img" />
              <h3 className="footer-title">Epic Economics</h3>
            </div>
            <p className="footer-tagline">
              What would you protest about today?
            </p>
          </div>

          <div className="footer-section footer-navigation">
            <h4>Navigation</h4>
            <ul className="footer-nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/press">Press & Media</Link></li>
              <li><Link to="/technical">Technical Info</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section footer-team">
            <h4>Creative Team</h4>
            <ul className="footer-team-list">
              <li>
                <a href="https://dimis.org" target="_blank" rel="noopener noreferrer">
                  Dimis Michaelides
                </a>
                <span className="team-role">Writer & Performer</span>
              </li>
              <li>
                <a href="https://liaharaki.com" target="_blank" rel="noopener noreferrer">
                  Lia Haraki
                </a>
                <span className="team-role">Director</span>
              </li>
              <li>
                <a href="https://elias.densetheory.cc" target="_blank" rel="noopener noreferrer">
                  Elias Vasnic
                </a>
                <span className="team-role">Producer & Composer</span>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-social">
            <h4>Follow the Production</h4>
            <div className="social-links">
              <a 
                href="https://www.youtube.com/watch?v=HaY26deh7nE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link youtube"
                aria-label="Watch Epic Economics trailer on YouTube"
              >
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
              © {currentYear} Epic Economics. All rights reserved.
            </p>
            <p className="credits">
              Photography by <a href="https://www.instagram.com/blessthismess_photography/" target="_blank" rel="noopener noreferrer">Boyana Loizou</a>
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