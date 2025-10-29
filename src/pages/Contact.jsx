import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <header className="contact-header">
        <h1>Epic Economics</h1>
        <p className="contact-description">Contact information</p>
      </header>

      <section className="contact-content">
        <div className="contact-info">
          <div className="contact-details">
            <div className="contact-person">
              <p><strong>Elias Vasnic - PRODUCER</strong></p>
              <p>elias(at)densetheory.cc</p>
            </div>
            <div className="contact-person">
              <p><strong>Dimis Michaelides</strong></p>
              <p>dimis(at)dimis.org</p>
            </div>
          </div>
        </div>
      </section>

      <nav className="contact-navigation">
        <Link to="/" className="back-link">← Home</Link>
      </nav>
    </div>
  );
}

export default Contact;
