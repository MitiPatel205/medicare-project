const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String,
  stock: Number,
  dosage: String,
  symptoms: String,
  description: String,
});

module.exports = mongoose.model('Medicine', medicineSchema);
