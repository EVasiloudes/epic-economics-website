import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateBreadcrumbSchema } from '../utils/structuredData';
import './Preview.css';

function Preview() {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePasswordDialogOpen = () => {
    setShowPasswordDialog(true);
    setPassword('');
    setPasswordError('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const correctPassword = 'epiceconomics-performance2025';

    if (password === correctPassword) {
      setShowPasswordDialog(false);
      setShowSuccessModal(true);
      setPassword('');
      setPasswordError('');
      // Open YouTube video in new tab
      window.open('https://youtu.be/lsncXEr3iUE', '_blank', 'noopener,noreferrer');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handlePasswordDialogClose = () => {
    setShowPasswordDialog(false);
    setPassword('');
    setPasswordError('');
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Helmet>
        <title>Full Show</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="Access the full live performance of Epic Economics. Password-protected preview for press and media professionals." />
        <link rel="canonical" href="https://epic-economics.dimis.org/preview" />
        <meta property="og:title" content="Preview - Epic Economics" />
        <meta property="og:description" content="Full live performance preview of Epic Economics theatrical production." />
        <meta property="og:image" content="https://epic-economics.dimis.org/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://epic-economics.dimis.org/preview" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Preview - Epic Economics" />
        <meta property="twitter:description" content="Full live performance preview of Epic Economics theatrical production." />
        <meta property="twitter:image" content="https://epic-economics.dimis.org/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', url: 'https://epic-economics.dimis.org/' },
            { name: 'Preview', url: 'https://epic-economics.dimis.org/preview' },
          ]))}
        </script>
      </Helmet>
    <div className="page-container">
      <header className="preview-header">
        <h1>Preview</h1>
        {/* <p className="preview-description">Protected Link for the Complete Video</p>*/}
      </header>

      <section className="live-performance-section">
        <h2>Full Live Performance</h2>
        <p className="performance-description">
          Access the complete recording of Epic Economics live performance, Premiere July 2025 (Password required).
        </p>
        <button
          className="watch-performance-btn"
          onClick={handlePasswordDialogOpen}
        >
          🎭 Watch Full Live Performance
        </button>
      </section>

      {/* Password Dialog Modal */}
      {showPasswordDialog && (
        <div className="password-modal" onClick={handlePasswordDialogClose}>
          <div className="password-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handlePasswordDialogClose}>×</button>
            <h3>Enter Password</h3>
            <p>Please enter the password to access the full live performance:</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className={`password-input ${passwordError ? 'error' : ''}`}
                autoFocus
              />
              {passwordError && (
                <div className="password-error">
                  {passwordError}
                </div>
              )}
              <div className="password-modal-buttons">
                <button type="button" className="cancel-btn" onClick={handlePasswordDialogClose}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Access Performance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal" onClick={handleSuccessModalClose}>
          <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleSuccessModalClose}>×</button>
            <div className="success-icon">✅</div>
            <h3>Access Granted!</h3>
            <p>The full live performance should now be opening in a new tab.</p>
            <p>If it didn't open automatically, you can access it directly:</p>
            <a
              href="https://youtu.be/lsncXEr3iUE"
              target="_blank"
              rel="noopener noreferrer"
              className="direct-link"
            >
              Watch on YouTube
            </a>
            <button className="success-close-btn" onClick={handleSuccessModalClose}>
              Close
            </button>
          </div>
        </div>
      )}

      <nav className="preview-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
    </>
  );
}

export default Preview;
