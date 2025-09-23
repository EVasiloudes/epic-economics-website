import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <header className="contact-header">
        <h1>Epic Economics - Contact Us</h1>
        <p className="contact-description">General inquiries and information</p>
      </header>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            For general inquiries, press requests, or any other information about Epic Economics,
            please reach out through the information below.
          </p>

          <div className="contact-details">
            <h3>Contact Information</h3>
            <div className="contact-person">
              <p><strong>Dimis Michaelides</strong></p>
              <p>Email: dimis (at) dimis.org</p>
            </div>
            <div className="contact-person">
              <p><strong>Elias Vasnic - PRODUCER</strong></p>
              <p>Email: elias (at) densetheory.cc</p>
            </div>
          </div>
        </div>
      </section>

      <nav className="contact-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
  );
}

export default Contact;
