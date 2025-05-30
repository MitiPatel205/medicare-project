const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// GET /api/doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

module.exports = router;
