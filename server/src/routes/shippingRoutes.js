const express = require('express');
const router = express.Router();
const Shipping = require('../models/Shipping');

// No authentication middleware here!
router.post('/', async (req, res) => {
  try {
    const { shipping, cart } = req.body;
    const newShipping = new Shipping({ ...shipping, cart });
    await newShipping.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save shipping data' });
  }
});

module.exports = router;
