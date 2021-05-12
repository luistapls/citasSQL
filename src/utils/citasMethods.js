const {
  Doctor,
  Ubication,
  Cita,
  Appointment,
  Patient,
} = require('../database/db');

const createCita = async (req, res) => {
  const { token } = req;
  const { appointmentId } = req.body;

  const existentCita = await Cita.findOne({
    where: {
      appointmentId,
    },
  });

  if (!existentCita) {
    const findPatient = await Patient.findOne({
      where: {
        token,
      },
    });

    const patientId = findPatient.id;

    const newCita = {
      patientId,
      appointmentId,
    };

    const createdCita = await Cita.create(newCita);

    return res.status(201).json(createdCita);
  } else {
    return res.status(400).json({
      error: 'La cita que desea elegir ya ha sido ocupada por otro paciente.',
    });
  }
};

const readCitas = async (req, res) => {
  const { typeRead, token } = req;

  switch (typeRead) {
    case 'Patient': {
      const findPatient = await Patient.findOne({
        where: {
          token,
        },
      });

      const patientId = findPatient.id;

      const findCitas = await Cita.findAll({
        where: {
          patientId,
        },
        include: [
          {
            model: Appointment,
            include: [Doctor, Ubication],
          },
          {
            model: Patient,
          },
        ],
      });

      return res.status(200).json(findCitas);
    }

    case 'Doctor': {
      const findDoctor = await Doctor.findOne({
        where: {
          token,
        },
      });

      const doctorId = findDoctor.id;

      const findCitas = await Cita.findAll({
        where: {
          doctorId,
        },
        include: [
          {
            model: Appointment,
            include: [Doctor, Ubication],
          },
          {
            model: Patient,
          },
        ],
      });

      return res.status(200).json(findCitas);
    }
    case 'Ubication': {
      const findUbication = await Ubication.findOne({
        where: {
          token,
        },
      });

      const ubicationId = findUbication.id;

      const findCitas = await Cita.findAll({
        where: {
          ubicationId,
        },
        include: [
          {
            model: Appointment,
            include: [Doctor, Ubication],
          },
          {
            model: Patient,
          },
        ],
      });

      return res.status(200).json(findCitas);
    }
  }
};

const deleteCita = async (req, res) => {
  const { citaId } = req.params;

  await Cita.destroy({
    where: {
      id: citaId,
    },
  });

  return res.status(200).json({});
};

module.exports = { createCita, readCitas, deleteCita };
