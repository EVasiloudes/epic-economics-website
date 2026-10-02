import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LazyVideo from '../components/LazyVideo';
import {
  PHOTOGRAPHER,
  PHOTOGRAPHER_HANDLE,
  PHOTOGRAPHER_URL,
} from '../constants/show';
import { generateBreadcrumbSchema, generateReviewSchemas } from '../utils/structuredData';
import './Reviews.css';

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
import fringeReviewStamp from '../assets/images/press/fringe-review-very-good-show.png';

function Reviews() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Refs for fade-in animations
  const headerRef = useRef(null);
  const reviewsRef = useRef(null);
  const videoRef = useRef(null);
  const audienceRef = useRef(null);
  const magicRef = useRef(null);
  const galleryRef = useRef(null);
  const infoRef = useRef(null);

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

  // Staggered fade-in animations on mount (matches Contact page pattern)
  useEffect(() => {
    const fadeIn = (el, delay, direction = 'up') => {
      if (!el) return;
      const y = direction === 'up' ? -20 : direction === 'left' ? -20 : 20;
      el.style.opacity = '0';
      el.style.transform = `translateY(${y}px)`;
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    };

    fadeIn(headerRef.current, 100, 'up');
    fadeIn(reviewsRef.current, 200, 'up');
    fadeIn(videoRef.current, 300, 'up');
    fadeIn(audienceRef.current, 350, 'up');
    fadeIn(magicRef.current, 400, 'up');
    fadeIn(galleryRef.current, 500, 'up');
    fadeIn(infoRef.current, 600, 'up');
  }, []);

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

    // Array order is manual, not date-sorted. The Fringe press run leads because
    // it is the most recent independent word on the show.
    //
    // `press: true` separates the major outlets — the ones whose reviews carry
    // an editorial judgement and a link out — from audience reactions, which are
    // quotes without a byline. Fringe Review is a small blog rather than a
    // review outlet, so it stays with the reactions despite having a stamp.
    const reviews = [
    {
      text: "This is a powerful, humorous and charismatic production. Do go!",
      author: "",
      source: "British Theatre Guide",
      url: "https://www.britishtheatreguide.info/reviews/epic-economics-paradise-green-25867",
      press: true,
      stars: 4
    },
    {
      text: "Making economics and political engagement not only interesting, but also funny, is no mean feat. Michaelides manages it with charm.",
      author: "",
      source: "Edinburgh Guide",
      url: "https://edinburghguide.com/festival/2026/epic-economics-what-would-you-protest-about-today-paradise-in-the-vault-review-22054",
      press: true,
      stars: 4
    },
    {
      text: "A highly entertaining and important whistlestop tour through centuries of economic thought.",
      author: "",
      source: "Everything Theatre",
      url: "https://everything-theatre.co.uk/2026/08/review-epic-economics-what-would-you-protest-about-today-paradise-in-the-vault/",
      press: true,
      stars: 4
    },
    {
      text: "Michaelides certainly proves economics doesn’t have to be dull.",
      author: "",
      source: "The Scotsman",
      url: "https://www.scotsman.com/arts-and-culture/edinburgh-festivals/theatre-and-stage/fringe-theatre-reviews-adam-riches-the-captain-a-dark-line-upstairs-epic-economics-what-would-you-protest-about-today-around-the-world-in-80-toys-krystyna-hutchinson-congrats-on-not-8930695",
      press: true,
      stars: 3
    },
    {
      text: "Perhaps economists do have some use, after all.",
      author: "",
      source: "Fringe Review",
      url: "https://fringereview.co.uk/review/edinburgh-fringe/2026/epic-economics-what-would-you-protest-about-today/",
      stamp: fringeReviewStamp
    },
    {
      text: "Brilliant wit, music and performance. Yes, economics can be funny!",
      author: "Michael Sarris, Former World Bank Director & Finance Minister of Cyprus"
    },
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
      text: "Hugely entertaining, humorous, well written and presented. It magically opens up the audience to take a fresh look at the profoundly disturbing issues of our times, inequality, loss of freedom ... and power. A top quality show that deserves to travel to many many audiences.",
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

  // The two kinds of word on the show are not interchangeable: one is an
  // editor's verdict with a byline and a link out, the other is somebody in the
  // audience afterwards. They get separate furniture rather than one long list.
  const pressReviews = reviews.filter((review) => review.press);
  const reactions = reviews.filter((review) => !review.press);

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
    <>
      <Helmet>
        <title>Reviews - Epic Economics</title>
        <meta name="description" content="Fringe 2026 reviews of Epic Economics from British Theatre Guide, The Scotsman and Edinburgh Guide, plus audience reactions and high-resolution press photography." />
        <link rel="canonical" href="https://epic-economics.dimis.org/reviews" />
        <meta property="og:title" content="Reviews - Epic Economics" />
        <meta property="og:description" content="Fringe 2026 reviews of Epic Economics from British Theatre Guide, The Scotsman and Edinburgh Guide, plus audience reactions and high-resolution press photography." />
        <meta property="og:image" content="https://epic-economics.dimis.org/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://epic-economics.dimis.org/reviews" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Reviews - Epic Economics" />
        <meta property="twitter:description" content="Fringe 2026 reviews of Epic Economics from British Theatre Guide, The Scotsman and Edinburgh Guide, plus audience reactions and high-resolution press photography." />
        <meta property="twitter:image" content="https://epic-economics.dimis.org/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', url: 'https://epic-economics.dimis.org/' },
            { name: 'Reviews', url: 'https://epic-economics.dimis.org/reviews' },
          ]))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MediaObject',
            name: 'Epic Economics Reviews',
            description: 'Reviews and media coverage for Epic Economics. What would you protest about today? A play by Dimis Michaelides.',
            publisher: {
              '@type': 'Organization',
              name: 'Epic Economics',
            },
          })}
        </script>
        {generateReviewSchemas(reviews).map((review, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(review)}
          </script>
        ))}
      </Helmet>

    <div className="reviews">
      <header className="reviews-header" ref={headerRef}>
        <h1>Epic Economics - Reviews</h1>
      </header>

      <section className="reviews-section" ref={reviewsRef}>
        {/* The Fringe run, as the press saw it. Always visible — it is four
            cards, and burying it behind a button would bury the only verdicts
            on the show. */}
        <div className="reviews-group">
          <h2 className="reviews-group__title">Fringe 2026 press</h2>
          <p className="reviews-group__note">
            Independent reviews from the Edinburgh Fringe run.
          </p>

          <div className="press-grid">
            {pressReviews.map((review, index) => (
              <article
                key={review.source}
                className="press-card"
                style={{ '--i': index }}
              >
                <div className="press-card__head">
                  <span
                    className="press-card__stars"
                    role="img"
                    aria-label={`Rated ${review.stars} out of 5`}
                  >
                    <span aria-hidden="true">
                      {'★'.repeat(review.stars)}
                      <span className="press-card__stars-empty">
                        {'★'.repeat(5 - review.stars)}
                      </span>
                    </span>
                  </span>
                  <span className="press-card__outlet">{review.source}</span>
                </div>

                <blockquote className="press-card__quote">{review.text}</blockquote>

                <a
                  className="press-card__link"
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read the full review on ${review.source} (opens in new tab)`}
                >
                  Read the review
                  <span className="press-card__link-icon" aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* Audience reactions. Long, and unranked, so it opens a few at a time
            and cascades in rather than arriving all at once. */}
        <div className="reviews-group">
          <h2 className="reviews-group__title">What people said</h2>

          <div className="reviews-list">
            {(showAllReviews ? reactions : reactions.slice(0, 4)).map(
              (review, index) => {
                const wordCount = countWords(review.text);
                const isLongReview = wordCount > 200;
                const displayText = isLongReview
                  ? truncateToWords(review.text, 200)
                  : review.text;

                return (
                  <figure
                    key={review.author || review.source}
                    className="review-item"
                    style={{ '--i': index }}
                  >
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
                    <figcaption>
                      {review.stamp && (
                        <img
                          className="review-stamp"
                          src={review.stamp}
                          alt="Fringe Review badge: A Very Good Show"
                          width="701"
                          height="283"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      {review.author && (
                        <cite className="review-author">— {review.author}</cite>
                      )}
                      {review.source && (
                        <a
                          className="review-source"
                          href={review.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Read the full review on ${review.source} (opens in new tab)`}
                        >
                          {review.source}
                        </a>
                      )}
                    </figcaption>
                  </figure>
                );
              }
            )}
          </div>

          {reactions.length > 4 && (
            <button
              className="show-all-btn"
              onClick={() => setShowAllReviews((open) => !open)}
              aria-expanded={showAllReviews}
            >
              <span className="show-all-btn__label">
                {showAllReviews
                  ? 'Show fewer reactions'
                  : `Show all ${reactions.length} reactions`}
              </span>
              <span className="show-all-btn__chevron" aria-hidden="true" />
            </button>
          )}
        </div>

        </section>

      <section className="video-section" ref={videoRef}>
        {/* No visible heading — the poster introduces the video. Kept for
            assistive tech and the document outline. */}
        <h2 className="visually-hidden">Stills from our premiere in Cyprus</h2>
        <div className="video-cards">
          <div className="video-card">
            <div className="video-thumbnail">
              <LazyVideo
                src="/videos/epic-economics-stills.mp4"
                poster="/videos/epic-economics-stills-poster.jpg"
                title="Silent montage of stills from our premiere in Cyprus"
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

        <section className="audience-participation-section" ref={audienceRef}>
          <h2>Audience Participation</h2>
          <p>At the end of the show members of the public are given the opportunity to write their own slogans on carboard. <br></br> Here's some of what they wrote in response to the show's question: "what would you protest about today?"</p>
          <div className="video-cards">
            <div className="video-card">
              <div className="video-thumbnail">
                <LazyVideo
                  src="/videos/ee-slogans-photomix-1.mp4"
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
                  src="/videos/ee-slogans-photomix-2.mp4"
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

      <section className="magic-link-section" ref={magicRef}>
        <h2>What People Said About Our Last Show</h2>
        <p className="magic-description">
          Before Epic Economics, Dimis brought audiences another thought-provoking performance exploring the intersection of magic, perception, and reality.
        </p>

        <div className="magic-reviews">
          <div className="magic-review-item">
            <div className="magic-review-stars">★★★★</div>
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

      <section className="reviews-kit" ref={galleryRef}>
        <h2>Photography</h2>

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

      <div className="photo-credit-block" ref={infoRef}>
        <aside className="photo-credit" aria-label="Photography credit">
          <span className="photo-credit__rule" aria-hidden="true">
            <svg
              className="photo-credit__aperture"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.2a1.5 1.5 0 0 0 1.28-.72l.54-.86A1.5 1.5 0 0 1 9.8 3.7h4.4a1.5 1.5 0 0 1 1.28.72l.54.86A1.5 1.5 0 0 0 17.3 6h1.2A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" />
              <circle cx="12" cy="13" r="3.75" />
            </svg>
          </span>

          <p className="photo-credit__label">Photography</p>
          <p className="photo-credit__name">{PHOTOGRAPHER}</p>

          <a
            className="photo-credit__handle"
            href={PHOTOGRAPHER_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow ${PHOTOGRAPHER} on Instagram (opens in new tab)`}
          >
            {PHOTOGRAPHER_HANDLE}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <p className="photo-credit__legal">All images © {PHOTOGRAPHER}</p>
        </aside>
      </div>

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

      {/* Review Modal */}
      {showReviewModal && selectedReview && (
        <div className="review-modal" onClick={closeReviewModal}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeReviewModal}>×</button>
            <div className="review-modal-text">
              "{selectedReview.text}"
            </div>
            {selectedReview.author && (
              <div className="review-modal-author">
                — {selectedReview.author}
              </div>
            )}
            {selectedReview.source && (
              <div className="review-modal-author">
                <a
                  className="review-source"
                  href={selectedReview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read the full review on ${selectedReview.source} (opens in new tab)`}
                >
                  {selectedReview.source}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="reviews-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
    </>
  );
}

export default Reviews;
