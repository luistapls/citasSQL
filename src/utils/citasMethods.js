const {
  Doctor,
  Ubication,
  Cita,
  Appointment,
  Patient,
} = require('../database/db');

const createCita = async (req, res) => {
  const { patientId, appointmentId } = req.body;

  const existentCita = await Cita.findAll();

  if (existentCita.length) {
    return res.status(400).json({
      error: 'La cita que desea elegir ya ha sido ocupada por otro paciente.',
    });
  } else {
    const newCita = {
      patientId,
      appointmentId,
    };

    const createdCita = await Cita.create(newCita);

    return res.status(201).json(createdCita);
  }
};

const readCitas = async (req, res) => {
  const { citaId } = req.query;

  if (citaId) {
    const cita = await Cita.findOne({
      where: {
        id: citaId,
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
    return res.status(200).json(cita);
  } else {
    const allCitas = await Cita.findAll({
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

    return res.status(200).json(allCitas);
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
