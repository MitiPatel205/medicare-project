import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

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
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} className="form-control mb-2" />
        <input type="password" name="password" placeholder="Password" required value={form.password} onChange={handleChange} className="form-control mb-2" />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="text-center mt-3">
        <span>Don't have an account? <a href="/signup">Sign Up</a></span>
      </div>
    </div>
  );
};

export default Login;
