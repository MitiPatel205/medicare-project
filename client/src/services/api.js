import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5050/api' });

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

// Medicine E-commerce Endpoints
export const fetchMedicines = async () => {
  const response = await API.get('/medicines');
  return response.data;
};
export const fetchMedicine = async (id) => {
  const response = await API.get(`/medicines/${id}`);
  return response.data;
};
export const addToCart = async (medicineId, quantity, token) => {
  const response = await API.post('/cart', { medicineId, quantity }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const fetchCart = async (token) => {
  const response = await API.get('/cart', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const removeFromCart = async (medicineId, token) => {
  const response = await API.delete(`/cart/${medicineId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const updateCartQuantity = async (medicineId, quantity, token) => {
  const response = await API.put(`/cart/${medicineId}`, { quantity }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const processPayment = async (paymentInfo, cart, token) => {
  const response = await API.post('/payment', { paymentInfo, cart }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const submitShipping = async (shippingInfo, token) => {
  const response = await API.post('/shipping', shippingInfo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Orders endpoint
export const fetchOrders = async (token) => {
  const response = await API.get('/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default API;
