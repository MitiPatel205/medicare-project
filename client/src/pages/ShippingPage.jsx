import React, { useState, useEffect } from 'react';

const ShippingPage = () => {
  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState({ address: '', city: '', zip: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5050/api/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shipping, cart }),
      });
      if (!response.ok) throw new Error('Failed to place order');
      setOrderPlaced(true);
      setCart([]);
      localStorage.removeItem('cart');
    } catch (err) {
      alert('Error placing order: ' + err.message);
    }
    setLoading(false);
  };

  if (orderPlaced) {
    return (
      <div className="payment-bg">
        <div className="payment-card animated-fade-in" style={{ textAlign: 'center' }}>
          <span className="payment-icon" style={{ fontSize: "3rem" }}>🎉</span>
          <h2>Order Placed!</h2>
          <p>Thank you for your purchase.<br />Your medicines will be shipped soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-bg">
      <div className="payment-card animated-fade-in">
        <div className="payment-header">
          <span className="payment-icon">🚚</span>
          <h2>Shipping Details</h2>
        </div>
        <div className="order-summary">
          <h4>Order Summary</h4>
          {cart.length === 0 ? (
            <p className="empty-cart">No items in cart.</p>
          ) : (
            <ul className="order-list">
              {cart.map(item => (
                <li key={item._id || item.id} className="order-item">
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
            <label htmlFor="address">Address</label>
            <input
              id="address"
              placeholder="123 Main St"
              value={shipping.address}
              onChange={e => setShipping({ ...shipping, address: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              placeholder="City"
              value={shipping.city}
              onChange={e => setShipping({ ...shipping, city: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">ZIP Code</label>
            <input
              id="zip"
              placeholder="ZIP Code"
              value={shipping.zip}
              onChange={e => setShipping({ ...shipping, zip: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="pay-btn" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
