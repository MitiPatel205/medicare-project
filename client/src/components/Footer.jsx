import React from 'react';
import '../theme.css'; // Import the theme

const Footer = () => (
  <footer className="footer">
    <p>&copy; {new Date().getFullYear()} Medicare. All rights reserved.</p>
  </footer>
);

export default Footer;
