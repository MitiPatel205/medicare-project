import axios from 'axios';

// Axios instance
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Auth endpoints
export const login = async (data) => {
  const response = await API.post('/auth/login', data);
  return response.data;
};
export const signup = async (data) => {
  const response = await API.post('/auth/signup', data);
  return response.data;
};

// User endpoints
export const fetchUserProfile = async (token) => {
  const response = await API.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Doctor endpoints
export const fetchDoctors = async () => {
  const response = await API.get('/doctors');
  return response.data;
};
export const fetchDoctor = async (id) => {
  const response = await API.get(`/doctors/${id}`);
  return response.data;
};

// Appointment endpoints
export const fetchAppointments = async (token) => {
  const response = await API.get('/appointments', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const bookAppointment = async (appointmentData, token) => {
  const response = await API.post('/appointments', appointmentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Example for adding more endpoints
// export const updateDoctor = async (id, data, token) => { ... };

// Export Axios instance

export default API;
