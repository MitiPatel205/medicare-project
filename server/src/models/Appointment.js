// server/models/Appointment.js

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId:    { type: String, required: true }, // unique user identifier
  doctor:    { type: String, required: true },
  specialty: { type: String, required: true },
  date:      { type: String, required: true },
  time:      { type: String, required: true },
  status:    { type: String, default: "Upcoming", required: true }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
