import React from 'react';
import { Link } from 'react-router-dom';
import '../theme.css'; // Import the theme

const Navbar = () => (
  <nav className="navbar">
    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Medicare</span>
    <div className="nav-links">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/doctors">Doctors</Link>
      <Link className="nav-link" to="/booking">Book Appointment</Link>
    </div>
  </nav>
);

export default Navbar;
