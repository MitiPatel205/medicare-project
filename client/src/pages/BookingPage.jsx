import React, { useState } from 'react';

const features = [
  {
    icon: "bi-calendar-heart",
    title: "Easy Scheduling",
    desc: "Book appointments with just a few clicks. No waiting, no hassle."
  },
  {
    icon: "bi-shield-check",
    title: "Trusted Doctors",
    desc: "All doctors are verified and experienced healthcare professionals."
  },
  {
    icon: "bi-clock-history",
    title: "24/7 Availability",
    desc: "Book anytime, anywhere. Our system is always open for you."
  },
  {
    icon: "bi-phone",
    title: "Instant Confirmation",
    desc: "Get immediate confirmation and reminders on your phone or email."
  }
];

const BookingPage = () => {
  const [form, setForm] = useState({ user: '', doctor: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  setLoading(true);
  setMsg('');
  try {
    const res = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (!res.ok) {
      // Show backend error message if available
      setMsg(data.message || "Something went wrong. Please try again.");
    } else {
      setMsg(data.message || "Appointment booked!");
      setForm({ user: '', doctor: '', date: '' });
    }
  } catch (err) {
    console.error('Booking error:', err);
    setMsg("Network error. Please try again.");
  }
  setLoading(false);
};


  return (
    <div className="container py-4">
      {/* Features Section */}
      <div className="row text-center mb-5">
        <h2 className="mb-4 fw-bold">Why Book with Medicare?</h2>
        {features.map((f, idx) => (
          <div className="col-12 col-md-3 mb-4" key={idx}>
            <i className={`bi ${f.icon} text-primary mb-2`} style={{ fontSize: '2.2rem' }}></i>
            <h5 className="fw-semibold mt-2">{f.title}</h5>
            <p className="text-muted small">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-3 text-primary fw-bold">
                <i className="bi bi-calendar-check me-2"></i>Book an Appointment
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">User ID</label>
                  <input
                    name="user"
                    className="form-control"
                    placeholder="Enter your user ID"
                    value={form.user}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Doctor ID</label>
                  <input
                    name="doctor"
                    className="form-control"
                    placeholder="Enter doctor ID"
                    value={form.doctor}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    name="date"
                    type="date"
                    className="form-control"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Booking...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2-circle me-2"></i>
                      Book Appointment
                    </>
                  )}
                </button>
              </form>
              {msg && (
                <div className="alert alert-info mt-3 py-2" role="alert">
                  {msg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
