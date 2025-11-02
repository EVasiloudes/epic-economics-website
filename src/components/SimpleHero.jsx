import React from 'react';
import './SimpleHero.css';

function SimpleHero() {
  const marqueeTexts = [
    'Economics',
    'Markets', 
    'Value',
    'Capital',
    'Labour',
    'Power',
    'Crisis'
  ];

  return (
    <div className="simple-hero">
      <div className="hero-container">
        {marqueeTexts.map((text, index) => (
          <div key={index} className="marquee-row">
            <div className="marquee-content">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} className={i === 2 ? 'focus-text' : ''}>
                  {text}.
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="hero-overlay">
        <div className="hero-title">
          <h1>Epic Economics</h1>
          <p>A Theatrical Journey Through Economic Theory</p>
        </div>
      </div>
    </div>
  );
}

export default SimpleHero;