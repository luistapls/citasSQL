const express = require('express');
const router = express.Router();

const appointmentsMethods = require('../utils/appointmentsMethods');

router.post('/create', (req, res) =>
  appointmentsMethods.createAppointment(req, res),
);

router.get('/read', (req, res) =>
  appointmentsMethods.readAppointments(req, res),
);

router.delete('/delete/:appointmentId', (req, res) =>
  appointmentsMethods.deleteAppointment(req, res),
);

module.exports = router;
