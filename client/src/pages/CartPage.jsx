import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Fetch cart from backend on mount
  useEffect(() => {
    fetch('http://localhost:5050/api/cart')
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error('Failed to fetch cart:', err));
  }, [setCart]);

  // Update backend when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      fetch('http://localhost:5050/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      }).catch(err => console.error('Failed to update cart:', err));
    }
  }, [cart]);

  const handleRemove = id => setCart(cart.filter(item => item.id !== id));
  const handleQuantity = (id, delta) => setCart(cart.map(item =>
    item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item
  ));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - ₹{item.price} × {item.quantity}
                <button onClick={() => handleQuantity(item.id, -1)} disabled={item.quantity === 1}>-</button>
                <button onClick={() => handleQuantity(item.id, 1)}>+</button>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h4>Total: ₹{total.toFixed(2)}</h4>
          <button className="btn btn-success" onClick={() => navigate('/payment')}>Proceed to Payment</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
