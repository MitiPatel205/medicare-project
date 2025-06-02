const mongoose = require('mongoose');
const ShippingSchema = new mongoose.Schema({
  address: String,
  city: String,
  zip: String,
  cart: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Shipping', ShippingSchema);
