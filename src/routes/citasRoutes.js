const express = require('express');
const router = express.Router();
const tokenCita = require('../middleware/tokenCita');

const citasMethods = require('../utils/citasMethods');

router.post('/create', (req, res) => citasMethods.createCita(req, res));

router.get('/read', (req, res) => citasMethods.readCitas(req, res));

router.delete('/delete/:citaId', (req, res) =>
  citasMethods.deleteCita(req, res),
);

router.get('/readYourCita', tokenCita, (req, res) =>
  citasMethods.readYourCita(req, res),
);

module.exports = router;
