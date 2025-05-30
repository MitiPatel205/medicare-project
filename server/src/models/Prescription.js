const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: String, required: true },
  prescription: { type: String, required: true }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
