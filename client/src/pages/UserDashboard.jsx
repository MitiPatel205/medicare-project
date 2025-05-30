import React from 'react';
import { Link } from 'react-router-dom';

// These would come from props, context, or API in a real app
const appointments = [
  { doctor: "Dr. Rajiv Menon", date: "2 June 2025", time: "10:00 AM", status: "Upcoming" },
  { doctor: "Dr. Meera Sharma", date: "15 May 2025", time: "2:00 PM", status: "Completed" },
];

const prescriptions = [
  { doctor: "Dr. Rajiv Menon", date: "15 May 2025", details: "Blood Pressure Medication" },
];

const UserDashboard = ({ userAppointments = appointments, userPrescriptions = prescriptions }) => (
  <div className="userdashboard-page">
    {/* Hero */}
    <section className="userdashboard-hero">
      <h1>
        My <span className="medicare-highlight">Dashboard</span>
      </h1>
      <p>
        View your upcoming appointments, prescription history, and manage your healthcare easily.
      </p>
    </section>

    {/* Dashboard Content */}
    <section className="userdashboard-main">
      <div className="userdashboard-cards">
        {/* Appointments */}
        <div className="userdashboard-card">
          <h2 className="userdashboard-card-title">
            <i className="bi bi-calendar-check me-2"></i>My Appointments
          </h2>
          {userAppointments.length === 0 ? (
            <div className="userdashboard-empty">
              <i className="bi bi-calendar-x" /> No appointments yet.
            </div>
          ) : (
            <ul className="userdashboard-list">
              {userAppointments.map((appt, idx) => (
                <li className="userdashboard-list-item" key={idx}>
                  <div>
                    <strong>{appt.doctor}</strong>
                    <div className="userdashboard-list-date">
                      {appt.date} at {appt.time}
                    </div>
                  </div>
                  <span className={`userdashboard-badge ${appt.status === "Upcoming" ? "upcoming" : "completed"}`}>
                    {appt.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Prescriptions */}
        <div className="userdashboard-card">
          <h2 className="userdashboard-card-title">
            <i className="bi bi-file-earmark-medical me-2"></i>My Prescriptions
          </h2>
          {userPrescriptions.length === 0 ? (
            <div className="userdashboard-empty">
              <i className="bi bi-file-earmark-x" /> No prescriptions yet.
            </div>
          ) : (
            <ul className="userdashboard-list">
              {userPrescriptions.map((pres, idx) => (
                <li className="userdashboard-list-item" key={idx}>
                  <div>
                    <strong>{pres.doctor}</strong>
                    <div className="userdashboard-list-date">
                      {pres.date}
                    </div>
                  </div>
                  <span className="userdashboard-pres-details">
                    {pres.details}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="userdashboard-cta">
        <Link to="/booking" className="btn userdashboard-btn">
          <i className="bi bi-calendar-plus me-1"></i>
          Book New Appointment
        </Link>
      </div>
    </section>
  </div>
);

export default UserDashboard;
