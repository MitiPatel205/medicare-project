const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Appointment = require('./src/models/Appointment');

const MONGODB_URI = 'mongodb://localhost:27017/medicare';

async function seed() {
  await mongoose.connect(MONGODB_URI);

  // Clear old data
  await User.deleteMany({});
  await Appointment.deleteMany({});

  // Hash the password
  const hashedPassword = await bcrypt.hash('test1234', 10);

  // Create a user with the hashed password
  const user = await User.create({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: hashedPassword,
    role: 'user',
    phone: '+91-9876543210',
    address: '123 Main St, Mumbai'
  });

  // Create appointments for this user
  await Appointment.create([
    {
      userId: user._id.toString(),
      doctor: 'Dr. Rajiv Menon',
      specialty: 'Cardiology',
      date: '2025-06-02',
      time: '10:00 AM',
      status: 'Upcoming'
    }
  ]);

  console.log('Seed data created!');
  await mongoose.disconnect();
}

seed();
