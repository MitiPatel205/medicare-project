import React from 'react';

const features = [
  {
    icon: "📅",
    title: "Easy Appointment Booking",
    description: "Schedule appointments with top doctors in just a few clicks."
  },
  {
    icon: "🩺",
    title: "Find Specialists",
    description: "Search and filter doctors by specialty, location, and ratings."
  },
  {
    icon: "💻",
    title: "Online Consultations",
    description: "Consult with healthcare professionals from the comfort of your home."
  },
  {
    icon: "📄",
    title: "Digital Prescriptions",
    description: "Get and manage your prescriptions online, safely and securely."
  },
  {
    icon: "🕑",
    title: "24/7 Support",
    description: "Our support team is available round the clock to assist you."
  }
];

const HomePage = () => (
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
      <a href="/book" className="medicare-cta">Book an Appointment</a>
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

export default HomePage;
