const MySQL = require('../db/MySQL');

const mysqlPatients = new MySQL('patients');

class Patients {
  async createPatient(req, res) {
    const { patient_fullname, patient_age } = req.body;

    const newPatient = {
      patient_fullname,
      patient_age,
    };

    await mysqlPatients.create(newPatient);

    return res.status(200).json({});
  }

  async readPatients(req, res) {
    const { patient_id } = req.query;

    if (patient_id) {
      const patient = await mysqlPatients.readOne('patient_id', patient_id);

      return res.status(200).json(patient[0]);
    } else {
      const allPatients = await mysqlPatients.readAll();

      return res.status(200).json(allPatients);
    }
  }

  async updatePatient(req, res) {
    const { patient_id } = req.params;

    const { patient_fullname, patient_age } = req.body;

    const updatePatient = {
      patient_fullname,
      patient_age,
    };

    await mysqlPatients.update(updatePatient, 'patient_id', patient_id);

    return res.status(200).json({});
  }

  async deletePatient(req, res) {
    const { patient_id } = req.params;

    await mysqlPatients.delete('patient_id', patient_id);

    return res.status(200).json({});
  }
}

module.exports = Patients;
