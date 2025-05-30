import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
 // Make sure this function exists in your api/index.js

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/user-dashboard'); // or redirect based on role
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="medicare-container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-3 text-center">Login to <span className="medicare-highlight">Medicare</span></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" required value={form.password} onChange={handleChange} />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? <a href="/signup">Sign Up</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
