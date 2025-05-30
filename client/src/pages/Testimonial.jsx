import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
  { name: "Priya S.", feedback: "Booking an appointment was so easy and the doctor was very helpful!", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Rahul M.", feedback: "Loved the online consultation feature. Saved me a lot of time!", image: "https://randomuser.me/api/portraits/men/12.jpg" },
  { name: "Neha K.", feedback: "Support team is very responsive. Highly recommend Medicare.", image: "https://randomuser.me/api/portraits/women/45.jpg" },
  {
    name: "Amit T.",
    feedback: "I could access my prescriptions online instantly. Great service!",
    image: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    name: "Sunita R.",
    feedback: "The reminders helped me never miss an appointment. Thank you!",
    image: "https://randomuser.me/api/portraits/women/51.jpg"
  },
];

const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  const prevTestimonial = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () => setCurrent((current + 1) % testimonials.length);

  // Show 1 card at a time on mobile, 2 on tablet, 3 on desktop
  const getVisibleTestimonials = () => {
    if (window.innerWidth < 600) return [testimonials[current]];
    if (window.innerWidth < 900) {
      const next = (current + 1) % testimonials.length;
      return [testimonials[current], testimonials[next]];
    }
    // Desktop: 3 cards
    const next = (current + 1) % testimonials.length;
    const next2 = (current + 2) % testimonials.length;
    return [testimonials[current], testimonials[next], testimonials[next2]];
  };

  // Recalculate on window resize
  const [_, setRerender] = useState(false);
  React.useEffect(() => {
    const handleResize = () => setRerender(r => !r);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="testimonial-page">
      {/* Hero */}
      <section className="testimonial-hero">
        <h1>
          What Our <span className="medicare-highlight">Patients</span> Say
        </h1>
        <p>
          Real stories from real people. See how Medicare is making healthcare easier and better for everyone.
        </p>
      </section>

      {/* Testimonial Carousel */}
      <section className="testimonial-carousel-section">
        <div className="testimonial-carousel-controls">
          <button className="testimonial-arrow" onClick={prevTestimonial} aria-label="Previous testimonial">
            &#8592;
          </button>
          <div className="testimonial-carousel">
            {visibleTestimonials.map((t, idx) => (
              <div className="testimonial-card" key={t.name + idx}>
                <img src={t.image} alt={t.name} className="testimonial-avatar" />
                <p className="testimonial-feedback">"{t.feedback}"</p>
                <span className="testimonial-name">{t.name}</span>
              </div>
            ))}
          </div>
          <button className="testimonial-arrow" onClick={nextTestimonial} aria-label="Next testimonial">
            &#8594;
          </button>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`testimonial-dot${current === idx ? ' active' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            ></span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="testimonial-cta">
        <h4>Want to share your experience?</h4>
        <Link to="/contact" className="testimonial-cta-link">
          Share Your Story
        </Link>
      </section>
    </div>
  );
};

export default Testimonial;
