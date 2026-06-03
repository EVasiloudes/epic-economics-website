import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateBreadcrumbSchema } from '../utils/structuredData';
import './Preview.css';

function Preview() {
  return (
    <>
      <Helmet>
        <title>Preview - Epic Economics</title>
        <meta name="description" content="Get a preview of Epic Economics - experience excerpts from our theatrical production exploring economic themes and social change." />
        <link rel="canonical" href="https://epic-economics.dimis.org/preview" />
        <meta property="og:title" content="Preview - Epic Economics" />
        <meta property="og:description" content="Get a preview of Epic Economics theatrical production." />
        <meta property="og:image" content="https://epic-economics.dimis.org/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://epic-economics.dimis.org/preview" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Preview - Epic Economics" />
        <meta property="twitter:description" content="Get a preview of Epic Economics theatrical production." />
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
        <h1>Epic Economics - Full Preview</h1>
        {/* <p className="preview-description">Protected Link for the Complete Video</p>*/}
      </header>

      <section className="video-container">
        <iframe width="970" height="546" src="https://www.youtube.com/embed/DUPmu2zeHCI" title="Epic Economics" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
      </section>

      <section className="preview-info">
        {/* <h2>About This Preview</h2>
        <p>
          The full Epic Economics production video is available exclusively through this protected link.
          This preview contains the complete theatrical experience, including all scenes, performances,
          and behind-the-scenes content.
        </p>
        <p>
          For access to this content, please contact our team with your credentials and purpose for viewing.
        </p>*/}
      </section>

      <nav className="preview-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
    </>
  );
}

export default Preview;
