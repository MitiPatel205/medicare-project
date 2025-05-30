import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Sample doctors data
const sampleDoctors = [
  { name: "Dr. Asha Verma", specialty: "General Physician", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. Rajiv Singh", specialty: "Cardiology", img: "https://randomuser.me/api/portraits/men/34.jpg" },
  { name: "Dr. Nidhi Rao", specialty: "Pediatrics", img: "https://randomuser.me/api/portraits/women/47.jpg" },
  { name: "Dr. Meera Patel", specialty: "Gynecology", img: "https://randomuser.me/api/portraits/women/48.jpg" },
  { name: "Dr. Prakash Das", specialty: "Orthopedics", img: "https://randomuser.me/api/portraits/men/54.jpg" },
  { name: "Dr. Sunil Sharma", specialty: "Dentistry", img: "https://randomuser.me/api/portraits/men/56.jpg" },
  { name: "Dr. Kavita Joshi", specialty: "Dermatology", img: "https://randomuser.me/api/portraits/women/53.jpg" },
  { name: "Dr. Arjun Mehta", specialty: "Psychiatry", img: "https://randomuser.me/api/portraits/men/55.jpg" },
];

const doctorFeatures = [
  {
    icon: "bi-shield-check",
    title: "Verified Experts",
    desc: "All doctors are thoroughly verified and highly experienced."
  },
  {
    icon: "bi-chat-dots",
    title: "Easy Communication",
    desc: "Chat or call your doctor directly from your dashboard."
  },
  {
    icon: "bi-calendar-check",
    title: "Flexible Scheduling",
    desc: "Choose appointment times that fit your busy life."
  },
  {
    icon: "bi-star-fill",
    title: "Top Rated",
    desc: "Our doctors are rated highly by thousands of patients."
  }
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function DoctorListPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const specialty = query.get("specialty") || "";

  // For specialty dropdown
  const specialties = Array.from(new Set(sampleDoctors.map(d => d.specialty)));

  // Search and filter state
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialty);

  // Filtered doctors
  const doctors = sampleDoctors.filter(d =>
    (selectedSpecialty === "" || d.specialty === selectedSpecialty) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  // Book appointment button handler
  const handleBook = (doctorName) => {
    navigate(`/booking?doctor=${encodeURIComponent(doctorName)}`);
  };

  return (
    <div className="doctor-list-page">
      {/* Hero/Intro */}
      <section className="doctor-list-hero">
        <h1>Meet Our Doctors{selectedSpecialty ? ` - ${selectedSpecialty}` : ""}</h1>
        <p>
          Choose from our panel of highly qualified and compassionate healthcare professionals.
        </p>
      </section>

      {/* Filters */}
      <section className="doctor-list-filters">
        <input
          type="text"
          className="doctor-search"
          placeholder="Search doctor by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="doctor-specialty-select"
          value={selectedSpecialty}
          onChange={e => setSelectedSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          {specialties.map((sp, idx) => (
            <option value={sp} key={idx}>{sp}</option>
          ))}
        </select>
      </section>

      {/* Doctor Cards */}
      <section className="doctor-list-grid">
        {doctors.length === 0 ? (
          <div className="doctor-list-empty">
            <i className="bi bi-emoji-frown" style={{ fontSize: "2rem" }}></i>
            <p>No doctors found for your search.</p>
          </div>
        ) : (
          doctors.map((doc, idx) => (
            <div className="doctor-card" key={idx}>
              <img src={doc.img} alt={doc.name} className="doctor-avatar" />
              <div className="doctor-info">
                <h4>{doc.name}</h4>
                <p className="doctor-specialty">{doc.specialty}</p>
                <button
                  className="btn doctor-book-btn"
                  onClick={() => handleBook(doc.name)}
                >
                  <i className="bi bi-calendar-plus me-1"></i>
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="doctor-list-features">
        <h2 className="doctor-list-section-title">Why Choose Our Doctors?</h2>
        <div className="doctor-list-features-grid">
          {doctorFeatures.map((f, idx) => (
            <div className="doctor-feature-card" key={idx}>
              <i className={`bi ${f.icon} feature-icon`}></i>
              <h5>{f.title}</h5>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
