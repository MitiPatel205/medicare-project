import React from 'react';
import '../theme.css'; // Import your custom styles

const Footer = () => (
  <footer className="footer bg-primary text-white mt-5 pt-4 pb-2">
    <div className="container">
      <div className="row align-items-center">
        {/* Left: Brand and tagline */}
        <div className="col-md-4 mb-3 mb-md-0 d-flex align-items-center">
          <i className="bi bi-heart-pulse-fill fs-3 me-2" style={{ color: '#ffeb3b' }}></i>
          <div>
            <span className="fw-bold">Medicare</span>
            <div style={{ fontSize: '0.9rem' }}>Your health, our priority</div>
          </div>
        </div>
        {/* Center: Quick Links */}
        <div className="col-md-4 mb-3 mb-md-0 text-center">
          <a href="/" className="footer-link mx-2">Home</a>
          <a href="/doctors" className="footer-link mx-2">Doctors</a>
          <a href="/booking" className="footer-link mx-2">Book</a>
          <a href="/contact" className="footer-link mx-2">Contact</a>
        </div>
        {/* Right: Social and Contact */}
        <div className="col-md-4 text-md-end text-center">
          <a href="mailto:info@medicare.com" className="text-white me-3" title="Email">
            <i className="bi bi-envelope-fill fs-5"></i>
          </a>
          <a href="tel:+1234567890" className="text-white me-3" title="Call">
            <i className="bi bi-telephone-fill fs-5"></i>
          </a>
          <a href="#" className="text-white me-2" title="Facebook">
            <i className="bi bi-facebook fs-5"></i>
          </a>
          <a href="#" className="text-white" title="Twitter">
            <i className="bi bi-twitter-x fs-5"></i>
          </a>
        </div>
      </div>
      <hr className="border-light my-3" />
      <div className="text-center" style={{ fontSize: '0.95rem' }}>
        &copy; {new Date().getFullYear()} Medicare. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
