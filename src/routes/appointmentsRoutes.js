const express = require('express');
const router = express.Router();

const authorization = require('../middleware/authorization.js');
const authentication = require('../middleware/authentication');
const appointmentsController = require('../controllers/appointmentsController');

router.post(
  '/create',
  authentication,
  authorization('APPOINTMENTS_CREATE'),
  appointmentsController.createAppointments,
);

router.get(
  '/read',
  authentication,
  authorization('APPOINTMENTS_READ'),
  appointmentsController.readAppointments,
);

router.put(
  '/update/:appointments_id',
  authentication,
  authorization('APPOINTMENTS_UPDATE'),
  appointmentsController.updateAppointments,
);

router.delete(
  '/delete/:appointments_id',
  authentication,
  authorization('APPOINTMENTS_DELETE'),
  appointmentsController.deleteAppointments,
);

router.put(
  '/request/create',
  authentication,
  authorization('APPOINTMENTS_REQUEST'),
  appointmentsController.createRequest,
);

router.put(
  '/request/delete/:appointments_id',
  authentication,
  authorization('APPOINTMENTS_REQUEST'),
  appointmentsController.delete
  Request,
);
module.exports = router;
