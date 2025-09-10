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

  return (
    <div className="press">
      <header className="press-header">
        <h1>Epic Economics - Press Kit</h1>
        <p className="press-description">High-resolution images and press materials</p>
      </header>

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

      <nav className="press-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
  );
}

export default Press;
