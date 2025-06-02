import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PaymentPage = () => {
  const [cart, setCart] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({ card: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  try {
    // Simulate payment process
    setTimeout(() => {
      setLoading(false);
      // DO NOT remove the cart here!
      // DO NOT setCart([]) here!
      navigate('/shipping');
    }, 1200);
  } catch (err) {
    console.error(err);
    setLoading(false);
    setError('Payment failed. Please try again.');
  }
};


  return (
    <div className="payment-bg">
      <div className="payment-card animated-fade-in">
        <div className="payment-header">
          <span className="payment-icon">💳</span>
          <h2>Payment</h2>
        </div>
        <div className="order-summary">
          <h4>Order Summary</h4>
          {cart.length === 0 ? (
            <p className="empty-cart">No items in cart.</p>
          ) : (
            <ul className="order-list">
              {cart.map(item => (
                <li key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} className="order-img" />
                  <span className="order-name">{item.name}</span>
                  <span className="order-qty">× {item.quantity}</span>
                  <span className="order-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="order-total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
        <form className="payment-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="card">Card Number</label>
            <input
              id="card"
              placeholder="1234 5678 9012 3456"
              value={paymentInfo.card}
              onChange={e => setPaymentInfo({ ...paymentInfo, card: e.target.value })}
              required
              maxLength={19}
              inputMode="numeric"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name on Card</label>
            <input
              id="name"
              placeholder="Full Name"
              value={paymentInfo.name}
              onChange={e => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
              required
            />
          </div>
          {error && <div className="payment-error">{error}</div>}
          <button
            type="submit"
            className="pay-btn"
            disabled={loading || cart.length === 0}
          >
            {loading ? <span className="loader"></span> : 'Pay & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
