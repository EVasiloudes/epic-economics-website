import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LazyVideo from '../components/LazyVideo';
import './Press.css';

// Import press images
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
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Define images array with imported assets
  const images = [
    { src: img1, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO0036.jpg' },
    { src: img2, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO0058.jpg' },
    { src: img3, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO0073.jpg' },
    { src: img4, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO0089.jpg' },
    { src: img5, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO0091.jpg' },
    { src: img6, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9804.jpg' },
    { src: img7, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9809.jpg' },
    { src: img8, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9842.jpg' },
    { src: img9, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9852.jpg' },
    { src: img10, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9866.jpg' },
    { src: img11, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9900.jpg' },
    { src: img12, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9929.jpg' },
    { src: img13, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9941.jpg' },
    { src: img14, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9945.jpg' },
    { src: img15, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9951.jpg' },
    { src: img16, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9955.jpg' },
    { src: img17, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9962.jpg' },
    { src: img18, alt: 'Epic Economics - Photography by Boyana', filename: '_BOO9981.jpg' }
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



  // Handle body overflow when modals are open
  React.useEffect(() => {
    if (selectedImage || showReviewModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, showReviewModal]);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        // Image modal navigation
        if (e.key === 'Escape') {
          setSelectedImage(null);
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex(prev => (prev + 1) % images.length);
        } else if (e.key === 'ArrowLeft') {
          setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
        }
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showReviewModal) {
          setSelectedReview(null);
          setShowReviewModal(false);
        } else if (selectedImage) {
          setSelectedImage(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage, currentImageIndex, showReviewModal, images.length]);

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

  const reviews = [
    {
      text: "A powerful play with a soulful performance that engaged all the senses — shifting from the cold, calculated logic of a humanoid to the raw emotions and fragility of a human being.",
      author: "Argyro Christodoulides, Composer"
    },
    {
      text: "A masterful blend of economics and performance art. The show's ability to make you laugh while questioning fundamental economic assumptions is truly remarkable.",
      author: "Takis Taoushanis, Economist - Banker"
    },
    {
      text: "An enlightening play presenting controversial economic theories, delivered in a theatrical and very entertaining style and an elegant touch of audience involvement. A must-watch.",
      author: "Dinos Hadjivassiliou, Former IBM executive"
    },
    {
      text: "An original exploration of economic history, tracing its evolution from Adam Smith and Karl Marx in the 19th century, through Keynes and Friedman's influential ideas in the mid-20th century, to today's most pressing economic theories and debates. The show vividly captures the longstanding intellectual struggle that continues to shape contemporary discussions — the clash between advocates of free markets and supporters of government intervention and regulation. Highly recommended for both economists and general audiences alike.",
      author: "Andreas Charalambous, Economist, Former Director for Economic Research and EU Affairs - Ministry of Finance of Cyprus"
    },
    {
      text: "Through humor, stories, and music, \"Epic Economics\" makes big ideas feel alive and enjoyable, keeping the audience engaged while making them think.",
      author: "Mohammed G. Awwad, Drama Educator & Clown Teacher"
    },
    {
      text: "Economics is a deeply controversial subject, blending a multiplicity of skills and perspectives. It's a field rife with conflicting narratives of cause and effect, where morality and positivity, the concrete and the abstract, and the technical and the intuitive constantly clash. Society itself consists of overlapping spheres—the economic, cultural, security, and the political—with all major decisions ultimately being shaped at the political level, where conflicts are compromised. In 'Epic Economics' Dimis captures this essence, and expertly guides us through a century of intellectual evolution. The performance masterfully illustrates how economic thought was born from the realities and conflicts of its time, and how its subsequent failures repeatedly spurred new cycles of ideas. Dimis's ability to weave together this complex narrative with a masterful blend of insight and entertainment makes for a truly compelling and memorable experience.",
      author: "Ioannis Tirkides, Economics Research Manager at Bank of Cyprus and President, the Cyprus Economic Society"
    },
    {
      text: "A very original performance that views basic principles of economics through personal experiences with plenty of humor and music. Michaelides' spicy humour, his artful narrative, his inexhaustible creativity and the musical embellishment with his guitar make the performance unique and really enjoyable. A truly worthwhile experience.",
      author: "George Lambrianou, Former Administrative Director, University of Cyprus"
    },
    {
      text: "Hugely entertaining with its wit, music, and performance. It magically opens up the audience to take a fresh look at the profoundly disturbing issues of our times, inequality, loss of freedom and power. A top quality show that deserves to travel to many many audiences.",
      author: "Aleen Andreou, Corporate Trainer and Coach, PeopleAchieve"
    },
    {
      text: "Epic Economics, an insightful piece written and created by Dimis Michaelides, in collaboration with Lia Haraki and Elias Vasnic, aptly and deftly combines slight of hand and other chicanery with a lesson in economics. Peppered with nuanced insight into the connections between cold hard numbers and our, warmer, slightly less ordered, humanity, the show takes the audience on a journey from our dismal, somewhat ignorant past towards a more enlightened, hopeful, future. In order to really understand how a show about economics can do this, you will just have to get tickets the next time it's in town. Congratulations to the creators for giving us a show that encourages us to question and dares us to rebel.",
      author: "Thadd Correia, Director, Writer, Educator"
    },
    {
      text: "Epic Economics is not just a performance about money or markets. It is a voyage through the heart of society. The play brings the voices of Smith, Marx, Keynes and many more to the present in a quirkily intelligent style. It reminds us that economics is not just about figures or growth, it is about each one of us, about our daily ambitions, fears and dreams.\n\nWhen Dimis says \"It's wonderful to have your breakfast oats anytime of the day\", it's more than a playful observation. It is the idea of freedom and choice for small human joys beyond big schedules and systems.\n\nThe play owes as much to the collaboration with Lia Haraki with her insightful direction and dramaturgy and with the vivid and imaginative sound design of Elias Vasiloudes. Together with Dimis' vision they shaped the result which is cohesive and visually vibrant. They encourage us to look at the forces that shape our world and the values that guide them. In a humorous and profoundly human way they invite us to imagine how the world might become more alive and generous.\n\n\"Art is not a mirror held up to reality but a hammer with which to shape it\" -Bertolt Brecht-",
      author: "Lisa Tsangaridou, Dance Teacher/Choreographer"
    },
    {
      text: "An engaging and, at times, provocative performance that offers a spirited critique of economics, bringing an abstract subject into life making it relatable, and relevant to everyday life.",
      author: "Evgenios Evgeniou - Chairman of Nicosia for Art Home to Nicosia Municipal Theatre and International Festival"
    },
    {
      text: "It was a great pleasure to watch this unique, inspiring and engaging show on economics presented with a definite twist! The script is humorously woven into a story-telling of major economists, life experience by the author. The collaboration between Dimis Michaelides, Lia Haraki and Elias Vasnic could not have been a better match. Spot on directing and staging by Lia, brilliant sound and lighting by Elias, and Dimis being the one man showman we always love to see over and over. I laughed a lot too! Would watch this show over and over again.",
      author: "Monica Gavrielides - Director of W.E.T. - Women's Empowerment Theater Group"
    },
    {
      text: "Only Dimis can turn Economics into a masterful comedy and make you see Economics in a completely different light. An epic performance on every level!",
      author: "Natasha Tavoukjian – Playwright, Actor"
    }
  ];

  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const truncateToWords = (text, maxWords) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setShowReviewModal(true);
  };

  const closeReviewModal = () => {
    setSelectedReview(null);
    setShowReviewModal(false);
  };

  return (
    <div className="press">
      <header className="press-header">
        <h1>Epic Economics - Press Kit</h1>
        <p className="press-description">High-resolution images and press materials</p>
      </header>

      <section className="press-reviews">
        <h2>Reviews & Commentary</h2>
        <div className="reviews-list">
          {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review, index) => {
            const wordCount = countWords(review.text);
            const isLongReview = wordCount > 200;
            const displayText = isLongReview ? truncateToWords(review.text, 200) : review.text;

            return (
              <div key={index} className="review-item">
                <div className="review-text">
                  "{displayText}"
                  {isLongReview && (
                    <button
                      className="read-more-link"
                      onClick={() => openReviewModal(review)}
                    >
                      Read More
                    </button>
                  )}
                </div>
                <cite className="review-author">— {review.author}</cite>
              </div>
            );
          })}
        </div>

        {!showAllReviews && reviews.length > 3 && (
          <button
            className="show-all-btn"
            onClick={() => setShowAllReviews(true)}
          >
            Show All Reviews ({reviews.length})
          </button>
        )}

        {showAllReviews && (
          <button
            className="show-all-btn"
            onClick={() => setShowAllReviews(false)}
          >
            Show Less
          </button>
        )}

        <p className="reviews-note">
          <em>Reviews and quotes will be updated as press coverage becomes available. For press inquiries, please contact us directly.</em>
        </p>
      </section>

      <section className="video-section">
        <h2>Stills from our July '25 Show</h2>
        <div className="video-cards">
          <div className="video-card">
            <div className="video-thumbnail">
              <LazyVideo
                src="https://pz3w5exosjyrfo44.public.blob.vercel-storage.com/epic-economics-teaser-optimized.mp4"
                poster="/videos/epic-economics-teaser-poster.jpg"
                title="Epic Economics Teaser"
                controls={true}
                muted={false}
              />
            </div>
            <div className="video-info">

              {/* <p>at Artos Foundations in Nicosia, Cyprus.</p>*/}
            </div>
          </div>
        </div>
      </section>

        <section className="audience-participation-section">
          <h2>Audience Participation</h2>
          <p>At the end of the show members of the public are given the opportunity to write their own slogans on carboard. <br></br> Here's some of what they wrote in response to the show's question: "what would you protest about today?"</p>
          <div className="video-cards">
            <div className="video-card">
              <div className="video-thumbnail">
                <LazyVideo
                  src="https://pz3w5exosjyrfo44.public.blob.vercel-storage.com/ee-slogans-photomix-1-optimized.mp4"
                  poster="/videos/ee-slogans-photomix-1-poster.jpg"
                  title="EE Slogans Photomix 1"
                  controls={true}
                  muted={false}
                />
              </div>
              <div className="video-info">

              </div>
            </div>

            <div className="video-card">
              <div className="video-thumbnail">
                <LazyVideo
                  src="https://pz3w5exosjyrfo44.public.blob.vercel-storage.com/ee-slogans-photomix-2-optimized.mp4"
                  poster="/videos/ee-slogans-photomix-2-poster.jpg"
                  title="EE Slogans Photomix 2"
                  controls={true}
                  muted={false}
                />
              </div>
              <div className="video-info">

              </div>
            </div>
          </div>
        </section>

      <section className="magic-link-section">
        <h2>What People Said About Our Last Show</h2>
        <p className="magic-description">
          Before Epic Economics, Dimis brought audiences another thought-provoking performance exploring the intersection of magic, perception, and reality.
        </p>

        <div className="magic-reviews">
          <div className="magic-review-item">
            <div className="magic-review-stars">⭐⭐⭐⭐</div>
            <p className="magic-review-text">
              "What makes this performance so special is that the incredible magic and the visual art are so interwoven that we learn as well as being entertained. It's such a clever concept that surprises and educates us."
            </p>
            <p className="magic-review-author">
              - British Theatre Guide
            </p>
            <a
              href="https://www.britishtheatreguide.info/reviews/it-s-magic-but-paradise-in-the-22278"
              target="_blank"
              rel="noopener noreferrer"
              className="magic-review-link"
            >
              Read Full Review →
            </a>
          </div>

          <div className="magic-review-item">
            <p className="magic-review-text">
              "… what made his show most special was its ability to make you feel as though you were part of the performance – the exhibit – itself. An elaborate storyteller, Michaelides called upon audience members to be volunteers, each one gleeful that he or she had been selected … But Michaelides' show further diverged from typical magic shows in that it also offered acts that were not traditional magic."
            </p>
            <p className="magic-review-author">
              - Maia Chung, Cyprus Mail
            </p>
            <a
              href="https://cyprus-mail.com/2023/06/24/can-magic-be-art-yes-sometimes-it-can"
              target="_blank"
              rel="noopener noreferrer"
              className="magic-review-link"
            >
              Read Full Review →
            </a>
          </div>
        </div>

        <a
          href="https://magic.dimis.org"
          target="_blank"
          rel="noopener noreferrer"
          className="magic-link-btn"
        >
          Explore Our Previous Show
        </a>
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

      {/* Review Modal */}
      {showReviewModal && selectedReview && (
        <div className="review-modal" onClick={closeReviewModal}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeReviewModal}>×</button>
            <div className="review-modal-text">
              "{selectedReview.text}"
            </div>
            <div className="review-modal-author">
              — {selectedReview.author}
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
