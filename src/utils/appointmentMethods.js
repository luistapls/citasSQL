const {
  Doctor,
  Appointment,
  Patient,
  Clinic,
  Journey,
} = require('../database/db');

const createAppointment = async (req, res) => {
  const { userId } = req.tokenInfo;
  const { journeyId } = req.body;

  const existentAppointment = await Appointment.findOne({
    where: {
      journeyId,
    },
  });

  if (!existentAppointment) {
    const findPatient = await Patient.findOne({
      where: {
        userId,
      },
    });

    const patientId = findPatient.id;

    const newAppointment = {
      patientId,
      journeyId,
    };

    const createdAppointment = await Appointment.create(newAppointment);

    return res.status(201).json(createdAppointment);
  } else {
    return res.status(400).json({
      error: 'La cita que desea elegir ya ha sido ocupada por otro paciente.',
    });
  }
};

const readAppointments = async (req, res) => {
  const { userId } = req.tokenInfo;

  const findAppointments = await Appointment.findAll({
    where: userId,
    include: [
      {
        model: Patient,
      },
      {
        model: Journey,
        include: [Doctor, Clinic],
      },
    ],
  });

  return res.status(200).json(findAppointments);
};

const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  await Appointment.destroy({
    where: {
      id: appointmentId,
    },
  });

  return res.status(200).json({});
};

module.exports = { createAppointment, readAppointments, deleteAppointment };
