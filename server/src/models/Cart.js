const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      id: String,
    }
  ]
});
module.exports = mongoose.model('Cart', CartSchema);
