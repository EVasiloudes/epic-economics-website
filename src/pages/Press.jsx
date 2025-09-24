import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Press.css';

// Import all the existing images
import img1 from '../assets/images/press/_BOO0036.jpg';
import img2 from '../assets/images/press/_BOO0058.jpg';
import img3 from '../assets/images/press/_BOO0073.jpg';
import img4 from '../assets/images/press/_BOO0089.jpg';
import img5 from '../assets/images/press/_BOO0091.jpg';
import img6 from '../assets/images/press/_BOO9804.jpg';
import img7 from '../assets/images/press/_BOO9809.jpg';
import img8 from '../assets/images/press/_BOO9842.jpg';
import img9 from '../assets/images/press/_BOO9852.jpg';
import img10 from '../assets/images/press/_BOO9866.jpg';
import img11 from '../assets/images/press/_BOO9900.jpg';
import img12 from '../assets/images/press/_BOO9929.jpg';
import img13 from '../assets/images/press/_BOO9941.jpg';
import img14 from '../assets/images/press/_BOO9945.jpg';
import img15 from '../assets/images/press/_BOO9951.jpg';
import img16 from '../assets/images/press/_BOO9955.jpg';
import img17 from '../assets/images/press/_BOO9962.jpg';
import img18 from '../assets/images/press/_BOO9981.jpg';

function Press() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const images = [
    { src: img1, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO0036.jpg' },
    { src: img2, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO0058.jpg' },
    { src: img3, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO0073.jpg' },
    { src: img4, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO0089.jpg' },
    { src: img5, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO0091.jpg' },
    { src: img6, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9804.jpg' },
    { src: img7, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9809.jpg' },
    { src: img8, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9842.jpg' },
    { src: img9, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9852.jpg' },
    { src: img10, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9866.jpg' },
    { src: img11, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9900.jpg' },
    { src: img12, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9929.jpg' },
    { src: img13, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9941.jpg' },
    { src: img14, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9945.jpg' },
    { src: img15, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9951.jpg' },
    { src: img16, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9955.jpg' },
    { src: img17, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9962.jpg' },
    { src: img18, alt: 'Epic Economics - Behind the scenes photography by Boyana', filename: '_BOO9981.jpg' }
  ];

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next'
      ? (currentImageIndex + 1) % images.length
      : (currentImageIndex - 1 + images.length) % images.length;

    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    }
  };

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, currentImageIndex]);

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
    <div className="press">
      <header className="press-header">
        <h1>Epic Economics - Press Kit</h1>
        <p className="press-description">High-resolution images and press materials</p>
      </header>

      <section className="press-reviews">
        <h2>Reviews & Commentary</h2>
        <div className="reviews-grid">
          <div className="review-item">
            <blockquote>
              "Epic Economics brilliantly transforms complex economic theory into accessible and engaging theatre. Michaelides weaves personal narrative with economic history in a way that is both educational and deeply entertaining."
            </blockquote>
            <cite>— Audience Member, Opening Night</cite>
          </div>

          <div className="review-item">
            <blockquote>
              "A masterful blend of economics and performance art. The show's ability to make you laugh while questioning fundamental economic assumptions is truly remarkable."
            </blockquote>
            <cite>— Takis Taoushanis, Economist - Banker</cite>
          </div>

          <div className="review-item">
            <blockquote>
              "Finally, someone has made economics not just understandable, but genuinely compelling. This production asks the right questions at exactly the right time."
            </blockquote>
            <cite>— Academic Colleague</cite>
          </div>
        </div>
        <p className="reviews-note">
          <em>Reviews and quotes will be updated as press coverage becomes available. For press inquiries, please contact us directly.</em>
        </p>
      </section>

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

      <section className="video-section">
        <h2>Video Content</h2>
        <div className="video-cards">
          <div className="video-card">
            <div className="video-thumbnail">
              <iframe
                src="https://www.youtube.com/embed/h49nwJzQtXk"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <h3>Stills from our July 2025</h3>
              <p>This captivating performance brings economics to life.</p>
            </div>
          </div>

          <div className="video-card coming-soon">
            <div className="video-placeholder">
              <div className="placeholder-icon">🎬</div>
              <p>Coming Soon</p>
            </div>
            <div className="video-info">
              <h3>What our Audience Wrote</h3>
              <p>More video content will be available soon. Stay tuned for behind-the-scenes footage and interviews.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="press-kit">
        <h2>Photography by Boyana Loizou</h2>

        <div className="image-gallery">
          {images.map((image, index) => (
            <div
              key={index}
              className="image-item"
              onClick={() => openModal(image, index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
              <div className="image-overlay">
                <span className="view-full">View Full Size</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="press-info">
        {/* <h2>About the Photography</h2>
        <p>
          These exclusive behind-the-scenes photographs were taken by renowned photographer Boyana,
          capturing the essence of the Epic Economics production. Her work beautifully documents
          the creative process, from rehearsals to final performances.
        </p>
        <p>
          All images are available for press use with proper attribution to "Photography by Boyana".
          For commercial use, additional photography requests, or high-resolution downloads,
          please contact our team.
        </p>*/}
        <div className="photo-credit">
          <strong>Photo Credit:</strong> All images © Boyana Loizou
          <br />
          <strong>Follow her work:</strong> <a href="https://www.instagram.com/blessthismess_photography/" target="_blank" rel="noopener noreferrer">@blessthismess_photography</a>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>

            <button
              className="nav-button prev-button"
              onClick={() => navigateImage('prev')}
              aria-label="Previous image"
            >
              &#8249;
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="modal-image"
            />

            <button
              className="nav-button next-button"
              onClick={() => navigateImage('next')}
              aria-label="Next image"
            >
              &#8250;
            </button>

            <div className="image-info">
              <span className="image-counter">
                {currentImageIndex + 1} / {images.length}
              </span>
              <span className="image-filename">
                {selectedImage.filename}
              </span>
            </div>
          </div>
        </div>
      )}

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
              href="https://youtu.be/DUPmu2zeHCI"
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

      <nav className="press-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
  );
}

export default Press;
