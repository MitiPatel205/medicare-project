// server/src/models/Order.js
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ name: String, quantity: Number }],
  total: Number,
  status: String,
  createdAt: Date
});
module.exports = mongoose.model('Order', OrderSchema);
