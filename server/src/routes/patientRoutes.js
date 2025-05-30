const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// GET /api/patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching patients" });
  }
});

module.exports = router;
