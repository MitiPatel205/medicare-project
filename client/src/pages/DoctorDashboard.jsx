import React, { useEffect, useState } from 'react';

const API_BASE = "http://localhost:5050";

const statusColors = {
  Upcoming: "success",
  Completed: "secondary",
  Cancelled: "danger"
};

const PAGE_SIZE = 5; // Appointments per page

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch appointments and doctors
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/appointments`);
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data);

        // Build unique doctor list from appointments
        const doctors = Array.from(new Set(data.map(a => a.doctor))).filter(Boolean);
        setDoctorList(doctors);
      } catch (err) {
      console.error(err);
        setError("Could not load appointments.");
      }
      setLoading(false);
    };
    fetchAppointments();
  }, []);

  // Filter and search logic
  const filtered = appointments
    .filter(appt =>
      (!filterDoctor || appt.doctor === filterDoctor) &&
      (!search ||
        (appt.patient && appt.patient.toLowerCase().includes(search.toLowerCase())) ||
        (appt.userId && appt.userId.toLowerCase().includes(search.toLowerCase())))
    );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="medicare-container">
      <section className="medicare-dashboard">
        <h1>
          Doctor <span className="medicare-highlight">Dashboard</span>
        </h1>
        <div className="row">
          {/* Sidebar: Filters and Actions */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <h5>Filters</h5>
                <div className="mb-2">
                  <label className="form-label">Filter by Doctor:</label>
                  <select
                    className="form-select"
                    value={filterDoctor}
                    onChange={e => {
                      setFilterDoctor(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="">All Doctors</option>
                    {doctorList.map(doctor => (
                      <option key={doctor} value={doctor}>{doctor}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Search Patient/User:</label>
                  <input
                    className="form-control"
                    placeholder="Enter patient name or userId"
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Quick Actions</h5>
                <a href="/booking" className="btn btn-outline-primary mb-2 w-100">
                  <i className="bi bi-calendar-plus me-2"></i>Add New Appointment
                </a>
                <a href="/prescriptions" className="btn btn-outline-success mb-2 w-100">
                  <i className="bi bi-file-earmark-medical me-2"></i>Write Prescription
                </a>
                <a href="/patients" className="btn btn-outline-secondary w-100">
                  <i className="bi bi-people me-2"></i>View Patients
                </a>
              </div>
            </div>
          </div>
          {/* Main: Appointments List */}
          <div className="col-md-8">
            <h2>Upcoming Appointments</h2>
            {loading ? (
              <div className="text-center my-4">
                <span className="spinner-border" role="status"></span>
                <span className="ms-2">Loading...</span>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="alert alert-info">No appointments found.</div>
            ) : (
              <>
                <ul className="list-group">
                  {paginated
                    .filter(appt => appt.status === "Upcoming")
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((appt, idx) => (
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={appt._id || idx}>
                        <div>
                          <strong>Patient:</strong> {appt.patient || appt.userId} <br />
                          <strong>Date:</strong> {appt.date} <strong>Time:</strong> {appt.time} <br />
                          <small className="text-muted">Doctor: {appt.doctor} | ID: {appt._id}</small>
                        </div>
                        <span className={`badge bg-${statusColors[appt.status] || "primary"} ms-2`}>
                          {appt.status}
                        </span>
                      </li>
                    ))}
                </ul>
                {/* Pagination Controls */}
                <nav className="mt-3">
                  <ul className="pagination">
                    <li className={`page-item${page === 1 ? " disabled" : ""}`}>
                      <button className="page-link" onClick={() => setPage(page - 1)}>&laquo;</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li className={`page-item${page === i + 1 ? " active" : ""}`} key={i}>
                        <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item${page === totalPages ? " disabled" : ""}`}>
                      <button className="page-link" onClick={() => setPage(page + 1)}>&raquo;</button>
                    </li>
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;
