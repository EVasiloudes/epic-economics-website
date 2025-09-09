import React from 'react';
import { Link } from 'react-router-dom';
import './Technical.css';
import stagePlan from '../assets/images/stage_plan_full_skeuomorphic.png';

function Technical() {
  return (
    <div className="technical">
      <header className="technical-header">
        <h1>Epic Economics - Technical Information</h1>
        <p className="technical-description">Stage plan, equipment requirements, and technical specifications</p>
      </header>
      
      <section className="stage-plan">
        <h2>Stage Plan</h2>
        <div className="stage-plan-container">
          <img 
            src={stagePlan} 
            alt="Epic Economics Stage Plan - Detailed layout showing performer position, instruments, and technical equipment placement"
            className="stage-plan-image"
          />
        </div>
        <div className="stage-plan-info">
          <h3>Stage Setup Details</h3>
          <p>
            The stage plan shows the optimal layout for Epic Economics, including performer positioning, 
            instrument placement, and technical equipment setup. The central performer position allows 
            for maximum audience engagement while maintaining clear sightlines to all instruments and 
            technical elements.
          </p>
        </div>
      </section>
      
      <section className="technical-requirements">
        <h2>Technical Requirements</h2>
        
        <div className="tech-section">
          <h3>Sound & Audio</h3>
          <ul>
            <li><strong>QLab:</strong> Show control software for sound design and playback</li>
            <li><strong>Audio Interface:</strong> Multi-channel audio interface for live sound processing</li>
            <li><strong>Speakers:</strong> Full-range PA system with subwoofer support</li>
            <li><strong>Microphones:</strong> Wireless headset mic for performer</li>
            <li><strong>Instruments:</strong> Guitar with amplification, various percussion elements</li>
          </ul>
        </div>
        
        <div className="tech-section">
          <h3>Stage Elements</h3>
          <ul>
            <li><strong>Performance Table:</strong> Central table for props and performance elements</li>
            <li><strong>Chair:</strong> Performer seating as required</li>
            <li><strong>Cartons/Props:</strong> Various boxes and props for storytelling</li>
            <li><strong>Lighting:</strong> General stage wash with special positions as marked</li>
          </ul>
        </div>
        
        <div className="tech-section">
          <h3>QLab Configuration</h3>
          <p>
            The show utilizes QLab for comprehensive sound design and playback control. 
            The soundscape includes original compositions, ambient textures, and precisely 
            timed audio cues that enhance the storytelling and support the performer's 
            journey through economic theory and personal narrative.
          </p>
          <ul>
            <li>Multiple audio cues synchronized with performance beats</li>
            <li>Ambient soundscapes for different economic eras</li>
            <li>Musical interludes and song accompaniments</li>
            <li>Sound effects for comedic and dramatic moments</li>
          </ul>
        </div>
      </section>
      
      <section className="venue-requirements">
        <h2>Venue Requirements</h2>
        <div className="requirements-grid">
          <div className="requirement-item">
            <h4>Stage Size</h4>
            <p>Minimum 4m x 4m performance area</p>
          </div>
          <div className="requirement-item">
            <h4>Power</h4>
            <p>Standard AC power for audio equipment</p>
          </div>
          <div className="requirement-item">
            <h4>Lighting</h4>
            <p>Basic stage wash, house lights controllable</p>
          </div>
          <div className="requirement-item">
            <h4>Load-in</h4>
            <p>2-3 hours setup time recommended</p>
          </div>
        </div>
      </section>
      
      <nav className="technical-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
  );
}

export default Technical;