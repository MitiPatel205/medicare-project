import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => (

<nav className="navbar navbar-expand-lg medicare-navbar shadow-sm">
    <div className="container-fluid px-3">
      {/* Brand */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <i className="bi bi-heart-pulse-fill me-2 brand-icon"></i>
        <span className="fw-bold">Medicare</span>
      </Link>
      {/* Toggler for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* Navbar links and actions */}
      <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
        {/* Main Navigation */}
        <ul className="navbar-nav nav-main mx-auto">
          <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/doctors">Doctors</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/booking">Book Appointment</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/categories">Specialties</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/testimonials">Testimonials</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/faq">FAQ</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/user-dashboard">My Dashboard</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/doctor-dashboard">Doctor Dashboard</NavLink></li>
        </ul>
        {/* Search and Auth Buttons */}
        <div className="d-flex align-items-center nav-actions ms-lg-3 mt-2 mt-lg-0">
          <form className="d-flex nav-search me-2" role="search">
            <input
              className="form-control form-control-sm me-1"
              type="search"
              placeholder="Search doctors"
              aria-label="Search"
            />
            <button className="btn btn-outline-light btn-sm" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <Link to="/login" className="btn btn-light btn-sm me-2">Login</Link>
          <Link to="/signup" className="btn btn-warning btn-sm">Sign Up</Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
