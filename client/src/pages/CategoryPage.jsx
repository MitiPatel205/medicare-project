import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { icon: "🩺", name: "General Physician", desc: "Routine checkups & common illnesses" },
  { icon: "👶", name: "Pediatrics", desc: "Child health & vaccinations" },
  { icon: "🦷", name: "Dentistry", desc: "Dental care & oral hygiene" },
  { icon: "❤️", name: "Cardiology", desc: "Heart specialists" },
  { icon: "🦴", name: "Orthopedics", desc: "Bone & joint care" },
  { icon: "🌸", name: "Gynecology", desc: "Women's health" },
  { icon: "🧠", name: "Psychiatry", desc: "Mental health support" },
  { icon: "🌞", name: "Dermatology", desc: "Skin, hair & nails" },
  // Add more specialties for scroll demo
  { icon: "👁️", name: "Ophthalmology", desc: "Eye care & vision correction" },
  { icon: "👂", name: "ENT", desc: "Ear, nose & throat specialists" },
  { icon: "🧬", name: "Endocrinology", desc: "Hormonal & metabolic care" },
  { icon: "🩸", name: "Hematology", desc: "Blood disorders & treatment" },
];

const features = [
  {
    icon: "bi-person-check",
    title: "Verified Specialists",
    desc: "All doctors are board-certified and trusted by thousands of patients."
  },
  {
    icon: "bi-clock-history",
    title: "Flexible Appointments",
    desc: "Book visits at your convenience, including evenings and weekends."
  },
  {
    icon: "bi-chat-dots",
    title: "Easy Communication",
    desc: "Message or call your doctor directly through our secure platform."
  },
  {
    icon: "bi-shield-lock",
    title: "Privacy & Security",
    desc: "Your health data is always safe and confidential with us."
  }
];

const allSpecialties = ["All", ...categories.map(cat => cat.name)];

const CategoryPage = () => {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');

  const filteredCategories = categories.filter(cat => {
    const matchesSpecialty = specialty === 'All' || cat.name === specialty;
    const matchesSearch =
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.desc.toLowerCase().includes(search.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="category-page">
      {/* Hero Section */}
      <section className="category-hero">
        <h1>
          Find Your <span className="medicare-highlight">Specialist</span>
        </h1>
        <p>
          Discover top medical specialists for every health need. Browse, search, and book appointments with trusted experts in every field.
        </p>
      </section>

      {/* Features Section */}
      <section className="category-features">
        <div className="category-features-grid">
          {features.map((f, idx) => (
            <div className="category-feature-card" key={idx}>
              <i className={`bi ${f.icon} feature-icon`}></i>
              <h5>{f.title}</h5>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter */}
      <section className="category-search-filter">
        <input
          type="text"
          className="category-search"
          placeholder="Search specialties..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="category-filter"
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
        >
          {allSpecialties.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </section>

      {/* Specialties Grid with Horizontal Scroll on Mobile */}
      <section className="medicare-categories">
        <div className="category-section-header">
          <h2 className="category-section-title">Browse by Specialty</h2>
          <span className="category-section-count">
            {filteredCategories.length} specialties found
          </span>
        </div>
        {filteredCategories.length === 0 ? (
          <div className="category-empty">
            <i className="bi bi-emoji-frown" style={{ fontSize: "2rem" }}></i>
            <p>No specialties found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="medicare-categories-scroll">
            <div className="medicare-categories-grid">
              {filteredCategories.map((cat, idx) => (
                <div className="medicare-category-card" key={idx}>
                  <div className="medicare-category-icon">{cat.icon}</div>
                  <h4>{cat.name}</h4>
                  <p className="medicare-category-desc">{cat.desc}</p>
                  <Link
                    to={`/doctors?specialty=${encodeURIComponent(cat.name)}`}
                    className="btn category-btn mt-auto"
                  >
                    <i className="bi bi-person-lines-fill me-1"></i>
                    View Doctors
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="category-cta">
        <h3>Not sure which specialist you need?</h3>
        <p>
          <Link to="/contact" className="category-cta-link">
            Contact us
          </Link> and we’ll help you find the right doctor!
        </p>
      </section>
    </div>
  );
};

export default CategoryPage;
