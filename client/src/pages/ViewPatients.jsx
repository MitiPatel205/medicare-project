import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5050";

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/patients`);
        if (!res.ok) throw new Error("Failed to fetch patients");
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error(err);
        setError("Could not load patients.");
      }
      setLoading(false);
    };
    fetchPatients();
  }, []);

  // Filter patients by search term
  const filteredPatients = patients.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="patients-container">
      <h2 className="patients-title">Patients</h2>
      <div className="patients-search mb-3">
        <input
          className="patients-search-input"
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="patients-loading">
          <span className="spinner-border" role="status"></span>
          <span className="ms-2">Loading...</span>
        </div>
      ) : error ? (
        <div className="patients-error">{error}</div>
      ) : filteredPatients.length === 0 ? (
        <div className="patients-empty">No patients found.</div>
      ) : (
        <div className="patients-table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p, idx) => (
                <tr key={p._id || idx}>
                  <td>{p._id}</td>
                  <td>{p.name || <span className="patients-badge">N/A</span>}</td>
                  <td>{p.email || <span className="patients-badge">N/A</span>}</td>
                  <td>{p.phone || <span className="patients-badge patients-badge-warning">Not Provided</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewPatients;
