const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Only needed if using cookies/auth
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
