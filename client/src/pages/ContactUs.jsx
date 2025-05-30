import React, { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }, 1800);
  };

  return (
    <div className="contactus-page">
      {/* Hero */}
      <section className="contactus-hero">
        <h1>
          Contact <span className="medicare-highlight">Medicare</span>
        </h1>
        <p>
          We're here to help! Reach out for support, feedback, or partnership inquiries.
        </p>
      </section>

      {/* Main Content */}
      <section className="contactus-main">
        <div className="contactus-form-section">
          <form className="contactus-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="name" className="form-label">Your Name</label>
            <input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              required
              aria-required="true"
            />
            <label htmlFor="email" className="form-label mt-3">Your Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
              aria-required="true"
            />
            <label htmlFor="message" className="form-label mt-3">Your Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message"
              value={form.message}
              onChange={handleChange}
              className="form-control"
              rows={4}
              required
              aria-required="true"
            />
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <button type="submit" className="btn contactus-btn mt-3" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                <>Send Message</>
              )}
            </button>
          </form>
          {submitted && (
            <div className="alert alert-success mt-3">
              Thank you! We'll get back to you soon.
            </div>
          )}
        </div>
        <div className="contactus-details-section">
          <div className="contactus-details-card">
            <h5><i className="bi bi-envelope me-1"></i> Support</h5>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@medicare.com">support@medicare.com</a>
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a>
            </p>
            <p>
              <strong>WhatsApp:</strong>{' '}
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </p>
            <h5 className="mt-4"><i className="bi bi-geo-alt me-1"></i> Address</h5>
            <p>123, Health Street, Mumbai, India</p>
            <div className="contactus-map mb-3">
              <iframe
                title="Medicare Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.8258%2C18.975%2C72.8358%2C18.985&amp;layer=mapnik"
                style={{ border: 0, width: '100%', height: '140px', borderRadius: '10px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <h5 className="mt-4"><i className="bi bi-share me-1"></i> Follow Us</h5>
            <div className="contactus-socials">
              <a href="#" className="me-2" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="me-2" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="me-2" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
