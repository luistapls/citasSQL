const { Op } = require('sequelize');
const { Appointment, Doctor, Ubication } = require('../database/db');

const appointmentCoincidence = async (startDate, endDate, doctorId) =>
  await Appointment.findAll({
    where: {
      startAppointment: {
        [Op.between]: [startDate, endDate],
      },
      doctorId,
    },
  });

const numberAppointments = (startDate, endDate, duration) => {
  return (endDate - startDate) / 60000 / (duration || 15);
};

const createAppointment = async (req, res) => {
  const {
    doctorId,
    ubicationId,
    dateStart,
    dateEnd,
    appointmentDuration,
  } = req.body;

  const startWork = new Date(dateStart);
  const endWork = new Date(dateEnd);

  const coincidence = await appointmentCoincidence(
    startWork,
    endWork,
    doctorId,
  );

  if (coincidence.length) {
    return res.status(400).json({
      error: 'Entre las dos fechas suministradas el doctor tiene consulta(s).',
      consultas: coincidence,
    });
  } else {
    const countAppointments = numberAppointments(
      startWork,
      endWork,
      appointmentDuration,
    );

    if (countAppointments < 0) {
      return res.status(400).json({
        error:
          'La fecha de inicio de trabajo no puede ser posterior a la fecha final de trabajo.',
        fechas: {
          startWork,
          endWork,
        },
      });
    } else if (!Number.isInteger(countAppointments)) {
      return res.status(400).json({
        error: 'La duracion de cada consulta es mayor a la jornada de trabajo.',
        startWork,
        endWork,
        appointmentDuration,
      });
    } else {
      const newAppointments = [];

      let startAppointment = startWork;

      for (let i = 0; i < countAppointments; i++) {
        let endAppointment = new Date(startAppointment.getTime() + 15 * 60000);

        const newAppointment = {
          doctorId,
          ubicationId,
          startAppointment,
          endAppointment,
        };

        newAppointments.push(newAppointment);

        startAppointment = endAppointment;
      }

      try {
        const createAppointment = await Appointment.bulkCreate(newAppointments);

        return res.status(201).json({ createAppointment });
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
};

const readAppointments = async (req, res) => {
  const { appointmentId } = req.query;

  if (appointmentId) {
    const readAppointment = await Appointment.findOne({
      where: {
        id: appointmentId,
      },
      include: [Doctor, Ubication],
    });
    return res.status(200).json(readAppointment);
  } else {
    const readAppointments = await Appointment.findAll({
      include: [Doctor, Ubication],
    });

    return res.status(200).json(readAppointments);
  }
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
