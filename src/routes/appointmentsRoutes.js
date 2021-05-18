const express = require('express');
const router = express.Router();

const authorization = require('../middleware/authorization.js');
const authentication = require('../middleware/authentication');
const appointmentsUtils = require('../utils/appointmentSMethods');

router.post(
  '/create',
  authentication,
  authorization('APPOINTMENTS_CREATE'),
  appointmentsUtils.createAppointments,
);

router.get(
  '/read',
  authentication,
  authorization('APPOINTMENTS_READ'),
  appointmentsUtils.readAppointments,
);

router.delete(
  '/delete/:appointmentsId',
  authentication,
  authorization('APPOINTMENTS_DELETE'),
  appointmentsUtils.deleteAppointments,
);

module.exports = router;
