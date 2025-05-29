import axios from 'axios';

// Create a single Axios instance
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Helper to fetch all doctors
export const fetchDoctors = async () => {
  const response = await API.get('/doctors');
  return response.data;
};

// Helper to book an appointment
export const bookAppointment = async (appointmentData) => {
  const response = await API.post('/appointments', appointmentData);
  return response.data;
};

export default API;
