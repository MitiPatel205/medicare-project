import React, { useEffect, useState } from 'react';
import { fetchDoctors } from "../services/api";
 // Adjust the path as needed

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoctors()
      .then(data => setDoctors(data))
      .catch(err => {
  console.error(err);
  setError('Failed to load doctors');
})

      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary fw-bold">Doctors List</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {doctors.map(doc => (
          <li key={doc._id} className="list-group-item">
            <strong>{doc.name}</strong> <span className="text-muted">({doc.specialization})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPage;
