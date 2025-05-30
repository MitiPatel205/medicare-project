// server/routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// POST /api/appointments
router.post('/', async (req, res) => {
  try {
    const { userId, doctor, specialty, date, time, status } = req.body;

    // Validate required fields
    if (!userId || !doctor || !specialty || !date || !time || !status) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const appointment = new Appointment({ userId, doctor, specialty, date, time, status });
    await appointment.save();
    res.json({ message: "Appointment booked successfully!", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error booking appointment" });
  }
});

// GET /api/appointments?userId=...
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const appointments = await Appointment.find(query).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

module.exports = router;
