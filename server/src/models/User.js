const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'doctor', 'admin'] }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
