const express = require('express');
const router = express.Router();

const appointmentsMethods = require('../utils/appointmentsMethods');

router.post('/create', appointmentsMethods.createAppointment);

router.get('/read', appointmentsMethods.readAppointments);

router.delete('/delete/:appointmentId', appointmentsMethods.deleteAppointment);

module.exports = router;
