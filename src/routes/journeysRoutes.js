const express = require('express');
const router = express.Router();

const authorizationByToken = require('../middleware/authorizationByToken.js');
const journeyUtils = require('../utils/journeysMethods');

router.post(
  '/create',
  (req, res, next) => authorizationByToken(req, res, next, 'JOURNEYS_CREATE'),
  journeyUtils.createJourney,
);

router.get(
  '/read',
  (req, res, next) => authorizationByToken(req, res, next, 'JOURNEYS_READ'),
  journeyUtils.readJourney,
);

router.delete(
  '/delete/:journeyId',
  (req, res, next) => authorizationByToken(req, res, next, 'JOURNEYS_DELETE'),
  journeyUtils.deleteJourney,
);

module.exports = router;
