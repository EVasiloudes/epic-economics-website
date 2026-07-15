import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
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
            <h3 className="footer-section-title">Navigation</h3>
            <ul className="footer-list">
              <li><Link to="/" aria-label="Go to home page">Home</Link></li>
              <li><Link to="/reviews" aria-label="Go to reviews page">Reviews</Link></li>
              <li><Link to="/technical" aria-label="View technical details page">View Technical Details</Link></li>
              <li><Link to="/preview" aria-label="View performance preview">Preview</Link></li>
              <li><Link to="/contact" aria-label="Go to contact page">Contact</Link></li>
            </ul>
          </nav>

          <div className="footer-section footer-press">
            <h3 className="footer-section-title">Press Materials</h3>
            <ul className="footer-list">
              <li>
                <a
                  href="https://drive.google.com/open?id=1sTMXXfinMDnUf8ghm3p2h1LgEba5BvOw&usp=drive_fs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Press Release (opens in new tab)"
                >
                  Press Release
                  <span className="footer-external-icon" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/open?id=1ChOuWVAHrt0_ZFK_r9-ZdL4Ko3WHN3rM&usp=drive_fs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Press Kit (opens in new tab)"
                >
                  Press Kit
                  <span className="footer-external-icon" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-team">
            <h3 className="footer-section-title">Creative Team</h3>
            <ul className="footer-list">
              <li className="footer-team-item">
                <a href="https://dimis.org" target="_blank" rel="noopener noreferrer" aria-label="Visit Dimis Michaelides website - Writer and Performer">
                  Dimis Michaelides
                </a>
                <span className="footer-team-role">Writer & Performer</span>
              </li>
              <li className="footer-team-item">
                <a href="https://liaharaki.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Lia Haraki website - Director">
                  Lia Haraki
                </a>
                <span className="footer-team-role">Director</span>
              </li>
              <li className="footer-team-item">
                <a href="https://elias.densetheory.cc" target="_blank" rel="noopener noreferrer" aria-label="Visit Elias Vasnic website - Producer and Composer">
                  Elias Vasnic
                </a>
                <span className="footer-team-role">Producer & Composer</span>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-social">
            <h3 className="footer-section-title">Follow the Production</h3>
            <div className="footer-social-links">
              <a
                href="https://www.facebook.com/profile.php?id=61586961475899"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Epic Economics on Facebook (opens in new tab)"
              >
                <i className="fa-brands fa-facebook-f footer-social-icon" style={{ color: '#1877F2' }} aria-hidden="true"></i>
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/epic.economics/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Epic Economics on Instagram (opens in new tab)"
              >
                <i className="fa-brands fa-instagram footer-social-icon" style={{ color: '#E4405F' }} aria-hidden="true"></i>
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@epic.economics"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Epic Economics on TikTok (opens in new tab)"
              >
                <i className="fa-brands fa-tiktok footer-social-icon" style={{ color: '#000000' }} aria-hidden="true"></i>
                <span>TikTok</span>
              </a>
              <a
                href="https://www.youtube.com/@EpicEconomics"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Epic Economics on YouTube (opens in new tab)"
              >
                <i className="fa-brands fa-youtube footer-social-icon" style={{ color: '#FF0000' }} aria-hidden="true"></i>
                <span>YouTube</span>
              </a>
            </div>
            {/* <p className="footer-description">
              website by <a href="https://densetheory.cc">studio dense theory</a>
            </p>*/}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              <span aria-label={`Copyright ${currentYear} Epic Economics. All rights reserved.`}>© {currentYear} Epic Economics. All rights reserved.</span>
            </p>
            <p className="footer-credits">
                          Photography by <a href="https://www.instagram.com/blessthismess_photography/" target="_blank" rel="noopener noreferrer" aria-label="Visit Boyana Loizou's Instagram (opens in new tab)">Boyana Loizou</a><br></br>
                          Website by <a href="https://densetheory.cc">studio dense theory</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
