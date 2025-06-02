// server/src/routes/medicineRoutes.js
const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine'); // Your Mongoose model

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
});

module.exports = router;
