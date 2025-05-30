import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  { q: "How do I book an appointment?", a: "Click 'Book Appointment', choose your doctor and time slot, and confirm." },
  { q: "Can I consult online?", a: "Yes! Many doctors offer secure online consultations." },
  { q: "How do I access my prescriptions?", a: "Log in and go to 'My Prescriptions' in your dashboard." },
  { q: "Is my data safe?", a: "We use industry-standard encryption to keep your data secure." },
  { q: "Can I reschedule or cancel?", a: "Yes, you can manage appointments in your dashboard." },
  { q: "How do I contact support?", a: "Use our contact form or email support@medicare.com." },
];

function highlight(text, search) {
  if (!search) return text;
  const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

const FAQ = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(null);

  const filteredFaqs = faqs.filter(
    faq =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = idx => setOpen(open === idx ? null : idx);

  return (
    <div className="faq-page">
      {/* Hero */}
      <section className="faq-hero">
        <h1>
          Frequently Asked <span className="medicare-highlight">Questions</span>
        </h1>
        <p>Find quick answers to common questions about appointments, online consultations, your data, and more.</p>
      </section>

      {/* Search */}
      <section className="faq-search">
        <input
          type="text"
          className="faq-search-input"
          placeholder="Search FAQs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search FAQs"
        />
      </section>

      {/* Accordion */}
      <section className="faq-accordion-section">
        <div className="faq-accordion" role="tablist">
          {filteredFaqs.length === 0 ? (
            <div className="faq-empty">
              <i className="bi bi-emoji-frown" style={{ fontSize: "2rem" }}></i>
              <p>No results found. Try a different keyword.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div className="faq-accordion-item" key={idx}>
                <button
                  className={`faq-accordion-question${open === idx ? ' open' : ''}`}
                  aria-expanded={open === idx}
                  aria-controls={`faq-panel-${idx}`}
                  id={`faq-header-${idx}`}
                  onClick={() => handleToggle(idx)}
                >
                  {highlight(faq.q, search)}
                  <span className="faq-arrow">{open === idx ? '▲' : '▼'}</span>
                </button>
                <div
                  className={`faq-accordion-answer${open === idx ? ' open' : ''}`}
                  id={`faq-panel-${idx}`}
                  role="region"
                  aria-labelledby={`faq-header-${idx}`}
                  style={open === idx ? { maxHeight: 300 } : { maxHeight: 0 }}
                >
                  <div>{highlight(faq.a, search)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="faq-cta">
        <h4>Didn't find your answer?</h4>
        <Link to="/contact" className="faq-cta-link">
          Contact our support team
        </Link>
      </section>
    </div>
  );
};

export default FAQ;
