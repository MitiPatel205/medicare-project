import React from 'react';
import { Link } from 'react-router-dom';

const team = [
  { name: "Dr. Meera Sharma", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. Rajiv Menon", role: "Chief Medical Officer", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Anjali Patel", role: "Lead Developer", img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const values = [
  { icon: "🤝", title: "Trust", desc: "We build lasting relationships with patients and doctors." },
  { icon: "⚡", title: "Innovation", desc: "We use technology to simplify healthcare for everyone." },
  { icon: "❤️", title: "Care", desc: "We put compassion at the center of everything we do." },
];

const AboutUs = () => (
  <div className="aboutus-page">
    {/* Hero Section */}
    <section className="aboutus-hero">
      <h1>
        About <span className="medicare-highlight">Medicare</span>
      </h1>
      <p>
        Medicare is your trusted partner in digital healthcare. Our mission is to connect patients with top doctors, offer seamless appointment booking, and empower everyone to take control of their health—anytime, anywhere.
      </p>
    </section>

    {/* Values Section */}
    <section className="aboutus-values">
      <div className="aboutus-values-grid">
        {values.map((v, idx) => (
          <div className="aboutus-value-card" key={idx}>
            <span className="aboutus-value-icon">{v.icon}</span>
            <h5>{v.title}</h5>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Team Section */}
    <section className="aboutus-team">
      <h2 className="aboutus-team-title">Meet Our Team</h2>
      <div className="aboutus-team-grid">
        {team.map((member, idx) => (
          <div className="aboutus-team-card" key={idx}>
            <img src={member.img} alt={member.name} className="aboutus-team-img" />
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="aboutus-cta">
      <h4>Want to partner or have questions?</h4>
      <Link to="/contact" className="aboutus-cta-link">
        Contact Us
      </Link>
    </section>
  </div>
);

export default AboutUs;
