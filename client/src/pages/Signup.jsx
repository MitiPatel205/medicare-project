import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await signup(form);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required value={form.name} onChange={handleChange} className="form-control mb-2" />
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} className="form-control mb-2" />
        <input type="password" name="password" placeholder="Password" required value={form.password} onChange={handleChange} className="form-control mb-2" minLength={6} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className="btn btn-success w-100" type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <div className="text-center mt-3">
        <span>Already have an account? <a href="/login">Login</a></span>
      </div>
    </div>
  );
};

export default Signup;
