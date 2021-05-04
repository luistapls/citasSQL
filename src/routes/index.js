const express = require('express');

const Patients = require('../utils/Patients');
const Consultas = require('../utils/Consultas');
const Citas = require('../utils/Citas');

const router = express.Router();

const patients = new Patients();
const consultas = new Consultas();
const citas = new Citas();

// Patients routes
router.post('/create_patient', (req, res) => patients.createPatient(req, res));

router.get('/read_patients', (req, res) => patients.readPatients(req, res));

router.put('/update_patient/:patient_id', (req, res) =>
  patients.updatePatient(req, res),
);

router.delete('/delete_patient/:patient_id', (req, res) =>
  patients.deletePatient(req, res),
);

// Consultas routes
router.post('/create_consulta', (req, res) =>
  consultas.createConsulta(req, res),
);

router.get('/read_consultas', (req, res) => consultas.readConsultas(req, res));

// router.put('/update_consulta/:consulta_id', (req, res) => consultas.updateConsulta(req, res));

router.delete('/delete_consulta/:consulta_id', (req, res) =>
  consultas.deleteConsulta(req, res),
);

// Citas routes
router.post('/create_cita', (req, res) => citas.createCita(req, res));

router.get('/read_citas', (req, res) => citas.readCitas(req, res));

router.put('/update_cita/:cita_id', (req, res) => citas.updateCita(req, res));

router.delete('/delete_cita/:cita_id', (req, res) =>
  citas.deleteCita(req, res),
);

module.exports = router;
