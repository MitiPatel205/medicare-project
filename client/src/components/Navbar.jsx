import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div className="container">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <i className="bi bi-heart-pulse-fill me-2" style={{ fontSize: '1.5rem', color: '#fff' }}></i>
        <span className="fw-bold">Medicare</span>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/"><i className="bi bi-house-door me-1"></i> Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/doctors"><i className="bi bi-person-vcard me-1"></i> Doctors</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/booking"><i className="bi bi-calendar-check me-1"></i> Book Appointment</Link>
          </li>
        </ul>
        <form className="d-flex me-3" role="search">
          <input className="form-control form-control-sm me-2" type="search" placeholder="Search doctors" aria-label="Search" />
          <button className="btn btn-outline-light btn-sm" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
        <Link to="/login" className="btn btn-light btn-sm me-2">
          <i className="bi bi-box-arrow-in-right me-1"></i> Login
        </Link>
        <Link to="/signup" className="btn btn-warning btn-sm">
          <i className="bi bi-person-plus me-1"></i> Sign Up
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
