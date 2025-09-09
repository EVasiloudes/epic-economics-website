import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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
            please use the contact form or reach out through the information below.
          </p>
          
          <div className="contact-details">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> info@epiceconomics.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Theatre District, New York, NY 10001</p>
          </div>
          
          <div className="social-links">
            <h3>Follow Us</h3>
            <p>Stay updated with our latest news and performances</p>
            <ul>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </section>
      
      <nav className="contact-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
    </div>
  );
}

export default Contact;