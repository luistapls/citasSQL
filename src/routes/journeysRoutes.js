const express = require('express');
const router = express.Router();

const authorization = require('../middleware/authorization.js');
const authentication = require('../middleware/authentication');
const journeyUtils = require('../utils/journeysMethods');

router.post(
  '/create',
  authentication,
  authorization('JOURNEYS_CREATE'),
  journeyUtils.createJourney,
);

router.get(
  '/read',
  authentication,
  authorization('JOURNEYS_READ'),
  journeyUtils.readJourney,
);

router.delete(
  '/delete/:journeyId',
  authentication,
  authorization('JOURNEYS_DELETE'),
  journeyUtils.deleteJourney,
);

module.exports = router;
