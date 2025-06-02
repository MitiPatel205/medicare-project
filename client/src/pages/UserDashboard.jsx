import React, { useEffect, useState } from 'react';
import {
  fetchUserProfile,
  fetchAppointments,
  fetchCart,
  fetchOrders
} from '../services/api';

const UserDashboard = () => {
  const token = localStorage.getItem('token');
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example repeat order function (implement as needed)
  const repeatOrder = (orderId) => {
    alert(`Repeat order functionality for order #${orderId} coming soon!`);
    // You could call an API to repeat the order here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, apptData, cartData, ordersData] = await Promise.all([
          fetchUserProfile(token),
          fetchAppointments(token),
          fetchCart(token),
          fetchOrders(token),
        ]);
        setProfile(profileData);
        setAppointments(apptData || []);
        setCart(cartData.items || []);
        setOrders(ordersData || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [token]);

  if (loading) return <div className="text-center mt-5">Loading your dashboard...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mb-4">
        <h2 className="mb-3">Welcome, {profile?.name || 'User'}!</h2>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Phone:</strong> {profile?.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {profile?.address || 'N/A'}</p>
        <p><strong>Role:</strong> {profile?.role || 'user'}</p>
      </div>

      <div className="row">
        {/* Appointments */}
        <div className="col-md-6 mb-4">
          <div className="card p-3 h-100">
            <h4>My Appointments</h4>
            {appointments.length === 0 ? (
              <div className="text-muted">No appointments yet.</div>
            ) : (
              <ul className="list-group">
                {appointments.map((appt, idx) => (
                  <li className="list-group-item" key={idx}>
                    <strong>{appt.date}</strong> with <strong>{appt.doctor}</strong> ({appt.status})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Cart */}
        <div className="col-md-6 mb-4">
          <div className="card p-3 h-100">
            <h4>My Cart</h4>
            {cart.length === 0 ? (
              <div className="text-muted">Your cart is empty.</div>
            ) : (
              <ul className="list-group">
                {cart.map((item, idx) => (
                  <li className="list-group-item" key={idx}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="card p-3 mb-4">
        <h4>My Orders</h4>
        {orders.length === 0 ? (
          <div className="text-muted">No orders yet.</div>
        ) : (
          <ul className="list-group">
            {orders.map((order, idx) => (
              <li className="list-group-item" key={idx}>
                <div>
                  <strong>Order #{order._id}</strong> - {order.status} - Total: ₹{order.total}
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <a href={`/orders/${order._id}`} className="btn btn-link btn-sm">View Details</a>
                  <button
                    className="btn btn-outline-primary btn-sm ms-2"
                    onClick={() => repeatOrder(order._id)}
                  >
                    Repeat Order
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-center">
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
