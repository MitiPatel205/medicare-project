const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  slot: String,
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' }
});
module.exports = mongoose.model('Appointment', AppointmentSchema);
