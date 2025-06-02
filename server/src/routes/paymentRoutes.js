const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const Cart = require('../models/Cart');
const router = express.Router();

// Mock payment processing
router.post('/', requireAuth, async (req, res) => {
  const { paymentInfo } = req.body;
  // Here you would integrate with a real payment gateway
  // For now, just clear the user's cart
  await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });
  res.json({ message: 'Payment successful and cart cleared.' });
});

module.exports = router;
