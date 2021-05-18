const {
  Doctor,
  Appointment,
  Patient,
  Clinic,
  Journey,
} = require('../database/db');

const createAppointments = async (req, res) => {
  const { patient_id, journey_id } = req.body;

  const existentAppointment = await Appointment.findOne({
    where: {
      journey_id,
    },
  });

  if (!existentAppointment) {
    const newAppointment = {
      patient_id,
      journey_id,
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
  const findAppointments = await Appointment.findAll({
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

const deleteAppointments = async (req, res) => {
  const { appointments_id } = req.params;

  await Appointment.destroy({
    where: {
      id: appointments_id,
    },
  });

  return res.status(200).json({});
};

module.exports = { createAppointments, readAppointments, deleteAppointments };
