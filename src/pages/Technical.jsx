import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setRobotsMeta } from '../utils/seo';
import './Technical.css';
import stagePlan from '../assets/images/Epic-Economics-StagePlan.png';

function Technical() {
  useEffect(() => {
    // Set noindex, nofollow for technical page
    setRobotsMeta(true);

    // Cleanup function to restore default indexing when leaving the page
    return () => {
      setRobotsMeta(false);
    };
  }, []);

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
            <li><strong>Instruments:</strong> Guitar with amplification</li>
          </ul>
        </div>

        {/* <div className="tech-section">
          <h3>Lighting Design</h3>
          <h4>Basic Wash System</h4>
          <ul>
            <li><strong>Soft Wash (a):</strong> Gentle stage illumination</li>
            <li><strong>Medium Wash (b):</strong> Standard performance lighting</li>
            <li><strong>Full Wash (c):</strong> Bright general coverage</li>
          </ul>

          <h4>Special Lighting Positions</h4>
          <ul>
            <li><strong>Downstage Right (d):</strong> Area-specific lighting</li>
            <li><strong>Downstage Left (e):</strong> Area-specific lighting</li>
            <li><strong>Audience Chair/Wall Light (f):</strong> Far left of audience</li>
            <li><strong>Red Light (g):</strong> Ceiling-mounted, diagonal direction to upstage left performer</li>
            <li><strong>Upstage Left Corridor (h):</strong> Blurred corridor effect</li>
            <li><strong>Floor Light (i):</strong> Upward direction towards seated performer's face</li>
            <li><strong>Chair Side Light (j):</strong> When chair is positioned beside table</li>
            <li><strong>Speaker Light (k):</strong> Illumination for speaker</li>
            <li><strong>Centre Spotlight (l):</strong> Central focused beam</li>
            <li><strong>Safety Light (m):</strong> Low-level stage navigation light (remains throughout show)</li>
          </ul>
        </div>

        <div className="tech-section">
          <h3>Stage Elements</h3>
          <ul>
            <li><strong>Performance Table:</strong> Central table for props and performance elements</li>
            <li><strong>Chair:</strong> Performer seating as required, mobile positioning</li>
            <li><strong>Guitar & Stand:</strong> Musical instrument with designated placement</li>
            <li><strong>Speaker:</strong> For recorded voice elements</li>
            <li><strong>Cartons/Props:</strong> Various boxes and props for storytelling</li>
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
            <li>Waltz music sequences</li>
            <li>Alarm sound effects</li>
          </ul>
        </div>

        <div className="tech-section">
          <h3>Lighting Cue Sequence</h3>
          <p>
            The lighting design follows a precise sequence of 41 cues that support the narrative flow:
          </p>
          <div className="cue-list">
            <h4>Key Lighting Moments</h4>
            <ul>
              <li><strong>House to Half:</strong> Pre-show audience lighting transition</li>
              <li><strong>Gradual/Instant Blackouts:</strong> Multiple dramatic moments</li>
              <li><strong>Cross-fades:</strong> Smooth transitions between lighting states</li>
              <li><strong>Music Synchronization:</strong> Lighting changes with waltz and song segments</li>
              <li><strong>Character Moments:</strong> Specific lighting for performer positions and movements</li>
              <li><strong>Audience Integration:</strong> Slight audience lighting for final song</li>
              <li><strong>Projector Elements:</strong> Combined lighting and projection for climactic moments</li>
            </ul>
          </div>
        </div> */}

      </section>

      <section className="venue-requirements">
        <h2>Venue Requirements</h2>
        <div className="requirements-grid">
          <div className="requirement-item">
            <h4>Stage Size</h4>
            <p>Minimum 6m x 6m performance area</p>
          </div>
          <div className="requirement-item">
            <h4>Power</h4>
            <p>Standard AC power for audio and lighting equipment</p>
          </div>
          <div className="requirement-item">
            <h4>Lighting</h4>
            <p>Multi-zone controllable lighting system with specials, house lights controllable, projector capability</p>
          </div>
          {/* <div className="requirement-item">
            <h4>Load-in</h4>
            <p>4-5 hours setup time recommended (including lighting focus)</p>
          </div>*/}
          <div className="requirement-item">
            <h4>Control</h4>
            <p>Lighting board capable of 41 cues with timed fades and instant changes</p>
          </div>
          <div className="requirement-item">
            <h4>Special Equipment</h4>
            <p>Floor-mounted lights, red gel/LED capability, projector for finale and sur/subtitles</p>
          </div>
          <div className="requirement-item">
            <h4>Special Equipment</h4>
            <p>guitar Amp, we'll source it</p>
          </div>
        </div>
      </section>

      <section className="credits">
        <h2>Credits</h2>
        <div className="credits-grid">
          <div className="credit-category">
            <h3>Performance & Creation</h3>
            <ul>
              <li><strong>Written & Performed:</strong> Dimis Michaelides</li>
              <li><strong>Director:</strong> Lia Haraki</li>
              <li><strong>Producer and Composer:</strong> Elias Vasnic</li>
            </ul>
          </div>

          <div className="credit-category">
            <h3>Technical Team</h3>
            <ul>
              <li><strong>Sound:</strong> Elias Vasnic</li>
              <li><strong>Lighting Design:</strong> <a href="https://www.liaharaki.com/"> Lia Haraki </a></li>
              <li><strong>Technical Supervisor:</strong> Elias Vasnic</li>
            </ul>
          </div>

          <div className="credit-category">
            <h3>Photography & Documentation</h3>
            <ul>
              <li><strong>Photography:</strong> Boyana Loizou</li>
              <li><strong>Video:</strong> <a href="https://cy.linkedin.com/in/coula-karasava-b488a418b">Coula Karasava</a></li>
              <li><strong>Instagram:</strong> <a href="https://www.instagram.com/blessthismess_photography/" target="_blank" rel="noopener noreferrer">@blessthismess_photography</a></li>
            </ul>
          </div>

          <div className="credit-category">
            <h3>Digital Presence</h3>
            <ul>
              <li><strong>Website Development:</strong> Elias Vasnic</li>
              <li><strong>Digital Strategy:</strong> <a href="https://elias.densetheory.cc">Dense Theory Creative</a></li>
            </ul>
          </div>

          <div className="credit-category">
            <h3>Special Thanks</h3>
            <ul>
              <li>All economists quoted and referenced in the performance</li>
              <li>Venues and audiences who have supported the development</li>
              <li>The academic and theatre communities who provided feedback</li>
            </ul>
          </div>
        </div>

        <div className="credits-note">
          <p>
            <em>Epic Economics is a solo theatrical work that brings together centuries of economic thought
            with personal narrative and performance. For additional credits or acknowledgments,
            please contact the production team.</em>
          </p>
        </div>
      </section>

      <nav className="technical-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
  );
}

export default Technical;
