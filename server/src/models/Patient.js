const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  userId: { type: String, required: true } // Link to user accounts
});

module.exports = mongoose.model('Patient', PatientSchema);
