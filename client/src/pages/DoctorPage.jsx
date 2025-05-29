import React, { useEffect, useState } from 'react';

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(setDoctors);
  }, []);
  return (
    <div>
      <h2>Doctors List</h2>
      <ul>
        {doctors.map(doc => (
          <li key={doc._id}>{doc.name} - {doc.specialization}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPage;
