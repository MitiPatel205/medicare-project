const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor:    { type: String, required: true },
  specialty: { type: String, required: true },
  date:      { type: String, required: true },
  time:      { type: String, required: true },
  status:    { type: String, default: "Upcoming", required: true }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
