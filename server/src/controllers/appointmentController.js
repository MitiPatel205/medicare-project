const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  const { user, doctor, slot } = req.body;
  const appointment = new Appointment({ user, doctor, slot });
  await appointment.save();
  res.json(appointment);
};

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate('user doctor');
  res.json(appointments);
};
