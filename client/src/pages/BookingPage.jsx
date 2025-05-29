import React, { useState } from 'react';

const BookingPage = () => {
  const [form, setForm] = useState({ user: '', doctor: '', date: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="user" placeholder="User ID" onChange={handleChange} />
      <input name="doctor" placeholder="Doctor ID" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default BookingPage;
