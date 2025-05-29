const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availableSlots: [String]
});
module.exports = mongoose.model('Doctor', DoctorSchema);
