const express = require('express');
const router = express.Router();

const middlewareCita = require('../middleware/middlewareCita');
const citasMethods = require('../utils/citasMethods');

router.post('/create', middlewareCita.createCita, citasMethods.createCita);

router.get('/read', middlewareCita.readCita, citasMethods.readCitas);

router.delete('/delete/:citaId', citasMethods.deleteCita);

module.exports = router;
