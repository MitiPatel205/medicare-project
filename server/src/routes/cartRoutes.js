// server/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart (for a user, or for demo, just the first cart)
router.get('/', async (req, res) => {
  try {
    // For demo, just get first cart
    const cart = await Cart.findOne();
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Update cart (replace all items)
router.post('/', async (req, res) => {
  try {
    const { items } = req.body;
    // For demo, just replace the first cart
    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ items });
    else cart.items = items;
    await cart.save();
    res.json({ message: 'Cart updated', cart: cart.items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

module.exports = router;
