// routes/prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// POST /api/prescriptions
router.post('/', async (req, res) => {
  try {
    const { patientId, doctor, date, prescription } = req.body;
    const newPrescription = new Prescription({ patientId, doctor, date, prescription });
    await newPrescription.save();
    res.json({ message: "Prescription saved successfully!", prescription: newPrescription });
  } catch (err) {
    res.status(500).json({ message: "Failed to save prescription." });
  }
});

module.exports = router;
