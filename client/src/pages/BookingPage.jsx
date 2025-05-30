import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Use your backend API base URL
const API_BASE = "http://localhost:5050";


// Sample doctor list for dropdown
const doctors = [
  { id: 'd1', name: "Dr. Asha Verma", specialty: "General Physician" },
  { id: 'd2', name: "Dr. Rajiv Singh", specialty: "Cardiology" },
  { id: 'd3', name: "Dr. Nidhi Rao", specialty: "Pediatrics" },
  { id: 'd4', name: "Dr. Meera Patel", specialty: "Gynecology" },
];

const features = [
  { icon: "bi-calendar-heart", title: "Easy Scheduling", desc: "Book appointments with just a few clicks. No waiting, no hassle." },
  { icon: "bi-shield-check", title: "Trusted Doctors", desc: "All doctors are verified and experienced healthcare professionals." },
  { icon: "bi-clock-history", title: "24/7 Availability", desc: "Book anytime, anywhere. Our system is always open for you." },
  { icon: "bi-phone", title: "Instant Confirmation", desc: "Get immediate confirmation and reminders on your phone or email." }
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Get user from localStorage or use a default for testing
const user = JSON.parse(localStorage.getItem('user')) || { id: "user123", name: "John Doe" };

const BookingPage = () => {
  const query = useQuery();
  const doctorFromQuery = query.get('doctor') || '';
  const specialtyFromQuery = query.get('specialty') || '';
  const dateFromQuery = query.get('date') || '';

  const [form, setForm] = useState({
    user: user.name,
    doctor: doctorFromQuery,
    specialty: specialtyFromQuery,
    date: dateFromQuery,
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [apptId, setApptId] = useState('');

  useEffect(() => {
    setForm(f => ({
      ...f,
      doctor: doctorFromQuery,
      specialty: specialtyFromQuery,
      date: dateFromQuery
    }));
  }, [doctorFromQuery, specialtyFromQuery, dateFromQuery]);

  useEffect(() => {
    if (form.doctor) {
      const doc = doctors.find(d => d.name === form.doctor);
      if (doc && form.specialty !== doc.specialty) {
        setForm(f => ({ ...f, specialty: doc.specialty }));
      }
    }
  }, [form.doctor]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setSuccess(false);
    setApptId('');
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          doctor: form.doctor,
          specialty: form.specialty,
          date: form.date,
          time: form.time,
          status: 'Upcoming'
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.message || "Something went wrong. Please try again.");
        setSuccess(false);
      } else {
        setMsg(data.message || "Appointment booked!");
        setSuccess(true);
        setApptId(data.appointment?._id || data.appointment?.id || "");
        setForm({
          user: user.name,
          doctor: '',
          specialty: '',
          date: '',
          time: ''
        });
      }
    } catch (err) {
      console.error(err);
      setMsg("Network error. Please try again.");
      setSuccess(false);
    }
    setLoading(false);
  };

  return (
    <div className="booking-page">
      {/* Hero Section */}
      <section className="booking-hero text-center">
        <h1 className="booking-title">Book Your Appointment</h1>
        <p className="booking-subtitle">
          Quick, easy, and secure. Get connected to the right doctor at the right time.
        </p>
      </section>

      {/* Features Section */}
      <section className="booking-features">
        <h2 className="section-title">Why Book with Medicare?</h2>
        <div className="booking-features-grid">
          {features.map((f, idx) => (
            <div className="booking-feature-card" key={idx}>
              <i className={`bi ${f.icon} feature-icon`}></i>
              <h5>{f.title}</h5>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-form-section">
        <div className="booking-form-card">
          <h3 className="form-title">
            <i className="bi bi-calendar-check me-2"></i>
            Book an Appointment
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>User Name</label>
              <input
                name="user"
                className="form-control"
                placeholder="Enter your full name"
                value={form.user}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Select Doctor</label>
              <select
                name="doctor"
                className="form-control"
                value={form.doctor}
                onChange={handleChange}
                required
                disabled={!!doctorFromQuery || loading}
              >
                <option value="">Choose a doctor</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} ({doc.specialty})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Specialty</label>
              <input
                name="specialty"
                className="form-control"
                value={form.specialty}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                name="date"
                type="date"
                className="form-control"
                value={form.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                name="time"
                type="time"
                className="form-control"
                value={form.time}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <button className="btn booking-btn w-100 mt-2" type="submit" disabled={loading}>
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
            <div className={`alert mt-3 py-2 ${success ? 'alert-success' : 'alert-info'}`} role="alert">
              {msg}
              {success && apptId && (
                <div className="mt-2">
                  <span className="fw-bold">Appointment ID:</span> <span>{apptId}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="booking-next-steps">
        <h4>What Happens After Booking?</h4>
        <ul>
          <li>You’ll receive a confirmation email and SMS with your appointment details.</li>
          <li>Your doctor will be notified and may contact you for any pre-visit instructions.</li>
          <li>You’ll get reminders before your appointment.</li>
          <li>Need to reschedule? Just log in and update your booking.</li>
        </ul>
      </section>
    </div>
  );
};

export default BookingPage;
