const express = require('express');
const { bookAppointment, getAppointments } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/', bookAppointment);
router.get('/', getAppointments);

module.exports = router;
