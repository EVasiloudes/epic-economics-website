import React from 'react';
import { Link } from 'react-router-dom';
import './Press.css';

function Press() {
  return (
    <div className="press">
      <header className="press-header">
        <h1>Epic Economics - Press Kit</h1>
        <p className="press-description">High-resolution images and press materials</p>
      </header>
      
      <section className="press-kit">
        <h2>Photography by Boyana</h2>
        <div className="image-gallery">
          <div className="image-placeholder">
            <div className="image-text">Boyana's Photography</div>
          </div>
          <div className="image-placeholder">
            <div className="image-text">Boyana's Photography</div>
          </div>
          <div className="image-placeholder">
            <div className="image-text">Boyana's Photography</div>
          </div>
          <div className="image-placeholder">
            <div className="image-text">Boyana's Photography</div>
          </div>
        </div>
        
        <div className="press-materials">
          <h3>Press Materials</h3>
          <ul className="press-downloads">
            <li><a href="#" download>High-resolution photos (ZIP)</a></li>
            <li><a href="#" download>Official cast & crew bios (PDF)</a></li>
            <li><a href="#" download>Production stills (ZIP)</a></li>
            <li><a href="#" download>Press release (PDF)</a></li>
          </ul>
        </div>
      </section>
      
      <section className="press-info">
        <h2>About the Photography</h2>
        <p>
          These exclusive behind-the-scenes photographs were taken by renowned photographer Boyana, 
          capturing the essence of the Epic Economics production. Her work beautifully documents 
          the creative process, from rehearsals to final performances.
        </p>
        <p>
          All images are available for press use with proper attribution. For commercial use or 
          additional photography requests, please contact our team.
        </p>
      </section>
      
      <nav className="press-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
  );
}

export default Press;