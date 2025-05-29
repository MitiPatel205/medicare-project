// Connects to MongoDB using Mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // No need for deprecated options in latest Mongoose versions
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
