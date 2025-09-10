import React from 'react';
import { Link } from 'react-router-dom';
import './Preview.css';

function Preview() {
  return (
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
  );
}

export default Preview;
