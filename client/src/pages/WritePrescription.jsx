import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5050";

const WritePrescription = () => {
  const [form, setForm] = useState({
    patientId: "",
    doctor: "",
    date: new Date().toISOString().split("T")[0],
    prescription: ""
  });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Fetch patients and doctors for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patRes = await fetch(`${API_BASE}/api/patients`);
        const docRes = await fetch(`${API_BASE}/api/doctors`);
        const patData = await patRes.json();
        const docData = await docRes.json();
        setPatients(patData);
        setDoctors(docData);
      } catch (err) {
      console.error(err);
        // Ignore errors for dropdowns
      }
    };
    fetchData();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    setSuccess(false);

    // Simple validation
    if (!form.patientId || !form.doctor || !form.prescription) {
      setMsg("All fields are required.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.message || "Failed to save prescription.");
      } else {
        setMsg("Prescription saved successfully!");
        setSuccess(true);
        setForm({ ...form, prescription: "" });
      }
    } catch (err) {
      console.error(err);
      setMsg("Network error. Try again.");
    }
  };

  return (
    <div className="prescription-container">
      <h2 className="prescription-title">Write Prescription</h2>
      <form onSubmit={handleSubmit} className="prescription-form">
        <div className="prescription-row">
          <div className="prescription-group">
            <label className="prescription-label">Patient</label>
            <select
              className="prescription-input"
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              required
            >
              <option value="">Select patient</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.email})
                </option>
              ))}
            </select>
          </div>
          <div className="prescription-group">
            <label className="prescription-label">Doctor</label>
            <select
              className="prescription-input"
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              required
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d.name}>
                  {d.name} ({d.specialty})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="prescription-group">
          <label className="prescription-label">Date</label>
          <input
            className="prescription-input"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="prescription-group">
          <label className="prescription-label">Prescription</label>
          <textarea
            className="prescription-input"
            name="prescription"
            value={form.prescription}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Enter prescription details..."
          />
        </div>
        <button className="prescription-btn" type="submit">
          Save Prescription
        </button>
      </form>
      {msg && (
        <div className={`prescription-alert ${success ? "success" : "error"}`}>{msg}</div>
      )}
    </div>
  );
};

export default WritePrescription;
