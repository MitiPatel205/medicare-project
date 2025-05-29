const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// POST /api/appointments
router.post('/', async (req, res) => {
  try {
    const { user, doctor, date } = req.body;
    const appointment = new Appointment({ user, doctor, date });
    await appointment.save();
    res.json({ message: "Appointment booked successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error booking appointment" });
  }
});

// GET /api/appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

module.exports = router;
