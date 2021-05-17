const express = require('express');
const router = express.Router();

const authorizationByToken = require('../middleware/authorizationByToken.js');
const appointmentsUtils = require('../utils/appointmentMethods');

router.post(
  '/create',
  (req, res, next) =>
    authorizationByToken(req, res, next, 'APPOINTMENTS_CREATE'),
  appointmentsUtils.createAppointment,
);

router.get(
  '/read',
  (req, res, next) => authorizationByToken(req, res, next, 'APPOINTMENTS_READ'),
  appointmentsUtils.readAppointments,
);

router.delete(
  '/delete/:appointmentId',
  (req, res, next) =>
    authorizationByToken(req, res, next, 'APPOINTMENTS_DELETE'),
  appointmentsUtils.deleteAppointment,
);

module.exports = router;
