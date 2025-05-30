import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: "📅",
    title: "Easy Appointment Booking",
    description: "Book appointments instantly with top-rated doctors in your area."
  },
  {
    icon: "🔎",
    title: "Verified Doctor Profiles",
    description: "Browse detailed profiles, qualifications, and patient reviews."
  },
  {
    icon: "💬",
    title: "Instant Chat & Video Consult",
    description: "Connect with doctors via secure chat or video, anytime."
  },
  {
    icon: "🗂️",
    title: "Medical Records Vault",
    description: "Store and access your prescriptions and reports safely online."
  },
  {
    icon: "⏰",
    title: "Timely Reminders",
    description: "Get appointment and medication reminders, so you never miss a beat."
  }
];

const categories = [
  { icon: "🩺", title: "General Physician", desc: "Routine checkups & common illnesses" },
  { icon: "👶", title: "Pediatrics", desc: "Child health & vaccinations" },
  { icon: "🦷", title: "Dentistry", desc: "Dental care & oral hygiene" },
  { icon: "❤️", title: "Cardiology", desc: "Heart specialists" },
  { icon: "🦴", title: "Orthopedics", desc: "Bone & joint care" },
  { icon: "🌸", title: "Gynecology", desc: "Women's health" },
  { icon: "🧠", title: "Psychiatry", desc: "Mental health support" },
  { icon: "🌞", title: "Dermatology", desc: "Skin, hair & nails" },
];

const testimonials = [
  { name: "Priya S.", feedback: "Booking an appointment was so easy and the doctor was very helpful!", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Rahul M.", feedback: "Loved the online consultation feature. Saved me a lot of time!", image: "https://randomuser.me/api/portraits/men/12.jpg" },
  { name: "Neha K.", feedback: "Support team is very responsive. Highly recommend Medicare.", image: "https://randomuser.me/api/portraits/women/45.jpg" },
];

const faqs = [
  { q: "How do I book an appointment?", a: "Just click on 'Book an Appointment', select your doctor and time slot." },
  { q: "Are online consultations secure?", a: "Yes, we use encrypted channels for all online consultations." },
  { q: "Can I access my prescriptions online?", a: "Absolutely! All your prescriptions are available in your account dashboard." },
];

const HomePage = () => {
  const navigate = useNavigate();

  // Handle Book Appointment button
  const handleBookAppointment = () => {
    navigate('/booking');
  };

  // Handle View Doctors by specialty
  const handleViewDoctors = (specialty) => {
    navigate(`/doctors?specialty=${encodeURIComponent(specialty)}`);
  };

  return (
    <div className="medicare-container">
      {/* Hero Section */}
      <section className="medicare-hero">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
          alt="Medicare Logo"
          className="medicare-logo"
        />
        <h1 className="medicare-title">
          Welcome to <span className="medicare-highlight">Medicare</span>
        </h1>
        <p className="medicare-subtitle">
          Your one-stop solution for doctor appointments and digital healthcare.
        </p>
        <button className="medicare-cta" onClick={handleBookAppointment}>
          Book an Appointment
        </button>
      </section>

      {/* Features Section */}
      <section className="medicare-features">
        <h2 className="medicare-section-title">Our Features</h2>
        <div className="medicare-features-grid">
          {features.map((feature, idx) => (
            <div className="medicare-feature-card" key={idx}>
              <div className="medicare-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="medicare-categories">
        <h2 className="medicare-section-title">Our Specialties</h2>
        <div className="medicare-categories-grid">
          {categories.map((cat, idx) => (
            <div className="medicare-category-card" key={idx}>
              <div className="medicare-category-icon">{cat.icon}</div>
              <h4>{cat.title}</h4>
              <p>{cat.desc}</p>
              <button
                className="btn"
                style={{ marginTop: "1rem" }}
                onClick={() => handleViewDoctors(cat.title)}
              >
                View Doctors
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="medicare-testimonials">
        <h2 className="medicare-section-title">What Our Patients Say</h2>
        <div className="medicare-testimonials-grid">
          {testimonials.map((t, idx) => (
            <div className="medicare-testimonial-card" key={idx}>
              <img src={t.image} alt={t.name} className="medicare-testimonial-img" />
              <p className="medicare-testimonial-feedback">"{t.feedback}"</p>
              <span className="medicare-testimonial-name">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="medicare-faq">
        <h2 className="medicare-section-title">Frequently Asked Questions</h2>
        <div className="medicare-faq-list">
          {faqs.map((faq, idx) => (
            <div className="medicare-faq-item" key={idx}>
              <strong>Q: {faq.q}</strong>
              <p>A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="medicare-how">
        <h2 className="medicare-section-title">How It Works</h2>
        <ol className="medicare-steps">
          <li>Sign up and create your profile.</li>
          <li>Find the right doctor or specialist.</li>
          <li>Book your appointment online.</li>
          <li>Consult in-person or online.</li>
          <li>Access your prescriptions and records anytime.</li>
        </ol>
      </section>
    </div>
  );
};

export default HomePage;
